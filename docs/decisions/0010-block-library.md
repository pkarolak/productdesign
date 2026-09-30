# 0010: A block library for Home and About

- **Status:** Accepted
- **Date:** 2026-09-30
- **Todo:** `adrs-contract`

## Context

After seven direction rounds the owner settled on the page structure of [benshih.design](https://www.benshih.design/): a friendly intro with inline company links, portal cards, a short statement, work grouped by year, "tap to explore" tiles, writing, testimonials, a letter to collaborators, and an About page with a journey, values, outside-of-work stories and education. The earlier home was four hand-built sections that could not be reordered or reused. The owner also wanted the site to feel like an app: a command menu, sheets, toasts, tactile presses and animated navigation. Kudos were tried and dropped as too much.

## Decision

- **Borrow the structure, never the words or the look.** Every block is ours: original fictional copy, our fonts, our tokens.
- **Blocks live in `components/blocks/`** and take content as props. A block with no content renders nothing, so no live page carries a placeholder section. Door cards whose target block is empty are hidden too.
- **All block content is in `content/site.ts`**, validated by budgets in `content/schema.ts`. The old `hero.metrics`, `hero.plates`, `approach` and `about.experience` fields are replaced by `intro`, `doors`, `statement`, `work`, `showcase`, `writing`, `testimonials`, `letter`, `journey`, `values`, `outside` and `education`.
- **A `/kit` page** renders every block and state from fixtures in `content/kit.ts`. It is `noindex`, not in the sitemap and not in the nav. It is the review surface for the library and for `pnpm shots`.
- **App-like primitives** are shared and theme-agnostic: `Sheet` (native `<dialog>`), `Toaster`, `CommandMenu` (Cmd+K or Ctrl+K), a `press` utility, and React `ViewTransition` for route changes (a case cover morphs into its case header; forward and back links slide).
- **Accessibility rules for the app layer:** shortcuts always use a modifier key (WCAG 2.1.4); dialogs are native `<dialog>` so focus is trapped and restored by the browser; every motion has a reduced-motion path; nothing is hidden without JavaScript.
- **No kudos, likes or visitor counts**, now or later. The site stays static apart from the password gate.

## Alternatives considered

- Keep the bespoke home sections and restyle them: faster once, but every layout change would mean new components.
- A third-party command palette (`cmdk`): a dependency for about 150 lines of code we can own and theme.
- Shared kudos backed by Redis: built into the plan, then dropped by the owner as too much.

## Consequences

- Home and About are compositions of blocks; reordering is a one-line change.
- The contract grows by `card`, `inline-pill`, `type-quote`, `press`, `sheet`, `--r-card`, `--r-sheet`, motion `press` and `sheet`, and six icons. Every theme must provide them.
- `SelectedWork`, `WorkCard`, `Approach` and `Hero` are retired.
- Phase 3 (the personal touch) fills the Showcase and Outside blocks with running, climbing, tango and DJ content.

## Related

- [design/directions/round-8/](../../design/directions/round-8/README.md), [0008](0008-design-language-layer.md), [0011](0011-dusk-theme.md), [content-guide.md](../content-guide.md).
