# NUJ-21 — Letter tracing mode (finger trace)

**Epic:** NUJ-3 — Arabic letters game
**Suggested sprint:** 3 · **Build order:** 15
**Agents:** nujoom-uiux, nujoom-developer, nujoom-e2e
**Depends on:** NUJ-20

## User story
As a child, I want to trace a letter with my finger so I learn how to write it.

## Acceptance criteria
- [ ] Canvas/SVG tracing with stroke guides (start dot + arrow) per letter; tolerance tuned for small fingers.
- [ ] Success when the trace covers ≥ 80% of the guide path in the right direction; celebration + stars.
- [ ] Arabic letters traced right-to-left; works with touch and mouse; no page scroll while tracing.
- [ ] Stroke path data per letter stored in content files (shared format for English in S17).

## Data touched
Content stroke paths; writes via S14.

## Definition of done
- Lint, typecheck, unit tests and Playwright (mobile, AR + EN) pass locally and in CI.
- New tables have RLS; Supabase advisors clean.
- Reviewed with CodeRabbit (nujoom-reviewer), findings resolved.
- Works at 360px wide in both RTL and LTR.
