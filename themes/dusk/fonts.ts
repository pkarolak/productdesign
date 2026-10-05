import { Caveat, Geist } from "next/font/google";

const display = Geist({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--theme-font-display",
  display: "swap",
});

const body = Geist({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--theme-font-body",
  display: "swap",
});

/** Handwritten doodle captions only (ADR 0014). */
const hand = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--theme-font-hand",
  display: "swap",
});

/** Must set --theme-font-display, --theme-font-body and --theme-font-hand on <html>. */
export const fontVariables = `${display.variable} ${body.variable} ${hand.variable}`;
