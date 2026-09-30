# Design System: Blueprint

**Skills:**
- Written with `stitch-design-taste`.
- Built with `design-taste-frontend` (pre-flight), `high-end-visual-design` (double-bezel frames, pill nav, motion) and `image-to-code` (section references in `design/refs/`).

**Decision record:** [docs/decisions/0002-style-direction.md](docs/decisions/0002-style-direction.md)

**Visual references:**
- [design/directions/round-3/](design/directions/round-3/README.md): layout and asset types.
- [design/preview/accent.png](design/preview/accent.png): real fonts and colors, light and dark.

This file is the single source of truth for every visual decision. If code and this file disagree, this file wins. Change this file (and add an ADR) before changing the look.

---

## 0. Dials

- **Design variance: 6.** Offset and asymmetric, but calm. No artsy chaos.
- **Motion intensity: 5.** Fluid and physical, never theatrical.
- **Visual density: 3.** Gallery-airy: whitespace is the main material.

---

## 1. Visual theme and atmosphere

A clean, modern and precise interface that feels like a well-lit architecture studio at dawn. Content floats over a faint **isometric blueprint grid** that fades out toward the edges, lit by **one soft cobalt glow** per view. Product work is presented as physical objects:
- Screenshots sit in machined double-bezel frames.
- On key moments, screenshots lift into **exploded isometric plates** joined by dashed guide lines, the visual signature of a systems thinker.

Navigation is a **floating frosted pill**. Typography is confident and geometric in headings, and warm and highly readable in body text. Everything breathes.

It must feel: modern, professional, calm confidence, engineered elegance.
It must never feel: techy or sci-fi, loud, templated, dense.

---

## 2. Color palette and roles

One accent family: **Blueprint Cobalt.** Named after real blueprints; it reads as professional and precise, and holds up in dark mode.

### Light theme (default when the system is light)
- **Canvas Mist** (`#F7F9FC`): page background.
- **Pure Surface** (`#FFFFFF`): media frame inner core, cards, locked form.
- **Blueprint Ink** (`#0B1220`): headings and primary text. Never pure black.
- **Slate Secondary** (`#5B6474`): body secondary, lede, captions. Passes AA on Canvas Mist.
- **Slate Tertiary** (`#8A93A3`): timestamps and disabled states only. Never body text.
- **Hairline** (`rgba(11, 18, 32, 0.08)`): 1px structural lines, frame borders, dividers.
- **Blueprint Cobalt** (`#2F5BEA`): the single accent, used for primary CTAs, metric numbers, links on hover, focus rings, guide lines and the active nav state.
- **Cobalt Ink** (`#FFFFFF`): text on cobalt fills.
- **Grid Line** (`rgba(47, 91, 234, 0.075)`): isometric grid strokes.
- **Cobalt Glow** (`rgba(47, 91, 234, 0.16)`): radial background glow.
- **Glass** (`rgba(255, 255, 255, 0.72)`): pill nav fill, with a 16px backdrop blur.
- **Tinted Shadow** (`0 24px 60px -24px rgba(47, 91, 234, 0.22)`): media frames and the nav. The only shadow in the system.

### Dark theme (default when the system is dark)
- **Canvas Night** (`#0A0F1C`): page background. Deep ink navy, never pure black.
- **Night Surface** (`#111827`): frame inner core, cards.
- **Paper Ink** (`#E8ECF4`): headings and primary text.
- **Slate Secondary** (`#9AA5B8`): body secondary, lede, captions.
- **Slate Tertiary** (`#6B7588`): timestamps and disabled states only.
- **Hairline** (`rgba(232, 236, 244, 0.10)`)
- **Blueprint Cobalt Light** (`#7A9BFF`): the accent in dark mode, in the same roles as light mode.
- **Cobalt Ink** (`#0A0F1C`): text on cobalt fills.
- **Grid Line** (`rgba(122, 155, 255, 0.07)`)
- **Cobalt Glow** (`rgba(47, 91, 234, 0.30)`)
- **Glass** (`rgba(17, 24, 39, 0.66)`)
- **Tinted Shadow** (`0 24px 60px -24px rgba(0, 0, 0, 0.60)`)

