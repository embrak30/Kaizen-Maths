-- Kaizen Maths starter auth schema
-- Run this in the Supabase SQL editor after creating your project.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'trial' check (role in ('free', 'trial', 'pro', 'school', 'admin')),
  school_id uuid,
  trial_ends_at timestamptz,
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text,
  plan_key text,
  current_period_end timestamptz,
  billing_updated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists stripe_customer_id text;
alter table public.profiles add column if not exists stripe_subscription_id text;
alter table public.profiles add column if not exists subscription_status text;
alter table public.profiles add column if not exists plan_key text;
alter table public.profiles add column if not exists current_period_end timestamptz;
alter table public.profiles add column if not exists billing_updated_at timestamptz;
create index if not exists profiles_stripe_customer_id_idx on public.profiles(stripe_customer_id);

alter table public.profiles enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
on public.profiles
for select
using (auth.uid() = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
on public.profiles
for insert
with check (auth.uid() = id and role in ('free', 'trial'));

drop policy if exists "Admins can read all profiles" on public.profiles;
create policy "Admins can read all profiles"
on public.profiles
for select
using (public.is_admin());

drop policy if exists "Admins can update profiles" on public.profiles;
create policy "Admins can update profiles"
on public.profiles
for update
using (public.is_admin())
with check (public.is_admin());

create table if not exists public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  licence_type text default 'school',
  allowed_domains text,
  seat_limit integer,
  join_code text unique,
  join_code_expires_at timestamptz,
  is_active boolean not null default true,
  notes text,
  licence_starts_at timestamptz,
  licence_ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.schools add column if not exists allowed_domains text;
alter table public.schools add column if not exists seat_limit integer;
alter table public.schools add column if not exists join_code text;
alter table public.schools add column if not exists join_code_expires_at timestamptz;
alter table public.schools add column if not exists is_active boolean not null default true;
alter table public.schools add column if not exists notes text;
alter table public.schools add column if not exists updated_at timestamptz not null default now();
alter table public.profiles add column if not exists school_id uuid references public.schools(id) on delete set null;
create index if not exists profiles_school_id_idx on public.profiles(school_id);
create index if not exists schools_join_code_idx on public.schools(join_code);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_school_id_fkey'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_school_id_fkey
      foreign key (school_id) references public.schools(id) on delete set null
      not valid;
  end if;
end;
$$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'schools_join_code_key'
      and conrelid = 'public.schools'::regclass
  ) then
    alter table public.schools add constraint schools_join_code_key unique (join_code);
  end if;
end;
$$;

create table if not exists public.school_teacher_access (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now(),
  unique (school_id, email)
);

alter table public.school_teacher_access enable row level security;
alter table public.schools enable row level security;

grant select on public.schools to anon, authenticated;
grant insert, update, delete on public.schools to authenticated;
grant select on public.school_teacher_access to authenticated;
grant insert, update, delete on public.school_teacher_access to authenticated;

drop policy if exists "Admins can read all schools" on public.schools;
create policy "Admins can read all schools"
on public.schools
for select
using (public.is_admin());

drop policy if exists "School users can read their school" on public.schools;
create policy "School users can read their school"
on public.schools
for select
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.school_id = schools.id
  )
);

drop policy if exists "Admins can insert schools" on public.schools;
create policy "Admins can insert schools"
on public.schools
for insert
with check (public.is_admin());

drop policy if exists "Admins can update schools" on public.schools;
create policy "Admins can update schools"
on public.schools
for update
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete schools" on public.schools;
create policy "Admins can delete schools"
on public.schools
for delete
using (public.is_admin());

drop policy if exists "Admins can read teacher access" on public.school_teacher_access;
create policy "Admins can read teacher access"
on public.school_teacher_access
for select
using (public.is_admin());

drop policy if exists "Admins can insert teacher access" on public.school_teacher_access;
create policy "Admins can insert teacher access"
on public.school_teacher_access
for insert
with check (public.is_admin());

drop policy if exists "Admins can update teacher access" on public.school_teacher_access;
create policy "Admins can update teacher access"
on public.school_teacher_access
for update
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete teacher access" on public.school_teacher_access;
create policy "Admins can delete teacher access"
on public.school_teacher_access
for delete
using (public.is_admin());

