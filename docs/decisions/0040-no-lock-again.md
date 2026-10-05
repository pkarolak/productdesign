# 0040: No "Lock cases" control on case pages

- **Status:** Accepted. Supersedes the "Lock again" point of [ADR 0004](0004-password-gating.md) and the "Unlocked · Lock cases" line of [ADR 0009](0009-audit-fixes.md).
- **Date:** 2026-10-05
- **Todo:** owner feedback on case pages

## Context

Unlocked protected cases showed "Unlocked · Lock cases" beside the company and year. The owner said it makes no sense to a reader: visitors unlock to read, and nobody comes back to lock the cases again.

## Decision

- **Removed:** the control, its `lock` server action and the `CaseHeader` `status` slot.
- **Still in place:** access ends when the signed cookie expires (`ACCESS_MAX_AGE`). Clearing site data also ends it.

## Consequences

- There is no in-page way to lock. Gating itself is unchanged: locked HTML, OG images and the sitemap still carry nothing protected.
