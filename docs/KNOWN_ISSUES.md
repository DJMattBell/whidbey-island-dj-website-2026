# Known Issues & Rough Edges

_Honest list of what's unfinished, hacky, or waiting on something. Updated at the end of every build phase. A short, truthful list earns more trust from an inheriting developer than a clean-looking repo with surprises._

Format: `- [area] description — what would resolve it — date logged`

## Open

- [content] Proof-point numbers (years active, events played) not yet compiled — Matt to pull from booking records; `settings.site.yearsActive/eventsPlayed` stay empty until then — 2026-09-11
- [content] Photo inventory not yet sorted into hero / supporting / guest-care sets — Matt; Phase 1 uses placeholder-art treatments where needed — 2026-09-11
- [content] Old-site reviews lack dates and source links; imported as `source: direct` with no date until matched to their platform — 2026-09-11
- [content] Gallery, equipment, blog, and recommendations collections are empty — real content required from Matt before those pages can be built — Phase 0
- [content] Image fields (djs.photo, services.heroImage, gallery.image, equipment.photo) are optional strings, not Astro `image()` helpers — upgrade to `image()` when real photos exist and the pipeline can validate them — Phase 0
- [content] Events service entry (`events.md`) created with working copy — needs Matt's review of tone and accuracy — Phase 1
- [content] Homepage "Who We Are" prose is in index.astro, not a content collection — deliberate: it's structural page copy, not repeating data — move to site.yaml if Matt wants to edit it via Keystatic — Phase 1
- [content] `reviewBadges` array in site.yaml is empty — homepage proof band badge row hidden until real platform ratings/counts are compiled — Phase 1
- [content] No OG image set for any page — create or photograph one before launch — Phase 1
- [infra] Domain redirect map not yet confirmed against registrar — Phase 0 — 2026-09-11
- [infra] Keystatic GitHub App not yet created; `/keystatic` works locally but not on production until OAuth credentials are set — Phase 0
- [infra] `npm run build` emits Vite "use client" warnings from Keystatic's UI library — cosmetic, not actionable — Phase 0
- [infra] Astro's re-exported `z` from `astro:content` shows deprecation hints during `astro check` — upstream migration, not actionable — Phase 0
- [schema] `reviews.dj` is a plain string slug, not a validated Astro `reference()` — works for filtering but doesn't catch typos at build time — Phase 0
- [homepage] `review.body` is passed as a raw string to ReviewCard, not rendered as HTML — works for plain-text quotes but will break if a review body contains markdown formatting — render via Astro's `render()` when reviews page is built — Phase 0
- [placeholder] Hero section uses PlaceholderArt "warm" variant — swap for real hero photo or muted video loop when available — Phase 1
- [placeholder] Service picker cards use PlaceholderArt "cool" variant — swap for real wedding/event photos when available — Phase 1
- [placeholder] Photobooth card uses PlaceholderArt "accent" variant — swap for real photobooth photo when available — Phase 1
- [placeholder] DJ profile photos use PlaceholderArt — swap for real DJ headshots when available — Phase 2
- [content] Only one DJ entry (Matt) — Lee and future DJs need content entries from Matt — Phase 2
- [content] Matt's `musicFavorites` not populated — profile page section hidden until filled in — Phase 2
- [infra] Subdomain redirects (matt./lee.) configured in vercel.json but not testable until domains are connected to Vercel — Phase 2
- [djs] review.body passed as raw string on DJ profile page — same issue as homepage, render via `render()` when reviews page pattern is established — Phase 2
- [perf] Google Fonts loaded via external stylesheet — self-host if Lighthouse performance demands it — Phase 1

## Resolved

- [infra] Supabase removed (client, types, migrations, schema doc, dependency, env vars) — replaced by Keystatic + content collections — Phase 0
- [infra] inquiry.ts rewritten to use Resend with honeypot + rate limiting — Phase 0
- [component] TestimonialCard renamed to ReviewCard — Phase 0
- [homepage] Hardcoded Brittany B. quote replaced with live collection read — Phase 0
- [homepage] Only one featured review shown — proof band now shows three featured reviews — Phase 1
- [seo] No sitemap, robots.txt, 404, canonical URLs, or JSON-LD — all added in Phase 1 — Phase 1
- [nav] Nav and footer links did not match spec sitemap — updated to Weddings/Events/Pricing/DJs/Gallery/Blog + footer-only pages — Phase 1
