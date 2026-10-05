# 0045: A recording standard for UI loops, with dark variants

- **Status:** Accepted. Refines [ADR 0042](0042-shipped-ui-loops-as-covers.md).
- **Date:** 2026-10-05
- **Todo:** owner request: make the loops "high quality", without the "ugly focus ring and misbalanced UI because of the red tags", "extremely beautiful and minimalistic", with the side panel as an overlay

## Context

The first loops were recorded at 1280×800 and 1x. They showed a blue focus ring on the filter search, a saturated red "Highly Confidential" chip that outweighed the screen, and the details panel as a column squeezing the table. In dark mode the light loop was dimmed and read as grey.

## Decision

- **Capture:** 1440×900 at 2x, encoded to 1920×1200 H.264 at a constant 30 fps (crf 21, under 1 MB each). Protected stills use the same viewport and scale.
- **Prototype settings:** "Side panel as overlay" on (`vlab.experimental`), so details panels float over the page as in production.
- **Recording polish, never product changes:** no focus rings, text caret or scrollbars; classification tags at lower saturation, and the `danger` chip as a mild red ground. Charts keep their colours.
- **Motion:** a macOS-like pointer with a soft shadow (white in dark mode), eased moves along a slight arc, a quiet ring on click. Each loop ends in the state it starts in, so it repeats without a jump.
- **Calmer scripts:** Content Explorer filters by classification, clears it, then searches by name; the busy Content Lifecycle tab is left to the story.
- **Dark variants:** a video asset takes an optional `dark: { src, poster }`, recorded with the console's own dark theme (`loop-dark.mp4`, `loop-dark.jpg`). With one, each colour mode plays its own loop and nothing is dimmed; the hidden player stays paused.

## Consequences

- Every new loop needs a light and a dark take, recorded with the same polish.
- The recorder lives outside the repo; the settings above are the spec to reproduce it.
