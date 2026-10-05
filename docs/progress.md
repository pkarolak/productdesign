# Progress

Status log and handoff. Newest entry on top. Every todo ends with an entry here, then a commit and a push.

## Checklist

Brag doc into portfolio (source: the owner's brag document, 15 Sep 2026):

- [x] `confirm-ga`: the owner confirmed GA on 25 Sep 2026 and the team line; the 82% figure stays out
- [x] `content-explorer`: the sixth case, leading home
- [x] `upgrade-cases`: Enterprise Guard accounts and lifecycle closure; Analytics AI chapter and staged prototype
- [x] `how-i-work`: the prototype-first loop, said loudly
- [x] `docs-verify`: ADR 0035, docs, checks, axe, leak test, shots

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

Real cases from Figma (file `fSTFAxmRFRkc2fQbRppfQ5`, "Patryk's Playground"):

- [x] `restore`: re-cloned into the workspace, `.env.local` kept
- [x] `ask-gaps`: the owner's answers, below
- [x] `rules-schema`: real-content rule, ADR 0034, locked note counts every case
- [x] `cases`: five real case files, fictional ones deleted
- [x] `visuals`: logo covers, one real slide, labelled placeholders, leak tests
- [x] `site-content`: real site copy, no email, testimonials hidden
- [x] `verify-docs`: checks under both themes, axe, leak tests, shots, docs

---

## 2026-10-05: Joker hat favicon

- **Agent:** Cursor agent (Claude)
- **Done:** `app/icon.tsx` (64px, rounded tile) and `app/apple-icon.tsx` (180px, square, iOS rounds it) draw the joker's harlequin hat from `lib/favicon.tsx`: accent side panels and pompom, ink centre panel, band and side pompoms, on the canvas tile. Colours come from `@theme/meta`, so the icon follows the active design language. Build, typecheck, lint pass; head links verified.

---

## 2026-10-05: A more dramatic signature

- **Agent:** Cursor agent (Claude)
- **Done:** the letter's sign-off (`components/blocks/SignOff.tsx`) is Caveat at 700 (weight added to both themes' fonts), 2.75 to 3.25rem, tilted 6 degrees; the swash is pinned under the word so it spans the name, not the column. In view it writes itself in left to right, then an accent swash draws under it; both skip under reduced motion. The reveal is triggered from the wrapper, since a fully clipped element never reports as in view. Still Caveat through `type-hand` only (ADR 0014, 0038). Typecheck, lint, theme check, build, axe pass; shots desktop and iPhone.

---

## 2026-10-05: Experience, goal-oriented copy

- **Agent:** Cursor agent (Claude)
- **Done:** every Experience summary and point on /about now leads with the outcome (Launched, Rebuilt, Took from 0 to 1, Enabled, Gave, Shipped) instead of describing the area. Facts unchanged; Allegro adds the owner's wording on stock fulfillment, profitability and supply chain. Within budgets; build and axe pass.

---

## 2026-10-05: Home About me, lighter lead

- **Agent:** Cursor agent (Claude)
- **Done:** the lead drops the bold heading style for `type-standfirst` in ink; the five beliefs move into the text column as a hairline list under it, with "More about me" after; the photo sits beside the whole column, so the block reads top to bottom instead of breaking into a separate row. The belief "Even chances for everyone" reads "AI brings even chances for everyone" (on About too). Typecheck, lint, build, axe pass; shots light, iPhone.

---

## 2026-10-05: Command menu, pages and their sections

- **Agent:** Cursor agent (Claude)
- **Done:** the command menu's Pages group lists only the three pages, Home, Work and About me, each with its sections nested under it: Home (About me "Short version", Side gigs, Teaching, Free time), Work (the six cases; it now opens the standalone /work page, not the Home section), About me (What I believe, How I work, Experience). The separate Work group is folded in. Verified: Experience lands on /about#journey and Work on /work. Typecheck, lint, build pass.

---

## 2026-10-05: Photos lean toward the pointer

- **Agent:** Cursor agent (Claude)
- **Done:** the About portrait, the Home About me portrait and the four Free time tiles lean up to 4° toward a mouse pointer on a spring and zoom the image a touch, settling on leave; still on touch and under reduced motion (ADR 0051). Verified the transform on hover and its reset on leave. Typecheck, lint, build, axe pass.

---

## 2026-10-05: Home About me, rebalanced

- **Agent:** Cursor agent (Claude)
- **Done:** the lead and "More about me" share an even 6/6 row with the photo, vertically centred, and the five beliefs move below a hairline as one row of five (icon above title, balanced wrapping; a list on phones). No more lone fifth belief or wrapped title beside a floating photo. Typecheck, lint, build, axe pass; shots light, dark, iPhone.

---

## 2026-10-05: Hand note copy

- **Agent:** Cursor agent (Claude)
- **Done:** the note under the card hand reads "Pick a card and jump right there", at the owner's request. Build passes.

---

## 2026-10-05: Big projects opens with the access line

- **Agent:** Cursor agent (Claude)
- **Done:** the Home Big projects note reads the same as /work: "Selected cases from Miro, Allegro and Egnyte. Reach out to get access and learn more about them.", with "Reach out" linking to the contact block. It comes from `work.index`, so the two never drift; without `index` the old note and locked-cases line still show. Typecheck, lint, build pass; the link lands on Contact.

---

## 2026-10-05: Espago is side work

- **Agent:** Cursor agent (Claude)
- **Done:** Espago moves under "Alongside" in Experience (`side: true`), after CoNaDzielni.pl and before Freelance. The About story names Egnyte, Allegro and Miro as the main line and adds "Alongside, I designed for Espago and now lead design at CoNaDzielni.pl."; the Experience note reads "with side gigs and freelance work alongside since 2011". Build passes; shots of the About hero and Experience.

---

## 2026-10-05: Button consistency pass

