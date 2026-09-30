# 0012: A hand of section cards, and suit colours

- **Status:** Accepted
- **Date:** 2026-09-30
- **Todo:** card hand (owner request after round 8)

## Context

The owner found the two door tiles under the intro too plain. They asked for five sections, Hi!, Core work, Side projects, Teaching and My world, with tiles that are "fun and more colorful, carousel like, or like a hand of gaming cards". On desktop it should feel like play; on narrow screens it should be simple.

## Decision

- **`CardHand` replaces `DoorCards`.** `site.hand` holds up to five cards. Each card has a title, a short line, an href, a target block and a suit (`heart`, `spade`, `diamond`, `club` or `joker`). Suited cards are aces; the joker has JOKER in its corners, a jester hat and a fill blended from the suit colours. A card whose target block is empty is hidden (`lib/blocks.ts`).
- **Desktop (from `lg`):** the cards fan out like a hand on an arc. Hovering or focusing a card lifts and straightens it while its neighbours move aside. Each card has playing-card corners, the suit drawn large, and the title.
- **Narrow screens:** a plain horizontal swipe row with scroll snap and no rotation.
- **Suit colours:** themes gain `--suit-1` to `--suit-5` and `--suit-ink`, a pastel set with dark ink that is the same in light and dark mode. Suits appear only as card fills (the hand, showcase cards without an image) and as the small glyph beside a section heading, which ties each section to its card. They are never text accents, links or buttons. "One accent per theme" still holds for everything else.
- **New and moved sections on Home:**
  - Core work is the work timeline, retitled.
  - Side projects is the showcase, where images are now optional.
  - Teaching is a new block.
  - My world is the outside-of-work block, moved from About with the owner's hobbies: climbing, tango and DJing at milongas.
  - Hi! links to About.

## Alternatives considered

- A 3D carousel: harder to scan and heavier on motion for five items.
- Colouring the cards with the accent at several opacities: calmer, but not the "more colorful" the owner asked for.
- Keeping My world on About: the owner wants it one card away from the intro.

## Consequences

- The contract gains six variables, so every theme must define them. Dusk and Blueprint do.
- The hand reads as the site's playful moment. Other sections stay calm, so the work still leads.
- Running is left out of My world because the block allows three items.
