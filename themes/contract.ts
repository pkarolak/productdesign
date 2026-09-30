import type { ComponentType, SVGProps } from "react";
import type { Asset } from "@/content/schema";

/**
 * The contract every design language in `themes/<name>/` implements.
 * App code imports only from `@theme/*` and uses only the CSS names listed in
 * `themes/contract.json`. See docs/theming.md.
 */

export type Easing = [number, number, number, number];

export interface MotionTokens {
  ease: Easing;
  spring: { type: "spring"; stiffness: number; damping: number; mass: number };
  rise: {
    duration: number;
    stagger: number;
    delay: number;
    y: number;
    blur: number;
    amount: number;
  };
  hover: { duration: number; scale: number };
  menu: { duration: number; stagger: number };
}

export const iconNames = [
  "arrow-right",
  "arrow-up-right",
  "sun",
  "moon",
  "lock",
  "lock-open",
  "circle-alert",
  "menu",
  "x",
] as const;

export type IconName = (typeof iconNames)[number];

export type IconComponent = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string }
>;

export interface IconTokens {
  set: Record<IconName, IconComponent>;
  strokeWidth: number;
  size: { ui: number; nav: number };
}

export interface ThemeMeta {
  name: string;
  themeColor: { light: string; dark: string };
  og: {
    canvas: string;
    ink: string;
    ink2: string;
    accent: string;
    glow: string;
    glow2: string;
    dot: string;
    /** A Google Fonts family, fetched at build time for OG images. */
    fontFamily: string;
    fontWeights: readonly number[];
  };
}

export interface DiagramProps {
  layers: string[];
  alt: string;
}

export interface SignatureProps {
  plates?: Extract<Asset, { kind: "isometric" }>["plates"];
  priority?: boolean;
  className?: string;
  /** Stagger index for the entry reveal; omit to render without motion. */
  rise?: number;
  /** "hero" fills half the container; "compact" fits a 5 of 12 column slot. */
  size?: "hero" | "compact";
}
