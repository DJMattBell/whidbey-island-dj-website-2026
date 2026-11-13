---
description: Rules for editing CSS, Tailwind classes, and style-related files
globs: src/styles/**, **/*.css, **/*.astro
---

- All design tokens live in `src/styles/global.css` under `@theme`. No one-off color or font values anywhere.
- Check existing token names before creating a new one. The palette has full 50–950 ramps.
- Use semantic token aliases (e.g. `--color-driftwood` not `--color-driftwood-100`) unless you need a specific ramp step.
- Respect `prefers-reduced-motion` — it's already handled in global.css. Don't add animations that bypass it.
- Read `brand.json` for the canonical color/font map before proposing palette changes.
