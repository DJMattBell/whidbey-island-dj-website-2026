# Redesign Spec — `redesign-trial` branch

_Written 2026-11-13. Last updated 2026-11-13 after Lighthouse pass and AI infrastructure overhaul._

Branch: `redesign-trial` (pushed to `origin/redesign-trial`)
Diverged from: `main` at commit `efafd2b`
Total diff: 55 files changed, +1068 / -394 lines

---

## Goals

The site's code track (C1–C3) and content model are solid, but the pages feel like a well-built template — symmetric grids, static heroes, and uniform section rhythm. Alan's feedback confirmed it. The redesign trial is trying to:

1. **Break the template feel.** Add motion, asymmetry, and editorial pacing so pages pass the "not a template" test (SPEC §4a).
2. **Tighten copy and pricing.** Remove filler, restructure pricing to lead with the value prop, and make the "no upcharges" message land faster.
3. **Surface add-ons and equipment properly.** Add-ons were buried inside the pricing page; equipment was a product-shot catalog. Both need their own pages with clear purpose.
4. **Make heroes alive.** Static photo + centered text heroes read as generic. The trial adds staggered entrance animations (fade/slide on load, not scroll-triggered) to hero content.

## What's wrong with the current state (on `main`)

- Heroes are static — photo + centered heading + paragraph, identical pattern on every interior page.
- Pricing page is a wall of tiers + inline add-ons — hard to compare, easy to miss the "no upcharges" headline.
- Equipment page is product shots in a grid — reads as a catalog, not as "here's what your event will feel like."
- No dedicated add-ons page — ceremony sound, sensory experience, and photobooth add-ons are buried in pricing.
- Events page lacks school-dance-specific photography.
- `businessName` hardcoded as a literal string in every page's `<title>` tag.

## What's changed (live on `redesign-trial`)

### Layout & animation
- **Hero entrance animations on every interior page**: `data-reveal-slow` system in BaseLayout for load-triggered (not scroll-triggered) hero reveals with staggered delays. Headlines slide up at 100ms, subheads fade at 350ms, CTAs slide up at 600ms. DJ profile and blog post detail pages use element-level stagger on their custom hero layouts.
- **Landing page**: Mark, headline, subhead, CTA, divider, doors, and featured review all entrance-animate with staggered timing (200ms–1700ms).
- **CSS additions**: Animation keyframes and utility classes in `global.css`. All respect `prefers-reduced-motion`.

### Pages restructured
- **`/add-ons` (NEW)**: Dedicated page for DJ/ceremony add-ons and photobooth add-ons. Cards with name + price + description. Organized by category. Links to `/photobooth` and `/equipment`.
- **`/pricing`**: Restructured — hero tightened, add-ons extracted to `/add-ons`, cleaner two-column tier comparison.
- **`/equipment`**: Reorganized from product-shot grid to ambiance/dance-floor split. Effect/action images (lights in use at real events) replace isolated product shots. Links to `/add-ons`.
- **`/weddings`**: Hero entrance animations + CTA. Copy tightened. "What's included" restructured.
- **`/events`**: School dance photography added. Hero entrance animations + CTA.
- **`/photobooth`**: Hero entrance animations. Minor copy/link updates.
- **`/index` (landing)**: Full entrance animation sequence on mark, headline, subhead, CTA, divider, doors, and featured review.

### Infrastructure & code quality
- **`businessName` pulled from CMS**: BaseLayout reads `businessName` from `site.yaml` and appends ` | {name}` to every page title. All 20 page files stripped of the hardcoded string. Landing page uses `site.yaml` via template literal.
- **`brand.json` created**: Canonical source for business name, tagline, color palette, fonts, and contact info. Referenced by CLAUDE.md for AI sessions.
- **Build gate hooks**: `.claude/settings.json` has both a PreToolUse hook (blocks `git commit` if build fails) and a Stop hook (runs build when Claude declares done).
- **AI infrastructure overhaul**: Path-scoped rules (`.claude/rules/`), reusable skills (`.claude/skills/`), and rewritten CLAUDE.md for tighter AI session control.
- **Stale KNOWN_ISSUES resolved**: FAQ render(), GitHub Actions CI, and Dependabot entries were already fixed but not recorded. Moved to Resolved.

### Content
- **Footer**: Add-ons link added to "More" section.
- **Equipment**: 8 new lighting equipment entries with effect/action images.
- **Addons**: Activity Boxes add-on added. Ceremony sound and sensory experience descriptions tweaked.
- **Pricing tier**: Non-Saturday package description updated.

