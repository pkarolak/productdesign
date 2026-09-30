# Docs

Navigation hub. Each fact is defined in one place and linked from everywhere else.

## Start here

- [progress.md](progress.md): current status, last stopping point, next task. Read this first.
- [plan.md](plan.md): full scope, sequence and specs.
- [brief.md](brief.md): audience, goals, how strength shows, teaser philosophy.

## Guides

- [architecture.md](architecture.md): layers, routes, gating flow, components, scripts.
- [theming.md](theming.md): changing the design language.
- [content-guide.md](content-guide.md): writing cases within budgets, asset kinds, image specs, swapping placeholders.
- [operations.md](operations.md): env vars, local commands, Vercel deploy, Firewall rule, rotating the password.
- [ux-audit.md](ux-audit.md): UX, accessibility and heuristics audit of v1, with the prioritized fix list.

## Decisions

- [decisions/](decisions/): Architecture Decision Records (ADRs). Use [0000-template.md](decisions/0000-template.md) for new ones.
  - [0001-stack.md](decisions/0001-stack.md): Next.js, Tailwind v4, Motion, Vercel.
  - [0002-style-direction.md](decisions/0002-style-direction.md): "Blueprint" style, Sora + Lato, Blueprint Cobalt, light and dark.
  - [0003-teaser-depth-and-content-budgets.md](decisions/0003-teaser-depth-and-content-budgets.md): zod-enforced reading budgets.
  - [0004-password-gating.md](decisions/0004-password-gating.md): shared password, proxy rewrite, signed cookie, protected media.
  - [0006-blueprint-v2-refinement.md](decisions/0006-blueprint-v2-refinement.md): frozen glass, dot lattice, drifting light, generous radii, slow motion, fidelity contract.
  - [0007-lucide-icons.md](decisions/0007-lucide-icons.md): Lucide icons at stroke 1.5.
  - [0008-design-language-layer.md](decisions/0008-design-language-layer.md): the design language is a swappable layer in `themes/`.
  - [0009-audit-fixes.md](decisions/0009-audit-fixes.md): design changes from the UX and accessibility audit.
  - 0005 (image-first design workflow) is reserved for `docs-final`.

## Design

- [../DESIGN.md](../DESIGN.md): the Blueprint design system. Read it before any UI work.
- [../design/preview/blueprint.html](../design/preview/blueprint.html): the reference implementation and fidelity target ([static render](../design/preview/blueprint.png)).
- [../design/shots/](../design/shots/): `pnpm shots` captures of the build, light and dark, desktop and mobile.
- [../design/directions/](../design/directions/README.md): concept rounds 1 to 3.

## Related

- [../AGENTS.md](../AGENTS.md): agent entry point and hard rules.
- [../README.md](../README.md): user-facing overview.
