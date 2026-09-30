# 0002: Style direction "Blueprint"

- **Status:** Accepted
- **Date:** 2026-09-30
- **Todo:** direction-lock

## Context

The look had to be chosen from real visuals, not adjectives (see ADR 0005). It needed to feel modern, classy and cool, show senior-level strength, and hold many kinds of project assets.

## Decision

"Blueprint", as specified in [../../DESIGN.md](../../DESIGN.md):
- a faint isometric grid and one soft glow per view;
- a floating frosted pill nav;
- double-bezel media frames, with exploded isometric screenshot plates as the signature;
- **Sora** for headings and **Lato** for body text;
- **Blueprint Cobalt** as the only accent (`#2F5BEA` light, `#7A9BFF` dark);
- light and dark themes, following the system with a toggle.

## How we got here

1. **Round 1** ([design/directions/round-1](../../design/directions/round-1/README.md)) had five distinct directions: Quiet Precision, Swiss Systems, Studio Night, Working Notes and Signal. **All were rejected.** The user wanted cleaner and more modern, with beautiful whitespace, subtle gradients and subtle isometric grids in the backgrounds.
2. **Round 2** ([round-2](../../design/directions/round-2/README.md)) had four directions in that brief: Mist, Blueprint, Daylight and Ink. **G Blueprint was favoured**, but it needed to look more modern and leave room for more asset types.
3. **Round 3** ([round-3](../../design/directions/round-3/README.md)) refined Blueprint:
   - It brought back the floating pill nav and double-bezel frames from round 1 A.
   - It added mixed asset kinds (screenshots, isometric plates, phones, photos, diagrams, before/after, video).
   - **It was approved.**
4. **Fonts** ([design/fonts](../../design/fonts/README.md)): Lato for the body was a user requirement. Among the heading candidates (Sora, Plus Jakarta Sans, Bricolage Grotesque, Instrument Sans), **Sora was chosen**.
5. **Accent:** the round 3 teal was rejected. The user asked for a color that looks modern and professional, and good in dark mode. **Blueprint Cobalt** was picked and verified with real CSS in both themes ([design/preview/accent.png](../../design/preview/accent.png)).

## Alternatives considered

- **Round 1 directions:** too loud, too austere, too dark or too plain for the brief.
- **Round 2 Mist:** the cleanest, but too expected.
- **Daylight:** the softest signal of strength.
- **Ink:** the dark-only theme limited the range.
- **Accent alternatives:** teal read as healthcare or fintech. Emerald conflicts with "success" semantics in screenshots. Orange and rose are too loud for professional calm. Violet is too close to the AI-purple cliché.

## Consequences

- The isometric plates and diagrams need per-case work, meaning SVG diagrams and screenshots cut to plate proportions. The content guide must explain this.
- Dark mode is now in scope: `next-themes`, dual tokens, and an optional `srcDark` per asset. The plan's out-of-scope list is updated.
- No GSAP; Motion covers everything.
- There is no mono font, so the font payload is small (Sora 500/600, Lato 400/700/400i).

## Related

- [../../DESIGN.md](../../DESIGN.md)
- [0001-stack.md](0001-stack.md)
- [../plan.md](../plan.md)
