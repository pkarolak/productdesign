"use client";

import { motion as m, useReducedMotion } from "motion/react";
import { motion } from "@theme/motion";

/** The letter's handwritten sign-off: it writes itself in, then a swash underlines it. */
export function SignOff({ children }: { children: string }) {
  const still = useReducedMotion();
  return (
    <m.div
      className="relative mt-8 inline-block -rotate-6 pr-3"
      initial={still ? false : "off"}
      whileInView="on"
      viewport={{ once: true, amount: 0.6 }}
    >
      <m.p
        className="type-hand text-[3.75rem] leading-[0.9] font-[700] text-ink md:text-[4.5rem]"
        variants={{ off: { clipPath: "inset(0 100% 0 0)" }, on: { clipPath: "inset(0 0% 0 0)" } }}
        transition={{ duration: 1.1, ease: motion.ease, delay: 0.2 }}
      >
        {children}
      </m.p>
      <svg aria-hidden viewBox="0 0 240 28" className="-mt-1 ml-[4%] block h-auto w-[92%] overflow-visible">
        <m.path
          d="M4 20 C 60 8, 150 4, 232 12 C 214 14, 196 18, 182 25"
          className="fill-none stroke-accent"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{ off: { pathLength: 0 }, on: { pathLength: 1 } }}
          transition={{ duration: 0.7, ease: motion.ease, delay: 1.1 }}
        />
      </svg>
    </m.div>
  );
}