create or replace function public.claim_school_access(claim_code text)
returns table(ok boolean, message text, school_id uuid, school_name text)
language plpgsql
security definer
set search_path = public
as $$
declare
  current_profile public.profiles%rowtype;
  matched_school public.schools%rowtype;
  teacher_email text;
  teacher_domain text;
  domain_count integer;
  approved_count integer;
  current_seats integer;
  domain_allowed boolean;
  email_allowed boolean;
begin
  if auth.uid() is null then
    return query select false, 'Sign in before joining a school.', null::uuid, null::text;
    return;
  end if;

  select *
  into current_profile
  from public.profiles
  where id = auth.uid();

  if current_profile.id is null then
    return query select false, 'No teacher profile was found. Sign out and sign in again.', null::uuid, null::text;
    return;
  end if;

  teacher_email := lower(trim(current_profile.email));
  teacher_domain := split_part(teacher_email, '@', 2);

  select *
  into matched_school
  from public.schools
  where lower(join_code) = lower(trim(claim_code))
    and is_active = true
    and (join_code_expires_at is null or join_code_expires_at >= now())
    and (licence_starts_at is null or licence_starts_at <= now())
    and (licence_ends_at is null or licence_ends_at >= now())
  limit 1;

  if matched_school.id is null then
    return query select false, 'This school code is not valid or has expired.', null::uuid, null::text;
    return;
  end if;

  select count(*)
  into domain_count
  from regexp_split_to_table(coalesce(matched_school.allowed_domains, ''), ',') as d(domain)
  where trim(d.domain) <> '';

  select count(*)
  into approved_count
  from public.school_teacher_access
  where school_teacher_access.school_id = matched_school.id;

  select count(*)
  into current_seats
  from public.profiles
  where profiles.school_id = matched_school.id
    and profiles.role = 'school'
    and profiles.id <> auth.uid();

  if matched_school.seat_limit is not null and matched_school.seat_limit > 0 and current_seats >= matched_school.seat_limit then
    return query select false, 'This school licence has reached its teacher seat limit.', matched_school.id, matched_school.name;
    return;
  end if;

  select exists (
    select 1
    from regexp_split_to_table(coalesce(matched_school.allowed_domains, ''), ',') as d(domain)
    where lower(trim(both ' @' from d.domain)) = teacher_domain
  )
  into domain_allowed;

  select exists (
    select 1
    from public.school_teacher_access
    where school_teacher_access.school_id = matched_school.id
      and lower(trim(school_teacher_access.email)) = teacher_email
  )
  into email_allowed;

  if domain_count > 0 or approved_count > 0 then
    if not domain_allowed and not email_allowed then
      return query select false, 'Your email is not approved for this school licence.', matched_school.id, matched_school.name;
      return;
    end if;
  end if;

  update public.profiles
  set role = 'school',
      school_id = matched_school.id,
      updated_at = now()
  where id = auth.uid();

  return query select true, 'School access added.', matched_school.id, matched_school.name;
end;
$$;

grant execute on function public.claim_school_access(text) to authenticated;

create table if not exists public.tool_access (
  tool_slug text primary key,
  required_access text not null default 'free' check (required_access in ('free', 'trial', 'pro', 'school', 'admin'))
);

alter table public.tool_access enable row level security;

grant select on public.profiles to authenticated;
grant insert, update on public.profiles to authenticated;
grant select on public.tool_access to anon, authenticated;
grant insert, update, delete on public.tool_access to authenticated;

drop policy if exists "Anyone can read tool access" on public.tool_access;
create policy "Anyone can read tool access"
on public.tool_access
for select
using (true);

drop policy if exists "Admins can insert tool access" on public.tool_access;
create policy "Admins can insert tool access"
on public.tool_access
for insert
with check (public.is_admin());

drop policy if exists "Admins can update tool access" on public.tool_access;
create policy "Admins can update tool access"
on public.tool_access
for update
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete tool access" on public.tool_access;
create policy "Admins can delete tool access"
on public.tool_access
for delete
using (public.is_admin());

