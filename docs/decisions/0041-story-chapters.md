# 0041: Story chapters below the teaser

- **Status:** Accepted. Amends [ADR 0003](0003-teaser-depth-and-content-budgets.md).
- **Date:** 2026-10-05
- **Todo:** owner request: follow the storytelling of Ben Shih's case pages, which "tells the process without telling the process"

## Context

The case page was teaser-only: a bottom line, metrics, three beats (Frame, Shape, Ship) and up to four artifacts. The owner wants the Miro cases told the way [Ben Shih's onboarding case](https://www.benshih.design/case-study/onboarding) is: chapters with a sticky "On this page" rail, each chapter titled by what happened rather than by the method. He chose a hybrid: keep the 30-second top, make it editorial, and put the full story below it.

## Decision

- **Schema:** an optional `story` on a project, 3 to 6 chapters. Each chapter has an `id` (its anchor), a `nav` label (3 words), a `title` (10), an optional `lead` (50), `quote` (16) and `artifact`, and up to 4 `steps`. A step has an `id`, `nav` (3), `title` (9), `text` (60), optional `points` (2 to 5 × 16) and one `artifact`. Ids are unique within a case.
- **Titles carry the finding, not the step.** "Nobody wanted to show admins the data", never "Stakeholder alignment". The chapter order tells the process: why, finding out, what pushed back, building, results.
- **Page:** with a story, the case page renders `Story` instead of `Beats` and `Artifacts`. Without one it is unchanged. The facts (role, timeline, team, partners) move into the header for every case; `scope` no longer shows.
- **Rail:** `StoryNav` sits in 3 of 12 columns, sticky under the nav. The chapter in view gets the `bg-skeleton` pill (shared `layoutId`) and the accent dot. Its steps open on a hairline, and the step in view is set in ink, medium weight. Position comes from an IntersectionObserver on a reading line at 30% of the viewport, not a scroll listener. Links are plain anchors, so it works without JavaScript. On small screens the rail is an inline list above the first chapter.
- **Gating:** the story is part of the full case. The schema rejects any story artifact outside `/media/protected/<slug>/` for protected cases, and the locked page never renders it.
- **Budgets still bind.** The teaser fields keep their limits, and every story field has its own. If a chapter does not fit, cut it.

## Consequences

- The three Miro cases carry stories. The other three keep the teaser layout until their stories are written from the decks.
- `beats` and `artifacts` stay required, so a story case still works as a teaser on `/kit` and in any layout that drops the story.
- Screenshots that set their own `ratio` now render whole inside the inset frame, so deck crops keep their edges.
