# Design languages

Two design languages implement [themes/contract.json](themes/contract.json). **Dusk is active**; Blueprint stays switchable with `pnpm theme:use blueprint` ([docs/theming.md](docs/theming.md)). Both render the same blocks ([ADR 0010](docs/decisions/0010-block-library.md)).

## Dusk (active)

Subtle dark, calm, crisp. Dark is the default; light stays on the toggle ([ADR 0011](docs/decisions/0011-dusk-theme.md)). Fidelity target: [design/directions/round-8/](design/directions/round-8/README.md). Implemented in `themes/dusk/`.

- **Color, dark:** canvas `#0F1012`, card `#16181B` (raised `#1B1D21`), hairline `rgba(255,255,255,.07)`, Ink `#ECEDEE`, Ink 2 `#A6A9AF`, Ink 3 `#858990`, accent pale amber `#E8B270` on `#1A1206` accent ink.
- **Color, light:** canvas `#F6F6F5`, card `#FFFFFF`, hairline `rgba(17,18,20,.08)`, Ink `#111214`, Ink 2 `#55585E`, Ink 3 `#6A6D73`, accent `#9A5B12` on white accent ink.
- **One accent.** Amber marks the primary action, links on hover, the active dot and focus. Never on large fills beyond buttons.
- **Suits (ADR 0012).** Pastel coral, sky, amber, mint and lilac (`suit-1` to `suit-5`) with dark `suit-ink`, the same in both modes. Only on the card hand, image-less showcase cards and the small glyph beside a section heading.
- **Type:** Geist only. Display 600 `clamp(2.5rem, 5vw, 3.75rem)`, tracking `-0.035em`, the `<em>` part in Ink 2 on its own line. H2 600 `clamp(1.75rem, 3vw, 2.25rem)`. H3 500 `1.125rem`. Body 400 `1rem` at 1.65. Small `0.875rem` Ink 2. Labels in sentence case, `0.8125rem`, Ink 3. Tabular numbers for dates and metrics. Banned: Inter, serif, mono, handwriting, all caps headings.
- **Shape:** cards 16px, sheets 20px, frames 20px with a 6px inset, pills fully round, inline company pills 8px.
- **Surfaces:** flat cards with a 1px hairline and a soft low shadow; no glass on content. The nav and sheets are near-opaque with a light blur so text stays legible over media. The only atmosphere is a faint top vignette.
- **Motion:** quicker and calm. Rise 0.8s, 12px, 4px blur, stagger 0.06s. Press scale 0.97. Sheets on a stiff spring (380 / 36). Route changes: nav stays put, a case cover morphs into its header, forward and back slide 48px. Everything collapses under reduced motion.
- **Checklist before calling Dusk UI done:** both modes pass axe; no text below 4.5:1 (Ink 3 included, on cards too); the nav, command menu and sheets work by keyboard alone; `/kit` shows every block and state; `pnpm shots` matches round 8 in spacing and hierarchy.

---

# Design System: Blueprint (v2)

**Skills:**
- Written with `stitch-design-taste`.
- Built with `design-taste-frontend` (pre-flight), `high-end-visual-design` (glass, double-bezel frames, pill nav, motion) and `image-to-code` (section references in `design/refs/`).

**Decision records:**
- [ADR 0002](docs/decisions/0002-style-direction.md): the direction.
- [ADR 0006](docs/decisions/0006-blueprint-v2-refinement.md): the v2 refinement (glass, dots, radii, slow motion, elegance).
- [ADR 0007](docs/decisions/0007-lucide-icons.md): Lucide icons.
- [ADR 0008](docs/decisions/0008-design-language-layer.md): the design language is a swappable layer in `themes/`.
- [ADR 0009](docs/decisions/0009-audit-fixes.md): changes from the UX and accessibility audit (Ink 3, strong glass, one primary button, status chips).

