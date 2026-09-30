# 0028: Every playing card prints on a wash of its suit's colour

- **Status:** Accepted
- **Date:** 2026-10-01
- **Todo:** owner request: try the tint of the hero face cards on the aces below

## Context

The hero face deck gave each card its own wash of colour so a shuffle reads as a new card. The owner liked it and wanted the same on the hand of aces, which were all the same plain paper.

## Decision

- One contract utility, `card-tint`, lays a soft diagonal wash over a card's paper. `data-tint` picks one of five theme colours: `amber`, `rose`, `blue`, `green`, `violet`, each defined for light and dark in both themes (`--dk-tint-*`, `--bp-tint-*`).
- The colour follows the suit (`suitTint` in `CardHand.tsx`): hearts rose, diamonds amber, spades blue, clubs green, the joker violet. The hand, the zoomed card and the face deck all use it.
- The face deck's suits follow the same map, so Day is ♦ (amber), After hours ♥ (rose) and Night ♠ (blue). The single hero card without extra photos stays the plain P of hearts.
- The wash stays on card faces only, in line with the playing-card colour rule. Card backs keep their art.

## Alternatives considered

- A tint per position in the fan: it would change when the cards change, and would not match the face deck.
- Coloured card paper: too loud next to the page, and it breaks the printed-deck look.

## Consequences

- Replaces the `face-tint` utility from ADR 0027.
- The card red is a deep, cool crimson (Dusk `#9A1F36` light, `#D9566B` dark; Blueprint `#A01E3A`, `#DE5670`), and the five washes are tuned to it: a cool rose, a muted sand rather than a bright amber, slate blue, sage and lavender, close to each other in strength.
- In light mode the washes are clean, saturated pastels at low strength (about 10 to 13%) over near-white paper (Dusk `#F8F9FB`) with a fainter grain, since muted hues over grey paper read as dirty. Dark mode keeps the muted set.
- Light washes stay faint (about 12 to 16% at the corner) so the cool paper reads as white. Contrast of card text passes axe in both modes.
