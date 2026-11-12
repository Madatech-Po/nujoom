# NUJ-15 — Adult sign-in with Google (parent / teacher)

**Epic:** NUJ-2 — Accounts & child login
**Suggested sprint:** 1 · **Build order:** 7
**Agents:** nujoom-db, nujoom-developer, nujoom-e2e
**Depends on:** NUJ-14

## User story
As a parent or teacher, I want to sign in with my Google account so I never manage another password.

## Acceptance criteria
- [ ] Supabase Auth Google provider; "Continue with Google" button on the adult entry screen.
- [ ] First sign-in asks "I am a parent / I am a teacher" (both allowed later via settings) and preferred language; saved to `profiles`.
- [ ] Session persists on the device; sign-out from the parent area only.
- [ ] Redirect URLs configured for localhost, preview and production domains.
- [ ] E2E: login is bypassed with a seeded test session (Google cannot be automated) — see open question on test accounts.

## Data touched
auth.users, profiles.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
