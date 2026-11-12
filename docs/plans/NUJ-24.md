# NUJ-24 — English "Listen and tap" and "Match big & small" modes

**Epic:** NUJ-4 — English letters game
**Suggested sprint:** 3 · **Build order:** 17
**Agents:** nujoom-developer, nujoom-e2e
**Depends on:** NUJ-23, NUJ-22

## User story
As a child, I want to play the letters game in English, and match capital and small letters.

## Acceptance criteria
- [ ] English "Listen and tap" reuses the S12 engine (LTR layout).
- [ ] New mode "Match big & small": pick the lowercase partner of an uppercase letter (and vice versa).
- [ ] Level map, stars and saving identical to Arabic (S12/S14).
- [ ] Playwright plays one English round in LTR.

## Data touched
Writes via S14.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
