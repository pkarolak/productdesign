"use client";

import { AnimatePresence, motion as m } from "motion/react";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { GlossaryEntry } from "@/content/schema";
import { motion } from "@theme/motion";

const WIDTH = 340;
const MARGIN = 16;
const GAP = 10;
const noop = () => () => {};

/**
 * A highlighted term that opens a dictionary-style card on hover, focus or tap.
 * The card is portalled out of the heading so it never becomes part of the heading's text,
 * stays open while the pointer is over it, and closes on Escape (WCAG 1.4.13).
 */
export function Definition({ entry, children }: { entry: GlossaryEntry; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ left: number; top: number; above: boolean } | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const pointer = useRef("");
  const closing = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const id = useId();
  const client = useSyncExternalStore(noop, () => true, () => false);

  const show = useCallback(() => {
    clearTimeout(closing.current);
    setOpen(true);
  }, []);
  const hide = useCallback(() => {
    clearTimeout(closing.current);
    closing.current = setTimeout(() => setOpen(false), 140);
  }, []);

  const place = useCallback(() => {
    const el = trigger.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const width = Math.min(WIDTH, window.innerWidth - MARGIN * 2);
    const left = Math.min(Math.max(r.left, MARGIN), window.innerWidth - width - MARGIN);
    const above = r.bottom + GAP + 260 > window.innerHeight && r.top > 300;
    setPos({ left, top: above ? r.top - GAP : r.bottom + GAP, above });
  }, []);

  useLayoutEffect(() => {
    if (open) place();
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", place);
      window.removeEventListener("resize", place);
    };
  }, [open, place]);

  useEffect(() => () => clearTimeout(closing.current), []);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-describedby={open ? id : undefined}
        aria-expanded={open}
        onPointerEnter={(e) => e.pointerType === "mouse" && show()}
        onPointerLeave={(e) => e.pointerType === "mouse" && hide()}
        onPointerDown={(e) => (pointer.current = e.pointerType)}
        onFocus={() => !pointer.current && show()}
        onBlur={hide}
        onClick={() => {
          const kind = pointer.current;
          pointer.current = "";
          if (kind === "mouse") return;
          if (open) setOpen(false);
          else show();
        }}
        className="focus-ring cursor-help rounded-inset text-inherit [text-shadow:inherit] decoration-ink-3/50 decoration-dotted decoration-1 underline-offset-[0.16em] hover:decoration-accent aria-expanded:decoration-accent [text-decoration-line:underline] transition-colors duration-(--t-hover-short) ease-slow hover:bg-accent/10 hover:text-ink aria-expanded:bg-accent/10 aria-expanded:text-ink"
      >
        {children}
      </button>
      {client &&
        createPortal(
          <AnimatePresence>
            {open && pos && (
              <m.div
                id={id}
                role="tooltip"
                initial={{ opacity: 0, y: pos.above ? 6 : -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: pos.above ? 4 : -4, scale: 0.98 }}
                transition={{ duration: 0.22, ease: motion.ease }}
                style={{
                  left: pos.left,
                  top: pos.top,
                  width: Math.min(WIDTH, window.innerWidth - MARGIN * 2),
                  transformOrigin: pos.above ? "0 100%" : "0 0",
                  translateY: pos.above ? "-100%" : 0,
                }}
                className="surface surface-deep pointer-events-none fixed z-[70] rounded-card p-5 text-left"
              >
                <p className="type-label">Dictionary</p>
                <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="type-h3 text-ink">{entry.term.toLowerCase()}</span>
                  {entry.phonetic && <span className="type-small text-ink-3!">| {entry.phonetic} |</span>}
                </p>
                <p className="type-caption mt-1 text-ink-3!">{entry.kind}</p>
                <ol className="mt-3 grid gap-2">
                  {entry.senses.map((s, i) => (
                    <li key={i} className="type-small grid grid-cols-[1.1rem_minmax(0,1fr)] text-ink-2!">
                      <span aria-hidden className="text-accent tabular-nums">
                        {i + 1}
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
                {entry.origin && (
                  <p className="type-caption mt-4 border-t border-hairline pt-3 text-ink-3!">
                    <span className="mr-2 font-semibold tracking-[0.08em] text-ink-2">ORIGIN</span>
                    {entry.origin}
                  </p>
                )}
              </m.div>
            )}
          </AnimatePresence>,
          document.querySelector("main") ?? document.body,
        )}
    </>
  );
}
