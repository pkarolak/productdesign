"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type Source = { src: string; poster: string };

/**
 * A muted loop that plays only in view. Under reduced motion, its poster. An empty `alt` marks it decorative. With a
 * `dark` recording, each colour mode shows its own loop instead of dimming the light one.
 */
export function Video({ src, poster, dark, alt, className }: Source & { dark?: Source; alt: string; className?: string }) {
  const base = "absolute inset-0 h-full w-full object-cover object-[0%_0%]";
  if (!dark) return <Loop src={src} poster={poster} alt={alt} className={cn("media", base, className)} />;
  return (
    <>
      <Loop src={src} poster={poster} alt={alt} className={cn(base, "dark:hidden", className)} />
      <Loop src={dark.src} poster={dark.poster} alt={alt} className={cn(base, "hidden dark:block", className)} />
    </>
  );
}

function Loop({ src, poster, alt, className }: Source & { alt: string; className: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

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
    return <img src={poster} alt={alt} className={className} />;
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
      className={className}
    />
  );
}
