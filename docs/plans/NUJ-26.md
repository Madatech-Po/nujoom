# NUJ-26 — Stars: earn, total and celebrate

**Epic:** NUJ-5 — Stars, badges & character progression
**Suggested sprint:** 2 · **Build order:** 14
**Agents:** nujoom-uiux, nujoom-db, nujoom-developer
**Depends on:** NUJ-22

## User story
As a child, I want to collect stars when I play well so I feel proud and want to play more.

## Acceptance criteria
- [ ] Each round awards 0–3 stars (from S14); child total shown on home screen with an animated counter.
- [ ] Celebration screen with sound when stars are earned; daily "first round" bonus star.
- [ ] Star total derived server-side (view or column maintained by `record_round`), not trusted from client.

## Data touched
children.total_stars or view over game_sessions.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
