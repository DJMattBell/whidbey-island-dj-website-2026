# WIDC Website Build Plan — v6

_Implements WEBSITE_SPEC v7 rev 2. Supersedes BUILD_PLAN v5. Last verified: 2026-10-23._

_Key change from v5: remaining work split into parallel Code and Content tracks. Code is mostly done; content is the bottleneck. Keystatic production access is the critical path._

Every phase ends with three things: (a) the quality checklist, (b) a hostile self-review, (c) a pause for Matt's review. No phase is "done" until all three happen and `KNOWN_ISSUES.md` is current.

---

## The quality bar ("Bamboo Beats quality")

- Typographic confidence — the display face doing real work at large sizes
- Restraint over decoration — every section has one job
- Photography carries the page; copy stays short beside it
- Motion sparing and purposeful; `prefers-reduced-motion` respected
- Pricing, proof, and CTAs findable without hunting
- **Not a template** — could a stranger mistake this page for a Divi/Squarespace/Tailwind-UI starter with the copy swapped? If yes, it isn't done. See SPEC §4a for the tells.

## The hostile self-review (run at the end of every phase)

Claude Code reviews the phase's diff as a skeptical senior developer inheriting the repo tomorrow, and answers in writing:

1. Is there anything a stranger couldn't understand from the code plus the docs?
2. Any duplicated component, pattern, or helper? Any dead file or unused dependency?
3. Any hardcoded color, font, price, or copy that belongs in tokens or content?
4. Does `docs/` still describe reality? (CONTENT_MODEL, DECISIONS, KNOWN_ISSUES)
5. What would you fix before showing this to a hire?

Fix what's fixable in the phase; log the rest in `KNOWN_ISSUES.md`.

**Enforcement:** The review must run in a separate Claude Code session (or a `/code-review` subagent) — never in the session that wrote the code. The writer is blind to their own messes.

---

## Completed phases

Phases 0–4 (code) are done. Kept here for git-range reviewability.

### Phase 0 — Migration to v7 architecture ✓

Supabase removed. Content collections created. Keystatic configured (local mode). Toolchain (Prettier, `astro check`, CI, `.nvmrc`). Docs scaffolded. Vercel project created.

### Phase 1 — Design system + landing page ✓

One-screen landing (Dart mode): spinning mark, two doors, one review, footer. Palette test ramps in `global.css`. Reveal utility fixed. SEO scaffolding (sitemap, robots.txt, 404, JSON-LD).

### Phase 1.5 — Interior page pattern ✓

`/weddings` as the guinea pig. Full-bleed photo heroes, display face at 48px+, SplitSection layout, 3–5 reveal moments. Real photos from Drive. Pattern copied to all subsequent pages.

### Phase 2 — DJs ✓

`/djs` index (editorial blocks, not card grid). `/djs/[slug]` with DJ-filtered reviews. 5 DJ entries seeded. Subdomain redirects in `vercel.json`.

### Phase 3 — Weddings, Events, Pricing, Photobooth, FAQ ✓

Both service pages with distinct voice/tone. Pricing from collections. Photobooth page. FAQ accordion. Visual quality pass: real photos, multi-tone darks, transparent nav, editorial serif, generous spacing.

### Phase 4 (code) — Gallery, Reviews, Equipment, FilterChips ✓

Pages built. FilterChips island built. ReviewCardFull built. YouTubeFacade built. Lightbox-ready markup. **Collections are empty** — content flows through the Content Track below.

---

## Code Track

Claude Code sessions. Each is sized to one session (~100k tokens). Run these in order; they don't depend on Matt's content work.

### C1 — Remaining pages (1 session)

All follow the established interior page pattern. No new components needed.

1. `/blog` index with category filter (FilterChips, already built). Drafts excluded from build.
2. `/blog/[slug]` from the `blog` collection.
3. `/recommendations` — vendors grouped by category, resources as a link list. One page, two sections.
4. `/our-story` — collective story. Ships without proof numbers; layout accommodates them without redesign.
5. `/privacy` and `/terms` — minimal pages, BaseLayout + prose.

**Gate:** All 15 spec routes exist. `npm run build` clean. Hostile self-review on the diff.

### C2 — Performance & polish (1 session)

1. **Self-host fonts.** Download DM Serif Display, Inter, Libre Baskerville. Replace Google Fonts `<link>` with local `@font-face` declarations. Subset if feasible (latin only). This is the single biggest Lighthouse win available.
2. **Upgrade image fields to `image()`.** `djs.photo`, `services.heroImage`, `gallery.image`, `equipment.photo` — change from `z.string().optional()` to Astro's `image()` helper. With 16+ real photos in `src/assets/`, the pipeline can validate them. Three-file commit (content.config.ts, keystatic.config.ts, CONTENT_MODEL.md).
3. **OG image fallback.** Set `social-icon.png` as the default OG image for pages that don't specify one.
4. **Lighthouse baseline.** Run Lighthouse on every page. Log scores in KNOWN_ISSUES. Fix anything below 90 that's fixable without content.

**Gate:** Lighthouse mobile ≥ 90 on all pages (with allowance for empty-collection pages). Fonts load without layout shift. Hostile self-review.

### C3 — Audit & final review (1–2 sessions)

1. **WCAG AA audit.** Color contrast, focus indicators, alt text, aria labels, keyboard navigation, skip links. Fix what's fixable; log the rest.
2. **SEO audit.** Per-page title/description/OG. Canonical URLs. Sitemap accuracy. LocalBusiness JSON-LD. No orphan pages, no dead links.
3. **Old-site bug classes confirmed fixed:** clean URLs, no external template assets, no dead booking links, no personal calendar exposure.
4. **Final hostile self-review** across the whole repo. Prune orphaned files. Verify `docs/` matches reality. KNOWN_ISSUES honest and short.

