# NUJ-19 — Arabic letters content and audio set

**Epic:** NUJ-3 — Arabic letters game
**Suggested sprint:** 2 · **Build order:** 11
**Agents:** nujoom-developer, nujoom-uiux
**Depends on:** NUJ-12

## User story
As a child learning Arabic, I want each letter to have its name, sound, shapes and a picture word so I can connect sound and shape.

## Acceptance criteria
- [ ] 28 letters with: letter, name (ألف، باء…), short-vowel sounds (فتحة/ضمة/كسرة) for the sound game, isolated/initial/medial/final forms, one example word + illustration per letter.
- [ ] Letters grouped into learning levels (e.g. visually similar groups ب ت ث ، ج ح خ …).
- [ ] Audio file per letter name, per letter sound and per example word (format: mp3/ogg, ≤ 50 KB each), cached by the service worker.
- [ ] Content as typed static data in `src/content/ar-letters.ts` (DB table only if teachers need to edit it later).
- [ ] Missing audio/image produces a build-time check failure.

## Data touched
Static content + /public/audio, /public/img.

## Child safety / privacy
Audio/illustrations must be original or licensed for commercial use.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
