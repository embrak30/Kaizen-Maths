-- Account-level, opt-in teacher usage. Run after supabase-schema.sql.
-- No browser can insert/update telemetry directly or choose another account's identity.
begin;
create table if not exists public.usage_preferences (
 user_id uuid primary key references auth.users(id) on delete cascade,
 enabled boolean not null default false,
 updated_at timestamptz not null default now()
);
create table if not exists public.usage_sessions (
 id uuid primary key, user_id uuid not null references auth.users(id) on delete cascade,
 school_id uuid references public.schools(id) on delete set null,
 started_at timestamptz not null default now(), last_seen_at timestamptz not null default now(),
 last_ping_at timestamptz not null default now(), active_seconds integer not null default 0 check(active_seconds>=0)
);
create table if not exists public.usage_tool_visits (
 id uuid primary key, session_id uuid not null references public.usage_sessions(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade,
 tool_slug text not null check(tool_slug ~ '^[a-z0-9][a-z0-9-]{0,79}$'),
 opened_at timestamptz not null default now(), last_seen_at timestamptz not null default now(),
 active_seconds integer not null default 0 check(active_seconds>=0)
);
create index if not exists usage_sessions_user_seen on public.usage_sessions(user_id,last_seen_at desc);
create index if not exists usage_sessions_started on public.usage_sessions(started_at);
create index if not exists usage_visits_user_opened on public.usage_tool_visits(user_id,opened_at desc);
create index if not exists usage_visits_tool on public.usage_tool_visits(tool_slug,opened_at);
alter table public.usage_preferences enable row level security;
alter table public.usage_sessions enable row level security;
alter table public.usage_tool_visits enable row level security;
revoke all on public.usage_preferences,public.usage_sessions,public.usage_tool_visits from anon,authenticated;
grant select on public.usage_preferences,public.usage_sessions,public.usage_tool_visits to authenticated;
drop policy if exists usage_preferences_read on public.usage_preferences;
create policy usage_preferences_read on public.usage_preferences for select to authenticated using(user_id=auth.uid() or public.is_admin());
drop policy if exists usage_sessions_admin_read on public.usage_sessions;
create policy usage_sessions_admin_read on public.usage_sessions for select to authenticated using(public.is_admin());
drop policy if exists usage_visits_admin_read on public.usage_tool_visits;
create policy usage_visits_admin_read on public.usage_tool_visits for select to authenticated using(public.is_admin());
create or replace function public.record_teacher_usage(p_session uuid,p_visit uuid default null,p_tool text default null,p_seconds integer default 0)
returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare actor uuid:=auth.uid(); t timestamptz:=clock_timestamp(); s public.usage_sessions%rowtype; v public.usage_tool_visits%rowtype; watermark timestamptz; credit integer:=0;
begin
 if actor is null then raise exception 'Sign in required' using errcode='42501'; end if;
 -- Serialize consent and activity for each account, including concurrent browser tabs.
 perform pg_advisory_xact_lock(hashtextextended(actor::text,0));
 if not exists(select 1 from public.usage_preferences where user_id=actor and enabled) then return jsonb_build_object('accepted',false,'reason','consent'); end if;
 if p_session is null or p_seconds is null or p_seconds<0 or p_seconds>30 then raise exception 'Invalid usage request'; end if;
 if (p_visit is null)<>(p_tool is null) or (p_tool is not null and p_tool !~ '^[a-z0-9][a-z0-9-]{0,79}$') then raise exception 'Invalid tool visit'; end if;
 select max(last_ping_at) into watermark from public.usage_sessions where user_id=actor;
 select * into s from public.usage_sessions where id=p_session for update;
 if found then
  if s.user_id<>actor then raise exception 'Session belongs to another account' using errcode='42501'; end if;
  if s.last_seen_at<t-interval '30 minutes' then return jsonb_build_object('accepted',false,'reason','expired'); end if;
  credit:=greatest(0,least(p_seconds,30,floor(extract(epoch from t-greatest(s.last_ping_at,coalesce(watermark,s.last_ping_at))))::integer));
 else
  if (select count(*) from public.usage_sessions where user_id=actor and started_at>t-interval '1 hour')>=60 then return jsonb_build_object('accepted',false,'reason','rate'); end if;
  insert into public.usage_sessions(id,user_id,school_id,started_at,last_seen_at,last_ping_at)
  select p_session,actor,p.school_id,t,t,t from public.profiles p where p.id=actor returning * into s;
  if not found then return jsonb_build_object('accepted',false,'reason','profile'); end if;
 end if;
 if p_visit is not null then
  select * into v from public.usage_tool_visits where id=p_visit for update;
  if found then
   if v.user_id<>actor or v.session_id<>p_session or v.tool_slug<>p_tool then raise exception 'Invalid visit owner' using errcode='42501'; end if;
  else
   if (select count(*) from public.usage_tool_visits where user_id=actor and opened_at>t-interval '1 hour')>=600 then return jsonb_build_object('accepted',false,'reason','rate'); end if;
   insert into public.usage_tool_visits(id,session_id,user_id,tool_slug,opened_at,last_seen_at) values(p_visit,p_session,actor,p_tool,t,t);
   -- Opening a new tool is not credited for time spent in the preceding tool.
   credit:=0;
  end if;
  update public.usage_tool_visits set last_seen_at=t,active_seconds=active_seconds+credit where id=p_visit;
 end if;
 update public.usage_sessions set last_seen_at=t,last_ping_at=t,active_seconds=active_seconds+credit where id=p_session;
 return jsonb_build_object('accepted',true,'credited_seconds',credit);
end; $$;
-- Consent withdrawal uses the same account lock so no later heartbeat races it.
create or replace function public.set_usage_reporting(p_enabled boolean) returns boolean language plpgsql security definer set search_path=public,pg_temp as $$
begin
 if auth.uid() is null then raise exception 'Sign in required' using errcode='42501'; end if;
 perform pg_advisory_xact_lock(hashtextextended(auth.uid()::text,0));
 insert into public.usage_preferences(user_id,enabled,updated_at) values(auth.uid(),coalesce(p_enabled,false),now())
 on conflict(user_id) do update set enabled=excluded.enabled,updated_at=now();
 return coalesce(p_enabled,false);
end; $$;
create or replace function public.admin_usage_report(p_days integer default 30,p_school uuid default null,p_include_admins boolean default false)
returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare result jsonb; cutoff timestamptz:=now()-make_interval(days=>least(90,greatest(1,coalesce(p_days,30))));
begin
 if not public.is_admin() then raise exception 'Admin access required' using errcode='42501'; end if;
 with accounts as (
  select p.id,p.full_name,p.email,p.role,p.school_id,s.name school_name,a.last_sign_in_at,coalesce(up.enabled,false) reporting_enabled
  from public.profiles p left join public.schools s on s.id=p.school_id left join auth.users a on a.id=p.id left join public.usage_preferences up on up.user_id=p.id
  where (p_school is null or p.school_id=p_school) and (p_include_admins or p.role<>'admin')
 ), sessions as (select s.* from public.usage_sessions s join accounts a on a.id=s.user_id where s.started_at>=cutoff),
 visits as (select v.* from public.usage_tool_visits v join sessions s on s.id=v.session_id where v.opened_at>=cutoff),
 users as (
  select a.*,coalesce(s.visits,0) visits,coalesce(s.active_seconds,0) active_seconds,s.last_activity,coalesce(s.active_days,0) active_days,
   coalesce(v.tool_opens,0) tool_opens,coalesce(v.tools_used,0) tools_used
  from accounts a left join (select user_id,count(*) visits,sum(active_seconds) active_seconds,max(last_seen_at) last_activity,count(distinct(started_at at time zone 'UTC')::date) active_days from sessions group by user_id) s on s.user_id=a.id
  left join (select user_id,count(*) tool_opens,count(distinct tool_slug) tools_used from visits group by user_id) v on v.user_id=a.id
 ), tool_totals as (select tool_slug,count(*) opens,count(distinct user_id) users,sum(active_seconds) active_seconds from visits group by tool_slug),
 user_tools as (select user_id,tool_slug,count(*) opens,sum(active_seconds) active_seconds,max(last_seen_at) last_used from visits group by user_id,tool_slug),
 daily as (select (started_at at time zone 'UTC')::date as "day",count(*) visits,count(distinct user_id) users,sum(active_seconds) active_seconds from sessions group by 1)
 select jsonb_build_object('generated_at',now(),'since',cutoff,'accounts',(select count(*) from accounts),'opted_in',(select count(*) from accounts where reporting_enabled),
 'users',coalesce((select jsonb_agg(to_jsonb(u) order by u.active_seconds desc,u.visits desc,u.id) from users u),'[]'::jsonb),
 'tools',coalesce((select jsonb_agg(to_jsonb(t) order by t.opens desc,t.tool_slug) from tool_totals t),'[]'::jsonb),
 'user_tools',coalesce((select jsonb_agg(to_jsonb(t)) from user_tools t),'[]'::jsonb),
 'daily',coalesce((select jsonb_agg(to_jsonb(d) order by d.day) from daily d),'[]'::jsonb),
 'recent_visits',coalesce((select jsonb_agg(to_jsonb(r)) from (select user_id,tool_slug,opened_at,last_seen_at,active_seconds from visits order by opened_at desc limit 200) r),'[]'::jsonb)) into result;
 return result;
end; $$;
create or replace function public.purge_teacher_usage() returns bigint language plpgsql security definer set search_path=public,pg_temp as $$
declare n bigint;
begin
 if current_user not in ('postgres','supabase_admin') and not public.is_admin() then raise exception 'Admin access required' using errcode='42501'; end if;
 delete from public.usage_sessions where started_at<now()-interval '180 days'; get diagnostics n=row_count; return n;
end; $$;
revoke all on function public.set_usage_reporting(boolean),public.record_teacher_usage(uuid,uuid,text,integer),public.admin_usage_report(integer,uuid,boolean),public.purge_teacher_usage() from public,anon;
grant execute on function public.set_usage_reporting(boolean),public.record_teacher_usage(uuid,uuid,text,integer),public.admin_usage_report(integer,uuid,boolean) to authenticated;
-- Purge is callable only by database operators / the scheduled database job.
revoke all on function public.purge_teacher_usage() from authenticated;
commit;
-- Enable pg_cron in Supabase, then run ONCE (do not enable client collection before scheduling retention):
-- select cron.schedule('kaizen-teacher-usage-retention','15 3 * * *','select public.purge_teacher_usage()');