### Color rules
- The accent is used on at most about 5% of any viewport. It is a signal, not a fill.
- There are no other hues. Status colors are not needed on a portfolio. The error text on the unlock form uses the accent plus an icon, not red. The only exception is color inside real product screenshots.
- No purple, no neon, no gradient text, no multi-stop rainbow gradients.
- Gradients are allowed in exactly two places:
  - the background glow;
  - a subtle 2-stop cobalt wash (from 0% to 22% opacity) behind screenshots inside media frames.

---

## 3. Typography rules

- **Display and headings: Sora** (`next/font/google`, weights 500 and 600).
  - Geometric and slightly wide, with tight tracking. Hierarchy comes from weight and size, never all caps.
  - Headings use sentence case.
  - Use `text-wrap: balance` on all headings so no single word sits alone on the last line.
- **Body and UI: Lato** (`next/font/google`, weights 400 and 700, with 400 italic).
  - Relaxed leading, at most 65ch per line.
  - Lato is used for nav links, buttons, captions, labels and form text.
- **No mono font.** Metadata uses Lato with tabular numerals (`font-variant-numeric: tabular-nums`).

### Scale
- **Display (hero):** Sora 600, `clamp(2.5rem, 5vw, 4rem)`, line-height 1.06, tracking `-0.035em`. At most 2 lines on desktop.
- **Case bottom line:** Sora 600, `clamp(2rem, 3.6vw, 3rem)`, line-height 1.1, tracking `-0.03em`.
- **H2 (section):** Sora 600, `clamp(1.75rem, 3vw, 2.5rem)`, line-height 1.15, tracking `-0.025em`.
- **H3 (card title):** Sora 600, `1.25rem`, line-height 1.3, tracking `-0.015em`.
- **Metric value:** Sora 600, `clamp(2rem, 3.5vw, 2.75rem)`, line-height 1, tracking `-0.03em`, tabular numbers, in accent color.
- **Lede:** Lato 400, `1.1875rem`, line-height 1.6, Slate Secondary.
- **Body:** Lato 400, `1.0625rem`, line-height 1.65.
- **Small and caption:** Lato 400, `0.875rem`, line-height 1.5, Slate Secondary.
- **Label:** Lato 700, `0.75rem`, tracking `0.12em`, uppercase.
  - Allowed only for form labels and for at most 1 eyebrow per 3 sections.

### Banned
Inter, Space Grotesk, any serif, any mono, all-caps headings, and mixed-family emphasis. For emphasis, use Sora 600 against 500, or Lato italic.

---

## 4. Radius system (locked)

- **Interactive elements are full pills:** nav, buttons, chips, the theme toggle, and the password input.
- **Media frames:** the outer shell is `24px` and the inner core `18px`, with a `6px` shell padding.
- **Small containers** (locked-page form panel, metric tiles, if ever used): `16px`.
- Nothing else is rounded. Nothing is square-cornered except full-bleed images.

---

## 5. Background system

The **Blueprint Layer** is one `position: fixed; inset: 0; pointer-events: none; z-index: 0` element rendered once in the root layout. It is never attached to scrolling containers.
- **Isometric grid:** 3 `repeating-linear-gradient`s of `Grid Line`, at `30deg` and `150deg` (40px period) and `90deg` (46px period), each with a 1px stroke.
- **Mask:** `radial-gradient(90% 90% at 75% 30%, #000 10%, transparent 75%)`. The grid is strongest behind the hero visual and invisible at the edges and behind body copy.
- **Glow:** one radial `Cobalt Glow` circle about 820px across, anchored bottom-right of the first viewport. Case pages anchor it top-right, behind the bottom line.
- The layer does not animate. On scroll, it can fade to 60% opacity via Motion `useScroll` (a transform or opacity change only).
- The reference implementation is in `design/preview/accent.html`.

---

## 6. Components

### Pill nav
- **Position:** fixed, centered, `top: 20px`, detached from the edges. Height at most 56px.
- **Style:** Glass fill, 16px backdrop blur, Hairline border and Tinted Shadow.
- **Contents, left to right:**
  - "Patryk Karolak" wordmark (Sora 600), with a hairline divider after it.
  - "Work" and "About" links (Lato 400).
  - Theme toggle: a 36px icon button with Phosphor `Sun` / `Moon`.
  - "Get in touch" pill (cobalt fill, Lato 700).
