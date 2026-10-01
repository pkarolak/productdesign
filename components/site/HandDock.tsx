"use client";

import { AnimatePresence, motion as m } from "motion/react";
import { useEffect, useState, type MouseEvent } from "react";
import { goToChapter } from "@/components/blocks/flight";
import { JokerEmblem, Suit, suitInk, suitTint } from "@/components/ui/Suit";
import type { HandCard, Suit as SuitName } from "@/content/schema";
import { cn } from "@/lib/cn";
import { motion } from "@theme/motion";

/** The hero hand; the dock shows once it has scrolled away above the viewport. */
const HAND = 'nav[aria-label="Sections"]';
/** Sections the dock must not cover: the letter or contact block, and the footer. */
const HIDE = "[data-dock-hide], footer";

function Mini({ suit, className }: { suit: SuitName; className?: string }) {
  return (
    <span className={cn("playing-card relative grid h-10 w-7 shrink-0 place-items-center overflow-hidden rounded-print", className)}>
      <span data-tint={suitTint[suit]} className="card-tint" />
      {suit === "joker" ? (
        <JokerEmblem className="relative size-4!" />
      ) : (
        <Suit suit={suit} className={cn("relative size-3.5", suitInk[suit])} />
      )}
    </span>
  );
}

/** Which chapter is being read: the last one whose top has passed 40% of the viewport. */
function useCurrent(cards: HandCard[]) {
  const [current, setCurrent] = useState(-1);
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let at = -1;
      cards.forEach((c, i) => {
        const el = document.getElementById(c.href.slice(1));
        if (el && el.getBoundingClientRect().top <= line) at = i;
      });
      setCurrent(at);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [cards]);
  return current;
}

/** Whether the dock should show: the hero hand is gone above, and nothing it must not cover is in view. */
function useShown() {
  const [past, setPast] = useState(false);
  const [blocked, setBlocked] = useState(false);
  useEffect(() => {
    const hand = document.querySelector(HAND);
    const handIo = new IntersectionObserver(([e]) => setPast(!e.isIntersecting && e.boundingClientRect.top < 0));
    if (hand) handIo.observe(hand);
    const seen = new Set<Element>();
    const hideIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
        setBlocked(seen.size > 0);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    document.querySelectorAll(HIDE).forEach((el) => hideIo.observe(el));
    return () => {
      handIo.disconnect();
      hideIo.disconnect();
    };
  }, []);
  return past && !blocked;
}

/**
 * The hand in miniature, docked at the bottom once the hero is out of view: the page's table of contents. The
 * chapter being read is raised and named; hovering or focusing the dock names them all. A tap flies to the chapter.
 */
export function HandDock({ cards }: { cards: HandCard[] }) {
  const current = useCurrent(cards);
  const shown = useShown();

  const go = (card: HandCard) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    const mini = e.currentTarget.querySelector<HTMLElement>("[data-mini]");
    const r = mini?.getBoundingClientRect();
    goToChapter({
      href: card.href,
      suit: card.suit,
      from: r && mini ? { left: r.left, top: r.top, width: mini.offsetWidth, height: mini.offsetHeight, rotate: 0 } : undefined,
      face: <Mini suit={card.suit} className="size-full" />,
    });
  };

  if (cards.length < 2) return null;
  return (
    <AnimatePresence>
      {shown && (
        <m.nav
          aria-label="Chapters"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={motion.sheet}
          className="group/dock surface-strong fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 mx-auto w-max max-w-[calc(100vw-1rem)] rounded-pill px-1.5"
        >
          <ul className="flex items-center">
            {cards.map((card, i) => {
              const on = i === current;
              return (
                <li key={card.href}>
                  <a
                    href={card.href}
                    onClick={go(card)}
                    aria-current={on ? "location" : undefined}
                    className="focus-ring group/mini flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-pill px-1.5"
                  >
                    <span
                      data-mini
                      className={cn(
                        "transition-transform duration-(--t-hover) ease-slow group-hover/mini:-translate-y-1",
                        on ? "-translate-y-1.5 -rotate-6" : "rotate-0 opacity-80",
                      )}
                    >
                      <Mini suit={card.suit} />
                    </span>
                    <span
                      className={cn(
                        "type-small grid overflow-hidden whitespace-nowrap text-ink transition-[grid-template-columns,opacity,padding] duration-(--t-hover) ease-slow",
                        on
                          ? "grid-cols-[1fr] pr-1.5 opacity-100"
                          : "grid-cols-[0fr] opacity-0 md:group-focus-within/dock:grid-cols-[1fr] md:group-focus-within/dock:pr-1.5 md:group-focus-within/dock:opacity-100 md:group-hover/dock:grid-cols-[1fr] md:group-hover/dock:pr-1.5 md:group-hover/dock:opacity-100",
                      )}
                    >
                      <span className="min-w-0">{card.title}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </m.nav>
      )}
    </AnimatePresence>
  );
}
