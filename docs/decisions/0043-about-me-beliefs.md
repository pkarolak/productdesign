# 0043: "About me" says what I believe

- **Status:** Accepted.
- **Date:** 2026-10-05
- **Todo:** owner request: "The about me section is not really about me"

## Context

The home "About me" block described the working method (research first, then a prototype), which the values block and the cases already show. The owner wrote what he wants it to say instead: over 12 years as a product designer, elegant solutions, explaining things simply, clean UI with a spark (or no UI), the courage not to build a feature, and AI giving everyone even chances. It is about 110 words; the block holds two 8-word lines and 32 words of text.

## Decision

- **His words, cut to fit, not a raised limit.** The two lines and the text keep their budgets.
- **A new optional field, `beliefs`:** up to 4 sentences of 16 words, set as columns (one per row on mobile) under the text, each on a hairline.
- **Copy:**
  - Lines: "A product designer for over 12 years." and "Now is the best time to be one."
  - Text: elegant solutions, and explaining a topic to a 5-year-old once you understand it.
  - Beliefs: clean UI with a spark (but sometimes no UI), the feature you are bold enough not to build, and AI and vibe coding as even chances.

## Consequences

- The years of experience appear because the owner wrote them. They state tenure, not a title or a level.
- The method lives in the values block ("How I work") and on `/about`.
