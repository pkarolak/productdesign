<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

Instructions for any coding agent (Cursor, Claude Code, Codex, Gemini, others) working in this repo. Read this file fully before doing anything.

## What this is

A reusable portfolio template for a product designer. It showcases 4 case studies at teaser depth: anyone gets the bottom line in about 30 seconds, and the full story is told in person. Case studies are password gated. The site is built with Next.js and hosted on Vercel. The audience is design leaders, hiring managers and cross-functional peers. The goal is to showcase senior-level strength through evidence, never through claims.

## Where we are

- Current status, the last stopping point and the next task: [docs/progress.md](docs/progress.md). **Read it first.**
- Full scope and sequence: [docs/plan.md](docs/plan.md).
- Decisions and their reasons: [docs/decisions/](docs/decisions/).
- Docs index: [docs/README.md](docs/README.md).

## Session protocol

1. **Start:** read `docs/progress.md`, then the parts of `docs/plan.md` that relate to the next task.
2. **Work:** do one todo at a time, using the todo IDs from `docs/progress.md`.
3. **End of every todo:**
   - Add a new entry at the top of `docs/progress.md` and tick the checklist.
   - Add an ADR in `docs/decisions/` if you made or changed a decision.
   - Commit, then push to `origin main`.
4. If you change scope, update `docs/plan.md` in the same commit.

## Repo

- Remote `origin` is `https://github.com/pkarolak/productdesign.git` (private). Work on branch `main`.
- Commit messages use conventional commits with a scope: `feat(case): metrics band`, `docs(adr): 0004 password gating`, `design(directions): phase 0 concepts`.
- Make one commit per completed todo and push right away.
- Never commit secrets. `CASE_PASSWORD` and `AUTH_SECRET` live in Vercel env settings and in a local `.env.local`. `.env.example` lists names only.

## Commands

```bash
pnpm install
pnpm dev                  # local dev server (needs .env.local for unlocking, see docs/operations.md)
pnpm build                # theme:check, then production build; fails if content breaks budgets
pnpm start                # serve the production build
pnpm lint
pnpm typecheck            # next typegen + tsc
pnpm theme:check          # the active design language honours themes/contract.json
pnpm theme:new <name>     # fork the active design language into themes/<name>/
pnpm theme:use <name>     # switch the active design language
pnpm docs:check           # markdown link check over AGENTS.md, README.md, DESIGN.md, docs/
pnpm shots                # Playwright screenshots into design/shots/ against a running server (SHOTS_URL)
```

Shell note: in the maintainer's zsh, `grep` is aliased to `rg`. Do not pipe `pnpm build` into `grep -E`; a failing pipe can leave a build running in the background that overwrites `.next` under a running server.

## Skills

Design skills live in `.agents/skills/` and are pinned by `skills-lock.json`. Reinstall with `npx skills add Leonxlnx/taste-skill`. Load them by reading the `SKILL.md` before the matching work:

- `design-taste-frontend`: before any UI work, and run its final pre-flight checklist before calling UI done.
- `imagegen-frontend-web`, `image-to-code`: design references are generated as images first, one image per section, then analysed, then coded.
- `stitch-design-taste`: for writing and updating `DESIGN.md`.
- `high-end-visual-design`: the style direction skill for "Blueprint" (double-bezel frames, pill nav, motion), as named in `DESIGN.md` and ADR 0002.
- `full-output-enforcement`: no stubs, no placeholder components, no truncated files.

## Hard rules

- **Design language layer ([docs/theming.md](docs/theming.md), ADR 0008):**
  - Every visual value lives in `themes/<name>/` (active: `dusk`; `blueprint` stays switchable). Components use only contract names from `themes/contract.json` (`surface`, `type-h2`, `text-ink-2`, `rounded-frame`, `ease-slow`, ...).
  - Import theme modules only via `@theme/*`, never `@/themes/blueprint/...`. Never use a theme's private names (`bp-*`, `--glass-*`, `--orb-*`, `--dot`) outside its folder.
  - No free colors, radii, shadows, fonts or easings in components; Tailwind's defaults are reset on purpose. Need something new? Add it to the theme and the contract first.
  - `pnpm theme:check` enforces this and runs before every build.
- **Design:**
  - Read `DESIGN.md` before any UI work.
 - Fidelity targets per theme: Dusk follows `design/directions/round-8/`; Blueprint follows `design/preview/blueprint.html` (its tokens, glass, dots, orbs and motion verbatim).
 - Run the `DESIGN.md` checklist and the `pnpm shots` comparison before marking any UI todo done.
 - One accent and one radius system per theme (Dusk: pale amber; Blueprint: Cobalt). Use only theme tokens, no free colors. The playing-card colours (`card-face`, `card-red`, `card-ink`) are only for card faces and suit glyphs (ADR 0013, 0015, 0018), never text accents or buttons.
 - Every component must work in both light and dark modes, and under both themes.
 - Fonts per theme: Dusk uses Geist; Blueprint uses Sora and Lato (ADR 0011). Never Inter, never a serif or mono font, and no handwritten font except Caveat through `type-hand` for doodle captions (ADR 0014).
 - Page sections are blocks in `components/blocks/` (ADR 0010). A block with no content renders nothing; review blocks on `/kit`.
 - No kudos, likes or visitor counts.
- **Copy:**
  - No em-dashes in UI copy.
  - Never frame site copy around career level, titles or job moves. The work speaks.
  - No "elevate / seamless / passionate"-style filler, no Acme or Jane Doe placeholders.
  - The placeholder designer name is **Patryk Karolak**. Companies and projects stay fictional.
- **Content budgets:**
  - Enforced by `content/schema.ts`. If content does not fit, cut it, never raise the limit.
  - The teaser depth is intentional (ADR 0003).
- **Gating:**
  - Artifacts for protected cases go only under `public/media/protected/<slug>/`.
  - Nothing from a protected case may appear in locked page HTML, OG images or the sitemap (ADR 0004).
- **Code comments:** only for constraints the code cannot show. Explanations belong in `docs/`.

## Map

```
AGENTS.md            this file
CLAUDE.md            pointer to this file
DESIGN.md            spec of the "Blueprint" design language; read before any UI work
docs/                plan, progress, brief, decisions, architecture, theming, content guide, operations
design/directions/   Phase 0 style direction concepts
design/preview/      reference implementation (fidelity target)
design/shots/        pnpm shots output (viewport captures; full-page ones are gitignored)
.agents/skills/      design skills (pinned)
app/                 routes: /, /about, /work/[slug], /locked/[slug], OG images, sitemap, robots
components/          ui/ primitives, motion/, media/ (asset kinds), site/ (nav, contact, footer), home/, case/
content/             schema.ts (budgets), site.ts, projects/ (one file per case)
themes/              contract.json + contract.ts, and one folder per design language (blueprint/)
lib/                 access.ts (signing, compare), og.tsx, cn.ts
proxy.ts             password gating for /work/* and /media/protected/*
public/              projects/ (public covers), media/protected/ (gated artifacts), about/
scripts/             theme-check, theme-new, theme-use, shots
```
