# Progress

Status log and handoff. Newest entry on top. Every todo ends with an entry here, then a commit and a push.

## Checklist

- [x] `repo-setup`: branch `main`, `.gitignore`, origin, first push
- [x] `docs-foundation`: AGENTS.md, CLAUDE.md, docs hub, plan, progress, brief, ADR 0000 + 0001
- [x] `direction-concepts`: 2 reference images per style direction in `design/directions/`
- [x] `direction-lock`: user picks, `DESIGN.md` + ADR 0002
- [x] `section-refs`: skipped by decision; the user said "let's build" and the build was compared against `design/preview/blueprint.html` plus `pnpm shots` instead
- [x] `scaffold`: Next.js 16 + Tailwind v4 + Motion + lucide-react + zod + next-themes + Playwright, design-language layer (ADR 0008). Vercel import still to do by the user (see operations.md)
- [x] `content-model`: zod schema with budgets, `site.ts`, 4 placeholder projects, ADR 0003
- [x] `shell`: layout, nav, footer, contact, motion primitives, atmosphere layer
- [x] `home`: hero, selected work, approach, contact
- [x] `case-pages`: `/work/[slug]` full case layout
- [x] `gating`: unlock, signed cookie, proxy, locked page, protected media, ADR 0004
- [x] `about`: `/about`
- [x] `assets`: covers and artifacts for all 4 cases
- [x] `share-seo`: metadata, OG images, sitemap, robots, analytics
- [ ] `qa`: done: shots gate, overflow check, gating leak tests, README. Left: taste pre-flight write-up, keyboard and screen reader pass, Lighthouse on a Vercel preview
- [ ] `docs-final`: done: architecture, theming, content guide, operations. Left: ADR 0005, `pnpm docs:check`, final handoff entry

Round 8 (block library and Dusk):

- [x] `dusk-comps`, `adrs-contract`, `dusk-theme`
- [x] `content-schema`: block schemas with budgets, `site.ts` rewritten, `content/kit.ts`
- [x] `blocks`: `components/blocks/`, `lib/blocks.ts`
- [x] `interactions`: Modal, Toaster, CommandMenu, `press`, page transitions and cover morph
- [x] `kit-page`: `/kit`
- [x] `compose`: Home and About from blocks, contact per page
- [x] `verify-docs`: checks under both themes, axe, interactions, shots, docs
- [ ] Phase 3, the personal touch: hobbies in the Showcase, personal copy. No kudos.

---

## 2026-10-01: a snappy shake when the row comes into view

- **Agent:** Cursor agent (Claude)
- **Done:** The swipe row's nudge became a quick shake (0.6s, left, overshoot, settle) that waits until the row is dealt and at least 85% in view, instead of a slow glide half a second after the deal wherever the visitor was. It comes with a light haptic tap where allowed (`lib/haptic.ts`: Vibration API, or the iOS 18 switch haptic), and tapping a suit marker gives a lighter one. New motion token `shake` in the contract and both themes (ADR 0030 amended).
- **Verified:** lint, typecheck, `theme:check` under both themes, build; on an iPhone 13 emulation nothing plays at the top of the page, the shake starts about 250ms after scrolling the row into view and calls the vibration once, and a marker tap calls it again.

## 2026-10-01: fast taps always get the overlay on phones

- **Agent:** Cursor agent (Claude)
- **Done:** Fast taps on a phone sometimes opened the dictionary as an anchored pop-over, because the overlay depended on the tap reporting itself as touch. The overlay is now also chosen on any narrow device that cannot hover (`(hover: none)`), and mouse-type pointer events only count as hover on devices that can hover, so a tap reported as a mouse can neither be ignored nor close the card.
- **Verified:** lint, typecheck, build; on an iPhone 13 emulation a real tap, a click with no pointerdown, a tap reported as mouse and a burst of fast taps all end in the overlay; a mouse hover in a 600px desktop window still gets the anchored card.

## 2026-10-01: the swipe row shows it scrolls

