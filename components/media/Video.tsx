"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/** A muted loop that plays only in view. Under reduced motion, its poster. An empty `alt` marks it decorative. */
export function Video({ src, poster, alt, className }: { src: string; poster: string; alt: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const classes = cn("media absolute inset-0 h-full w-full object-cover object-[0%_0%]", className);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void el.play().catch(() => {});
      else el.pause();
    });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  if (reduced) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt={alt} className={classes} />;
  }
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      className={classes}
    />
  );
}
