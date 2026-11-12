# NUJ-12 — Kid-friendly design system and sound helper

**Epic:** NUJ-1 — Foundation & bilingual shell
**Suggested sprint:** 1 · **Build order:** 5
**Agents:** nujoom-uiux, nujoom-developer
**Depends on:** NUJ-11

## User story
As a 3–7 year old, I want big, bright, easy-to-tap buttons with sounds so I can use the app before I can read well.

## Acceptance criteria
- [ ] Tailwind tokens (colors, radii, spacing, shadows, type scale) from the uiux spec; minimum touch target 56×56px.
- [ ] Base components: BigButton, IconButton, Card, Modal, ProgressStars, Celebration (confetti/stars), AvatarBadge.
- [ ] Audio helper: preload + play letter/feedback sounds, respects a mute toggle, works after first user gesture on iOS Safari.
- [ ] Every instruction screen has an audio "listen" button (icon) — text is never the only cue.
- [ ] Contrast AA, focus visible, `prefers-reduced-motion` honoured.

## Data touched
None.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
