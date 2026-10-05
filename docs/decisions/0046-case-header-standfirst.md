# 0046: A quiet case header: the bottom line as a standfirst

- **Status:** Accepted.
- **Date:** 2026-10-05
- **Todo:** owner request: "propose some better layout for the top section in case study page. The subtext font is too aggressive and hard to read"

## Context

The case header set the bottom line in `type-bottomline`: the display face at about 34px, weight 500, line height 1.2, in full ink. Five lines of it read as a second headline beside the title, with the facts squeezed into a narrow column on the right. Three layouts were mocked on Content Explorer (a quiet lede; the lede plus a headline metric; a facts rail on the left). The owner picked the quiet lede.

## Decision

- **New contract name `type-standfirst`:** body face, regular weight, 18px on phones up to 21px (Dusk) or 22px (Blueprint) on desktop, line height 1.55, in `ink-2`. It sits under the title at up to 46 characters a line.
- **Facts in one row:** Role, Timeline, Team and Partners run in four columns under a hairline (two columns on phones), between the standfirst and the cover.
- **Only the title is loud.** `type-bottomline` stays for the story's pull quotes, where a large line is the point.

## Consequences

- The header reads in a single column: who, what, why it mattered, the facts, then the loop.
- The metrics stay in their panel under the cover; nothing in the header repeats them.
