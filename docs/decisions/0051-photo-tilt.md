# 0051: Photos lean toward the pointer

- **Status:** Accepted.
- **Date:** 2026-10-05
- **Todo:** owner request: "make all the photos a little more interactive on hover, subtle but playful"

## Context

The playful photos already move (the hero face deck, the card hand, the letter photo's like button), and covers play or zoom on hover. The still photos did nothing: the About portrait, the Home About me portrait and the Free time tiles.

## Decision

- **`Tilt`** (`components/motion/Tilt.tsx`) wraps a photo's frame: under a mouse it leans up to 4° toward the pointer on the theme's `spring`, and settles back on leave. The image inside zooms to 1.045 (`tiltZoom`, kept in its own module so server components can use it).
- Touch, pen and reduced motion get a still frame. Photos that already have their own motion keep it and do not get `Tilt`.

## Consequences

- A new still photo frame should use `Tilt` and `tiltZoom`.