create table if not exists public.university_videos (
  slot_id text primary key,
  youtube_url text,
  title text,
  description text,
  duration_label text,
  updated_at timestamptz not null default now()
);

alter table public.university_videos add column if not exists title text;
alter table public.university_videos add column if not exists description text;
alter table public.university_videos add column if not exists duration_label text;

alter table public.university_videos enable row level security;

grant select on public.university_videos to anon, authenticated;
grant insert, update, delete on public.university_videos to authenticated;

drop policy if exists "Anyone can read university videos" on public.university_videos;
create policy "Anyone can read university videos"
on public.university_videos
for select
using (true);

drop policy if exists "Admins can insert university videos" on public.university_videos;
create policy "Admins can insert university videos"
on public.university_videos
for insert
with check (public.is_admin());

drop policy if exists "Admins can update university videos" on public.university_videos;
create policy "Admins can update university videos"
on public.university_videos
for update
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete university videos" on public.university_videos;
create policy "Admins can delete university videos"
on public.university_videos
for delete
using (public.is_admin());

create table if not exists public.site_testimonials (
  slot_id text primary key,
  quote text not null default '',
  person_name text,
  role_label text,
  organisation text,
  is_active boolean not null default true,
  sort_order integer not null default 1,
  updated_at timestamptz not null default now()
);

alter table public.site_testimonials add column if not exists person_name text;
alter table public.site_testimonials add column if not exists role_label text;
alter table public.site_testimonials add column if not exists organisation text;
alter table public.site_testimonials add column if not exists is_active boolean not null default true;
alter table public.site_testimonials add column if not exists sort_order integer not null default 1;

alter table public.site_testimonials enable row level security;

grant select on public.site_testimonials to anon, authenticated;
grant insert, update, delete on public.site_testimonials to authenticated;

drop policy if exists "Anyone can read active testimonials" on public.site_testimonials;
create policy "Anyone can read active testimonials"
on public.site_testimonials
for select
using (is_active or public.is_admin());

drop policy if exists "Admins can insert testimonials" on public.site_testimonials;
create policy "Admins can insert testimonials"
on public.site_testimonials
for insert
with check (public.is_admin());

drop policy if exists "Admins can update testimonials" on public.site_testimonials;
create policy "Admins can update testimonials"
on public.site_testimonials
for update
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete testimonials" on public.site_testimonials;
create policy "Admins can delete testimonials"
on public.site_testimonials
for delete
using (public.is_admin());