**Reference implementation (the fidelity target):**
- [design/preview/blueprint.html](design/preview/blueprint.html): open it in Chrome to see the motion.
- [design/preview/blueprint.png](design/preview/blueprint.png): the static render in light and dark.
- Every value in this file exists in that HTML. When building, copy the values verbatim; do not re-derive them.

This file is the single source of truth for every visual decision of the Blueprint design language (implemented in `themes/blueprint/`). If code and this file disagree, this file wins. Change this file and add an ADR before changing the look. To replace Blueprint with a different design language, follow [docs/theming.md](docs/theming.md).

---

## 0. Dials

- **Design variance: 6.** Offset and asymmetric, but calm.
- **Motion intensity: 6.** Slow, weighted and continuous in the ambient layer, never busy.
- **Visual density: 2.** Gallery-airy: whitespace is the main material.

---

## 1. Visual theme and atmosphere

Frozen glass over a quiet blueprint.
- The page is a cool, luminous canvas. Soft cobalt and ice-blue light **drifts very slowly** behind everything.
- A **fine isometric dot lattice** fades in behind the hero visual, like a faint drafting-paper grid.
- Everything that holds content is **frosted glass**: it blurs and saturates the light behind it, has a bright top edge highlight, and has **delightfully rounded** corners.
- Product work floats as exploded isometric glass plates joined by fine dashed guides and small glowing nodes.
- Headings are Sora in **light weights** with tight tracking. Emphasis comes from a single step up in weight, not from size or color.

It must feel sophisticated, elegant, calm, expensive and precise, like a high-end hardware product page.
It must never feel flat, cheap, techy, loud, busy or templated.

**The four signature ingredients.** All four must be visible on every page:
1. Frosted glass surfaces.
2. The isometric dot lattice.
3. Slow drifting light.
4. Generous rounded corners.

---

## 2. Color palette and roles

One accent family: **Blueprint Cobalt.**

### Light theme
- **Canvas** `#F5F7FB`: page background.
- **Ink** `#0B1220`: headings and primary text.
- **Ink 2** `#4E5868`: lede, body secondary, captions. AA on Canvas.
- **Ink 3** `#5F6878`: tertiary text only (labels, disabled). Never body text. Darkened from `#8A93A3` to pass 4.5:1 (ADR 0009).
- **Accent** `#2F5BEA` and **Accent ink** `#FFFFFF`.
- **Dot** `rgba(11, 18, 32, 0.22)`: lattice dots, before masking.
- **Orb 1** `rgba(47, 91, 234, 0.30)`, **Orb 2** `rgba(140, 180, 255, 0.40)`, **Orb 3** `rgba(120, 190, 250, 0.34)`: drifting light.
- **Glass top** `rgba(255, 255, 255, 0.66)` and **Glass bottom** `rgba(255, 255, 255, 0.34)`: the vertical glass fill gradient.
- **Glass edge** `rgba(255, 255, 255, 0.85)`: the 1px glass border.
- **Glass highlight** `rgba(255, 255, 255, 0.95)`: the inset 1px top highlight.
- **Glass hairline** `rgba(11, 18, 32, 0.06)`: the inset 1px outline and internal dividers.
- **Core** `rgba(255, 255, 255, 0.82)`: the inner core of media frames and plates.
- **Skeleton** `rgba(11, 18, 32, 0.06)`: loading shapes and placeholder bars.
- **Shadow:** `0 1px 1px rgba(11,18,32,.03), 0 8px 24px -12px rgba(11,18,32,.08), 0 32px 80px -32px rgba(47,91,234,.28)`.

