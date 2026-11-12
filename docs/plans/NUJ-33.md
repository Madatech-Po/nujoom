# NUJ-33 — Room results for the teacher

**Epic:** NUJ-6 — Teacher competition rooms (realtime)
**Suggested sprint:** 6 · **Build order:** 26
**Agents:** nujoom-db, nujoom-developer, nujoom-uiux
**Depends on:** NUJ-32

## User story
As a teacher, I want to see each child's answers after a challenge so I know which letters need more practice.

## Acceptance criteria
- [ ] Results page per room: per child score, per question % correct, hardest letters.
- [ ] Room history list per class.
- [ ] Visible to the room's teacher only.

## Data touched
Reads room_answers.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
