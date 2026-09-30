# 0018: Plain card faces, fileteado only on the joker and the back

- **Status:** Accepted. Supersedes the face frame and pip inks of [ADR 0016](0016-quieter-deck-fileteado-inks.md).
- **Date:** 2026-09-30
- **Todo:** card hand follow-up (owner request)

## Context

The owner reviewed the quieter deck. The aces' pips had different sizes (the spade was larger) and their four inks (vermilion, gold, celeste, green) sat far from the page's calm monochrome with one pale amber accent. The corner values sat inside the frame instead of in the corners. The joker's bandoneon filled the card, and the back had become too plain. The ask: keep the value side minimal, and let the fileteado live only on the joker and the back, as a small nod for those who know it.

## Decision

- **Faces:** plain card paper with no frame art. One pip size for every ace. The corner values sit 8px from the card edge.
- **Inks:** two per mode, as on any deck: `card-red` for hearts and diamonds (a warm terracotta tuned to the amber accent), `card-ink` for spades and clubs. `card-gold`, `card-green`, `card-sky`, `card-glint` and the `filete-letter` utility are removed from the contract. Titles and blurbs use `card-ink`. Beside section headings the black suits take the page `ink`.
- **Joker:** a small bandoneon emblem in place of the pip (`deck.joker`), with two thin filete scrolls. It is a transparent PNG, unblended from its painted background, so nothing shows around it when the hovered card scales up (a CSS blend mode broke inside the scaled layer). In dark mode only its gold lines show.
- **Back:** a double filete border, small corner clusters with one flower and a ribbon curl, and the tango couple in an oval medallion. This sits between the first and the second deck.
- **Zoom:** the picked card's back is plain paper that repeats the card's corner values, so the section still reads as printed on that card.
- `deck` is `{ joker, back }`; `face` is gone.

## Alternatives considered

- Keeping fileteado inks in a muted form: still four hues against a one-accent page.
- Pure SVG pips with gold outlines: fileteado on the value side, which the owner asked to drop.

## Consequences

- The deck carries less art: four images instead of six.
- The dark joker emblem loses its black lacquer body when unblended from black and reads as a gold line drawing. This is intended, since it keeps the joker as quiet as the aces.
