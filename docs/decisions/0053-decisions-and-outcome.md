# 0053: Cases close with "Decisions and outcome"

- **Status:** Accepted.
- **Date:** 2026-10-06
- **Todo:** reviewer feedback on the closing of Enterprise Guard: "phrase it more like decisions you took and what you learned"; hiring managers want decisions and what took you somewhere, not only visuals and results.

## Context

Enterprise Guard and Analytics ended with "What I took from it", three personal notes ("I love high-profile projects", "it feels great to work on greenfield"). They read as feelings, not as evidence. Content Explorer and the three shorter cases had no closing at all.

## Decision

- **A new optional field, `decisions`:** 2 to 3 items per case, each a `decision` (9 words) and an `outcome` (16 words). The budgets are new; no existing limit was raised.
- **A `Decisions` block (`components/case/Decisions.tsx`)** closes every case page, after the story or the beats and before "Ask me about". It is a definition list on hairlines: decision beside outcome with a quiet arrow, labelled "Decision" and "Outcome" on wide screens, stacked on a phone. It renders nothing without content.
- **The "What I took from it" steps are removed** from Enterprise Guard and Analytics. Their points are replaced by decisions that already exist in the same case.
- **Copy:** first person, plain, no invented facts. Each decision traces to the case's own story, beats, captions or numbers. Where a personal note stands on a real choice, the note stays in his words ("Constant sync was a burden, but it kept four teams moving together").

## Consequences

- Every case ends the same way, in a form a reviewer can scan in seconds.
- The closing is the same for protected cases, so it stays behind the password with the rest of the case page.
- Taste Skill (`design-taste-frontend`) governed the block's layout: no cards, no eyebrow numbering, hairlines and spacing, theme tokens only. It does not replace the Dusk language.
