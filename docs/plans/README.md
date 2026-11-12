# Nujoom (نجوم) — MVP plan

Kids 3–7 letters game. React + Vite + TypeScript + Tailwind + Supabase (auth + realtime), mobile browser, Arabic (RTL, default) + English (LTR).

## Infrastructure
- GitHub: `Madatech-Po/nujoom` (private)
- Supabase: project `Nujoom`, ref `dnevaqcanwnykztyykkt`, region eu-west-3 (never touch any other Supabase project)
- Jira: project `NUJ` (Nujoom), board "NUJ board", Sprint 1 = NUJ Sprint 1
- Hosting: Cloudflare (static Vite build)

## Key decisions
- **Adults** (parents, teachers) sign in with **Google** via Supabase Auth. One adult profile can be parent, teacher or both.
- **Children are profiles owned by a parent**, not separate auth users. On the parent's signed-in phone the child picks their avatar and enters a picture password (3 of 9 pictures) or a 4-digit PIN, verified by a server RPC against a salted hash.
- **Parent view lives inside the child account** behind a parent gate (grown-up check). No separate parent login.
- **Teachers** create classes (join code) → parents link a child with the code → teachers open live competition rooms; class children join from home (Supabase Realtime presence + state).
- **Scoring is server-side** (RPCs) so stars, badges and room scores cannot be forged by the client.
- **Privacy**: nickname + built-in avatar only (no real names, no photos), parental consent recorded, delete/export child data, no public leaderboard.

## Epics
- **NUJ-1 — Foundation & bilingual shell:** A deployable React + Vite + TS + Tailwind app with Arabic (RTL, default) / English (LTR), kid-friendly design tokens, Supabase client and CI.
- **NUJ-2 — Accounts & child login:** Adults sign in with Google; parents create child profiles; children enter with a picture password or PIN on the parent's phone — no typing of emails or passwords.
- **NUJ-3 — Arabic letters game:** Children learn the 28 Arabic letters (name, sound, forms, example word) through listen-and-tap and tracing games.
- **NUJ-4 — English letters game:** Same game engine for the 26 English letters (upper/lower case, phonics sound, example word).
- **NUJ-5 — Stars, badges & character progression:** Rewards that keep 3–7 year olds coming back: stars per round, badges, and the Najm character that grows.
- **NUJ-6 — Teacher competition rooms (realtime):** Teachers create classes and live rooms; children join from home and answer the same questions in real time.
- **NUJ-7 — Leaderboard:** Class leaderboard and room podium that motivate without exposing children (nickname + avatar only).
- **NUJ-8 — Parent view inside the child account:** Behind a parent gate: progress, notifications and settings for each child — no separate parent app.

## Stories (build order)

