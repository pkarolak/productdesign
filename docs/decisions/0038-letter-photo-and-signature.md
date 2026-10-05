# 0038: The closing letter has a photo and a handwritten signature

- **Status:** Accepted. Widens [ADR 0014](0014-handwritten-doodle-caption.md).
- **Date:** 2026-10-05
- **Todo:** owner feedback on the "future teammate" letter

## Context

The owner rewrote the letter that closes home in his own voice. He asked for his photo on it, and for his first name in handwriting above his full name, like a signed note.

## Decision

- **Photo:** `letter.photo` is an optional 5:7 portrait. It sits beside the text from `md` and above it on mobile, tilted slightly like a photo clipped to a letter. Home uses the winking, pointing shot, which answers "Hey there".
- **Signature:** `letter.signoff` renders in `type-hand` (Caveat), tilted, with `name` below it in small type. This is the second allowed use of the hand font. It is still never used for headings, body copy, buttons or navigation.
- **Copy:** the owner's text, with only grammar and spelling fixed. The en dash became a comma.

## Consequences

- The font rule in AGENTS.md reads "doodle captions and the letter signature".
