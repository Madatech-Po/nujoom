# NUJ-31 — Live room lobby with invites and presence

**Epic:** NUJ-6 — Teacher competition rooms (realtime)
**Suggested sprint:** 5 · **Build order:** 24
**Agents:** nujoom-db, nujoom-developer, nujoom-e2e, nujoom-uiux
**Depends on:** NUJ-30

## User story
As a child, I want to see when my teacher opens a challenge and join the waiting room with my classmates.

## Acceptance criteria
- [ ] Teacher opens the lobby → children of that class see a "Live challenge!" banner/sound on their home screen (Supabase Realtime on rooms).
- [ ] Joining shows the lobby with avatars of joined classmates (Realtime presence); teacher sees who is in.
- [ ] Only class members can join (RLS + RPC `join_room`).
- [ ] Playwright: two child contexts + one teacher context see each other in the lobby.

## Data touched
room_participants; realtime publication.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
