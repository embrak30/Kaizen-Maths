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

create policy "Users can read their own profile"
on public.profiles
for select
using (auth.uid() = id);

create policy "Users can insert their own profile"
on public.profiles
for insert
with check (auth.uid() = id and role in ('free', 'trial'));

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
