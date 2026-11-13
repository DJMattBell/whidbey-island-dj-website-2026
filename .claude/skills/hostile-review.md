---
description: Hostile self-review checklist — run at end of every build phase
---

# Hostile Self-Review

Review the phase diff as a skeptical senior developer inheriting the repo tomorrow. Answer each question in writing:

- [ ] **Clarity:** Is there anything a stranger couldn't understand from the code plus the docs?
- [ ] **Duplication:** Any duplicated component, pattern, or helper? Any dead file or unused dependency?
- [ ] **Hardcoded values:** Any hardcoded color, font, price, or copy that belongs in tokens or content?
- [ ] **Docs accuracy:** Does `docs/` still describe reality? (CONTENT_MODEL, DECISIONS, KNOWN_ISSUES)
- [ ] **Hire-ready:** What would you fix before showing this to a hire?

## After answering

1. Fix what's fixable in the current phase.
2. Log the rest in `docs/KNOWN_ISSUES.md` with the phase number.
3. This review must run in a separate subagent — never in the session that wrote the code.
