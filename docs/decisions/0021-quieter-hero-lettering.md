# 0021: A quieter hero: one shaded phrase, a small greeting

- **Status:** Accepted. Refines [ADR 0020](0020-hero-recomposition.md).
- **Date:** 2026-09-30
- **Todo:** hero review follow-up (owner request)

## Context

With the filete shade on the whole tagline, the hero looked clumsy and crowded. The shade sat under every letter of three heavy lines, two text tones stacked at display size, the tilted photo competed with the tilted cards, and the pills and underlines added more detail.

## Decision

- **Shade:** `hero.shade` names one phrase of the tagline ("gotan soul") that gets `filete-shade`, the way a sign painter shades the key word. The rest of the tagline is clean ink.
- **Greeting:** a small lede-size line above the headline. It stays inside the `h1`, and the headline is three display lines.
- **Size:** Dusk `type-display` is `clamp(2.375rem, 4.6vw, 3.4rem)` at line-height 1.1, down from `3.75rem` at 1.05.
- **Photo:** straight on card paper. It lifts and tilts by 2 degrees only on hover.
- **Flourish:** the `Filete` flourish sits under the headline, as under section headings.

## Consequences

- The About headline, story headers and the 404 title share the smaller display size.
- `hero.shade` is optional and must appear verbatim in the tagline, which the schema checks.
