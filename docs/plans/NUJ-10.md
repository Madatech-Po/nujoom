# NUJ-10 — GitHub repo setup and CI pipeline

**Epic:** NUJ-1 — Foundation & bilingual shell
**Suggested sprint:** 1 · **Build order:** 2
**Agents:** nujoom-github
**Depends on:** NUJ-9

## User story
As the dev team, I want every push and PR checked automatically so broken code never reaches main.

## Acceptance criteria
- [ ] Scaffold pushed to `Madatech-Po/nujoom` (private) on `main`.
- [ ] GitHub Actions workflow on PR + push to main: install, lint, typecheck, unit tests, build, Playwright (chromium mobile) with report artifact.
- [ ] Branch protection on `main`: PR required, CI must pass.
- [ ] Supabase URL/anon key stored as repo secrets/vars for CI e2e (no service-role key in CI).

## Data touched
Repo secrets only.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
