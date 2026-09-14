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

## 2026-09-11 — Landing page is one fixed screen, not a five-section homepage

Supersedes SPEC v7 §4 Homepage. The landing is: the mark, two doors (Weddings / Not weddings), one review, footer. No nav bar, no hero copy, no service picker, no badge row, no blog teaser. Rationale: the two buyers are different enough that any shared homepage copy dilutes both; the homepage's only job is tone plus routing. Dart Collective's landing is the model. The "who we are" block and the "check your date" CTA move to the top of `/weddings` and `/events`. Phase 1 homepage work already done (service picker, proof band, PlaceholderArt hero) is replaced, not extended.

## 2026-09-11 — `/events` is labelled "Not weddings"

The route stays `/events` for URL sanity and SEO. Every public label — nav, landing door, footer, page `<title>`, OG title — reads "Not weddings". It is honest, it passes the BRAND.md voice test (something Matt would actually say), and it makes the two-door choice instant. Revisit if organizer-side inquiries drop or feedback says it reads as dismissive.

## 2026-09-11 — Palette test: disco/funk ramps replace the interim navy/terracotta

The interim palette (deep-sound navy, driftwood, terracotta, penn-cove) is replaced site-wide by a test palette: `ruby-red`, `blaze-orange`, `sandy-brown`, `olive`, each as a 50–950 ramp in `global.css`. This is a test, not the official palette — the official one is decided with the illustrator. Because every color goes through a token, the swap is one file; if the test fails, revert the token block. `apricot-cream` was supplied but is byte-identical to `sandy-brown` and is not added (see KNOWN_ISSUES).

## 2026-09-11 — Placeholder mark: wave-vinyl with the real Whidbey coastline

`src/assets/wave-vinyl-placeholder.svg` is the landing mark until the illustrator's logo lands. It is a record whose grooves are rolling waves (two-harmonic sine, leaning crests), the Whidbey Island coastline on the label (OSM relation 3954595, simplified to 173 points, rotated −22° to fill the label), and a fixed orca fluke cresting from the outer wave band while the disc turns beneath it. Colors are CSS custom properties (`--mark-bg`, `--mark-rim`, `--mark-wave-1`, `--mark-wave-2`, `--mark-label`, `--mark-island`, `--mark-orca`) with palette defaults baked in, so it recolors from `global.css`. Spins once per 10 s; static under `prefers-reduced-motion`. The word mark above it is HTML text, not part of the SVG, so the lockup can be stacked or inline. It is explicitly placeholder art: the fluke and the label lettering are rough, and the display face (Shrikhand as a stand-in) is not a brand decision.

## 2026-09-11 — Motion: one continuous animation, no parallax

The landing mark is the only continuous animation on the site. Parallax is banned site-wide even though Bamboo Beats (the primary visual reference) uses it heavily: it fights "restraint over decoration," it costs mobile Lighthouse, and it is the single strongest "this is a page-builder template" tell. Interior motion stays at the one IntersectionObserver reveal utility, 3–5 moments per page, plus view transitions.

## 2026-09-11 — Reference sites, and what each is for

Recorded so a future session doesn't re-derive it. Dart Collective: landing-page mode (fixed screen, single slow motion, near-zero chrome). Bamboo Beats: typographic confidence, full-bleed photography, comfort with dark dramatic sections — *not* its parallax, per-element fades, diagonal dividers, or club-black marble. Traveling Discotheque: first-person voice, per-DJ favorite-artists line, undecorated sections — *not* its third-person bios or Squarespace layout. Style Matters, Integral DJs, Toast & Jam, Sounds To Go, North Georgia: positioning and page-structure references per BRAND.md, not visual ones. dj100proof was open during review but is a club/nightlife site and is not a reference.

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

## Phase 1 — @astrojs/sitemap for automatic sitemap generation

`@astrojs/sitemap` generates `sitemap-index.xml` at build time from all prerendered routes. The `site` property in `astro.config.mjs` is set to `https://whidbeyislanddj.com`, which also enables Astro's canonical URL generation via `Astro.site`.

## Phase 1 — View transitions via Astro ClientRouter

`<ClientRouter />` in BaseLayout enables Astro's built-in view transitions (morph animations between page navigations). All page scripts use `astro:page-load` for re-initialization.

## Phase 1 — Scroll-reveal via IntersectionObserver + data-reveal attribute

One global script in BaseLayout observes `[data-reveal]` elements and adds `.is-revealed` when they enter the viewport. CSS handles the animation (`opacity` + `translateY`). `prefers-reduced-motion` is respected: elements are immediately visible with no animation. Applied to 3–5 moments per page, not everything.

