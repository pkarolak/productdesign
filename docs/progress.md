# Progress

Status log and handoff. Newest entry on top. Every todo ends with an entry here, then a commit and a push.

## Checklist

- [x] `repo-setup`: branch `main`, `.gitignore`, origin, first push
- [x] `docs-foundation`: AGENTS.md, CLAUDE.md, docs hub, plan, progress, brief, ADR 0000 + 0001
- [x] `direction-concepts`: 2 reference images per style direction in `design/directions/`
- [x] `direction-lock`: user picks, `DESIGN.md` + ADR 0002
- [x] `section-refs`: skipped by decision; the user said "let's build" and the build was compared against `design/preview/blueprint.html` plus `pnpm shots` instead
- [x] `scaffold`: Next.js 16 + Tailwind v4 + Motion + lucide-react + zod + next-themes + Playwright, design-language layer (ADR 0008). Vercel import still to do by the user (see operations.md)
- [x] `content-model`: zod schema with budgets, `site.ts`, 4 placeholder projects, ADR 0003
- [x] `shell`: layout, nav, footer, contact, motion primitives, atmosphere layer
- [x] `home`: hero, selected work, approach, contact
- [x] `case-pages`: `/work/[slug]` full case layout
- [x] `gating`: unlock, signed cookie, proxy, locked page, protected media, ADR 0004
- [x] `about`: `/about`
- [x] `assets`: covers and artifacts for all 4 cases
- [x] `share-seo`: metadata, OG images, sitemap, robots, analytics
- [ ] `qa`: done: shots gate, overflow check, gating leak tests, README. Left: taste pre-flight write-up, keyboard and screen reader pass, Lighthouse on a Vercel preview
- [ ] `docs-final`: done: architecture, theming, content guide, operations. Left: ADR 0005, `pnpm docs:check`, final handoff entry

Round 8 (block library and Dusk):

- [x] `dusk-comps`, `adrs-contract`, `dusk-theme`
- [x] `content-schema`: block schemas with budgets, `site.ts` rewritten, `content/kit.ts`
- [x] `blocks`: `components/blocks/`, `lib/blocks.ts`
- [x] `interactions`: Modal, Toaster, CommandMenu, `press`, page transitions and cover morph
- [x] `kit-page`: `/kit`
- [x] `compose`: Home and About from blocks, contact per page
- [x] `verify-docs`: checks under both themes, axe, interactions, shots, docs
- [ ] Phase 3, the personal touch: hobbies in the Showcase, personal copy. No kudos.

---

## 2026-09-30: a quieter deck in fileteado inks

- **Agent:** Cursor agent (Claude)
- **Done:** per the owner's feedback ([ADR 0016](decisions/0016-quieter-deck-fileteado-inks.md)): the ace frame is down to corner scrolls and a double filete line, the joker is a bandoneón alone (title above, blurb below), and the back is a small tango medallion on a plain field. Six new images with new file names. Pips are painted in fileteado inks (vermilion, gold, celeste, green) with a gold outline and a glint (`FiletePip`); titles use `filete-letter`. New contract variables `--card-gold`, `--card-green`, `--card-sky` and `--card-glint`.
- **Verified:** lint, typecheck, theme:check (dusk and blueprint), build; deal filmstrip; light and dark at 1440, 800 and mobile; axe zero violations; no overflow.

## 2026-09-30: a Fileteado Porteño deck

- **Agent:** Cursor agent (Claude)
- **Done:** the hand is a Fileteado Porteño deck ([ADR 0015](decisions/0015-fileteado-deck.md)): an ornamental ace frame, Aníbal Troilo with his bandoneón as the joker and a tango couple on the back, generated as one consistent set in black and cream (`public/cards/`, `site.deck`). Cards are black in dark mode and cream in light mode (`--card-face`, `--card-red` and `--card-ink` now per mode; `--card-black` renamed). The stack lands face down showing the tango backs and each card flips face up as it is dealt.
- **Verified:** lint, typecheck, theme:check (dusk and blueprint), build; deal filmstrip; light and dark at 1440, 800 and mobile; axe zero violations; no overflow.

## 2026-09-30: calmer hero alignment

