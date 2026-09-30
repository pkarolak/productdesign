# Content guide

Everything a visitor reads lives in `content/`. The build validates it against [content/schema.ts](../content/schema.ts) and fails with a readable message if something is over budget. Why the budgets exist: [ADR 0003](decisions/0003-teaser-depth-and-content-budgets.md).

## Files

- `content/site.ts`: name, hero, approach principles, About, links, contact copy, footnote.
- `content/projects/<slug>.ts`: one file per case.
- `content/projects/index.ts`: the order. The first case is the large lead cell on the home page; the fourth is the wide cell.

Wrap one word of a heading in `*asterisks*` to give it the single emphasis (for example `"I design the *systems* product teams build on."`). Use `\u00a0` (a non-breaking space) to keep short phrases together, like `0\u00a0to\u00a01`.

## Writing a case

| Field | Budget | Write it as |
| --- | --- | --- |
| `bottomLine` | 30 words | What changed and why it mattered, with one number. The only thing a busy reader must see. |
| `metrics` | 2 to 3 | `value` digits only, `unit` separate (`%`, `x`, `s`, `k`), `label` 6 words, `context` 8 words (baseline or time window). |
| `beats` | 3 × 25 words | Frame (the real problem), Shape (the key move), Ship (how it landed). |
| `role`, `team`, `timeline` | 5, 10, 3 words | Facts, no adjectives. |
| `partners` | 18 words | Who you worked with and led across functions. |
| `scope` | 2 to 3 chips | Areas, not skills. |
| `artifacts` | 2 to 4 | Each with a 14-word `caption` and a real `alt`. |
| `askMeAbout` | 2 to 3 × 10 words | Hooks for the conversation, not answers. |

Copy rules: no em-dashes, no "elevate / seamless / passionate", no Acme or Jane Doe, no framing around titles or career moves. Let the numbers carry it.

## Assets

Every asset has a `kind`. The same kinds work for `cover` and `artifacts`.

| Kind | Fields | Tips |
| --- | --- | --- |
| `screenshot` | `src`, `alt`, optional `srcDark`, `ratio`, `annotations` (x/y in %) | Desktop UI, at least 2000px wide, cropped from the top. |
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

## Swapping the placeholders

1. Edit `content/site.ts` (name, hero, about, links), and remove `footnote`.
2. Replace the four files in `content/projects/`, keeping the exports named in `index.ts`, or rename them there.
3. Replace the images in `public/projects/`, `public/media/protected/` and `public/about/`.
4. Set `access: "public"` on any case that should not be gated.
5. `pnpm build`. Fix whatever the schema reports.
