# 0044: An editorial About page

- **Status:** Accepted. Builds on [ADR 0043](0043-about-me-beliefs.md).
- **Date:** 2026-10-05
- **Todo:** owner request: "The about page is super boring, a wall of text. Rephrase it using the snippets from previous task. Make it more editorial, use some cool graphics or iconography that makes sense"

## Context

`/about` opened with three long paragraphs, then the experience timeline and the working principles. The owner's beliefs (ADR 0043) only reached home, in a trimmed form.

## Decision

- **Opener:** the headline is his belief, "All problems can be solved in an elegant way." Two short paragraphs say who and where. Under it sits a band of four numbers, each traced to his material: 12+ years, 4 product companies, 2,250 prototype commits, 3 years teaching UX.
- **What I believe:** five beliefs in his words, each with a lucide glyph that names it: toy brick (explain it to a 5-year-old), sparkles (clean UI with a spark), dashed square (no UI), ban (not building it), wand (AI and even chances). They sit on hairlines, not cards. The last one closes wider.
- **How I work:** the loop (discover, prototype, validate, merge) is drawn as connected steps: icon tiles, hairlines and arrows, with a repeat mark after merge. On mobile it becomes a vertical rail. The principle cards stay below it.
- **Education and Teaching:** side by side, each led by an icon tile (graduation cap, presentation).
- **Free time:** the home cards join About, with a mountain, footprints and a record.
- **Icons:** 14 glyphs added to the theme contract and both icon sets. Icons in content are checked against `iconNames`.

## Consequences

- The method paragraph is gone from the story. The loop and the principles carry it.
- The free-time cards on home show the same icons.
