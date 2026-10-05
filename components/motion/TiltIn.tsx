"use client";

import { motion as m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { type ReactNode, useRef } from "react";

/** Lays its child back in perspective and stands it up as it scrolls into view. Static under reduced motion. */
export function TiltIn({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.25"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <div ref={ref} className={className} style={{ perspective: 1600 }}>
      <m.div style={reduced ? undefined : { rotateX, scale, y, transformOrigin: "50% 0%" }}>{children}</m.div>
    </div>
  );
}
