# Known Issues & Rough Edges

_Honest list of what's unfinished, hacky, or waiting on something. Updated at the end of every build phase. A short, truthful list earns more trust from an inheriting developer than a clean-looking repo with surprises._

Format: `- [area] description — what would resolve it — date logged`

## Open

- [tokens] `apricot-cream` ramp as supplied is byte-identical to `sandy-brown` (all eleven steps). Not added to `global.css`; if a distinct cream is wanted, Matt supplies real values — 2026-09-11
- [placeholder] `wave-vinyl-placeholder.svg` is placeholder art: the orca fluke is a rough bézier, the label has no lettering, and the wave geometry is generated (not drawn). Swap target is the illustrator's mark; keep the `--mark-*` variable names so the swap stays one-file — 2026-09-11
- [placeholder] Word mark above the landing mark uses Shrikhand (Google Fonts) as a stand-in disco/funk display face. Not a brand decision; the illustrator brief owns typography — 2026-09-11
- [content] Proof-point numbers (years active, events played) not yet compiled — Matt to pull from booking records; `settings.site.yearsActive/eventsPlayed` stay empty until then — 2026-09-11
- [content] Old-site reviews lack dates and source links; imported as `source: direct` with no date until matched to their platform — 2026-09-11
- [content] Events service entry (`events.md`) created with working copy — needs Matt's review of tone and accuracy — Phase 1
- [content] `reviewBadges` array in site.yaml is empty — homepage proof band badge row hidden until real platform ratings/counts are compiled — Phase 1
- [og] OG fallback image is 600×600 square (social-icon.png derivative) — proper 1200×630 OG image requires either ImageMagick or a custom illustration — 2026-10-24
- [infra] Domain redirect map not yet confirmed against registrar — 2026-09-11
- [infra] `npm run build` emits Vite "use client" warnings from Keystatic's UI library — cosmetic, not actionable — Phase 0
- [infra] Astro's re-exported `z` from `astro:content` shows deprecation hints during `astro check` — upstream migration, not actionable — Phase 0
- [schema] `reviews.dj` is a plain string slug, not a validated Astro `reference()` — works for filtering but doesn't catch typos at build time — Phase 0
- [content] DJ entries for Lee, Wife, Baby, Baby Big Girl are incomplete — need content from Matt — Phase 2
- [content] Matt's `musicFavorites` not populated — profile page section hidden until filled in — Phase 2
- [infra] Subdomain redirects (matt./lee.) configured in vercel.json but not testable until domains are connected to Vercel — Phase 2
- [placeholder] /photobooth hero still uses PlaceholderArt "accent" — swap for real photobooth photo when available — Phase 3
- [content] /weddings and /events "what's included" checklists are structural page copy, not content collection data — Phase 3
- [content] /photobooth backdrop details are generic — needs real backdrop inventory from Matt — Phase 3
- [faq] FAQ answers rendered as raw body string, not via Astro render() — works for current plain-text answers — Phase 3
- [visual] Site still needs: more photos for photobooth/gallery/blog, DJ headshots to replace PlaceholderArt, mix/audio embeds (Matt to provide Mixcloud links) — 2026-10-23
- [tokens] Color ramps generated algorithmically, not calibrated by a designer — ramp stops may need perceptual tuning when real photography arrives — Phase 3.5
- [landing] Mark token values in global.css match SVG fallbacks but are not yet coordinated with illustrator — Phase 3.5
- [style] Prose styling (font-body + heading/blockquote overrides) duplicated across ~5 page files with minor variations — extract to a shared CSS class or component — 2026-10-24
- [content] `businessName` hardcoded as literal string in `<title>` tags across all pages — should read from site.yaml for consistency — 2026-10-24
- [a11y] Lightbox focus trap incomplete — focus moves to close button on open and returns on close, but Tab can still escape the overlay; full focus trapping requires more logic — C3
- [a11y] Mobile menu focus trap incomplete — focus moves to close button, Escape closes, but Tab can still escape the overlay — C3
- [a11y] Contact form uses `novalidate` with no per-field JS validation — native browser validation still fires via `required` attributes; per-field accessible error messages not implemented — C3
- [infra] Production domain `whidbeyislanddj.com` still points to stale `widc` Vercel project (78 days old) — need to alias domains to `whidbey-island-dj-website-2026` project or reconnect auto-deploy — 2026-10-24

## Lighthouse Baseline (2026-10-24)

Deployment: `whidbey-island-dj-website-2026.vercel.app` · Lighthouse 13.5.0

| Page | Mode | Perf | A11y | BP | SEO |
|------|------|------|------|----|-----|
| `/` (landing) | Mobile | 100 | 100 | 100 | 100 |
| `/` (landing) | Desktop | 90 | 100 | 100 | 100 |
| `/gallery` | Mobile | 100 | 100 | 100 | 100 |
| `/contact` | Mobile | 100 | 100 | 100 | 100 |
| `/weddings` | Mobile | 100 | 100 | 100 | 100 |

All pages 100/100/100/100 mobile after C3 fixes (favicon, CTA contrast, ReviewCard contrast).

## Resolved

