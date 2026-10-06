export const egnyteProductPlatform = {
  slug: "egnyte-product-platform",
  title: "Egnyte as a product platform",
  company: "Egnyte",
  year: 2020,
  access: "protected",
  bottomLine:
    "Egnyte's leaders wanted a platform but had not defined one. I moderated two days of workshops, helped run an 18-point audit, then redesigned top bars, billing and self-served migration.",
  role: "UX strategy and design",
  team: "CPO, 3 VPs, 5 PMs, 3 designers, 5 dev teams",
  timeline: "2020 to 2021",
  partners: "Ten people in the workshop room, from the CPO to three senior directors of product.",
  scope: ["Research", "Workshops", "Strategy"],
  metrics: [
    { value: "18", label: "platform recommendations, each with mockups", context: "from a two-week audit by four designers" },
    { value: "5", label: "web apps under one top bar", context: "each keeping its own local requirements" },
    { value: "2", unit: "d", label: "of workshops I moderated", context: "10 people, SWOT to a five-step vision" },
  ],
  beats: [
    {
      label: "Frame",
      text: "Analysts pointed to a platform, but every app looked and was built differently. The brief: make Egnyte a platform, and work out what that means.",
    },
    {
      label: "Shape",
      text: "We compared monoliths with app suites. Over two days I moderated ten stakeholders to pick App Suite. Then four of us audited everything: 18 recommendations.",
    },
    {
      label: "Ship",
      text: "Five went to the backlog. I unified the top bars of five web apps, redesigned billing, and turned the package manager into self-served SMB migration.",
    },
  ],
  artifacts: [
    {
      kind: "diagram",
      layers: ["Industry offering", "Feature packaging", "Unified look", "Early adopters"],
      alt: "Four of the five bold steps: an industry offering, feature packaging, a unified look and early adopters.",
      caption: "Four of the five bold steps from the workshop toward an App Suite.",
    },
    {
      kind: "screenshot",
      src: "/media/protected/egnyte-product-platform/recommendations.png",
      ratio: "16/9",
      alt: "Placeholder for the slide of UX team recommendations with mockups.",
      caption: "Some of the 18 recommendations, each with mockups to start the discussion.",
    },
    {
      kind: "screenshot",
      src: "/media/protected/egnyte-product-platform/top-bars.png",
      ratio: "16/9",
      alt: "Placeholder for the unified top bars across five web apps.",
      caption: "One top bar across five web apps, each keeping its local needs.",
    },
  ],
  decisions: [
    {
      decision: "I moderated two days to pick App Suite.",
      outcome: "Ten people, from the CPO down, left with a five-step vision.",
    },
    {
      decision: "We audited before we redesigned.",
      outcome: "Four designers, two weeks, 18 recommendations. Five made it to the backlog.",
    },
    {
      decision: "One top bar for five apps.",
      outcome: "Each app kept its own needs. Billing and self-served migration followed.",
    },
  ],
  askMeAbout: [
    "Why the App Suite won over the monolith",
    "Why a real platform needs the whole organisation to change",
    "How a package manager became self-served migration",
  ],
  cover: {
    kind: "photo",
    src: "/projects/egnyte-product-platform/cover-light.png",
    srcDark: "/projects/egnyte-product-platform/cover-dark.png",
    ratio: "16/10",
    alt: "The Egnyte logo on a green-tinted playing card face.",
  },
} as const;
