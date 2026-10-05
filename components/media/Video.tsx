"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type Source = { src: string; poster: string };
type Play = "view" | "hover";

/**
 * A muted loop. By default it plays while in view; with `play="hover"` it plays while the pointer is over the nearest
 * `[data-loop-root]` (or it has focus) on screens that can hover, and in view everywhere else. Under reduced motion,
 * its poster. An empty `alt` marks it decorative. With a `dark` recording, each colour mode shows its own loop instead of
 * dimming the light one.
 */
export function Video({
  src,
  poster,
  dark,
  play = "view",
  alt,
  className,
}: Source & { dark?: Source; play?: Play; alt: string; className?: string }) {
  const base = "absolute inset-0 h-full w-full object-cover object-[0%_0%]";
  if (!dark) return <Loop src={src} poster={poster} play={play} alt={alt} className={cn("media", base, className)} />;
  return (
    <>
      <Loop src={src} poster={poster} play={play} alt={alt} className={cn(base, "dark:hidden", className)} />
      <Loop src={dark.src} poster={dark.poster} play={play} alt={alt} className={cn(base, "hidden dark:block", className)} />
    </>
  );
}

function Loop({ src, poster, play, alt, className }: Source & { play: Play; alt: string; className: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const start = () => {
      if (el.getClientRects().length) void el.play().catch(() => {});
    };
    const stop = () => el.pause();

    if (play === "hover" && matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const root = el.closest<HTMLElement>("[data-loop-root]") ?? el;
      const rewind = () => {
        el.pause();
        el.currentTime = 0;
      };
      const blur = (e: FocusEvent) => {
        if (!root.contains(e.relatedTarget as Node | null)) rewind();
      };
      root.addEventListener("pointerenter", start);
      root.addEventListener("pointerleave", rewind);
      root.addEventListener("focusin", start);
      root.addEventListener("focusout", blur);
      return () => {
        root.removeEventListener("pointerenter", start);
        root.removeEventListener("pointerleave", rewind);
        root.removeEventListener("focusin", start);
        root.removeEventListener("focusout", blur);
      };
    }

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
      threshold: play === "hover" ? 0.6 : 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, play]);

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
