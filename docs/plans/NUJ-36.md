# NUJ-36 — In-app notifications for parents

**Epic:** NUJ-8 — Parent view inside the child account
**Suggested sprint:** 6 · **Build order:** 28
**Agents:** nujoom-db, nujoom-developer
**Depends on:** NUJ-35

## User story
As a parent, I want to be told when my child earns a badge, is invited to a live room, or finishes the week.

## Acceptance criteria
- [ ] Notifications table filled by server functions (badge earned, class joined, room invite, weekly summary).
- [ ] Bell with unread count in the parent area; list with mark-as-read.
- [ ] Weekly summary generated on a schedule (pg_cron or Edge Function).
- [ ] Web push is out of MVP scope (listed as later).

## Data touched
notifications.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
