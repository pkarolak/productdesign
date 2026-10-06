# 0052: Home "About me" shows the beliefs in full

- **Status:** Accepted. Amends [ADR 0043](0043-about-me-beliefs.md).
- **Date:** 2026-10-06
- **Todo:** owner feedback: the home list looked tappable, and it was unclear whether it was about him or how he works

## Context

Home "About me" listed the five beliefs as an icon and a title on a hairline. Nothing opened. The reason for each belief lives on `/about` under "What I believe". A reader thought the rows would expand, and read the list as a way of working rather than as being about him. "How I work" is already the values section on `/about`.

## Decision

- **The list keeps the About heading, "What I believe",** taken from `about.beliefs.title`, so home and About name the same list.
- **Each row shows the belief text** already written for About. No new copy, no raised budget.
- **The rows stay static.** The explanation is on the row, so there is nothing to expand. "More about me" remains the link to `/about`.
- **"About me" stays the chapter title** for the lead, the portrait and the link.

## Consequences

- The home chapter is longer. The portrait aligns to the top of the column, beside the lead, and the list continues under it.
- The same sentences appear on Home and on About.
