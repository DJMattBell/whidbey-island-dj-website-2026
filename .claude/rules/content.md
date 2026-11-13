---
description: Rules for editing content files in src/content/
globs: src/content/**
---

- Validate against the schema in `docs/CONTENT_MODEL.md` before saving.
- Never hardcode prices — store in cents, render with `formatPrice()`.
- No placeholder proof numbers (review counts, years active, events played). Real or absent with a TODO in `KNOWN_ISSUES.md`.
- Copy lives here, not in components or layouts. If you're writing prose in an `.astro` file, stop.
- Schema changes are atomic: `content.config.ts` + `keystatic.config.tsx` + `CONTENT_MODEL.md` in one commit. See `.claude/skills/schema-change.md`.
