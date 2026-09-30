# Progress

Status log and handoff. Newest entry on top. Every todo ends with an entry here, then a commit and a push.

## Checklist

- [x] `repo-setup`: branch `main`, `.gitignore`, origin, first push
- [x] `docs-foundation`: AGENTS.md, CLAUDE.md, docs hub, plan, progress, brief, ADR 0000 + 0001
- [x] `direction-concepts`: 2 reference images per style direction in `design/directions/`
- [ ] `direction-lock`: user picks, `DESIGN.md` + ADR 0002
- [ ] `section-refs`: remaining section references for the chosen direction in `design/refs/`
- [ ] `scaffold`: Next.js + Tailwind v4 + Motion + Phosphor + zod, tokens from `DESIGN.md`, Vercel import
- [ ] `content-model`: zod schema with budgets, `site.ts`, 4 placeholder projects, ADR 0003
- [ ] `shell`: layout, nav, footer, motion primitives, texture layer
- [ ] `home`: hero, selected work, approach, contact
- [ ] `case-pages`: `/work/[slug]` full case layout
- [ ] `gating`: unlock, signed cookie, proxy, locked page, protected media, ADR 0004
- [ ] `about`: `/about`
- [ ] `assets`: covers and artifacts for all 4 cases
- [ ] `share-seo`: metadata, OG images, sitemap, robots, analytics
- [ ] `qa`: pre-flight, a11y, breakpoints, Lighthouse, gating tests, README
- [ ] `docs-final`: architecture, content guide, operations, ADR 0005, docs check, handoff entry

---

## 2026-09-30: direction-concepts, round 2

- **Agent:** Cursor agent (Claude)
- **Todos:** `direction-concepts`
- **Done:**
  - Round 1 (A to E) was rejected by the user.
  - The new brief is clean and modern, with beautiful whitespace, subtle gradients and a subtle isometric grid in the backgrounds.
  - Moved round 1 to `design/directions/round-1/`.
  - Generated round 2 (F Mist, G Blueprint, H Daylight, I Ink) into `design/directions/round-2/`, each with a README.
- **In progress:** waiting for the user to pick from round 2.
- **Next:** `direction-lock`.
  - Write `DESIGN.md`. The isometric grid and the gradient glow become first-class tokens and background components.
  - Write ADR 0002, recording both rounds and the brief change.
- **Open questions:** which of F, G, H or I, plus any cross-direction tweak.

## 2026-09-30: direction-concepts

- **Agent:** Cursor agent (Claude)
- **Todos:** `direction-concepts`
- **Done:**
  - Generated 10 concept images (5 directions, each with a hero and a metrics block) into `design/directions/<id>/`.
  - Wrote [design/directions/README.md](../design/directions/README.md) with side-by-side notes.
- **In progress:** waiting for the user to pick a direction.
- **Next:** `direction-lock`.
  - Once the user picks, write `DESIGN.md` using `stitch-design-taste`.
  - Write ADR 0002 with the chosen direction, the rejected ones and the reasons.
  - Then `section-refs`.
- **Open questions:** which direction (A to E), and whether any cross-direction tweak is wanted.

## 2026-09-30: docs-foundation

- **Agent:** Cursor agent (Claude)
- **Todos:** `repo-setup`, `docs-foundation`
- **Done:**
  - Renamed the branch to `main`, added `.gitignore`, added `origin`, and pushed the taste skills (`81a5777`).
  - Created `AGENTS.md`, `CLAUDE.md`, `README.md`, `docs/README.md`, `docs/plan.md`, `docs/brief.md`, ADR 0000 and ADR 0001.
- **In progress:** nothing.
- **Next:** `direction-concepts`.
  - Generate 2 images (home hero, case metrics block) for each of the 5 directions (A to E, specified in [plan.md](plan.md), "Phase 0").
  - Save them as `design/directions/<id>/hero.png` and `metrics.png`.
  - Present them to the user and wait for their pick.
- **Open questions:** none.
