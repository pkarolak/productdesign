# Progress

Status log and handoff. Newest entry on top. Every todo ends with an entry here, then a commit and a push.

## Checklist

- [x] `repo-setup`: branch `main`, `.gitignore`, origin, first push
- [x] `docs-foundation`: AGENTS.md, CLAUDE.md, docs hub, plan, progress, brief, ADR 0000 + 0001
- [ ] `direction-concepts`: 2 reference images per style direction in `design/directions/`
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