**Gate:** WCAG AA pass. Lighthouse ≥ 90 mobile on every page. Docs accurate. No dead code.

---

## Content Track

Matt's work, via Keystatic. Runs in parallel with the Code Track. Does not require Claude Code sessions (except M0).

### M0 — Keystatic production setup ⚠️ CRITICAL PATH

Nothing else on the Content Track can start until this is done. This is one Claude Code session that generates a step-by-step wizard for Matt (GitHub OAuth App creation, Vercel env vars).

1. Create GitHub OAuth App for Keystatic (Matt, in GitHub Settings → Developer settings).
2. Set `KEYSTATIC_GITHUB_CLIENT_ID` and `KEYSTATIC_GITHUB_CLIENT_SECRET` in Vercel env vars.
3. Set `KEYSTATIC_STORAGE_KIND=github` and `KEYSTATIC_STORAGE_REPO` in Vercel.
4. Verify: Matt opens `/keystatic` on the production URL, authenticates with GitHub, edits a review, commits, and sees Vercel rebuild.

**Gate:** Matt can add and edit content on production through Keystatic.

### M1 — Gallery content

- 15–30 photos from Drive (`Media/Photos for Use/`) uploaded to `src/assets/photos/` via Keystatic
- 4 core YouTube video URLs: 5-min reel, 10-min reel, intro video, lighting demo
- Captions and tags on every entry
- At least one entry per filter category (wedding, event, lighting, video)

### M2 — Equipment entries

- Every piece of gear Matt brings to a gig: name, category, photo, "what it does," "why it matters to your guests"
- Group by: sound, lighting, wireless/ceremony, power, photobooth
- Lighting demo video URL assigned to the equipment page

### M3 — DJ profiles

- Real headshots for Matt and Lee (replace PlaceholderArt)
- Matt's `musicFavorites` filled in (goToAnthem, guiltyPleasure, forTheParents, lastSong)
- Review incomplete DJ entries (Wife, Baby, Baby Big Girl) — real content or remove

### M4 — Review badges & proof numbers

- `reviewBadges` in `site.yaml`: platform, rating, count, URL for Google, The Knot, WeddingWire, Facebook
- `yearsActive` and `eventsPlayed` compiled from booking records
- Dates and source URLs added to existing reviews where possible

### M5 — Blog posts

- At least 1 gig log and 1 essay published through Keystatic
- Cover images for each

### M6 — Recommendations

- At least 3 vendor recommendations (photographers, venues, planners)
- At least 2 resource links

### M7 — Content review pass

- Read every page on the production preview. Flag copy that's wrong, stale, or not in Matt's voice.
- Verify `/events` tone is organizer-facing, not wedding-overflow.

---

## Launch Track

Starts when both Code Track (C3) and Content Track (M4+) are done. The site must have real content on every page before launch.

### L1 — Unassisted maintainability test

Matt, then his wife, each: add a review, change a price, upload a gallery photo, publish a blog post. Through Keystatic only. No code session. No help from Claude.

**If either person gets stuck, fix the UX or the docs before proceeding.**

### L2 — Handoff test

Someone who has never seen the repo follows README to a running dev server and can find where to add a DJ, a review, and a page using only the docs.

### L3 — Go live

1. Walk every page against the quality bar.
2. Cut over: move domains to this Vercel project, enable 301s, submit sitemap to Search Console.
3. Test contact form on the live domain — confirm email delivery within one minute.
4. KNOWN_ISSUES is honest and short.

---

## Post-launch backlog

Not phases. No sequence. Do them when it makes sense.

- **Illustrator asset swap.** When deliverables land in `05 Media/Rebrand Media (new brand)`, swap `wave-vinyl-placeholder.svg` and update `--mark-*` tokens. One-file change per LOGO_AND_ART_GUIDE.
- **Official palette.** Replace test ramps in `global.css` with the illustrator-coordinated palette. One-file change.
- **PhotoSwipe.** Wire the lightbox when gallery has 10+ real photos and the click-to-enlarge UX matters.
- **Optional paid review.** Two hours from an Astro developer. Findings logged to KNOWN_ISSUES, addressed in a single follow-up.

---

## Timeline

Code Track: 3–4 sessions (days, not weeks). Content Track: runs in parallel, paced by Matt. Launch Track: 1–2 days once both tracks converge. The calendar bottleneck is content, not code.

Flag if any Code Track session takes more than one day, or if the Content Track stalls for more than a week.

## Content readiness checklist

Matt's punch list. Each item is a Keystatic task, not a code task. Check them off as they're done.

- [ ] Keystatic works on production (M0)
- [ ] 15+ gallery photos with captions and tags (M1)
- [ ] 4 core video YouTube URLs (M1)
- [ ] Equipment entries — every piece of gear (M2)
- [ ] DJ headshots for Matt and Lee (M3)
- [ ] Matt's musicFavorites (M3)
- [ ] Review badges: Google, The Knot, WeddingWire ratings (M4)
- [ ] Proof numbers: years active, events played (M4)
- [ ] Dates + source URLs on existing reviews (M4)
- [ ] 1 gig log blog post (M5)
- [ ] 1 essay blog post (M5)
- [ ] 3+ vendor recommendations (M6)
- [ ] 2+ resource links (M6)
- [ ] Read every page, flag bad copy (M7)
