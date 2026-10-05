export const contentExplorer = {
  slug: "content-explorer",
  title: "Content Explorer",
  company: "Miro",
  year: 2026,
  access: "protected",
  bottomLine:
    "Admins could manage users and teams, but not content, so support handled about 2,000 bulk-change requests a quarter. I designed Content Explorer from kick-off to GA in twelve months.",
  role: "Lead and only designer",
  team: "1 PM, engineering lead, the Content Lifecycle team",
  timeline: "Twelve months",
  partners: "Worked with the PM, the engineering lead, the design-system team and the bulk-actions platform team.",
  scope: ["Information architecture", "Permission model", "Prototyping"],
  metrics: [
    { value: "46", label: "organisations asked for the private beta", context: "one of the most demanded admin capabilities" },
    { value: "480", label: "admins in the first public-beta week", context: "across more than 100 enterprises" },
    { value: "15", label: "of 22 pilot organisations came back", context: "on four or more days out of 50" },
  ],
  beats: [
    {
      label: "Frame",
      text: "Admins managed users and teams, but not boards. Support handled about 2,000 bulk-change requests a quarter, and some organisations hold 80,000 boards.",
    },
    {
      label: "Shape",
      text: "I named the states admins think in: Available, In trash, Retained. A role-based admin model and a full-stack prototype settled scope before engineering started.",
    },
    {
      label: "Ship",
      text: "Private beta in July, public beta in August, GA in September. Content Lifecycle and bulk actions now build on the same table.",
    },
  ],
  artifacts: [
    {
      kind: "screenshot",
      src: "/media/protected/content-explorer/views.png",
      ratio: "16/9",
      alt: "Placeholder for the four Content Explorer views, still to be exported.",
      caption: "The four views: Available, Trash, Data Discovery and Content Lifecycle.",
    },
    {
      kind: "diagram",
      layers: ["Content Admin", "Sensitive Content Admin", "Lifecycle Admin"],
      alt: "The admin roles, from Content Admin up to Sensitive Content Admin and Lifecycle Admin.",
      caption: "Granular admin roles, so each view opens only for the right people.",
    },
    {
      kind: "screenshot",
      src: "/media/protected/content-explorer/prototype.png",
      ratio: "16/9",
      alt: "Placeholder for the full-stack working model of the admin console.",
      caption: "The 93,000-line working model we settled scope in before engineering started.",
    },
    {
      kind: "screenshot",
      src: "/media/protected/content-explorer/filter-pill.png",
      ratio: "16/9",
      alt: "Placeholder for the FilterPill component and its states.",
      caption: "FilterPill, merged into Miro's design system after three teams hand-rolled it.",
    },
  ],
  askMeAbout: [
    "Why the boards are Available, not active",
    "Keeping a table usable at 80,000 boards",
    "Shipping two production PRs as a designer",
  ],
  cover: {
    kind: "photo",
    src: "/projects/content-explorer/cover-light.png",
    srcDark: "/projects/content-explorer/cover-dark.png",
    ratio: "16/10",
    alt: "The Miro logo on an amber-tinted playing card face.",
  },
} as const;
