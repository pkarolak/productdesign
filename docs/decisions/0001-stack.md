# 0001: Stack

- **Status:** Accepted
- **Date:** 2026-09-30
- **Todo:** docs-foundation

## Context

The site is a static-first portfolio with rich motion, password-gated pages and shareable link previews. It will be hosted on Vercel. It must stay easy for another agent or person to pick up.

## Decision

- **Framework:** Next.js, latest stable via `create-next-app@latest`, with App Router, React Server Components by default, TypeScript strict and pnpm.
- **Styling:** Tailwind CSS v4 via `@tailwindcss/postcss`, with design tokens as CSS variables sourced from `DESIGN.md`.
- **Motion:** `motion/react`, only inside isolated `'use client'` leaf components. GSAP is added only if the chosen style direction needs pinned or scrubbed scroll (ADR 0002).
- **Fonts:** `next/font`, never Inter.
- **Icons:** `@phosphor-icons/react`, one weight globally. Superseded by ADR 0007 (Lucide).
- **Content:** typed modules in `content/`, validated by `zod` at build time (budgets in ADR 0003).
- **Images:** `next/image`; protected artifacts are the exception (ADR 0004).
- **Gating:** Next.js request interception (`proxy.ts`), `jose`-signed cookie, Server Action unlock (ADR 0004).
- **Hosting:** Vercel, deployed from GitHub `main`, with `@vercel/analytics` and `@vercel/speed-insights`.
- **Rendering:** all pages statically generated.

## Alternatives considered

- **Astro:** excellent for static sites, but the React motion ecosystem and native Vercel and Next.js gating primitives favour Next.js.
- **A CMS (Sanity, Contentful):** too much overhead for 4 cases. Typed files are easier to hand off and version, and a CMS can be added later.
- **MDX case studies:** they invite long-form writing, which works against teaser depth. Structured fields enforce the format.
- **A component library skin (shadcn defaults, MUI):** it would look templated. The UI is project-owned instead.

## Consequences

- Build-time validation keeps content honest.
- Everything is static, so it is fast and cheap on Vercel.
- The gating logic runs at the edge, so the pages themselves stay static.
- Motion code must stay in client leaves, or server rendering benefits are lost.

## Related

- [../plan.md](../plan.md), section "Tech stack".
- [0000-template.md](0000-template.md).
