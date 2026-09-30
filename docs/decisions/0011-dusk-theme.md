# 0011: Dusk, a subtle dark design language

- **Status:** Accepted
- **Date:** 2026-09-30
- **Todo:** `adrs-contract`

## Context

The owner wanted the new block library styled with a custom, subtle dark look. Round 8 compared two type pairings and two accents on the same comps. Earlier personal directions (Milonga, After dark, Race kit, Topo, Tempo) were rejected as too close to benshih.design or too hobby-led.

## Decision

- **A new theme, `themes/dusk/`,** is the active design language. Blueprint stays in the repo and switchable with `pnpm theme:use blueprint`.
- **Dark is the default; light stays on the toggle.** Themes declare this in `meta.defaultMode` (`"light" | "dark" | "system"`), which `ThemeProvider` reads. Blueprint keeps `"system"`.
- **Palette (dark):** canvas `#0F1012`, cards `#16181B`, hairline `rgba(255,255,255,.07)`, ink `#ECEDEE` / `#A6A9AF` / `#858990`, one accent, pale amber `#E8B270`. The light variant uses a deeper amber (`#9A5B12`) so accent text passes 4.5:1.
- **Type:** Geist for headings and body. No serif, no mono, no handwriting.
- **Shape and motion:** 16px cards, 20px sheets, no glass on content surfaces, a faint vignette as the only atmosphere, and quicker, calmer motion (0.8s rise, 0.97 press).
- **Rule scope:** the "Sora and Lato" and "one accent is Blueprint Cobalt" rules in `AGENTS.md` and `DESIGN.md` apply to Blueprint. Dusk has its own section in `DESIGN.md`. "One accent per theme" still holds.

## Alternatives considered

- Mist blue `#9DB7E0` accent: quieter, but too close to Blueprint's dark cobalt.
- Manrope with Figtree: friendlier, but rounder than the crisp tone the owner chose.
- Restyle Blueprint in place: loses a working, audited theme for no gain; the theme layer exists for exactly this.

## Consequences

- OG images and browser chrome read Dusk's colours from `meta.ts`.
- Screenshots without `srcDark` are dimmed in dark mode by the theme's `media` utility, as in Blueprint.
- `design/preview/blueprint.html` remains Blueprint's fidelity target; round 8 comps are Dusk's.

## Related

- [design/directions/round-8/](../../design/directions/round-8/README.md), [0008](0008-design-language-layer.md), [0010](0010-block-library.md), [DESIGN.md](../../DESIGN.md).
