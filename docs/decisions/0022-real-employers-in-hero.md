# 0022: Real employers in the hero intro

- **Status:** Accepted
- **Date:** 2026-09-30
- **Todo:** hero copy (owner request)

## Context

The template kept every company fictional. The owner asked for the hero intro to name where he actually works and has worked, with each company's logo mark: Miro now, Egnyte and Allegro before, design for CoNaDzielni.pl after hours, and DJing at milongas.

## Decision

- **Copy:** the intro reads "By day I shape enterprise-grade experiences at Miro, before that at Egnyte and Allegro. After hours I run design at CoNaDzielni.pl. At night I DJ tango at milongas." The day, after hours and night rhythm keeps it one breath long (28 of 32 words). "Run design" describes the work, not a title.
- **Pills:** each pill takes an optional `logo`, a small square mark in `public/logos/`, and links to the company's own site in a new tab. Pills without a logo keep the letter mark.
- **Metadata:** `hero.headline` (metadata and OG) is "I shape enterprise-grade experiences at Miro."
- **Scope:** only the hero intro names real companies. Case studies, their companies and projects stay fictional until the owner replaces them.

## Consequences

- The logos are the companies' public favicons. Each shows at 16px as a pointer to the employer, not as an endorsement.
- The hero names Miro while the fictional cases still name Ledgerline and Halden. They should be brought in line when real case content arrives.
