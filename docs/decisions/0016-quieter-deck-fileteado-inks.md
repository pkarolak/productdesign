# 0016: A quieter deck in fileteado inks

- **Status:** Accepted, revises the art and inks of [ADR 0015](0015-fileteado-deck.md)
- **Date:** 2026-09-30
- **Todo:** card hand follow-up (owner feedback)

## Context

The owner's feedback on the first fileteado deck had four points:
- The ornaments on the face side crowded out the text.
- The pips and text did not use fileteado colours.
- The Troilo portrait did not look like him.
- The backs were too busy.

## Decision

- **Lighter art:** the ace frame is now a double filete line with a small scroll in each corner, and 80% of the face is empty. The joker is a bandoneón alone, framed by two scrolls and a celeste ribbon, with no portrait. The back is a small oval medallion of the tango couple on a plain field. All six images (dark and light) were regenerated from the new dark set, with new file names so no cache serves the old art.
- **Fileteado inks:** the contract gains `--card-gold`, `--card-green`, `--card-sky` and `--card-glint`, each for light and dark. Hearts are vermilion, diamonds gold, spades celeste and clubs green. The four suits no longer follow the red and black split.
- **Painted pips:** `FiletePip` fills the suit, outlines it in gold (red on the gold diamond) and adds one white brush glint. It is used on card faces, corner indices and Side projects covers.
- **Sign lettering:** the new contract utility `filete-letter` sets titles in gold with a red block shadow, the classic fileteado sign letter. Blurbs stay in `card-ink` for legibility.
- **Joker layout:** the title sits in the empty band above the bandoneón, the blurb in the band below, and JOKER runs down the corners.

## Alternatives considered

- Keeping the red and black suits and adding only gold outlines: closer to a standard deck, but not the fileteado palette the owner asked for.
- A cleaner Troilo portrait: a likeness from a generator stays unreliable, and the owner preferred the instrument alone.

## Consequences

- Four more contract variables and one more utility, which both themes implement.
- Section heading glyphs now use the same four inks.
