# Known Issues & Rough Edges

_Honest list of what's unfinished, hacky, or waiting on something. Updated at the end of every build phase. A short, truthful list earns more trust from an inheriting developer than a clean-looking repo with surprises._

Format: `- [area] description — what would resolve it — date logged`

## Open

- [tokens] `apricot-cream` ramp as supplied is byte-identical to `sandy-brown` (all eleven steps). Not added to `global.css`; if a distinct cream is wanted, Matt supplies real values — 2026-09-11
- [placeholder] `wave-vinyl-placeholder.svg` is placeholder art: the orca fluke is a rough bézier, the label has no lettering, and the wave geometry is generated (not drawn). Swap target is the illustrator's mark; keep the `--mark-*` variable names so the swap stays one-file — 2026-09-11
- [placeholder] Word mark above the landing mark uses Shrikhand (Google Fonts) as a stand-in disco/funk display face. Not a brand decision; the illustrator brief owns typography — 2026-09-11
- [content] Real photos exist in Drive (`Media/Photos for Use/{Pre-2025,2025,2026}`, `Media/Equipment Photos/`) but none are in `src/assets/` yet. Phase 1.5 pulls a first set for `/weddings`; the full sort is still Matt's — 2026-09-11
- [content] Proof-point numbers (years active, events played) not yet compiled — Matt to pull from booking records; `settings.site.yearsActive/eventsPlayed` stay empty until then — 2026-09-11
- [content] Photo inventory not yet sorted into hero / supporting / guest-care sets — Matt; Phase 1 uses placeholder-art treatments where needed — 2026-09-11
- [content] Old-site reviews lack dates and source links; imported as `source: direct` with no date until matched to their platform — 2026-09-11
- [content] Gallery, equipment, blog, and recommendations collections are empty — real content required from Matt before those pages can be built — Phase 0
- [content] Image fields (djs.photo, services.heroImage, gallery.image, equipment.photo) are optional strings, not Astro `image()` helpers — upgrade to `image()` when real photos exist and the pipeline can validate them — Phase 0
- [content] Events service entry (`events.md`) created with working copy — needs Matt's review of tone and accuracy — Phase 1
- [content] `reviewBadges` array in site.yaml is empty — homepage proof band badge row hidden until real platform ratings/counts are compiled — Phase 1
- [content] No OG image set for any page — create or photograph one before launch — Phase 1
- [infra] Domain redirect map not yet confirmed against registrar — Phase 0 — 2026-09-11
- [infra] Keystatic GitHub App not yet created; `/keystatic` works locally but not on production until OAuth credentials are set — Phase 0
- [infra] `npm run build` emits Vite "use client" warnings from Keystatic's UI library — cosmetic, not actionable — Phase 0
- [infra] Astro's re-exported `z` from `astro:content` shows deprecation hints during `astro check` — upstream migration, not actionable — Phase 0
- [schema] `reviews.dj` is a plain string slug, not a validated Astro `reference()` — works for filtering but doesn't catch typos at build time — Phase 0
- [homepage] `review.body` is passed as a raw string, not rendered as HTML — works for plain-text quotes but will break if a review body contains markdown formatting — render via Astro's `render()` when reviews page is built — Phase 0
- [placeholder] DJ profile photos use PlaceholderArt — swap for real DJ headshots when available — Phase 2
- [content] DJ entries for Lee, Wife, Baby, Baby Big Girl are incomplete — need content from Matt — Phase 2
- [content] Matt's `musicFavorites` not populated — profile page section hidden until filled in — Phase 2
- [infra] Subdomain redirects (matt./lee.) configured in vercel.json but not testable until domains are connected to Vercel — Phase 2
- [djs] review.body passed as raw string on DJ profile page — render via `render()` when reviews page pattern is established — Phase 2
- [placeholder] /weddings hero uses PlaceholderArt "cool" — swap for real wedding photo — Phase 3
- [placeholder] /events hero uses PlaceholderArt "accent" — swap for real event photo — Phase 3
- [placeholder] /photobooth hero uses PlaceholderArt "accent" — swap for real photobooth photo — Phase 3
- [content] /weddings and /events "what's included" checklists are structural page copy, not content collection data — Phase 3
- [content] /photobooth backdrop details are generic — needs real backdrop inventory from Matt — Phase 3
- [faq] FAQ answers rendered as raw body string, not via Astro render() — works for current plain-text answers — Phase 3
- [perf] Google Fonts loaded via external stylesheet — self-host if Lighthouse performance demands it — Phase 1
- [tokens] Color ramps generated algorithmically, not calibrated by a designer — ramp stops may need perceptual tuning when real photography arrives — Phase 3.5
- [landing] Mark token values in global.css match SVG fallbacks but are not yet coordinated with illustrator — Phase 3.5

## Resolved

- [bug] Scroll-reveal never fires on `/djs` and `/djs/matt` — fixed: wrapped observer init in `requestAnimationFrame` to wait one frame after view transition DOM swap; threshold lowered from 0.15 to 0.1 — Phase 3.5
- [homepage] Phase 1 homepage components (HeroSection, service picker, proof band, blog teaser) superseded by one-screen landing — `HeroSection.astro` deleted, index.astro rewritten — Phase 3.5
- [homepage] "Who We Are" prose was in index.astro — moot; landing page no longer has body copy — Phase 3.5
- [content] Only one DJ entry rendered as a left-aligned card — DJ index now uses full-width editorial blocks that work with any count — Phase 3.5
- [homepage] Hero / service picker / photobooth PlaceholderArt swap targets — moot; those sections are removed from the landing by SPEC rev 2 — 2026-09-11
- [infra] Supabase removed (client, types, migrations, schema doc, dependency, env vars) — replaced by Keystatic + content collections — Phase 0
- [infra] inquiry.ts rewritten to use Resend with honeypot + rate limiting — Phase 0
- [component] TestimonialCard renamed to ReviewCard — Phase 0
- [homepage] Hardcoded Brittany B. quote replaced with live collection read — Phase 0
- [homepage] Only one featured review shown — proof band now shows three featured reviews — Phase 1
- [seo] No sitemap, robots.txt, 404, canonical URLs, or JSON-LD — all added in Phase 1 — Phase 1
- [nav] Nav and footer links did not match spec sitemap — updated to Weddings/Events/Pricing/DJs/Gallery/Blog + footer-only pages — Phase 1
