# NUJ-16 — Parental consent and creating child profiles

**Epic:** NUJ-2 — Accounts & child login
**Suggested sprint:** 1 · **Build order:** 8
**Agents:** nujoom-uiux, nujoom-db, nujoom-developer, nujoom-e2e
**Depends on:** NUJ-15

## User story
As a parent, I want to add each of my children with a nickname, avatar and secret picture/PIN so each child has their own progress.

## Acceptance criteria
- [ ] Before the first child is added the parent accepts a clear consent notice (what data is stored, why, how to delete) — stored with timestamp and version (COPPA/GDPR-K style).
- [ ] Child fields: nickname (not full name, max 20 chars), age band (3–4, 5–6, 7), avatar chosen from built-in illustrations (no photo upload), preferred language.
- [ ] Secret: picture password (3 pictures in order from a grid of 9) OR 4-digit PIN; stored only as a salted hash (pgcrypto) — never readable from the client.
- [ ] Up to 6 children per parent.
- [ ] RLS: only the guardian can read/update their children.

## Data touched
children, child_secrets (hashed), parental_consents.

## Child safety / privacy
No real names or photos of children; consent recorded; secret hashed server-side.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
