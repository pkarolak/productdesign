# 0019: Fileteado lettering on headings, with the same typeface

- **Status:** Accepted
- **Date:** 2026-09-30
- **Todo:** card hand follow-up (owner request)

## Context

The owner asked how the headings could better match the fileteado style of the cards. Fileteado lettering is recognisable less by its letterforms than by the sign painter's treatment: a solid block shade offset from each letter, and a filete flourish beside or under a title. The font rules allow no serif and no new display face, except Caveat for doodle captions (ADR 0014).

## Decision

- Keep Geist. Add `filete-shade`: a solid block shade offset down and right by about 0.05em, in the accent at 72%. Pale amber in Dusk dark mode, burnt amber in light mode, Cobalt in Blueprint.
- Add `Filete`: a thin accent flourish with a scroll at each end and a small leaf in the middle, placed under the heading.
- Section headings (`BlockHeader`, `AboutTeaser`) get both the shade and the flourish. Card titles get the shade only, so the value side stays minimal (ADR 0018).
- The hero, case pages and body type are unchanged.

## Alternatives considered

- A decorative fileteado display font: it would break the typeface rules and fight Geist. Most such fonts also hurt legibility at heading sizes.
- Only the flourish: too faint to read as lettering.

## Consequences

- One new contract utility (`filete-shade`) and one small UI primitive (`Filete`).
- The shade uses the accent, so it follows the theme and mode with no new tokens.
