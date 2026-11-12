# NUJ-35 — Parent dashboard inside the child account

**Epic:** NUJ-8 — Parent view inside the child account
**Suggested sprint:** 4 · **Build order:** 21
**Agents:** nujoom-uiux, nujoom-db, nujoom-developer, nujoom-e2e
**Depends on:** NUJ-22, NUJ-27

## User story
As a parent, I want to see my child's progress from their own account so I know what they learned and where they struggle.

## Acceptance criteria
- [ ] Reached via the parent gate from child mode.
- [ ] Per child: total stars, badges, Najm level, time played this week, letters mastered / learning / not started per language (letter grid with colours), recent sessions and room results.
- [ ] Suggestion card: "practice these letters" (lowest mastery).
- [ ] Bilingual, mobile layout.

## Data touched
Reads game_sessions, letter_progress, child_badges.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
