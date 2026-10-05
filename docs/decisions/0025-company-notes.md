# 0025: Company names open notes instead of links

- **Status:** Accepted. Changes the company pills of [ADR 0022](0022-real-employers-in-hero.md) and [ADR 0024](0024-day-cycle-intro.md).
- **Date:** 2026-09-30
- **Todo:** owner feedback on the intro links

## Context

The intro named Miro, Egnyte, Allegro and CoNaDzielni.pl as links to their websites. The owner did not want the hero to send visitors away. They asked for a small bubble that explains each product instead, as on benshih.design.

## Decision

Company names open a `CompanyNote` card: the logo in a small tile, the name, the kind of product (up to 5 words) and one line about it (up to 24 words). It shares one `Bubble` primitive with the dictionary terms, so the behaviour is identical: it opens on hover, focus or tap, only one card is open at a time, it closes on Escape, and on phones it opens centred over a blurred scrim. Company names use the same dotted accent underline as dictionary terms, which signals "this explains itself".

## Alternatives considered

- A link inside the card: the card would need to take the pointer, and the owner asked for no way out from the hero.
- Keeping the links and adding a `title` tooltip: not reachable on touch, and still leaves the site.

## Amendment, 2026-10-05

The owner now wants each card to offer the product's website. A company with `href` gets an open-in icon in the card's top-right corner that opens the site in a new tab; the name itself still only opens the card. Such a card takes the pointer, so it stays open while the pointer crosses onto it, and it becomes a small dialog rather than a tooltip, since a tooltip may not hold a link. Tab from the open name moves into the card, and Tab from the link continues to whatever follows the name.
