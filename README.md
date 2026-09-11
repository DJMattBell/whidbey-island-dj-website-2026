# Whidbey Island DJ Collective — website

Production site for [whidbeyislanddj.com](https://whidbeyislanddj.com). Static Astro site; content edited through Keystatic and stored in this repo; hosted on Vercel.

If you are new here, this file should get you to a running dev server in under ten minutes. If it doesn't, that's a bug — fix the README.

## Stack

- [Astro](https://astro.build) (static output) + [Tailwind 4](https://tailwindcss.com)
- [Keystatic](https://keystatic.com) — content editing UI at `/keystatic`, writes to `src/content/`
- [Resend](https://resend.com) — sends contact-form emails
- [Vercel](https://vercel.com) — hosting; deploys on push to `main`
- No database. No client-side framework.

## Run it locally

```bash
nvm use            # reads .nvmrc
npm ci
cp .env.example .env   # fill in values from docs/ACCESS.md owner; Keystatic runs in local mode without them
npm run dev        # http://localhost:4321  — Keystatic at /keystatic
```

`npm run build` runs `astro check` and then builds. CI runs the same on every push.

## Where things live

| You want to… | Go to |
|---|---|
| Edit any content (reviews, pricing, FAQ, gallery, blog, equipment, DJs, recommendations, site settings) | `/keystatic` in the browser, or the files under `src/content/` |
| Change colors, fonts, spacing | `src/styles/global.css` — the only place tokens are defined |
| Add a page | `src/pages/` — use `BaseLayout` and pass `title`/`description` |
| Add a DJ | Keystatic → DJs → New. A profile page is generated automatically at `/djs/<slug>`. |
| Change the content schema | `src/content.config.ts` **and** `keystatic.config.ts` **and** `docs/CONTENT_MODEL.md`, in one commit |
| Understand why something is the way it is | `docs/DECISIONS.md` |
| See what's unfinished | `docs/KNOWN_ISSUES.md` |
| Grant or revoke someone's access | `docs/ACCESS.md` |

## Project layout

```
src/
  assets/         images referenced by content (optimized at build)
  components/     small, single-purpose .astro components
  content/        all editable content (Keystatic writes here)
  content.config.ts
  layouts/        BaseLayout
  lib/            tiny helpers (price formatting, etc.)
  pages/          routes; api/inquiry.ts is the only server route
  styles/         global.css — design tokens
docs/             SPEC, BUILD_PLAN, CONTENT_MODEL, DECISIONS, ACCESS, KNOWN_ISSUES
keystatic.config.ts
```

## Conventions

- One way to do each thing. Before adding a component or helper, check whether one exists.
- No hardcoded colors/fonts outside `global.css`. No hardcoded prices or copy outside `src/content/`.
- Prices are integers in cents; format with `formatPrice()` from `src/lib/format.ts`.
- No new dependency without a reason in the commit message.
- Small commits with messages that say what changed and why.
- Real numbers or nothing — never a plausible-looking placeholder.
- Run Prettier before committing (`npm run format`).

## Deploying

Push to `main` → Vercel builds and deploys. Preview deployments are created for every PR. Environment variables live only in the Vercel dashboard; see `.env.example` for the list.

## Docs

- `docs/WEBSITE_SPEC.md` — what the site is and every page's requirements
- `docs/BUILD_PLAN.md` — how it's being built, phase by phase
- `docs/CONTENT_MODEL.md` — every collection and field
- `docs/DECISIONS.md` — why
- `docs/ACCESS.md` — who has what
- `docs/KNOWN_ISSUES.md` — what's rough

Brand voice and visual identity documents live in Google Drive (`Rebrand Project 2026/`) because they're shared with the illustrator; `CLAUDE.md` notes how to reach them.
