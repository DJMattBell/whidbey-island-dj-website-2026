# Known Issues & Rough Edges

_Honest list of what's unfinished, hacky, or waiting on something. Updated at the end of every build phase. A short, truthful list earns more trust from an inheriting developer than a clean-looking repo with surprises._

Format: `- [area] description — what would resolve it — date logged`

## Open

- [content] Proof-point numbers (years active, events played) not yet compiled — Matt to pull from booking records; `settings.site.yearsActive/eventsPlayed` stay empty until then — 2026-09-11
- [content] Photo inventory not yet sorted into hero / supporting / guest-care sets — Matt; Phase 1 uses placeholder-art treatments where needed — 2026-09-11
- [content] Old-site reviews lack dates and source links; imported as `source: direct` with no date until matched to their platform — 2026-09-11
- [content] Gallery, equipment, blog, and recommendations collections are empty — real content required from Matt before those pages can be built — Phase 0
- [content] Image fields (djs.photo, services.heroImage, gallery.image, equipment.photo) are optional strings, not Astro `image()` helpers — upgrade to `image()` when real photos exist and the pipeline can validate them — Phase 0
- [infra] Repo not yet under a WIDC GitHub organization — Phase 0 — 2026-09-11
- [infra] Domain redirect map not yet confirmed against registrar — Phase 0 — 2026-09-11
- [infra] Keystatic GitHub App not yet created; `/keystatic` works locally but not on production until OAuth credentials are set — Phase 0
- [infra] `npm run build` emits Vite "use client" warnings from Keystatic's UI library — cosmetic, not actionable — Phase 0
- [infra] Astro's re-exported `z` from `astro:content` shows deprecation hints during `astro check` — upstream migration, not actionable — Phase 0
- [schema] `reviews.dj` is a plain string slug, not a validated Astro `reference()` — works for filtering but doesn't catch typos at build time — Phase 0
- [homepage] Only one featured review is shown; Phase 1 adds the full proof band with three featured reviews and badge row — Phase 0

## Resolved

- [infra] Supabase removed (client, types, migrations, schema doc, dependency, env vars) — replaced by Keystatic + content collections — Phase 0
- [infra] inquiry.ts rewritten to use Resend with honeypot + rate limiting — Phase 0
- [component] TestimonialCard renamed to ReviewCard — Phase 0
- [homepage] Hardcoded Brittany B. quote replaced with live collection read — Phase 0
