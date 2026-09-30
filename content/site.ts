import { siteSchema } from "./schema";

/** Wrap one word in *asterisks* to render it as a heading's single emphasis. */
export const site = siteSchema.parse({
  name: "Patryk Karolak",
  role: "Product designer",
  avatar: { src: "/about/patryk.jpg", alt: "Patryk Karolak in a white T-shirt against a light wall." },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://patrykkarolak.vercel.app",
  description:
    "Product designer shaping workflow, platform and 0 to 1 products. Selected work from Ledgerline and Halden.",
  hero: {
    greeting: "Hi, I'm Patryk.",
    tagline: "Product designer and sport freak with gotan soul.",
    glossary: [
      {
        term: "Product designer",
        phonetic: "ˈprɒd.ʌkt dɪˈzaɪ.nə",
        kind: "noun",
        senses: [
          "A person who works out what a product should do and how it should feel, then tests it with real people until it does.",
          "In this case: someone who would rather remove a feature than add one.",
        ],
      },
      {
        term: "sport",
        phonetic: "spɔːt",
        kind: "noun",
        senses: [
          "Climbing, running and anything else that ends with tired legs.",
          "The place where hard problems quietly untangle themselves.",
        ],
        origin: "Middle English, shortened from disport, to divert oneself.",
      },
      {
        term: "gotan",
        phonetic: "ɡoˈtan",
        kind: "noun, lunfardo",
        senses: [
          "Tango, with its syllables swapped, in the street slang of Buenos Aires.",
          "Here: a love for the dance, the music and long nights at the milonga.",
        ],
        origin: "Rioplatense Spanish vesre, reversed speech, from tango.",
      },
    ],
    intro: [
      "I design workflow and platform products at",
      { pill: "Ledgerline", href: "/work/keel-design-system" },
      "and before that at",
      { pill: "Halden", href: "/work/dispatch-board" },
      ". Based in Warsaw.",
    ],
    headline: "I design the *systems* product teams build on.",
  },
  handNote: "Pick a card to see some tricks",
  deck: {
    joker: { src: "/cards/bandoneon-line-light.png", srcDark: "/cards/bandoneon-line-dark.png" },
    back: { src: "/cards/back-milonga-light.jpg", srcDark: "/cards/back-milonga-dark.jpg" },
  },
  hand: [
    { title: "Hi!", text: "Who I am and how I work.", href: "/about", target: "about", suit: "heart" },
    { title: "Core work", text: "The biggest tools I shaped.", href: "#work", target: "work", suit: "spade" },
    { title: "Side projects", text: "Tinier gigs, quick and fun.", href: "#side-projects", target: "showcase", suit: "diamond" },
    { title: "Teaching", text: "Years as an academic tutor.", href: "#teaching", target: "teaching", suit: "club" },
    { title: "My world", text: "Climbing, tango and the records.", href: "#my-world", target: "outside", suit: "joker" },
  ],
  statement: {
    label: "A bit about me",
    lines: ["Calm interfaces for complex work.", "Numbers first, pixels second."],
    text: "I work where products get complicated: money, freight and the systems that hold them together. I lead through prototypes, numbers and a lot of listening.",
    cta: { label: "More about me", href: "/about" },
  },
  work: {
    title: "Core work",
    note: "The biggest tools I shaped. Each reads in thirty seconds.",
  },
  showcase: {
    title: "Side projects",
    note: "Tinier gigs for friends, festivals and hackathons. Tap one for the story.",
    items: [
      {
        id: "crux-booking",
        kicker: "Freelance, 2024",
        title: "Crux wall booking",
        text: "Slot booking for a bouldering gym that replaced a paper list at the desk.",
        detail:
          "Two weekends, one owner and a very full Tuesday night. Members book a slot on their phone, staff see the wall fill up on a tablet, and the paper list retired. No-shows dropped once reminders went out an hour before.",
      },
      {
        id: "festival-signs",
        kicker: "Pro bono, 2023",
        title: "Festival wayfinding",
        text: "Signs, schedule and a tiny web app for a three-day tango festival.",
        detail:
          "Three venues, forty workshops and guests from twelve countries. I drew one schedule grid and reused it on posters, lanyards and a phone page, so people stopped asking where the next class was.",
      },
      {
        id: "tram-alerts",
        kicker: "Hackathon, 2022",
        title: "Tram delay alerts",
        text: "A weekend prototype that warns riders before they reach the stop.",
        detail:
          "Built with two engineers in forty-eight hours on open city data. It pinged riders when their usual tram ran late, with a walking alternative. We took second place and a lot of feedback from commuters.",
      },
    ],
  },
  teaching: {
    title: "Teaching",
    note: "Before and alongside product work, I taught interaction design to students.",
    items: [
      {
        place: "Vistula School of Interaction",
        role: "Academic tutor",
        years: "2014 to 2017",
        text: "Ran the second-year interaction design studio: weekly critiques, usability testing labs and final juries for about thirty students a year.",
        topics: ["Interaction design studio", "Usability testing", "Critique"],
      },
      {
        place: "Northgate Academy of Arts",
        role: "Guest lecturer",
        years: "2018 to 2020",
        text: "A yearly workshop on designing with numbers: how to frame a design problem in hours, risk and money.",
        topics: ["Design metrics", "Portfolio reviews"],
      },
    ],
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
    title: "My world",
    note: "What fills the hours away from the screen.",
    items: [
      {
        title: "I climb, mostly boulders.",
        text: "Bouldering is problem solving with your whole body. You read the route, commit, fall, adjust and try again. It is the most honest usability test I know.",
      },
      {
        title: "I dance Argentine tango.",
        text: "Tango is improvised and led in the moment, with constant small signals between two people. It taught me more about listening than any workshop.",
      },
      {
        title: "I DJ at milongas.",
        text: "Reading a room and changing the plan when the floor goes quiet. Picking the next track feels a lot like picking the next thing to ship.",
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
