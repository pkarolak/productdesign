import { Geist } from "next/font/google";

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

/** Must set --theme-font-display and --theme-font-body on <html>. */
export const fontVariables = `${display.variable} ${body.variable}`;