- **Agent:** Cursor agent (Claude)
- **Done:** the hero photo is no longer a tilted card floating beside the text. It is an upright portrait (168px, 212px from `lg`) that spans the text block exactly: its top meets the cap height of the greeting and its bottom the last line of the intro, with a hairline edge and soft shadow.
- **Verified:** measured photo, heading and intro boxes at 1440; 800 and mobile screenshots.

## 2026-09-30: the hand deals out of a stack

- **Agent:** Cursor agent (Claude)
- **Done:** when the hand scrolls into view the cards land as one loose pile (a hair off square each), hold for a beat, then spread left to right into the fan on desktop, or out of the first card's spot into the swipe row on mobile, as if swept across a table. Positions are measured, so it works at any width. Hover lift starts once the deal settles. The handwritten caption fades in and the arrow draws after the last card lands. New motion token `deal` in the contract, Dusk and Blueprint. Reduced motion shows the fan at once.
- **Verified:** lint, typecheck, theme:check, build; filmstrips of the deal on desktop and mobile; hover after the deal; reduced motion; axe zero violations; no overflow at 1440, 1024 and mobile.

## 2026-09-30: a handwritten caption under the hand

- **Agent:** Cursor agent (Claude)
- **Done:** new optional `site.handNote`, "Pick a card to see some tricks", rendered under the hand in Caveat (`type-hand`, a new contract utility and `--theme-font-hand` in both themes) with an accent doodle arrow that loops and points at the cards and draws itself on scroll. The font rule gets a scoped exception ([ADR 0014](decisions/0014-handwritten-doodle-caption.md)). Also fixed the centre pips shrinking when a title wraps at 1024.
- **Verified:** lint, typecheck, theme:check (dusk and blueprint), build; axe zero violations; light and dark, 1440, 1024 and mobile, no overflow.

## 2026-09-30: real playing cards

- **Agent:** Cursor agent (Claude)
- **Done:** the hand cards look like a printed deck: ivory paper face with a faint grain, red hearts and diamonds, black spades and clubs, rank and pip in the corners (upside down bottom right), one centre pip with the title and line below, an oversized ace of spades, and a joker with JOKER corners in black and red and a harlequin hat. 5:7 on every screen. Contract: `--suit-*` replaced by `--card-face`, `--card-red`, `--card-black` and the `playing-card` utility ([ADR 0013](decisions/0013-real-playing-cards.md)). Side projects covers and section heading glyphs follow the same inks.
- **Verified:** lint, typecheck, theme:check (dusk and blueprint), build; axe zero violations; light and dark, 1440, 1024 and mobile, no overflow.

## 2026-09-30: photo on the left and dictionary tooltips

- **Agent:** Cursor agent (Claude)
- **Done:** the hero photo card now sits left of the text from `md`. New `hero.glossary` (up to 3 entries, each term must appear in the tagline): the terms get a dotted accent underline and open a dictionary card (`components/ui/Definition.tsx`) with headword, phonetic, kind, numbered senses and origin. It opens on hover, keyboard focus or tap, closes on leave, blur, Escape or a second tap, flips above when there is no room below and is click-through so neighbouring terms stay reachable.
- **Verified:** lint, typecheck, theme:check (dusk and blueprint), build; axe zero violations with the card open; hover, focus, Escape and mobile tap scripted in light and dark; no overflow on mobile.

## 2026-09-30: four aces and a joker

- **Agent:** Cursor agent (Claude)
- **Done:** the first four hand cards are aces (A plus suit in the corners), each in its own suit colour; My world is the joker: JOKER spelled down the corners, a jester hat as the emblem and a coral, lilac and sky blend. The `star` suit became `joker`.
- **Verified:** lint, typecheck, theme:check, build; axe zero violations; light and dark.

## 2026-09-30: the owner's photo in nav and hero

- **Agent:** Cursor agent (Claude)
- **Done:** new optional `site.avatar` (square image, `public/about/patryk.jpg`). The nav shows it as a 32px circle before the name; the intro hero shows it as a tilted photo card to the right from `md` (straightens on hover) and as a 72px circle above the greeting on mobile.
- **Verified:** lint, typecheck, theme:check, build; axe zero violations; desktop light and dark, tablet and mobile, no overflow.

## 2026-09-30: a hand of section cards

