# NUJ-13 — Cloudflare hosting, deploy on main and PWA basics

**Epic:** NUJ-1 — Foundation & bilingual shell
**Suggested sprint:** 1 · **Build order:** 6
**Agents:** nujoom-deploy
**Depends on:** NUJ-10

## User story
As a parent, I want to open Nujoom from a link on my phone (and add it to my home screen) without installing anything.

## Acceptance criteria
- [ ] Static Vite build deployed to Cloudflare (Workers static assets or Pages) from `main` via GitHub Actions.
- [ ] SPA fallback routing works (deep links load).
- [ ] Web app manifest (name نجوم / Nujoom, icons, theme color, standalone), installable on Android Chrome and iOS Safari "Add to Home Screen".
- [ ] Preview deploys for PRs (optional, if free).
- [ ] Post-deploy smoke test hits the live URL.

## Data touched
Cloudflare secrets.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
