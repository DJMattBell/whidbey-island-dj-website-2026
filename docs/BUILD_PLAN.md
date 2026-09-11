# WIDC Website Build Plan — v5

*Implements WEBSITE_SPEC v7. Supersedes BUILD_PLAN v4 (retired). Last verified: 2026-09-11.*

Every phase ends with three things: (a) the quality checklist, (b) a hostile self-review, (c) a pause for Matt's review. No phase is "done" until all three happen and `KNOWN_ISSUES.md` is current.

---

## The quality bar ("Bamboo Beats quality")

- Typographic confidence — the display face doing real work at large sizes
- Restraint over decoration — every section has one job
- Photography carries the page; copy stays short beside it
- Motion sparing and purposeful; `prefers-reduced-motion` respected
- Pricing, proof, and CTAs findable without hunting

## The hostile self-review (run at the end of every phase)

Claude Code reviews the phase's diff as a skeptical senior developer inheriting the repo tomorrow, and answers in writing:
1. Is there anything a stranger couldn't understand from the code plus the docs?
2. Any duplicated component, pattern, or helper? Any dead file or unused dependency?
3. Any hardcoded color, font, price, or copy that belongs in tokens or content?
4. Does `docs/` still describe reality? (CONTENT_MODEL, DECISIONS, KNOWN_ISSUES)
5. What would you fix before showing this to a hire?

Fix what's fixable in the phase; log the rest in `KNOWN_ISSUES.md`.

---

## Phase 0 — Migration to the v7 architecture + toolchain

Goal: the repo matches the spec's architecture before any new page is built.

1. **Remove Supabase.** Delete `src/lib/supabase.ts`, `src/lib/database.types.ts`, `supabase/`, `docs/supabase-schema.md`, the `@supabase/supabase-js` dependency, and the Supabase env vars. Rewrite `src/pages/api/inquiry.ts` to send via Resend (keep the route path and the field names).
2. **Content collections.** Create `src/content.config.ts` with every collection in `docs/CONTENT_MODEL.md`. Migrate the existing `djs` and `services` entries to the new schemas. Seed each other collection with one real entry (from the old-site audit — e.g. the five named testimonials become `reviews`).
3. **Keystatic.** Add `@keystatic/core` + `@keystatic/astro`; write `keystatic.config.ts` mirroring the content config; local mode for dev, GitHub mode for production. Confirm `@keystatic/astro` supports the installed Astro major before proceeding — if not, pin Astro to the newest supported major and record it in DECISIONS.
4. **Toolchain.** Prettier (+ Astro plugin), `astro check` as part of `npm run build`, `.nvmrc`, `.github/workflows/ci.yml` (`npm ci && npm run build` on push and PR), Dependabot config, `.env.example` with every variable described.
5. **Docs.** README.md (human onboarding), `docs/DECISIONS.md` (seeded with the v7 decisions), `docs/ACCESS.md` (access map + offboarding checklist), `docs/KNOWN_ISSUES.md`. Confirm CLAUDE.md points at README.
6. **GitHub org + Vercel.** Move the repo into a WIDC GitHub organization. Vercel project imports from there. Set Resend and Keystatic env vars in Vercel. Enable Vercel Analytics.
7. **Domain map.** Write the canonical-domain + 301 list into DECISIONS. Configure subdomain redirects (`matt.` / `lee.` → `/djs/…`) in `vercel.json`. Do not cut over yet.

**Gate:** clean `npm run build`; CI green; Keystatic opens locally and can edit a review; `docs/` complete. Matt reviews.

## Phase 1 — Design system + homepage

Reuse: `global.css` tokens, BaseLayout, Nav, Footer, Button, HeroSection, SectionHeading, TestimonialCard (rename to ReviewCard, wire to `reviews`), `index.astro` skeleton.

