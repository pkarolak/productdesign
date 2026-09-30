"use client";

import Image from "next/image";
import { motion as m, useInView, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { SmartLink } from "@/components/ui/SmartLink";
import type { Hero } from "@/content/schema";
import { cn } from "@/lib/cn";
import { motion } from "@theme/motion";

type Row = Hero["intro"][number];
type Part = Row["parts"][number];

const STEP_MS = 4200;
const leading = /^[.,;:!?)]+/;

/**
 * A run of text and company links. Each link is glued to the word before it, so a logo never starts a line on its
 * own, and trailing punctuation stays with the link.
 */
function Parts({ parts, quiet }: { parts: Part[]; quiet?: boolean }) {
  return parts.map((part, i) => {
    const prev = parts[i - 1];
    const next = parts[i + 1];
    if (typeof part === "string") {
      let text = prev && typeof prev !== "string" ? part.replace(leading, "") : part;
      if (next && typeof next !== "string") text = text.replace(/\s*\S+\s*$/, "");
      if (!text) return null;
      const space = i > 0 && !leading.test(part) ? " " : "";
      return `${space}${text}`;
    }
    const glued = typeof prev === "string" ? (prev.trimEnd().match(/\S+$/)?.[0] ?? "") : "";
    const trailing = typeof next === "string" ? (next.match(leading)?.[0] ?? "") : "";
    return (
      <span key={part.pill}>
        {i > 0 && " "}
        <span className="whitespace-nowrap">
          {glued && `${glued} `}
          <SmartLink
            href={part.href}
            className={cn(
              "focus-ring rounded-inset underline decoration-1 underline-offset-[0.22em] transition-colors duration-(--t-hover-short) ease-slow hover:decoration-accent",
              quiet ? "text-ink-2 decoration-ink-3/40 hover:text-ink" : "text-ink decoration-ink-3/50",
            )}
          >
            {part.logo ? (
              <Image
                src={part.logo}
                alt=""
                width={16}
                height={16}
                className={cn("mr-1.5 inline-block object-contain", quiet ? "size-3.5 align-[-0.15em]" : "size-4 align-[-0.18em]")}
              />
            ) : (
              <span
                aria-hidden
                className="mr-1.5 inline-grid size-4 place-items-center rounded-pill bg-accent/15 align-[-0.18em] text-[10px] leading-none text-accent"
              >
                {part.pill[0]}
              </span>
            )}
            {part.pill}
          </SmartLink>
          {trailing}
        </span>
      </span>
    );
  });
}

/**
 * Where the day goes, one line at a time. A small switch picks the time of day. On first view it plays the day
 * through once and settles back on the first line; hovering or focusing pauses it, and any pick stops it for good.
 * Every line stays in the page, stacked in one cell so switching never shifts the layout.
 */
export function DayCycle({ rows }: { rows: Hero["intro"] }) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const still = useReducedMotion();
  const inView = useInView(root, { amount: 0.6 });
  const [active, setActive] = useState(0);
  const [steps, setSteps] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [paused, setPaused] = useState(false);
  const playing = !still && !stopped && !paused && inView && rows.length > 1 && steps < rows.length;

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      setActive((a) => (a + 1) % rows.length);
      setSteps((s) => s + 1);
    }, STEP_MS);
    return () => clearTimeout(t);
  }, [playing, active, rows.length]);

  const pick = (i: number, focus = false) => {
    setStopped(true);
    setActive(i);
    if (focus) tabs.current[i]?.focus();
  };

  const onKey = (e: KeyboardEvent) => {
    const last = rows.length - 1;
    const to = { ArrowRight: active === last ? 0 : active + 1, ArrowLeft: active === 0 ? last : active - 1, Home: 0, End: last }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    pick(to, true);
  };

  if (!rows.length) return null;
  return (
    <div
      ref={root}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        role="tablist"
        aria-label="A day in my life"
        onKeyDown={onKey}
        className="inline-flex items-center gap-0.5 rounded-pill border border-hairline p-1"
      >
        {rows.map((row, i) => (
          <button
            key={row.when}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => pick(i)}
            className="focus-ring type-small relative flex items-center gap-1.5 rounded-pill px-3 py-1 text-ink-3! transition-colors duration-(--t-hover-short) ease-slow hover:text-ink! aria-selected:text-ink!"
          >
            {i === active && (
              <m.span
                layoutId={`${id}-now`}
                transition={still ? { duration: 0 } : motion.spring}
                className="absolute inset-0 rounded-pill bg-accent/15"
              />
            )}
            <Icon name={row.icon} className={cn("relative size-4", i === active && "text-accent")} />
            <span className="relative">{row.when}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 grid max-w-[34rem]">
        {rows.map((row, i) => (
          <p
            key={row.when}
            id={`${id}-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${i}`}
            aria-hidden={i !== active}
            inert={i !== active}
            className={cn(
              "type-lede text-ink-2 [grid-area:1/1] transition-[opacity,translate] duration-(--t-hover) ease-slow",
              i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1.5 opacity-0",
            )}
          >
            <Parts parts={row.parts} />
            {row.note && (
              <>
                {" "}
                <span className="text-ink-3">
                  <Parts parts={row.note} quiet />
                </span>
              </>
            )}
          </p>
        ))}
      </div>
    </div>
  );
}
