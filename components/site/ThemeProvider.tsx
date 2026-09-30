"use client";

import { MotionConfig } from "motion/react";
import { ThemeProvider as NextThemes } from "next-themes";
import type { ReactNode } from "react";
import { meta } from "@theme/meta";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemes attribute="data-theme" defaultTheme={meta.defaultMode} enableSystem>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemes>
  );
}
