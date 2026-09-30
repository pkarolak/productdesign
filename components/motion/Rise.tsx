"use client";

import { motion as m, type HTMLMotionProps } from "motion/react";
import { motion } from "@theme/motion";

type Tag = "div" | "section" | "header" | "li" | "p" | "h1" | "h2" | "span" | "ul" | "article" | "figcaption";

/** The entry reveal. Stagger with `i`; siblings rise in order. */
export function Rise({
  as = "div",
  i = 0,
  ...props
}: HTMLMotionProps<"div"> & { as?: Tag; i?: number }) {
  const Component = m[as] as typeof m.div;
  const { rise, ease } = motion;
  return (
    <Component
      data-rise=""
      initial={{ opacity: 0, y: rise.y, filter: `blur(${rise.blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
      viewport={{ once: true, amount: rise.amount }}
      transition={{ duration: rise.duration, ease, delay: rise.delay + i * rise.stagger }}
      {...props}
    />
  );
}
