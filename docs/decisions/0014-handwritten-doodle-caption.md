# 0014: One handwritten font, for doodle captions only

- **Status:** Accepted, narrows the font rule in AGENTS.md and [ADR 0011](0011-dusk-theme.md)
- **Date:** 2026-09-30
- **Todo:** card hand follow-up (owner request)

## Context

The owner asked for a handwritten line under the card hand, "Pick a card to see some tricks", with a doodle arrow pointing at the cards. The rules said "never a serif, mono or handwritten font". The owner chose to add one handwritten font as a scoped exception over drawing the lettering as SVG or faking it with Geist.

## Decision

- **Font:** both themes load Caveat (weights 500 and 600) as `--theme-font-hand`, now part of the contract's `fontVariables`.
- **Utility:** `type-hand` is a contract utility. It is used only for doodle captions next to a hand-drawn mark. It is never used for headings, body copy, buttons or navigation.
- **Caption:** `site.handNote` (optional, 8 words) renders under the hand, slightly tilted, in `ink-2`. A looping arrow in the accent colour points up at the cards and draws itself once when it scrolls into view, or appears static when motion is reduced. The arrow is decorative; the caption is plain text.

## Alternatives considered

- SVG lettering: no new font, but the copy could not be edited in content.
- Geist italic with only the arrow drawn: stays within the rule, but does not feel handwritten.

## Consequences

- One more font download (Caveat, about 20 KB per weight in latin).
- The font rule now reads "no handwritten font except `type-hand` doodle captions".
