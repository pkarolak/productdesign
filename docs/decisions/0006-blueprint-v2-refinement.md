# 0006: Blueprint v2 refinement

- **Status:** Accepted
- **Date:** 2026-09-30
- **Todo:** direction-lock

## Context

The user reviewed the first real HTML/CSS render of Blueprint (`design/preview/accent.html` and `.png`). The direction was right, but it looked cheap. The user asked for:
- more frozen glass effects;
- nice, slow animations;
- a subtler isometric background, with dots instead of lines;
- delightfully rounded corners;
- more sophisticated elegance.

They also asked that all of this actually lands in the built page.

## Decision

Blueprint v2, as specified in [../../DESIGN.md](../../DESIGN.md), with the reference implementation in `design/preview/blueprint.html` and `.png`:
- **Glass:** a single `.glass` recipe (28px blur, 170% saturation, vertical white fill gradient, bright edge, inset top highlight, layered tinted shadow). It is used on the nav, plates, media frames, the metrics panel, the locked form and the About card.
- **Light:** three slowly drifting blurred orbs (48 to 64s) sit behind the glass, so the frost is visible. The flat single glow is gone.
- **Background:** an isometric dot lattice (26px triangular) with a radial mask, plus a 3.5% film grain. There are no grid lines.
- **Radii:** plates 36 and 28px, frames 32 and 24px, panels 28px, pills for all interactive elements, with a concentric inner radius rule.
- **Type:** Sora is lighter (300, 400 and 500 only, never 600). Metric values use Sora 300, with the unit in the accent and the number in ink. Icons use the Phosphor light weight.
- **Motion:** a 1400ms rise with a blur-in, a 140ms stagger, a softer spring (stiffness 70, damping 20), a 12s float on the plates, and hover effects of 600 to 1200ms. Nothing decorative is faster than 400ms.
- **Fidelity contract:**
  - Tokens are copied verbatim into `globals.css`.
  - There is a fixed set of pattern components.
  - A Playwright screenshot gate (`pnpm shots`) compares the build with the reference before the home page is marked done.
  - A checklist runs before every UI todo.

This refines ADR 0002. Direction, fonts and accent family are unchanged; the dark-mode accent moves from `#7A9BFF` to `#8AA8FF`, and the canvases change slightly.

## Alternatives considered

- **`corner-shape: squircle`:** tried in the reference. Chrome renders it visually tighter and inconsistently, so it was rejected in favour of large standard radii.
- **Glass on every surface without a budget:** backdrop blur is expensive on scrolling content. The cap of 6 per viewport, no nesting and solid fallbacks keep it smooth on mobile.
- **Line grid kept at a lower opacity:** rejected by the user in favour of dots.

## Consequences

- There is more GPU work than in v1. It is contained by the fixed ambient layer, the glass budget and the fallbacks. It must be verified with Speed Insights and on a mid-range phone during QA.
- `pnpm shots` (Playwright) joins the tooling.
- Glass only reads well when there is light behind it. Pages must place orbs behind their glass panels, as the Atmosphere component takes orb positions per page.

## Related

- [0002-style-direction.md](0002-style-direction.md)
- [../../DESIGN.md](../../DESIGN.md)
