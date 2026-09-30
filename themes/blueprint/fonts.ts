import { Lato, Sora } from "next/font/google";

const display = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--theme-font-display",
  display: "swap",
});

const body = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--theme-font-body",
  display: "swap",
});

/** Must set --theme-font-display and --theme-font-body on <html>. */
export const fontVariables = `${display.variable} ${body.variable}`;
