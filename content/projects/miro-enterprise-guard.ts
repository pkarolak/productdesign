export const miroEnterpriseGuard = {
  slug: "miro-enterprise-guard",
  title: "Miro Enterprise Guard",
  company: "Miro",
  year: 2022,
  access: "protected",
  bottomLine:
    "Over half of Miro's ARR came from its top 500 customers. I led the design of Enterprise Guard, the first add-on, which made more money than expected two years running.",
  role: "Lead designer, 0 to 1",
  team: "CPO, 2 VPs, 5 PMs, 3 designers, 4 dev teams",
  timeline: "2022 to 2024",
  partners: "Five product managers and four development teams, with me as the only designer until two more joined.",
  scope: ["Stakeholder management", "Research", "Design sprint"],
  metrics: [
    { value: "50", unit: "%+", label: "of ARR from the top 500", context: "all of them on the Enterprise plan" },
    { value: "2", label: "years above revenue expectations", context: "for Miro's very first add-on" },
    { value: "4", label: "development teams kept in step", context: "by one designer and a master prototype" },
  ],
  beats: [
    {
      label: "Frame",
      text: "Over half of ARR came from 500 Enterprise customers. How might we deepen the connection with them? Generative research mapped what they would value most.",
    },
    {
      label: "Shape",
      text: "A design sprint found our holy grail. Dependencies ran everywhere, so I held PM 1:1s three times a week, weekly demos and one master prototype.",
    },
    {
      label: "Ship",
      text: "We launched and partied. Two more designers joined. It made more money than expected two years running, and now grows into data discovery and integrations.",
    },
  ],
  artifacts: [
    {
      kind: "diagram",
      layers: ["PM 1:1s", "Leads sync", "Weekly demo", "Master prototype"],
      alt: "How we embraced the chaos: PM one-to-ones, a weekly leads sync, a weekly demo and a master prototype.",
      caption: "How we embraced the chaos with five PMs, four teams and one designer.",
    },
    {
      kind: "screenshot",
      src: "/media/protected/miro-enterprise-guard/holy-grail.png",
      ratio: "16/9",
      alt: "Placeholder for the slide Our holy grail, still to be exported from Figma.",
      caption: "Our holy grail, the idea the design sprint gave us.",
    },
    {
      kind: "compare",
      before: {
        src: "/media/protected/miro-enterprise-guard/jewels-before.png",
        alt: "Placeholder for the before half of the slide about the other jewels.",
      },
      after: {
        src: "/media/protected/miro-enterprise-guard/jewels-after.png",
        alt: "Placeholder for the after half of the slide about the other jewels.",
      },
      ratio: "16/9",
      caption: "Some of the other jewels, before and after.",
    },
  ],
  askMeAbout: [
    "Keeping five PMs and four dev teams in step",
    "What the design sprint's holy grail turned out to be",
    "Where Enterprise Guard goes next: data discovery and integrations",
  ],
  cover: {
    kind: "photo",
    src: "/projects/miro-enterprise-guard/cover-light.png",
    srcDark: "/projects/miro-enterprise-guard/cover-dark.png",
    ratio: "16/10",
    alt: "The Miro logo on a blue-tinted playing card face.",
  },
} as const;
