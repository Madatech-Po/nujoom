# NUJ-22 — Save game sessions and per-letter progress

**Epic:** NUJ-3 — Arabic letters game
**Suggested sprint:** 2 · **Build order:** 13
**Agents:** nujoom-db, nujoom-developer
**Depends on:** NUJ-17, NUJ-20

## User story
As a parent, I want each round my child plays saved so I can see what they learned (and the child keeps their stars).

## Acceptance criteria
- [ ] Tables: `game_sessions` (child, language, mode, level, started/ended, correct, wrong, stars) and `letter_progress` (child, language, letter, attempts, correct, mastery 0–3, last_seen).
- [ ] Writes through an RPC `record_round(...)` that validates the child belongs to the caller and caps stars (no client-side forging beyond 3 per round).
- [ ] Offline-tolerant: if the save fails the round result is queued and retried.
- [ ] RLS: guardian (and the child context via guardian session) only; teachers see only room results (S25).

## Data touched
game_sessions, letter_progress.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
