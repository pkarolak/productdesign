"use client";

import { motion as m, useReducedMotion, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { motion } from "@theme/motion";

/**
 * A frame that leans a few degrees toward a mouse pointer and settles back on leave. Its `group/photo` lets the image
 * inside zoom a touch. Touch, pen and reduced motion get a still frame.
 */
export function Tilt({ children, className, max = 4 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { stiffness, damping, mass } = motion.spring;
  const rotateX = useSpring(0, { stiffness, damping, mass });
  const rotateY = useSpring(0, { stiffness, damping, mass });

  return (
    <m.div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (reduced || e.pointerType !== "mouse" || !el) return;
        const r = el.getBoundingClientRect();
        rotateY.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
        rotateX.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
      }}
      onPointerLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={cn("group/photo", className)}
    >
      {children}
    </m.div>
  );
}
