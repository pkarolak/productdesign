# 0024: The hero intro becomes a day cycle

- **Status:** Accepted. Replaces the schedule layout from the hero intro follow-up to [ADR 0022](0022-real-employers-in-hero.md).
- **Date:** 2026-09-30
- **Todo:** owner feedback on the intro schedule

## Context

The intro was three stacked rows (By day, After hours, At night) with a label column, hairlines and framed company pills. The owner said it felt heavy. Under the `design-taste-frontend` rules it also read as a list inside the hero: three rows plus a note, where the hero should carry one short line of subtext.

## Decision

`DayCycle` (`components/blocks/DayCycle.tsx`) shows one row at a time under a small pill switch: Day, After hours, Night, each with its sun, sunset or moon icon and an accent highlight that slides between them.

- On first view it plays the day through once (about 4 seconds per line) and settles on Day, the line that matters most to a visitor. Hovering or focusing pauses it, any pick stops it, and it never plays under reduced motion or off screen.
- It is an ARIA tab list with arrow, Home and End keys. Every line stays in the DOM, stacked in one grid cell, so search and screen readers get all of them and switching never shifts the layout. Inactive lines are `inert`.
- Company links are frameless: logo, name, faint underline. The Day row's `note` (Egnyte, Allegro) continues the same line in a quieter tone.

## Alternatives considered

- One long sentence with all four places: about 30 words, too long for hero subtext.
- An auto-rotating line with no switch: hides content without a way to reach it, and WCAG 2.2.2 needs a pause or stop.
- Keeping the rows and removing the rules and label column: still reads as a list.

## Consequences

- A visitor who never interacts sees Day first and last, and the other two lines once in between.
- Row `when` values are now switch labels, so they stay one or two short words.