- **Agent:** Cursor agent (Claude)
- **Done:** one button system (ADR 0050). New `SecondaryButton` at the primary heights (52 / 44px) replaces three hand-styled outlined pills (Copy email, the side-gig sheet's Close, /kit). Text links get 32px above them at the end of a block and 20px inside cards (feature card, Side gigs "more", hero CTA, Experience case links). The day switch tabs match the command menu filters; the company card's open-in link is round like the other icon buttons. Typecheck, lint, build, axe pass.

---

## 2026-10-05: Company cards link to the product sites

- **Agent:** Cursor agent (Claude)
- **Done:** the hero company cards (Miro, Egnyte, Allegro, CoNaDzielni.pl) carry an open-in icon in the top-right corner that opens the product's website in a new tab (new `href` on company notes, new `external-link` icon; ADR 0025 amendment). Verified: the card stays open as the pointer crosses onto it and the link opens a new tab; Tab enters the card and Tab from the link moves on to the next name; on an iPhone the centred card shows the link. Typecheck, lint, build, axe pass.

---

## 2026-10-05: Teaching in colour

- **Agent:** Cursor agent (Claude)
- **Done:** Teaching cards on Home get a hue wash (green, violet), an icon tile from the new optional `teaching.items[].icon`, a big faint corner glyph that swings on hover with the tile tilting, and hue dots on the topic chips. New contract utility `tint-ink` in both themes (ADR 0048 amendment). Typecheck, lint, build, axe pass; shots light, dark, iPhone.

---

## 2026-10-05: Home About me aligned with the About page

- **Agent:** Cursor agent (Claude)
- **Done:** the Home "About me" block is now a short version of /about: the owner's lead ("I've been a product designer for over 12 years, and I strongly believe this is the best time for product design, ever.") beside the About portrait, then the five About beliefs by title with their tinted tiles, then "More about me". `statement` drops `lines`, `text` and its own beliefs for `lead`, so the beliefs live in one place. The nav and the page title read "About me". Typecheck, lint, build, axe pass; shots light, dark, iPhone.

---

## 2026-10-05: Experience, calmer list and CoNaDzielni.pl

- **Agent:** Cursor agent (Claude)
- **Done:** the company list leads with the names (body, medium, ink) and keeps the years quiet; the small marks lose their frames. CoNaDzielni.pl joins as Head of design (2026 to now) with the owner's two achievements, and side work (CoNaDzielni.pl, Freelance) groups last under "Alongside" (ADR 0047 amendment; role cap 9 at the owner's request). Typecheck, lint, build, axe pass; shots light and dark.

---

## 2026-10-05: Side gig feature, CoNaDzielni.pl in a phone

- **Agent:** Cursor agent (Claude)
- **Done:** CoNaDzielni.pl is a full-width feature on Home: copy and link beside a 21 s loop of the live product in a phone that deals in on scroll, with three drifting category chips (ADR 0049). New schema fields `showcase.items[].loop` and `tags`; icons `music`, `clapperboard`, `palette`. The Side gigs note drops "Tap one to read more". Typecheck, lint, build, axe pass; the loop plays in view; shots light, dark, iPhone.

---

## 2026-10-05: Colour on About, tinted icon tiles

- **Agent:** Cursor agent (Claude)
- **Done:** a new contract utility `icon-tint` and `components/ui/IconTile.tsx` put the five card hues on the About glyph tiles: beliefs, the How I work loop, Education and Teaching (ADR 0048). Both themes define it. Typecheck, lint, build and axe pass; shots light and dark.

---

## 2026-10-05: About hero, the monster photo