## What's NOT changing

- Site architecture (Astro + Tailwind + Keystatic + Vercel)
- Content model / schema — no collection changes
- Design tokens / color palette (CSS changes are additive animation utilities only)
- Nav structure (except footer "More" link order)
- The scroll-reveal (`data-reveal`) system — the new `data-reveal-slow` runs alongside it
- `prefers-reduced-motion` support (new animations respect it)
- Body section layouts on content-focused pages (`/reviews`, `/blog`, `/faq`, `/our-story`, `/contact`, `/recommendations`, `/gallery`) — hero animations added but body sections untouched

## Pages/components status

| Page/Component | Status | Notes |
|---|---|---|
| `/index` | Restructured | Full entrance animation sequence |
| `/weddings` | Restructured | Hero animations + CTA, copy tightened |
| `/events` | Restructured | School dance photos, hero animations + CTA |
| `/pricing` | Restructured | Add-ons extracted, cleaner tier comparison |
| `/equipment` | Restructured | Ambiance/dance split, action images |
| `/add-ons` | **New page** | Dedicated add-ons page |
| `/photobooth` | Touched | Hero animations, minor copy/link updates |
| `/djs` (index) | Touched | Hero animations |
| `/djs/[slug]` | Touched | Profile header entrance animations |
| `/gallery` | Touched | Hero animations |
| `/reviews` | Touched | Hero animations |
| `/blog` (index) | Touched | Hero animations |
| `/blog/[slug]` | Touched | Post header entrance animations |
| `/faq` | Touched | Hero animations |
| `/our-story` | Touched | Hero animations |
| `/contact` | Touched | Hero animations |
| `/recommendations` | Touched | Hero animations |
| `BaseLayout` | Restructured | `data-reveal-slow` system, `businessName` from CMS, `fullTitle` logic |
| `Footer` | Touched | Add-ons link |
| `global.css` | Touched | Animation keyframes + utilities |
| `/privacy`, `/terms` | Untouched | Static legal pages |

## Definition of done

1. ~~Every interior page hero has entrance animation (staggered, not scroll-triggered).~~ **Done.**
2. Every page passes the "not a template" test (SPEC §4a) — no symmetric three-card rows doing the work that photography or typography should do. _(Hero animations done; body section rhythm needs Matt's visual review.)_
3. ~~Pricing → Add-ons flow is clear: pricing page shows tiers, links to add-ons; add-ons page shows all extras.~~ **Done.**
4. ~~Equipment page reads as "what your event will feel like," not a product catalog.~~ **Done.**
5. ~~`npm run build` passes with 0 errors.~~ **Done.**
6. ~~`prefers-reduced-motion` disables all new animations.~~ **Done.**
7. ~~No Lighthouse regression below 90 on any axis.~~ **Done.** See Lighthouse results below.
8. KNOWN_ISSUES updated. _(Stale entries cleaned up 2026-11-13; full phase-end sweep pending.)_

## Lighthouse Results (2026-11-13, local build)

Lighthouse 13.6.0 · Desktop headless · `npx serve .vercel/output/static`

| Page | Perf | A11y | BP | SEO | vs Baseline (2026-10-24) |
|------|------|------|----|-----|--------------------------|
| `/` (landing) | 99 | 100 | 100 | 100 | Perf +9 (was 90 desktop) |
| `/gallery` | 99 | 100 | 100 | 100 | Holds (was 100 mobile) |
| `/contact` | 99 | 100 | 100 | 100 | Holds (was 100 mobile) |
| `/weddings` | 99 | 100 | 100 | 100 | Holds (was 100 mobile) |

No regressions. All four A11y/BP/SEO axes hold at 100.

## Open questions for review

1. Does the add-ons page earn its existence, or would visitors prefer everything on the pricing page?
2. Does the equipment ambiance/dance-floor split communicate "what your event feels like" or is it still too catalog-like?
3. Do body sections on content-focused pages (reviews, blog, FAQ, our-story) still read as template, or does the hero animation lift carry enough?
4. Are there pages where the hero animation timing feels off (too slow, too fast, elements appearing in wrong order)?

## Remaining open KNOWN_ISSUES (27 items)

Not addressed by this redesign — mostly content gaps (proof numbers, incomplete DJ entries, review dates), infrastructure (domain pointing, analytics, subdomain redirects), accessibility (focus traps, form validation), and visual polish (prose styling duplication, algorithmic color ramps). Full list in `docs/KNOWN_ISSUES.md`.
