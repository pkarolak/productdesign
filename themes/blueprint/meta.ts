import type { ThemeMeta } from "../contract";

/** Plain values for places that cannot read CSS variables: browser chrome and OG images. */
export const meta = {
  name: "Blueprint",
  themeColor: { light: "#F5F7FB", dark: "#080C17" },
  og: {
    canvas: "#F5F7FB",
    ink: "#0B1220",
    ink2: "#4E5868",
    accent: "#2F5BEA",
    glow: "rgba(47, 91, 234, 0.30)",
    glow2: "rgba(140, 180, 255, 0.40)",
    dot: "rgba(11, 18, 32, 0.16)",
    fontFamily: "Sora",
    fontWeights: [300, 400] as const,
  },
} satisfies ThemeMeta;
