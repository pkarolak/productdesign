# 0017: Picking a card flips it open to its section

- **Status:** Accepted
- **Date:** 2026-09-30
- **Todo:** card hand follow-up (owner request)

## Context

The owner wanted picking a card to be the moment of the hand: the card flips and zooms in until it fills almost the whole screen, with padding and rounded corners, and the section's content appears on that very card.

## Decision

- **Path:** a picked card lifts off the table from its exact spot and angle. It travels to the centre as a big 5:7 card while flipping over, then widens to the viewport, with 32px padding (12px on phones) and a maximum width of 1240px. The first stage keeps the card's proportions, so the front never stretches. The back is the card's surface. Its frame is the deck's face art as a nine-slice `border-image`, so the corner scrolls keep their shape at any size.
- **Content:** `CardHand` takes `panels`, one node per target. Home passes a copy of the real block under a `card-` id: About teaser, Core work, Side projects, Teaching and My world. The content fades in as the card widens. Cards without a panel, and clicks with a modifier key, follow their link as before.
- **Closing:** the close button, Escape or a click on the scrim plays the same path in reverse. The card lands back in its place in the fan, and it stays hidden on the table while it is lifted.
- **Accessibility:** a native modal `<dialog>` named after the card. Focus moves to the close button and returns to the card on close. The page does not scroll underneath. Reduced motion opens and closes the card instantly.
- **Tokens:** `motion.zoom` holds the open and close durations and the flip's ease-in-out curve, so the flip reads as a turn instead of a snap.

## Alternatives considered

- Scrolling to the section after the zoom: the content would not be on the card, which was the point.
- Scaling one box with `transform` instead of animating its size: text on the front would not match the small card, and the content would reflow.

## Consequences

- Home renders each panelled block twice, once in the page and once in the card's props, which makes the payload larger.
- `WorkTimeline` and `Teaching` take an `id`. Showcase scopes its morph ids to its section.
- A case cover inside the card and the same cover on the page share a view-transition name, so the cover morph can fall back to a plain slide when a case is opened from inside the card.
