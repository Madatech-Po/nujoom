# NUJ-11 — Bilingual app shell with RTL/LTR switching

**Epic:** NUJ-1 — Foundation & bilingual shell
**Suggested sprint:** 1 · **Build order:** 4
**Agents:** nujoom-uiux, nujoom-developer, nujoom-e2e
**Depends on:** NUJ-9

## User story
As a child or parent, I want the app in Arabic or English with the layout flowing the right way so it feels natural in my language.

## Acceptance criteria
- [ ] i18n with Arabic (default) and English message files; no hard-coded UI strings.
- [ ] `<html lang dir>` switches between `ar`/`rtl` and `en`/`ltr`; layouts use logical Tailwind classes (`ms-`, `pe-`, `start-`…) so nothing breaks when mirrored.
- [ ] Language toggle (flag/letter icon, no reading needed) persists per device and later per child profile.
- [ ] Mobile-first shell: full-height, safe-area insets, no horizontal scroll at 360px width; portrait first.
- [ ] Arabic-friendly rounded font (e.g. Baloo Bhaijaan 2 / Cairo) and Latin counterpart, self-hosted or Google Fonts.
- [ ] Playwright: shell renders RTL in Arabic and LTR in English on a mobile viewport.

## Data touched
localStorage language preference.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
