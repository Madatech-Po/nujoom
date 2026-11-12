# NUJ-29 — Teacher classes and joining a class with a code

**Epic:** NUJ-6 — Teacher competition rooms (realtime)
**Suggested sprint:** 4 · **Build order:** 22
**Agents:** nujoom-uiux, nujoom-db, nujoom-developer, nujoom-e2e
**Depends on:** NUJ-18, NUJ-15

## User story
As a teacher, I want to create a class and share a code so parents can add their child to my class.

## Acceptance criteria
- [ ] Teacher creates classes (name, language focus); each gets a 6-character code (no ambiguous chars), regenerable.
- [ ] Parent (behind parent gate) enters the code to link a child; teacher sees the child's nickname + avatar only.
- [ ] Teacher can remove a child; parent can leave a class.
- [ ] Only `role = teacher` profiles can create classes (RLS + RPC).

## Data touched
classes, class_members.

## Child safety / privacy
Teachers never see parent email or child real name; teacher-only creation.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