- **Agent:** Cursor agent (Claude)
- **Done:** the door tiles became `CardHand`, five playing cards (Hi!, Core work, Side projects, Teaching, My world) fanned like a hand from `lg`, with lift and spread on hover or focus, and a swipe row on narrow screens. New suit tokens `--suit-1` to `--suit-5` and `--suit-ink` in the contract, Dusk and Blueprint ([ADR 0012](decisions/0012-card-hand-and-suits.md)). Home gains Side projects (showcase, image optional, suit panels), a new Teaching block and My world (moved from About, with climbing, tango and DJing). Section headings wear their card's suit. Command menu lists the new sections.
- **Verified:** lint, typecheck, theme:check, build; axe zero violations; hover spread, 1024px fit, mobile swipe row, no overflow, light and dark.
- **Next:** real side projects and teaching details from the owner; running did not fit My world's three items.

## 2026-09-30: nav tools moved to the corner

- **Agent:** Cursor agent (Claude)
- **Done:** the command menu button and theme toggle left the centre pill for a quiet cluster fixed top right (desktop only, Ink 3, aligned to the pill's height). The pill keeps the name, Work, About and Get in touch. Mobile unchanged: the toggle stays in the menu. `ThemeToggle` gains a `quiet` tone.

## 2026-09-30: locked page with a watching lock

- **Agent:** Cursor agent (Claude)
- **Done:** the locked teaser is now a centred card with `LockFace`, a lock whose keyhole eyes follow the pointer, look at the password field on focus, squint while typing, blink, and frown and shake on a wrong password (`UnlockForm` dispatches `unlock:failed`). Reduced motion: eyes jump instead of springing, no blink or shake. Colours are contract tokens only, so it works in both themes. The bottom line stays public below the card; cover and lead metric removed from this page.
- **Verified:** lint, typecheck, theme:check, build; axe zero violations; scripted pointer tracking, wrong password, and unlock; light, dark and mobile with no overflow.

## 2026-09-30: block library built and composed (`content-schema`, `blocks`, `interactions`, `kit-page`, `compose`, `verify-docs`)

- **Agent:** Cursor agent (Claude)
- **Done:**
  - Content: one schema per block with word budgets; `hero.lede`, `hero.metrics`, `hero.plates`, `approach`, `about.bio` and `about.experience` removed. `site.ts` fills hero, doors, statement, testimonials, letter, story, education, journey, values and outside; showcase and writing stay empty on the live site. `content/kit.ts` fills them for `/kit`.
  - Blocks in `components/blocks/`: IntroHero, DoorCards, Statement, WorkTimeline, Showcase, WritingList, Testimonials, LetterCard, StoryHeader, Education, Journey, Values, OutsideWork, plus `BlockHeader` and the `HomeBlocks` and `AboutBlocks` compositions. Empty blocks render nothing; doors into empty blocks are hidden.
  - Interactions: `Modal` (native dialog, sheet or palette, optional morph), `Toaster`, `CommandMenu` (Cmd K or Ctrl K, go to, copy email, switch theme, links), `CopyEmail` as a button with a toast, `press` on tiles and buttons, `PageTransition` and `CoverMorph` on every page and case cover, nav gets a command button and a fixed view-transition name.
  - `/kit` shows every block and primitive, `noindex`, not in the sitemap or nav. Old `components/home/` removed; `Contact` moved from the layout into each page.
- **Verified:** `theme:check`, `typecheck`, `lint` and `build` under Dusk and Blueprint. axe zero violations on 7 pages (including `/kit`) in light and dark, and inside the open command menu and sheet. Scripted checks: Cmd K opens with focus in the input, filter and Enter navigate, Escape closes and returns focus, theme switch and copy email toast, showcase sheet opens and closes. `pnpm shots` (now with `/kit`, theme set through `localStorage`) with no overflow; compared against round 8.
- **Left:** the nav is still Blueprint's pill layout in Dusk (the comp shows a full-width bar); nav text links are 23px tall, as before.
- **Next:** Phase 3, the personal touch.

## 2026-09-30: Dusk theme (`dusk-theme`)

- **Agent:** Cursor agent (Claude)
- **Done:** `themes/dusk/` forked from Blueprint and rewritten: dark and light tokens, Geist, calm quick motion, a faint vignette, a flat stacked `Signature`, a layered-bar `Diagram`, `meta.defaultMode: "dark"`, view-transition CSS. `ThemeProvider` reads the default mode and wraps motion in `MotionConfig reducedMotion="user"`. Active theme switched to Dusk.
- **Next:** `content-schema`.

## 2026-09-30: block library and Dusk, decisions and contract (`adrs-contract`)

- **Agent:** Cursor agent (Claude)
- **Done:** rounds 5 to 7 explored and rejected (too hobby-led, too busy, kudos too much). Round 8 approved: a block library modelled on benshih.design's structure, styled as Dusk (subtle dark, Geist, pale amber). ADR [0010](decisions/0010-block-library.md) and [0011](decisions/0011-dusk-theme.md). Contract gains `card`, `inline-pill`, `type-quote`, `press`, `sheet`, `--r-card`, `--r-sheet`, motion `press` and `sheet`, six icons and `meta.defaultMode`; Blueprint implements them, plus the view-transition CSS. AGENTS and DESIGN rules scoped per theme.
- **Next:** `dusk-theme`.

## 2026-09-30: Milonga direction proposed (round 4)

- **Agent:** Cursor agent (Claude)
- **Done:** studied benshih.design and three besler.pl pages; the user chose a new warm theme alongside Blueprint, loosened four rules (multiple accents, a handwritten accent font, chunkier display type, snappier motion), and wants personality around the work with crisp case pages. Generated six section comps: [design/directions/round-4-milonga/](../design/directions/round-4-milonga/README.md).
- **Next:** user feedback on the comps, then ADR 0010, `themes/milonga/`, and the new theme-agnostic content (off the clock, now playing, cortinas).

## 2026-09-30: audit fixes (High and Medium)

- **Agent:** Cursor agent (Claude)
- **Todo:** `qa`
- **Done:** fixed all 6 High and 11 Medium findings from [ux-audit.md](ux-audit.md); decisions in [ADR 0009](decisions/0009-audit-fixes.md), values in `DESIGN.md`.
  - Contrast: Ink 3 darkened (light) and lightened (dark); nav and mobile sheet on strong glass.
  - Gating made visible: "Password protected" chips, Selected work intro says how many are gated, "Unlocked · Lock cases" in the case header, locked page links to open cases, "Checking" while unlocking.
  - One primary button (compact size in the nav); card arrows always visible; chips are status only; numbered "Ask me about"; labelled Partners and Scope; "Email me" plus a copy button in the contact block.
  - Mobile menu: focus in, Escape out, page behind inert. Content is visible without JavaScript; reveals start sooner.
  - Content: 88% (14 of 16) fixed, hero metrics from three cases, hero plates from two other cases.
  - Craft: top-left crops, dark-mode dim for light screenshots, diagram fits its frame, before/after labels, annotation re-placed.
- **Verified:** axe zero violations on 6 pages in light and dark, mobile menu keyboard test, no-JS render, no mobile overflow, `pnpm shots`.
- **Next:** Low findings (L1 to L7), Lighthouse on a Vercel preview, ADR 0005.

## 2026-09-30: UX and accessibility audit

- **Agent:** Cursor agent (Claude)
- **Todo:** `qa` (audit part)
- **Done:** audited every page in both themes and both viewports with axe-core, a keyboard trace, target sizes, a no-JS check and a component review. Findings with severity, heuristic and fix: [ux-audit.md](ux-audit.md). 6 High, 11 Medium, 7 Low.
- **Next:** fix in the order the audit suggests (H2, H1, H3, H4 first), re-run `pnpm shots` and axe.

## 2026-09-30: v1 build with a swappable design language

- **Agent:** Cursor agent (Claude)
- **Todos:** `scaffold`, `content-model`, `shell`, `home`, `case-pages`, `gating`, `about`, `assets`, `share-seo`, most of `qa` and `docs-final`. `section-refs` skipped by decision.
- **Done:**
  - The user asked to build with Blueprint as the starting design, and to make changing the design language easy later. Built the design-language layer first ([ADR 0008](decisions/0008-design-language-layer.md), [theming.md](theming.md)):
    - `themes/blueprint/` holds every visual value (`theme.css`), fonts, motion, icons, OG/meta colors, and the signature components (`Atmosphere`, `Signature`, `Diagram`).
    - `themes/contract.json` and `contract.ts` define what any theme must provide; components use only those names.
    - `pnpm theme:check` (runs before every build), `pnpm theme:new`, `pnpm theme:use`.
    - Drilled a swap end to end: fork, change the accent, switch, build, confirm the compiled CSS, switch back.
  - Scaffolded Next.js 16.3 (App Router, Turbopack, `proxy.ts`), Tailwind 4 with the default palette, radii, shadows, fonts and easings reset.
  - Content model with zod budgets and 4 fictional cases ([ADR 0003](decisions/0003-teaser-depth-and-content-budgets.md)).
  - Pages: home (hero, 4-cell bento, approach), full case, locked teaser, About, 404, plus the shared contact block and footer.
  - Password gating ([ADR 0004](decisions/0004-password-gating.md)). Verified: locked HTML and RSC payloads contain no case content, protected media return 401, unlock through the real form works, and the password is fingerprinted into the cookie so rotating it revokes access.
  - 11 generated placeholder images (UI screens, phone screens, photos); diagrams are drawn in code by the theme.
  - Metadata, OG images from `@theme/meta`, sitemap, robots, Vercel Analytics and Speed Insights.
  - `pnpm shots`: 20 captures (5 pages, light and dark, desktop and mobile), with a real unlock and an overflow check. All pass.
- **Fidelity comparison** (home hero vs `design/preview/blueprint.png`): glass, dot lattice, drifting light, radii, Sora weights, nav, button and metrics panel match. The plates now hold real screenshots instead of skeletons. Fixed during comparison: metric unit superscripts sat too high (Tailwind preflight `sup` offset), and a stray metric divider showed on desktop.
- **Design tweaks made during the build:**
  - The case bottom line is now `clamp(2rem, 3.2vw, 2.75rem)`, max 28ch (DESIGN.md section 3), so a 30-word bottom line fits in about four lines and the unlock form stays in the first viewport.
  - "Lock cases" lives on full protected case pages, not in the global footer (the static footer cannot know the HttpOnly cookie).
  - Every "Get in touch" goes to the shared `#contact` block rendered on every page.
- **Next:**
  - User: import the repo in Vercel, set `CASE_PASSWORD` and `AUTH_SECRET`, add the Firewall rule ([operations.md](operations.md)).
  - `qa`: taste pre-flight write-up, keyboard and screen reader pass, Lighthouse on the preview URL.
  - `docs-final`: ADR 0005, `pnpm docs:check`.
- **Open questions:** none. Local dev password is in the gitignored `.env.local`.

## 2026-09-30: icons switched to Lucide

- **Agent:** Cursor agent (Claude)
- **Todos:** `direction-lock` (amendment)
- **Done:**
  - The user asked for [Lucide](https://lucide.dev/icons/). Switched from Phosphor to `lucide-react` at `strokeWidth` 1.5.
  - Updated `DESIGN.md` (section 7 icon list: `CircleAlert` replaces `WarningCircle`, `Menu` replaces `List`).
  - Added ADR 0007, and marked ADR 0001's icon line as superseded.
  - Swapped the reference `design/preview/blueprint.html` to the Lucide UMD build and re-rendered `blueprint.png`.
- **Next:** unchanged, `section-refs`.

## 2026-09-30: direction-lock, v2 refinement

- **Agent:** Cursor agent (Claude)
- **Todos:** `direction-lock`
- **Done:**
  - The user said the v1 HTML render was the right direction but looked cheap. They asked for:
    - more frozen glass;
    - slow animations;
    - a subtler isometric background with dots, not lines;
    - delightfully rounded corners;
    - more elegance, and for all of it to land in the build.
  - Built the reference implementation `design/preview/blueprint.html` (render: `blueprint.png`):
    - a glass recipe;
    - drifting orbs;
    - an isometric dot lattice and grain;
    - radii of 36/28, 32/24 and 28px;
    - Sora 300 to 500;
    - a 1400ms rise with a 140ms stagger, and a 12s plate float.
  - Rewrote `DESIGN.md` as v2 with verbatim tokens and a **fidelity contract** (section 11): copied tokens, fixed pattern components, the `pnpm shots` screenshot gate, and a checklist.
  - Added ADR 0006.
- **In progress:** nothing.
- **Next:** `section-refs`.
  - Generate references in the v2 style (glass, dots, orbs, radii, cobalt, Patryk Karolak).
  - Cover: selected work bento, approach, contact and footer, the locked case page, About, and a dark-mode case page.
  - Then `scaffold`.
- **Open questions:** none.

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