create table if not exists public.homepage_content (
  content_key text primary key,
  content_value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.homepage_content enable row level security;

grant select on public.homepage_content to anon, authenticated;
grant insert, update, delete on public.homepage_content to authenticated;

drop policy if exists "Anyone can read homepage content" on public.homepage_content;
create policy "Anyone can read homepage content"
on public.homepage_content
for select
using (true);

drop policy if exists "Admins can insert homepage content" on public.homepage_content;
create policy "Admins can insert homepage content"
on public.homepage_content
for insert
with check (public.is_admin());

drop policy if exists "Admins can update homepage content" on public.homepage_content;
create policy "Admins can update homepage content"
on public.homepage_content
for update
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete homepage content" on public.homepage_content;
create policy "Admins can delete homepage content"
on public.homepage_content
for delete
using (public.is_admin());

create table if not exists public.homepage_screenshots (
  screenshot_id text primary key,
  title text not null default '',
  description text,
  image_url text not null default '',
  is_active boolean not null default true,
  sort_order integer not null default 1,
  updated_at timestamptz not null default now()
);

alter table public.homepage_screenshots add column if not exists description text;
alter table public.homepage_screenshots add column if not exists image_url text not null default '';
alter table public.homepage_screenshots add column if not exists is_active boolean not null default true;
alter table public.homepage_screenshots add column if not exists sort_order integer not null default 1;

alter table public.homepage_screenshots enable row level security;

grant select on public.homepage_screenshots to anon, authenticated;
grant insert, update, delete on public.homepage_screenshots to authenticated;

drop policy if exists "Anyone can read active homepage screenshots" on public.homepage_screenshots;
create policy "Anyone can read active homepage screenshots"
on public.homepage_screenshots
for select
using (is_active or public.is_admin());

drop policy if exists "Admins can insert homepage screenshots" on public.homepage_screenshots;
create policy "Admins can insert homepage screenshots"
on public.homepage_screenshots
for insert
with check (public.is_admin());

drop policy if exists "Admins can update homepage screenshots" on public.homepage_screenshots;
create policy "Admins can update homepage screenshots"
on public.homepage_screenshots
for update
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete homepage screenshots" on public.homepage_screenshots;
create policy "Admins can delete homepage screenshots"
on public.homepage_screenshots
for delete
using (public.is_admin());

create table if not exists public.tool_metadata (
  tool_slug text primary key,
  curriculum_tags text,
  admin_notes text,
  updated_at timestamptz not null default now()
);

alter table public.tool_metadata enable row level security;

grant select on public.tool_metadata to anon, authenticated;
grant insert, update, delete on public.tool_metadata to authenticated;

drop policy if exists "Anyone can read tool metadata" on public.tool_metadata;
create policy "Anyone can read tool metadata"
on public.tool_metadata
for select
using (true);

drop policy if exists "Admins can insert tool metadata" on public.tool_metadata;
create policy "Admins can insert tool metadata"
on public.tool_metadata
for insert
with check (public.is_admin());

drop policy if exists "Admins can update tool metadata" on public.tool_metadata;
create policy "Admins can update tool metadata"
on public.tool_metadata
for update
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete tool metadata" on public.tool_metadata;
create policy "Admins can delete tool metadata"
on public.tool_metadata
for delete
using (public.is_admin());

create table if not exists public.tool_info_overrides (
  tool_slug text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.tool_info_overrides enable row level security;

grant select on public.tool_info_overrides to anon, authenticated;
grant insert, update, delete on public.tool_info_overrides to authenticated;

drop policy if exists "Anyone can read tool information overrides" on public.tool_info_overrides;
create policy "Anyone can read tool information overrides"
on public.tool_info_overrides
for select
using (true);

drop policy if exists "Admins can insert tool information overrides" on public.tool_info_overrides;
create policy "Admins can insert tool information overrides"
on public.tool_info_overrides
for insert
with check (public.is_admin());

drop policy if exists "Admins can update tool information overrides" on public.tool_info_overrides;
create policy "Admins can update tool information overrides"
on public.tool_info_overrides
for update
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete tool information overrides" on public.tool_info_overrides;
create policy "Admins can delete tool information overrides"
on public.tool_info_overrides
for delete
using (public.is_admin());

create table if not exists public.tutor_learners (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references auth.users(id) on delete cascade,
  alias text not null check (char_length(alias) <= 80),
  level text,
  exam_board text,
  focus_notes text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.tutor_learners add column if not exists level text;
alter table public.tutor_learners add column if not exists exam_board text;
alter table public.tutor_learners add column if not exists year_group text;
alter table public.tutor_learners add column if not exists target_grade text;
alter table public.tutor_learners add column if not exists key_weaknesses text;
alter table public.tutor_learners add column if not exists learner_goals text;
alter table public.tutor_learners add column if not exists favourite_tools text;
alter table public.tutor_learners add column if not exists focus_notes text;
alter table public.tutor_learners add column if not exists status text not null default 'active';
alter table public.tutor_learners add column if not exists updated_at timestamptz not null default now();

create index if not exists tutor_learners_tutor_id_idx on public.tutor_learners(tutor_id);

alter table public.tutor_learners enable row level security;

grant select, insert, update, delete on public.tutor_learners to authenticated;

drop policy if exists "Tutors can read their own learners" on public.tutor_learners;
create policy "Tutors can read their own learners"
on public.tutor_learners
for select
using (auth.uid() = tutor_id or public.is_admin());

drop policy if exists "Paid tutors can insert their own learners" on public.tutor_learners;
create policy "Paid tutors can insert their own learners"
on public.tutor_learners
for insert
with check (
  auth.uid() = tutor_id
  and exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role in ('pro', 'school', 'admin')
  )
);

drop policy if exists "Tutors can update their own learners" on public.tutor_learners;
create policy "Tutors can update their own learners"
on public.tutor_learners
for update
using (auth.uid() = tutor_id or public.is_admin())
with check (auth.uid() = tutor_id or public.is_admin());

drop policy if exists "Tutors can delete their own learners" on public.tutor_learners;
create policy "Tutors can delete their own learners"
on public.tutor_learners
for delete
using (auth.uid() = tutor_id or public.is_admin());

create table if not exists public.tutor_sessions (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references auth.users(id) on delete cascade,
  learner_id uuid not null references public.tutor_learners(id) on delete cascade,
  session_date date not null default current_date,
  topic text,
  tool_slug text,
  confidence text check (confidence is null or confidence in ('introduced', 'practising', 'secure', 'needs-revisit')),
  session_notes text,
  next_steps text,
  homework text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.tutor_sessions add column if not exists topic text;
alter table public.tutor_sessions add column if not exists tool_slug text;
alter table public.tutor_sessions add column if not exists confidence text;
alter table public.tutor_sessions add column if not exists session_notes text;
alter table public.tutor_sessions add column if not exists next_steps text;
alter table public.tutor_sessions add column if not exists homework text;
alter table public.tutor_sessions add column if not exists updated_at timestamptz not null default now();

create index if not exists tutor_sessions_tutor_id_idx on public.tutor_sessions(tutor_id);
create index if not exists tutor_sessions_learner_id_idx on public.tutor_sessions(learner_id);
create index if not exists tutor_sessions_session_date_idx on public.tutor_sessions(session_date);

alter table public.tutor_sessions enable row level security;

grant select, insert, update, delete on public.tutor_sessions to authenticated;

drop policy if exists "Tutors can read their own sessions" on public.tutor_sessions;
create policy "Tutors can read their own sessions"
on public.tutor_sessions
for select
using (auth.uid() = tutor_id or public.is_admin());

drop policy if exists "Paid tutors can insert their own sessions" on public.tutor_sessions;
create policy "Paid tutors can insert their own sessions"
on public.tutor_sessions
for insert
with check (
  auth.uid() = tutor_id
  and exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role in ('pro', 'school', 'admin')
  )
  and exists (
    select 1
    from public.tutor_learners
    where tutor_learners.id = learner_id
      and tutor_learners.tutor_id = auth.uid()
  )
);

drop policy if exists "Tutors can update their own sessions" on public.tutor_sessions;
create policy "Tutors can update their own sessions"
on public.tutor_sessions
for update
using (auth.uid() = tutor_id or public.is_admin())
with check (auth.uid() = tutor_id or public.is_admin());

drop policy if exists "Tutors can delete their own sessions" on public.tutor_sessions;
create policy "Tutors can delete their own sessions"
on public.tutor_sessions
for delete
using (auth.uid() = tutor_id or public.is_admin());

create table if not exists public.tutor_topic_progress (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references auth.users(id) on delete cascade,
  learner_id uuid not null references public.tutor_learners(id) on delete cascade,
  topic text not null,
  status text not null default 'developing' check (status in ('secure', 'developing', 'needs-revisit')),
  last_practised_at date,
  tool_slug text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tutor_topic_progress_tutor_id_idx on public.tutor_topic_progress(tutor_id);
create index if not exists tutor_topic_progress_learner_id_idx on public.tutor_topic_progress(learner_id);

alter table public.tutor_topic_progress enable row level security;

grant select, insert, update, delete on public.tutor_topic_progress to authenticated;

drop policy if exists "Tutors can read their own topic progress" on public.tutor_topic_progress;
create policy "Tutors can read their own topic progress"
on public.tutor_topic_progress
for select
using (auth.uid() = tutor_id or public.is_admin());

drop policy if exists "Paid tutors can insert their own topic progress" on public.tutor_topic_progress;
create policy "Paid tutors can insert their own topic progress"
on public.tutor_topic_progress
for insert
with check (
  auth.uid() = tutor_id
  and exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role in ('pro', 'school', 'admin')
  )
  and exists (
    select 1
    from public.tutor_learners
    where tutor_learners.id = learner_id
      and tutor_learners.tutor_id = auth.uid()
  )
);

drop policy if exists "Tutors can update their own topic progress" on public.tutor_topic_progress;
create policy "Tutors can update their own topic progress"
on public.tutor_topic_progress
for update
using (auth.uid() = tutor_id or public.is_admin())
with check (auth.uid() = tutor_id or public.is_admin());

drop policy if exists "Tutors can delete their own topic progress" on public.tutor_topic_progress;
create policy "Tutors can delete their own topic progress"
on public.tutor_topic_progress
for delete
using (auth.uid() = tutor_id or public.is_admin());

create table if not exists public.tutor_homework (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references auth.users(id) on delete cascade,
  learner_id uuid not null references public.tutor_learners(id) on delete cascade,
  task text not null,
  due_date date,
  status text not null default 'set' check (status in ('set', 'completed', 'missed', 'reviewed')),
  topic text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tutor_homework_tutor_id_idx on public.tutor_homework(tutor_id);
create index if not exists tutor_homework_learner_id_idx on public.tutor_homework(learner_id);
create index if not exists tutor_homework_due_date_idx on public.tutor_homework(due_date);

alter table public.tutor_homework enable row level security;

grant select, insert, update, delete on public.tutor_homework to authenticated;

drop policy if exists "Tutors can read their own homework" on public.tutor_homework;
create policy "Tutors can read their own homework"
on public.tutor_homework
for select
using (auth.uid() = tutor_id or public.is_admin());

drop policy if exists "Paid tutors can insert their own homework" on public.tutor_homework;
create policy "Paid tutors can insert their own homework"
on public.tutor_homework
for insert
with check (
  auth.uid() = tutor_id
  and exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role in ('pro', 'school', 'admin')
  )
  and exists (
    select 1
    from public.tutor_learners
    where tutor_learners.id = learner_id
      and tutor_learners.tutor_id = auth.uid()
  )
);

drop policy if exists "Tutors can update their own homework" on public.tutor_homework;
create policy "Tutors can update their own homework"
on public.tutor_homework
for update
using (auth.uid() = tutor_id or public.is_admin())
with check (auth.uid() = tutor_id or public.is_admin());

drop policy if exists "Tutors can delete their own homework" on public.tutor_homework;
create policy "Tutors can delete their own homework"
on public.tutor_homework
for delete
using (auth.uid() = tutor_id or public.is_admin());

create table if not exists public.tutor_assessments (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references auth.users(id) on delete cascade,
  learner_id uuid not null references public.tutor_learners(id) on delete cascade,
  assessment_date date not null default current_date,
  title text,
  topic text,
  score numeric,
  max_score numeric,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tutor_assessments_tutor_id_idx on public.tutor_assessments(tutor_id);
create index if not exists tutor_assessments_learner_id_idx on public.tutor_assessments(learner_id);
create index if not exists tutor_assessments_date_idx on public.tutor_assessments(assessment_date);

alter table public.tutor_assessments enable row level security;

grant select, insert, update, delete on public.tutor_assessments to authenticated;

drop policy if exists "Tutors can read their own assessments" on public.tutor_assessments;
create policy "Tutors can read their own assessments"
on public.tutor_assessments
for select
using (auth.uid() = tutor_id or public.is_admin());

drop policy if exists "Paid tutors can insert their own assessments" on public.tutor_assessments;
create policy "Paid tutors can insert their own assessments"
on public.tutor_assessments
for insert
with check (
  auth.uid() = tutor_id
  and exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role in ('pro', 'school', 'admin')
  )
  and exists (
    select 1
    from public.tutor_learners
    where tutor_learners.id = learner_id
      and tutor_learners.tutor_id = auth.uid()
  )
);

drop policy if exists "Tutors can update their own assessments" on public.tutor_assessments;
create policy "Tutors can update their own assessments"
on public.tutor_assessments
for update
using (auth.uid() = tutor_id or public.is_admin())
with check (auth.uid() = tutor_id or public.is_admin());

drop policy if exists "Tutors can delete their own assessments" on public.tutor_assessments;
create policy "Tutors can delete their own assessments"
on public.tutor_assessments
for delete
using (auth.uid() = tutor_id or public.is_admin());