### Dark theme
- **Canvas** `#080C17`
- **Ink** `#EEF1F7`
- **Ink 2** `#A3ADBF`
- **Ink 3** `#8791A4` (lightened from `#6B7588`, ADR 0009)
- **Accent** `#8AA8FF` and **Accent ink** `#080C17`.
- **Dot** `rgba(238, 241, 247, 0.14)`
- **Orb 1** `rgba(47, 91, 234, 0.42)`, **Orb 2** `rgba(90, 130, 230, 0.26)`, **Orb 3** `rgba(70, 150, 230, 0.24)`.
- **Glass top** `rgba(40, 52, 80, 0.46)` and **Glass bottom** `rgba(20, 28, 48, 0.28)`.
- **Glass edge** `rgba(255, 255, 255, 0.10)`
- **Glass highlight** `rgba(255, 255, 255, 0.14)`
- **Glass hairline** `rgba(255, 255, 255, 0.05)`
- **Core** `rgba(14, 20, 36, 0.72)`
- **Skeleton** `rgba(238, 241, 247, 0.07)`
- **Shadow:** `0 1px 1px rgba(0,0,0,.2), 0 8px 24px -12px rgba(0,0,0,.5), 0 32px 80px -32px rgba(0,0,0,.7)`.

### Rules
- The accent covers at most about 5% of a viewport:
  - CTA fill, the arrow circle, metric unit superscripts, guide lines and nodes;
  - focus rings, the active nav dot, and the first skeleton bar in plates.
- Metric numbers themselves are **Ink**; only the unit (`%`, `x`) is in the accent. This restraint is part of the elegance.
- No other hues, no purple, no neon, no gradient text.
- Gradients appear only in the orbs, the glass fill, and the 2-stop accent wash inside media (from 20% down to 0%).

---

## 3. Typography

- **Sora**, weights **300, 400, 500** only, for all headings and metric values.
  - Light weights are the elegance lever.
  - 600 or more is banned.
- **Lato**, weights 400, 700 and 400 italic, for everything else.
- Headings use sentence case and `text-wrap: balance`. Body uses `text-wrap: pretty`.
- Keep short phrases together with non-breaking spaces (for example `0&nbsp;to&nbsp;1`).
- Emphasis inside a heading is a single word in Sora 500 inside a 400 heading (`<em>` styled `font-style: normal; font-weight: 500`). No color emphasis.

### Scale
- **Display (hero):** Sora 400, `clamp(2.75rem, 5.2vw, 4rem)`, line-height 1.04, tracking `-0.045em`, max 13.5ch.
- **Case bottom line:** Sora 400, `clamp(2rem, 3.2vw, 2.75rem)`, line-height 1.1, tracking `-0.04em`, max 28ch. (Tuned during the build: at the original size a 30-word bottom line ran six lines and pushed the unlock form below the fold.)
- **H2:** Sora 400, `clamp(1.875rem, 3.2vw, 2.625rem)`, line-height 1.12, tracking `-0.035em`.
- **H3 (card title):** Sora 500, `1.25rem`, line-height 1.3, tracking `-0.02em`.
- **Metric value:** Sora 300, `clamp(2.25rem, 3.6vw, 2.75rem)`, line-height 1, tracking `-0.04em`, tabular numbers. The unit is `<sup>` at 0.5em, in the accent, weight 400.
- **Wordmark:** Sora 500, `0.9375rem`, tracking `-0.015em`.
- **Lede:** Lato 400, `1.1875rem`, line-height 1.65, Ink 2, max 38ch.
- **Body:** Lato 400, `1.0625rem`, line-height 1.7, max 62ch.
- **Caption:** Lato 400, `0.84375rem`, line-height 1.5, Ink 2.
- **Label:** Lato 700, `0.6875rem`, tracking `0.14em`, uppercase, Ink 3.
  - Allowed for form labels, plus at most 1 eyebrow per 3 sections.

**Banned:** Inter, Space Grotesk, any serif, any mono, Sora 600 or heavier, all-caps headings, colored heading words.

---

## 4. Radius system (locked, generous)

Concentric rule: **inner radius = outer radius − padding.**

- **Pills** (nav, buttons, CTA, chips, toggle, inputs): `999px`.
- **Glass plates** (isometric): outer `36px`, 8px padding, core `28px`.
- **Media frames:** outer `32px`, 8px padding, core `24px`.
- **Glass panels** (metrics panel, locked form, about portrait card): `28px`.
- **Inside-core elements** (charts, small images inside a frame): `20px`.
- **Mobile phone screens:** `32px`.
- **Skeleton bars:** `999px`.
- Nothing is square-cornered, except full-bleed images inside a core, which inherit the core's radius through `overflow: hidden`.

