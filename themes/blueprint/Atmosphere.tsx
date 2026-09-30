"use client";

import { motion as m, useScroll, useTransform } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Atmosphere() {
  const pathname = usePathname();
  const layout = pathname === "/" || pathname === "/about" ? "home" : "case";
  const { scrollY } = useScroll();
  const [viewport, setViewport] = useState(900);

  useEffect(() => {
    const update = () => setViewport(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const opacity = useTransform(scrollY, [0, viewport], [1, 0.7], { clamp: true });

  return (
    <m.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="bp-orbs absolute inset-0" data-layout={layout}>
        <span className="o1" />
        <span className="o2" />
        <span className="o3" />
      </div>
      <div className="bp-dots absolute inset-0" />
      <div className="bp-grain absolute inset-0" />
    </m.div>
  );
}
