# NUJ-37 — Parent settings: manage children, secrets and data deletion

**Epic:** NUJ-8 — Parent view inside the child account
**Suggested sprint:** 6 · **Build order:** 29
**Agents:** nujoom-db, nujoom-developer, nujoom-e2e
**Depends on:** NUJ-17

## User story
As a parent, I want to edit my children, reset their picture/PIN and delete their data whenever I want.

## Acceptance criteria
- [ ] Edit nickname/avatar/age band/language; reset picture password or PIN; unlock after cool-down.
- [ ] Delete child → removes the child and all their progress (cascade) after a confirm step.
- [ ] Delete my account → removes parent profile + all children.
- [ ] Export child data as JSON (data-portability).

## Data touched
children, child_secrets, all child-linked tables.

## Child safety / privacy
Right to delete and export; hard delete with cascade.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
