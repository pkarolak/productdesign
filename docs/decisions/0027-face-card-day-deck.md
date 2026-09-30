# 0027: The face card becomes a deck that shuffles with the day

- **Status:** Accepted. Replaces the hover flip of [ADR 0026](0026-hero-face-card-and-daylight.md).
- **Date:** 2026-10-01
- **Todo:** owner idea: the day switch changes the hero photo by shuffling a tiny deck

## Context

The day switch already changed the intro line and the light behind the hero. The owner wanted it to change the photo too, as if shuffling a small deck. The hover flip from ADR 0026 was a stand-in until a second photo existed.

## Decision

- Each intro row may carry a `photo` (5:7). With two or more photos, `FaceDeck` renders one P of hearts per row, stacked and fanned slightly up and to the right. The top card is the current time of day.
- When the time changes, the old top card is cut off to the left (away from the text), then tucked under on a 0.75s keyframed arc, its z-index dropping halfway. The others spring to their new depth. Under reduced motion the cards jump. The deck sits on the hero's top layer (above the text column), so a shuffle never slips under the headline or the day switch.
- The deck is a button: a click shuffles to the next time and stops the day switch's autoplay, exactly like picking a tab.
- One small store (`components/blocks/daytime.ts`) holds the time and the stopped flag for the day switch, the light and the deck.
- Each card in the deck is its own colour: a suit per time (Day ♦, After hours ♥, Night ♠, in `card-red` or `card-ink`) and a wash over the card paper in that suit's colour (amber, rose, blue) through the `card-tint` contract utility ([ADR 0028](0028-suit-tints.md)). A shuffle then reads as a new card, not the same one moving. The single static card stays the plain P of hearts.
- A photo with a `cutout` (a transparent PNG) fills the card instead of sitting in a frame: it stands on the bottom edge, reaches up to just under the top corner and always gets its suit's wash, so the black shirt reads against the paper in dark mode. The corner marks are drawn over it, as on a court card.
- With fewer than two photos, the face card is a single static card, and the hover flip and `avatar.back` are gone.

## Alternatives considered

- A cross-fade between photos: it loses the card metaphor.
- A 3D flip per change: two faces per card cannot hold three photos.

## Consequences

- Live since 2026-10-01 with two generated stand-in photos (After hours: a wink and a point; Night: a side-on open tango embrace as an invitation), to be replaced by real shots. Before that, the feature was invisible until photos were added to the intro rows in `content/site.ts`, for example at the decks or dancing for Night, and bouldering or running for After hours.
