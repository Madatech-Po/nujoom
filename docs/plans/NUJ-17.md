# NUJ-17 — Child picker and picture/PIN login ("Who is playing?")

**Epic:** NUJ-2 — Accounts & child login
**Suggested sprint:** 1 · **Build order:** 9
**Agents:** nujoom-uiux, nujoom-db, nujoom-developer, nujoom-e2e
**Depends on:** NUJ-16

## User story
As a child, I want to tap my avatar and enter my pictures or PIN so I get into my own games without typing.

## Acceptance criteria
- [ ] "Who is playing?" screen shows avatars + nicknames of the children on this signed-in parent device.
- [ ] Tapping an avatar opens the picture grid or PIN pad (big keys, audio prompt).
- [ ] Verification through a SECURITY DEFINER RPC `verify_child_secret(child_id, secret)`; on success the app enters child mode with `child_id` in context.
- [ ] 5 wrong attempts → 1-minute cool-down with a friendly animation; parent can reset from parent area.
- [ ] "Switch player" returns to the picker; child mode cannot reach adult screens without the parent gate.
- [ ] E2E: child logs in with picture password and with PIN; wrong secret is rejected.

## Data touched
children, child_secrets (RPC), child_login_attempts.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
