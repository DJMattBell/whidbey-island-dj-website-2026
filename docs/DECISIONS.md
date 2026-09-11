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

## 2026-09-11 — Repo stays under Matt's personal GitHub account

No GitHub organization. The repo lives at `DJMattBell/whidbey-island-dj-website-2026`. Collaborators (content editors, future developers) are added as repo-level collaborators, not org members. This avoids the overhead of maintaining an org for a small project. If the business grows to need multiple repos or more granular permissions, an org can be created later and the repo transferred.

## 2026-09-11 — Canonical domain and redirects

`whidbeyislanddj.com` is canonical. All other owned domains 301 to it (list to be recorded here at Phase 0 when confirmed against the registrar and Vercel).

## 2026-09-11 — Explicitly not building

360°/hotspot equipment viewers, newsletter, booking portal/CRM, availability calendar embed. See SPEC §10.

## Phase 0 — React is a Keystatic dependency, not a site dependency

`react` and `react-dom` are installed because `@keystatic/astro` requires them as peer dependencies. React powers Keystatic's admin UI at `/keystatic`. No React components are used in any site page or component. The site remains vanilla Astro + `<script>` islands per CLAUDE.md. If Keystatic is ever removed, React goes with it.

## Phase 0 — Image fields are optional strings until real photos exist

CONTENT_MODEL specified `image` type for djs.photo, services.heroImage, gallery.image, equipment.photo. These are implemented as `z.string().optional()` because (a) no real photos exist yet, and (b) Astro's `image()` helper validates that the referenced file exists at build time, which would break builds until Matt provides photos. When Phase 1 brings placeholder art and real photography, upgrade these to `image().optional()` and move validation into the build.

## Phase 0 — reviews.date is optional

The CONTENT_MODEL specified `date` as required, but the five old-site testimonials have no known dates. Making it optional avoids inventing data. New reviews entered through Keystatic should always include a date.

## Phase 0 — reviews.dj is a plain string, not a reference()

Astro's `reference()` helper validates at build time that the referenced entry exists. This is the right thing to do eventually, but it couples the reviews collection to the djs collection at the schema level, which means you can't delete a DJ without first updating every review that references them. For a collection this small, a plain string slug is simpler and sufficient. If review count grows past ~50, consider upgrading to `reference()`.

## Phase 0 — FAQ categories mapped from "general" to specific enum values

The old site used a single "general" category for all four FAQ entries. The v7 model uses an enum: booking, music, logistics, pricing, photobooth. Mapped based on content: "Why not iPod?" → music, "Why expensive?" → pricing, "How choose music?" → music, "Why hire us?" → booking.

## Phase 0 — Ceremony Sound add-on uses category "ceremony" not "dj"

The old-site SQL seeded Ceremony Sound under category "dj". The v7 CONTENT_MODEL adds "ceremony" as a distinct add-on category. Ceremony Sound is a ceremony service, so it's recategorized accordingly.

## Phase 0 — Keystatic uses markdoc for content fields

Keystatic's `fields.markdoc()` is used for body/content fields in collections that have markdown content (djs, services, faq, reviews, equipment, blog). This is Keystatic's native rich-text editing format. The content files on disk are standard Markdown (frontmatter + body) which Astro's glob loader reads correctly.
