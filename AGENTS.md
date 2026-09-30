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

The app is not scaffolded yet (see progress). After the `scaffold` todo, these will exist:

```bash
pnpm install
pnpm dev             # local dev server
pnpm build           # production build; fails if content breaks budgets
pnpm lint
pnpm typecheck
pnpm docs:check      # markdown link check over AGENTS.md, README.md, docs/
pnpm shots           # Playwright screenshots into design/shots/ (light and dark, desktop and mobile)
```

## Skills

Design skills live in `.agents/skills/` and are pinned by `skills-lock.json`. Reinstall with `npx skills add Leonxlnx/taste-skill`. Load them by reading the `SKILL.md` before the matching work:

- `design-taste-frontend`: before any UI work, and run its final pre-flight checklist before calling UI done.
- `imagegen-frontend-web`, `image-to-code`: design references are generated as images first, one image per section, then analysed, then coded.
- `stitch-design-taste`: for writing and updating `DESIGN.md`.
- `high-end-visual-design`: the style direction skill for "Blueprint" (double-bezel frames, pill nav, motion), as named in `DESIGN.md` and ADR 0002.
- `full-output-enforcement`: no stubs, no placeholder components, no truncated files.

## Hard rules

- **Design:**
  - Read `DESIGN.md` before any UI work.
  - `design/preview/blueprint.html` is the fidelity target. Copy its token values, glass recipe, dot lattice, orbs and motion verbatim.
  - Run the `DESIGN.md` section 11 checklist and the `pnpm shots` comparison before marking any UI todo done.
  - One accent (Blueprint Cobalt) and one radius system across the whole site. Use only `DESIGN.md` tokens, no free colors.
  - Every component must work in both light and dark themes.
  - Fonts are Sora for headings and Lato for everything else. Never Inter, never a serif or mono font.
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
DESIGN.md            locked design system "Blueprint"; read before any UI work
docs/                plan, progress, brief, decisions, architecture, guides
design/directions/   Phase 0 style direction concepts
design/refs/         section references for the chosen direction
.agents/skills/      design skills (pinned)
app/, components/, content/, lib/, public/   the app (after scaffold)
```
