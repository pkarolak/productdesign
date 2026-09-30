# 0020: Hero centred on the hand, the message in full ink

- **Status:** Accepted
- **Date:** 2026-09-30
- **Todo:** hero review (owner request: "fix them all")

## Context

A critical review of the hero on desktop and mobile found several problems:

- The photo and text block sat left of centre while the navigation and the card fan were centred.
- The white-background portrait read as an ID photo next to the warm card paper.
- Only the greeting was in full ink, and the tagline was three lines of secondary grey.
- Three bold dotted underlines made the headline busy.
- The hero was the only large heading without the filete shade (ADR 0019).
- The strongest line on the site ("I design the systems product teams build on") appeared only on About.
- A company pill could start a line on its own.
- On mobile, the photo appeared twice within 80px, the swiped card row cut off the cards' shadow in a hard line, and two big cards filled the whole first screen.

## Decision

- **Axis:** on desktop the photo and text form one block, `auto` plus a 38rem column, centred on the same axis as the navigation and the fan.
- **Portrait:** set like a card laid on the table. It sits on card paper (`playing-card`, 6px margin), tilted by 2 degrees, and straightens on hover. A light sepia warms the photo.
- **Headline:** the greeting in `ink-2`, the tagline in full `ink` with `filete-shade`. The glossary underlines are thin `ink-3` dots that turn accent on hover or when open.
- **Intro:** it leads with the thesis: "I design the systems product teams build on, now at Ledgerline and before that at Halden. Based in Warsaw." The word before each pill is glued to the pill, so a pill never starts a line alone.
- **Mobile:** no photo in the hero, since the navigation already shows it. The cards are 44vw wide, overlap by 20px and tilt a few degrees each, like a hand laid out on a table. The row has room for the shadow.
- The caption stays "Pick a card", which reads fine for a tap.

## Consequences

- The intro sentence now carries the positioning, so `hero.headline` (metadata and OG images) and the intro say the same thing.
- The mobile row reads as a hand of cards rather than a carousel.
