# Content Model

_Every editable thing on the site, where it lives, and its fields. Astro collection schemas in `src/content.config.ts` and the Keystatic config in `keystatic.config.ts` must match this document. When they diverge, fix the code and this doc in the same commit._

_Last verified: 2026-09-11_

Conventions:

- Slugs are kebab-case and stable — changing one changes a URL.
- Prices are integers in cents. `$2,100` → `210000`. Display formatting lives in `src/lib/format.ts`.
- `sortOrder` (integer, default 0) controls manual ordering where relevant; lower first.
- Images referenced from `src/assets/<collection>/`. Keystatic uploads land there.
- Dates are ISO `YYYY-MM-DD`.

---

## Singletons (`src/content/settings/`)

### site

Global values used across pages.

| Field                | Type                                      | Notes                                                                       |
| -------------------- | ----------------------------------------- | --------------------------------------------------------------------------- |
| businessName         | string                                    | "Whidbey Island DJ Collective"                                              |
| tagline              | string                                    |                                                                             |
| email, phone         | string                                    | Public contact info                                                         |
| serviceArea          | string                                    | One sentence, e.g. "Whidbey Island and the Puget Sound region"              |
| responsePromiseHours | integer                                   | 24                                                                          |
| yearsActive          | integer, optional                         | Proof point — leave empty until compiled                                    |
| eventsPlayed         | integer, optional                         | Proof point — leave empty until compiled                                    |
| socialLinks          | array of { platform, url }                |                                                                             |
| reviewBadges         | array of { platform, rating, count, url } | Drives the badge row on / and /reviews. Yelp goes here, never in `reviews`. |

---

## Collections

### djs (`src/content/djs/*.md`)

| Field          | Type                                                                    |
| -------------- | ----------------------------------------------------------------------- |
| name           | string                                                                  |
| slug           | from filename                                                           |
| role           | string ("Lead DJ", "Associate DJ")                                      |
| photo          | image                                                                   |
| specialties    | array of string                                                         |
| philosophy     | text (short)                                                            |
| musicFavorites | optional object { goToAnthem, guiltyPleasure, forTheParents, lastSong } |
| sortOrder      | integer                                                                 |
| body           | markdown — first-person bio                                             |

### services (`src/content/services/*.md`)

Long-form copy for /weddings and /events. One entry each (`weddings`, `events`).

| Field                              | Type                                                            |
| ---------------------------------- | --------------------------------------------------------------- |
| title, heroHeading, heroSubheading | string                                                          |
| heroImage                          | image                                                           |
| highlightVideoUrl                  | optional URL (YouTube)                                          |
| body                               | markdown — sections authored in prose; components handle layout |

### pricingTiers (`src/content/pricing-tiers/*.yaml`)

| Field       | Type                                                 |
| ----------- | ---------------------------------------------------- |
| name        | string                                               |
| priceCents  | integer                                              |
| priceLabel  | optional string — overrides display ("$0 / Forever") |
| description | string                                               |
| features    | array of string                                      |
| badge       | optional string ("Most Popular")                     |
| highlight   | boolean                                              |
| sortOrder   | integer                                              |

### addons (`src/content/addons/*.yaml`)

| Field       | Type                                     |
| ----------- | ---------------------------------------- |
| name        | string                                   |
| priceCents  | integer                                  |
| description | string                                   |
| category    | enum: dj, ceremony, lighting, photobooth |
| sortOrder   | integer                                  |

### faq (`src/content/faq/*.md`)

| Field     | Type                                                 |
| --------- | ---------------------------------------------------- |
| question  | string                                               |
| category  | enum: booking, music, logistics, pricing, photobooth |
| sortOrder | integer                                              |
| published | boolean                                              |
| body      | markdown — the answer                                |

### reviews (`src/content/reviews/*.md`)

| Field       | Type                                                       |
| ----------- | ---------------------------------------------------------- |
| attribution | string ("Brittany B.")                                     |
| source      | enum: theknot, weddingwire, google, facebook, zola, direct |
| sourceUrl   | optional URL — link to the original review                 |
| rating      | integer 1–5, optional                                      |
| date        | date                                                       |
| eventType   | enum: wedding, school, auction, community, private         |
| dj          | optional reference → djs                                   |
| featured    | boolean — homepage proof band                              |
| body        | markdown — the quote                                       |

Yelp reviews are never copied; Yelp appears only as a badge in `settings.site.reviewBadges`.

### gallery (`src/content/gallery/*.yaml`)

Cap: ~50 photos. New one in, old one out.

| Field     | Type                                                                |
| --------- | ------------------------------------------------------------------- |
| kind      | enum: photo, video, reel                                            |
| image     | image (photo)                                                       |
| videoUrl  | URL (video/reel) — YouTube                                          |
| caption   | optional string                                                     |
| alt       | string — required for photos                                        |
| tags      | array of enum: wedding, event, lighting, photobooth, ceremony, team |
| pinned    | boolean — the four core videos                                      |
| sortOrder | integer                                                             |

### equipment (`src/content/equipment/*.md`)

| Field      | Type                                               |
| ---------- | -------------------------------------------------- |
| name       | string                                             |
| category   | enum: sound, lighting, wireless, power, photobooth |
| photo      | image                                              |
| whatItDoes | text — one or two plain sentences                  |
| sortOrder  | integer                                            |
| body       | markdown — "why it matters to your guests"         |

### blog (`src/content/blog/*.md`)

| Field       | Type                                         |
| ----------- | -------------------------------------------- |
| title       | string                                       |
| slug        | from filename                                |
| category    | enum: giglog, essay                          |
| publishedAt | date                                         |
| draft       | boolean — drafts are excluded from the build |
| excerpt     | string                                       |
| coverImage  | optional image                               |
| body        | markdown                                     |

### recommendations (`src/content/recommendations/*.yaml`)

| Field     | Type                                                                                                       |
| --------- | ---------------------------------------------------------------------------------------------------------- |
| name      | string                                                                                                     |
| kind      | enum: vendor, resource                                                                                     |
| category  | string — for vendors: photographer, venue, planner, florist, catering, dj, other; for resources: free text |
| url       | URL                                                                                                        |
| blurb     | string — one line                                                                                          |
| sortOrder | integer                                                                                                    |

---

## Shared filter component

`/gallery`, `/reviews`, `/blog`, and `/recommendations` all use one `FilterChips` island. It reads `data-*` attributes on the cards and toggles visibility client-side. No fetching, no state library. Adding a filterable collection means rendering cards with the right attributes — not writing a new filter.
