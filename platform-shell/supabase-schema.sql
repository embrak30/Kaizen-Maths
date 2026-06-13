-- Kaizen Maths starter auth schema
-- Run this in the Supabase SQL editor after creating your project.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'trial' check (role in ('free', 'trial', 'pro', 'school', 'admin')),
  school_id uuid,
  trial_ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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
  licence_starts_at timestamptz,
  licence_ends_at timestamptz,
  created_at timestamptz not null default now()
);

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
