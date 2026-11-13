---
description: Atomic commit checklist for content schema changes
---

# Schema Change — Three-File Atomic Commit

When changing any content collection schema, all three files must update in a single commit:

1. **`src/content.config.ts`** — Zod schema (the source of truth for types)
2. **`keystatic.config.tsx`** — Keystatic field config (must mirror the Zod schema exactly)
3. **`docs/CONTENT_MODEL.md`** — Human-readable field documentation

## Pre-commit checks

- [ ] New/changed fields exist in all three files with matching names and types.
- [ ] Removed fields are gone from all three files.
- [ ] Existing content files in `src/content/` still validate against the new schema.
- [ ] `npm run build` passes (includes `astro check`).
- [ ] Commit message names the collection and the change.