- **Agent:** Cursor agent (Claude)
- **Done:** On narrow screens the card row gets suit markers underneath (the current card's suit lights up in its colour; tapping one jumps to its card) and a one-time nudge after the deal that slides the row 64px and back ([ADR 0030](decisions/0030-swipe-row-hints.md)).
- **Verified:** lint, typecheck, build; on an iPhone 13 emulation the nudge plays once, the markers track swipes to both ends, tapping Teaching scrolls there and keeps it current.

## 2026-10-01: tooltips in a narrow desktop window

- **Agent:** Cursor agent (Claude)
- **Done:** Hero tooltips (dictionary terms and company notes) chose the centred phone card by window width alone. In a narrow desktop window a mouse hover opened the scrim under the pointer, which ended the hover, closed the card and reopened it in a loop. The centred card is now used only when a term is tapped (touch or pen) on a narrow screen; a mouse or keyboard always gets the anchored card, which already narrows to the window.
- **Verified:** lint, typecheck, build; at 600px wide a hovered term stays open with no scrim for 1.2s, company notes too; on an iPhone 13 emulation a tap opens the centred card and a tap closes it.

## 2026-10-01: cleaner light card colours

- **Agent:** Cursor agent (Claude)
- **Done:** Light mode washes were muddy (muted hues over grey paper). They are now clean pastels at 10 to 13% (pink, apricot, sky blue, mint, lavender), the paper is near white (Dusk `#F8F9FB`, Blueprint `#F7F9FC`) and the linen grain is fainter. The light card back is rebalanced to the new paper and both backs are renamed `back-clean-*` so caches refetch them. Dark mode is unchanged (ADR 0028 amended).
- **Verified:** `theme:check`, build, hero and hand in light and dark, axe colour contrast in both modes.

## 2026-10-01: no watch on the pointing hand

- **Agent:** Cursor agent (Claude)
- **Done:** Edited the After hours stand-in so the pointing wrist is bare and the watch sits on the relaxed arm (`patryk-wink`, replaces `patryk-wink-point`). Cut out like the others.
- **Verified:** build; the After hours card in dark and light.

## 2026-10-01: a side-on tango invitation for Night

- **Agent:** Cursor agent (Claude)
- **Done:** Regenerated the Night stand-in (`patryk-tango-embrace`, replaces `patryk-tango-invite`): a three-quarter turn, leaning in a little, one hand raised and the other at shoulder-blade height in an open embrace, inviting someone across the room to dance. Cut out like the others.
- **Verified:** build; the Night card in dark and light.

## 2026-10-01: the day deck is live

- **Agent:** Cursor agent (Claude)
- **Done:** Generated two stand-in photos from the arms-crossed portrait, same shirt, light and framing: After hours winks and points at the viewer (`patryk-wink-point`), Night smiles with arms open in a tango invitation (`patryk-tango-invite`, since replaced). Both are cut out with Apple Vision like the main photo and set as `photo` with `cutout` on their intro rows, so the face deck now shuffles through three cards. Replace them with real shots when available (same file names or new ones in `content/site.ts`).
- **Verified:** build; the three cards in dark and light at 1440 × 900.

## 2026-10-01: cooler card backs

- **Agent:** Cursor agent (Claude)
- **Done:** Both card backs (`public/cards/back-milonga-{light,dark}.jpg`, renamed `back-champagne-*` so image caches refetch them) were still yellow from the gold filete. The gold is muted to a soft champagne (hue 37 to 70°, saturation down about 60%), the orange reds of the dress and flowers are shifted toward the card crimson, and skin tones are only lightly touched.
- **Verified:** side-by-side of both backs and a close-up of the dancers.

## 2026-10-01: cold crimson and balanced washes

- **Agent:** Cursor agent (Claude)
- **Done:** `--card-red` is a darker, colder crimson in both themes and modes (Dusk light `#9A1F36`, dark `#D9566B`, was brick and salmon). The suit washes were retuned to match: a cool rose, a muted sand, slate blue, sage and lavender at similar strength (ADR 0028 amended).
- **Verified:** `theme:check`, build, hero and hand in light and dark, axe colour contrast in both modes.

## 2026-10-01: no shaded lettering

- **Agent:** Cursor agent (Claude)
- **Done:** Removed every decorative text shadow ([ADR 0029](decisions/0029-no-lettering-shade.md)): `filete-shade` is gone from both themes and the contract, from section headings, the About teaser headline, card titles, tooltip terms and "gotan soul". `hero.shade` is removed from the schema and content. The `Filete` hairline stays.
- **Verified:** lint, typecheck, `theme:check` under both themes, build, home hero and hand in dark and light.

## 2026-10-01: cut-out photo on the face card

- **Agent:** Cursor agent (Claude)
- **Done:** The hero photo lost its background (Apple Vision's foreground mask, edge pulled in 1px against the wall's fringe) and is saved as `public/about/patryk-arms-crossed-cutout.png`. A new optional `cutout` on `avatar` and on row photos makes the face card show it standing on the bottom edge and filling the card on its suit's wash, with the corners drawn over it. The nav keeps the original photo.
- **Verified:** lint, typecheck, build, close-ups of the card in dark and light.

## 2026-10-01: suit tints on the aces

- **Agent:** Cursor agent (Claude)
- **Done:** Every playing card now prints on a soft wash of its suit's colour: hearts rose, diamonds amber, spades blue, clubs green, the joker violet ([ADR 0028](decisions/0028-suit-tints.md)). `face-tint` became `card-tint` with five named tints in both themes. The face deck uses the same map, so Day is ♦ amber, After hours ♥ rose and Night ♠ blue.
- **Verified:** lint, typecheck, `theme:check` under both themes, build, hand captures in dark and light, axe colour contrast on the home page in both modes.

## 2026-10-01: colder card paper in light mode

- **Agent:** Cursor agent (Claude)
- **Done:** In light mode the playing cards were too yellow. The paper is now a cool off-white (`--card-face` Dusk `#F0F2F5`, Blueprint `#EEF1F7`, was cream). Dusk's card edge, grain and shadow went from warm brown to slate, and the light face-card washes for Day and After hours are softer. The light card back (`public/cards/back-milonga-light.jpg`) is white-balanced to the new paper. Dark mode is unchanged.
- **Verified:** `theme:check`, build, the light home hero at 1440 × 900.

## 2026-10-01: rounded photo on the face card

- **Agent:** Cursor agent (Claude)
- **Done:** The photo on the hero face card has rounded corners through a new radius token, `--r-print` (`rounded-print`): 6px in Dusk and 10px in Blueprint, one step inside the card's `inset` corner. Added to the contract, both themes, `app/globals.css` and the radius list in `DESIGN.md`.
- **Verified:** `theme:check` under both themes, build, a close-up of the card in dark mode.

## 2026-10-01: the shuffle plays on top

- **Agent:** Cursor agent (Claude)
- **Done:** The face deck moved from the hero's `z-20` layer to `z-40`, above the text column (`z-30`), so the shuffle draws over the headline and the day switch instead of slipping under them. Dealt hand cards still pass under the text.
- **Verified:** build; mid-shuffle captures at 900, 1100 and 1440px wide with temporary test photos (reverted); the day switch tabs still receive clicks.

## 2026-10-01: each shuffled card has its own colour

- **Agent:** Cursor agent (Claude)
- **Done:** In the day deck, each card now has its own suit (Day ♥, After hours ♦, Night ♠) and a wash of that time's light over the paper (amber, wine, night blue), via the new `face-tint` contract utility in both themes (ADR 0027 amended). The single card without extra photos is unchanged.
- **Verified:** lint, typecheck, `theme:check` under both themes, build; shuffle captured in dark and light with temporary test photos, then reverted.

## 2026-10-01: more breathing room in the hero

- **Agent:** Cursor agent (Claude)
- **Done:**
  - Vertical: a little more space between the hero's text elements (hairline `mt-5`, day switch `mt-7`, intro line `mt-5`). On screens at least 940px tall, the hero also gets `pt-32` and `pb-10`. To keep the 1440 × 900 fold, the fan sits 8px higher and the caption tucks 8px closer.
  - Horizontal: company logos get a small gap before them (0.2em), and names followed by a word get a hair of space after (0.15em), so each company reads as its own unit.
- **Verified:** build; caption bottom at 899px (1440 × 900) and 947px (1728 × 1000); intro close-up.

## 2026-10-01: family after hours, sport and tango at night

- **Agent:** Cursor agent (Claude)
- **Done:** After hours reads "My lovely wife and toddler, then head of design at CoNaDzielni.pl". Night reads "Bouldering, long runs, dancing and DJ-ing at milongas". The intro is 30 of 32 words.
- **Verified:** build; both lines on screen.

## 2026-10-01: a face-card deck that shuffles with the day

- **Agent:** Cursor agent (Claude)
- **Done** ([ADR 0027](decisions/0027-face-card-day-deck.md)):
  - Intro rows take an optional `photo`. With two or more, the hero face card becomes `FaceDeck`: one P of hearts per time of day, stacked and peeking out up and to the right. When the day switch moves on, the top card is cut off to the left and tucked under, and the next photo comes up. Clicking the deck shuffles to the next time and stops the autoplay.
  - A shared `daytime` store drives the day switch, `Daylight` and the deck. `DayCycle` no longer keeps its own active index.
  - The hover flip and `avatar.back` are removed.
  - With one photo, as now, the hero is unchanged: one static face card that the hand is dealt from.
- **Verified:** lint, typecheck, build. The shuffle was tested with two temporary test photos (mirrored and greyscale copies, removed before the commit): autoplay cuts on each step, a deck click moves the switch and stops autoplay, and axe finds nothing. With the test photos removed: one static card, the deal still comes from under it, axe zero violations in dark and light.

## 2026-10-01: sport and family in the intro

- **Agent:** Cursor agent (Claude)
- **Done:** the intro lines, within the 32-word budget:
  - Day: "Shaping enterprise-grade experiences at Miro, earlier at Egnyte and Allegro".
  - After hours: "Head of design at CoNaDzielni.pl, bouldering and long runs".
  - Night: "My lovely wife and toddler, then dancing and DJ-ing at milongas".
  - To fit, "meeting people and eating empanadas 🥟" is cut, and "before that at" became "earlier at".
- **Verified:** build (the budget check passes at exactly 32); After hours and Night screenshots.

## 2026-10-01: hero as one composition, dealt from the face card

- **Agent:** Cursor agent (Claude)
- **Done** ([ADR 0026](decisions/0026-hero-face-card-and-daylight.md)):
  - **Fits the fold:** tighter top padding and rhythm, and the photo and cards at 200px from `xl`. At 1440 × 900 the greeting, headline, day switch, the fan and the handwritten caption all show without scrolling (caption bottom at 899px).
  - **Face card:** the photo is a P of hearts, with corner marks and the photo framed on card paper. On hover it turns over to `avatar.back`, or to the deck back until a second photo exists.
  - **The trick:** on wide screens the fan's face-down stack sits under the face card, peeking out, and is dealt from there into the fan. The text column sits above the cards in flight.
  - **Daylight:** a new `daylight` contract utility in both themes. A glow behind the hero follows the day switch: a warm sun top right, a low rose sunset, cool moonlight top left. It cross-fades, and fades out at the bottom through a mask.
  - **Calmer headline:** the dictionary underlines in the tagline sit at 30% until the headline is hovered.
- **Verified:** lint, typecheck, theme:check under dusk and blueprint, build; deal frames at 0.5 to 1.6s; settled, sunset, night and flip screenshots at 1440 in dark and light; iPhone 13; reduced motion shows the fan already dealt; axe over the fully scrolled page, zero violations.

## 2026-09-30: calmer company names in the intro

- **Agent:** Cursor agent (Claude)
- **Done:**
  - The intro lines get more air: line height 1.85.
  - Company names are set in medium weight, with a fine 1px dotted accent underline under the name only (not under the logo), set low at 0.42em. They have no hover highlight; the underline turns full accent on hover or when open.
  - Logos scale with the text (1.05em), with an even gap before the name.
  - `Bubble` takes a `name` flag for this quieter trigger. Dictionary terms keep their bolder dotted underline and highlight.
- **Verified:** lint, theme:check, build; Day and After hours lines at 1440 in dark and light, and on an iPhone 13; axe zero violations.

## 2026-09-30: after-hours line names the role

- **Agent:** Cursor agent (Claude)
- **Done:** the After hours line reads "Head of design at CoNaDzielni.pl", at the owner's request. It is a job title, which the AGENTS.md copy rule normally keeps out of site copy; the owner chose it here.
- **Verified:** build.

## 2026-09-30: company names open notes, not links

- **Agent:** Cursor agent (Claude)
- **Done:**
  - Miro, Egnyte, Allegro and CoNaDzielni.pl no longer link out. Each opens a small card with its logo, the kind of product and one line about it, like the reference site benshih.design ([ADR 0025](decisions/0025-company-notes.md)).
  - `Definition` now wraps a shared `Bubble` (hover, focus, tap, one at a time, centred on phones), with `Definition` and the new `CompanyNote` as its two cards.
  - Schema: company parts are `{ pill, logo?, kind, about }`, with no `href`.
- **Verified:** lint, typecheck, theme:check, build; Miro and Egnyte cards at 1440 in dark and light, and a click stays on the page; CoNaDzielni.pl centred on an iPhone 13; axe over the fully scrolled page, zero violations.

## 2026-09-30: night line with milongas and empanadas

- **Agent:** Cursor agent (Claude)
- **Done:**
  - The Night line reads "Dancing and DJ-ing at milongas, meeting people and eating empanadas 🥟". Unicode has no empanada emoji, so the line uses the dumpling, the closest match.
  - Intro parts can now be dictionary terms: a glossary entry inside `parts` or `note` renders as a `Definition` tooltip. "milongas" gets an entry with its phonetics, two senses and its Kimbundu origin. The tagline glossary keeps its limit of 3.
  - Fixed: text before a dictionary term keeps its last word. Only company pills take the word before them.
- **Verified:** lint, typecheck, theme:check, build; Night line and tooltip screenshots at 1440 in dark and light, and the centred overlay on an iPhone 13; axe zero violations.

## 2026-09-30: hand caption copy

- **Agent:** Cursor agent (Claude)
- **Done:** the handwritten caption under the cards now reads "Pick a card to see my tricks!".
- **Verified:** build.

## 2026-09-30: the intro as a day cycle

- **Agent:** Cursor agent (Claude)
- **Done:**
  - The heavy three-row schedule became `DayCycle` ([ADR 0024](decisions/0024-day-cycle-intro.md)). A pill switch (Day, After hours, Night) shows one line at a time. It plays the day through once on first view and settles on Day. Hover or focus pauses it, a pick stops it, and reduced motion keeps it still.
  - Company links are frameless: logo, name, faint underline. `Parts` moved from `IntroHero` into `DayCycle`.
  - Content: the switch labels are Day, After hours and Night. The Day line reads "at Miro, before that at Egnyte and Allegro". The Night line gains "from the first tanda to the last".
- **Verified:** lint, typecheck, theme:check, build; hero screenshots at 1440 in dark and light, 1024 and iPhone 13; the cycle advances and settles on Day, and a tap stops it; axe over the fully scrolled page in dark and light, zero violations.

## 2026-09-30: new photo, clearer dictionary terms

- **Agent:** Cursor agent (Claude)
- **Done:**
  - New avatar, `public/about/patryk-arms-crossed.jpg`: a 5:7 crop (488 × 683) of the arms-crossed photo with new alt text. The old `patryk.jpg` is removed.
  - The nav circle crops towards the face (`object-[50%_12%]`).
  - The dictionary terms in the tagline have a 2px dotted underline in the accent at 60%, up from a 1px `ink-3` line.
- **Verified:** lint, theme:check, build; hero screenshots in dark and light; axe zero violations.

## 2026-09-30: photo card in the deck's proportions

- **Agent:** Cursor agent (Claude)
- **Done:** the hero photo card is 5:7 and the same width as the fanned cards: 172px, and 212px from the `xl` breakpoint. It is centred against the text block instead of stretching to its height.
- **Verified:** build; measured photo and card at 1440 (212 × 297) and 1024 (172 × 241), both 0.714; screenshots in dark and light.

## 2026-09-30: dividers as a hairline

- **Agent:** Cursor agent (Claude)
- **Done:**
  - The scrolled filete flourish under headings became a 24px accent hairline ([ADR 0023](decisions/0023-filete-hairline.md)).
  - The quiet Egnyte and Allegro links in the intro get a faint underline. Axe flagged them as told apart by colour alone, which an earlier scan missed because it ran before they revealed.
- **Verified:** lint, typecheck, theme:check, build; heading and hero screenshots; axe over the fully scrolled page in dark and light, zero violations.

## 2026-09-30: the intro as a day-to-night schedule

- **Agent:** Cursor agent (Claude)
- **Done:** the run-on intro sentence became a three-row schedule, "By day", "After hours" and "At night", with sun, sunset and moon icons in the accent, a label column and hairlines between rows ([ADR 0022](decisions/0022-real-employers-in-hero.md)).
  - Past employers sit on a quieter "Before that" line with frameless logo pills.
  - The new `sunset` icon is in the contract and both themes, and `hero.intro` is now a list of rows.
- **Verified:** lint, typecheck, theme:check (dusk and blueprint), build; labels share a baseline with the first line; desktop light and dark, iPhone 13; axe zero violations.

## 2026-09-30: real employers in the hero

- **Agent:** Cursor agent (Claude)
- **Done:** the intro now reads "By day I shape enterprise-grade experiences at Miro, before that at Egnyte and Allegro. After hours I run design at CoNaDzielni.pl. At night I DJ tango at milongas." ([ADR 0022](decisions/0022-real-employers-in-hero.md)).
  - The pills carry the companies' logo marks from `public/logos/` and link to their sites.
  - `hero.headline` follows the new copy.
  - The AGENTS.md rule now keeps only case studies fictional.
- **Verified:** lint, typecheck, build; desktop light and dark, 1024, iPhone 13; axe zero violations.

## 2026-09-30: one dictionary card on desktop, even on fast moves

- **Agent:** Cursor agent (Claude)
- **Done:** moving the mouse quickly across the terms showed up to three cards at once, because each card played its fade-out while the next faded in. A card leaving because another term took over now vanishes at once; closing to nothing still fades.
- **Verified:** lint, typecheck, build; a Playwright sweep across the three terms, sampled every 20ms: at most 3 cards before, 1 after.

## 2026-09-30: dictionary cards on mobile

- **Agent:** Cursor agent (Claude)
- **Done:**
  - Only one dictionary card is open at a time, through a shared store in `Definition`.
  - Below 768px the card opens centred over a blurred scrim that covers the whole screen, navigation included. Any tap or Escape closes it.
  - The overlay is portalled to `body` inside a labelled `aside`, because `main` is a stacking context below the navigation.
  - Desktop keeps the anchored tooltip.
- **Verified:** lint, typecheck, build; iPhone 13 dark and light: centred within 1px, a scrim tap closes it, the next term opens alone, and a tap on another term through the scrim only closes; desktop hover across two terms leaves one open; axe zero violations.

## 2026-09-30: a quieter hero

- **Agent:** Cursor agent (Claude)
- **Done:** the hero had become crowded, so ([ADR 0021](decisions/0021-quieter-hero-lettering.md)):
  - Only "gotan soul" is shaded, through the new `hero.shade` field.
  - The greeting is a small line above a three-line headline.
  - Display type is smaller with more line height.
  - The photo sits straight and tilts only on hover.
  - A filete flourish sits under the headline.
- **Verified:** lint, typecheck, theme:check, build; desktop light and dark, 1024, iPhone 13; axe zero violations.

## 2026-09-30: Vercel served a 404 on every page

- **Agent:** Cursor agent (Claude)
- **Done:** production answered Vercel's plain `NOT_FOUND` on `/`, `/about` and `/robots.txt`, while files from `public/` loaded. The project had been imported before Next.js was in the repo, so Vercel kept the framework preset "Other" and deployed only `public/` as static files. Added `vercel.json` with `"framework": "nextjs"`, which overrides the dashboard preset. The deploy notes are in `docs/operations.md`.
- **Verified:** see the entry's commit; production checked with curl after the deploy.

## 2026-09-30: hero recomposed

- **Agent:** Cursor agent (Claude)
- **Done:** fixed every point from the hero review ([ADR 0020](decisions/0020-hero-recomposition.md)):
  - The hero block centres on the fan's axis, and the portrait is a tilted photo card.
  - The greeting is quiet and the tagline is in full ink with `filete-shade`. The tooltip words keep the shade, and their underlines are calmer.
  - The intro leads with "I design the systems product teams build on". Pills stay glued to the word before them.
  - On mobile, the duplicate photo is gone, the cards are a smaller overlapping hand with a slight tilt, and the shadow is no longer cut off.
- **Verified:** lint, typecheck, theme:check, build; desktop 1440 light and dark, 1024, iPhone 13 light and dark; no horizontal overflow; tapping a card still opens it; axe zero violations.

## 2026-09-30: joker emblem without a background on hover

- **Agent:** Cursor agent (Claude)
- **Done:** the bandoneon showed a white or black box when its card was hovered, because the scaled layer isolated its CSS blend mode. The emblem is now a transparent PNG in each mode, and the blend classes are gone ([ADR 0018](decisions/0018-plain-faces-fileteado-accents.md)).
- **Verified:** lint, build; hovered joker screenshots in dark and light.

## 2026-09-30: fileteado lettering on headings

- **Agent:** Cursor agent (Claude)
- **Done:** section headings and card titles keep Geist but wear `filete-shade`, a sign-painter block shade in the accent. Section headings add a small `Filete` flourish underneath ([ADR 0019](decisions/0019-filete-lettering.md)).
- **Verified:** lint, typecheck, theme:check (dusk and blueprint), build; heading and fan screenshots in dark and light; axe zero violations.

## 2026-09-30: plain card faces, fileteado only as a nod

- **Agent:** Cursor agent (Claude)
- **Done:** aces have plain faces, one pip size and corner values pushed into the corners. Two inks replace the four fileteado hues: a warm red tuned to the amber accent, and the card ink ([ADR 0018](decisions/0018-plain-faces-fileteado-accents.md)). The joker carries a small bandoneon emblem instead of a full-card painting. A new back sits between the first two decks. The zoomed card repeats its corner values instead of the frame. Removed `card-gold`, `card-green`, `card-sky`, `card-glint`, `filete-letter`, `FiletePip` and `deck.face`.
- **Verified:** lint, typecheck, theme:check (dusk and blueprint), build; fan, back and zoom screenshots in dark and light; axe zero violations.

## 2026-09-30: picking a card opens it

- **Agent:** Cursor agent (Claude)
- **Done:** clicking or tapping a card lifts it from the fan, flips it over while it travels to the centre as a big card, then widens it to almost the whole screen (padding, rounded corners, a nine-slice fileteado frame), and the section appears on it ([ADR 0017](decisions/0017-card-pick-zoom.md)). Close, Escape or a click on the scrim fold it back into its place. `CardZoom`, a new `AboutTeaser` block for the Hi! card, `panels` on `CardHand`, `id` props on `WorkTimeline` and `Teaching`, and a new `motion.zoom` token in both themes.
- **Verified:** lint, typecheck, theme:check (dusk and blueprint), build; open and close filmstrips on desktop dark and light and on mobile; focus on Close, then Tab into the content; case links navigate from inside the card and leave scrolling unlocked; modifier clicks still follow links; reduced motion; axe zero violations with the card open.

## 2026-09-30: a quieter deck in fileteado inks

- **Agent:** Cursor agent (Claude)
- **Done:** per the owner's feedback ([ADR 0016](decisions/0016-quieter-deck-fileteado-inks.md)): the ace frame is down to corner scrolls and a double filete line, the joker is a bandoneón alone (title above, blurb below), and the back is a small tango medallion on a plain field. Six new images with new file names. Pips are painted in fileteado inks (vermilion, gold, celeste, green) with a gold outline and a glint (`FiletePip`); titles use `filete-letter`. New contract variables `--card-gold`, `--card-green`, `--card-sky` and `--card-glint`.
- **Verified:** lint, typecheck, theme:check (dusk and blueprint), build; deal filmstrip; light and dark at 1440, 800 and mobile; axe zero violations; no overflow.

## 2026-09-30: a Fileteado Porteño deck

- **Agent:** Cursor agent (Claude)
- **Done:** the hand is a Fileteado Porteño deck ([ADR 0015](decisions/0015-fileteado-deck.md)): an ornamental ace frame, Aníbal Troilo with his bandoneón as the joker and a tango couple on the back, generated as one consistent set in black and cream (`public/cards/`, `site.deck`). Cards are black in dark mode and cream in light mode (`--card-face`, `--card-red` and `--card-ink` now per mode; `--card-black` renamed). The stack lands face down showing the tango backs and each card flips face up as it is dealt.
- **Verified:** lint, typecheck, theme:check (dusk and blueprint), build; deal filmstrip; light and dark at 1440, 800 and mobile; axe zero violations; no overflow.

## 2026-09-30: calmer hero alignment

- **Agent:** Cursor agent (Claude)
- **Done:** the hero photo is no longer a tilted card floating beside the text. It is an upright portrait (168px, 212px from `lg`) that spans the text block exactly: its top meets the cap height of the greeting and its bottom the last line of the intro, with a hairline edge and soft shadow.
- **Verified:** measured photo, heading and intro boxes at 1440; 800 and mobile screenshots.

## 2026-09-30: the hand deals out of a stack

- **Agent:** Cursor agent (Claude)
- **Done:** when the hand scrolls into view the cards land as one loose pile (a hair off square each), hold for a beat, then spread left to right into the fan on desktop, or out of the first card's spot into the swipe row on mobile, as if swept across a table. Positions are measured, so it works at any width. Hover lift starts once the deal settles. The handwritten caption fades in and the arrow draws after the last card lands. New motion token `deal` in the contract, Dusk and Blueprint. Reduced motion shows the fan at once.
- **Verified:** lint, typecheck, theme:check, build; filmstrips of the deal on desktop and mobile; hover after the deal; reduced motion; axe zero violations; no overflow at 1440, 1024 and mobile.

## 2026-09-30: a handwritten caption under the hand

- **Agent:** Cursor agent (Claude)
- **Done:** new optional `site.handNote`, "Pick a card to see some tricks", rendered under the hand in Caveat (`type-hand`, a new contract utility and `--theme-font-hand` in both themes) with an accent doodle arrow that loops and points at the cards and draws itself on scroll. The font rule gets a scoped exception ([ADR 0014](decisions/0014-handwritten-doodle-caption.md)). Also fixed the centre pips shrinking when a title wraps at 1024.
- **Verified:** lint, typecheck, theme:check (dusk and blueprint), build; axe zero violations; light and dark, 1440, 1024 and mobile, no overflow.

## 2026-09-30: real playing cards

- **Agent:** Cursor agent (Claude)
- **Done:** the hand cards look like a printed deck: ivory paper face with a faint grain, red hearts and diamonds, black spades and clubs, rank and pip in the corners (upside down bottom right), one centre pip with the title and line below, an oversized ace of spades, and a joker with JOKER corners in black and red and a harlequin hat. 5:7 on every screen. Contract: `--suit-*` replaced by `--card-face`, `--card-red`, `--card-black` and the `playing-card` utility ([ADR 0013](decisions/0013-real-playing-cards.md)). Side projects covers and section heading glyphs follow the same inks.
- **Verified:** lint, typecheck, theme:check (dusk and blueprint), build; axe zero violations; light and dark, 1440, 1024 and mobile, no overflow.

## 2026-09-30: photo on the left and dictionary tooltips

- **Agent:** Cursor agent (Claude)
- **Done:** the hero photo card now sits left of the text from `md`. New `hero.glossary` (up to 3 entries, each term must appear in the tagline): the terms get a dotted accent underline and open a dictionary card (`components/ui/Definition.tsx`) with headword, phonetic, kind, numbered senses and origin. It opens on hover, keyboard focus or tap, closes on leave, blur, Escape or a second tap, flips above when there is no room below and is click-through so neighbouring terms stay reachable.
- **Verified:** lint, typecheck, theme:check (dusk and blueprint), build; axe zero violations with the card open; hover, focus, Escape and mobile tap scripted in light and dark; no overflow on mobile.

## 2026-09-30: four aces and a joker

- **Agent:** Cursor agent (Claude)
- **Done:** the first four hand cards are aces (A plus suit in the corners), each in its own suit colour; My world is the joker: JOKER spelled down the corners, a jester hat as the emblem and a coral, lilac and sky blend. The `star` suit became `joker`.
- **Verified:** lint, typecheck, theme:check, build; axe zero violations; light and dark.

## 2026-09-30: the owner's photo in nav and hero

- **Agent:** Cursor agent (Claude)
- **Done:** new optional `site.avatar` (square image, `public/about/patryk.jpg`). The nav shows it as a 32px circle before the name; the intro hero shows it as a tilted photo card to the right from `md` (straightens on hover) and as a 72px circle above the greeting on mobile.
- **Verified:** lint, typecheck, theme:check, build; axe zero violations; desktop light and dark, tablet and mobile, no overflow.

## 2026-09-30: a hand of section cards

- **Agent:** Cursor agent (Claude)
- **Done:** the door tiles became `CardHand`, five playing cards (Hi!, Core work, Side projects, Teaching, My world) fanned like a hand from `lg`, with lift and spread on hover or focus, and a swipe row on narrow screens. New suit tokens `--suit-1` to `--suit-5` and `--suit-ink` in the contract, Dusk and Blueprint ([ADR 0012](decisions/0012-card-hand-and-suits.md)). Home gains Side projects (showcase, image optional, suit panels), a new Teaching block and My world (moved from About, with climbing, tango and DJing). Section headings wear their card's suit. Command menu lists the new sections.
- **Verified:** lint, typecheck, theme:check, build; axe zero violations; hover spread, 1024px fit, mobile swipe row, no overflow, light and dark.
- **Next:** real side projects and teaching details from the owner; running did not fit My world's three items.

## 2026-09-30: nav tools moved to the corner

- **Agent:** Cursor agent (Claude)
- **Done:** the command menu button and theme toggle left the centre pill for a quiet cluster fixed top right (desktop only, Ink 3, aligned to the pill's height). The pill keeps the name, Work, About and Get in touch. Mobile unchanged: the toggle stays in the menu. `ThemeToggle` gains a `quiet` tone.

## 2026-09-30: locked page with a watching lock

- **Agent:** Cursor agent (Claude)
- **Done:** the locked teaser is now a centred card with `LockFace`, a lock whose keyhole eyes follow the pointer, look at the password field on focus, squint while typing, blink, and frown and shake on a wrong password (`UnlockForm` dispatches `unlock:failed`). Reduced motion: eyes jump instead of springing, no blink or shake. Colours are contract tokens only, so it works in both themes. The bottom line stays public below the card; cover and lead metric removed from this page.
- **Verified:** lint, typecheck, theme:check, build; axe zero violations; scripted pointer tracking, wrong password, and unlock; light, dark and mobile with no overflow.

## 2026-09-30: block library built and composed (`content-schema`, `blocks`, `interactions`, `kit-page`, `compose`, `verify-docs`)

- **Agent:** Cursor agent (Claude)
- **Done:**
  - Content: one schema per block with word budgets; `hero.lede`, `hero.metrics`, `hero.plates`, `approach`, `about.bio` and `about.experience` removed. `site.ts` fills hero, doors, statement, testimonials, letter, story, education, journey, values and outside; showcase and writing stay empty on the live site. `content/kit.ts` fills them for `/kit`.
  - Blocks in `components/blocks/`: IntroHero, DoorCards, Statement, WorkTimeline, Showcase, WritingList, Testimonials, LetterCard, StoryHeader, Education, Journey, Values, OutsideWork, plus `BlockHeader` and the `HomeBlocks` and `AboutBlocks` compositions. Empty blocks render nothing; doors into empty blocks are hidden.
  - Interactions: `Modal` (native dialog, sheet or palette, optional morph), `Toaster`, `CommandMenu` (Cmd K or Ctrl K, go to, copy email, switch theme, links), `CopyEmail` as a button with a toast, `press` on tiles and buttons, `PageTransition` and `CoverMorph` on every page and case cover, nav gets a command button and a fixed view-transition name.
  - `/kit` shows every block and primitive, `noindex`, not in the sitemap or nav. Old `components/home/` removed; `Contact` moved from the layout into each page.
- **Verified:** `theme:check`, `typecheck`, `lint` and `build` under Dusk and Blueprint. axe zero violations on 7 pages (including `/kit`) in light and dark, and inside the open command menu and sheet. Scripted checks: Cmd K opens with focus in the input, filter and Enter navigate, Escape closes and returns focus, theme switch and copy email toast, showcase sheet opens and closes. `pnpm shots` (now with `/kit`, theme set through `localStorage`) with no overflow; compared against round 8.
- **Left:** the nav is still Blueprint's pill layout in Dusk (the comp shows a full-width bar); nav text links are 23px tall, as before.
- **Next:** Phase 3, the personal touch.

## 2026-09-30: Dusk theme (`dusk-theme`)

- **Agent:** Cursor agent (Claude)
- **Done:** `themes/dusk/` forked from Blueprint and rewritten: dark and light tokens, Geist, calm quick motion, a faint vignette, a flat stacked `Signature`, a layered-bar `Diagram`, `meta.defaultMode: "dark"`, view-transition CSS. `ThemeProvider` reads the default mode and wraps motion in `MotionConfig reducedMotion="user"`. Active theme switched to Dusk.
- **Next:** `content-schema`.

## 2026-09-30: block library and Dusk, decisions and contract (`adrs-contract`)

- **Agent:** Cursor agent (Claude)
- **Done:** rounds 5 to 7 explored and rejected (too hobby-led, too busy, kudos too much). Round 8 approved: a block library modelled on benshih.design's structure, styled as Dusk (subtle dark, Geist, pale amber). ADR [0010](decisions/0010-block-library.md) and [0011](decisions/0011-dusk-theme.md). Contract gains `card`, `inline-pill`, `type-quote`, `press`, `sheet`, `--r-card`, `--r-sheet`, motion `press` and `sheet`, six icons and `meta.defaultMode`; Blueprint implements them, plus the view-transition CSS. AGENTS and DESIGN rules scoped per theme.
- **Next:** `dusk-theme`.

## 2026-09-30: Milonga direction proposed (round 4)

- **Agent:** Cursor agent (Claude)
- **Done:** studied benshih.design and three besler.pl pages; the user chose a new warm theme alongside Blueprint, loosened four rules (multiple accents, a handwritten accent font, chunkier display type, snappier motion), and wants personality around the work with crisp case pages. Generated six section comps: [design/directions/round-4-milonga/](../design/directions/round-4-milonga/README.md).
- **Next:** user feedback on the comps, then ADR 0010, `themes/milonga/`, and the new theme-agnostic content (off the clock, now playing, cortinas).

## 2026-09-30: audit fixes (High and Medium)

- **Agent:** Cursor agent (Claude)
- **Todo:** `qa`
- **Done:** fixed all 6 High and 11 Medium findings from [ux-audit.md](ux-audit.md); decisions in [ADR 0009](decisions/0009-audit-fixes.md), values in `DESIGN.md`.
  - Contrast: Ink 3 darkened (light) and lightened (dark); nav and mobile sheet on strong glass.
  - Gating made visible: "Password protected" chips, Selected work intro says how many are gated, "Unlocked · Lock cases" in the case header, locked page links to open cases, "Checking" while unlocking.
  - One primary button (compact size in the nav); card arrows always visible; chips are status only; numbered "Ask me about"; labelled Partners and Scope; "Email me" plus a copy button in the contact block.
  - Mobile menu: focus in, Escape out, page behind inert. Content is visible without JavaScript; reveals start sooner.
  - Content: 88% (14 of 16) fixed, hero metrics from three cases, hero plates from two other cases.
  - Craft: top-left crops, dark-mode dim for light screenshots, diagram fits its frame, before/after labels, annotation re-placed.
- **Verified:** axe zero violations on 6 pages in light and dark, mobile menu keyboard test, no-JS render, no mobile overflow, `pnpm shots`.
- **Next:** Low findings (L1 to L7), Lighthouse on a Vercel preview, ADR 0005.

## 2026-09-30: UX and accessibility audit

- **Agent:** Cursor agent (Claude)
- **Todo:** `qa` (audit part)
- **Done:** audited every page in both themes and both viewports with axe-core, a keyboard trace, target sizes, a no-JS check and a component review. Findings with severity, heuristic and fix: [ux-audit.md](ux-audit.md). 6 High, 11 Medium, 7 Low.
- **Next:** fix in the order the audit suggests (H2, H1, H3, H4 first), re-run `pnpm shots` and axe.

## 2026-09-30: v1 build with a swappable design language

- **Agent:** Cursor agent (Claude)
- **Todos:** `scaffold`, `content-model`, `shell`, `home`, `case-pages`, `gating`, `about`, `assets`, `share-seo`, most of `qa` and `docs-final`. `section-refs` skipped by decision.
- **Done:**
  - The user asked to build with Blueprint as the starting design, and to make changing the design language easy later. Built the design-language layer first ([ADR 0008](decisions/0008-design-language-layer.md), [theming.md](theming.md)):
    - `themes/blueprint/` holds every visual value (`theme.css`), fonts, motion, icons, OG/meta colors, and the signature components (`Atmosphere`, `Signature`, `Diagram`).
    - `themes/contract.json` and `contract.ts` define what any theme must provide; components use only those names.
    - `pnpm theme:check` (runs before every build), `pnpm theme:new`, `pnpm theme:use`.
    - Drilled a swap end to end: fork, change the accent, switch, build, confirm the compiled CSS, switch back.
  - Scaffolded Next.js 16.3 (App Router, Turbopack, `proxy.ts`), Tailwind 4 with the default palette, radii, shadows, fonts and easings reset.
  - Content model with zod budgets and 4 fictional cases ([ADR 0003](decisions/0003-teaser-depth-and-content-budgets.md)).
  - Pages: home (hero, 4-cell bento, approach), full case, locked teaser, About, 404, plus the shared contact block and footer.
  - Password gating ([ADR 0004](decisions/0004-password-gating.md)). Verified: locked HTML and RSC payloads contain no case content, protected media return 401, unlock through the real form works, and the password is fingerprinted into the cookie so rotating it revokes access.
  - 11 generated placeholder images (UI screens, phone screens, photos); diagrams are drawn in code by the theme.
  - Metadata, OG images from `@theme/meta`, sitemap, robots, Vercel Analytics and Speed Insights.
  - `pnpm shots`: 20 captures (5 pages, light and dark, desktop and mobile), with a real unlock and an overflow check. All pass.
- **Fidelity comparison** (home hero vs `design/preview/blueprint.png`): glass, dot lattice, drifting light, radii, Sora weights, nav, button and metrics panel match. The plates now hold real screenshots instead of skeletons. Fixed during comparison: metric unit superscripts sat too high (Tailwind preflight `sup` offset), and a stray metric divider showed on desktop.
- **Design tweaks made during the build:**
  - The case bottom line is now `clamp(2rem, 3.2vw, 2.75rem)`, max 28ch (DESIGN.md section 3), so a 30-word bottom line fits in about four lines and the unlock form stays in the first viewport.
  - "Lock cases" lives on full protected case pages, not in the global footer (the static footer cannot know the HttpOnly cookie).
  - Every "Get in touch" goes to the shared `#contact` block rendered on every page.
- **Next:**
  - User: import the repo in Vercel, set `CASE_PASSWORD` and `AUTH_SECRET`, add the Firewall rule ([operations.md](operations.md)).
  - `qa`: taste pre-flight write-up, keyboard and screen reader pass, Lighthouse on the preview URL.
  - `docs-final`: ADR 0005, `pnpm docs:check`.
- **Open questions:** none. Local dev password is in the gitignored `.env.local`.

## 2026-09-30: icons switched to Lucide

- **Agent:** Cursor agent (Claude)
- **Todos:** `direction-lock` (amendment)
- **Done:**
  - The user asked for [Lucide](https://lucide.dev/icons/). Switched from Phosphor to `lucide-react` at `strokeWidth` 1.5.
  - Updated `DESIGN.md` (section 7 icon list: `CircleAlert` replaces `WarningCircle`, `Menu` replaces `List`).
  - Added ADR 0007, and marked ADR 0001's icon line as superseded.
  - Swapped the reference `design/preview/blueprint.html` to the Lucide UMD build and re-rendered `blueprint.png`.
- **Next:** unchanged, `section-refs`.

## 2026-09-30: direction-lock, v2 refinement

- **Agent:** Cursor agent (Claude)
- **Todos:** `direction-lock`
- **Done:**
  - The user said the v1 HTML render was the right direction but looked cheap. They asked for:
    - more frozen glass;
    - slow animations;
    - a subtler isometric background with dots, not lines;
    - delightfully rounded corners;
    - more elegance, and for all of it to land in the build.
  - Built the reference implementation `design/preview/blueprint.html` (render: `blueprint.png`):
    - a glass recipe;
    - drifting orbs;
    - an isometric dot lattice and grain;
    - radii of 36/28, 32/24 and 28px;
    - Sora 300 to 500;
    - a 1400ms rise with a 140ms stagger, and a 12s plate float.
  - Rewrote `DESIGN.md` as v2 with verbatim tokens and a **fidelity contract** (section 11): copied tokens, fixed pattern components, the `pnpm shots` screenshot gate, and a checklist.
  - Added ADR 0006.
- **In progress:** nothing.
- **Next:** `section-refs`.
  - Generate references in the v2 style (glass, dots, orbs, radii, cobalt, Patryk Karolak).
  - Cover: selected work bento, approach, contact and footer, the locked case page, About, and a dark-mode case page.
  - Then `scaffold`.
- **Open questions:** none.

## 2026-09-30: direction-lock

- **Agent:** Cursor agent (Claude)
- **Todos:** `direction-lock`
- **Done:**
  - The user approved round 3 and picked **Sora**, then rejected the teal accent and asked for a modern, professional color that also works in dark mode.
  - Picked **Blueprint Cobalt** (`#2F5BEA` light, `#7A9BFF` dark).
  - Verified it in real CSS with the pill nav, the isometric plates, and the grid and glow, in both themes: `design/preview/accent.html` / `.png`.
  - Wrote `DESIGN.md` (locked design system) and ADR 0002.
  - **Scope change:** dark mode is now in (system default, plus a toggle in the nav, via `next-themes`). Removed it from out of scope in `docs/plan.md`.
- **In progress:** nothing.
- **Next:** `section-refs`.
  - Generate references with the cobalt palette and the name Patryk Karolak.
  - Cover: selected work (bento), approach, contact and footer, the locked case page, and About, in light mode; plus one dark-mode case page.
  - Save them to `design/refs/`, then analyse them per `image-to-code` before `scaffold`.
- **Open questions:** none.

## 2026-09-30: direction-concepts, round 3

- **Agent:** Cursor agent (Claude)
- **Todos:** `direction-concepts`
- **Done:**
  - The user favoured G Blueprint and asked for:
    - a more modern look;
    - room for more asset types;
    - the floating pill nav back, mashed up with Blueprint;
    - Lato as the body font plus a matching heading font.
  - Generated round 3 (hero, selected work with mixed assets, case header, artifacts) into `design/directions/round-3/`.
  - Rendered a real font specimen (`design/fonts/specimen.html` / `.png`) with Sora, Plus Jakarta Sans, Bricolage Grotesque and Instrument Sans over Lato. It also previews the blueprint grid and glow in real CSS.
  - Added artifact and cover `kind`s to the content model in `docs/plan.md`.
- **In progress:** waiting for the user to approve round 3 and pick the heading font.
- **Next:** `direction-lock`.
  - Write `DESIGN.md`: Blueprint refined, pill nav, double-bezel media, isometric grid and glow tokens, Lato plus the chosen heading font, teal accent.
  - Write ADR 0002, recording rounds 1 to 3.
- **Open questions:** heading font (recommended: Sora), and any tweaks to round 3.

## 2026-09-30: direction-concepts, round 2

- **Agent:** Cursor agent (Claude)
- **Todos:** `direction-concepts`
- **Done:**
  - Round 1 (A to E) was rejected by the user.
  - The new brief is clean and modern, with beautiful whitespace, subtle gradients and a subtle isometric grid in the backgrounds.
  - Moved round 1 to `design/directions/round-1/`.
  - Generated round 2 (F Mist, G Blueprint, H Daylight, I Ink) into `design/directions/round-2/`, each with a README.
- **In progress:** waiting for the user to pick from round 2.
- **Next:** `direction-lock`.
  - Write `DESIGN.md`. The isometric grid and the gradient glow become first-class tokens and background components.
  - Write ADR 0002, recording both rounds and the brief change.
- **Also decided:** the placeholder designer name is **Patryk Karolak**, replacing Maren Kowal. It applies to all content and references from now on; the existing concept images were not regenerated.
- **Open questions:** which of F, G, H or I, plus any cross-direction tweak.

## 2026-09-30: direction-concepts

- **Agent:** Cursor agent (Claude)
- **Todos:** `direction-concepts`
- **Done:**
  - Generated 10 concept images (5 directions, each with a hero and a metrics block) into `design/directions/<id>/`.
  - Wrote [design/directions/README.md](../design/directions/README.md) with side-by-side notes.
- **In progress:** waiting for the user to pick a direction.
- **Next:** `direction-lock`.
  - Once the user picks, write `DESIGN.md` using `stitch-design-taste`.
  - Write ADR 0002 with the chosen direction, the rejected ones and the reasons.
  - Then `section-refs`.
- **Open questions:** which direction (A to E), and whether any cross-direction tweak is wanted.

## 2026-09-30: docs-foundation

- **Agent:** Cursor agent (Claude)
- **Todos:** `repo-setup`, `docs-foundation`
- **Done:**
  - Renamed the branch to `main`, added `.gitignore`, added `origin`, and pushed the taste skills (`81a5777`).
  - Created `AGENTS.md`, `CLAUDE.md`, `README.md`, `docs/README.md`, `docs/plan.md`, `docs/brief.md`, ADR 0000 and ADR 0001.
- **In progress:** nothing.
- **Next:** `direction-concepts`.
  - Generate 2 images (home hero, case metrics block) for each of the 5 directions (A to E, specified in [plan.md](plan.md), "Phase 0").
  - Save them as `design/directions/<id>/hero.png` and `metrics.png`.
  - Present them to the user and wait for their pick.
- **Open questions:** none.
