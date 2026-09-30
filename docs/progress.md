# Progress

Status log and handoff. Newest entry on top. Every todo ends with an entry here, then a commit and a push.

## Checklist

- [x] `repo-setup`: branch `main`, `.gitignore`, origin, first push
- [x] `docs-foundation`: AGENTS.md, CLAUDE.md, docs hub, plan, progress, brief, ADR 0000 + 0001
- [x] `direction-concepts`: 2 reference images per style direction in `design/directions/`
- [x] `direction-lock`: user picks, `DESIGN.md` + ADR 0002
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

## 2026-09-30: direction-lock

- **Agent:** Cursor agent (Claude)
- **Todos:** `direction-lock`
- **Done:**
  - The user approved round 3 and picked **Sora**, then rejected the teal accent and asked for a modern, professional color that also works in dark mode.
  - Picked **Blueprint Cobalt** (`#2F5BEA` light, `#7A9BFF` dark).
  - Verified it in real CSS with the pill nav, the isometric plates, and the grid and glow, in both themes: `design/preview/accent.html` / `.png`.
  - Wrote `DESIGN.md` (locked design system) and ADR 0002.
  - **Scope change:** dark mode is now in (system default, plus a toggle in the nav, via `next-themes`). Removed it from out of scope in `docs/plan.md`.
- **In progress:** nothing.
- **Next:** `section-refs`.
  - Generate references with the cobalt palette and the name Patryk Karolak.
  - Cover: selected work (bento), approach, contact and footer, the locked case page, and About, in light mode; plus one dark-mode case page.
  - Save them to `design/refs/`, then analyse them per `image-to-code` before `scaffold`.
- **Open questions:** none.

## 2026-09-30: direction-concepts, round 3

- **Agent:** Cursor agent (Claude)
- **Todos:** `direction-concepts`
- **Done:**
  - The user favoured G Blueprint and asked for:
    - a more modern look;
    - room for more asset types;
    - the floating pill nav back, mashed up with Blueprint;
    - Lato as the body font plus a matching heading font.
  - Generated round 3 (hero, selected work with mixed assets, case header, artifacts) into `design/directions/round-3/`.
  - Rendered a real font specimen (`design/fonts/specimen.html` / `.png`) with Sora, Plus Jakarta Sans, Bricolage Grotesque and Instrument Sans over Lato. It also previews the blueprint grid and glow in real CSS.
  - Added artifact and cover `kind`s to the content model in `docs/plan.md`.
- **In progress:** waiting for the user to approve round 3 and pick the heading font.
- **Next:** `direction-lock`.
  - Write `DESIGN.md`: Blueprint refined, pill nav, double-bezel media, isometric grid and glow tokens, Lato plus the chosen heading font, teal accent.
  - Write ADR 0002, recording rounds 1 to 3.
- **Open questions:** heading font (recommended: Sora), and any tweaks to round 3.

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
- **Also decided:** the placeholder designer name is **Patryk Karolak**, replacing Maren Kowal. It applies to all content and references from now on; the existing concept images were not regenerated.
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
