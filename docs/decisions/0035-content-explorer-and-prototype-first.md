# 0035: Content Explorer leads, and the prototype-first loop is the stated way of working

- **Status:** Accepted. Amends ADR 0034 (five cases become six).
- **Date:** 2026-10-05
- **Todo:** plan "Brag doc into portfolio"

## Context

The owner's brag document (15 Sep 2026) records work newer than the Figma decks: Content Explorer, the admin console's first content-management surface, from kick-off in Aug 2025 to GA on 25 Sep 2026. It also records a practice that runs through all of it: prototype apps on real data (about 2,250 commits across eight prototypes), `FilterPill` merged into Miro's design system, and two production PRs. The owner wants that way of working said loudly. After discovery, he builds the prototype app, validates it fast and merges it if it proves right. Figma is for fast, cheap UI exploration, and a fully interactive prototype is the deliverable for big projects.

## Decision

- **Six cases.** `content-explorer` is the sixth and comes first, so home shows Content Explorer, Miro Analytics and Enterprise Guard. `index.ts` checks for exactly six.
- **The practice is not a case of its own.** It is told in How I work (`values.note` and the first two values), the short version, About and the journey. Its artifacts sit inside the cases they served: the working model and FilterPill in Content Explorer, and the staged prototype in Analytics.
- **Numbers yes, names no.** Internal product numbers are allowed behind the password, framed as the product's results (for example, 199 Enterprise Guard accounts and about $10M ARR). Customer names, kudos and retro quotes are not.
- **Unverified claims stay out:** the 82% usage figure, whose denominator is unclear. Use-case and AI analytics are "designed", never "shipped".
- **`values.note`** (optional, 24 words) carries the loop under the How I work heading.

## Consequences

- To make room, How I work dropped "Test even what you love" and "Over-communicate, one on one". The four-value budget stays.
- Content Explorer artifacts are placeholders until the owner exports them.
