"use client";

import { motion as m, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Deck } from "@/content/schema";
import { cn } from "@/lib/cn";
import { motion } from "@theme/motion";

export type CardRect = { left: number; top: number; width: number; height: number; rotate: number };

type Box = Omit<CardRect, "rotate">;

/** Where the card ends up: almost the whole viewport, and the 5:7 card it passes through on the way. */
function stages(): { card: Box; full: Box } {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const pad = vw < 768 ? 12 : 32;
  const width = Math.min(vw - pad * 2, 1240);
  const full = { left: (vw - width) / 2, top: pad, width, height: vh - pad * 2 };
  const h = Math.min(full.height, (full.width * 7) / 5);
  const w = (h * 5) / 7;
  return { full, card: { left: (vw - w) / 2, top: (vh - h) / 2, width: w, height: h } };
}

const track = (a: Box, b: Box, c: Box) => ({
  left: [a.left, b.left, c.left],
  top: [a.top, b.top, c.top],
  width: [a.width, b.width, c.width],
  height: [a.height, b.height, c.height],
});

/** The deck's face frame as a nine-slice, so the corner scrolls keep their shape at any size. */
function Frame({ art }: { art: Deck["face"] }) {
  const slice = (src: string) => ({ borderImage: `url(${src}) 150 fill / clamp(44px, 7vw, 84px) stretch` });
  return (
    <>
      <span aria-hidden className={cn("absolute inset-0", art.srcDark && "dark:hidden")} style={slice(art.src)} />
      {art.srcDark && <span aria-hidden className="absolute inset-0 hidden dark:block" style={slice(art.srcDark)} />}
    </>
  );
}

/**
 * The picked card, lifted off the table: it flips over while travelling to the centre, then widens to fill the
 * screen, and its section appears on the back. Closing plays the same path in reverse and lands on the table.
 */
export function CardZoom({
  from,
  open,
  title,
  front,
  deck,
  onClose,
  onClosed,
  children,
}: {
  from: CardRect;
  open: boolean;
  title: string;
  front: ReactNode;
  deck?: Deck;
  onClose: () => void;
  onClosed: () => void;
  children: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const still = useReducedMotion();
  const [path] = useState(stages);
  const [shown, setShown] = useState(false);
  const start = { left: from.left, top: from.top, width: from.width, height: from.height };

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    d.showModal();
    close.current?.focus();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  const duration = still ? 0 : open ? motion.zoom.open : motion.zoom.close;
  const times = open ? [0, 0.5, 1] : [0, 0.4, 1];
  const animate = open
    ? { ...track(start, path.card, path.full), rotate: [from.rotate, 0, 0], rotateY: [0, 180, 180] }
    : { ...track(path.full, path.card, start), rotate: [0, 0, from.rotate], rotateY: [180, 180, 0] };

  return (
    <dialog
      ref={dialog}
      aria-label={title}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden bg-transparent p-0 text-ink perspective-[2400px] backdrop:bg-transparent"
    >
      <m.div
        aria-hidden
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: still ? 0 : 0.4, delay: open ? 0 : 0.35 }}
        className="fixed inset-0 bg-canvas/80 backdrop-blur-sm"
      />
      <m.div
        className="fixed transform-3d"
        initial={{ ...start, rotate: from.rotate, rotateY: 0 }}
        animate={animate}
        transition={{ duration, times, ease: motion.ease, rotateY: { duration, times, ease: motion.zoom.flip } }}
        onAnimationComplete={() => {
          if (open) setShown(true);
          else {
            dialog.current?.close();
            onClosed();
          }
        }}
      >
        <div className="absolute inset-0 backface-hidden">{front}</div>
        <div className="playing-card absolute inset-0 overflow-hidden rounded-card backface-hidden rotate-y-180">
          {deck && <Frame art={deck.face} />}
          <m.button
            ref={close}
            type="button"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: open ? 1 : 0 }}
            transition={{ duration: 0.3, delay: open && !still ? duration * 0.8 : 0 }}
            className="focus-ring absolute top-[clamp(14px,2.4vw,28px)] right-[calc(clamp(44px,7vw,84px)+8px)] z-10 grid size-10 place-items-center rounded-pill border border-hairline bg-canvas/80 text-ink-2 transition-colors duration-(--t-hover-short) ease-slow hover:text-ink"
          >
            <Icon name="x" className="size-4" />
            <span className="sr-only">Close</span>
          </m.button>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: open ? 1 : 0 }}
            transition={{ duration: still ? 0 : open ? 0.5 : 0.15, delay: open && !still ? duration * 0.62 : 0 }}
            className="absolute inset-[clamp(40px,6vw,76px)] overflow-y-auto overscroll-contain [scrollbar-width:thin]"
          >
            {(shown || open) && children}
          </m.div>
        </div>
      </m.div>
    </dialog>
  );
}
