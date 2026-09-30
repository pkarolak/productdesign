export const runwayForecast = {
  slug: "runway-forecast",
  title: "Runway cash forecast",
  company: "Ledgerline",
  year: 2025,
  access: "protected",
  bottomLine:
    "Took a vague bet on small-business cash anxiety to a shipped mobile forecast in seven months, reaching 18k weekly owners and a new paid tier.",
  role: "Founding designer",
  team: "1 PM, 5 engineers, 1 data scientist",
  timeline: "7 months",
  partners: "Worked with finance, data science and 40 pilot customers from first sketch to pricing.",
  scope: ["0 to 1", "Mobile", "Pricing"],
  metrics: [
    { value: "18", unit: "k", label: "weekly active owners", context: "month four after launch" },
    { value: "31", unit: "%", label: "trial to paid", context: "vs. 12% company benchmark" },
    { value: "7", unit: "mo", label: "from brief to launch", context: "including a 6-week pilot" },
  ],
  beats: [
    {
      label: "Frame",
      text: "Interviewed 32 owners. The fear was not low cash, it was surprise. So we designed for the next 13 weeks.",
    },
    {
      label: "Shape",
      text: "Tested five forecast metaphors on paper. A simple weekly outlook beat every chart in every session.",
    },
    {
      label: "Ship",
      text: "Launched to pilots in week 22, priced from real usage data, and opened a paid tier by month three.",
    },
  ],
  artifacts: [
    {
      kind: "mobile",
      screens: [
        { src: "/media/protected/runway-forecast/screen-1.jpg", alt: "Runway home: a 13-week cash outlook with one clear balance line." },
        { src: "/media/protected/runway-forecast/screen-2.jpg", alt: "A week detail showing expected payments in and out." },
        { src: "/media/protected/runway-forecast/screen-3.jpg", alt: "A what-if screen for delaying a large supplier payment." },
      ],
      caption: "Outlook, week detail and what-if: the whole product in three screens.",
    },
    {
      kind: "photo",
      src: "/media/protected/runway-forecast/research.jpg",
      alt: "A research session with printed forecast concepts spread across a cafe table.",
      caption: "Paper concepts tested with owners in their own cafes and shops.",
    },
  ],
  askMeAbout: [
    "The four forecast ideas we threw away",
    "How we priced a product nobody had used yet",
    "Designing for fear instead of features",
  ],
  cover: {
    kind: "mobile",
    screens: [
      { src: "/projects/runway-forecast/screen-1.jpg", alt: "Runway home: a 13-week cash outlook with one clear balance line." },
      { src: "/projects/runway-forecast/screen-2.jpg", alt: "A week detail showing expected payments in and out." },
      { src: "/projects/runway-forecast/screen-3.jpg", alt: "A what-if screen for delaying a large supplier payment." },
    ],
  },
} as const;
