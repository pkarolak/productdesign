"use client";

import { useState } from "react";
import { Picture } from "./Picture";

type Img = { src: string; srcDark?: string; alt: string };

export function Compare({ before, after, sizes }: { before: Img; after: Img; sizes: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="absolute inset-0">
      <Picture {...after} sizes={sizes} className="object-cover object-top" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Picture {...before} sizes={sizes} className="object-cover object-top" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-px bg-accent" style={{ left: `${pos}%` }}>
        <span className="core absolute top-1/2 left-1/2 grid h-9 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-pill shadow-raised">
          <span className="flex gap-1">
            <span className="h-3.5 w-px bg-ink-2" />
            <span className="h-3.5 w-px bg-ink-2" />
          </span>
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={5}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Compare before and after. Before: ${before.alt} After: ${after.alt}`}
        className="focus-ring absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
