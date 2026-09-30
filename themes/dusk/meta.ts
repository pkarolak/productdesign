import type { ThemeMeta } from "../contract";

/** Plain values for places that cannot read CSS variables: browser chrome and OG images. */
export const meta = {
  name: "Dusk",
  defaultMode: "dark",
  themeColor: { light: "#F6F6F5", dark: "#0F1012" },
  og: {
    canvas: "#0F1012",
    ink: "#ECEDEE",
    ink2: "#A6A9AF",
    accent: "#E8B270",
    glow: "rgba(232, 178, 112, 0.10)",
    glow2: "rgba(255, 255, 255, 0.03)",
    dot: "rgba(255, 255, 255, 0.05)",
    fontFamily: "Geist",
    fontWeights: [400, 600] as const,
  },
} satisfies ThemeMeta;
