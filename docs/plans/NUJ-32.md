# NUJ-32 — Live room play: synced questions, answers and scoring

**Epic:** NUJ-6 — Teacher competition rooms (realtime)
**Suggested sprint:** 5 · **Build order:** 25
**Agents:** nujoom-db, nujoom-developer, nujoom-e2e, nujoom-uiux
**Depends on:** NUJ-31

## User story
As a child in a live challenge, I want the same question as everyone at the same time and to see if I got it right.

## Acceptance criteria
- [ ] Teacher starts → questions advance in sync (server timestamps; Realtime broadcast/DB state), countdown visible.
- [ ] Child answers once per question via RPC `submit_answer` (scored server-side: correct + speed bonus); late answers rejected.
- [ ] After each question: correct answer reveal + "you got it!" feedback; after the last: podium top 3 + everyone gets participation stars.
- [ ] Reconnect resumes the current question; teacher can end the room early.
- [ ] Playwright: 2 children answer, scores and podium match.

## Data touched
room_answers, room state; awards stars/badges.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
