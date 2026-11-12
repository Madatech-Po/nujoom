# NUJ-30 — Teacher creates a competition room and questions

**Epic:** NUJ-6 — Teacher competition rooms (realtime)
**Suggested sprint:** 5 · **Build order:** 23
**Agents:** nujoom-uiux, nujoom-db, nujoom-developer
**Depends on:** NUJ-29, NUJ-20

## User story
As a teacher, I want to create a live challenge with questions from the letters bank or my own so my class can compete.

## Acceptance criteria
- [ ] Room: class, title, language, question count, seconds per question (default 15), status draft/lobby/live/finished.
- [ ] Questions picked from the letter bank (auto-generate N from chosen letters) or added manually: prompt letter/sound, 3–4 options, correct option.
- [ ] Teacher can reorder/delete questions while draft.
- [ ] Correct answers are never readable by students before reveal (separate table / RLS).

## Data touched
rooms, room_questions, room_answer_keys.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
