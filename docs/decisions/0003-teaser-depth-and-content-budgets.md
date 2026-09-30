# 0003: Teaser depth and content budgets

- **Status:** Accepted
- **Date:** 2026-09-30
- **Todo:** content-model

## Context

The site is a teaser. Anyone should get each case's bottom line in about 30 seconds; the full story is told in person. Portfolios drift into long essays as soon as real content arrives, and a template makes that drift easy.

## Decision

- All content is typed TypeScript in `content/`, validated with zod (`content/schema.ts`) at build time. A case that breaks a budget fails `pnpm build`.
- **Budgets (words):** bottom line 30, beats 25 each (exactly three: Frame, Shape, Ship), partners 18, artifact captions 14, ask-me-about prompts 10, metric labels 6 and context 8, About bio 80.
- **Counts:** exactly 4 cases (the home bento is designed for 4), 2 to 3 metrics, 2 to 3 scope chips, 2 to 4 artifacts, 2 to 3 prompts.
- **Metrics** carry a `context` (baseline or time window) so numbers read as credible, and `value` must be digits only with the unit separate.
- **Gating rules are schema rules too:** protected artifacts must live under `/media/protected/<slug>/`, and covers may never.

## Alternatives considered

- **MDX per case:** flexible, but unbounded length is exactly the failure mode.
- **A CMS:** out of scope for v1 and adds hosting and auth surface.

## Consequences

- Swapping in real work means editing four small files, and the build says what to cut.
- The rule for writers: if it does not fit, cut it; never raise a limit.

## Related

- [../plan.md](../plan.md) (content model), [../content-guide.md](../content-guide.md)
