export const miroAnalytics = {
  slug: "miro-analytics",
  title: "Miro Analytics",
  company: "Miro",
  year: 2024,
  access: "protected",
  bottomLine:
    "Insights was the least opened page in Miro: five widgets, untouched for four years. We rebuilt analytics for Enterprise admins, and it now draws over 1,000 visits a week.",
  role: "Product designer, end to end",
  team: "1 PM, 3 designers, 2 dev teams",
  timeline: "Since 2024",
  partners: "Worked with the CEO, the CPO, Customer Success and two development teams.",
  scope: ["Research", "Workshops", "Prototyping"],
  metrics: [
    { value: "1,000", unit: "+", label: "visits every week", context: "after launch to all Enterprise admins" },
    { value: "4", unit: "/5", label: "average satisfaction", context: "in-product poll across 30 organisations" },
    { value: "150", label: "Salesforce requests for data visibility", context: "the signal we started from" },
  ],
  beats: [
    {
      label: "Frame",
      text: "Insights had five widgets and no code change in four years, while 150 Salesforce requests asked for more data. Admins stopped trusting what they saw.",
    },
    {
      label: "Shape",
      text: "Strong internal pushback met us, so I led with research: 150 requests, 12 interviews, product data. The plan: trustworthy data first, actionability next, then AI.",
    },
    {
      label: "Ship",
      text: "New analytics launched to all Enterprise admins, with other plans next. Over 1,000 visits a week, 4 out of 5 satisfaction, and a full backlog.",
    },
  ],
  artifacts: [
    {
      kind: "screenshot",
      src: "/media/protected/miro-analytics/started-small.png",
      ratio: "16/9",
      alt: "Slide titled It started super small: the old users bar chart beside the new user history chart.",
      caption: "It started small: the old users chart, then the new user history.",
    },
    {
      kind: "diagram",
      layers: ["Trustworthy data", "Actionability", "More AI"],
      alt: "Three layers building up: trustworthy data, then actionability, then AI.",
      caption: "Everything starts with data. Actionability and AI only work on top of it.",
    },
    {
      kind: "screenshot",
      src: "/media/protected/miro-analytics/actionability.png",
      ratio: "16/9",
      alt: "Placeholder for the slide With actionability, still to be exported from Figma.",
      caption: "With actionability: the step that came after a trustworthy data set.",
    },
  ],
  askMeAbout: [
    "How research turned strong internal pushback into support",
    "Why trustworthy data came before any new chart",
    "What the satisfaction poll in 30 organisations told us",
  ],
  cover: {
    kind: "photo",
    src: "/projects/miro-analytics/cover-light.png",
    srcDark: "/projects/miro-analytics/cover-dark.png",
    ratio: "16/10",
    alt: "The Miro logo on a rose-tinted playing card face.",
  },
} as const;
