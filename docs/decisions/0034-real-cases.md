# 0034: Real cases from the owner's Figma decks, all protected, neutral public covers

- **Status:** Accepted
- **Date:** 2026-10-01
- **Todo:** `rules-schema` (plan "Real cases from Figma")

## Context

The site ran on four fictional cases (Ledgerline, Halden) written to test the layout. The owner keeps his real portfolio as slide decks in Figma ("Patryk's Playground", file `fSTFAxmRFRkc2fQbRppfQ5`): a CV page and five decks for Miro Analytics, Miro Enterprise Guard, Merchant Economic Tools (Allegro), Egnyte as Product Platform and Data Access Management (Egnyte). He asked for the site to reflect them, with better storytelling and nothing invented.

## Decision

- **Five real cases replace the four fictional ones.** Every fact traces to a deck slide or to an answer from the owner, logged in `docs/progress.md`. Where a deck ends without a measured result, the Ship beat says what was handed over and what was tracked, never a made-up number.
- **All five are password protected.** The decks name colleagues, internal numbers and unreleased work, so none of it is public.
- **Public covers are neutral:** the company logo on a suit-tinted card, with no product UI and nothing from the deck. Slide visuals go only under `public/media/protected/<slug>/`, as ADR 0004 requires.
- **Five cases, three on home.** `content/projects/index.ts` checks for exactly five. Home shows the first three (`work.featured`), and `/work` lists all five.
- **Placeholders for slide images.** The Figma connection is on a View seat and hit its export limit, so artifacts that should be slide exports point at labelled placeholder images. The owner swaps in the exports later, using new file names.
- **`AGENTS.md`** no longer says case companies stay fictional.

## Consequences

- With no public case, the locked page has no "read the open cases" line, and the locked note counts every case ("All five are password protected").
- Copy is only as rich as the decks. Gaps stay out until the owner fills them in.
