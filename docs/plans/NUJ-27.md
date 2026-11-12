# NUJ-27 — Badges and badge shelf

**Epic:** NUJ-5 — Stars, badges & character progression
**Suggested sprint:** 4 · **Build order:** 19
**Agents:** nujoom-uiux, nujoom-db, nujoom-developer, nujoom-e2e
**Depends on:** NUJ-26

## User story
As a child, I want to earn badges for milestones so I can show my collection.

## Acceptance criteria
- [ ] Badge catalogue (seeded): first round, first 3-star round, 5 / all Arabic letters mastered, 5 / all English letters mastered, 3-day streak, first live room, room winner.
- [ ] Badges awarded server-side inside `record_round` / room-finish RPC (idempotent).
- [ ] Badge shelf screen; new badge pop-up with audio; locked badges shown as silhouettes.
- [ ] Parent notified (S28).

## Data touched
badges, child_badges.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
