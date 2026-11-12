-- Migration:   001_profiles
-- Description: Adult profiles (parents / teachers) linked 1:1 to auth.users,
--              created automatically on sign-up.
-- Jira:        NUJ-14
-- Access:      authenticated users read and update ONLY their own row, and only
--              display_name, preferred_language and roles. No insert/delete from the
--              client (rows come from the auth trigger and go with auth.users).
--              anon has no access. Children are NOT auth users (see NUJ-16).

create type public.adult_role as enum ('parent', 'teacher');

create table public.profiles (
  id                 uuid primary key references auth.users (id) on delete cascade,
  roles              public.adult_role[] not null default '{}',
  display_name       text check (char_length(display_name) between 1 and 50),
  preferred_language text not null default 'ar' check (preferred_language in ('ar', 'en')),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

comment on table public.profiles is 'Adult (parent/teacher) profile, one per auth user. NUJ-14.';
comment on column public.profiles.roles is 'Empty until the first-login role choice (NUJ-15); an adult can be both.';

alter table public.profiles enable row level security;

-- Privileges: nothing for anon; authenticated may select and update a few columns only.
revoke all on table public.profiles from anon, authenticated;
grant select on table public.profiles to authenticated;
grant update (display_name, preferred_language, roles) on table public.profiles to authenticated;

create policy "profiles: read own"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "profiles: update own"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Keep updated_at fresh.
create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

revoke all on function public.set_updated_at() from public, anon, authenticated;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Create the profile when an auth user is created.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    nullif(left(coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', ''), 50), '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

revoke all on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
