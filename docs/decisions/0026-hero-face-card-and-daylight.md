# 0026: The hero is dealt from a face card and lit by the time of day

- **Status:** Accepted. The hover flip is replaced by the day deck of [ADR 0027](0027-face-card-day-deck.md).
- **Date:** 2026-10-01
- **Todo:** owner request for a more striking hero

## Context

The hero was well built but read small and static. At 1440 × 900 the card hand, the most striking element, started below the fold and its caption was cut off. The photo sat beside the text as a framed picture, with no link to the cards. The owner picked five changes: fit the first screen, let the day switch change the light, open with a card trick, make the photo a face card, and calm the headline.

## Decision

- **One composition.** Top padding and vertical rhythm are tighter, and the photo and the cards are both 200px wide from `xl`. The whole first screen, caption included, fits at 1440 × 900.
- **Face card.** The photo is the P of hearts: `playing-card` paper, corner marks through `Corner` (which gains a `rank`), and the photo framed inside. On hover it turns over to `avatar.back`, a second photo, or to the deck back when there is none.
- **The trick.** `useDeal` stacks the fan under the element `#intro-card` when it is on screen (measured through the offset chain, so transforms mid-animation do not skew it). The deck peeks out from under the face card and is dealt into the fan. The existing timing, flip and reduced-motion fallback are unchanged. The text column sits above the cards in flight.
- **Daylight.** A new contract utility, `daylight`, draws three stacked glows and shows the one named by `data-time` (sun, sunset, moon), cross-fading over 1.4s. `DayCycle` publishes its current row to a small store, and `Daylight` reads it. The glows are private theme values (`--dk-sun`, `--bp-moon`, ...) at low alpha. They are atmosphere, not accents, so the one-accent rule holds for text and controls.
- **Calmer headline.** Dictionary underlines in the tagline rest at 30% and rise to 70% while the headline is hovered.

## Alternatives considered

- A 3D cursor tilt on the fan: offered, not picked.
- Dealing from the middle of the fan, as before: it did not connect the photo to the deck.
- A single glow that changes colour: CSS cannot transition gradients, so three layers cross-fade instead.

## Consequences

- The face card flip is decorative: it has no keyboard or touch trigger, and the photo is hidden below `md` anyway.
- A real second photo for `avatar.back` (5:7, for example at the decks or dancing) will make the flip much stronger.
