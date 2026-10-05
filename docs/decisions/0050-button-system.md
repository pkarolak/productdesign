# 0050: One button system, sizes and spacing

- **Status:** Accepted.
- **Date:** 2026-10-05
- **Todo:** owner request: "make a pass for the button consistency, the size and spacing"

## Context

The primary pill was one component, but the outlined secondary pill was retyped in three places at 36px, below either primary height, and the space above text links changed from block to block (24, 28, 32 and 36px).

## Decision

- **Two heights for every pill action:** `default` 52px and `compact` 44px. `PrimaryLink`/`PrimaryButton` and the new `SecondaryButton` (`secondaryClass` for links) share them, so a primary and a secondary sit level in one row. Compact is for the nav, sheets and secondary rows; default for the main action of a block.
- **Copy email** is a `SecondaryButton`: compact by default, default beside a default primary (the letter).
- **Text links (`ArrowLink`):** 32px (`mt-8`) above a link that closes a block or the hero; 20px (`pt-5`/`mt-5`) above a link inside a card.
- **Segmented tabs** (day switch, command menu filters): `px-3.5 py-1.5`.
- **Icon buttons** are round (`rounded-pill`): 36px inside a bar or card, 40px or more when they stand alone on touch.

## Consequences

- A new action uses `PrimaryLink`, `PrimaryButton`, `SecondaryButton` or `ArrowLink`; never a hand-styled pill.
