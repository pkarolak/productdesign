import { siteSchema } from "./schema";

/** Wrap one word in *asterisks* to render it as the heading's single emphasis. */
export const site = siteSchema.parse({
  name: "Patryk Karolak",
  role: "Product designer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://patrykkarolak.vercel.app",
  description:
    "Product designer shaping workflow, platform and 0 to 1 products. Selected work from Ledgerline and Halden.",
  hero: {
    headline: "I design the *systems* product teams build on.",
    lede: "Twelve years shaping workflow, platform and 0\u00a0to\u00a01 products at Ledgerline and Halden.",
    metrics: [
      { value: "88", unit: "%", label: "system adoption", context: "14 of 16 teams" },
      { value: "38", unit: "s", label: "to assign a load", context: "down from 3 min" },
      { value: "18", unit: "k", label: "weekly app owners", context: "by month four" },
    ],
    plates: [
      {
        src: "/projects/dispatch-board/cover.jpg",
        alt: "Halden dispatch board showing loads, drivers and live route status.",
      },
      {
        src: "/projects/accessible-by-default/cover.jpg",
        alt: "Accessibility scorecard dashboard with conformance bars for seven teams.",
      },
    ],
  },
  approach: [
    {
      title: "Price the problem first",
      text: "I frame design work in hours, risk and revenue, so it gets funded instead of tolerated.",
      long: "Before a pixel moves, I put a number on the cost of the status quo. Rework hours, defect rates, lost tenders. It turns design from a request into an investment, and it tells the team when we are done.",
      evidence: "accessible-by-default",
    },
    {
      title: "Earn adoption, never mandate it",
      text: "Systems win when teams choose them. I design with the people who will live with the result.",
      long: "A mandate buys compliance for a quarter. Contribution buys ownership for years. I run councils, pair with engineers and ship migration kits, so the right path is also the easy one.",
      evidence: "keel-design-system",
    },
    {
      title: "Watch the work, then cut",
      text: "Shadowing real shifts beats any survey. Most of my best decisions were removals.",
      long: "I spend time where the work happens: night shifts, support queues, owner kitchens. What people do tells me what to remove. The dispatch board shipped with 23 fewer fields and nobody asked for them back.",
      evidence: "dispatch-board",
    },
  ],
  about: {
    headline: "Calm interfaces for *complex* work.",
    bio: "I am a product designer based in Warsaw. For twelve years I have worked where products get complicated: money, freight and the systems that hold them together. I lead through prototypes, numbers and a lot of listening. Away from the screen I restore old film cameras and cycle too far.",
    portrait: {
      src: "/about/portrait.jpg",
      alt: "Patryk Karolak's desk with sketches, a film camera and a laptop in soft morning light.",
    },
    experience: [
      { role: "Design lead, platform", company: "Ledgerline", years: "2022 to now" },
      { role: "Lead product designer", company: "Halden", years: "2018 to 2022" },
      { role: "Product designer", company: "Fieldnote", years: "2015 to 2018" },
      { role: "Interaction designer", company: "Studio Parallax", years: "2013 to 2015" },
    ],
  },
  links: {
    email: "hello@patrykkarolak.com",
    linkedin: "https://www.linkedin.com/in/patrykkarolak",
    calendar: "https://cal.com/patrykkarolak",
  },
  contact: {
    headline: "The full story is better *in person*.",
    text: "Every case here has a longer version with the messy middle. I am happy to walk you through it.",
  },
  footnote: "Template content: companies, people and numbers are fictional placeholders.",
});
