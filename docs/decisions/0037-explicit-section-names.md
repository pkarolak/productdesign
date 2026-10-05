# 0037: Explicit section names and plain copy, in the owner's voice

- **Status:** Accepted. Amends ADR 0031 (chapter names and anchors).
- **Date:** 2026-10-05
- **Todo:** owner feedback on home copy

## Context

ADR 0031 gave the home chapters warm, playful names: "The short version", "The big ones", "Side quests", "Office hours", "Off the clock". The owner wants section names that say what is there, and no fluffy wording. He wrote the card deck himself, as a sample of his voice.

## Decision

- **Cards, chapters and anchors use the same plain names:**

  | Card | Card text | Chapter | Anchor |
  | --- | --- | --- | --- |
  | Hello! | Get to know me a little bit | About me | `#about-me` |
  | Big projects | Some interesting outcomes of my work | Big projects | `#big-projects` |
  | Side gigs | More lightweight stuff I built after hours | Side gigs | `#side-gigs` |
  | Teaching | How I help others grow | Teaching | `#teaching` |
  | Free time | Sport, tango, and others of my choice | Free time | `#free-time` |

- **The card text is the owner's, verbatim.**
- **About uses plain headings too:** "More about me", "Experience" and "Education".
- **The command menu reads its labels from the content titles**, so the names stay in sync.
- **Copy:**
  - The intro says what he does ("Designing analytics and security tools at Miro").
  - Free time states facts, without design metaphors.
  - The Big projects note says the cases are a selection.
  - The voice rules live in [the content guide](../content-guide.md#voice).

## Consequences

- Old anchors (`#big-ones` and the others) no longer resolve. The site had not been shared widely, so nothing redirects them.
- The hero tagline and its glossary ("sport freak with gotan soul") stay. They are the owner's personal line, not filler.
