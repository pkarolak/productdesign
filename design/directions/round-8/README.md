# Round 8: block library in Dusk (subtle dark)

A reusable block library modelled on the structure of benshih.design, with original content, styled as Dusk: a subtle dark design language that defaults to dark and keeps the light toggle. The personal touch comes later; there are no kudos.

**Status:** approved with Geist and pale amber `#E8B270`. Built as `themes/dusk/` ([ADR 0011](../../../docs/decisions/0011-dusk-theme.md)) and `components/blocks/` ([ADR 0010](../../../docs/decisions/0010-block-library.md)).

- **Tokens:** canvas `#0F1012`, surfaces `#16181B`, hairline `#25282C`, ink `#ECEDEE` / `#A6A9AF` / `#7D8188`, soft 16px radii, no glow, no glass.
- **Accent candidates:** pale amber `#E8B270` (images 1, 3, 4) and mist blue `#9DB7E0` (image 2).
- **Type candidates:** Geist throughout (images 1, 3, 4) and Manrope with Figtree (image 2).

| # | View | Image |
| --- | --- | --- |
| 1 | Home top: intro hero with inline company pills, door cards, statement | [r8-01-home-top.jpg](r8-01-home-top.jpg) |
| 2 | Home lower: work timeline by year, testimonials, letter card | [r8-02-home-lower.jpg](r8-02-home-lower.jpg) |
| 3 | About: story, education, journey rail and roles, values | [r8-03-about.jpg](r8-03-about.jpg) |
| 4 | Interactions: command menu, sheet, toast, button and pill states | [r8-04-interactions.jpg](r8-04-interactions.jpg) |

## Notes for the build

- The comps invent copy with em-dashes and filler ("elevate"), an "Acme Corp" pill and repeated case titles; the build uses our own content and rules.
- Door cards hide when their target is empty (for example Writing, until there are notes).
