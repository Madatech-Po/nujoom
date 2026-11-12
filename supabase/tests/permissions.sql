-- Permission tests for Nujoom. Run with the Supabase MCP `execute_sql` (or psql).
-- Everything runs in one transaction that ends in ROLLBACK, so no data is kept.
-- Each check raises an exception on failure; success returns 'ALL PERMISSION CHECKS PASSED'.

begin;

-- Two fake adults (test-only rows, rolled back).
insert into auth.users (id, email, aud, role, raw_user_meta_data)
values
  ('00000000-0000-4000-8000-00000000000a', 'e2e-a@example.test', 'authenticated', 'authenticated', '{"full_name":"Test Parent A"}'),
  ('00000000-0000-4000-8000-00000000000b', 'e2e-b@example.test', 'authenticated', 'authenticated', '{}');

-- ---------- NUJ-14: profiles ----------

-- Trigger created both profiles with defaults.
do $$
begin
  if (select count(*) from public.profiles
      where id in ('00000000-0000-4000-8000-00000000000a', '00000000-0000-4000-8000-00000000000b')) <> 2 then
    raise exception 'FAIL profiles: trigger did not create a profile per auth user';
  end if;
  if (select display_name from public.profiles where id = '00000000-0000-4000-8000-00000000000a') <> 'Test Parent A' then
    raise exception 'FAIL profiles: display_name not copied from metadata';
  end if;
  if (select preferred_language from public.profiles where id = '00000000-0000-4000-8000-00000000000b') <> 'ar' then
    raise exception 'FAIL profiles: default language is not ar';
  end if;
end $$;

-- Act as user A.
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-4000-8000-00000000000a","role":"authenticated"}', true);

do $$
declare n int;
begin
  -- ALLOWED: read own row only.
  select count(*) into n from public.profiles;
  if n <> 1 then raise exception 'FAIL profiles: A sees % rows, expected 1', n; end if;

  -- ALLOWED: update own allowed columns.
  update public.profiles set preferred_language = 'en', roles = '{parent,teacher}'
   where id = '00000000-0000-4000-8000-00000000000a';
  get diagnostics n = row_count;
  if n <> 1 then raise exception 'FAIL profiles: A could not update own row'; end if;

  -- DENIED (silently): update someone else's row affects 0 rows.
  update public.profiles set display_name = 'hacked'
   where id = '00000000-0000-4000-8000-00000000000b';
  get diagnostics n = row_count;
  if n <> 0 then raise exception 'FAIL profiles: A updated B''s row'; end if;

  -- DENIED: changing a column without column privilege (created_at).
  begin
    update public.profiles set created_at = now() - interval '1 year'
     where id = '00000000-0000-4000-8000-00000000000a';
    raise exception 'FAIL profiles: A updated created_at';
  exception when insufficient_privilege then null;
  end;

  -- DENIED: insert and delete.
  begin
    insert into public.profiles (id) values (gen_random_uuid());
    raise exception 'FAIL profiles: A inserted a profile';
  exception when insufficient_privilege then null;
  end;
  begin
    delete from public.profiles where id = '00000000-0000-4000-8000-00000000000a';
    raise exception 'FAIL profiles: A deleted a profile';
  exception when insufficient_privilege then null;
  end;

  -- DENIED: invalid language value.
  begin
    update public.profiles set preferred_language = 'fr'
     where id = '00000000-0000-4000-8000-00000000000a';
    raise exception 'FAIL profiles: invalid language accepted';
  exception when check_violation then null;
  end;
end $$;

-- Act as anon.
reset role;
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);

do $$
begin
  begin
    perform 1 from public.profiles limit 1;
    raise exception 'FAIL profiles: anon can read profiles';
  exception when insufficient_privilege then null;
  end;
end $$;

reset role;
select 'ALL PERMISSION CHECKS PASSED' as result;

rollback;