| Order | Key | Story | Epic | Sprint | Agents | Depends on |
|---|---|---|---|---|---|---|
| 1 | [NUJ-9](NUJ-9.md) | Project scaffold (Vite + React + TS + Tailwind + tests) | NUJ-1 | 1 | developer | — |
| 2 | [NUJ-10](NUJ-10.md) | GitHub repo setup and CI pipeline | NUJ-1 | 1 | github | NUJ-9 |
| 3 | [NUJ-14](NUJ-14.md) | Supabase base setup, client and generated types | NUJ-1 | 1 | db, developer | NUJ-9 |
| 4 | [NUJ-11](NUJ-11.md) | Bilingual app shell with RTL/LTR switching | NUJ-1 | 1 | uiux, developer, e2e | NUJ-9 |
| 5 | [NUJ-12](NUJ-12.md) | Kid-friendly design system and sound helper | NUJ-1 | 1 | uiux, developer | NUJ-11 |
| 6 | [NUJ-13](NUJ-13.md) | Cloudflare hosting, deploy on main and PWA basics | NUJ-1 | 1 | deploy | NUJ-10 |
| 7 | [NUJ-15](NUJ-15.md) | Adult sign-in with Google (parent / teacher) | NUJ-2 | 1 | db, developer, e2e | NUJ-14 |
| 8 | [NUJ-16](NUJ-16.md) | Parental consent and creating child profiles | NUJ-2 | 1 | uiux, db, developer, e2e | NUJ-15 |
| 9 | [NUJ-17](NUJ-17.md) | Child picker and picture/PIN login ("Who is playing?") | NUJ-2 | 1 | uiux, db, developer, e2e | NUJ-16 |
| 10 | [NUJ-18](NUJ-18.md) | Parent gate to leave child mode | NUJ-2 | 1 | uiux, developer, e2e | NUJ-17 |
| 11 | [NUJ-19](NUJ-19.md) | Arabic letters content and audio set | NUJ-3 | 2 | developer, uiux | NUJ-12 |
| 12 | [NUJ-20](NUJ-20.md) | Letter game engine + Arabic "Listen and tap" mode | NUJ-3 | 2 | uiux, developer, e2e | NUJ-19 |
| 13 | [NUJ-22](NUJ-22.md) | Save game sessions and per-letter progress | NUJ-3 | 2 | db, developer | NUJ-17, NUJ-20 |
| 14 | [NUJ-26](NUJ-26.md) | Stars: earn, total and celebrate | NUJ-5 | 2 | uiux, db, developer | NUJ-22 |
| 15 | [NUJ-21](NUJ-21.md) | Letter tracing mode (finger trace) | NUJ-3 | 3 | uiux, developer, e2e | NUJ-20 |
| 16 | [NUJ-23](NUJ-23.md) | English letters content and audio set | NUJ-4 | 3 | developer, uiux | NUJ-19 |
| 17 | [NUJ-24](NUJ-24.md) | English "Listen and tap" and "Match big & small" modes | NUJ-4 | 3 | developer, e2e | NUJ-23, NUJ-22 |
| 18 | [NUJ-25](NUJ-25.md) | English letter tracing | NUJ-4 | 3 | developer, e2e | NUJ-21, NUJ-23 |
| 19 | [NUJ-27](NUJ-27.md) | Badges and badge shelf | NUJ-5 | 4 | uiux, db, developer, e2e | NUJ-26 |
| 20 | [NUJ-28](NUJ-28.md) | Najm character progression and unlockables | NUJ-5 | 4 | uiux, db, developer | NUJ-26 |
| 21 | [NUJ-35](NUJ-35.md) | Parent dashboard inside the child account | NUJ-8 | 4 | uiux, db, developer, e2e | NUJ-22, NUJ-27 |
| 22 | [NUJ-29](NUJ-29.md) | Teacher classes and joining a class with a code | NUJ-6 | 4 | uiux, db, developer, e2e | NUJ-18, NUJ-15 |
| 23 | [NUJ-30](NUJ-30.md) | Teacher creates a competition room and questions | NUJ-6 | 5 | uiux, db, developer | NUJ-29, NUJ-20 |
| 24 | [NUJ-31](NUJ-31.md) | Live room lobby with invites and presence | NUJ-6 | 5 | db, developer, e2e, uiux | NUJ-30 |
| 25 | [NUJ-32](NUJ-32.md) | Live room play: synced questions, answers and scoring | NUJ-6 | 5 | db, developer, e2e, uiux | NUJ-31 |
| 26 | [NUJ-33](NUJ-33.md) | Room results for the teacher | NUJ-6 | 6 | db, developer, uiux | NUJ-32 |
| 27 | [NUJ-34](NUJ-34.md) | Class weekly leaderboard and room podium | NUJ-7 | 6 | db, developer, uiux, e2e | NUJ-29, NUJ-26 |
| 28 | [NUJ-36](NUJ-36.md) | In-app notifications for parents | NUJ-8 | 6 | db, developer | NUJ-35 |
| 29 | [NUJ-37](NUJ-37.md) | Parent settings: manage children, secrets and data deletion | NUJ-8 | 6 | db, developer, e2e | NUJ-17 |

## Out of MVP scope (later)
- Web push notifications, numbers/shapes/words game modes, teacher-editable content bank, school/organisation accounts, offline-first full PWA, payments.
