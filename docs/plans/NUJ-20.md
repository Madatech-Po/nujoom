# NUJ-20 — Letter game engine + Arabic "Listen and tap" mode

**Epic:** NUJ-3 — Arabic letters game
**Suggested sprint:** 2 · **Build order:** 12
**Agents:** nujoom-uiux, nujoom-developer, nujoom-e2e
**Depends on:** NUJ-19

## User story
As a child, I want to hear a letter and tap the right one so I learn to recognise letters by sound.

## Acceptance criteria
- [ ] Reusable, language-agnostic round engine: N questions per round (default 8), 3–4 big options, instant audio + visual feedback, retry on wrong answer, round summary with 1–3 stars.
- [ ] Arabic mode "اسمع واختار": plays letter name/sound, child taps the letter; options drawn from the current level with similar-looking distractors.
- [ ] Level map screen per language showing unlocked/locked levels (unlock next level at ≥2 stars).
- [ ] No reading required: all prompts are audio + icons.
- [ ] Unit tests for engine scoring; Playwright plays one full round in Arabic RTL.

## Data touched
Writes via S14.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
