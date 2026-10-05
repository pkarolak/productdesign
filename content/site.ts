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
    "Product designer shaping analytics, security and platform products at Miro, with earlier work at Egnyte and Allegro.",
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
        parts: ["Designing analytics and security tools at", {
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
    headline: "I design *analytics* and security tools at Miro.",
  },
  handNote: "Pick a card to jump to a section",
  deck: {
    joker: { src: "/cards/bandoneon-line-light.png", srcDark: "/cards/bandoneon-line-dark.png" },
    back: { src: "/cards/back-clean-light.jpg", srcDark: "/cards/back-clean-dark.jpg" },
  },
  hand: [
    { title: "Hello!", text: "Get to know me a little bit", href: "#about-me", target: "about", suit: "heart" },
    { title: "Big projects", text: "Some interesting outcomes of my work", href: "#big-projects", target: "work", suit: "spade" },
    { title: "Side gigs", text: "More lightweight stuff I built after hours", href: "#side-gigs", target: "showcase", suit: "diamond" },
    { title: "Teaching", text: "How I help others grow", href: "#teaching", target: "teaching", suit: "club" },
    { title: "Free time", text: "Sport, tango, and others of my choice", href: "#free-time", target: "outside", suit: "joker" },
  ],
  statement: {
    title: "About me",
    lines: ["A product designer for over 12 years.", "Now is the best time to be one."],
    text: "I believe all problems can be solved in an elegant way, and that most topics can be explained to a 5-year-old once you understand them well.",
    beliefs: [
      "I love clean UI with a spark in it. But sometimes no UI is best.",
      "And sometimes the best feature is the one you are bold enough not to build.",
      "With AI and vibe coding we all get even chances to test ideas in no time.",
    ],
    cta: { label: "More about me", href: "/about" },
  },
  work: {
    title: "Big projects",
    note: "Selected cases from Miro, Allegro and Egnyte.",
    featured: 3,
    more: "All big projects",
  },
  showcase: {
    title: "Side gigs",
    note: "Lightweight stuff I build after hours. Tap one to read more.",
    featured: 3,
    more: "All side gigs",
    items: [
      {
        id: "co-na-dzielni",
        kicker: "Head of design, 2026",
        title: "CoNaDzielni.pl",
        text: "A guide to what is happening in your city: events, places and plans nearby.",
        detail:
          "CoNaDzielni.pl shows what is going on in your city, from a gig down the street to plans for Saturday. I lead its design after hours.",
        link: { label: "Visit CoNaDzielni.pl", href: "https://conadzielni.pl" },
      },
    ],
  },
  teaching: {
    title: "Teaching",
    note: "UX design and research classes, talks and workshops.",
    items: [
      {
        place: "Collegium Da Vinci, Poznań",
        role: "Academic teacher",
        years: "2019 to 2022",
        text: "Lecturer and tutor of several subjects on UX design and UX research processes.",
        topics: ["UX design", "UX research"],
      },
      {
        place: "Conferences and workshops",
        role: "Speaker and workshop author",
        years: "Since 2017",
        text: "Spoke at StartUp Mash-Up, wrote a workshop series for cognitive science students at AMU Poznań, and led the Egnyte Summer UX Camp.",
        topics: ["StartUp Mash-Up", "AMU Poznań workshops", "Egnyte Summer UX Camp"],
      },
    ],
  },
  letter: {
    salutation: "Hey there,",
    paragraphs: [
      "You made it to the bottom of my home page. Thanks for your interest in my little portfolio!",
      "As you might have noticed, I like hard problems and bold ways of solving them. I'm always up for a new adventure.",
      "If you are building something cool and need somebody to help shape the vision in a user-centered way, design a lovely interface and make sure you can actually ship it fast, it's a match!",
    ],
    signoff: "Patryk",
    photo: {
      src: "/about/patryk-wink.jpg",
      alt: "Patryk Karolak winking and pointing at you with a grin.",
    },
  },
  about: {
    title: "More about me",
    headline: "Calm interfaces for *complex* work.",
    story: [
      "I am a product designer based in Poznań. Since 2014 I have designed for Egnyte, Allegro, Espago and now Miro, where I work on analytics, and on content security and compliance in the age of AI.",
      "I start with research, because it is the rocket fuel for everything after it. Then I build: a working prototype app on real data, validated fast and merged when it proves right. For deep UI explorations I push pixels in Figma, fast and cheap, but for big projects that matter my deliverable is a fully interactive prototype. Workshops keep the people around it aligned.",
      "I studied computer science in Poznań and Madrid, taught UX at Collegium Da Vinci, and still like to code my own prototypes. After hours it is climbing, tango and my family.",
    ],
    portrait: {
      src: "/about/portrait.jpg",
      alt: "Patryk Karolak's desk with sketches, a film camera and a laptop in soft morning light.",
    },
  },
  education: [
    { school: "Poznań University of Technology", degree: "MS in Computer Science", years: "2012 to 2018" },
    { school: "Universidad Politécnica de Madrid", degree: "User Centered Problem Solving", years: "2014" },
    { school: "Universidad Politécnica de Madrid", degree: "Machine learning", years: "2014" },
  ],
  educationTitle: "Education",
  journey: {
    title: "Experience",
    note: "Enterprise content, e-commerce, payments and collaboration, with freelance work alongside since 2011.",
    roles: [
      {
        from: 2024,
        company: "Miro",
        role: "Staff product designer",
        kind: "Visual collaboration",
        summary: "The Miro Analytics ecosystem, content security and compliance in the age of AI, and tools for designers.",
        points: [
          "Content Explorer, alongside Content Lifecycle, bulk actions and analytics.",
          "FilterPill in Miro's design system, plus two production PRs.",
        ],
        cases: ["content-explorer", "miro-analytics"],
      },
      {
        from: 2022,
        to: 2024,
        company: "Miro",
        role: "Senior product designer",
        kind: "Visual collaboration",
        summary: "Led the 0 to 1 design of Miro Enterprise Guard, end to end.",
        points: ["Domain control, authentication, content classification, audit logs and content lifecycle."],
        cases: ["miro-enterprise-guard"],
      },
      {
        from: 2021,
        to: 2022,
        company: "Allegro",
        role: "UX design consultant",
        kind: "E-commerce",
        summary: "Merchant analytics tools for the largest marketplace in Central and Eastern Europe.",
        points: ["Drove a new offering of stock fulfillment services."],
        cases: ["merchant-economic-tools"],
      },
      {
        from: 2021,
        to: 2022,
        company: "Espago",
        role: "Lead product designer",
        kind: "Online payments",
        summary: "Pay-by-link tools for merchants and their customers, from service design to a complete design system.",
      },
      {
        from: 2020,
        to: 2021,
        company: "Egnyte",
        role: "UX strategist",
        kind: "Content platform",
        summary: "UX strategy for the core product lines, guiding product management and cross-product dependencies.",
        cases: ["egnyte-product-platform"],
      },
      {
        from: 2016,
        to: 2020,
        company: "Egnyte",
        role: "Senior UX designer, team lead",
        kind: "Content platform",
        summary: "End-to-end design of the core products, and the 0 to 1 design of Egnyte Protect.",
        points: ["Design system principles, customer research, and the team's processes and growth."],
        cases: ["data-access-management"],
      },
      {
        from: 2014,
        to: 2016,
        company: "Egnyte",
        role: "UX designer",
        kind: "Content platform",
        summary: "Multi-platform interaction design, qualitative and quantitative research, and specifications for new features.",
      },
      {
        from: 2011,
        company: "Freelance",
        role: "Design and research consultant",
        kind: "Various clients",
        summary: "Design, research and UX strategy for the City of Poznań, NGOs, an IT conference and startups.",
      },
    ],
  },
  values: {
    title: "How I work",
    note: "Discover, prototype, validate, merge. The prototype is the spec, so decisions start from something that works.",
    items: [
      {
        title: "Prototype it, prove it, merge it",
        text: "After discovery I build a working prototype app on real data, validate it fast, and merge it when it proves right. About 2,250 commits across eight prototypes so far.",
        evidence: "content-explorer",
      },
      {
        title: "Figma for pixels, prototypes for decisions",
        text: "For deep UI explorations I push pixels in Figma, fast and cheap. For big projects that matter, my deliverable is a fully interactive prototype.",
        evidence: "miro-enterprise-guard",
      },
      {
        title: "Let the research win the room",
        text: "Strong internal pushback on Miro Analytics gave way once the evidence was on the table: 150 requests, 12 interviews and product data.",
        evidence: "miro-analytics",
      },
      {
        title: "Workshop the hard questions",
        text: "With many stakeholders, I get everyone into one room. Two days of workshops gave Egnyte a shared idea of what a platform is.",
        evidence: "egnyte-product-platform",
      },
    ],
  },
  outside: {
    title: "Free time",
    note: "Sport, tango, and others of my choice.",
    items: [
      {
        title: "I climb, mostly boulders.",
        text: "Problem solving with your whole body: read the route, try, fall, adjust and try again.",
      },
      {
        title: "I dance Argentine tango.",
        text: "It is improvised, with constant small signals between two people. It made me a better listener.",
      },
      {
        title: "I DJ at milongas.",
        text: "I play tango music for the dancers and change the plan when the floor goes quiet.",
      },
    ],
  },
  links: {
    linkedin: "https://www.linkedin.com/in/patkarolak",
    calendar: "https://cal.com/patrykkarolak",
  },
  contact: {
    headline: "The full story is better *in person*.",
    text: "Every case here has a longer version with the messy middle. I am happy to walk you through it.",
  },
});
