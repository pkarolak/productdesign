"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

export function Video({ src, poster, alt }: { src: string; poster: string; alt: string }) {
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
    return <img src={poster} alt={alt} className="absolute inset-0 h-full w-full object-cover" />;
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
      aria-label={alt}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
