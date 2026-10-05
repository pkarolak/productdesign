# 0048: Tinted icon tiles on About

- **Status:** Accepted. Extends [ADR 0028](0028-suit-tints.md).
- **Date:** 2026-10-05
- **Todo:** owner request: "add somewhat more color into the About page"

## Context

About was grey from top to bottom: every glyph sat on the same white tile in ink. The only colour was the amber accent on links. The theme already carries five hues for the playing cards (amber, rose, blue, green, violet).

## Decision

- **A new contract utility, `icon-tint`:** a tile washed 11% in one hue with a 20% hue border, and the glyph drawn in that hue's deep shade (light) or pale shade (dark). The `data-tint` values match `card-tint`. Each theme defines its own private hue inks.
- **Used through `IconTile`** on the beliefs, the How I work loop and the Education and Teaching headers. The loop runs blue, violet, green, amber, rose; the beliefs start the same cycle at amber so the two lists don't repeat side by side.
- **The accent rule stands:** hues sit on decorative glyph tiles only, never on text, links or buttons. The amber accent stays the one interactive colour.

## Consequences

- Any new glyph tile should use `IconTile` with a tint, not a plain `card` tile.