- [a11y] ReviewCard footer `text-golden-hour` flagged by Lighthouse as low contrast against page bg — two issues: (1) Tailwind `bg-deep-sound` compiles to `var()` which axe cannot resolve, and (2) Unicode escapes in `before:content-['\201C']` Tailwind classes caused Astro's HTML parser to drop the `<blockquote>` opening tag entirely; fixed by restructuring to `<figure>/<blockquote>/<figcaption>`, moving curly-quote pseudo-elements to global.css, and adding inline `style="background-color: #1c2d40"` so axe sees the dark bg — 2026-10-24
- [a11y] CTA button `bg-madrone text-driftwood` had contrast ratio 4.0:1 — fixed: changed to `bg-madrone-700` (5.52:1) in Button.astro and contact.astro inline button — 2026-10-24
- [infra] Missing favicon — fixed: added SVG favicon (modern browsers), 32×32 PNG fallback, 180×180 Apple touch icon, all derived from wave-vinyl mark — 2026-10-24
- [a11y] No skip-to-content link — fixed C3: added skip link in BaseLayout, `id="main-content"` on `<main>` — 2026-10-24
- [a11y] No focus-visible styles — fixed C3: global `:focus-visible` outline (golden-hour, 2px, 2px offset) in `global.css` — 2026-10-24
- [a11y] Gallery lightbox had no close button — fixed C3: added close button with `aria-label`, `role="dialog"` on overlay, focus moved to close on open, returned to trigger on close — 2026-10-24
- [a11y] Mobile menu had no Escape key handler — fixed C3: added keydown listener, focus moved to close button on open, returned to toggle on close — 2026-10-24
- [a11y] Golden-hour eyebrow text failed contrast on light backgrounds (~2.9:1) — fixed C3: SectionHeading takes `dark` prop, uses `text-golden-hour-700` on light backgrounds; inline eyebrows (FAQ, blog) updated similarly — 2026-10-24
- [a11y] Footer bottom-bar text `text-driftwood/40` failed contrast (~3.5:1) — fixed C3: changed to `text-driftwood/60` — 2026-10-24
- [a11y] Multiple `<nav>` elements without `aria-label` — fixed C3: Primary, Mobile menu, Navigate, More — 2026-10-24
- [a11y] Contact form required `*` used `aria-label` on plain span — fixed C3: changed to `<abbr title="required">` with `text-madrone-700` for contrast — 2026-10-24
- [a11y] FAQ `+` icon used `text-penn-cove-400` (~3.7:1) — fixed C3: changed to `text-penn-cove` (~6.7:1) — 2026-10-24
- [a11y] Blog cover images had empty alt="" — fixed C3: uses `post.data.title` — 2026-10-24
- [a11y] Transitions/animations not disabled for prefers-reduced-motion — fixed C3: global `transition-duration: 0.01ms !important` in `global.css` — 2026-10-24
- [seo] No Twitter card meta tags — fixed C3: added twitter:card, twitter:title, twitter:description, twitter:image in BaseLayout — 2026-10-24
- [spec] Nav and footer showed "Events" instead of "Not weddings" per WEBSITE_SPEC §3 — fixed C3: updated both Nav.astro and Footer.astro — 2026-10-24
- [cleanup] Stale .gitkeep files in blog/, equipment/, recommendations/ collections — deleted C3 — 2026-10-24
- [perf] Google Fonts loaded via external stylesheet — fixed C2: self-hosted woff2 (latin subset, 118 KB total) in `public/fonts/`, `@font-face` in `global.css`, preload on Inter + DM Serif Display — 2026-10-24
- [seo] No OG image on any page — fixed C2: default fallback to `/images/og-default.jpg` (social-icon derivative) on every page via BaseLayout — 2026-10-24
- [infra] Keystatic GitHub App not yet created — fixed M0: setup wizard completed, Keystatic works on production — 2026-10-24
- [content] Gallery, equipment, blog, and recommendations collections were empty — gallery now has 42 entries, content track ongoing — 2026-10-24
- [content] DJ profile photos used PlaceholderArt — replaced with real photos in `src/assets/djs/` — 2026-10-24
- [pages] C1 pages not built — fixed: /blog, /blog/[slug], /recommendations, /our-story, /privacy, /terms all built — 2026-10-24
- [content] Image fields (djs.photo, gallery.image, equipment.photo, services.heroImage, blog.coverImage) upgraded from `z.string()` to `image()` — photos moved to `src/assets/`, templates use Astro `<Image>` with responsive srcset — 2026-10-24
- [perf] Gallery page scored 59 mobile perf due to unoptimized raw JPEGs — fixed: all images through Astro pipeline, WebP output, responsive sizes — 2026-10-24
- [perf] Gallery images lacked width/height — fixed: `image()` schema provides dimensions at build time — 2026-10-24
- [bug] Scroll-reveal never fires on `/djs` and `/djs/matt` — fixed: wrapped observer init in `requestAnimationFrame` — Phase 3.5
- [homepage] Phase 1 homepage components superseded by one-screen landing — Phase 3.5
- [homepage] "Who We Are" prose was in index.astro — moot; landing page no longer has body copy — Phase 3.5
- [content] Only one DJ entry rendered as a left-aligned card — DJ index now uses full-width editorial blocks — Phase 3.5
- [homepage] Hero / service picker / photobooth PlaceholderArt swap targets — moot; removed from landing by SPEC rev 2 — 2026-09-11
- [infra] Supabase removed — replaced by Keystatic + content collections — Phase 0
- [infra] inquiry.ts rewritten to use Resend with honeypot + rate limiting — Phase 0
- [component] TestimonialCard renamed to ReviewCard — Phase 0
- [homepage] Hardcoded Brittany B. quote replaced with live collection read — Phase 0
- [homepage] Only one featured review shown — proof band now shows three featured reviews — Phase 1
- [seo] No sitemap, robots.txt, 404, canonical URLs, or JSON-LD — all added in Phase 1 — Phase 1
- [nav] Nav and footer links did not match spec sitemap — updated — Phase 1
- [homepage] `review.body` passed as raw string — all pages now render via Astro `render()` — Phase 4
- [djs] review.body passed as raw string on DJ profile page — fixed, now uses `render()` — Phase 4
