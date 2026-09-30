"use client";

import { motion as m } from "motion/react";
import { useState } from "react";
import { Rise } from "@/components/motion/Rise";
import { Icon } from "@/components/ui/Icon";
import { SmartLink } from "@/components/ui/SmartLink";
import { Suit, suitBg } from "@/components/ui/Suit";
import type { HandCard } from "@/content/schema";
import { cn } from "@/lib/cn";
import { motion } from "@theme/motion";

function Card({
  card,
  className,
  onFocus,
  onBlur,
}: {
  card: HandCard;
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}) {
  const joker = card.suit === "joker";
  const corner = joker ? (
    <span className="type-caption flex flex-col items-center leading-[1.05] font-semibold text-suit-ink!">
      {"JOKER".split("").map((l, i) => (
        <span key={i}>{l}</span>
      ))}
    </span>
  ) : (
    <span className="flex flex-col items-center gap-1 leading-none">
      <span className="type-h3 text-suit-ink!">A</span>
      <Suit suit={card.suit} className="size-3.5" />
    </span>
  );
  return (
    <SmartLink
      href={card.href}
      transition={card.href.startsWith("/") ? "nav-forward" : undefined}
      onFocus={onFocus}
      onBlur={onBlur}
      className={cn(
        "focus-ring group/card relative flex flex-col overflow-hidden rounded-card border border-suit-ink/10 p-4 text-suit-ink shadow-raised",
        suitBg[card.suit],
        className,
      )}
    >
      <span aria-hidden className="pointer-events-none absolute inset-2 rounded-inset border border-suit-ink/15" />
      <span aria-hidden className="relative flex items-start justify-between">
        {corner}
        <Icon
          name="arrow-up-right"
          className="size-4 opacity-0 transition-all duration-(--t-hover-mid) ease-slow group-hover/card:opacity-100 group-focus-visible/card:opacity-100"
        />
      </span>
      <Suit
        suit={card.suit}
        className="absolute top-1/2 left-1/2 size-[42%] -translate-x-1/2 -translate-y-[62%] opacity-20 transition-transform duration-(--t-hover) ease-slow group-hover/card:scale-110 group-hover/card:rotate-12"
      />
      <span className="relative mt-auto block lg:pr-6">
        <span className="type-h2 block text-suit-ink!">{card.title}</span>
        <span className="type-small mt-1 block text-suit-ink/75!">{card.text}</span>
      </span>
      <span aria-hidden className="absolute right-4 bottom-4 hidden rotate-180 lg:block">
        {corner}
      </span>
    </SmartLink>
  );
}

/**
 * Section cards held like a hand: fanned on wide screens, the hovered or focused card lifts and straightens
 * while its neighbours make room. Narrow screens get a plain swipe row.
 */
export function CardHand({ cards }: { cards: HandCard[] }) {
  const [hot, setHot] = useState<number | null>(null);
  if (!cards.length) return null;
  const mid = (cards.length - 1) / 2;
  const spread = cards.length > 3 ? 7 : 9;

  return (
    <nav aria-label="Sections" className="container-page">
      <ul className="relative hidden h-[360px] items-start xl:h-[400px] justify-center pt-6 lg:flex" onPointerLeave={() => setHot(null)}>
        {cards.map((card, i) => {
          const d = i - mid;
          const lifted = hot === i;
          const shift = hot === null || lifted ? 0 : (i < hot ? -1 : 1) * 30;
          return (
            <Rise as="li" key={card.href} i={i + 2} className="-ml-9 first:ml-0" style={{ zIndex: lifted ? 30 : 10 + i }}>
              <m.div
                onPointerEnter={() => setHot(i)}
                initial={false}
                animate={{
                  rotate: lifted ? 0 : d * spread,
                  x: shift,
                  y: lifted ? -26 : Math.abs(d) ** 2 * 7,
                  scale: lifted ? 1.05 : 1,
                }}
                transition={motion.spring}
                style={{ transformOrigin: "50% 120%" }}
              >
                <Card
                  card={card}
                  onFocus={() => setHot(i)}
                  onBlur={() => setHot(null)}
                  className="aspect-[5/7] w-[172px] xl:w-[212px]"
                />
              </m.div>
            </Rise>
          );
        })}
      </ul>

      <ul className="-mx-(--gutter) flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-(--gutter) px-(--gutter) pb-4 [scrollbar-width:none] lg:hidden">
        {cards.map((card, i) => (
          <Rise as="li" key={card.href} i={i + 2} className="shrink-0 snap-start">
            <Card card={card} className="press aspect-[4/5] w-[58vw] max-w-[240px] sm:w-[220px]" />
          </Rise>
        ))}
      </ul>
    </nav>
  );
}
