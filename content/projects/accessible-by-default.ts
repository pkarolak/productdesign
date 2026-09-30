export const accessibleByDefault = {
  slug: "accessible-by-default",
  title: "Accessible by default",
  company: "Halden",
  year: 2021,
  access: "public",
  bottomLine:
    "Led an accessibility program across seven product teams, taking Halden's core apps from 54% to 96% WCAG AA conformance and winning two public-sector contracts.",
  role: "Program lead, design",
  team: "A guild of 12 champions across design and engineering",
  timeline: "12 months",
  partners: "Partnered with legal, sales and QA; set the standards with the engineering principals group.",
  scope: ["Accessibility", "Standards", "Enablement"],
  metrics: [
    { value: "96", unit: "%", label: "WCAG 2.1 AA conformance", context: "up from 54%, external audit" },
    { value: "7", label: "product teams shipping to standard", context: "within two quarters" },
    { value: "2", label: "public-sector contracts won", context: "AA was a bid requirement" },
  ],
  beats: [
    {
      label: "Frame",
      text: "Tied the audit to revenue: two tenders required AA. That turned a nice-to-have into a roadmap item.",
    },
    {
      label: "Shape",
      text: "Built a champions guild, lint rules and a pattern checklist, so fixes landed in the system, not screen by screen.",
    },
    {
      label: "Ship",
      text: "Quarterly audits, a public scorecard per team, and accessibility acceptance criteria in every ticket template.",
    },
  ],
  artifacts: [
    {
      kind: "photo",
      src: "/projects/accessible-by-default/workshop.jpg",
      alt: "Champions workshop: designers and engineers reviewing printed screens on a wall.",
      caption: "Champions reviewed real screens together every other Thursday.",
    },
    {
      kind: "diagram",
      layers: ["Standards", "Lint rules", "Patterns", "Audits"],
      alt: "Four stacked layers: standards, lint rules, patterns and audits.",
      caption: "Fixes flow down into the system instead of across screens.",
    },
    {
      kind: "screenshot",
      src: "/projects/accessible-by-default/scorecard.jpg",
      alt: "Accessibility scorecard with per-team conformance bars and open issues.",
      caption: "A public scorecard made progress visible, and a little competitive.",
    },
  ],
  askMeAbout: [
    "How two tenders funded the whole program",
    "Why champions beat a central accessibility team",
    "The lint rule engineers asked for",
  ],
  cover: {
    kind: "screenshot",
    src: "/projects/accessible-by-default/cover.jpg",
    alt: "Accessibility scorecard dashboard with conformance bars for seven teams.",
  },
} as const;
