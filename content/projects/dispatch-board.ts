export const dispatchBoard = {
  slug: "dispatch-board",
  title: "Dispatch board",
  company: "Halden",
  year: 2023,
  access: "protected",
  bottomLine:
    "Turned a nine-tab dispatch tool into one live board, so 220 depot planners assign a load in 38 seconds instead of three minutes.",
  role: "Lead product designer",
  team: "2 PMs, 9 engineers, 1 researcher",
  timeline: "9 months",
  partners: "Co-led discovery with operations research and shadowed 14 night shifts across 4 depots.",
  scope: ["Workflow", "Real-time data", "Research"],
  metrics: [
    { value: "38", unit: "s", label: "median time to assign", context: "down from 3 min, week 6" },
    { value: "79", unit: "%", label: "fewer tab switches", context: "per shift, 220 planners" },
    { value: "12", unit: "%", label: "fewer empty miles", context: "network-wide, first quarter" },
  ],
  beats: [
    {
      label: "Frame",
      text: "Shadowed night shifts and mapped every tab switch. The real job was matching loads to drivers, not filling in forms.",
    },
    {
      label: "Shape",
      text: "Prototyped one board with live constraints. Cut 23 fields and kept the four that planners actually decide on.",
    },
    {
      label: "Ship",
      text: "Piloted in two depots, tuned with weekly telemetry, then rolled out region by region with no retraining day.",
    },
  ],
  artifacts: [
    {
      kind: "compare",
      before: {
        src: "/media/protected/dispatch-board/before.jpg",
        alt: "The old dispatch tool: dense tabs, forms and a long table of loads.",
      },
      after: {
        src: "/media/protected/dispatch-board/after.jpg",
        alt: "The new dispatch board: loads and drivers side by side with live status.",
      },
      caption: "Nine tabs became one board. Drag to compare.",
    },
    {
      kind: "screenshot",
      src: "/media/protected/dispatch-board/after.jpg",
      alt: "Dispatch board with a highlighted load card and driver match suggestion.",
      caption: "Four decisions per load, surfaced where the planner looks.",
      annotations: [
        { x: 22, y: 38 },
        { x: 64, y: 52 },
      ],
    },
  ],
  askMeAbout: [
    "Why we cut 23 fields planners said they needed",
    "What night shifts taught us that interviews missed",
    "The rollout we paused, and why",
  ],
  cover: {
    kind: "screenshot",
    src: "/projects/dispatch-board/cover.jpg",
    alt: "Halden dispatch board showing loads, drivers and live route status.",
  },
} as const;
