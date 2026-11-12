# NUJ-23 — English letters content and audio set

**Epic:** NUJ-4 — English letters game
**Suggested sprint:** 3 · **Build order:** 16
**Agents:** nujoom-developer, nujoom-uiux
**Depends on:** NUJ-19

## User story
As a child learning English, I want each letter with its name, phonics sound and a picture word.

## Acceptance criteria
- [ ] 26 letters with upper/lower case, letter name, phonics sound, example word + illustration, tracing stroke paths.
- [ ] Levels (e.g. s a t p i n first, then the rest) defined in `src/content/en-letters.ts`.
- [ ] Audio per letter name, sound and word; same size/caching rules as Arabic.

## Data touched
Static content.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