`corner-shape: squircle` is not used. Chrome renders it visually tighter, and it is inconsistent across browsers.

---

## 5. Background system (the Atmosphere layer)

One `<Atmosphere />` component, rendered once in the root layout. It is `position: fixed; inset: 0; z-index: 0; pointer-events: none;`, and it is never attached to scrolling content. It has three layers, from back to front:

1. **Orbs.** Three circles with `filter: blur(80px)` and `will-change: transform`.
   - **Orb 1:** 720px, top-right (`right: -120px; top: -160px`), drifting `translate3d(-80px, 60px) scale(1.06)` over 48s.
   - **Orb 2:** 560px, low center-right (`right: 280px; bottom: -260px`), drifting `translate3d(60px, -50px) scale(0.96)` over 56s.
   - **Orb 3:** 520 by 420px, lower-left (`left: 40px; top: 520px`), sitting behind the metrics panel so the glass has light to blur. It drifts `translate3d(70px, -40px) scale(1.08)` over 64s.
   - All three use `ease-in-out infinite alternate`.
   - On case pages, orbs 1 and 3 move behind the bottom line and the metrics panel. The positions come from a prop.
2. **Isometric dot lattice.** Two `radial-gradient(circle, Dot 0 1px, transparent 1.4px)` layers, `background-size: 26px 45.04px`, `background-position: 0 0, 13px 22.52px`. That is a triangular lattice with side s = 26px and row height h = s·√3/2.
   - **Mask:** `radial-gradient(80% 90% at 70% 40%, #000 0%, rgba(0,0,0,.6) 45%, transparent 85%)`.
3. **Film grain.** An SVG `feTurbulence` noise at `opacity: 0.035` with `mix-blend-mode: overlay`.

**Scroll behavior:** the whole layer fades to 70% opacity after the first viewport, via Motion `useScroll` (opacity only).

---

## 6. Glass recipe (use the `.glass` utility, never ad hoc)

```css
background: linear-gradient(180deg, var(--glass-top), var(--glass-bottom));
backdrop-filter: blur(28px) saturate(170%);
border: 1px solid var(--glass-edge);
box-shadow: inset 0 1px 0 var(--glass-highlight), inset 0 0 0 1px var(--glass-hairline), var(--shadow);
```

- **Used on:** the pill nav, the mobile menu sheet, isometric plates, media frame shells, the metrics panel, the locked-case form panel, and the About portrait card.
- **Performance budget:**
  - At most 6 glass elements in any viewport.
  - Never on elements larger than 1200 by 800px.
  - Never nested (a glass element inside glass uses `Core`, not glass).
- **Fallbacks:**
  - When `@supports not (backdrop-filter: blur(1px))`, or under `prefers-reduced-transparency: reduce`, the fill is a solid color: `Core` at 96% opacity.

---

## 7. Components

### Pill nav
- **Position:** fixed and centered (`left: 0; right: 0; margin: 0 auto; width: max-content`), `top: 28px`.
  - Never center it with `translateX(-50%)`, because entrance transforms override it.
- **Style:** strong glass (the glass recipe at 88% to 76% opacity light, 90% to 84% dark, `surface-strong`) so links stay legible over any imagery; padding `6px 6px 6px 26px`, 30px gap.
- **Contents, left to right:**
  - the wordmark;
  - a glass divider: 1px Glass hairline plus a 1px Glass edge offset;
  - "Work" and "About" (Lato 400, 15px, Ink 2; Ink on hover);
  - the theme toggle, a 36px round icon button with Lucide `Moon` or `Sun`;
  - "Get in touch" as the compact primary button (see Buttons).
