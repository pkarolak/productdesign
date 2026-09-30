"use client";

import { AnimatePresence, motion as m } from "motion/react";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { Company, GlossaryEntry } from "@/content/schema";
import { cn } from "@/lib/cn";
import { motion } from "@theme/motion";

const WIDTH = 340;
const MARGIN = 16;
const GAP = 10;
const noop = () => () => {};

/** Which term is open, shared so that opening one closes any other. */
let current: string | null = null;
const listeners = new Set<() => void>();
const setCurrent = (id: string | null) => {
  current = id;
  listeners.forEach((l) => l());
};
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/** A card leaving because another term took over vanishes at once, so two are never on screen together. */
const leave = {
  exit: (handedOver: boolean) =>
    handedOver ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.98, transition: { duration: 0.18, ease: motion.ease } },
};

const narrow = "(max-width: 767px)";
/** A real mouse on a device that can hover; phones sometimes report fast taps as mouse events. */
const hovering = (pointerType: string) => pointerType === "mouse" && window.matchMedia("(hover: hover)").matches;
const watchNarrow = (l: () => void) => {
  const q = window.matchMedia(narrow);
  q.addEventListener("change", l);
  return () => q.removeEventListener("change", l);
};

/**
 * A highlighted run of text that opens a small card on hover, focus or tap. Only one is open at a time.
 * The card is portalled out of the surrounding text so it never becomes part of it,
 * stays open while the pointer is over it, and closes on Escape (WCAG 1.4.13).
 * Tapped on a narrow screen, or opened in any way on a narrow device that cannot hover, it opens centred over a
 * blurred scrim, and any tap closes it. A mouse or keyboard gets the anchored card, since a scrim under the pointer
 * would end the hover that opened it. Fast taps do not always report themselves as touch, hence the device check.
 */
export function Bubble({
  label,
  card,
  name,
  children,
}: {
  label: string;
  card: ReactNode;
  /** A proper name rather than a word: no highlight and no underline of its own; the name inside draws a fine one. */
  name?: boolean;
  children: ReactNode;
}) {
  const [pos, setPos] = useState<{ left: number; top: number; above: boolean } | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const pointer = useRef("");
  const closing = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const id = useId();
  const client = useSyncExternalStore(noop, () => true, () => false);
  const open = useSyncExternalStore(subscribe, () => current === id, () => false);
  const handedOver = useSyncExternalStore(subscribe, () => current !== null && current !== id, () => false);
  const narrowScreen = useSyncExternalStore(watchNarrow, () => window.matchMedia(narrow).matches, () => false);
  const [tapped, setTapped] = useState(false);
  const centred = tapped && narrowScreen;

  const close = useCallback(() => {
    if (current === id) setCurrent(null);
  }, [id]);
  const show = useCallback((byTap = false) => {
    clearTimeout(closing.current);
    setTapped(byTap || window.matchMedia("(hover: none)").matches);
    setCurrent(id);
  }, [id]);
  const hide = useCallback(() => {
    clearTimeout(closing.current);
    closing.current = setTimeout(close, 140);
  }, [close]);

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
    if (open && !centred) place();
  }, [open, centred, place]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    if (centred) return () => window.removeEventListener("keydown", onKey);
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", place);
      window.removeEventListener("resize", place);
    };
  }, [open, centred, place, close]);

  useEffect(
    () => () => {
      clearTimeout(closing.current);
      if (current === id) setCurrent(null);
    },
    [id],
  );

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-describedby={open ? id : undefined}
        aria-expanded={open}
        onPointerEnter={(e) => hovering(e.pointerType) && show()}
        onPointerLeave={(e) => hovering(e.pointerType) && hide()}
        onPointerDown={(e) => (pointer.current = e.pointerType)}
        onFocus={() => !pointer.current && show()}
        onBlur={hide}
        onClick={() => {
          const kind = pointer.current;
          pointer.current = "";
          if (hovering(kind)) return;
          if (open) close();
          else show(kind === "touch" || kind === "pen");
        }}
        className={cn(
          "group/bubble focus-ring cursor-help rounded-inset text-inherit transition-colors duration-(--t-hover-short) ease-slow",
          !name &&
            "decoration-accent/30 decoration-dotted decoration-2 underline-offset-[0.16em] [text-decoration-line:underline] group-hover/tagline:decoration-accent/70 hover:bg-accent/10 hover:text-ink hover:decoration-accent aria-expanded:bg-accent/10 aria-expanded:text-ink aria-expanded:decoration-accent",
        )}
      >
        {children}
      </button>
      {client &&
        createPortal(
          <AnimatePresence>
            {open && centred && (
              <m.aside
                key="centred"
                aria-label={label}
                onClick={close}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: motion.ease }}
                className="fixed inset-0 z-[70] grid touch-none place-items-center bg-canvas/60 p-4 backdrop-blur-md"
              >
                <m.div
                  id={id}
                  role="tooltip"
                  initial={{ y: 10, scale: 0.96 }}
                  animate={{ y: 0, scale: 1 }}
                  exit={{ y: 6, scale: 0.98 }}
                  transition={{ duration: 0.26, ease: motion.ease }}
                  className="surface surface-deep w-full max-w-[340px] rounded-card p-5 text-left"
                >
                  {card}
                </m.div>
              </m.aside>
            )}
          </AnimatePresence>,
          document.body,
        )}
      {client &&
        createPortal(
          <AnimatePresence custom={handedOver}>
            {open && !centred && pos && (
              <m.div
                key="anchored"
                id={id}
                role="tooltip"
                initial={{ opacity: 0, y: pos.above ? 6 : -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                variants={leave}
                exit="exit"
                custom={handedOver}
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
                {card}
              </m.div>
            )}
          </AnimatePresence>,
          document.querySelector("main") ?? document.body,
        )}
    </>
  );
}

/** A glossary term with a dictionary-style card. */
export function Definition({ entry, children }: { entry: GlossaryEntry; children: ReactNode }) {
  return (
    <Bubble
      label="Dictionary"
      card={
        <>
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
        </>
      }
    >
      {children}
    </Bubble>
  );
}

/** A company or product name that explains itself in a small card instead of linking away. */
export function CompanyNote({ company, children }: { company: Company; children: ReactNode }) {
  return (
    <Bubble
      name
      label={`About ${company.pill}`}
      card={
        <>
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-inset border border-hairline bg-canvas">
              {company.logo ? (
                <Image src={company.logo} alt="" width={24} height={24} className="size-6 object-contain" />
              ) : (
                <span aria-hidden className="type-h3 text-accent">
                  {company.pill[0]}
                </span>
              )}
            </span>
            <span className="grid">
              <span className="type-h3 text-ink">{company.pill}</span>
              <span className="type-caption text-ink-3!">{company.kind}</span>
            </span>
          </div>
          <p className="type-small mt-3 text-ink-2!">{company.about}</p>
        </>
      }
    >
      {children}
    </Bubble>
  );
}
