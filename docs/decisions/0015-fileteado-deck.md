# 0015: A Fileteado Porteño deck that follows the page mode

- **Status:** Accepted, extends [ADR 0013](0013-real-playing-cards.md); art and inks revised by [ADR 0016](0016-quieter-deck-fileteado-inks.md)
- **Date:** 2026-09-30
- **Todo:** card hand follow-up (owner request)

## Context

The owner asked for the hand in the style of Fileteado Porteño, the Buenos Aires sign-painting tradition. The joker should be Aníbal Troilo with his bandoneón, and the card backs a tango couple, all in one consistent style. Cards should be dark in dark mode and light in light mode.

## Decision

- **Art:** six illustrations in `public/cards/`: an ornamental frame for the aces, the Troilo joker and the tango back, each on black and on cream. They were generated as a set, with the first back as the style reference for the others, so the scrolls, flowers, celeste ribbons and filete lines match. The art is decorative (`alt=""`); every card still carries its text.
- **Content:** `site.deck` (optional) holds `face`, `joker` and `back`, each `{ src, srcDark }`. Without a deck, the hand falls back to the plain printed cards from ADR 0013.
- **Colours follow the mode:** `--card-face`, `--card-red` and `--card-ink` are now light and dark variables. `--card-black` is renamed `--card-ink` because it is cream on the dark deck. In dark mode the paper is black, with vermilion red and cream pips; in light mode it is cream, with deep red and near-black pips.
- **Layout:** the aces keep the corner index and one centre pip inside the frame. The joker spells JOKER on a small pill so it reads over the flowers, and its title sits on a slim plate in the calm band under the figure.
- **Deal:** the stack lands face down, showing the tango backs, and each card flips face up as it slides into place (a 3D flip, back and front with `backface-visibility: hidden`). Reduced motion shows the fan face up at once.

## Alternatives considered

- Drawing the fileteado in SVG: fully themeable, but hand-built scrolls would look stiff next to the real tradition, and a likeness of Troilo is out of reach.
- One art set for both modes: simpler, but a black card on a light page broke the owner's "light cards in light mode".

## Consequences

- About 1.6 MB of source JPEGs; `next/image` serves them resized to card width.
- The art is 3:4 and the cards are 5:7, so the art is stretched by about 5% (`object-fill`). The ornaments hide it.
- Themes must define the three card variables in both modes, and the contract checks for that.
