# AI Setup Overhaul — DJ Site

**Created:** 2026-11-13
**Context:** Based on research into expert vs. vibe coder workflows (see /Users/papa/code/research-expert-vs-novice-claude-code-prompting.md)

---

## What Needs to Change

### 1. Rewrite CLAUDE.md (~40 lines, operational only)

Current CLAUDE.md mixes session rules, architecture reference, coding standards, and process docs. The research says: "Only write down what Claude can't find by reading the repo."

**Cut:**
- Tech stack (discoverable from package.json, astro.config.mjs)
- Governing doc descriptions (Claude can read them when referenced)
- Phase workflow details (belongs in BUILD_PLAN.md, not CLAUDE.md)
- Hostile self-review checklist (move to a skill)

**Keep/sharpen:**
- Commands (build, dev, typecheck)
- Session rules (model selection, token budget, commit discipline, code review separation)
- Hard conventions Claude gets wrong without being told (tokens in global.css only, prices in cents, schema changes = three files, no placeholder proof numbers)
- The "don't" list (no Supabase, no client frameworks, no video in repo, no docs outside docs/)
- Pointer to governing docs hierarchy (just the list, not descriptions)

### 2. Create .claude/rules/ (path-scoped context)

These load only when Claude touches matching files:

- **content.md** — When editing src/content/: validate against CONTENT_MODEL.md schema, never hardcode prices, use formatPrice(), no placeholder proof numbers
- **styling.md** — When editing CSS or Tailwind: all tokens in src/styles/global.css, no one-off color values, check existing token names first
- **phase-work.md** — When working on a build phase: read BUILD_PLAN.md first, run hostile self-review at end, update KNOWN_ISSUES.md, pause for Matt's review

### 3. Create .claude/skills/ (reusable procedures)

- **hostile-review.md** — The five hostile self-review questions from BUILD_PLAN.md, plus instruction to update KNOWN_ISSUES.md with findings
- **schema-change.md** — The three-file-commit checklist: content.config.ts + keystatic.config.tsx + CONTENT_MODEL.md in one atomic commit

### 4. Add PreToolUse hook (pre-commit build gate)

Current settings.json has Stop hook only. Add a PreToolUse hook that runs `npm run build` before any git commit, matching what WhidbeyWave already has.

### 5. Create brand.json

Consolidate brand-critical decisions from global.css, Keystatic settings collection, and WEBSITE_SPEC into one canonical file:
- Business name, tagline
- Colors (hex values + token names)
- Fonts (display, body, mono)
- Contact info, social links
- Logo/mark status (placeholder vs. final)

Reference it in CLAUDE.md: "Read brand.json before writing any user-facing copy."

---

## Agent Prompt

Paste this into a new Claude Code session:

```
I'm overhauling the AI-assistant setup for my DJ website at /Users/papa/code/whidbey-island-dj-website-2026. Read docs/AI_SETUP_OVERHAUL.md for the full plan, then execute it in order:

## 1. Rewrite CLAUDE.md

Read the current CLAUDE.md, then rewrite it as a ~40 line operational-rules-only file. Follow the guidance in AI_SETUP_OVERHAUL.md for what to keep and what to cut. Everything cut should either be discoverable from the repo or moved to rules/skills files in later steps.

Before writing, also read:
- docs/WEBSITE_SPEC.md (first 30 lines for context)
- docs/BUILD_PLAN.md (first 50 lines for the hostile self-review checklist)
- src/styles/global.css (first 30 lines for token names)
- package.json (for commands)

## 2. Create .claude/rules/

Create three rules files as described in AI_SETUP_OVERHAUL.md:
- .claude/rules/content.md
- .claude/rules/styling.md
- .claude/rules/phase-work.md

Each should be 5-15 lines. Terse. Imperative voice. No explanations — just rules.

## 3. Create .claude/skills/

Create two skills files:
- .claude/skills/hostile-review.md — Extract the five hostile self-review questions from BUILD_PLAN.md. Format as a checklist Claude can run at the end of any phase.
- .claude/skills/schema-change.md — The three-file atomic commit checklist for content schema changes.

## 4. Update .claude/settings.json

Read the current settings.json. Add a PreToolUse hook that intercepts git commit commands and runs `npm run build` first. Keep the existing Stop hook. Merge, don't overwrite.

## 5. Create brand.json

Read src/styles/global.css for color tokens, src/content/settings/ for business info, and docs/WEBSITE_SPEC.md for brand details. Create a brand.json at the project root consolidating:
- businessName, tagline
- colors (object mapping token names to hex values)
- fonts (display, body)
- contact (email, phone, social links)
- logo status (placeholder: true/false, notes)

Add a line to the new CLAUDE.md referencing it: "Read brand.json before writing any user-facing copy or changing brand-adjacent tokens."

## 6. Verify

Run npm run build to confirm nothing is broken. Commit all changes as one commit: "chore: overhaul AI setup infrastructure (CLAUDE.md, rules, skills, hooks, brand config)"

Do NOT push to remote.
```
