-- Newsletter drafts only. Brevo remains authoritative for consent, suppression and delivery.
-- Apply manually after the base schema; this migration never sends or imports contacts.
begin;
create table if not exists public.newsletter_drafts (
 id uuid primary key,
 content jsonb not null check (jsonb_typeof(content)='object' and octet_length(content::text)<=30000),
 revision integer not null default 1 check (revision>0),
 status text not null default 'draft' check (status in ('draft','preparing','prepared','testing','tested','sending','sent','needs_review')),
 brevo_campaign_id bigint check (brevo_campaign_id>0),
 prepared_revision integer,
 prepared_config_hash text,
 prepared_remote_hash text,
 provider_modified_at text,
 tested_at timestamptz,
 tested_by uuid references auth.users(id) on delete set null,
 sent_at timestamptz,
 sent_by uuid references auth.users(id) on delete set null,
 created_by uuid references auth.users(id) on delete set null,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
alter table public.newsletter_drafts enable row level security;
revoke all on public.newsletter_drafts from public,anon,authenticated;
grant select on public.newsletter_drafts to authenticated;
grant all on public.newsletter_drafts to service_role;
drop policy if exists "Only admins can read newsletter drafts" on public.newsletter_drafts;
create policy "Only admins can read newsletter drafts" on public.newsletter_drafts for select to authenticated using (public.is_admin());
create index if not exists newsletter_drafts_updated_idx on public.newsletter_drafts(updated_at desc);
comment on table public.newsletter_drafts is 'Admin newsletter drafts and provider mapping. No subscriber email addresses; Brevo manages newsletter opt-in and suppression.';
commit;
