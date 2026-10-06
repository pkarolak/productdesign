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
    { value: "199", label: "paying accounts on the add-on", context: "about $10M ARR since launch" },
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
      text: "We launched, then two more designers joined. It beat revenue expectations two years running, and grows into content lifecycle, data discovery and integrations.",
    },
  ],
  artifacts: [
    {
      kind: "screenshot",
      src: "/media/protected/miro-enterprise-guard/dependencies.png",
      ratio: "915/555",
      alt: "Dependencies diagram: detecting sensitive info classifies a board, which applies sharing restrictions and lifecycle rules.",
      caption: "Dependencies all over the place, across five PMs and four teams.",
    },
    {
      kind: "screenshot",
      src: "/media/protected/miro-enterprise-guard/holy-grail.png",
      ratio: "832/552",
      alt: "The holy grail concept: identify sensitive content, define levels, automate classification, browse the impact.",
      caption: "Our holy grail, the idea the design sprint gave us.",
    },
    {
      kind: "compare",
      before: {
        src: "/media/protected/miro-enterprise-guard/classification-before.png",
        alt: "Board classification before: levels edited inline on a single settings page.",
      },
      after: {
        src: "/media/protected/miro-enterprise-guard/classification-after.png",
        alt: "Board classification after: a guided setup from classification levels to reviewing the impact.",
      },
      ratio: "620/400",
      caption: "Board classification, before and after.",
    },
  ],
  decisions: [
    {
      decision: "We shipped one bundle, not five features.",
      outcome: "Everything circled around protecting sensitive content. Today it has 199 paying accounts.",
    },
    {
      decision: "I kept five PMs in step with one prototype.",
      outcome: "Constant sync was a burden, but it kept four teams moving together.",
    },
    {
      decision: "Legal holds came right after the core.",
      outcome: "Deals depended on them. I also rebuilt classification as a guided setup.",
    },
  ],
  askMeAbout: [
    "How one designer kept five PMs in step",
    "What the design sprint's holy grail turned out to be",
    "Where Enterprise Guard goes next: data discovery and integrations",
  ],
  cover: {
    kind: "video",
    src: "/projects/miro-enterprise-guard/loop.mp4",
    poster: "/projects/miro-enterprise-guard/loop.jpg",
    dark: { src: "/projects/miro-enterprise-guard/loop-dark.mp4", poster: "/projects/miro-enterprise-guard/loop-dark.jpg" },
    ratio: "16/10",
    alt: "Enterprise Guard classification in the admin console: the overview, then the configuration of levels and guardrails.",
  },
  story: [
    {
      id: "why",
      nav: "Why we started",
      title: "Over half of our ARR came from 500 customers",
      lead: "All of those top 500 customers were on the Enterprise plan. Miro had never sold an add-on before, and the question was what would make these customers stay and grow with us.",
      quote: "How might we deepen the connection with our key customers?",
    },
    {
      id: "research",
      nav: "Finding out",
      title: "What these customers needed most",
      lead: "Generative research and value perception studies ranked what Enterprise customers missed in Miro.",
      steps: [
        {
          id: "needs",
          nav: "Top needs",
          title: "Five needs, in order",
          text: "Securing sensitive content came first. Then managing the lifecycle of content, meeting legal needs, dividing labour for admin tasks, and centralising visibility and control.",
          artifact: {
            kind: "screenshot",
            src: "/media/protected/miro-enterprise-guard/top-needs.png",
            ratio: "1324/404",
            alt: "Top needs one to five next to our plan: one bundle around sensitive content protection.",
            caption: "Top customer needs on the left, our plan on the right.",
          },
        },
        {
          id: "bundle",
          nav: "One bundle",
          title: "One bundle instead of five features",
          text: "Our plan: a single bundle of value that appeals to a broad base of key customers. Retention and disposition, eDiscovery and legal hold, all around the top customer value, sensitive content protection.",
        },
      ],
    },
    {
      id: "sprint",
      nav: "Design sprint",
      title: "A design sprint found our holy grail",
      quote: "We need to protect the intellectual property of our customers!",
      steps: [
        {
          id: "whiteboard",
          nav: "Whiteboard",
          title: "From a whiteboard to improved flows",
          text: "We started on a whiteboard and ended on a board of improved flows, phase by phase, ready to prototype.",
          artifact: {
            kind: "screenshot",
            src: "/media/protected/miro-enterprise-guard/sprint.png",
            ratio: "1324/502",
            alt: "Design sprint whiteboard next to the improved flows board from April 2023.",
            caption: "The sprint whiteboard, then the improved flows board.",
          },
        },
        {
          id: "holy-grail",
          nav: "Holy grail",
          title: "Protect sensitive content in four moves",
          text: "The concept answered the ask in four moves: identify sensitive content in boards, define classification levels, automate classification and security, then browse the results and their impact.",
          artifact: {
            kind: "screenshot",
            src: "/media/protected/miro-enterprise-guard/holy-grail.png",
            ratio: "832/552",
            alt: "The holy grail concept: identify sensitive content, define levels, automate classification, browse the impact.",
            caption: "The concept: protect your sensitive content in Miro.",
          },
        },
        {
          id: "jewels",
          nav: "Other jewels",
          title: "And some other jewels",
          text: "Legal holds came next, because they were super important to enable deals. Then content lifecycle management, fixed and automated. And board classification, rebuilt from a single settings page into a guided setup.",
          artifact: {
            kind: "compare",
            before: {
              src: "/media/protected/miro-enterprise-guard/classification-before.png",
              alt: "Board classification before: levels edited inline on a single settings page.",
            },
            after: {
              src: "/media/protected/miro-enterprise-guard/classification-after.png",
              alt: "Board classification after: a guided setup from classification levels to reviewing the impact.",
            },
            ratio: "620/400",
            caption: "Board classification, before and after.",
          },
        },
      ],
    },
    {
      id: "dependencies",
      nav: "Dependencies",
      title: "Dependencies all over the place",
      lead: "Detecting sensitive info classifies a board. The classification applies sharing restrictions and informs end users, and every board edit starts it again, next to legal holds and automated lifecycle. Five PMs, four development teams, and me as the only designer.",
      artifact: {
        kind: "screenshot",
        src: "/media/protected/miro-enterprise-guard/dependencies.png",
        ratio: "915/555",
        alt: "Dependencies diagram: detecting sensitive info classifies a board, which applies sharing restrictions and lifecycle rules.",
        caption: "Detection, classification, restrictions and legal hold, all pulling on each other.",
      },
      steps: [
        {
          id: "embrace",
          nav: "Embracing it",
          title: "How we embraced the chaos",
          text: "A rhythm that kept five product managers in step with one designer.",
          points: [
            "1:1 meetings with each PM, three times a week",
            "A weekly sync of the four team leads and me",
            "A weekly progress demo",
            "Excessive documentation",
            "One master prototype",
          ],
        },
      ],
    },
    {
      id: "results",
      nav: "Results",
      title: "More money than expected, two years in a row",
      lead: "We survived, we launched, and we partied hard afterwards. Two more designers joined, which made the amount of work bearable. Since launch the add-on has grown to 199 paying accounts and about $10M in ARR.",
      steps: [
        {
          id: "today",
          nav: "Today",
          title: "Reaching maturity",
          text: "Enterprise Guard keeps growing with data discovery and integrations with external services. Classification now lives in the admin console, with an overview of every board's level and a guided configuration.",
          artifact: {
            kind: "screenshot",
            src: "/media/protected/miro-enterprise-guard/classification.png",
            ratio: "16/10",
            alt: "Classification overview in the admin console: boards by classification level, with configuration tabs.",
            caption: "Classification today: every board's level at a glance.",
          },
        },
      ],
    },
  ],
} as const;
