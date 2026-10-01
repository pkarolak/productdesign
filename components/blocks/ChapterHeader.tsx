"use client";

import { useAnimate } from "motion/react";
import { useEffect } from "react";
import { JokerEmblem, Suit, suitInk, suitTint } from "@/components/ui/Suit";
import type { Suit as SuitName } from "@/content/schema";
import { cn } from "@/lib/cn";
import { motion } from "@theme/motion";

const LAND = "chapter:land";
const FLY = "chapter:fly";

/** Hides a chapter's emblem while its card flies in, so the card can take its place. */
export const hideEmblem = (suit: SuitName) => window.dispatchEvent(new CustomEvent(FLY, { detail: suit }));

/** Shows a chapter's emblem again with a small settle, as the flying card lands on it. */
export const landEmblem = (suit: SuitName) => window.dispatchEvent(new CustomEvent(LAND, { detail: suit }));

/** The emblem for a suit, if a chapter with that suit is on the page. */
export const findEmblem = (suit: SuitName) => document.querySelector<HTMLElement>(`[data-emblem="${suit}"]`);

/** A chapter's card in miniature, beside its heading: where a picked card from the hand lands. */
export function ChapterEmblem({ suit, className }: { suit: SuitName; className?: string }) {
  const [scope, animate] = useAnimate<HTMLSpanElement>();

  useEffect(() => {
    const el = scope.current;
    const mine = (e: Event) => (e as CustomEvent<SuitName>).detail === suit;
    const onFly = (e: Event) => {
      if (mine(e)) el.style.opacity = "0";
    };
    const onLand = (e: Event) => {
      if (!mine(e)) return;
      el.style.opacity = "1";
      animate(el, { scale: [1.14, 1], rotate: [-12, -5] }, motion.sheet);
    };
    window.addEventListener(FLY, onFly);
    window.addEventListener(LAND, onLand);
    return () => {
      window.removeEventListener(FLY, onFly);
      window.removeEventListener(LAND, onLand);
    };
  }, [scope, animate, suit]);

  return (
    <span
      ref={scope}
      aria-hidden
      data-emblem={suit}
      style={{ transform: "rotate(-5deg)" }}
      className={cn(
        "playing-card relative grid h-14 w-10 shrink-0 place-items-center overflow-hidden rounded-print",
        className,
      )}
    >
      <span data-tint={suitTint[suit]} className="card-tint" />
      {suit === "joker" ? (
        <JokerEmblem className="relative size-6!" />
      ) : (
        <Suit suit={suit} className={cn("relative size-5", suitInk[suit])} />
      )}
    </span>
  );
}