- **On scroll** past 80px, the pill tightens its padding and slightly strengthens the glass fill (spring).
- **Mobile, under 768px:** the pill holds the wordmark and a menu button. The menu button is two lines that morph into an X. It opens a full-screen Glass sheet (blur 24px); the links stagger in (translateY 24px to 0, 60ms stagger). "Get in touch" is the last item, as a full-width pill.
- **Active page:** the link gets a 4px cobalt dot under it.

### Buttons
- **Primary** ("View work", "Unlock"):
  - Blueprint Ink fill with Canvas text. In dark mode, the inverse: Paper Ink fill with Night text.
  - Pill shape, padding `8px 8px 8px 24px`.
  - Trailing arrow in a nested 36px cobalt circle (button-in-button).
  - On hover, the inner circle moves `translate(2px, -1px)` and scales to 1.05. On active, the button scales to 0.98.
- **Accent pill** ("Get in touch"): Cobalt fill, Cobalt Ink text. Hover lightens it by 6%.
- **Text link:** Blueprint Ink with a 1px hairline underline offset by 4px. On hover, the underline turns cobalt.
- Buttons never glow, and labels never wrap.

### Media frame (double bezel)
Every asset uses this frame:
- **Outer shell:** `color-mix(surface 60%, transparent)`, Hairline border, 6px padding, 24px radius, Tinted Shadow.
- **Inner core:** Surface fill, Hairline border, 18px radius, `overflow: hidden`.
- **Behind screenshots:** the optional 2-stop cobalt wash.
- **Hover** (only when the frame is a link): the media scales to 1.02 inside the core over 700ms.

### Asset kinds (content `kind`)
- **`screenshot`:** a desktop UI in the frame. Optional annotations are 22px cobalt numbered dots with 1px leader lines; their captions sit below the frame, never over it.
- **`isometric`:** 1 to 3 screenshots as plates, `rotateX(55deg) rotateZ(-38deg)`, offset down the stack, joined by 1.5px dashed cobalt guides at 70% opacity. Used in the hero and case headers only, at most one per page.
  - On scroll, the plates separate by up to 24px (parallax spring).
  - Under 768px, a flat single screenshot replaces this.
- **`mobile`:** 2 to 4 phone screens side by side on the wash, each with a 28px radius and a hairline border. There are no device-chrome mockups.
- **`photo`:** documentary photos, desaturated by 15% with a 4% cobalt overlay, so they sit in the palette.
- **`diagram`:** isometric SVG line illustrations: 1.5px strokes in the accent, fills in Surface at 70% opacity, labels in Lato small.
- **`compare`:** a before and after slider with a 1.5px cobalt divider and a 32px pill handle, operable from the keyboard.
- **`video`:** a muted, looping, `playsinline` video with a poster. It pauses when off-screen, and under reduced motion it shows only the poster.
- **Dark mode:** any asset can provide an optional `srcDark`. Screenshots without one keep their light UI; the frame and wash carry the theme.

### Chips (scope)
Pill shape, Hairline border, transparent fill, Lato 400 at `0.875rem`, Slate Secondary text, `6px 14px` padding. There is no colored fill.

### Metrics
- Values sit on a Hairline top border, in 2 to 3 columns with a 24px gap. There are no cards around them.
- Each has three lines: the value (Sora, accent), the label (Lato 700, Ink) and the context (Lato small, Secondary).
- Under 768px, they stack as rows separated by hairlines.

### Locked-case form
- A 16px-radius Surface panel with a Hairline border, at most 440px wide, below the teaser content.
- The label "Password" sits above the pill input. Focus shows a 2px cobalt ring with a 2px offset.
- The "Unlock" primary button sits next to the input on desktop and below it on mobile.
- Errors show inline below: a Phosphor `WarningCircle` icon in the accent with Ink text: "That password did not work."
- Below: "No password? Get in touch." as a text link.

