# 0008: Swappable design-language layer

- **Status:** Accepted
- **Date:** 2026-09-30
- **Todo:** scaffold

## Context

The user approved Blueprint as the starting design, with one condition: "if I ever want to change the design language, it would be easy." A normal Tailwind build spreads a design language across every component (colors, radii, shadows, blur, motion timings, fonts, icon imports), so changing it means touching every file.

## Decision

- **One folder per design language:** `themes/<name>/` owns every visual value and the few signature components (`Atmosphere`, `Signature`, `Diagram`). Blueprint lives in `themes/blueprint/`.
- **A contract between app and theme:** `themes/contract.json` lists the required files, exports, CSS variables and utilities, and `themes/contract.ts` has the types. Components use only contract names (`surface`, `type-h2`, `text-ink-2`, `rounded-frame`, `ease-slow`).
- **Two switch points:** the `@theme/*` path alias in `tsconfig.json` and one `@import` in `app/globals.css`. `pnpm theme:use <name>` flips both; `pnpm theme:new <name>` forks the active theme.
- **Enforcement:** `pnpm theme:check` runs before every build. It fails on missing contract items, disagreeing switch points, direct imports of a theme folder, and any use of a theme's private names outside it.
- **No free values:** Tailwind's default colors, radii, shadows, fonts and easings are reset (`--color-*: initial` and so on), so only contract tokens exist as utilities.
- The guide is [docs/theming.md](../theming.md).

## Alternatives considered

- **CSS variables only, no component slots:** simpler, but Blueprint's identity is partly structural (glass plates, orbs, isometric diagrams). A variable swap could not remove those; the slots can.
- **Runtime theme switching (multiple themes shipped, chosen by a class):** heavier CSS and fonts on every page, and it is not needed. The site has one design language at a time; light and dark stay a runtime choice inside it.
- **A theme object in React context:** would force client components and runtime cost for values that are static. Build-time aliasing keeps everything server-rendered.

## Consequences

- Changing the design language is a folder of work, not a codebase-wide edit. The swap was drilled end to end (fork, change the accent, switch, build, verify the compiled CSS, switch back).
- Contributors must add new visual needs to the contract first. The check makes forgetting this a build failure, not a slow drift.
- Two switch points instead of one, because CSS cannot read TypeScript aliases. The script and the check cover it.
- `DESIGN.md` stays the spec for Blueprint only; a new language brings its own spec and ADR.

## Related

- [0002-style-direction.md](0002-style-direction.md), [0006-blueprint-v2-refinement.md](0006-blueprint-v2-refinement.md), [0007-lucide-icons.md](0007-lucide-icons.md)
- [../theming.md](../theming.md)