- **Agent:** Cursor agent (Claude)
- **Done:** the About headline reads "All problems can be solved in an elegant way, even if they look ugly at a glance." (the headline budget is 18 words, at the owner's request). The portrait is his selfie with the orange monster, in a 4/3 frame through a new optional `portrait.ratio`. Typecheck, lint and the build pass; shots light, dark and iPhone.

## 2026-10-05: photos in Free time, and a travel tile

- **Agent:** Cursor agent (Claude)
- **Done:** the owner's photos lead the Free time tiles (climbing, tango, the milonga, travel), with the glyph as a badge on the photo. A fourth tile, "I travel with my family", with the `plane` glyph (new in the icon contract). Up to four items now; the note reads "Climbing, tango and travel with my family." `Picture` takes a `style` for the focal point. Typecheck, lint, theme:check and the build pass; axe is clean; shots light, dark and iPhone.

## 2026-10-05: Experience by company, with logos (ADR 0047)

- **Agent:** Cursor agent (Claude)
- **Done:**
  - **Layout:** one card per company with its logo, industry and span, and the roles on a rail inside (the current one in accent). A sticky list of company marks replaces the year rail.
  - **Logos:** Espago's mark added from its favicon; Freelance uses the `pen-tool` glyph (new in the icon contract).
  - **Miro bullets:** Content Explorer's beta week and GA, the Analytics rebuild's weekly visits, design-system contributions, and "See something, do something" with 19 production PRs (counted on GitHub). Enterprise Guard adds its $10M ARR. Up to four points per role now.
  - **Checks:** typecheck, lint, theme:check and the build pass; axe is clean; shots light, dark and iPhone.

## 2026-10-05: even belief rows

- **Agent:** Cursor agent (Claude)
- **Done:** "What I believe" drops the grid with a wider, larger closing card. Every belief is an even row on hairlines: glyph and title on the left, the reason on the right (stacked on phones). ADR 0044 amended. Lint and the build pass.

## 2026-10-05: beliefs that add something

- **Agent:** Cursor agent (Claude)
- **Done:** each "What I believe" card restated its title. Every text now gives the reason or the how behind the belief, built only from the owner's own statements. The build passes.

## 2026-10-05: stronger facts, a plainer working loop

- **Agent:** Cursor agent (Claude)
- **Done:**
  - **Facts:** "4 product companies" and "2,250 commits" are replaced by "Enterprise: delightful products for the world's biggest orgs" (the owner's words) and "$10M ARR from Miro's first add-on I designed" (the Enterprise Guard case). A fact value may now be `$10M` or one word. The commit count is also gone from the first principle.
  - **Loop:** plain copy for the note and every step. Discover now reads "understand the gaps and learn before proposing anything". A fifth step, Repeat, replaces the return arrows.
  - **Checks:** typecheck, lint and the build pass; no overflow on desktop or iPhone.

## 2026-10-05: the /work page heading

- **Agent:** Cursor agent (Claude)
- **Done:** `/work` has its own heading in `site.work.index`: "My big projects", "Some of my most impactful projects", and a note ending in a "Reach out" link to contact. Home keeps "Big projects" and "More big projects". Typecheck, lint and the build pass.

## 2026-10-05: "More big projects"

- **Agent:** Cursor agent (Claude)
- **Done:** the link under the featured cases reads "More big projects" instead of "All big projects". Typecheck passes.

## 2026-10-05: an aligned work grid, loops on hover

- **Agent:** Cursor agent (Claude)
- **Done:**
  - **Grid:** the wide card splits into two equal columns with a gap of the list gap plus both card paddings, so its cover lines up with the card below and its text with the right card's text. The lock line sits at the foot of every card, level across a row.
  - **Loops:** in listing cards, `play="hover"` plays on hover or focus on hover-capable screens and rewinds on leave; touch screens play once 60% is in view (ADR 0042 updated).
  - **Checks:** typecheck, lint and the build pass; playback checked on desktop and an emulated iPhone; axe is clean.

## 2026-10-05: icons on the case facts

- **Agent:** Cursor agent (Claude)
- **Done:** My role, Timeline, Team and Partners each lead with a small icon in the label colour (`user-round`, `calendar-range`, `users-round`, `handshake`, added to the icon contract and both themes). Typecheck, lint, theme:check and the build pass; axe is clean.

## 2026-10-05: "My role" in the case facts

- **Agent:** Cursor agent (Claude)
- **Done:** the first fact in the case header reads "My role" instead of "Role". Typecheck passes.

## 2026-10-05: a quiet case header (ADR 0046)

- **Agent:** Cursor agent (Claude)
- **Done:**
  - **Mocks:** three header layouts on Content Explorer, desktop and mobile, light and dark. The owner picked the quiet lede.
  - **Header:** the bottom line is a standfirst (`type-standfirst`, new in the contract and both themes) under the title. The facts run in one row of four under a hairline.
  - **Checks:** typecheck, lint, theme:check and the build pass. axe is clean on every case page at 1440 and 390. Shots in Dusk and Blueprint.

## 2026-10-05: re-recorded loops and stills, with dark takes (ADR 0045)

- **Agent:** Cursor agent (Claude)
- **Done:**
  - **Loops:** all three re-recorded at 1440×900, 2x, encoded to 1920×1200 at 30 fps. No focus rings, caret or scrollbars, calmer tags, a softer pointer and eased moves. Each loop ends where it starts. Content Explorer now filters, clears and searches instead of visiting the Content Lifecycle tab.
  - **Dark:** each loop has a dark take from the console's own dark theme. `Video` takes `dark` and shows one per colour mode, undimmed.
  - **Stills:** the Content Explorer views, the Analytics drill-down and use cases, and the Enterprise Guard classification were re-shot at 1440×900 with the side panel as an overlay.
  - **Checks:** typecheck, lint and the build pass. In light and dark mode, only that mode's loop plays.

## 2026-10-05: a polished mobile menu

- **Agent:** Cursor agent (Claude)
- **Done:**
  - **Sheet:** the mobile menu is solid canvas, so the page no longer bleeds through.
  - **Content:** Work and About are hairline rows with an arrow, and the current page has the accent dot. The home chapters follow as suit-marked tiles ("On the home page"). The theme toggle and "Say hi" share the bottom bar.
  - **Nav:** takes `sections` from `site.hand`.
  - **Checks:** typecheck, lint and the build pass. axe is clean on the open menu in light and dark. Shots of `/` and `/about`.

## 2026-10-05: swipe to book no longer trips the popup blocker (ADR 0039)

- **Agent:** Cursor agent (Claude)
- **Done:**
  - **Cause:** mobile browsers blocked the calendar tab because it opened after the 0.7s flight, outside the gesture.
  - **Fix:** on touch screens the tab now opens at once, inside the swipe or tap. If it is still blocked, the match caption offers a "Pick a time" link.
  - **Checks:** lint, typecheck and the build pass.

## 2026-10-05: an editorial About page (ADR 0044)

- **Agent:** Cursor agent (Claude)
- **Done:**
  - **Rewritten:** `/about` is now an opener with his elegant-way headline and a band of four numbers, then "What I believe" with five icon beliefs, then "How I work" as a connected loop above the principles, then experience, education and teaching side by side, and free time.
  - **Schema:** `about.facts`, `about.beliefs`, `values.loop` and an optional free-time `icon`. Icons are checked against the theme's `iconNames`, and 14 glyphs were added to both themes.
  - **Checks:**
    - typecheck, lint and the build pass.
    - axe is clean on `/about` in light and dark at 1440 and 390.
    - Shots in Dusk and Blueprint.

## 2026-10-05: "About me" in the owner's words (ADR 0043)

- **Agent:** Cursor agent (Claude)
- **Done:**
  - **Copy:** the home "About me" now says what he believes, from his own text, trimmed to the budgets.
  - **Beliefs:** a new optional `statement.beliefs` field (up to 4 × 16 words), shown as three columns on desktop and stacked on mobile.
  - **Checks:** typecheck, lint and the build pass. Shots in light and dark at 1440, and at 390.

## 2026-10-05: Miro stories, editorial case top, UI loops (ADR 0041, 0042)

- **Agent:** Cursor agent (Claude)
- **Done:**
  - **Stories:** Content Explorer, Miro Analytics and Enterprise Guard now tell the full story in chapters below the teaser, with a sticky "On this page" rail. The sources are the Figma deck (`fSTFAxmRFRkc2fQbRppfQ5`, page 11:379), the brag doc and the admin console. The deck's leftover Allegro placeholder text is not used.
  - **Case top:** company mark and year, a display title, the bottom line beside the facts, then the cover full width with a scroll tilt, then the metrics. `CaseFacts` is gone.
  - **Listing:** cards led by their cover. The Miro covers are now loops of shipped UI from `mds-admin-console` on the FlexFund demo org.
  - **Media:**
    - Real slide crops and 2x console stills replace the Miro placeholders under `public/media/protected/`, and slide crops got a white margin.
    - Screenshots with their own ratio now show whole.
    - `Video` dims in dark mode and can be decorative.
  - **Checks:**
    - typecheck, lint, `theme:check` and the build pass.
    - axe is clean in light and dark at 1440 and 390.
    - Shots in Dusk and Blueprint, light and dark, desktop and mobile.
    - Leak test: the locked pages, `/`, `/work`, `/about` and `/kit` hold no `/media/protected` path or story text. Home only references the three `/projects/<slug>/loop.mp4` files.
- **Open questions for the owner:**
  - Analytics says "We rebuilt analytics": which parts of the first launch were his, given that the data platform was engineering-owned?
  - Enterprise Guard: are the legal hold and lifecycle screens on the "other jewels" slide his designs?
  - Analytics research: what did the product data analysis show? The story only names it as a source.
  - Content Explorer: may visuals from the 93,000-line `vlab-csc-2026` model appear behind the password?
  - Analytics: the use-case widget shows behind the password, captioned "designed, not shipped yet". Is that fine?
- **Next:** stories for the Allegro and Egnyte cases from their decks.

## 2026-10-05: no "Lock cases" on case pages (ADR 0040)

- **Agent:** Cursor agent (Claude)
- **Done:**
  - **Removed:** "Unlocked · Lock cases" from unlocked case headers, along with `components/case/LockCases.tsx`, the `lock` server action and the `CaseHeader` `status` prop.
  - **Unchanged:** access still expires with the signed cookie.
  - **Checks:** typecheck, lint and the build pass. After unlocking `/work/miro-analytics`, the page has no lock text.

## 2026-10-05: like the letter photo to book a call (ADR 0039)

- **Agent:** Cursor agent (Claude)
- **Done:**
  - **Component:** `components/blocks/LetterPhoto.tsx`.
  - **Desktop:** the card tilts toward the pointer, lifts and zooms on hover, and shows a heart button (heart suit, `card-red`, frosted pill).
  - **Touch:** swipe right shows a "Let's talk" stamp, and past 90px or on a fling it counts as a like. The card nudges right once when it first scrolls into view, and the caption reads "Swipe right to book a call".
  - **A like:** hearts burst, the card flies off and fades, cal.com opens in a new tab, and the card comes back with a heart badge and "It's a match!".
  - **Reduced motion:** the heart opens the calendar straight away.
  - **Checks:** with Playwright, the heart click on desktop and the drag on touch both open `cal.com/patrykkarolak`. axe is clean, and typecheck, lint and the build pass.

## 2026-10-05: keycaps in the command menu footer

- **Agent:** Cursor agent (Claude)
- **Done:**
  - **Keycaps:** the footer hints are matching 24px keycaps (`rounded-print`, hairline border, a thicker bottom edge, canvas fill) instead of mixed round chips.
  - **Arrows and Enter:** the arrows are one icon rotated, so all four match, and Enter uses the `corner-down-left` icon.
  - **Layout:** hairline dividers separate the hint groups. "Change filter" is now "Filter".
  - **Nav:** the "⌘ K" chip uses the same keycap style.
  - **Checks:** axe is clean, and lint and the build pass. I checked light and dark.

## 2026-10-05: the closing letter in the owner's words, with photo and signature (ADR 0038)

- **Agent:** Cursor agent (Claude)
- **Done:**
  - **Copy:** "Hey there," and the owner's three paragraphs, with grammar and spelling fixed. There's no dash, and the third paragraph fits the 34-word budget exactly.
  - **Photo:** the winking, pointing portrait sits beside the text from `md`, slightly tilted.
  - **Signature:** "Patryk" in `type-hand` above "Patryk Karolak".
  - **Schema:** an optional `letter.photo`.
  - **Docs:** the font rule in AGENTS.md now allows the signature.
  - **Checks:** budgets, typecheck, lint and the build pass. axe is clean on the letter. I checked light, dark and 390px.

## 2026-10-05: the top-right corner sits on its own pill

- **Agent:** Cursor agent (Claude)
- **Done:** the Shortcuts hint and the theme toggle had no background, so content scrolled through them. They now sit in a `surface-strong` pill, the same frosted bar as the nav, 40px tall and centred on the nav's height. I checked scrolled `/work` screenshots in light and dark.

## 2026-10-05: explicit section names and plain home copy (ADR 0037)

- **Agent:** Cursor agent (Claude)
- **Done:**
  - **Card deck:** the owner's own words, verbatim: Hello!, Big projects, Side gigs, Teaching, Free time.
  - **Chapters and anchors:** they match the cards: About me `#about-me`, Big projects `#big-projects`, Side gigs `#side-gigs`, Teaching `#teaching`, Free time `#free-time`.
  - **About headings:** "More about me", "Experience", "Education".
  - **Command menu:** it reads its labels from the content titles.
  - **Copy:**
    - The intro is "Designing analytics and security tools at Miro", and the OG headline matches.
    - The hand note is "Pick a card to jump to a section".
    - The Big projects note is "Selected cases from Miro, Allegro and Egnyte."
    - The Side gigs detail is trimmed, and Free time lost its design metaphors.
  - **Voice rules:** a new "Voice" section in the content guide.
  - **Checks:** budgets, typecheck, lint, the build and `docs:check` pass. axe is clean on home, and every card anchor resolves. I checked the screenshots at 1440px and 390px.

## 2026-10-05: the nav's command hint says "Shortcuts"

- **Agent:** Cursor agent (Claude)
- **Done:**
  - **Hint:** the bare "⌘ K" at the top right is now "Shortcuts" plus a key chip.
  - **Platform:** `useModKey()` in `CommandMenu.tsx` picks "⌘ K" on Apple devices and "Ctrl K" elsewhere. It uses `userAgentData.platform`, with `navigator.platform` and the user agent as fallbacks.
  - **Hydration:** the server can't know the platform, so the chip stays transparent until hydration, and the layout doesn't shift.
  - **Accessibility:** `aria-keyshortcuts` follows the platform. The accessible name is the visible "Shortcuts".
  - **Checks:** with macOS and Windows emulated, the chip reads "⌘ K" and "Ctrl K", and Ctrl+K opens the menu. axe is clean, and lint and the build pass.

## 2026-10-05: work grouped by company, with tenure spans (ADR 0036)

- **Agent:** Cursor agent (Claude)
- **Done:**
  - **Timeline:** groups cases by company instead of by year: Miro "2022 to now", Allegro "2021 to 2022", Egnyte "2014 to 2021". Each group shows its logo tile. `lib/companies.ts` derives the logo from the hero intro and the span from the journey roles.
  - **Rows:** timeline rows drop the company caption, and the command menu shows the company without the year.
  - **Kept:** the case header, the locked page and the OG image still say "Company, year".
  - **Checks:** typecheck, lint and the build pass, and axe is clean on home and `/work`. I checked the screenshots at 1440px and 390px.

## 2026-10-05: command menu polish

- **Agent:** Cursor agent (Claude)
- **Done:**
  - **Rows:** every row has an icon tile (`rounded-inset`, hairline, canvas fill). The cases show their company's logo mark in the tile, taken from the hero intro, and the lock moves to the right. The selected row tints its tile icon with the accent.
  - **Motion:** the selection highlight and the active filter pill slide between rows and pills with a shared `layoutId` on the theme spring. `MotionConfig reducedMotion="user"` turns this off for reduced motion.
  - **Nesting:** the cases sit on one hairline guide under "The big ones" instead of a border on every row.
  - **Backdrop:** the palette's backdrop uses `surface-sheet` (blurred veil); the sheet placement keeps its plain scrim.
  - **Empty state:** an icon tile, "Nothing matches", and a hint that depends on the filter.
  - **Mobile:** below `sm`, the company and year text and the Enter hint are hidden, since the logo already says the company, so case titles fit.
  - **Checks:** axe is clean in light and dark under Dusk and Blueprint. Typecheck, lint, `theme:check` and the build pass.

## 2026-10-05: command menu with filters on top, like Cursor's

- **Agent:** Cursor agent (Claude)
- **Done:**
  - **Layout:** the palette is wider (680px) and lays out as a column. A large search field sits on top, then a row of filter pills (All, Work, Pages, Actions, Links), then the results, which scroll on their own. A footer lists the keys: ↑↓ Select, ↵ Open, ←→ Change filter, esc Close. The footer is hidden below `md`.
  - **Filters:** each group is a filter. Left and Right switch filters when the caret is at the edge of the query, so they still move the caret mid-text. The pills are `aria-pressed` buttons and keep focus in the search field.
  - **Rows:** an optional `meta` adds quiet detail on the right: company and year for cases, the case count for "The big ones", and the domain for links. Search matches the meta too, so "allegro" still finds Merchant Economic Tools.
  - **Groups:** "Go to" is now "Work" (The big ones plus the nested cases) and "Pages".
  - **Checks:** axe is clean with the menu open, in light and dark. Typecheck, lint, `theme:check` and the build pass. I checked the screenshots at 1440px and 390px.

## 2026-10-05: cases nest under "The big ones" in the command menu

- **Agent:** Cursor agent (Claude)
- **Done:**
  - **Data:** `Command` has an optional `parent` (the id of the item it nests under) and `locked`. In `app/layout.tsx` the cases sit right after "The big ones" with `parent: "work"`.
  - **Display:** the menu indents them on a hairline in a smaller type size. Protected cases show a lock and announce ", password protected".
  - **Search:** a matching child keeps its parent visible, and a matching parent shows all its children. "allegro" gives "The big ones" with Merchant Economic Tools under it, and "big ones" gives all six cases.
  - **Checks:** axe is clean with the menu open. Typecheck, lint, `theme:check` and the build pass.

## 2026-10-05: no duration on Content Explorer

- **Agent:** Cursor agent (Claude)
- **Done:** The owner pointed out that "kick-off to GA in twelve months" reads as a year of his own time, when it was the product's calendar and he was designing other initiatives in parallel. The bottom line now ends on adoption: 480 admins in the first public-beta week. The timeline fact is "GA Sep 2026". The partners line and the journey point say he designed it alongside Content Lifecycle, bulk actions and analytics. Rule for case copy: give dates, never durations that could be read as personal effort.

## 2026-10-05: checks and docs for the brag-doc update (`docs-verify`)

- **Agent:** Cursor agent (Claude)
- **Done:** Last todo of the plan "Brag doc into portfolio".
  - **Docs:** ADR 0035 covers the six cases, the prototype-first loop, and allowing numbers but not customer names. It amends ADR 0034. The content guide covers the six cases and `values.note`. The plan, README and `AGENTS.md` now say six cases.
  - **Checks:** lint, typecheck, `docs:check` and the build pass, and `theme:check` passes under Dusk and Blueprint.
  - **Axe** (WCAG 2.2 AA plus best practice) is clean at 1440 and 390, light and dark, on `/`, `/about`, `/work`, a locked case and three unlocked cases, Content Explorer included.
  - **Leak test:** nothing protected in public HTML, the sitemap or the six OG images.
  - **`pnpm shots`** re-ran with no overflow.
- **Owner to do:** export these and swap the placeholders, using new file names:
  - Content Explorer: the four views, the working model and FilterPill.
  - Analytics: the staged prototype (Skateboard, Bike, Ferrari).
  - The Figma slides listed in the 2026-10-01 `visuals` entry.
- **Next:** `qa` and `docs-final` from the checklist.

## 2026-10-05: prototype first, loud and clear (`how-i-work`)

- **Agent:** Cursor agent (Claude)
- **Done:** `values` has an optional `note` (24 words), shown under the heading. It reads: "Discover, prototype, validate, merge. The prototype is the spec, so decisions start from something that works." "How I work" now leads with two values:
  1. "Prototype it, prove it, merge it". Evidence: Content Explorer.
  2. "Figma for pixels, prototypes for decisions". Evidence: Enterprise Guard's master prototype. It says Figma is for deep UI exploration, fast and cheap, and a fully interactive prototype is the deliverable for big projects.

  Research and workshops stay. "Test even what you love" and "Over-communicate, one on one" are cut to keep four values: the loop covers testing, and the Enterprise Guard case still tells the 1:1 story.

  The same loop now appears in more places:
  - **Short version:** "Research first, always. Then a working prototype, not a picture."
  - **About:** the second paragraph.
  - **Journey:** the current Miro role's points (Content Explorer, FilterPill and two production PRs), with links to Content Explorer and Analytics.
- **Next:** `docs-verify`.

## 2026-10-05: better numbers in the Miro cases (`upgrade-cases`)

- **Agent:** Cursor agent (Claude)
- **Done:**
  - **Enterprise Guard:** the "4 development teams" metric is now "199 paying accounts on the add-on, about $10M ARR since launch". That is the product's number, from the brag doc. The Ship beat closes on the add-on growing into content lifecycle, data discovery and integrations. Ask me about: "How one designer kept five PMs in step".
  - **Miro Analytics:** the Ship beat adds that use-case and AI analytics are designed and gated by role. They are not claimed as shipped. The "With actionability" placeholder is replaced by the staged prototype (Skateboard, Bike, Ferrari) with its colour-blind-safe palette, which is also a placeholder for now. A new ask-me-about item covers the permission rule from the September review: Company Admins see the numbers, not the boards.
- **Next:** `how-i-work`.

## 2026-10-05: Content Explorer leads (`confirm-ga`, `content-explorer`)

- **Agent:** Cursor agent (Claude)
- **Done:** The owner confirmed that Content Explorer reached GA on 25 Sep 2026, and approved the team line. The brag doc's 82% figure stays out because its denominator is unclear. `content/projects/content-explorer.ts` (2026, protected) is first in `index.ts`, which now checks for six cases, so home shows Content Explorer, Miro Analytics and Enterprise Guard.
  - **Numbers:** 46 organisations asked for the private beta, 480 admins used it in the first public-beta week across 100+ enterprises, and 15 of 22 pilot organisations came back on four or more days.
  - **Beats:** about 2,000 manual requests a quarter and 80,000-board organisations, then the Available, In trash, Retained vocabulary and the full-stack prototype, then GA.
  - **Artifacts:** the four views, the admin roles diagram, the 93,000-line working model and FilterPill. Three of them are placeholders.

  No customer names. The cover is the Miro logo on an amber card.
- **Next:** `upgrade-cases`.

## 2026-10-01: checks and docs for the real cases (`verify-docs`)

- **Agent:** Cursor agent (Claude)
- **Done:** Last todo of the plan "Real cases from Figma".
  - **Checks:** typecheck, lint and `docs:check` pass, `theme:check` passes under Dusk and Blueprint, and the production build is green.
  - **Axe** (WCAG 2.2 AA plus best practice) is clean at 1440 and 390, in light and dark, on `/`, `/about`, `/work`, a locked case, and two unlocked cases (one with the compare slider).
  - **Leak tests** found no protected text or media in public HTML, the sitemap or the OG images. The only hit is the `robots.txt` disallow line.
  - **`pnpm shots`** re-ran with no overflow. `/work` replaces the old public case capture.
  - **Docs:** the content guide now covers the real-content rule, optional email, hidden testimonials and swapping slide placeholders. The plan lists the five real cases.
- **Tooling note:** `pnpm` is not installed globally on this machine any more, so commands ran as `npx pnpm@10.20.0 …` (the version in `packageManager`).
- **Owner to do:** export the placeholder slides (node ids in the `visuals` entry). Add real testimonials and an email when wanted. Optionally add a CV PDF as `site.resume`.
- **Next:** `qa` and `docs-final` from the checklist.

## 2026-10-01: the site speaks with real content (`site-content`)

- **Agent:** Cursor agent (Claude)
- **Done:** All of `content/site.ts` now traces to the Figma CV page or the owner's answers:
  - **Short version:** research first, workshops, and prototypes that keep teams in step.
  - **About:** the story is set in Poznań, names the companies since 2014, borrows its lessons from the decks, and closes with studies, teaching and after hours.
  - **Education:** the three real courses ("School days").
  - **Journey:** all eight roles, each linking to its case. `kind` names the domain, because the CV doesn't give employment types.
  - **Teaching:** Collegium Da Vinci, plus the talks and workshops.
  - **How I work:** four values, each backed by a real case.
  - **Side quests:** CoNaDzielni.pl is the only one (Head of Design, 2026), with a link to the site.

  Also changed:
  - Testimonials are removed, so the block hides. `/kit` keeps a labelled sample to review it.
  - The template footnote is gone. LinkedIn is `patkarolak`.
  - `links.email` is optional, and the owner wants no email for now. So the letter and contact block lead with "Book a call", the copy-email actions and the command menu item hide, and `/kit` follows.
  - Case artifacts keep their own ratio (slides are 16:9) instead of the slot's 4:3 or 1:1, which cropped the slide labels.
- **Next:** `verify-docs`.

## 2026-10-01: covers and slide placeholders (`visuals`)

- **Agent:** Cursor agent (Claude)
- **Done:**
  - **Covers:** neutral, as ADR 0034 asks. The company logo sits on a white tile on a suit-tinted card face, with suit glyphs in two corners, in light and dark versions (`public/projects/<slug>/cover-{light,dark}.png`, 1600 by 1000):
    - Analytics: hearts and rose.
    - Enterprise Guard: spades and blue.
    - Merchant tools: diamonds and amber.
    - Egnyte platform: clubs and green.
    - Data Access: the joker and violet.

    There is no product UI on any cover.
  - **Figma exports:** blocked. The MCP returned the View seat call limit, so only one real slide is in: "It started super small" for Miro Analytics (`started-small.png`, 1024 wide).
  - **Placeholders:** every other slide image is a labelled placeholder under `public/media/protected/<slug>/`. Each one names the slide and its Figma node id, so the owner knows what to export. When swapping in an export, give it a new file name and update the case file.
  - **Leak tests** (`/`, `/work`, `/about`, every locked `/work/<slug>`, the sitemap and the OG images): no beat, caption, ask-me item or metric label appears, and no `/media/protected` path except the `robots.txt` disallow line. Protected files answer 401 without the cookie, and the image optimiser refuses them with 400.
- **Owner to do:** export these slides at 16:9 and replace the placeholders:
  - Analytics: 1249:14839.
  - Enterprise Guard: 1232:1743, plus 1249:14969 split into before and after.
  - Merchant tools: 74:1531 and 79:1222.
  - Egnyte platform: 74:1345 and 68:1100.
  - Data Access: 70:2086 and 70:2226.
- **Next:** `site-content`.

## 2026-10-01: five real cases (`cases`)

- **Agent:** Cursor agent (Claude)
- **Done:** `content/projects/` now holds Miro Analytics (2024), Miro Enterprise Guard (2022), Merchant Economic Tools (Allegro, 2021), Egnyte as a product platform (2020) and Data Access Management (Egnyte, 2020). They're in that order, so the two Miro cases and the Allegro case lead on home. All are protected, and `index.ts` checks for exactly five. Every number and claim comes from a deck slide. Each Frame, Shape and Ship beat is one tension, one move and one result. Two closures were reconstructed with the owner's consent, because their decks stop before a result:
  - Merchant Economic Tools: the Ship beat names what we set out to measure (pilot merchants using the tool, and staying on fulfillment), not a result.
  - Data Access Management: the Ship beat states the deck's two KPIs as what we tracked.

  The fictional cases (Keel, Dispatch board, Runway, Accessible by default) and their media are gone. The `/kit` side-quest fixtures that borrowed their images now show suit colour, and `pnpm shots` captures `/work` and `/work/miro-analytics` instead.
- **Next:** `visuals`.

## 2026-10-01: real cases are the rule (`rules-schema`)

- **Agent:** Cursor agent (Claude)
- **Done:** `AGENTS.md` now says the cases use the real companies and projects, and that every fact must trace to the owner's material. README and the plan say the same. ADR 0034 records the switch to five real cases: all protected, neutral logo covers, slide-image placeholders until the owner exports them. `LockedNote` now counts every case, not just the three on home, and says "All five are password protected" when all are locked. The locked page already drops its "open cases" line when none is public. The check for exactly five cases lands with the case files in `cases`.
- **Next:** `cases`.

## 2026-10-01: owner's answers for the real cases (`ask-gaps`)

- **Agent:** Cursor agent (Claude)
- **Done:** The local repo had gone missing, so I re-cloned it at `439e9a1` and kept `.env.local` (`restore`). Then I asked the owner about everything the Figma decks leave open. His answers, which the copy relies on:
  - Years: Miro Analytics 2024, Enterprise Guard 2022, Merchant Economic Tools 2021, Egnyte as Product Platform 2020, Data Access Management 2020.
  - Outcomes for Merchant Economic Tools and Data Access Management: "bring in some closure story that will sound reasonably... focus on what we might have measured." So the Ship beats describe what was handed over and what was tracked, with no invented launch numbers.
  - Placeholder slides: the pasted Allegro paragraph in several Analytics and Enterprise Guard slides sits in hidden layers. Only the visible slide headings are used.
  - Visuals: Figma export hit the View seat limit. Put placeholders where a slide image belongs; the owner fills them in later.
  - Based in Poznań. No email on the site for now. LinkedIn is `linkedin.com/in/patkarolak`, and `cal.com/patrykkarolak` is valid.
  - Co na dzielni: Head of Design since 2026. It is not the Glanc project.
  - Off the clock keeps climbing, tango and DJ-ing.
- **Next:** `rules-schema`.

## 2026-10-01: no focus ring on a chapter heading after a jump

- **Agent:** Cursor agent (Claude)
- **Done:** After a card or the dock jumps to a chapter, focus moves to its heading so screen readers announce it. Phones drew the browser's focus outline around the heading. `goToChapter` now turns the outline off on that heading, which is not interactive, and asks for `focusVisible: false`. Checked at 390 in Playwright: focus is on `side-quests-title` with `outline: none`.

## 2026-10-01: contact form removed

- **Agent:** Cursor agent (Claude)
- **Done:** The owner found the form a stretch. Removed `components/blocks/ContactForm.tsx`, `app/actions/contact.ts`, `site.contactForm` and its schema, the `/kit` specimen, the Resend variables in `.env.example` and the Resend section in `docs/operations.md`. Home ends on the letter again, which is `#contact`, so "Say hi" lands there. ADR 0033 is marked withdrawn, and the plan, architecture, content guide, `DESIGN.md` and ADR 0031 no longer mention the form. Typecheck, lint, `docs:check` and the build pass.

## 2026-10-01: checks and docs for the clear IA (`verify-docs`)

- **Agent:** Cursor agent (Claude)
- **Done:** Last todo of the plan "Clear IA and card nav". Lint, typecheck and `theme:check` pass under Dusk and Blueprint, `docs:check` passes and the production build is green. Axe (WCAG 2.2 AA plus best practice) is clean on `/`, `/about` and `/work` at 1440 and 390 in light and dark, after making the `/work` year headings `h2` under its `h1`. Playwright flows: under reduced motion a card jumps straight to `#office-hours`, with no flight. On a phone the second card in the swipe row flies to "The big ones", the dock names it, and the back button returns to the page without a hash. The flight, the dock and the form were checked in their own todos. `pnpm shots` re-run. Updated `DESIGN.md` (playing-card uses, motion), `docs/content-guide.md` (the chapter fields, `contactForm`, `resume`), `docs/plan.md` (Home, `/work` and About compositions) and `docs/architecture.md` (routes, contact anchor). ADR 0017 is marked superseded by 0032.
- **Owner to do:** set up Resend ([operations](operations.md)), add a CV PDF and `site.resume` if wanted, and decide which three cases lead on home (`content/projects/index.ts`).
- **Next:** `qa` and `docs-final` from the checklist.

## 2026-10-01: "Drop me a line" (`contact-form`)

- **Agent:** Cursor agent (Claude)
- **Done:** A contact form after the letter on home (`components/blocks/ContactForm.tsx`), sent by the `sendContact` Server Action (`app/actions/contact.ts`) through Resend's REST API. It validates with zod, has a honeypot and a 3-second minimum, keeps values on error, focuses the first invalid field and announces success with the Toaster. Copy email and LinkedIn sit underneath. When the form shows, the letter's anchor moves to `#letter` and the form takes `#contact`. `RESEND_API_KEY`, `CONTACT_TO` and the optional `CONTACT_FROM` are in `.env.example` (names only) and in `docs/operations.md` with the Resend and Firewall setup. Also on `/kit`. Checked in Playwright at 1440 dark and 390 light without Resend keys (the development dry run): three field errors, focus on the name field, then the toast and an empty form. ADR 0033.
- **Owner to do:** create the Resend key, set the variables in Vercel and `.env.local`, and add the rate limit rule.
- **Next:** `verify-docs`.

## 2026-10-01: About becomes "The long version" (`about-resume`)

- **Agent:** Cursor agent (Claude)
- **Done:** The About opener's label reads `about.title` ("The long version"). The journey is "Where I've been", the values are "How I work", and education takes its heading from `educationTitle` ("School days"). When `site.resume` is set (a PDF under `public/`), a "Grab the CV" style primary button sits under the story and downloads it. `PrimaryLink` gained `download` for that. No PDF is in the repo yet, so the button stays hidden until the owner adds one. The nav call to action, on desktop and in the phone menu, now reads "Say hi".
- **Next:** `contact-form`.

## 2026-10-01: "All the big ones" and "All side quests" (`work-index`)

- **Agent:** Cursor agent (Claude)
- **Done:** The home chapter "The big ones" shows the first `work.featured` (3) cases in content order and, when there are more, ends with "All the big ones" linking to the new `/work` index (`app/work/page.tsx`). The index lists every case with its cover only, as home does, so nothing protected leaks (checked: no `/media/protected` in its HTML). It returns 404 and stays out of the sitemap when every case fits on home. The locked-cases sentence is now `LockedNote`, shared by both. "Side quests" shows `showcase.featured` items, and when there are more, an "All side quests" button reveals the rest in place (there is no side-quest page). The kit's showcase has a fourth item to show it. Today's home hides "Accessible by default" (2021, the only public case) behind the index; reorder `content/projects/index.ts` to change which three lead.
- **Next:** `about-resume`.

## 2026-10-01: the docked mini-hand (`hand-dock`)

- **Agent:** Cursor agent (Claude)
- **Done:** `components/site/HandDock.tsx`: once the hero hand has scrolled away above the viewport, a `surface-strong` pill docks at the bottom centre with the five cards in miniature (28 by 40px, tinted, 44px tap targets). It is a scrollspy: the chapter whose top has passed 40% of the viewport is raised, tilted and named (`aria-current="location"`). Hovering or focusing the dock names every chapter on wide screens. A tap runs `goToChapter`, so the mini card flies to the emblem. The dock leaves while anything marked `data-dock-hide` (the letter, the contact block) or the footer is in view. Checked in Playwright at 1440 and 390: hidden at the top, shown with "The big ones" current, a click on the joker lands on `#off-the-clock`, and it is gone over the letter.
- **Next:** `work-index`.

## 2026-10-01: picked cards fly to their chapter (`card-flight`)

- **Agent:** Cursor agent (Claude)
- **Done:** Picking a card no longer opens an overlay. The page scrolls to the card's chapter while the card flies along a short arc and lands on the chapter's emblem, with a haptic tap. Then the hash updates and focus moves to the heading. Reduced motion jumps instantly. Scrolling by hand mid-way stops the flight. The new `components/blocks/flight.tsx` holds `goToChapter` and `FlightLayer` (portalled to the body, so it flies above the nav). `CardZoom`, `AboutTeaser` and the hand's `panels` are gone, and the `zoom` motion token became `fly` in the contract and both themes. Checked at 1440 in Playwright: the diamond lands on "Side quests", the hash is `#side-quests` and focus is on `side-quests-title`. ADR 0032.
- **Next:** `hand-dock`.

## 2026-10-01: chapter emblems (`chapters`)

- **Agent:** Cursor agent (Claude)
- **Done:** Suited block headings now show the chapter's card in miniature (`ChapterEmblem` in `components/blocks/ChapterHeader.tsx`): a 40 by 56px `playing-card` with the suit's tint and glyph, tilted 5°, in place of the bare suit glyph. It listens for `hideEmblem` and `landEmblem`, so a card flying in from the hand can take its place and settle. "The short version" (the Statement block, `#short-version`) is now a chapter with the heart emblem, its two lines, two sentences and a link to "The long version". `suitTint` moved to `components/ui/Suit.tsx`. Chapter sections clear the nav when jumped to.
- **Next:** `card-flight`.

## 2026-10-01: chapters and names (`ia-copy`)

- **Agent:** Cursor agent (Claude)
- **Done:** First todo of the plan "Clear IA and card nav". The five cards now name the five home chapters: "The short version", "The big ones", "Side quests", "Office hours" and "Off the clock", with matching anchors. Testimonials became "Word of mouth". The schema gained `featured` and `more` on work and showcase, `about.title`, `educationTitle`, an optional `resume` and a `contactForm` copy block. Writing is gone from the schema, the kit and the home page. Links to `/#work` now go to `/#big-ones`. ADR 0031.
- **Next:** `chapters`, the emblem card beside each chapter heading and the new home order.

## 2026-10-01: a closer face in the nav avatar

- **Agent:** Cursor agent (Claude)
- **Done:** The nav avatar squeezed the whole arms-crossed photo into 32px. A square face crop (`public/about/patryk-face.jpg`, 240px) is now set as the new optional `avatar.face`, which the nav uses in place of `src`.
- **Verified:** lint, typecheck, build; nav close-up in dark mode.

## 2026-10-01: a smoother sway

- **Agent:** Cursor agent (Claude)
- **Done:** The swipe row's shake became one elegant sway: a glide 44px left with a slight tilt from the bottom edge, an eased return with a 5px overshoot and a quiet settle (1.15s, ease in and out throughout, 45ms ripple between cards). `motion.shake` gained `rotate`; Blueprint's is slower (ADR 0030 amended).
- **Verified:** lint, typecheck, `theme:check` under both themes, build; a frame trace on an iPhone 13 emulation shows one even curve out and back with no snap.

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
