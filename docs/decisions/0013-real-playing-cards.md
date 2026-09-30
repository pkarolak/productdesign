# 0013: Real playing cards instead of pastel suit tiles

- **Status:** Accepted, supersedes the suit colours in [ADR 0012](0012-card-hand-and-suits.md)
- **Date:** 2026-09-30
- **Todo:** card hand follow-up (owner request)

## Context

The owner liked the hand but asked for cards "much more like real game cards, both in terms of colors and layout". The pastel fills read as coloured tiles, not as a deck.

## Decision

- **Colours:** a printed deck has one paper colour and two inks. The contract drops `--suit-1` to `--suit-5` and `--suit-ink` and gains `--card-face`, `--card-red` and `--card-black`, the same in light and dark mode. Hearts and diamonds are red, spades and clubs black, the joker red and black.
- **Paper:** a new contract utility `playing-card` gives the face its paper colour, a faint linen grain, a hairline edge and a soft drop shadow. Each theme defines it.
- **Layout:** each card has a rank and a pip in the top-left corner, repeated upside down in the bottom-right. One pip sits in the centre, with the title and line below it. The ace of spades has the traditional oversized pip. The joker spells JOKER down its corners, black at the top and red at the bottom, and has a harlequin hat in alternating red and black as its centre figure. Corners use the small radius (`rounded-inset`), and cards use the 5:7 proportion on every screen size.
- **Elsewhere:** Side projects covers without an image become card faces with a single pip. The glyph beside a section heading uses the same split. On the page, black pips take the ink colour so they stay visible in dark mode.

## Alternatives considered

- Keeping the pastel fills and adding real corners: still reads as tiles, which is what the owner pushed back on.
- Coloured card backs with the face shown on hover: hides the section names, which are the point of the hand.

## Consequences

- The contract loses six variables and gains three, plus one utility. Dusk and Blueprint both implement them.
- Red on a dark canvas is only used for small decorative glyphs, never for text.
- "One accent per theme" still holds. The card inks are for pips and card faces only.
