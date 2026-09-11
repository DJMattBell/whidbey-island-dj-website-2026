# Decisions

_Architecture and product decisions that a new developer would otherwise have to reverse-engineer. Add a dated entry whenever something non-obvious is decided. Never delete entries — mark them superseded._

## 2026-09-11 — Drop Supabase; content is git-backed via Keystatic

The v6 plan used Supabase tables for testimonials, pricing, FAQ, gallery, blog, and inquiries, edited through the Supabase table editor. For a static marketing site with no per-visitor state, that is a second system (schema, RLS, migrations, generated types, separate login) for six content types, and the editing experience is worse than a CMS. Keystatic writes Markdown/YAML into `src/content/`, every edit is a commit, editors authenticate with GitHub, and the result is the most conventional Astro architecture available. Supersedes SPEC v6 §2 and the Aug 12 backend plan.

## 2026-09-11 — Inquiries go to email, not a database

The contact form posts to `api/inquiry.ts`, which sends via Resend to Matt's inbox (plus a copy to the sender). No lead table, no dashboard. Leads are managed in email. If a CRM is ever wanted, link out to a hosted one; never build one.

## 2026-09-11 — Static output only

`output: "static"`. The only on-demand routes are the inquiry API and Keystatic's admin routes. No SSR pages.

## 2026-09-11 — Photos in repo, video on YouTube

Gallery capped at ~50 photos in `src/assets/`, optimized by Astro at build. Video (four core pieces + occasional reels) is hosted on YouTube and embedded through a lite facade. The only video file in the repo is an optional ≤8 s muted hero loop. Rationale: no CDN or media service to maintain; video files never belong in git.

## 2026-09-11 — Sitemap consolidation

`/parties` removed; all non-wedding work (school dances, PTA, auctions, community events, private parties) lives on `/events`. Vendors and resources share `/recommendations`. Added `/reviews`, `/equipment`. Subdomains are redirects to profile pages, not separate deployments.

## 2026-09-11 — Reviews carry provenance

Every review has a `source`, date, and link to the original. Quotes without provenance read as fabricated. Yelp is badge-and-link only because Yelp's terms prohibit reproducing review text.

## 2026-09-11 — Prices stored in cents

Integers avoid float rounding; one formatter in `src/lib/format.ts`. Carried from v6.

## 2026-09-11 — Blog cadence

Gig logs during the season; one essay a month year-round. The v6 "weekly" commitment was unrealistic for a seasonal side business and the index design must not make gaps prominent.

## 2026-09-11 — Docs live in the repo

SPEC, BUILD_PLAN, CONTENT_MODEL, DECISIONS, ACCESS, KNOWN_ISSUES are in `docs/` and are the source of truth. Drive copies of SPEC v6, BUILD_PLAN v4, and the backend plan are LEGACY. BRAND.md and LOGO_AND_ART_GUIDE.md remain in Drive because they are shared with the illustrator.

## 2026-09-11 — Canonical domain and redirects

`whidbeyislanddj.com` is canonical. All other owned domains 301 to it (list to be recorded here at Phase 0 when confirmed against the registrar and Vercel).

## 2026-09-11 — Explicitly not building

360°/hotspot equipment viewers, newsletter, booking portal/CRM, availability calendar embed. See SPEC §10.
