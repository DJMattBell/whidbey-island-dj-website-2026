# WIDC Website Spec — v7

_Supersedes WEBSITE_SPEC v6 and the Aug 12 backend plan (both retired; Drive copies are LEGACY). This file, in this repo, is the source of truth. Brand voice and visual system still live in BRAND.md v4 and LOGO_AND_ART_GUIDE.md v4 in Drive — those are unchanged._

_Last verified: 2026-09-11 (rev 2 — homepage simplified, design direction added, palette test)_

---

## 1. Goals (unchanged from v6, restated)

- Replace the "DJ Matt Bell" solo-brand site with a collective identity site.
- Make the two differentiators impossible to miss: transparent "$0 upcharges forever" pricing, and a named, known team.
- Serve two buyers — wedding couples and event organizers (schools, PTAs, auctions, community events) — without either page diluting the other.
- Homepage job: a first-time visitor feels _this DJ genuinely cares about our day_ within seconds and understands who WIDC is.
- **New in v7:** the codebase must be handoff-ready. A senior web developer with no prior context should be able to clone, run, understand, and extend it from the README alone. This is a launch criterion, not a nice-to-have.

## 2. Stack and architecture

- **Astro** (static output) + **Tailwind 4** + **Vercel**. No client-side framework. Islands only for the gallery lightbox, the filter component, video facades, and the contact form.
- **Keystatic** (GitHub mode) is the editing UI. It writes to `src/content/` as Markdown/YAML/JSON. Every content edit is a git commit; Vercel rebuilds on push.
- **Astro content collections** define the schema for everything Keystatic edits. One schema file, one content model doc (`docs/CONTENT_MODEL.md`).
- **Resend** sends inquiry emails from `src/pages/api/inquiry.ts` (the only on-demand route besides Keystatic's own).
- **No database.** Supabase is removed. Nothing on this site has per-visitor state.
- **Photos** live in the repo (`src/assets/`), max ~50 in the gallery, optimized by Astro's image pipeline at build time.
- **Video** is never in the repo. YouTube (public) for the four core videos and reels; embedded via a lite facade (thumbnail until click). The one exception is an optional ≤8 s, ≤4 MB muted hero loop in `public/`.

### Why (see `docs/DECISIONS.md` for the full record)

Git-backed content means one system, one host, one login model (GitHub), zero runtime infrastructure, and the most conventional Astro architecture that exists. That is what makes the project hireable.

### Access model

- Content editors: GitHub accounts with write access to the repo (Matt, his wife; a future site manager). Keystatic authenticates via GitHub.
- Code/deploy: GitHub collaborator + Vercel project member. A hired dev gets both and nothing else — never Matt's personal logins.
- Repo lives under Matt's personal GitHub account (`DJMattBell/whidbey-island-dj-website-2026`). Collaborators are added as repo-level collaborators.

## 3. Sitemap

```
/                 Landing — one screen: the mark, two doors (Weddings / Not weddings), one review, footer
/weddings         Wedding couples
/events           Everything that isn't a wedding: school dances, PTA, auctions, community events, private parties
/pricing          Packages & offerings — real numbers as live text
/photobooth       Photobooth offering (separate page, separate pricing block)
/djs              Meet the Collective + "Your DJ from Day One" promise
  /djs/[slug]     DJ profile (Matt, Lee, future DJs — a content entry, not a page build)
/gallery          Photos (sortable) + videos (4 core + reels)
/reviews          Reviews library, filterable by source / event type / DJ
/equipment        What we bring, what it does, why it matters to your guests
/blog             Gig logs + essays, filterable by category
  /blog/[slug]
/recommendations  One page, two sections: recommended vendors + resources/links
/our-story        About us — collective framing + proof points
/faq
/contact          Inquiry form + 24-hour promise
/privacy, /terms, sitemap.xml, robots.txt, 404
```

**Nav (≤7 items):** Weddings · Not weddings · Pricing · DJs · Gallery · Blog · Contact. The `/events` route keeps its URL; its public label everywhere (nav, landing, footer, page title) is **"Not weddings"** — see DECISIONS 2026-09-11. Photobooth, Reviews, Equipment, Recommendations, FAQ, Our Story live in the footer and are cross-linked from relevant pages. The landing page has no nav bar (see Homepage).

**Subdomains:** `matt.whidbeyislanddj.com` and `lee.whidbeyislanddj.com` are Vercel redirects to `/djs/matt` and `/djs/lee`. Nothing is served from a subdomain.

**Domains:** `whidbeyislanddj.com` is canonical. All other owned domains 301 to it. The redirect map is a Phase 0 deliverable.

## 4. Page requirements

### Homepage (rev 2 — supersedes the v7 five-section homepage)

The landing page is a single fixed screen in the Dart Collective mode: no scroll, no nav bar, no hero copy. It exists to set the tone and send the visitor to one of two pages. Everything else lives on `/weddings` and `/events`.

Contents, in visual order:

1. **The mark** — the wave-vinyl placeholder (`src/assets/wave-vinyl-placeholder.svg`), spinning slowly, centered. It is the only motion on the page. The word mark sits above it. This is the placeholder until the illustrator's mark lands; the component is written so the SVG is a one-file swap.
2. **Two doors** — two links of equal weight: **Weddings** → `/weddings`, **Not weddings** → `/events`. No third card, no photobooth tile, no service picker. If a visitor can't tell which door is theirs, the copy has failed.
3. **One review** — a single featured review (`reviews` where `featured: true`, first by date), quote + attribution + source. Not three, not a badge row. It should feel like a glowing note left on the door, not a proof band.
4. **Footer** — the full footer (Navigate / More / Get in touch), same component as every other page. This is where Pricing, DJs, Gallery, Blog, Contact and the footer-only pages are reachable from the landing.

Explicitly not on the landing: nav bar, "who we are" prose, service picker, photobooth card, badge row, blog teaser, top CTA. The "check your date" CTA moves to the two detail pages. LocalBusiness JSON-LD stays on the landing.

Mobile: the same four items stack; the mark scales down; the two doors become full-width stacked buttons; the page may scroll on short viewports — "no scroll" is a desktop intent, not a constraint that clips content.

### /weddings

Because the landing carries no copy, this page opens with the "who we are, why it's different" block that used to sit on the homepage, in the couple-facing voice. Couple-facing, rural-wedding focus, per BRAND.md §5. "Says yes, figures it out together" gets a concrete home (captioned collaborative-moment photos). Highlight reel embed. Wedding reviews. Pricing link. CTA.

### /events (public label: "Not weddings")

Same rule as `/weddings`: opens with the collective intro, in the organizer-facing voice. Organizer-facing. Lead with clean-lyrics guarantee, COI available, flat pricing, PO-friendly invoicing, experience with student councils/auction committees. Sections for school dances and auctions/community events — visually and tonally distinct from /weddings. Event reviews. CTA.

### /pricing

Real numbers, live text, never an image. "$0 upcharges forever" as the headline with a concrete list of what that means. Tiers + add-ons from content collections. Photobooth listed as a real add-on with a link to /photobooth. Silent ceremony power listed. Guided/high-support option stays off until scoped.

### /photobooth

Booth photos including one at lowered/accessible height. What's included, print formats (4x6 / 2x6 strip), backdrop options, delivery process, pricing block (reads from `addons` where `category: photobooth`).

### /djs and /djs/[slug]

Index states the "Your DJ from Day One" promise. Profile: photo, first-person bio, philosophy, DJ-specific reviews (filtered from `reviews`), optional music favorites, "meet the rest" cross-link.

### /gallery

One collection, `gallery`, holding photos and videos. Filter chips: All / Weddings / Events / Lighting / Video. Photos open in a lightbox. Videos render as lite facades. The four core videos (5-min reel, 10-min reel, intro, lighting demo) are pinned at the top of the Video view.

### /reviews

`reviews` collection. Badge row (platform, rating, count, link) at top. Filter chips: source, event type, DJ. Each card: quote, attribution, event type, date, source badge, "read on [platform]" link. Yelp appears as a badge/link only — no quoted text (their terms).

### /equipment

`equipment` collection, grouped by category (sound, lighting, wireless/ceremony, power, photobooth). Each entry: photo, plain-language "what it does," and "why it matters to your guests." The lighting demo video is embedded on this page. No spec-sheet voice. 360° tours and hotspot viewers are explicitly out of scope.

### /blog

`blog` collection with `category: giglog | essay`. Index filterable. Cadence: gig logs in season, one essay a month. Index design must not expose gaps (no "posted 4 months ago" prominence).

### /recommendations

`recommendations` collection with `kind: vendor | resource`. Vendors grouped by category (photographers, venues, planners, florists, other DJs…); resources as a link list with one-line blurbs. Two sections, one page.

### /our-story

Collective story, proof-point layer (years active, events played) once compiled. Until then the page ships without numbers — no placeholders, no fabricated figures.

### /faq

`faq` collection, grouped by category, accordion. Seeded with the four good old-site answers. Links the public sample song list.

### /contact

Form: name, email, event date, event type, message. Honeypot + basic rate limit. POST → Resend → Matt's inbox (and a copy to the sender). 24-hour response promise stated. No calendar embed.

## 4a. Design direction (added rev 2)

This section is the visual brief for every page. It is deliberately about *feel*, because the reference sites differ in mechanics and none of them is to be copied.

**The one-line version:** landing page like Dart Collective; interior pages a cross between Bamboo Beats and Traveling Discotheque; nothing that reads as a template.

**Landing page (Dart mode).** One fixed screen, one large image or mark, near-zero chrome, a single slow continuous motion. Dart's landing is a photo with a ring that turns once every 8 s; ours is the wave-vinyl mark turning once every 10 s. No parallax, no scroll reveals, no hero slider.

**Interior pages (Bamboo × Discotheque).** From Bamboo Beats take: typographic confidence (one display face doing real work at 48px+), full-bleed photography that carries a section, and the willingness to let a section be dark and dramatic. From Traveling Discotheque take: first-person voice, the per-DJ "favorite artists" line, and the absence of decoration — sections that are just a heading, a paragraph, and a photo. Do not take from Bamboo: parallax backgrounds (it runs nine), fade-in-on-scroll on every element (twelve), diagonal section dividers, or the black-marble club aesthetic. Do not take from Traveling Discotheque: the third-person bios or the Squarespace-default layout.

**Motion budget (site-wide).** The landing mark is the only continuous animation. Interior pages get the one IntersectionObserver reveal utility on 3–5 moments per page, view transitions between pages, and nothing else. `prefers-reduced-motion` stops everything.

**"Not a template" test.** Before a phase is called done, look at each page and ask: could this be a Divi, Squarespace, or Tailwind UI starter with the copy swapped? If yes, it fails. The tells are: symmetric three-card rows, icon-plus-heading feature grids, stock hero-with-centered-headline, gradient buttons, and any section whose layout is doing the work the photography should be doing.

**Palette (test).** The site is running on the disco/funk test palette in `global.css` — ruby-red, blaze-orange, sandy-brown, olive ramps — until the official palette is decided with the illustrator. Every color reference goes through a token so the swap is one file. See DECISIONS 2026-09-11 (palette test) and KNOWN_ISSUES (apricot-cream duplicate).

**Source media.** Photos: Drive → `Media/Photos for Use/{Pre-2025, 2025, 2026}` and `Media/Equipment Photos/`. Logos (pre-rebrand, reference only): Drive → `Logos/` (Social Icon, Mixer Logo, Card Back Logo, Business card front). `05 Media/Rebrand Media (new brand)` is empty and is where illustrator deliverables will land. `Media/Footage/` is raw Insta360 capture for the DJ Video Pipeline project, not a web asset source.

## 5. Content editing (what Matt maintains without a code session)

Everything in `src/content/` via Keystatic at `/keystatic`: reviews, pricing tiers, add-ons, FAQ, gallery photos/videos, equipment, blog posts, recommendations, DJ profiles, site settings (badges, contact info, proof numbers). A content change never requires a code session.

Needs a code session: new page types, layout/components, design tokens, schema changes, routing/build config.

## 6. Handoff-readiness requirements (new in v7)

- README gets a stranger from clone to running dev server in under ten minutes.
- `docs/` contains exactly: SPEC, BUILD_PLAN, CONTENT_MODEL, DECISIONS, ACCESS, KNOWN_ISSUES. Nothing stale.
- One way to do each thing. No duplicate components, no unused dependencies, no dead files at the end of any phase.
- `npm run build` runs `astro check` first. Prettier enforced. GitHub Action runs `npm ci && npm run build` on every push and PR.
- `.nvmrc` + `engines` pinned. Lockfile committed. Dependabot enabled.
- Every non-obvious decision recorded in `DECISIONS.md` with a date and a one-paragraph rationale.
- Git history readable: small commits, messages that say what and why. Each build phase is reviewable as its own range.
- Each phase ends with a hostile self-review pass (see BUILD_PLAN) and an updated `KNOWN_ISSUES.md`.
- Secrets only in Vercel env vars. `.env.example` lists every variable with a one-line description.
- Access map and offboarding checklist in `docs/ACCESS.md`.

## 7. Codebase hygiene rules

- Design tokens live only in `src/styles/global.css`. No hardcoded colors or fonts elsewhere.
- Islands are isolated, single-purpose, no shared client state.
- Prices stored in cents; formatted in one helper.
- No placeholder proof numbers — real or absent.
- No new dependency without a stated reason in the commit message.
- Real photography only; abstract token-palette treatments where no photo exists yet.

## 8. Technical / SEO / accessibility

- Clean URLs. Working sitemap.xml, robots.txt, privacy, terms, 404.
- Per-page title/description/OG image. LocalBusiness JSON-LD on the homepage. Titles anchored on "Whidbey Island DJ."
- No external template dependencies; all assets self-hosted except video embeds.
- WCAG AA target; audited before launch. `prefers-reduced-motion` respected.
- Vercel Analytics (or Plausible) from Phase 1.
- Lighthouse ≥ 90 on mobile for performance/accessibility/SEO before launch.

## 9. Success criteria for v1 launch

1. Every page passes the Bamboo Beats quality checklist (BUILD_PLAN).
2. Real reviews with sources in place; badge row live; no placeholder numbers anywhere.
3. Inquiry form delivers an email to Matt within one minute; a test submission is confirmed the day of launch.
4. **Unassisted maintainability test:** Matt (and separately, his wife) adds a review, changes a price, uploads a gallery photo, and publishes a blog post — all through Keystatic, no code session.
5. **Handoff test:** a person who has never seen the repo follows the README to a running dev server and can locate where to add a DJ, a review, and a page, using only the docs. (Matt's wife can be this person.)
6. Homepage passes the "genuinely cares, and I get who they are" first-impression test.
7. `KNOWN_ISSUES.md` is honest and short.

## 10. Explicitly deferred

- 360° / hotspot equipment viewers
- Newsletter
- CRM/booking portal (link out to a hosted CRM if ever needed — never build one)
- Calendar/availability embed
- Highlight-reel pipeline integration (DJ Video Pipeline project) — video arrives as YouTube URLs regardless
- Guided/high-support pricing option
- Sound protection station marketing

## 11. Working agreement

- Launch measured in weeks. Any phase drifting toward months gets flagged immediately.
- Pause for Matt's review after each phase. Matt reads and checks the code before approving.
- Standing instruction: push back on anything — including Matt's own ideas — that adds clutter, dilutes the brand, or adds avoidable complexity. Simplicity is a handoff feature.
