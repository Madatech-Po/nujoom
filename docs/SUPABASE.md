# Supabase — Nujoom

- Project: **Nujoom**, ref `dnevaqcanwnykztyykkt`, region eu-west-3 (Paris), free plan.
- URL: `https://dnevaqcanwnykztyykkt.supabase.co` — the anon key is public by design (RLS protects data).
- Only this project is ever touched by Nujoom tooling.

## Conventions
- Migrations: `supabase/migrations/NNN_name.sql`, applied with the Supabase MCP `apply_migration`
  under the same name. Header: Migration / Description / Jira / Access.
- Every table has RLS on; grants are explicit (anon gets nothing unless a story says so).
- SECURITY DEFINER functions use `set search_path = ''` and are revoked from public/anon.
- Permission tests: `supabase/tests/permissions.sql` (one transaction ending in ROLLBACK);
  expected result `ALL PERMISSION CHECKS PASSED`.
- Types: `src/types/database.ts`, regenerated after each migration; client in `src/lib/supabase.ts`.

## Applied migrations
| # | Name | Live version | Jira | Summary |
|---|---|---|---|---|
| 001 | profiles | 20261112234733 | NUJ-14 | `adult_role` enum, `profiles` (1:1 auth.users, own-row read/update, column-limited), auto-create trigger |

## Data model notes
- `profiles` are **adults** (parent, teacher or both). Children are not auth users; they become
  parent-owned rows in NUJ-16.
