# 0042: Loops of shipped UI as public covers

- **Status:** Accepted. Refines [ADR 0004](0004-password-gating.md).
- **Date:** 2026-10-05
- **Todo:** owner request: make the project listing "much more visual catchy", with animated real UI like Ben Shih's case cards

## Context

Covers are public: they show on the home listing, `/work` and the case header. Until now they were neutral logo cards, so nothing about the work showed before a password. The owner asked for animated UI on the listing. He also set the boundary: public loops of shipped UI only, on demo data; anything unreleased stays behind the password.

## Decision

- **A cover may be a `video`:** `public/projects/<slug>/loop.mp4` with `loop.jpg` as its poster, recorded at 1280×800 from the admin console on the FlexFund demo org.
- **Only shipped UI.** Content Explorer: the classification filter, Data Discovery and Content Lifecycle. Analytics: the Miro AI tab and the Teams using AI drill-down. Enterprise Guard: the classification overview and configuration. Unshipped UI (the use-case column, filter and drawer section, the use-case widget) is hidden while recording, and no customer data appears.
- **Listing:** each case is a card led by its cover in a 16/10 frame, title, bottom line and lock marker. Cards sit two to a row per company; a company with an odd count leads with one wide card, side by side.
- **Case header:** the cover runs full width under the title and facts. It tilts back in perspective and stands up as it scrolls in (transform only, through `useScroll`). Logo-card covers use a 21/9 frame.
- **Playback:** loops play only in view (IntersectionObserver) and show the poster under reduced motion. They dim in dark mode like light images. In cards they are decorative (`aria-hidden`); the title names the link.

## Consequences

- The locked page still shows no cover, artifact or story; only the listing and the unlocked header play loops.
- A new loop must be checked against what is live before it ships. When in doubt, it goes into the story instead.
- The Miro logo-card covers are gone. The other three cases keep theirs until they have a loop.
