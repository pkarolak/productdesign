# 0029: No painted shade on lettering

- **Status:** Accepted. Supersedes the shade in [ADR 0019](0019-filete-lettering.md) and [ADR 0021](0021-quieter-hero-lettering.md).
- **Date:** 2026-10-01
- **Todo:** owner request: get rid of the decorative texts with shadow, all of them, keep minimalism

## Context

`filete-shade` put a solid accent block shade behind section headings, the About teaser headline, card titles and one hero phrase ("gotan soul"), as a nod to sign-painter lettering. Next to the tinted cards, the cut-out photo and the daylight, it read as decoration rather than type.

## Decision

- Remove `filete-shade` from both themes and the contract, and from every heading, card title and tooltip that used or inherited it.
- Remove `hero.shade` from the schema and content. The tagline is one run of clean ink.
- Keep the `Filete` hairline under headings: it is a quiet mark, not a text effect.
- No decorative text shadows anywhere in the future.

## Consequences

- The fileteado nod now lives only in the deck art (joker, card back) and the hairline.
