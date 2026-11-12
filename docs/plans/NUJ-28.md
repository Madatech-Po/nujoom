# NUJ-28 — Najm character progression and unlockables

**Epic:** NUJ-5 — Stars, badges & character progression
**Suggested sprint:** 4 · **Build order:** 20
**Agents:** nujoom-uiux, nujoom-db, nujoom-developer
**Depends on:** NUJ-26

## User story
As a child, I want my star character to grow and get new outfits as I earn stars.

## Acceptance criteria
- [ ] Character "Najm" (نجم) with 5 levels at star thresholds (e.g. 0, 20, 60, 120, 250).
- [ ] Level-up animation; each level unlocks accessories the child can equip (hat, glasses, cape…).
- [ ] Equipped look shown on home screen and as the child's room/leaderboard avatar frame.
- [ ] Thresholds and items as config, easy to tune.

## Data touched
child_character (level, equipped items).

## Child safety / privacy
Original character art only.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
