# What the owner must provide / approve

## Already done (approved 2026-11-13)
- [x] GitHub private repo `Madatech-Po/nujoom` (empty).
- [x] Supabase project `Nujoom` — ref `dnevaqcanwnykztyykkt`, eu-west-3, free plan ($0/month).
- [x] Jira project `NUJ` (Nujoom) created by the owner; epics NUJ-1..8 and stories NUJ-9..37 filed as To Do (NUJ-9..18 in NUJ Sprint 1).

## Secrets and accounts
| Item | Where it goes | Needed by story |
|---|---|---|
| Google OAuth client (Web) — Client ID + Secret from Google Cloud Console; authorised redirect URI `https://dnevaqcanwnykztyykkt.supabase.co/auth/v1/callback` | Supabase → Authentication → Providers → Google (owner pastes it in) | NUJ-15 |
| Supabase database password (set at creation, reset in dashboard if unknown) | Owner's password manager; only if the Supabase CLI is used locally | NUJ-14 |
| Cloudflare account ID + API token (Workers/Pages edit) | GitHub repo secrets `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN` | NUJ-13 |
| Production domain (optional, e.g. nujoom.app) | Cloudflare + Supabase redirect URLs | NUJ-13, NUJ-15 |

The Supabase URL and anon (publishable) key can be read with the Supabase MCP — no need to send them.

## Content / assets
- Letter audio: Arabic (28 names + sounds + example words) and English (26). Either recorded voice files from the owner, or approval to generate them with TTS.
- Illustrations: example-word pictures (54), child avatars (~12), Najm character in 5 levels + accessories. Owner-provided, or approval to generate / use a licensed pack.
- Parental-consent notice and privacy text (Arabic + English) — draft can be written by the team, owner approves the final wording.

## Decisions still open
1. E2E test login: Google sign-in cannot be automated in Playwright. Proposal: enable email+password in Supabase **only** for seeded test accounts (`e2e-parent@…`, `e2e-teacher@…`) and hide it in the UI. OK?
2. Week boundary for the class leaderboard: Sat–Fri (Egypt/Gulf) or Mon–Sun?
3. Picture password vs PIN default for 3–4 year olds (proposal: picture password default, PIN optional for 5+).
