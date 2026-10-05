# 0039: Like the letter photo to book a call

- **Status:** Accepted. Builds on [ADR 0038](0038-letter-photo-and-signature.md).
- **Date:** 2026-10-05
- **Todo:** owner request, "make the photo a little like a Tinder swipe"

## Context

The letter that closes home ends on "it's a match!". The owner wants its photo to play that out. On desktop the photo has a hover effect and a heart to like it. On mobile, swipe right is the affordance. A like opens the calendar invite.

## Decision

- **Component:** `LetterPhoto` (client) replaces the still photo when `links.calendar` is set. Without a calendar it stays still.
- **Desktop:**
  - The card tilts toward the pointer (spring `rotateX`/`rotateY`), lifts, and zooms the photo slightly.
  - A heart button shows on hover or focus. It is the heart suit glyph in `card-red` on a `surface-strong` pill.
- **Touch:**
  - The card drags along x and keeps vertical scroll (`touch-pan-y`). Past 90px, or with a fast fling, it counts as a like; a shorter drag springs back.
  - A "Let's talk" stamp fades in as it moves.
  - When the card first scrolls into view it nudges right once, and the caption says "Swipe right to book a call".
  - The heart button stays visible on touch screens as the non-gesture way to like.
- **A like:**
  - Hearts burst from the button and the card flies off to the right, fading as it goes.
  - The calendar opens in a new tab within 0.7s of the gesture, so popup blockers allow it.
  - The card is dealt back with a heart badge, and the caption reads "It's a match! Pick a time in the new tab." (`aria-live`).
- **Reduced motion:** no tilt, nudge, drag or flight. The heart opens the calendar at once.
- **Not a like count:** nothing is stored or shown to others, so the "no kudos, likes or visitor counts" rule still holds.

## Consequences

- "Book a call" under the letter stays as the plain path.
- Hover and touch are told apart with `@media (hover: hover)`, not by user agent.
