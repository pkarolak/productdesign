export const dataAccessManagement = {
  slug: "data-access-management",
  title: "Data Access Management",
  company: "Egnyte",
  year: 2020,
  access: "protected",
  bottomLine:
    "IT admins governed content access without knowing who should see what. With the PM, I designed Data Owners: business people who share the job, under admin control.",
  role: "Product designer, end to end",
  team: "1 PM, 1 researcher, 1 dev team",
  timeline: "2020",
  partners: "Paired with the PM from the first interview to hand-off, then planned with lead developers.",
  scope: ["Research", "User story mapping", "Prototyping"],
  metrics: [
    { value: "85", unit: "%", label: "of admins lacked business context", context: "Egnyte customer base, 2020" },
    { value: "8", label: "in-depth interviews with IT admins", context: "three pain points came up every time" },
    { value: "6", label: "admins tested the hi-fi prototype", context: "it changed the IA, labels and scheduling" },
  ],
  beats: [
    {
      label: "Frame",
      text: "91% of IT admins governed content access, 85% lacked the business context and 98% feared blame. Eight interviews: admins would share it, given audits.",
    },
    {
      label: "Shape",
      text: "600 stickies later: Data Owners, business people admins appoint and control. Eight companies were excited. Six admins' tests reshaped the IA and scheduling.",
    },
    {
      label: "Ship",
      text: "I handed over a six-sprint MVP. We tracked two goals: as many Data Owners as admins within two months, and 10% less admin permission work.",
    },
  ],
  artifacts: [
    {
      kind: "diagram",
      layers: ["8 interviews", "Data Owners", "Prototype tests", "Six-sprint MVP"],
      alt: "From research to plan: 8 interviews, the Data Owners idea, prototype tests and a six-sprint MVP.",
      caption: "Nine steps with the PM, from first interview to a planned MVP.",
    },
    {
      kind: "screenshot",
      src: "/media/protected/data-access-management/wireframes.png",
      ratio: "16/9",
      alt: "Placeholder for the lo-fi wireframes of Data Ownership.",
      caption: "Lo-fi wireframes of Data Ownership that eight companies saw first.",
    },
    {
      kind: "screenshot",
      src: "/media/protected/data-access-management/prototype.png",
      ratio: "16/9",
      alt: "Placeholder for the hi-fi prototype of the MVP flows.",
      caption: "The hi-fi prototype: assigning and managing Data Owners, reviews and auditing.",
    },
  ],
  decisions: [
    {
      decision: "I interviewed before I named anything.",
      outcome: "Eight admins would share the job if audits came with it. That became Data Owners.",
    },
    {
      decision: "I tested the prototype with six admins.",
      outcome: "They changed the IA, labels and scheduling before we planned the MVP.",
    },
    {
      decision: "We tracked two goals for the MVP.",
      outcome: "As many Data Owners as admins in two months, and 10% less permission work.",
    },
  ],
  askMeAbout: [
    "Why solid research was the rocket fuel here",
    "What the developers spotted that changed our plan",
    "Running usability tests on a design you love",
  ],
  cover: {
    kind: "photo",
    src: "/projects/data-access-management/cover-light.png",
    srcDark: "/projects/data-access-management/cover-dark.png",
    ratio: "16/10",
    alt: "The Egnyte logo on a violet-tinted playing card face.",
  },
} as const;