### Icons
Phosphor (`@phosphor-icons/react`), **regular** weight everywhere, 18px in UI and 20px in the nav. Only these: `ArrowRight`, `ArrowUpRight`, `Sun`, `Moon`, `Lock`, `LockOpen`, `WarningCircle`, `List`, `X`. Hand-rolled SVG icons are not allowed; diagrams are not icons.

---

## 7. Layout principles

- **Container:** `max-width: 1280px`, centered, with padding of `24px` (mobile), `40px` (tablet) and `64px` (desktop).
- **Section rhythm:** vertical padding `clamp(6rem, 12vw, 10rem)`. The hero uses at most `pt-24` below the nav.
- **Hero:** split into text (7 of 12 columns) and the isometric visual (5 of 12). It fits in `min-height: 100dvh` and never uses `h-screen`.
- **Selected work:** an asymmetric bento with exactly 4 cells. The lead case spans 7 columns and 2 rows; 3 companions stack in the other 5 columns. Each cell's media uses a different asset kind where possible. Uses `grid-auto-flow: dense`.
- **Case page:**
  - The header is split into the bottom line and metrics (7 columns) and the isometric or screenshot visual (5 columns).
  - The meta and scope block is a single row.
  - The beats are 3 columns on desktop, which is allowed because they are text columns separated by hairlines, not cards.
  - The artifacts gallery is asymmetric: one large frame plus 1 or 2 smaller ones.
- **Mobile, under 768px:**
  - Every multi-column layout collapses to one column with a 24px gap.
  - Isometric visuals become flat frames.
  - Touch targets are at least 44px, and nothing scrolls horizontally.
- CSS Grid everywhere; no flex percentage math.

---

## 8. Motion and interaction

- **Engine:** `motion/react`, in client leaf components only.
- **Default spring:** `stiffness: 120, damping: 22`.
- **Default ease:** `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Entry reveal:** `opacity 0 to 1` and `translateY 16px to 0` over 700ms, triggered once via `whileInView` (amount 0.3). Groups stagger by 80ms. Nothing appears un-animated above reduced-motion.
- **Isometric plates:** slight separation on scroll (up to 24px) and an entrance where the plates settle from 40px apart.
- **Nav:** the pill tightens on scroll (spring), and the mobile menu uses the morphing burger with staggered links.
- **Hover:** media scales to 1.02, and CTAs use the inner-circle nudge.
- **Theme switch:** colors cross-fade over 200ms, with no layout change.
- **Banned:**
  - perpetual loops, marquees, parallax on text, scroll hijacking, custom cursors;
  - animating `top`, `left`, `width` or `height`;
  - `window.addEventListener('scroll')`.
- **Reduced motion:** all entrance, parallax and hover transforms are disabled, and videos show their poster.

---

## 9. Dark mode

- **Default:** the system preference (`prefers-color-scheme`). The toggle in the pill nav overrides it and persists in `localStorage`.
- **Implementation:** `next-themes` with `attribute="data-theme"`, so there is no flash on load.
- **Tokens:** everything is a CSS variable, swapped under `[data-theme="dark"]`. Tailwind v4 uses `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *))`.
- A page is always entirely one theme; no section inverts.
- Both themes pass WCAG AA:
  - Body and secondary text are at least 4.5:1.
  - Large headings and metric values are at least 3:1.
  - Cobalt on canvas is used only for large or bold text.

---

## 10. Anti-patterns (banned)

- **Content:**
  - No emojis.
  - No em-dashes in UI copy.
  - No career-level or job-move framing.
  - No "elevate / seamless / unleash / passionate."
  - No Acme or John Doe; companies and colleagues are fictional but realistic.
  - No fake round numbers; metrics are specific and carry context.
- **Visual:**
  - No Inter, no serif, no mono, no all-caps headings.
  - No purple, no neon, no glow shadows, no gradient text.
  - No pure black.
- **Layout and chrome:**
  - No centered hero, no 3 equal cards, no split headers.
  - No section numbering, no locale, time or weather strips, no scroll cues.
  - No logo walls, testimonial carousels or skill bars.
  - No overlapping text on images; captions always sit below media.
  - No backdrop blur on scrolling content, only on the nav and the mobile sheet.