## Phase 1 — Placeholder art for photo-less sections

`PlaceholderArt.astro` renders CSS gradient backgrounds in three variants (warm, cool, accent) using the token palette. Each usage is a documented swap target in KNOWN_ISSUES. No placeholder images are committed to the repo — gradients are pure CSS using existing `--color-*` custom properties.

## Phase 3.5 — Color ramps (50–950) for the existing palette

Each of the six named colors (driftwood, deep-sound, penn-cove, golden-hour, madrone, sea-glass) now has an 11-stop ramp in `global.css`. The bare name (`--color-driftwood`) is kept as an alias to the most-used stop so existing code keeps working. New code uses ramp values (e.g. `text-deep-sound-700` instead of `text-deep-sound/80`). Ramps replace opacity hacks for text and background shades; opacity is still appropriate for overlays on images.

## Phase 3.5 — Landing page rewritten to one fixed screen (Dart mode)

The old six-section homepage (hero, about, service picker, proof band, blog teaser, CTA) is replaced by the spec's one-screen landing: spinning wave-vinyl mark, two doors (Weddings / Not weddings), one featured review, minimal footer. No nav bar on the landing page — the landing IS the routing. `BaseLayout` gained a `landing` prop that hides Nav and Footer. `HeroSection.astro` deleted (was only used on the old homepage).

## Phase 3.5 — Interior pages break the centered-everything pattern

All interior pages (weddings, events, pricing, photobooth, faq, djs) refactored: hero headlines left-aligned and pushed to text-5xl/6xl/7xl; content sections use `SplitSection` (two-column text + media); checklist sections moved to dark backgrounds; `SectionHeading` defaults to `centered={false}`. DJ index uses full-width editorial blocks (Traveling Discotheque style) instead of a card grid. The visual language alternates light/dark sections and breaks the centered stack that reads as template.

## Phase 3.5 — SectionHeading defaults to left-aligned

Changed `centered` prop default from `true` to `false`. Centered headings are now opt-in via `centered` or `centered={true}`. CTA sections and standalone showcase sections keep centering; feature/content sections are left-aligned.

## Phase 3.5 — Scroll-reveal uses requestAnimationFrame

The IntersectionObserver init is wrapped in `requestAnimationFrame` to wait one frame after `astro:page-load`. This fixes a race condition where view transitions swap the DOM but elements aren't painted yet, causing the observer to miss already-visible elements. Threshold lowered from 0.15 to 0.1 for more reliable triggering.

## Phase 4 — ReviewCardFull.astro for the /reviews page

The compact `ReviewCard` (blockquote + attribution) is used on weddings, events, DJ profiles, and the homepage. The `/reviews` page needs a richer card: source link, date, star rating, rendered markdown body. Rather than bloating ReviewCard with optional props and conditional sections, a separate `ReviewCardFull` component is built for the reviews page. The compact `ReviewCard` stays unchanged.

## Phase 4 — FilterChips island architecture

One `FilterChips.astro` component handles all filterable pages (reviews, gallery, future blog/recommendations). It reads a `target` CSS selector to find the card container and a `filterAttr` data-attribute name. Cards carry `data-filterable` and `data-filter-{attr}="value1,value2"` attributes. The script toggles `display` on cards based on the active chip. No fetching, no shared state, no external dependencies. Re-initialized on `astro:page-load` to survive view transitions.

## Phase 4 — YouTubeFacade is a vanilla lite embed, no dependency

The YouTube facade (thumbnail until click, then iframe) is ~40 lines of Astro + script. Libraries like `lite-youtube-embed` add NPM weight for the same pattern. Uses `youtube-nocookie.com` for the embed domain (privacy). Keyboard-accessible (Enter/Space activates).

## Phase 4 — PhotoSwipe deferred until gallery has real photo content

BUILD_PLAN approves PhotoSwipe for the lightbox. The gallery collection is currently empty. Adding the dependency now means shipping and maintaining untestable code. Gallery markup is lightbox-ready (clickable image links with `data-pswp-*` attributes), so wiring PhotoSwipe later is a small addition. Logged in KNOWN_ISSUES.

## Phase 4 — Review bodies rendered via render(), not raw strings

All pages that display review content (index, weddings, events, djs/[slug], reviews) now use Astro's `render()` to get a Content component from the review entry, instead of passing `review.body` as a raw string. This means review bodies with markdown formatting will render correctly. `ReviewCard` switched from a `quote` string prop to a slot; `ReviewCardFull` uses a slot for the body. CSS pseudo-elements (`::before`/`::after`) handle the smart quotes that were previously interpolated as `&ldquo;`/`&rdquo;`.
