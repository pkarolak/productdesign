# 0049: Side gig as a feature with a phone loop

- **Status:** Accepted. Extends [ADR 0045](0045-loop-recording-standard.md) and [ADR 0048](0048-tinted-icon-tiles.md).
- **Date:** 2026-10-05
- **Todo:** owner request: "give a little more love to CoNaDzielni.pl", with some animation

## Context

Side gigs held one item, CoNaDzielni.pl, as a third-width card with a placeholder diamond. It showed nothing of the product.

## Decision

- **A showcase item may carry a `loop`:** it then renders as a full-width feature (copy and the outbound link on one side, the recording in a phone on the other) on a violet `card-tint`, close to the product's own colour. It needs no sheet, so it is not a button.
- **The loop is the live product**, recorded from conadzielni.pl at 390 × 844 and 2x: the welcome screen, picking Music, Film and theatre and Art, scrolling events nearby, then the map. The recording hides the cookie banner and shows a soft touch dot instead of a cursor; a 0.7 s crossfade closes the loop.
- **Motion:** the phone deals in tilted and settles at -3° on the `deal` spring when it enters the viewport; the loop plays in view; the `tags` (the product's real categories) pop in after it and drift slowly. Reduced motion shows everything in place, still, with the poster.
- **Icons** `music`, `clapperboard` and `palette` join the contract.

## Consequences

- Re-record with `/tmp`-style tooling as in ADR 0045 if the product's UI changes; the events in the feed are the live listings of the day.
