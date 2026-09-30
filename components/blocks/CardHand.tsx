"use client";

import { motion as m, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { Picture } from "@/components/media/Picture";
import { Rise } from "@/components/motion/Rise";
import { SmartLink } from "@/components/ui/SmartLink";
import { FiletePip, JokerEmblem, Suit, suitInk } from "@/components/ui/Suit";
import type { Deck, HandCard, Suit as SuitName } from "@/content/schema";
import { cn } from "@/lib/cn";
import { motion } from "@theme/motion";

function Corner({ suit, flip = false, framed }: { suit: SuitName; flip?: boolean; framed: boolean }) {
  const joker = suit === "joker";
  const place = framed
    ? flip
      ? "right-[7%] bottom-[15%] rotate-180"
      : "top-[15%] left-[7%]"
    : flip
      ? "right-2.5 bottom-2.5 rotate-180"
      : "top-2.5 left-2.5";
  return (
    <span
      aria-hidden
      className={cn(
        "absolute z-10 flex flex-col items-center leading-none",
        place,
        joker ? (flip ? "text-card-red" : "text-card-ink") : suitInk[suit],
      )}
    >
      {joker ? (
        "JOKER".split("").map((l, i) => (
          <span key={i} className="font-display text-[0.6875rem] leading-[1.1] font-semibold">
            {l}
          </span>
        ))
      ) : (
        <>
          <span className="font-display text-[1.375rem] font-semibold tracking-[-0.04em]">A</span>
          {framed ? <FiletePip suit={suit} className="mt-1 size-3.5" /> : <Suit suit={suit} className="mt-1 size-3.5" />}
        </>
      )}
    </span>
  );
}

function Art({ art }: { art: Deck["face"] }) {
  return <Picture src={art.src} srcDark={art.srcDark} alt="" sizes="(min-width: 1280px) 212px, 220px" dim={false} className="object-fill" />;
}

function Card({
  card,
  deck,
  className,
  onFocus,
  onBlur,
}: {
  card: HandCard;
  deck?: Deck;
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}) {
  const pip = "shrink-0 transition-transform duration-(--t-hover) ease-slow group-hover/card:scale-110 group-focus-visible/card:scale-110";
  const joker = card.suit === "joker";
  const framed = Boolean(deck);
  return (
    <SmartLink
      href={card.href}
      transition={card.href.startsWith("/") ? "nav-forward" : undefined}
      onFocus={onFocus}
      onBlur={onBlur}
      className={cn(
        "focus-ring group/card playing-card relative flex flex-col items-center overflow-hidden rounded-inset text-center backface-hidden",
        framed && joker ? "justify-between" : "justify-center",
        framed ? "px-[13%] py-[16%]" : "px-8 py-14",
        framed && joker && "px-[16%] pt-[8%] pb-[6%]",
        className,
      )}
    >
      {deck && <Art art={joker ? deck.joker : deck.face} />}
      <Corner suit={card.suit} framed={framed} />
      {framed && joker ? (
        <>
          <span className="type-h3 filete-letter relative block font-semibold">{card.title}</span>
          <span className="type-caption relative block text-[0.75rem]! leading-[1.3]! text-balance! text-card-ink/75!">
            {card.text}
          </span>
        </>
      ) : framed ? (
        <>
          <FiletePip suit={card.suit} className={cn("relative", card.suit === "spade" ? "size-16 xl:size-20" : "size-12 xl:size-14", pip)} />
          <span className="type-h3 filete-letter relative mt-4 block font-semibold">{card.title}</span>
          <span className="type-caption relative mt-1 block text-balance! text-card-ink/75!">{card.text}</span>
        </>
      ) : (
        <>
          {joker ? (
            <JokerEmblem className={cn("relative size-16 xl:size-20", pip)} />
          ) : (
            <Suit
              suit={card.suit}
              className={cn(
                "relative",
                suitInk[card.suit],
                card.suit === "spade" ? "size-16 xl:size-20" : "size-12 xl:size-14",
                pip,
              )}
            />
          )}
          <span className="type-h3 relative mt-4 block font-semibold text-card-ink!">{card.title}</span>
          <span className="type-caption relative mt-1 block text-balance! text-card-ink/75!">{card.text}</span>
        </>
      )}
      <Corner suit={card.suit} framed={framed} flip />
    </SmartLink>
  );
}

function CardBack({ art }: { art: Deck["back"] }) {
  return (
    <span
      aria-hidden
      className="playing-card pointer-events-none absolute inset-0 overflow-hidden rounded-inset backface-hidden rotate-y-180"
    >
      <Art art={art} />
    </span>
  );
}

/** Turns a card face down while `down`, flipping it over when dealt. */
function Flip({ down, delay, back, children }: { down: boolean; delay: number; back?: Deck["back"]; children: ReactNode }) {
  if (!back) return children;
  return (
    <m.div
      className="relative transform-3d"
      initial={false}
      animate={{ rotateY: down ? 180 : 0 }}
      transition={down ? { duration: 0 } : { duration: 0.7, delay, ease: motion.ease }}
    >
      {children}
      <CardBack art={back} />
    </m.div>
  );
}

function DoodleArrow({ play, after = 0, className }: { play: boolean; after?: number; className?: string }) {
  const draw = (delay: number) => ({
    initial: { pathLength: 0 },
    animate: { pathLength: play ? 1 : 0 },
    transition: { duration: 0.9, delay: play ? after + delay : 0, ease: motion.ease },
  });
  return (
    <svg
      viewBox="0 0 96 84"
      aria-hidden
      className={cn("fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.4]", className)}
    >
      <m.path d="M92 72C70 80 48 74 40 58 33 44 40 30 52 32c12 2 8 20-6 19C30 50 18 36 13 10" {...draw(0.2)} />
      <m.path d="M5 20 13 9l9 9" {...draw(1)} />
    </svg>
  );
}

type Phase = "stacked" | "dealing" | "settled";

/** A loose pile: each card a hair off square, like a deck set down by hand. */
const pile = (i: number) => ({ rotate: ((i * 5) % 7) - 3, y: -i * 1.5 });

/**
 * Holds a list of cards in a stack until it scrolls into view, then deals it out. `anchor` is where the
 * stack sits: the middle of the list (a fan) or the first card (a row).
 */
function useDeal(list: RefObject<HTMLUListElement | null>, count: number, anchor: "middle" | "first") {
  const still = useReducedMotion();
  const inView = useInView(list, { once: true, amount: 0.4 });
  const [offsets, setOffsets] = useState<number[] | null>(null);
  const [phase, setPhase] = useState<Phase>("stacked");
  const measured = offsets !== null;

  useEffect(() => {
    const ul = list.current;
    if (!ul) return;
    const ro = new ResizeObserver(() => {
      const items = [...ul.children] as HTMLElement[];
      const centre = (el: HTMLElement) => el.offsetLeft + el.offsetWidth / 2;
      const origin = anchor === "middle" ? ul.clientWidth / 2 : items[0] ? centre(items[0]) : 0;
      setOffsets(items.map((el) => centre(el) - origin));
    });
    ro.observe(ul);
    return () => ro.disconnect();
  }, [list, anchor, count]);

  useEffect(() => {
    if (!inView || !measured || still) return;
    const { hold, stagger } = motion.deal;
    const deal = setTimeout(() => setPhase("dealing"), hold * 1000);
    const settle = setTimeout(() => setPhase("settled"), (hold + stagger * count + 0.9) * 1000);
    return () => {
      clearTimeout(deal);
      clearTimeout(settle);
    };
  }, [inView, measured, still, count]);

  return { phase: still ? ("settled" as Phase) : phase, offsets: offsets ?? [] };
}

/**
 * Section cards held like a hand: fanned on wide screens, the hovered or focused card lifts and straightens
 * while its neighbours make room. Narrow screens get a plain swipe row.
 */
export function CardHand({ cards, note, deck }: { cards: HandCard[]; note?: string; deck?: Deck }) {
  const [hot, setHot] = useState<number | null>(null);
  const fanList = useRef<HTMLUListElement>(null);
  const rowList = useRef<HTMLUListElement>(null);
  const fan = useDeal(fanList, cards.length, "middle");
  const row = useDeal(rowList, cards.length, "first");
  if (!cards.length) return null;
  const mid = (cards.length - 1) / 2;
  const spread = cards.length > 3 ? 7 : 9;
  const dealt = fan.phase !== "stacked" || row.phase !== "stacked";
  const dealTime = motion.deal.stagger * cards.length + 0.5;
  const dealing = (phase: Phase, i: number) =>
    phase === "stacked"
      ? { duration: 0 }
      : phase === "dealing"
        ? { ...motion.deal, delay: i * motion.deal.stagger }
        : motion.spring;

  return (
    <nav aria-label="Sections" className="container-page">
      <ul
        ref={fanList}
        className="relative hidden h-[360px] items-start justify-center pt-6 lg:flex xl:h-[400px]"
        onPointerLeave={() => setHot(null)}
      >
        {cards.map((card, i) => {
          const d = i - mid;
          const settled = fan.phase === "settled";
          const lifted = settled && hot === i;
          const shift = !settled || hot === null || lifted ? 0 : (i < hot ? -1 : 1) * 30;
          const stacked = fan.phase === "stacked";
          return (
            <Rise as="li" key={card.href} i={2} className="-ml-9 first:ml-0" style={{ zIndex: lifted ? 30 : 10 + i }}>
              <m.div
                onPointerEnter={() => setHot(i)}
                initial={false}
                animate={
                  stacked
                    ? { ...pile(i), x: -(fan.offsets[i] ?? 0), scale: 1 }
                    : {
                        rotate: lifted ? 0 : d * spread,
                        x: shift,
                        y: lifted ? -26 : Math.abs(d) ** 2 * 7,
                        scale: lifted ? 1.05 : 1,
                      }
                }
                transition={dealing(fan.phase, i)}
                className="perspective-[1400px]"
                style={{ transformOrigin: "50% 120%" }}
              >
                <Flip down={stacked} delay={i * motion.deal.stagger + 0.1} back={deck?.back}>
                  <Card
                    card={card}
                    deck={deck}
                    onFocus={() => setHot(i)}
                    onBlur={() => setHot(null)}
                    className="aspect-[5/7] w-[172px] xl:w-[212px]"
                  />
                </Flip>
              </m.div>
            </Rise>
          );
        })}
      </ul>

      <ul
        ref={rowList}
        className="relative -mx-(--gutter) flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-(--gutter) px-(--gutter) pt-2 pb-4 [scrollbar-width:none] lg:hidden"
      >
        {cards.map((card, i) => (
          <Rise as="li" key={card.href} i={2} className="shrink-0 snap-start">
            <m.div
              initial={false}
              animate={
                row.phase === "stacked"
                  ? { ...pile(i), x: -(row.offsets[i] ?? 0) }
                  : { rotate: 0, x: 0, y: 0 }
              }
              transition={dealing(row.phase, i)}
              className="perspective-[1400px]"
            >
              <Flip down={row.phase === "stacked"} delay={i * motion.deal.stagger + 0.1} back={deck?.back}>
                <Card card={card} deck={deck} className="press aspect-[5/7] w-[52vw] max-w-[220px] sm:w-[200px]" />
              </Flip>
            </m.div>
          </Rise>
        ))}
      </ul>

      {note && (
        <m.div
          initial={false}
          animate={{ opacity: dealt ? 1 : 0, y: dealt ? 0 : 8 }}
          transition={{ duration: 0.6, delay: dealt ? dealTime : 0, ease: motion.ease }}
          className="mx-auto mt-1 flex w-max max-w-full items-end gap-1 pl-2 lg:-mt-14 lg:translate-x-24"
        >
          <DoodleArrow play={dealt} after={dealTime} className="-mb-1 h-14 w-16 shrink-0 text-accent lg:h-22 lg:w-24" />
          <p className="type-hand -rotate-3 pb-1 lg:pb-2 lg:text-[2rem]">{note}</p>
        </m.div>
      )}
    </nav>
  );
}
