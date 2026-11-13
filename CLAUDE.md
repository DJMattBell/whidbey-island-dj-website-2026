# CLAUDE.md — WIDC Production Site

Read `README.md` first — it is the human onboarding doc and the map of the repo.
Read `brand.json` before writing any user-facing copy or changing brand-adjacent tokens.

## Commands

- `npm run dev` — local dev server
- `npm run build` — type-check (`astro check`) then build
- `npm run preview` — preview production build
- `npm run format` — Prettier

## Model selection

Opus for planning, grilling, architecture, code review. Sonnet for implementation. Haiku for search, triage, file discovery. Subagents default to Sonnet; promote to Opus only for review or planning.

## Session hygiene

Smart zone is ~100–140k tokens. At 120k, wrap up and suggest a fresh session. Every session ends in a commit.

## Code review

Always in a separate subagent with fresh context. Never the same session that wrote the code. Two axes: (1) follows repo rules? (2) matches spec?

## Governing docs (precedence order)

1. `docs/WEBSITE_SPEC.md` — what we're building. Wins over code and conversation.
2. `docs/BUILD_PLAN.md` — current phase and its gate.
3. `docs/CONTENT_MODEL.md` — every collection/field; must match `content.config.ts` and `keystatic.config.tsx`.
4. `docs/DECISIONS.md` — why. Add an entry for non-obvious calls.
5. `docs/KNOWN_ISSUES.md` — update at end of every phase.

If code and a doc disagree, the doc wins — fix the code or propose a doc change and wait.

## Rules

- Tokens in `src/styles/global.css` only. No hardcoded colors or fonts elsewhere.
- Content in `src/content/` only. No hardcoded copy, prices, reviews, or lists in components.
- Prices in cents, formatted by `formatPrice()`.
- No placeholder proof numbers. Real, or absent with a TODO in KNOWN_ISSUES.
- Schema changes = three files in one commit: `content.config.ts`, `keystatic.config.tsx`, `CONTENT_MODEL.md`.
- Small commits with what-and-why messages. A phase should be reviewable as a range.
- End every phase with the hostile self-review (see `.claude/skills/hostile-review.md`).
- Delete what you don't wire up. No orphaned components, scaffolds, or experiments.
- Pause after each phase for Matt's review.
- No new dependency without a stated reason in the commit message (and DECISIONS if structural).
- The audience is a senior developer inheriting this. Boring beats clever. One way to do each thing.
- Push back on anything that adds clutter, dilutes the brand, or adds avoidable complexity.

## Don't

- No Supabase, no database, no runtime data store.
- No React/Vue/Svelte beyond Keystatic's own React. Islands are vanilla `<script>` in `.astro` files.
- No video files in repo (except optional ≤4 MB hero loop in `public/`).
- No documents outside `docs/` and README.
