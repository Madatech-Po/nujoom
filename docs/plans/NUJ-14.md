# NUJ-14 — Supabase base setup, client and generated types

**Epic:** NUJ-1 — Foundation & bilingual shell
**Suggested sprint:** 1 · **Build order:** 3
**Agents:** nujoom-db, nujoom-developer
**Depends on:** NUJ-9

## User story
As the dev team, I want the Nujoom Supabase project wired in with typed access so data stories can start.

## Acceptance criteria
- [ ] Supabase project `Nujoom` (ref `dnevaqcanwnykztyykkt`, eu-west-3) linked; migrations live in `supabase/migrations`.
- [ ] Baseline migration: `profiles` (id = auth.users.id, role `parent|teacher`, display_name, preferred_language, created_at) with RLS (owner read/update only).
- [ ] Typed Supabase client in `src/lib/supabase.ts`; `database.types.ts` generated.
- [ ] RLS enabled on every table from day one; advisors show no security warnings.
- [ ] Never touch any Supabase project other than Nujoom.

## Data touched
profiles.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
