# NUJ-9 — Project scaffold (Vite + React + TS + Tailwind + tests)

**Epic:** NUJ-1 — Foundation & bilingual shell
**Suggested sprint:** 1 · **Build order:** 1
**Agents:** nujoom-developer
**Depends on:** —

## User story
As the dev team, I want a clean project skeleton so every later story builds on the same structure, lint rules and test setup.

## Acceptance criteria
- [ ] Vite + React 19 + TypeScript (strict) + Tailwind CSS app runs with `npm run dev` on Node 24.
- [ ] Scripts: `dev`, `build`, `preview`, `lint`, `typecheck`, `test` (Vitest + Testing Library), `e2e` (Playwright, mobile viewport project).
- [ ] Folders: `src/app` (routes/shell), `src/features/<feature>`, `src/components/ui`, `src/lib` (supabase, i18n, audio), `src/content` (letters data), `supabase/migrations`, `e2e/`.
- [ ] `.env.example` lists `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`; `.env*` (except example) git-ignored.
- [ ] One passing unit test and one passing Playwright smoke test (home page loads).

## Data touched
None.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