1. Homepage in the spec's fixed order. Two-way service picker (Weddings / Events) + Photobooth card. Proof band reads `settings.site.reviewBadges` + featured reviews.
2. Placeholder-art system: 2–3 abstract token-palette treatments for sections without real photos; documented in KNOWN_ISSUES as swap targets.
3. Motion pass: Astro view transitions + one IntersectionObserver reveal utility, re-initialized on `astro:page-load`. Three to five moments, not everything.
4. Mobile-first pass on hero and nav.
5. SEO scaffolding: BaseLayout meta/OG props, sitemap integration, robots.txt, 404, LocalBusiness JSON-LD.

**Gate:** homepage passes the first-impression test; Lighthouse mobile ≥ 90 across the board.

## Phase 2 — DJs

1. `/djs` index with the "Your DJ from Day One" promise.
2. `/djs/[slug]` from the `djs` collection; DJ-specific reviews via filter on `reviews.dj`.
3. Verify subdomain redirects.

## Phase 3 — Weddings, Events, Pricing, Photobooth, FAQ

1. `/weddings` and `/events` from `services` — visually and tonally distinct; each with its own reviews slice and CTA.
2. `/pricing` from `pricingTiers` + `addons`; "$0 upcharges forever" explained concretely; photobooth add-on links to `/photobooth`.
3. `/photobooth` with accessible-height photo, print formats, backdrops, pricing block.
4. `/faq` accordion grouped by category.

## Phase 4 — Gallery, Reviews, Equipment (the "collection + filter" trio)

1. Build the shared `FilterChips` island once.
2. `/gallery`: lightbox for photos (PhotoSwipe or equivalent — one dependency, justified), lite YouTube facade for video, pinned core videos.
3. `/reviews`: badge row, filters, cards with source links.
4. `/equipment`: grouped by category, lighting demo embedded.

## Phase 5 — Blog + Recommendations

1. `/blog` index with category filter and `/blog/[slug]`. Drafts excluded from build.
2. `/recommendations`: vendors grouped by category; resources list.
3. **Gate:** Matt writes, previews, and publishes one post through Keystatic on the production branch.

## Phase 6 — Contact, Our Story, utility pages, audits

1. `/contact`: form → Resend, honeypot + rate limit, confirmation state, 24-hour promise. Test delivery end to end.
2. `/our-story` — ships without proof numbers if they're not compiled; the layout accommodates them without redesign.
3. `/privacy`, `/terms`.
4. WCAG AA audit; SEO audit; Lighthouse on every page.
5. Old-site bug classes confirmed fixed: clean URLs, no external template assets, no dead booking links, no personal calendar exposure.

## Phase 7 — Launch readiness + handoff test

1. Walk every page against the quality bar.
2. **Unassisted maintainability test** — Matt, then his wife, each: add a review, change a price, upload a gallery photo, publish a post. Through Keystatic only.
3. **Handoff test** — someone who has never seen the repo follows README to a running dev server and can find where to add a DJ, a review, and a page.
4. Final hostile self-review across the whole repo; prune anything orphaned; verify `docs/` is accurate; KNOWN_ISSUES honest.
5. Cut over: move domains to this Vercel project, enable 301s, submit sitemap to Search Console. Test the contact form on the live domain.

## Phase 8 — Post-launch

- Illustrator asset swap via one token pass (LOGO_AND_ART_GUIDE).
- Optional: a two-hour paid review by an Astro developer, with findings logged to KNOWN_ISSUES and addressed in a single follow-up phase.

---

## Timeline

Weeks, not months. Phases 3–5 can run in parallel sessions once Phase 1 sets the patterns. Flag any phase trending past a week.

## Reuse vs. build-fresh

| Asset | Status |
|---|---|
| `global.css` tokens | Reuse as-is |
| BaseLayout, Nav, Footer, Button, HeroSection, SectionHeading | Reuse; audit copy |
| TestimonialCard | Rename → ReviewCard; rewire to `reviews` |
| `index.astro` | Extend |
| `djs`, `services` collections | Migrate to v7 schemas |
| `api/inquiry.ts` | Rewrite handler; keep route + fields |
| Supabase (all of it) | Remove |
| Everything else | Net new, Phases 1–6 |