- **On scroll** past 80px, the padding tightens by 2px and the shadow deepens. It uses the slow spring from section 8.
- **Active page:** a 4px accent dot 6px below the link.
- **Mobile, under 768px:**
  - The pill holds the wordmark and a 40px menu button with two lines that morph into an X.
  - The button opens a full-screen strong-glass sheet (blur 40px). Links stagger in (Sora 400, 2rem), then the toggle, then a full-width primary "Get in touch" last.
  - Opening moves focus to the first link and makes the page behind inert; Escape closes and returns focus to the button.

### Buttons
- **Primary** ("View work", "Unlock", "Email me", the nav's "Get in touch"). The only primary style on the site:
  - Ink fill with Canvas text, inverted in dark mode.
  - Padding `7px 7px 7px 26px`, Lato 700, 16px.
  - Shadow `0 12px 32px -12px rgba(11,18,32,.35)`.
  - A nested 38px accent circle with the Lucide `ArrowRight` icon.
  - **Hover:** the circle drifts `translate(3px, -1px)` and scales to 1.06 over 900ms (slow ease).
  - **Active:** the button scales to 0.98.
- **Compact primary** (nav only): the same button at padding `5px 5px 5px 20px`, 15px text, a 34px arrow circle, no drop shadow.
- **Arrow circles** (work cards, next case): the same 44px accent circle, always visible, drifting right on hover.
- **Text link:** Ink, with a 1px underline in Glass hairline, offset 4px. On hover the underline turns to Accent over 600ms.

### Media frame
- **Shell:** glass, 8px padding, radius 32px.
- **Core:** `Core` fill, radius 24px, `overflow: hidden`, inset 1px Glass hairline.
- **Screenshots** sit on the accent wash inside the core.
- **Hover** (linked frames only): the media scales to 1.025 over 1200ms (slow ease), and the shell shadow deepens.

### Asset kinds (content `kind`)
- **`screenshot`:** a desktop UI inside the frame. Optional annotations are 24px accent nodes (a dot with an 18% accent halo). Callout captions sit below the frame, never over it.
- **`isometric`:**
  - 1 to 3 screenshots as **glass plates** (`rotateX(54deg) rotateZ(-40deg)`, 500px wide at desktop), offset 210px down and 80px right per plate.
  - Joined by 1px dashed accent guides (60% opacity) that end in glowing 7px nodes.
  - Plates **float** ±10px over 12s, ease-in-out, infinite, with the second plate phase-shifted by −6s.
  - Used in the hero and case headers only, at most one per page.
  - Under 768px, a flat media frame replaces it.
- **`mobile`:** 2 to 4 phone screens on the wash, radius 32px, a Glass hairline, and a staggered vertical offset (0, 24px, 12px). No device chrome.
- **`photo`:** desaturated by 12%, with a 4% accent overlay.
- **`diagram`:** an isometric SVG line illustration with 1.25px accent strokes. Faces are filled with `Core` at 60%, and small glass-like highlights sit on the top edges.
- **`compare`:** a before and after slider with a 1px accent divider and a 36px glass pill handle. It works from the keyboard (arrow keys, 5% steps).
- **`video`:** muted, looping and `playsinline`, with a poster. It pauses off-screen, and under reduced motion only the poster shows.
- **Dark mode:** an optional `srcDark` per asset. Without one, raster media get `media`: brightness 0.84, contrast 1.04 in dark mode, so light screenshots do not glare.
- **Crops:** screenshots and plates anchor to the top-left, where product UIs keep their titles and navigation.

### Metrics panel
- A glass panel with radius 28px and padding `28px 32px`, containing 2 to 3 columns with a 28px gap.
- **Value:** Sora 300, with an accent `<sup>` unit.
- **Label and context:** Lato 13.5px, Ink 2. The context line comes after the label.
- Under 768px, the metrics stack as rows with Glass hairline dividers.

### Chips (status)
Static status only, never actions or filters ("Password protected" on cards and the locked header). Pill, `Core` fill, Lato 400 at 13.5px, Ink 2, `6px 12px`, optional 14px icon. Scope renders as labelled plain text, not chips.

### Locked-case form
- A glass panel with radius 28px, max 460px wide.
- The "Password" label sits above a pill input: Core fill, Glass hairline, 52px tall, with a 2px accent focus ring at a 3px offset.
- The "Unlock" primary button sits inline on desktop and below the input on mobile.
- **Error:** inline, with the Lucide `CircleAlert` in the accent and Ink text: "That password did not work."
- While checking, the button reads "Checking".
- Below the form: "No password? Ask me for one" (to `#contact`), then a hairline and links to the open (public) cases, so the page is never a dead end.
- The header shows a "Password protected" chip beside the company and year; once unlocked, the full case shows "Unlocked · Lock cases" in the same place.

### Icons
- **[Lucide](https://lucide.dev/icons/)** via `lucide-react` (user choice, ADR 0007).
- **`strokeWidth={1.5}` everywhere**, to match the Sora light headings. The default of 2 reads too heavy.
- 18px in UI and 20px in the nav, with `currentColor` and `absoluteStrokeWidth` off.
- The full set: `ArrowRight`, `ArrowUpRight`, `Sun`, `Moon`, `Lock`, `LockOpen`, `CircleAlert`, `Menu`, `X`. New icons are added to this list first.
- One `<Icon />` wrapper sets the size and stroke, so no call site sets them ad hoc.
- No other icon library and no hand-rolled icons. The morphing menu lines in the mobile nav are an animation, not an icon.

---

## 8. Motion (slow, weighted, elegant)

- **Engine:** `motion/react` in client leaf components. CSS keyframes are used for the ambient layer (orbs and plate float).
- **Slow ease:** `cubic-bezier(0.16, 1, 0.3, 1)`, the default for all tweens.
- **Slow spring:** `{ type: "spring", stiffness: 70, damping: 20, mass: 1 }`, for nav and plate interactions.
- **Entry reveal ("rise"):**
  - From `opacity 0, y 20px, blur 8px` to `opacity 1, y 0, blur 0`.
  - **1400ms**, slow ease, triggered once in view (amount 0.25).
  - Siblings stagger by **140ms**, and the first element waits 200ms.
- **Hero choreography:**
  - The nav rises first.
  - Then, 140ms apart: the headline, the lede, and the button together with the isometric stage, then the metrics panel.
- **Ambient:** orbs drift over 48 to 64s. Plates float over 12s. Neither may be faster.
- **Hover:** 600 to 1200ms, as specified per component. Nothing snaps.
- **Theme switch:** colors cross-fade over 400ms.
- **Page transitions:** new content rises in (the same rise); there is no exit animation.
- **Banned:**
  - durations under 400ms for anything decorative;
  - linear easing, bounce or overshoot;
  - marquees, text parallax, scroll hijacking, custom cursors;
  - animating layout properties;
  - `window.addEventListener('scroll')`.
- **Reduced motion:** rise becomes an instant show, and orbs, plate float, parallax and hover transforms are disabled. Videos show their poster.

---

## 9. Layout

- **Container:** `max-width: 1280px`, with padding of `24px` (mobile), `48px` (tablet) and `112px` (desktop, at 1440px wide).
- **Section rhythm:** `clamp(7rem, 14vw, 11rem)` of vertical padding. The whitespace is intentional; never fill it.
- **Hero:** two equal columns. Text on the left; the isometric stage on the right, 640px tall. It uses `min-height: 100dvh`, and the content starts at most 24px below the nav's clear zone.
- **Selected work:** an asymmetric bento with exactly 4 cells.
  - The lead case spans 7 of 12 columns and 2 rows; 3 companions share the remaining 5 columns.
  - A 28px gap. Mixed asset kinds.
- **Case page:**
  - Header: the bottom line plus the metrics panel (7 columns) beside the isometric or flat frame (5 columns).
  - Then a meta and chips row.
  - Then 3 beats as text columns separated by Glass hairlines.
  - Then an asymmetric artifacts gallery.
  - Then "Ask me about", then the next case.
- **Mobile, under 768px:** one column with a 24px gap. Isometric becomes flat, touch targets are at least 44px, and nothing scrolls horizontally.

---

## 10. Dark mode

- Follows the system by default; the nav toggle overrides and persists via `next-themes` (`attribute="data-theme"`), with no flash on load.
- All tokens are CSS variables swapped under `[data-theme="dark"]`. Tailwind v4 uses `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *))`.
- A page is always entirely one theme.
- Both themes pass WCAG AA: body text at least 4.5:1, large text and metric values at least 3:1.

---

## 11. Fidelity contract (how this lands in the real build)

1. **Tokens are copied, not reinterpreted.**
   - `themes/blueprint/theme.css` defines every variable from section 2 under `:root` and `[data-theme="dark"]`, with exactly these values. (The design language is a swappable layer: [ADR 0008](docs/decisions/0008-design-language-layer.md), [docs/theming.md](docs/theming.md).)
   - The glass recipe (exposed as the contract utility `surface`), the dot lattice, the orbs, the grain and the rise are ported verbatim from `design/preview/blueprint.html`.
   - Name mapping from this spec to code: Glass hairline is `--hairline`; `.glass` is `surface`; the deeper scrolled or hovered shadow is `surface-deep`; glass that carries text over imagery (nav) is `surface-strong`; the mobile sheet is `surface-sheet`; the dark-mode image treatment is `media`.
2. **Components follow the reference.** These are the only way the patterns appear. No one-off glass, shadows or radii.
   - `Atmosphere` and the isometric `Signature` (the plates) live in `themes/blueprint/`.
   - `Panel` and `Frame` are the glass panel and media frame, in `components/ui/`.
   - `Nav` is the pill nav; `MetricsPanel` and `Rise` complete the set.
   - Glass surfaces take a `rise` index instead of being wrapped in `Rise`. An animating ancestor (opacity or filter) becomes the backdrop root and flattens the glass.
3. **Screenshot comparison gate.**
   - The `pnpm shots` script (Playwright) captures `/`, one case page and the locked page, at 1440 by 900 and 390 by 844, in light and dark.
   - The captures go to `design/shots/`.
   - Before the `home` todo is marked done, the home hero capture is compared side by side with `design/preview/blueprint.png` and noted in `docs/progress.md`.
   - Any visible difference in glass, dots, radii, type weight or spacing is fixed first.
4. **Checklist, run before any UI todo is marked done:**
   - [ ] All four signature ingredients are visible in the first viewport.
   - [ ] Headings use Sora 300 to 500 only. The hero headline is 2 or 3 lines, with no orphan word.
   - [ ] Every container uses the radius from section 4, and the concentric rule holds.
   - [ ] All glass uses `.glass`. At most 6 glass elements per viewport, none nested.
   - [ ] Every reveal is 1400ms with a 140ms stagger. Nothing decorative is faster than 400ms.
   - [ ] Orbs sit behind every glass panel on the page, so the frost is visible.
   - [ ] Reduced motion and reduced transparency fallbacks work.
   - [ ] The design-taste-frontend pre-flight passes.

---

## 12. Anti-patterns (banned)

- **Content:**
  - No emojis, no em-dashes in UI copy, no career-level or job-move framing.
  - No filler adjectives.
  - No Acme or John Doe.
  - No fake round numbers.
- **Visual:**
  - Flat, opaque cards: every surface is glass or core.
  - Sharp or small radii.
  - Line grids: the lattice is dots only.
  - Heavy font weights, colored heading words, gradient text.
  - Purple, neon, glow shadows, pure black.
- **Layout and motion:**
  - A centered hero, 3 equal cards, split headers.
  - Section numbering, scroll cues, logo walls, testimonial carousels, skill bars.
  - Captions or text over media.
  - Fast or snappy motion.
