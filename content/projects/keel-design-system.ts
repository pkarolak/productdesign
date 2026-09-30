export const keelDesignSystem = {
  slug: "keel-design-system",
  title: "Keel design system",
  company: "Ledgerline",
  year: 2024,
  access: "protected",
  bottomLine:
    "Rebuilt Ledgerline's fragmented UI into one token-driven system that 14 product teams adopted without a mandate, cutting UI defects by 41% in two quarters.",
  role: "Design lead, systems",
  team: "3 designers, 1 design engineer, platform squad of 5",
  timeline: "14 months",
  partners: "Partnered with the platform EM and the front-end guild; ran a contributor council across 9 teams.",
  scope: ["Design system", "Tokens", "Governance"],
  metrics: [
    { value: "86", unit: "%", label: "component adoption", context: "14 of 16 teams, Q3 audit" },
    { value: "41", unit: "%", label: "fewer UI defects", context: "vs. pre-system quarter" },
    { value: "2.7", unit: "x", label: "faster screen build", context: "6 squads, median of 40 screens" },
  ],
  beats: [
    {
      label: "Frame",
      text: "Audited 312 screens and found 11 button styles. Framed the cost in rework hours, not aesthetics, to win platform funding.",
    },
    {
      label: "Shape",
      text: "Designed tokens first, then 38 components with the teams that would use them. Contribution beat mandate every time.",
    },
    {
      label: "Ship",
      text: "Rolled out through a migration kit and weekly office hours. Adoption was measured every week and shared in the open.",
    },
  ],
  artifacts: [
    {
      kind: "diagram",
      layers: ["Tokens", "Components", "Patterns", "Product surfaces"],
      alt: "Four stacked isometric layers: tokens, components, patterns and product surfaces.",
      caption: "Four layers and one source of truth, themed per brand.",
    },
    {
      kind: "screenshot",
      src: "/media/protected/keel-design-system/docs.jpg",
      alt: "Keel documentation page showing button variants with usage guidance.",
      caption: "Docs pair live components with do and don't guidance.",
      annotations: [{ x: 28, y: 34 }],
    },
    {
      kind: "screenshot",
      src: "/media/protected/keel-design-system/dashboard.jpg",
      alt: "Ledgerline spend dashboard with cards, a chart and a transactions table.",
      caption: "A spend dashboard rebuilt in nine days with Keel.",
    },
  ],
  askMeAbout: [
    "Why we shipped tokens before a single component",
    "How a contributor council replaced a mandate",
    "The component we deprecated in public",
  ],
  cover: {
    kind: "isometric",
    plates: [
      {
        src: "/projects/keel-design-system/plate-docs.jpg",
        alt: "Keel component documentation page with live button variants.",
      },
      {
        src: "/projects/keel-design-system/plate-dashboard.jpg",
        alt: "Ledgerline spend dashboard built entirely from Keel components.",
      },
    ],
  },
} as const;
