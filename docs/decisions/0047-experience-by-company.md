# 0047: Experience grouped by company, with logos

- **Status:** Accepted. Refines [ADR 0044](0044-editorial-about.md).
- **Date:** 2026-10-05
- **Todo:** owner request: make Experience "nicer and more visual, add org logos", with more meaningful Miro bullets and a count of his production PRs

## Context

Experience listed every role as its own card beside a year rail. Miro and Egnyte appeared two and three times, promotions did not read as such, and there were no logos. The current Miro role had two thin bullets, capped at two by the schema.

## Decision

- **One card per company stint:** mark, name, industry and span in the header; the roles inside on a rail, newest first, the current one marked with the accent dot. A role's years show only when the card holds more than one role.
- **Sticky company list** with marks and spans replaces the year rail.
- **Logos:** from the hero intro as before; a role may add `logo` (Espago, from its site's favicon) or an `icon` where there is no mark (Freelance, `pen-tool`).
- **Up to four points per role**, still 16 words each, at the owner's request.
- **The production PR count is counted, not estimated:** 19 PRs opened by `pattheux` in Miro's production repositories that touch UX (`client` 15, `ai-config` 3, `design-system` 1), as of 2026-10-05. Prototype repositories and analytics-only data repositories (`looker`, `dbt`) are excluded. 7 of the 19 are merged.

## Consequences

- Re-count the PRs with `gh search prs --author pattheux` before changing the number.
- A new company without a hero pill needs a 64×64 `logo` under `public/logos/` or an `icon`.
