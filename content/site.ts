import { siteSchema } from "./schema";

/** Wrap one word in *asterisks* to render it as a heading's single emphasis. */
export const site = siteSchema.parse({
  name: "Patryk Karolak",
  role: "Product designer",
  avatar: {
    src: "/about/patryk-arms-crossed.jpg",
    cutout: "/about/patryk-arms-crossed-cutout.png",
    face: "/about/patryk-face.jpg",
    alt: "Patryk Karolak smiling with his arms crossed, in a black T-shirt.",
  },
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
      {
        when: "Day",
        icon: "sun",
        parts: ["Shaping enterprise-grade experiences at", {
            pill: "Miro",
            logo: "/logos/miro.png",
            kind: "Visual collaboration platform",
            about: "An online canvas where teams brainstorm, plan and build together, used by millions of people at companies large and small.",
          }, ","],
        note: [
          "earlier at",
          {
            pill: "Egnyte",
            logo: "/logos/egnyte.png",
            kind: "Secure content platform",
            about: "Cloud file sharing and governance for businesses that need their documents safe, compliant and easy to find.",
          },
          "and",
          {
            pill: "Allegro",
            logo: "/logos/allegro.png",
            kind: "Online marketplace",
            about: "The biggest e-commerce platform in Poland, where millions of people buy and sell almost anything every day.",
          },
        ],
      },
      {
        when: "After hours",
        icon: "sunset",
        photo: {
          src: "/about/patryk-wink.jpg",
          cutout: "/about/patryk-wink-cutout.png",
          alt: "Patryk Karolak winking and pointing at you with a grin.",
        },
        parts: ["My lovely wife and toddler, then head of design at", {
            pill: "CoNaDzielni.pl",
            logo: "/logos/conadzielni.png",
            kind: "Local events guide",
            about: "A guide to what is happening in your city: events, places and plans nearby.",
          },
        ],
      },
      {
        when: "Night",
        icon: "moon",
        photo: {
          src: "/about/patryk-tango-embrace.jpg",
          cutout: "/about/patryk-tango-embrace-cutout.png",
          alt: "Patryk Karolak turned to the side, smiling, holding an open tango embrace as an invitation to dance.",
        },
        parts: [
          "Bouldering, long runs, dancing and DJ-ing at",
          {
            term: "milongas",
            phonetic: "miˈlon.ɡas",
            kind: "noun, plural",
            senses: [
              "Social tango dances, where the music comes in sets of three or four songs and strangers share an embrace.",
              "Also a lively, older cousin of tango, danced in quick steps.",
            ],
            origin: "Rioplatense Spanish, from a Kimbundu word for words or chatter.",
          },
        ],
      },
    ],
    headline: "I shape *enterprise-grade* experiences at Miro.",
  },
  handNote: "Pick a card to see my tricks!",
  deck: {
    joker: { src: "/cards/bandoneon-line-light.png", srcDark: "/cards/bandoneon-line-dark.png" },
    back: { src: "/cards/back-clean-light.jpg", srcDark: "/cards/back-clean-dark.jpg" },
  },
  hand: [
    { title: "Hi!", text: "The short version of me.", href: "#short-version", target: "about", suit: "heart" },
    { title: "The big ones", text: "Products people lean on daily.", href: "#big-ones", target: "work", suit: "spade" },
    { title: "Side quests", text: "Small gigs, quick and fun.", href: "#side-quests", target: "showcase", suit: "diamond" },
    { title: "Office hours", text: "A few years of teaching.", href: "#office-hours", target: "teaching", suit: "club" },
    { title: "Off the clock", text: "Climbing, tango and the records.", href: "#off-the-clock", target: "outside", suit: "joker" },
  ],
  statement: {
    title: "The short version",
    lines: ["Calm interfaces for complex work.", "Numbers first, pixels second."],
    text: "I work where products get complicated: money, freight and the systems that hold them together. I lead through prototypes, numbers and a lot of listening.",
    cta: { label: "The long version", href: "/about" },
  },
  work: {
    title: "The big ones",
    note: "Products people lean on every working day.",
    featured: 3,
    more: "All the big ones",
  },
  showcase: {
    title: "Side quests",
    note: "Small gigs for friends, festivals and hackathons. Tap one for the story.",
    featured: 3,
    more: "All side quests",
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
    title: "Office hours",
    note: "A few years of teaching interaction design.",
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
    title: "Word of mouth",
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
    title: "The long version",
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
  educationTitle: "School days",
  journey: {
    title: "Where I've been",
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
    title: "How I work",
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
    title: "Off the clock",
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
  contactForm: {
    title: "Drop me a line",
    note: "A question, a project or a plain hello. It lands straight in my inbox.",
    submit: "Send it",
    sent: "Got it. I will write back soon.",
  },
  footnote: "Template content: companies, people and numbers are fictional placeholders.",
});
