# CLAUDE.md — WIDC Production Site

Read `README.md` first — it is the human onboarding doc and the map of the repo. This file adds only what an AI session needs beyond that.

## Governing docs (in this repo, in this order)

1. `docs/WEBSITE_SPEC.md` — what we're building. Wins over code and over conversation.
2. `docs/BUILD_PLAN.md` — the phase we're in and its gate.
3. `docs/CONTENT_MODEL.md` — every collection and field; must match `src/content.config.ts` and `keystatic.config.ts`.
4. `docs/DECISIONS.md` — why. Add an entry when you make a non-obvious call.
5. `docs/KNOWN_ISSUES.md` — update at the end of every phase.

Brand voice: `BRAND.md v4` and `LOGO_AND_ART_GUIDE.md v4` in Google Drive under `Rebrand Project 2026/` (shared with the illustrator, so they stay there). Matt will paste relevant sections when needed.

If code and a doc disagree, the doc wins — say so and fix the code, or propose a doc change and wait.

## Stack

Astro (static) · Tailwind 4 · Keystatic (GitHub mode) · Resend · Vercel · TypeScript strict. No database. No client-side framework.

## Rules

- **The audience for this code is a senior developer who will inherit it.** Boring beats clever. One way to do each thing. If you find yourself writing a second version of something, stop and reuse or refactor the first.
- **No new dependency without a stated reason** in the commit message and, if it's structural, an entry in DECISIONS.
- **Tokens in `src/styles/global.css` only.** No hardcoded colors or fonts anywhere else.
- **Content in `src/content/` only.** No hardcoded copy, prices, reviews, or lists in components or pages.
- **Prices in cents**, formatted by `formatPrice()`.
- **No placeholder proof numbers.** Real, or absent with a TODO in KNOWN_ISSUES.
- **Schema changes touch three files in one commit:** `src/content.config.ts`, `keystatic.config.ts`, `docs/CONTENT_MODEL.md`.
- **Every session ends in a commit** with a message that says what and why. Small commits; a phase should be reviewable as a range.
- **End every phase with the hostile self-review** in BUILD_PLAN, written out, and update KNOWN_ISSUES.
- **Delete what you don't wire up.** No orphaned components, scaffolds, or experiments survive a phase.
- **Pause after each build phase** for Matt's review. Matt reads and checks the code himself before approving.
- **Push back** on anything — including Matt's requests — that adds clutter, dilutes the brand, or adds avoidable complexity. Simplicity is a handoff feature.

## Don't

- Don't reintroduce Supabase, a database, or any runtime data store.
- Don't add React/Vue/Svelte. Islands are vanilla `<script>` in `.astro` files.
- Don't put video files in the repo (except the optional ≤4 MB hero loop in `public/`).
- Don't create documents outside `docs/` and README. Don't leave docs stale.
