# Docs

Navigation hub. Each fact is defined in one place and linked from everywhere else.

## Start here

- [progress.md](progress.md): current status, last stopping point, next task. Read this first.
- [plan.md](plan.md): full scope, sequence and specs.
- [brief.md](brief.md): audience, goals, how strength shows, teaser philosophy.

## Decisions

- [decisions/](decisions/): Architecture Decision Records (ADRs). Use [0000-template.md](decisions/0000-template.md) for new ones.
  - [0001-stack.md](decisions/0001-stack.md): Next.js, Tailwind v4, Motion, Vercel.
  - [0002-style-direction.md](decisions/0002-style-direction.md): "Blueprint" style, Sora + Lato, Blueprint Cobalt, light and dark.
  - [0006-blueprint-v2-refinement.md](decisions/0006-blueprint-v2-refinement.md): frozen glass, dot lattice, drifting light, generous radii, slow motion, fidelity contract.
  - [0007-lucide-icons.md](decisions/0007-lucide-icons.md): Lucide icons at stroke 1.5.

## Design

- [../DESIGN.md](../DESIGN.md): the locked design system. Read it before any UI work.
- [../design/preview/blueprint.html](../design/preview/blueprint.html): the reference implementation and fidelity target ([static render](../design/preview/blueprint.png)).
- [../design/directions/](../design/directions/README.md): concept rounds 1 to 3.

## Planned

These files are created when their todo is reached:

- `architecture.md`: routes, rendering, gating flow, content pipeline.
- `content-guide.md`: writing cases within budgets, image specs, swapping placeholders.
- `operations.md`: env vars, Vercel deploy, Firewall rule, rotating the password.
- ADRs 0003 to 0005: teaser depth and content budgets, password gating, image-first design workflow.

## Related

- [../AGENTS.md](../AGENTS.md): agent entry point and hard rules.
- [../README.md](../README.md): user-facing overview.
