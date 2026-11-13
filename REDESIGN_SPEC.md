# Redesign Spec — `redesign-trial` branch

_Written 2026-11-13. Updated same day after hero animation pass._

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

## What's changing

### Layout & animation
- **Hero entrance animations**: New `data-reveal-slow` system in BaseLayout for load-triggered (not scroll-triggered) hero reveals with staggered delays. Headlines, subheads, and CTAs fade/slide in sequentially.
- **Landing page**: Mark and doors get entrance animations with staggered timing.
- **CSS additions**: New keyframes (`fadeSlideUp`, `fadeSlideDown`) and animation utility classes in `global.css`.

### Pages touched
- **`/add-ons` (NEW)**: Dedicated page for DJ/ceremony add-ons and photobooth add-ons. Cards with name + price + description. Links to `/photobooth` and `/equipment`.
- **`/pricing`**: Restructured — hero tightened, add-ons moved out to `/add-ons` page, cleaner tier presentation.
- **`/equipment`**: Reorganized from product-shot grid to ambiance/dance-floor split. Effect/action images replace isolated product shots. Links to `/add-ons`.
- **`/weddings`**: Hero animation added. Copy tightened. "What's included" restructured.
- **`/events`**: School dance photos added. Hero animation added.
- **`/photobooth`**: Minor copy/link updates.
- **`/index` (landing)**: Entrance animations on mark, doors, review.

### Components & content
- **Footer**: Add-ons link added to "More" section.
- **Equipment content**: 8 new lighting equipment entries with effect/action images replacing product shots.
- **Addons content**: Activity Boxes add-on added. Ceremony sound and sensory experience descriptions tweaked.
- **Pricing tier**: Non-Saturday package description updated.

## What's NOT changing

- Site architecture (Astro + Tailwind + Keystatic + Vercel)
- Content model / schema — no collection changes
- Design tokens / color palette in `global.css` (new CSS is additive animation utilities only)
- Nav structure (except footer "More" link order)
- The scroll-reveal (`data-reveal`) system — the new `data-reveal-slow` runs alongside it
- Page layouts beyond hero animations (body sections, content structure) on: `/djs`, `/gallery`, `/reviews`, `/blog`, `/faq`, `/our-story`, `/contact`, `/privacy`, `/terms`, `/recommendations`
- `prefers-reduced-motion` support (new animations respect it)

## Pages/components status

| Page/Component | Status | Notes |
|---|---|---|
| `/index` | Touched | Hero entrance animations |
| `/weddings` | Touched | Hero animations + CTA, copy tightening |
| `/events` | Touched | School dance photos, hero animations + CTA |
| `/pricing` | Touched | Restructured, add-ons extracted, hero animations |
| `/equipment` | Touched | Ambiance/dance split, new images, hero animations |
| `/add-ons` | **New** | Dedicated add-ons page, hero animations |
| `/photobooth` | Touched | Copy/link updates, hero animations |
| `/djs` (index) | Touched | Hero animations |
| `/djs/[slug]` | Touched | Profile header entrance animations (photo + staggered info) |
| `/gallery` | Touched | Hero animations |
| `/reviews` | Touched | Hero animations |
| `/blog` (index) | Touched | Hero animations |
| `/blog/[slug]` | Touched | Post header entrance animations (category + title + excerpt) |
| `/faq` | Touched | Hero animations |
| `/our-story` | Touched | Hero animations |
| `/contact` | Touched | Hero animations |
| `/recommendations` | Touched | Hero animations |
| `BaseLayout` | Touched | `data-reveal-slow` system, `businessName` from site.yaml |
| `Footer` | Touched | Add-ons link |
| `global.css` | Touched | Animation keyframes + utilities |
| `/privacy`, `/terms` | Hero only | Static legal pages — no hero animation needed |

## Definition of done

1. ~~Every interior page hero has entrance animation (staggered, not scroll-triggered).~~ **Done.**
2. Every page passes the "not a template" test (SPEC §4a) — no symmetric three-card rows doing the work that photography or typography should do. _(Hero animations done; body section rhythm not yet reviewed.)_
3. ~~Pricing → Add-ons flow is clear: pricing page shows tiers, links to add-ons; add-ons page shows all extras.~~ **Done.**
4. ~~Equipment page reads as "what your event will feel like," not a product catalog.~~ **Done.**
5. ~~`npm run build` passes with 0 errors.~~ **Done.**
6. ~~`prefers-reduced-motion` disables all new animations.~~ **Done.**
7. No Lighthouse regression below 90 on any axis. _(Not yet tested post-animation pass.)_
8. KNOWN_ISSUES updated. _(Stale entries cleaned up; full update pending at phase end.)_

## Known issues addressed by this redesign

From the 42 items in KNOWN_ISSUES, this redesign directly addresses:

- None of the open issues are directly resolved by these changes. The redesign is a visual/structural improvement, not a bug-fix pass. The open issues are mostly content gaps (proof numbers, review dates, DJ entries), infrastructure (CI, analytics, domains), and accessibility items (focus traps, form validation) — all of which remain open and are orthogonal to this work.

The redesign does **prevent** a new issue: the "template feel" that the SPEC §4a "not a template" test is designed to catch. This wasn't logged as a KNOWN_ISSUE but was flagged in Alan's feedback.
