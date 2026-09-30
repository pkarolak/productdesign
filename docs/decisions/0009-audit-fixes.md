# 0009: Design changes from the UX and accessibility audit

- **Status:** Accepted
- **Date:** 2026-09-30
- **Todo:** `qa`

## Context

The audit in [ux-audit.md](../ux-audit.md) found places where Blueprint, copied verbatim from `design/preview/blueprint.html`, failed WCAG AA or basic heuristics once it met real content: tertiary text at 2.9:1, nav links lost over light screenshots, two competing primary button styles, chips and arrows that looked interactive but were not, and content that stayed invisible without JavaScript. Fixing them meant departing from the reference in a few named places.

## Decision

- **Ink 3** is `#5F6878` in light and `#8791A4` in dark (was `#8A93A3` and `#6B7588`), so labels pass 4.5:1 on canvas and glass.
- **Strong glass** (`surface-strong`): the nav and the mobile sheet use the same glass recipe at higher opacity, because they carry text over arbitrary imagery. Panels and frames keep the lighter glass.
- **One primary button**: the ink pill with the accent arrow. The nav's cobalt "Get in touch" pill is gone; the nav uses a compact size of the same button. Arrows in accent circles (cards, next case) are always visible, not hover-only.
- **Chips mean status only** ("Password protected"). Scope is labelled plain text. "Ask me about" prompts are numbered, not arrowed.
- **Labels mean one action**: "Get in touch" always goes to the contact block; the block's own action is "Email me", with a copy button for the address.
- **Gated state is visible**: a "Password protected" chip on cards and the locked header; "Unlocked · Lock cases" on unlocked cases; the locked page links to the open cases.
- **Reveals never hide content without JavaScript**: a `js` class set before paint gates the hidden initial state. Reveals start sooner (delay 0.08s, stagger 0.1s, 10% in view); the 1.4s duration stays.
- **Dark-mode media**: without `srcDark`, raster media are dimmed (`media`), and crops anchor to the top-left.

## Alternatives considered

- Keep the reference values and accept the failures: not acceptable for a portfolio that is itself judged on craft and accessibility.
- Make every primary cobalt instead: the ink pill with the accent arrow is the stronger Blueprint signature and appears far more often.
- Generate dark variants of every placeholder screenshot: real users will replace them; a theme-owned dim keeps the template honest until they do.

## Consequences

- `design/preview/blueprint.html` is no longer the exact target for these items; `DESIGN.md` records the new values and wins.
- Two new contract utilities (`surface-strong`, `media`) that every future theme must provide.
- Annotation coordinates depend on the top-left crop; re-check them when an image changes.

## Related

- [ux-audit.md](../ux-audit.md), [DESIGN.md](../../DESIGN.md), [0006](0006-blueprint-v2-refinement.md), [0008](0008-design-language-layer.md).
