# 0036: The work timeline groups cases by company, not by year

- **Status:** Accepted.
- **Date:** 2026-10-05
- **Todo:** owner feedback on the work timeline

## Context

The timeline put each case under its year: 2026, 2024, 2022, 2021, 2020. Six selected cases spread over seven years left visible gaps (no 2023, no 2025). The owner said this read as if he had not been working much, or had only a handful of projects. The cases are a selection, and the years in between were full of other work.

## Decision

- **Group by company**, most recent first: Miro, Allegro, Egnyte. Inside a group, the newest case comes first.
- **The group label is the company's span**, not the cases' years: the logo mark from the hero intro, the name, and "2022 to now", "2021 to 2022" or "2014 to 2021", taken from the journey's roles (`lib/companies.ts`). Continuous tenure replaces isolated years.
- **No per-case year in lists.** Timeline rows drop the company caption, since the group carries it, and the command menu shows the company only. The case header, the locked page and the OG image keep "Company, year", where a single date reads as context, not as a gap.

## Consequences

- A company's span comes from the journey. A company with cases but no journey role shows its name only.
- Home shows the first three cases, which are all Miro, so home has one group; `/work` shows all three.
