# 0031: Five chapters, one per card, with plain warm names

- **Status:** Accepted
- **Date:** 2026-10-01
- **Todo:** `ia-copy` (plan "Clear IA and card nav")

## Context

The hand of five cards opened overlays with copies of the sections below them, so the page had two ways into the same content and no clear order. Section names mixed registers ("Core work", "My world", "What it is like to work with me"), and an empty writing list sat in the schema.

## Decision

- **The hand is the table of contents.** Each card leads to one home chapter, in this order:

  | Card | Chapter | Anchor |
  | --- | --- | --- |
  | Heart, "Hi!" | The short version | `#short-version` |
  | Spade | The big ones | `#big-ones` |
  | Diamond | Side quests | `#side-quests` |
  | Club | Office hours | `#office-hours` |
  | Joker | Off the clock | `#off-the-clock` |

  After the chapters come unsuited sections: "Word of mouth" (testimonials), the "Dear future teammate," letter and the "Drop me a line" form.
- **Featured limits.** `work.featured` and `showcase.featured` (default 3) cap how many items a chapter shows on home. The rest sit behind the chapter's `more` label ("All the big ones", "All side quests"), which only appears when there are more items than the limit.
- **About is "The long version"**, with "Where I've been", "How I work", "School days" and an optional `resume` PDF ("Grab the CV").
- **Writing is dropped**, from the schema and the blocks. Nothing was filled in.
- Hand `target`s are now only the five chapters; `writing` and `contact` are gone.
- The nav call to action reads "Say hi".

## Consequences

- Old anchors (`#work`, `#side-projects`, `#teaching`, `#my-world`) no longer exist. The command menu, the 404 page and the locked page point at the new ones.
- The names lean lightly on the deck and stay plain. Alternatives the owner can swap in are listed in the plan: "Headliners", "Small wonders", "Back in class", "Overheard at work".
