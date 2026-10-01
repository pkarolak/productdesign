"use client";

import { animate, motion as m } from "motion/react";
import { useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { Suit } from "@/content/schema";
import { haptic } from "@/lib/haptic";
import { motion } from "@theme/motion";
import { hideEmblem, landEmblem } from "./ChapterHeader";

/** Where a card sits on screen when picked, in viewport pixels, and how far it is turned. */
export type CardRect = { left: number; top: number; width: number; height: number; rotate: number };

type Flight = { id: number; from: CardRect; to: { x: number; y: number; scale: number }; face: ReactNode; land: () => void };

let current: Flight | null = null;
let seq = 0;
let cancel: (() => void) | null = null;
const listeners = new Set<() => void>();
const set = (flight: Flight | null) => {
  current = flight;
  listeners.forEach((l) => l());
};
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};

/**
 * Takes the visitor to a chapter: the page scrolls there and, given the card's rect and face, the card flies along
 * with it and lands on the chapter's emblem. Then the hash updates and focus moves to the chapter heading. Under
 * reduced motion it is an instant jump. Scrolling by hand mid-way stops both and drops the card on its emblem.
 */
export function goToChapter({
  href,
  suit,
  from,
  face,
  onDone,
}: {
  href: string;
  suit: Suit;
  from?: CardRect;
  face?: ReactNode;
  onDone?: () => void;
}) {
  const section = href.startsWith("#") ? document.getElementById(href.slice(1)) : null;
  if (!section) {
    window.location.assign(href);
    return;
  }
  cancel?.();
  const margin = parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const top = Math.round(Math.max(0, Math.min(max, section.getBoundingClientRect().top + window.scrollY - margin)));
  const emblem = section.querySelector<HTMLElement>("[data-emblem]");
  const heading = section.querySelector<HTMLElement>("h2");

  const arrive = () => {
    if (window.location.hash !== href) history.pushState(null, "", href);
    if (heading) {
      heading.tabIndex = -1;
      heading.style.outline = "none";
      heading.focus({ preventScroll: true, focusVisible: false } as FocusOptions);
    }
    onDone?.();
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top, behavior: "instant" });
    arrive();
    return;
  }

  const scroll = animate(window.scrollY, top, {
    duration: motion.fly.duration,
    ease: motion.fly.ease,
    onUpdate: (y) => window.scrollTo({ top: y, behavior: "instant" }),
  });
  let flying = false;
  const land = () => {
    if (!flying) return;
    flying = false;
    set(null);
    landEmblem(suit);
    haptic();
  };
  const byHand = () => cancel?.();
  const stopListening = () => {
    window.removeEventListener("wheel", byHand);
    window.removeEventListener("touchstart", byHand);
    window.removeEventListener("keydown", byHand);
  };
  window.addEventListener("wheel", byHand, { passive: true });
  window.addEventListener("touchstart", byHand, { passive: true });
  window.addEventListener("keydown", byHand);
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    if (cancel === stop) cancel = null;
    stopListening();
    land();
    arrive();
  };
  const stop = () => {
    scroll.stop();
    finish();
  };
  cancel = stop;
  scroll.then(finish);

  if (!from || !face || !emblem) return;
  const r = emblem.getBoundingClientRect();
  const shift = window.scrollY - top;
  flying = true;
  hideEmblem(suit);
  set({
    id: ++seq,
    from,
    face,
    land,
    to: {
      x: r.left + r.width / 2 - (from.left + from.width / 2),
      y: r.top + r.height / 2 + shift - (from.top + from.height / 2),
      scale: emblem.offsetWidth / from.width,
    },
  });
}

/** Draws the card in flight above everything else. Mount once per page that has chapters. */
export function FlightLayer() {
  const flight = useSyncExternalStore(
    subscribe,
    () => current,
    () => null,
  );
  if (!flight) return null;
  const { from, to } = flight;
  const { duration, ease, lift, turn } = motion.fly;
  return createPortal(
    <m.div
      key={flight.id}
      aria-hidden
      className="pointer-events-none fixed z-[60]"
      style={{ left: from.left, top: from.top, width: from.width, height: from.height }}
      initial={{ x: 0, y: 0, scale: 1, rotate: from.rotate }}
      animate={{ x: to.x, y: to.y, scale: to.scale, rotate: [from.rotate, from.rotate + turn, -5] }}
      transition={{ duration, ease }}
      onAnimationComplete={flight.land}
    >
      <m.div
        className="size-full"
        initial={{ y: 0 }}
        animate={{ y: [0, -lift, 0] }}
        transition={{ duration, ease, times: [0, 0.4, 1] }}
      >
        {flight.face}
      </m.div>
    </m.div>,
    document.body,
  );
}
