# 0030: Suit markers and a nudge show the swipe row scrolls

- **Status:** Accepted
- **Date:** 2026-10-01
- **Todo:** owner question: how to show on narrow screens that the row of cards scrolls

## Context

Below `lg` the hand is a swipe row with a hidden scrollbar. Only the cut-off third card hinted that there was more, and the doodle caption points at the cards, not sideways.

## Decision

- **Suit markers:** a row of the cards' suit glyphs under the swipe row, only when it overflows. The current card's glyph takes its suit colour (`suitText`) and grows a little; the others are faint `ink-3`. Each is a 36px button ("Show Core work") that scrolls its card to the start edge. A card jumped to stays current until the row is swiped by hand, because the last cards cannot reach the start edge.
- **Sway:** once the row is dealt and at least 85% in view, if it overflows and has not been touched, the cards sway left and back once (`motion.shake`: Dusk 1.15s, x 0, -44, 5, 0px with a -1.6° tilt from the bottom edge, ease in and out on every segment, 45ms stagger so it ripples through the row; Blueprint slower), with a light haptic tap (`lib/haptic.ts`). Tapping a marker gives a lighter tap. Skipped under reduced motion.
- **Haptics** are best effort: the Vibration API on Android, and the switch toggle haptic on iOS 18 Safari. Browsers only allow them after the visitor has tapped the page, so the first shake of a visit is often silent, and a device that can hover never buzzes.
- Considered and not taken: an edge fade, a phone-only "Swipe" caption, a tighter overlap that shows all five.

## Consequences

- The markers use suit glyphs, which the playing-card colour rule allows. They sit on a layer above the row's bottom padding so taps reach them.
