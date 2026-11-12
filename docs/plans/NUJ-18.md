# NUJ-18 — Parent gate to leave child mode

**Epic:** NUJ-2 — Accounts & child login
**Suggested sprint:** 1 · **Build order:** 10
**Agents:** nujoom-uiux, nujoom-developer, nujoom-e2e
**Depends on:** NUJ-17

## User story
As a parent, I want adult screens protected by a simple grown-up check so my child does not change settings or leave by accident.

## Acceptance criteria
- [ ] Gate = a task a young child cannot do reliably (e.g. "type the number seven-three" in words, or hold-and-solve simple multiplication), randomised each time.
- [ ] Required before: parent dashboard, settings, sign-out, external links.
- [ ] Gate passes for 5 minutes then re-locks; returning to child mode re-locks immediately.
- [ ] Works in Arabic and English.

## Data touched
None (client-side).

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
