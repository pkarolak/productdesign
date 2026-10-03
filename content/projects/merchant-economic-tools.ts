export const merchantEconomicTools = {
  slug: "merchant-economic-tools",
  title: "Merchant Economic Tools",
  company: "Allegro",
  year: 2021,
  access: "protected",
  bottomLine:
    "Allegro's new fulfillment service needed a tool that tells merchants if it pays off. I validated the ideas with merchants, survived a hard clash, and workshopped one agreed vision.",
  role: "Lead designer",
  team: "1 PM, 3 business owners, 1 dev team",
  timeline: "2021 to 2022",
  partners: "Worked with the PM, a Director of Product and three business product owners.",
  scope: ["Research", "Workshops", "Prototyping"],
  metrics: [
    { value: "8", label: "merchant interviews to test ideas", context: "each compared against the stakeholders' idea list" },
    { value: "68", label: "pilot merchants confirmed the findings", context: "in an Optimal Workshop questionnaire" },
    { value: "24", unit: "h", label: "of workshops to align the vision", context: "accepted by every stakeholder at the end" },
  ],
  beats: [
    {
      label: "Frame",
      text: "Fulfillment takes about 95% of logistics off merchants. The tool had to show whether that pays. I joined a month in, inheriting an ideas list.",
    },
    {
      label: "Shape",
      text: "8 interviews and 68 surveyed merchants checked the ideas. Testing with 6 found it hard to understand. The Director said the design had no logic.",
    },
    {
      label: "Ship",
      text: "24 hours of workshops gave a vision everyone signed. It went to build with two measures: pilot merchants using the tool, and staying on fulfillment.",
    },
  ],
  artifacts: [
    {
      kind: "diagram",
      layers: ["8 interviews", "68 merchant questionnaires", "6 usability tests"],
      alt: "The research that checked the ideas: 8 interviews, 68 questionnaires and 6 usability tests.",
      caption: "Each step checked the stakeholders' ideas against what merchants actually said.",
    },
    {
      kind: "screenshot",
      src: "/media/protected/merchant-economic-tools/needs.png",
      ratio: "16/9",
      alt: "Placeholder for the slide summing up merchant needs in two sentences.",
      caption: "Merchant needs, summed up in two sentences after eight interviews.",
    },
    {
      kind: "screenshot",
      src: "/media/protected/merchant-economic-tools/map.png",
      ratio: "16/9",
      alt: "Placeholder for the map used to explain the logic of the design.",
      caption: "The map I used to tell the story of how the tool works.",
    },
  ],
  askMeAbout: [
    "What I learnt from the clash with the Director",
    "Why I now hold a 1:1 with every stakeholder first",
    "Who should write the requirements, and why it matters",
  ],
  cover: {
    kind: "photo",
    src: "/projects/merchant-economic-tools/cover-light.png",
    srcDark: "/projects/merchant-economic-tools/cover-dark.png",
    ratio: "16/10",
    alt: "The Allegro logo on an amber-tinted playing card face.",
  },
} as const;
