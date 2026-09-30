# UX and accessibility audit

Audit of the v1 build (commit `aa07d46`), 2026-09-30. Method: real-size captures of every page (light and dark, 1440 and 390 wide), axe-core (WCAG 2.2 AA plus best practice), a keyboard focus-order trace, a target-size sweep, a no-JavaScript check, and a code review of the interactive components. Heuristics referenced: Nielsen's 10 (N1 to N10), Gestalt proximity and similarity, Fitts's law, WCAG 2.2.

**Status:** all High and Medium findings fixed on 2026-09-30 ([ADR 0009](decisions/0009-audit-fixes.md)); axe reports zero violations on every page in both themes. Low findings are open.

Severity: **High** blocks or misleads a real visitor, or fails WCAG AA. **Medium** causes friction or reads as a craft slip to a design leader. **Low** is polish.

## What already works

- Skip link, landmarks, one H1 per page, visible focus ring on every control, logical tab order.
- Unlock form: real label, `autocomplete="current-password"`, `aria-invalid`, error announced through a live region.
- Reduced motion honoured; no horizontal overflow at any width; axe finds nothing except the contrast issue below.

## High

| # | Finding | Where | Heuristic | Fix |
| --- | --- | --- | --- | --- |
| H1 | Nav links nearly vanish when the pill floats over light imagery, worst in dark mode ("Work" is light grey on a white screenshot seen through the glass). | Nav, all pages while scrolling | WCAG 1.4.3, N1 | Make the scrolled state (`surface-deep`) more opaque, or add a tint layer behind nav text. |
| H2 | Labels and the lock icon use `--ink-3`: 2.88:1 in light, 4.2:1 in dark. This includes the unlock form's "Password" label and the Role / Team / Timeline labels. | `type-label`, lock icon on cards | WCAG 1.4.3, 1.4.11 | Darken `--ink-3` to at least 4.5:1 on canvas in both themes. |
| H3 | Three of four cases are gated, but the only signal is a small faint lock icon. Visitors click, then hit a password wall they did not expect. | Work cards | N1, N5 | A visible "Password protected" chip on gated cards, and say it in the Selected work intro. |
| H4 | Cards show no "open" affordance at rest; the arrow appears only on hover, so touch users never see it. | Work cards | N6, affordance | Show the arrow at rest (muted), animate it on hover. |
| H5 | Mobile menu does not move focus into the sheet, does not close on Escape, and leaves the page behind it tabbable. | `Nav` mobile sheet | WCAG 2.4.3, 2.1.1 | Focus the first link on open, Escape closes and returns focus to the button, `inert` on `main` and the footer while open. |
| H6 | 24 elements on the home page ship with `opacity:0` and only appear after JavaScript runs. With JS blocked or slow, the page is blank; even when it works, 1.4s reveals slow the 30-second read. | `Rise`, `Nav` | Robustness, N7 | Hide only after hydration (for example a `js` class set before paint), and shorten reveals for text. |

## Medium

| # | Finding | Where | Heuristic | Fix |
| --- | --- | --- | --- | --- |
| M1 | "Get in touch" means two things: the nav scrolls to the contact block, the contact block opens a mail app (`mailto:`), which does nothing useful for people without a configured mail client. | Nav, Contact | N4, N3 | Label the contact action "Email me", and make the address a copy button. |
| M2 | Two primary button styles: cobalt pill in the nav, ink pill everywhere else. The same "Get in touch" appears in both. | Nav vs hero, contact, unlock | N4, similarity | One primary style; the nav CTA can stay cobalt only if every primary does. |
| M3 | False affordances: "Ask me about" rows have link arrows but do nothing; scope chips look like filter buttons. | Case page | N4 | Replace arrows with a neutral marker (or numbers); make chips flat text or clearly static. |
| M4 | Proximity breaks: the Selected work intro floats far right of its heading; "Get in touch" under Ask me about sits detached; "Lock cases" is grouped with the next-case link; Partners and scope have no label while Role / Team / Timeline do. | Home, case page | Proximity, similarity | Put intros under headings; move "Lock cases" next to the case meta or into the footer of the case; label Partners. |
| M5 | Before/after slider has no visible "Before" and "After" labels and no `aria-valuetext`. | `Compare` | N6, WCAG 4.1.2 | Corner labels on the image; `aria-valuetext="Showing 50% before"`. |
| M6 | The locked page is a dead end: besides the nav, no way to the public case or other work. | Locked teaser | N3 | "Or read the open case: Accessible by default" below the form. |
| M7 | Unlock waits 600ms with only a faint disabled state. | `UnlockForm` | N1 | Button label "Checking" while pending. |
| M8 | In dark mode every screenshot is light UI, so the page is a set of glaring white rectangles. | All media | Consistency | Supply `srcDark` for screenshots, or tone them down with a theme-owned dim. |
| M9 | Numbers disagree: "86% adoption, 14 of 16 teams" is 87.5%. All three hero metrics come from one case, and the home hero reuses the Keel case header (same plates, same numbers), so home and case look identical. | Content | Credibility | Fix the arithmetic; hero metrics from three different cases; distinct hero plates. |
| M10 | Screenshot crops cut off what matters: the dashboard loses its title ("l overview", "$3,720"); the mobile case cover crops the sidebar mid-word. | Artifacts, mobile cover | Craft | Crop from the top-left, or use `object-position` per asset. |
| M11 | The layer diagram is oversized (four words fill about 850px) and its top slab is clipped by the frame. | `Diagram` in artifacts | N8, craft | Cap diagram height, add top padding so nothing clips. |

## Low

| # | Finding | Fix |
| --- | --- | --- |
| L1 | Targets under 24px: approach "See ..." links (20px tall), "Get in touch." in the lock note (16px). WCAG 2.5.8. | Add vertical padding. |
| L2 | Card links read their whole content as one run-on name ("Ledgerline, 2024Keel design system(password protected)Turned ..."). | `aria-labelledby` the title, `aria-describedby` the bottom line. |
| L3 | External links open a new tab without saying so to screen readers. | sr-only "(opens in a new tab)". |
| L4 | Theme toggle label does not say which theme it switches to. | "Switch to dark theme" / "Switch to light theme". |
| L5 | Case page: the visual headline is the bottom line (a paragraph) while the H1 is the small title; artifacts and facts have no headings. | Keep H1 as title, add visually hidden H2s for Facts and Artifacts. |
| L6 | Mobile: the unlock form sits below the fold; the case cover appears after the metrics with large gaps; "platform squad of 5" wraps an orphan. | Tighten mobile spacing; form before the lead metric on small screens. |
| L7 | Hero metric panel: the third context wraps to three lines, the others to two. | Shorten the context copy. |

## Suggested order

H2, H1, H3 and H4 first (quick, visible, and what a design reviewer spots in seconds), then H5 and H6, then M1 to M4, then the content and craft items (M8 to M11), then Low.
