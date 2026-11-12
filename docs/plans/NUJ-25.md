# NUJ-25 — English letter tracing

**Epic:** NUJ-4 — English letters game
**Suggested sprint:** 3 · **Build order:** 18
**Agents:** nujoom-developer, nujoom-e2e
**Depends on:** NUJ-21, NUJ-23

## User story
As a child, I want to trace English letters (capital and small) with my finger.

## Acceptance criteria
- [ ] Reuses the S13 tracing component with English stroke data (left-to-right).
- [ ] Both upper and lower case available per level.

## Data touched
Writes via S14.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
