# Content guide

Everything a visitor reads lives in `content/`. The build validates it against [content/schema.ts](../content/schema.ts) and fails with a readable message if something is over budget. Why the budgets exist: [ADR 0003](decisions/0003-teaser-depth-and-content-budgets.md).

## Files

- `content/site.ts`: name, the content of every block (hero, hand, the five chapters, testimonials, letter, About story, education, journey, values, resume), links, contact copy, an optional footnote.
- `content/kit.ts`: fixtures for `/kit`, the live content plus the blocks the site leaves empty. Only `/kit` reads it.
- `content/projects/<slug>.ts`: one file per case.
- `content/projects/index.ts`: the order, and a check for exactly five cases. The first `work.featured` cases lead on home; the work timeline groups them by `year`, newest first.

Wrap one word of a heading in `*asterisks*` to give it the single emphasis (for example `"I design the *systems* product teams build on."`). Use `\u00a0` (a non-breaking space) to keep short phrases together, like `0\u00a0to\u00a01`.

## Blocks

Every block is optional in practice: leave its field out, or its `items` empty, and the block renders nothing. A door is hidden when its target block is empty.

| Field | Budget | Write it as |
| --- | --- | --- |
| `hero` | greeting 5, tagline 8, intro 32 words, headline 12 | `intro` is a day cycle of 1 to 3 rows `{ when 2, icon (sun, sunset, moon), parts, note? }`, 32 words in total. `when` is the switch label (keep it to one or two short words), and the hero shows one row at a time. `photo`: an optional 5:7 image `{ src, alt }` (at least 400 × 560px, in `public/about/`) for the hero face card while that row is on. Once two or more rows have one, the face card becomes a small deck that shuffles with the day switch, and rows without a photo use `avatar`. `parts` and `note` mix plain text, `{ pill, logo?, kind 5, about 24 }` company notes (they open a small card with the logo, the kind of product and one line about it, and never link away) and inline dictionary terms (a glossary entry, shown as a tooltip like the tagline terms and not counted against the 3 tagline entries), (`logo`: a square mark in `public/logos/`, at least 32px). `note` continues the same line in a quieter tone. Company names are frameless, with the logo before the name and the same dotted underline as dictionary terms. Keep each row one short phrase with no closing period, and lead with what you do. The word before each pill stays on its line. Spaces are added between parts, except before punctuation. `headline` is for metadata and OG images. `glossary`: up to 3 `{ term, phonetic?, kind 3, senses 1 to 2 × 26, origin? 20 }` entries; each term must appear in the tagline and becomes a dictionary tooltip. |
| `avatar` | optional | A 5:7 portrait photo (at least 424 × 594px) in `public/about/`, matching the cards, with real `alt` text. Shown in the nav and, on wide screens, beside the intro as the "P of hearts" face card that the hand is dealt from, unless intro rows bring their own `photo`. `cutout`: optional, the same shot as a transparent PNG with the background removed (also on a row's `photo`). The face card then shows the cut-out standing on its bottom edge, filling the card on its suit's wash; the nav keeps `src`. `face`: optional, a square close-up of the face (at least 128px) used for the small nav avatar instead of `src`. On a Mac, `VNGenerateForegroundInstanceMaskRequest` in Apple's Vision framework makes a clean one. |
| `handNote` | 8 words, optional | The handwritten caption under the hand, with a doodle arrow (ADR 0014). |
| `deck` | optional: `joker`, `back`, each `{ src, srcDark }` | Decorative card art for the hand ([ADR 0018](decisions/0018-plain-faces-fileteado-accents.md)). The joker is a small emblem as a transparent PNG (about 3:2), the back a full card. Leave it out for plain printed cards. |
| `hand` | up to 5 cards, title 3, text 8 words | The home table of contents, one card per chapter ([ADR 0031](decisions/0031-chapters-and-names.md)). Each has a `suit` (`heart`, `spade`, `diamond`, `club`, `joker`), a `target` (`about`, `work`, `showcase`, `teaching`, `outside`) and an `href` that is the chapter's anchor: `#short-version`, `#big-ones`, `#side-quests`, `#office-hours`, `#off-the-clock`. The chapter's heading wears the card as its emblem, and a picked card flies there. |
| `statement` | title 5, 1 to 2 lines of 8 words, text 32 | "The short version". The second line renders in Ink 2. `cta` links to About ("The long version"). |
| `work` | title 5, note 10, more 4 | "The big ones". `featured` (default 3) cases show on home, in the order of `content/projects/index.ts`; with more, `more` links to `/work`. |
| `showcase` | up to 6 items, text 14, detail 60, more 4 | "Side quests". Cards that open a sheet. `featured` (default 3) show; the `more` button reveals the rest in place. `image` is optional; without one the cover is a card face with its suit pip. Images are public. |
| `teaching` | up to 3, text 30, 4 topics of 4 words | "Office hours". Place, role, years, what you taught. |
| `outside` | up to 3, text 40 | "Off the clock". Life outside work, briefly. |
| `testimonials` | up to 4, quote 45 words | "Word of mouth". Real people only. Left out on the live site until the owner adds real ones; `/kit` shows a labelled sample. |
| `letter` | 1 to 3 paragraphs of 34 words | Closes Home (id `contact`) and carries "Book a call", copy email and LinkedIn. `links.email` is optional: without it, every email action (the letter, the contact block, the command menu) hides. |
| `about.title`, `about.story` | title 4; 1 to 3 paragraphs of 70 words | The page label ("The long version"); the first paragraph reads as the lede. |
| `educationTitle` | 4 words | The education heading ("School days"). |
| `resume` | optional `{ src, label 4 }` | A PDF in `public/`, e.g. `/patryk-karolak-cv.pdf`. Shows a download button ("Grab the CV") on About. |
| `journey.roles` | up to 8, summary 18, 2 points of 16 | "Where I've been". Omit `to` while the role is current. `cases` link up to 2 case slugs. |
| `values` | up to 4, text 30 | "How I work". `evidence` is a case slug. |

## Writing a case

| Field | Budget | Write it as |
| --- | --- | --- |
| `bottomLine` | 30 words | What changed and why it mattered, with one number. The only thing a busy reader must see. |
| `metrics` | 2 to 3 | `value` digits only, `unit` separate (`%`, `x`, `s`, `k`), `label` 6 words, `context` 8 words (baseline or time window). |
| `beats` | 3 × 25 words | Frame (the real problem), Shape (the key move), Ship (how it landed). |
| `role`, `team`, `timeline` | 5, 10, 3 words | Facts, no adjectives. |
| `partners` | 18 words | Who you worked with and led across functions. |
| `scope` | 2 to 3 items | Areas, not skills. |
| `artifacts` | 2 to 4 | Each with a 14-word `caption` and a real `alt`. |
| `askMeAbout` | 2 to 3 × 10 words | Hooks for the conversation, not answers. |

Every fact must trace to the owner's material: a slide in his Figma decks or an answer he gave (ADR 0034). If a deck stops before a result, say what was handed over or tracked, never an invented number.

Copy rules: no em-dashes, no "elevate / seamless / passionate", no Acme or Jane Doe, no framing around titles or career moves. Let the numbers carry it.

## Assets

Every asset has a `kind`. The same kinds work for `cover` and `artifacts`.

Dark mode: add `srcDark` to screenshots when you have a dark export. Without one, the theme dims light images in dark mode so they do not glare, which is a fallback, not a substitute.

| Kind | Fields | Tips |
| --- | --- | --- |
| `screenshot` | `src`, `alt`, optional `srcDark`, `ratio`, `annotations` (x/y in % of the visible frame) | Desktop UI, at least 2000px wide. A `ratio` is kept in every artifact slot, so slides set `16/9`. Frames crop from the top-left, so keep titles there. Check annotation dots after changing an image. |
| `isometric` | `plates`: 1 to 3 images | Rendered as the theme's signature visual in the hero and case header, as layered frames elsewhere. |
| `mobile` | `screens`: 2 to 4 images | Portrait screens without device chrome, 9:19.5. |
| `photo` | `src`, `alt`, optional `ratio` | Research, workshops, whiteboards. |
| `diagram` | `layers`: 2 to 4 short labels (bottom first) | Drawn by the theme; no image needed. |
| `compare` | `before`, `after` | Same crop and size for both. |
| `video` | `src`, `poster`, `alt` | Muted loop, under 6 MB, with a poster frame. |

### Where files go

- **Covers** (always public, shown on the home page and the locked teaser): `public/projects/<slug>/`.
- **Artifacts of a protected case:** `public/media/protected/<slug>/` only. The schema rejects anything else, and the proxy returns 401 for these files until the visitor unlocks.
- **Artifacts of a public case:** `public/projects/<slug>/`.
- **About portrait:** `public/about/`.

Use JPEG or WebP. Public images go through the Next.js optimizer; protected ones do not (the optimizer cannot send the visitor's cookie), so export them at a sensible size (about 2400px wide, under 500 KB).

## Slide placeholders

The case slides could not all be exported from Figma yet. Each placeholder under `public/media/protected/<slug>/` names its slide and Figma node id. To swap one: export the slide at 16:9 (about 2400px wide), save it under a new file name in the same folder, and point the artifact's `src` at it. Covers are neutral logo cards (`cover-light.png`, `cover-dark.png`) and never show product UI.

## Reusing the template

1. Edit `content/site.ts` (name, hero, about, links).
2. Replace the five files in `content/projects/`, keeping the exports named in `index.ts`, or rename them there.
3. Replace the images in `public/projects/`, `public/media/protected/` and `public/about/`.
4. Set `access: "public"` on any case that should not be gated.
5. `pnpm build`. Fix whatever the schema reports.
