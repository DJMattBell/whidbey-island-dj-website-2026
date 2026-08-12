# CLAUDE.md — WIDC Production Site

## What this is

Production website for the Whidbey Island DJ Collective (Astro + Tailwind + Supabase on Vercel). Replaces the WordPress "DJ Matt Bell" solo-brand site.

**Governing docs** (in Google Drive under `Rebrand Project 2026/`):
- `01 Brand Strategy/BRAND.md v4` — voice, values, positioning
- `01 Brand Strategy/LOGO_AND_ART_GUIDE.md v4` — visual system, tokens
- `03 Website Build/WEBSITE_SPEC.md v6` — sitemap, pages, stack
- `03 Website Build/BUILD_PLAN.md v4` — phase execution plan
- `03 Website Build/whidbey-island-dj-rebrand-backend-plan.md` — backend buildout specifics

Read these before starting work on a new page or section. If a decision in code conflicts with a spec doc, the doc wins — flag it to Matt.

## Stack

- **Astro 6** (hybrid output — static by default, SSR for database pages)
- **Tailwind 4** via Vite plugin
- **Supabase** for content Matt edits (testimonials, pricing, FAQ, gallery, blog, inquiries)
- **Vercel** for hosting and serverless functions
- **TypeScript** (strict mode)

## Key paths

- `src/styles/global.css` — design tokens (the ONE source for colors/fonts/spacing)
- `src/lib/supabase.ts` — server-side Supabase client
- `src/lib/database.types.ts` — TypeScript types for all Supabase tables
- `supabase/migrations/001_initial_schema.sql` — table definitions, RLS policies, seed data
- `docs/supabase-schema.md` — human-readable schema reference
- `src/content/` — Astro content collections (DJ profiles, service pages)
- `src/pages/api/inquiry.ts` — contact form POST handler

## Rules

- **No placeholder proof numbers.** Real numbers or a TODO comment — never a plausible-looking fake.
- **Hex values in `global.css` only.** No hardcoded colors anywhere else.
- **Server-side Supabase only.** The anon key and URL are server-side env vars. Never import supabase.ts in client-side code or `<script>` tags.
- **Prices in cents.** $2,100 = 210000 in the database. Format for display in components.
- **Pause after each build phase** for Matt's review.
- **Push back** on clutter, brand dilution, and avoidable complexity.
