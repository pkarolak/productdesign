import { showcaseSchema, type Site } from "./schema";
import { site } from "./site";

/**
 * Fixtures for /kit: every block with full content, including blocks the live site leaves empty.
 * Only /kit reads this file.
 */
export const kit: Site = {
  ...site,
  showcase: showcaseSchema.parse({
    title: "Side quests",
    note: "Small tools and rituals I keep coming back to. Tap one to open it.",
    more: "All side quests",
    items: [
      {
        id: "crit-cards",
        kicker: "Workshop kit",
        title: "Crit cards",
        text: "A printed deck that keeps design reviews on the problem, not the pixels.",
        image: { src: "/projects/accessible-by-default/workshop.jpg", alt: "A workshop table with printed cards and sticky notes." },
        detail:
          "Forty cards, one question each, sorted by stage. Teams draw three at the start of a critique and answer them before anyone mentions colour. Reviews got shorter and the notes got sharper.",
        link: { label: "Ask for a copy", href: "#contact" },
      },
      {
        id: "scorecard",
        kicker: "Template",
        title: "Accessibility scorecard",
        text: "A one-page scorecard that turns an audit into a weekly habit.",
        image: { src: "/projects/accessible-by-default/scorecard.jpg", alt: "An accessibility scorecard with conformance bars per team." },
        detail:
          "Seven checks, one owner each, reviewed every Friday. It started as a spreadsheet for one team and ended up in the handbook for all of them.",
      },
      {
        id: "desk",
        kicker: "Ritual",
        title: "Paper first",
        text: "Every project starts on paper, away from the screen, for one hour.",
        image: { src: "/about/portrait.jpg", alt: "A desk with sketches, a film camera and a laptop." },
        detail:
          "One hour, one sheet, no laptop. The goal is to write down what the product must never do before drawing what it should do.",
      },
    ],
  }),
};
