# 0007: Lucide icons

- **Status:** Accepted
- **Date:** 2026-09-30
- **Todo:** direction-lock

## Context

ADR 0001 and DESIGN.md v2 specified Phosphor icons. The user asked to use [Lucide](https://lucide.dev/icons/) instead.

## Decision

- Use `lucide-react`, with `strokeWidth={1.5}` on every icon, 18px in UI and 20px in the nav.
- A single `<Icon />` wrapper enforces size and stroke.
- The allowed set is listed in [DESIGN.md](../../DESIGN.md), section 7.
- The reference `design/preview/blueprint.html` uses the Lucide UMD build with the same stroke width.

## Alternatives considered

- **Phosphor light:** the previous choice. Replaced at the user's request.
- **Lucide at the default stroke of 2:** too heavy next to Sora 300 and 400.

## Consequences

- The taste skills discourage Lucide by default but explicitly allow it when the user asks. This ADR is that record.
- The stroke of 1.5 keeps the icons consistent with the light, elegant type.

## Related

- [0001-stack.md](0001-stack.md), whose icon choice this supersedes.
- [0006-blueprint-v2-refinement.md](0006-blueprint-v2-refinement.md)
