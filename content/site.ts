import { siteSchema } from "./schema";

/** Wrap one word in *asterisks* to render it as a heading's single emphasis. */
export const site = siteSchema.parse({
  name: "Patryk Karolak",
  role: "Product designer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://patrykkarolak.vercel.app",
  description:
    "Product designer shaping workflow, platform and 0 to 1 products. Selected work from Ledgerline and Halden.",
  hero: {
    greeting: "Hi, I'm Patryk.",
    tagline: "Product designer.",
    intro: [
      "I design workflow and platform products at",
      { pill: "Ledgerline", href: "/work/keel-design-system" },
      "and before that at",
      { pill: "Halden", href: "/work/dispatch-board" },
      ". Based in Warsaw.",
    ],
    headline: "I design the *systems* product teams build on.",
  },
  doors: [
    {
      label: "Recent work",
      title: "Four product stories, readable in half a minute.",
      cta: "See the work",
      href: "#work",
      target: "work",
    },
    {
      label: "Side things",
      title: "What I make when nobody asked for it.",
      cta: "Take a look",
      href: "#showcase",
      target: "showcase",
    },
    {
      label: "About",
      title: "How I work and what I value.",
      cta: "Meet me",
      href: "/about",
      target: "about",
    },
  ],
  statement: {
    label: "A bit about me",
    lines: ["Calm interfaces for complex work.", "Numbers first, pixels second."],
    text: "I work where products get complicated: money, freight and the systems that hold them together. I lead through prototypes, numbers and a lot of listening.",
    cta: { label: "More about me", href: "/about" },
  },
  work: {
    title: "Some recent work",
    note: "Four cases, each readable in half a minute.",
  },
  testimonials: {
    title: "What it is like to work with me",
    items: [
      {
        quote:
          "Patryk turns a messy brief into a plan the whole team can see. We shipped the dispatch board with fewer fields and fewer arguments.",
        name: "Marta Lis",
        role: "Engineering lead",
        company: "Halden",
      },
      {
        quote:
          "He brings numbers to design reviews, which made them shorter and better. Our design council still runs the way he set it up.",
        name: "Tomasz Wrona",
        role: "Head of platform",
        company: "Ledgerline",
      },
      {
        quote:
          "He sat through night shifts with our dispatchers before drawing anything. You can feel that in every screen.",
        name: "Ines Carvalho",
        role: "Operations director",
        company: "Halden",
      },
    ],
  },
  letter: {
    salutation: "Dear future teammate,",
    paragraphs: [
      "I like hard problems, kind teams and products people rely on at work.",
      "If you are building something like that and want a designer who will sit with your users and your engineers, I would love to hear from you.",
    ],
    signoff: "Patryk",
  },
  about: {
    headline: "Calm interfaces for *complex* work.",
    story: [
      "I am a product designer based in Warsaw. For twelve years I have worked where products get complicated: money, freight and the systems that hold them together.",
      "I lead through prototypes, numbers and a lot of listening. Most of my best decisions were removals, and most of them came from watching the work, not asking about it.",
    ],
    portrait: {
      src: "/about/portrait.jpg",
      alt: "Patryk Karolak's desk with sketches, a film camera and a laptop in soft morning light.",
    },
  },
  education: [
    { school: "Vistula School of Interaction", degree: "MSc, Interaction Design", years: "2011 to 2013" },
    { school: "Northgate Academy of Arts", degree: "BA, Graphic Design", years: "2008 to 2011" },
  ],
  journey: {
    title: "My journey",
    note: "Twelve years across studio, product and platform work.",
    roles: [
      {
        from: 2022,
        company: "Ledgerline",
        role: "Design lead, platform",
        kind: "Full-time",
        summary: "Design system and finance tooling used by sixteen product teams.",
        points: [
          "Built the Keel system with a council of engineers and designers.",
          "Shaped the forecasting app that 18k owners open every week.",
        ],
        cases: ["keel-design-system", "runway-forecast"],
      },
      {
        from: 2018,
        to: 2022,
        company: "Halden",
        role: "Lead product designer",
        kind: "Full-time",
        summary: "Freight operations software for dispatchers, drivers and depot managers.",
        points: [
          "Redesigned load assignment from three minutes to thirty-eight seconds.",
          "Made accessibility a default in the component library, not a review step.",
        ],
        cases: ["dispatch-board", "accessible-by-default"],
      },
      {
        from: 2015,
        to: 2018,
        company: "Fieldnote",
        role: "Product designer",
        kind: "Full-time",
        summary: "Research tooling for field teams, from offline notes to shared insight boards.",
        points: ["Designed the offline-first capture flow for field researchers."],
      },
      {
        from: 2013,
        to: 2015,
        company: "Studio Parallax",
        role: "Interaction designer",
        kind: "Studio",
        summary: "Web and kiosk interfaces for museums and public institutions.",
      },
    ],
  },
  values: {
    title: "Values I work by",
    items: [
      {
        title: "Price the problem first",
        text: "I frame design work in hours, risk and revenue, so it gets funded instead of tolerated.",
        evidence: "accessible-by-default",
      },
      {
        title: "Earn adoption, never mandate it",
        text: "Systems win when teams choose them. I design with the people who will live with the result.",
        evidence: "keel-design-system",
      },
      {
        title: "Watch the work, then cut",
        text: "Shadowing real shifts beats any survey. Most of my best decisions were removals.",
        evidence: "dispatch-board",
      },
    ],
  },
  outside: {
    title: "Outside of work",
    items: [
      {
        title: "I restore old film cameras.",
        text: "Taking a shutter apart teaches patience and respect for mechanisms somebody designed decades ago. Most of them still work better than expected.",
      },
      {
        title: "I cycle too far.",
        text: "Long rides are where I untangle problems. The best ideas tend to arrive around kilometre eighty, usually far from a notebook.",
      },
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
