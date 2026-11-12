# NUJ-34 — Class weekly leaderboard and room podium

**Epic:** NUJ-7 — Leaderboard
**Suggested sprint:** 6 · **Build order:** 27
**Agents:** nujoom-db, nujoom-developer, nujoom-uiux, nujoom-e2e
**Depends on:** NUJ-29, NUJ-26

## User story
As a child, I want to see where I stand in my class this week so I want to earn more stars.

## Acceptance criteria
- [ ] Class leaderboard: stars earned this week (Sat–Fri or configurable) by class members, top 10 + "you".
- [ ] Shows nickname + avatar/Najm frame only; no global/public leaderboard in MVP.
- [ ] Positive framing for young kids (everyone in the list gets a cheer; no "last place" emphasis).
- [ ] Served by a view/RPC limited to the caller's classes.

## Data touched
View over game_sessions + room scores + class_members.

## Child safety / privacy
No child data visible outside their class.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
