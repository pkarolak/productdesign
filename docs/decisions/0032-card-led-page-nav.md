# 0032: A picked card flies to its chapter; the hand is the table of contents

- **Status:** Accepted. Supersedes the card zoom overlay from ADR 0027.
- **Date:** 2026-10-01
- **Todo:** `card-flight`, `hand-dock` (plan "Clear IA and card nav")

## Context

Picking a card in the hero flipped it and grew it into a full-screen overlay holding a copy of a home section. It felt nice in the hand, but it broke the page's flow: the same content lived twice, the overlay hid where you were, and closing it put you back at the top.

## Decision

- **Fly, don't zoom.** A picked card lifts and flies along a short arc to its chapter while the page scrolls there (`goToChapter` and `FlightLayer` in `components/blocks/flight.tsx`). The scroll and the flight share one duration and easing (`motion.fly`: Dusk 0.95s, Blueprint 1.15s, with a 48px or 40px rise and a small extra turn), so the card meets its target. The card shrinks onto the chapter's emblem (`ChapterEmblem`), which is hidden during the flight and settles with a small spring when the card lands. Phones get a light haptic tap.
- **On landing** the hash updates with `pushState` (`#side-quests`), so chapters deep link and the back button works, and focus moves to the chapter heading for keyboard and screen reader users.
- **Scrolling by hand** (wheel, touch or a key) mid-flight stops both and drops the card on its emblem.
- **Reduced motion:** an instant jump, no flight.
- **The card stays a link** (`#big-ones`), so modified clicks and no-JS visits still work.
- **The docked mini-hand** (`HandDock`) repeats the hand once the hero is out of view, so the table of contents is always one tap away. See its own section in `DESIGN.md`.

## Consequences

- `CardZoom` and `AboutTeaser`, which only served the overlay, are deleted. The `zoom` motion token became `fly`, and the swipe-row sway now uses `fly.ease`.
- The flight measures the emblem before the scroll starts, so a chapter that is still rising into view (`Rise`, 12px) can land a few pixels off. The emblem's settle hides it.
