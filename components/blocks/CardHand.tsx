"use client";

import { motion as m, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode, type RefObject } from "react";
import { Picture } from "@/components/media/Picture";
import { Rise } from "@/components/motion/Rise";
import { CardZoom, type CardRect } from "./CardZoom";
import { SmartLink } from "@/components/ui/SmartLink";
import { JokerEmblem, Suit, suitInk } from "@/components/ui/Suit";
import type { Deck, HandCard, HandTarget, Suit as SuitName } from "@/content/schema";
import { cn } from "@/lib/cn";
import { motion } from "@theme/motion";

export type Tint = "amber" | "rose" | "blue" | "green" | "violet";

/** Each suit prints on its own wash of colour (`card-tint`). */
export const suitTint: Record<SuitName, Tint> = { heart: "rose", diamond: "amber", spade: "blue", club: "green", joker: "violet" };

export function Corner({ suit, rank = "A", flip = false }: { suit: SuitName; rank?: string; flip?: boolean }) {
  const joker = suit === "joker";
  return (
    <span
      aria-hidden
      className={cn(
        "absolute z-10 flex flex-col items-center leading-none",
        flip ? "right-2 bottom-2 rotate-180" : "top-2 left-2",
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
          <span className="font-display text-[1.375rem] font-semibold tracking-[-0.04em]">{rank}</span>
          <Suit suit={suit} className="mt-0.5 size-3.5" />
        </>
      )}
    </span>
  );
}

function Art({ art, sizes, className }: { art: Deck["back"]; sizes: string; className?: string }) {
  return <Picture src={art.src} srcDark={art.srcDark} alt="" sizes={sizes} dim={false} className={className} />;
}

function Card({
  card,
  deck,
  className,
  still,
  onPick,
  onFocus,
  onBlur,
}: {
  card: HandCard;
  deck?: Deck;
  className?: string;
  /** A picture of the card, not a link: the copy that flips over when the card is picked. */
  still?: boolean;
  onPick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}) {
  const pip = "shrink-0 transition-transform duration-(--t-hover) ease-slow group-hover/card:scale-110 group-focus-visible/card:scale-110";
  const classes = cn(
    "focus-ring group/card playing-card relative flex flex-col items-center justify-center overflow-hidden rounded-inset px-[13%] py-12 text-center backface-hidden",
    className,
  );
  const face = (
    <>
      <span aria-hidden data-tint={suitTint[card.suit]} className="card-tint" />
      <Corner suit={card.suit} />
      {card.suit !== "joker" ? (
        <Suit suit={card.suit} className={cn("relative size-13 xl:size-15", suitInk[card.suit], pip)} />
      ) : deck ? (
        <span className={cn("relative -my-2 block aspect-[3/2] w-[88%]", pip)}>
          <Art
            art={deck.joker}
            sizes="(min-width: 1280px) 180px, 160px"
            className="object-contain"
          />
        </span>
      ) : (
        <JokerEmblem className={cn("relative size-13 xl:size-15", pip)} />
      )}
      <span className="type-h3 relative mt-4 block font-semibold text-card-ink!">{card.title}</span>
      <span className="type-caption relative mt-1 block text-balance! text-card-ink/70!">{card.text}</span>
      <Corner suit={card.suit} flip />
    </>
  );
  if (still) return <div className={classes}>{face}</div>;
  return (
    <SmartLink
      href={card.href}
      transition={card.href.startsWith("/") ? "nav-forward" : undefined}
      onClick={onPick}
      onFocus={onFocus}
      onBlur={onBlur}
      className={classes}
    >
      {face}
    </SmartLink>
  );
}

function CardBack({ art }: { art: Deck["back"] }) {
  return (
    <span
      aria-hidden
      className="playing-card pointer-events-none absolute inset-0 overflow-hidden rounded-inset backface-hidden rotate-y-180"
    >
      <Art art={art} sizes="(min-width: 1280px) 212px, 220px" className="object-fill" />
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

/** Cards dealt in a row on narrow screens: overlapping and a little askew, as if laid out by hand. */
const tilts = [-3, 2, -1.5, 2.5, -2];
const tilt = (i: number) => tilts[i % tilts.length];

/** Where an element sits on the page, ignoring transforms, so a card mid-animation measures where it will rest. */
const pageBox = (el: HTMLElement) => {
  let x = el.offsetWidth / 2;
  let y = el.offsetHeight / 2;
  for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) {
    x += n.offsetLeft;
    y += n.offsetTop;
  }
  return { x, y };
};

/** The hero face card, when it is on screen: the fan's stack hides under it and is dealt from there. */
export const DECK_ORIGIN = "intro-card";

/**
 * Holds a list of cards in a stack until it scrolls into view, then deals it out. `anchor` is where the
 * stack sits: the middle of the list (a fan) or the first card (a row). A fan stacks under the hero face card
 * instead when there is one on screen.
 */
function useDeal(list: RefObject<HTMLUListElement | null>, count: number, anchor: "middle" | "first") {
  const still = useReducedMotion();
  const inView = useInView(list, { once: true, amount: 0.4 });
  const [offsets, setOffsets] = useState<{ x: number; y: number }[] | null>(null);
  const [phase, setPhase] = useState<Phase>("stacked");
  const measured = offsets !== null;

  useEffect(() => {
    const ul = list.current;
    if (!ul) return;
    const measure = () => {
      const items = [...ul.children] as HTMLElement[];
      const source = anchor === "middle" ? document.getElementById(DECK_ORIGIN) : null;
      if (source?.offsetParent) {
        const to = pageBox(source);
        setOffsets(items.map((el) => {
          const at = pageBox(el);
          return { x: to.x - at.x, y: to.y - at.y };
        }));
        return;
      }
      const centre = (el: HTMLElement) => el.offsetLeft + el.offsetWidth / 2;
      const origin = anchor === "middle" ? ul.clientWidth / 2 : items[0] ? centre(items[0]) : 0;
      setOffsets(items.map((el) => ({ x: origin - centre(el), y: 0 })));
    };
    const ro = new ResizeObserver(measure);
    ro.observe(ul);
    document.fonts?.ready.then(measure);
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
export function CardHand({
  cards,
  note,
  deck,
  panels = {},
}: {
  cards: HandCard[];
  note?: string;
  deck?: Deck;
  /** What each card opens into when picked; cards without a panel follow their link. */
  panels?: Partial<Record<HandTarget, ReactNode>>;
}) {
  const [hot, setHot] = useState<number | null>(null);
  const [picked, setPicked] = useState<{ index: number; from: CardRect } | null>(null);
  const [open, setOpen] = useState(false);
  const fanList = useRef<HTMLUListElement>(null);
  const rowList = useRef<HTMLUListElement>(null);
  const fan = useDeal(fanList, cards.length, "middle");
  const row = useDeal(rowList, cards.length, "first");
  if (!cards.length) return null;
  const mid = (cards.length - 1) / 2;
  const spread = cards.length > 3 ? 7 : 9;
  const dealt = fan.phase !== "stacked" || row.phase !== "stacked";
  const dealTime = motion.deal.stagger * cards.length + 0.5;
  const pick = (i: number, rotate: number, scale: number) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (!panels[cards[i].target] || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const width = el.offsetWidth * scale;
    const height = el.offsetHeight * scale;
    const from = { left: r.left + r.width / 2 - width / 2, top: r.top + r.height / 2 - height / 2, width, height, rotate };
    setHot(null);
    setPicked({ index: i, from });
    setOpen(true);
  };
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
        className="relative hidden h-[350px] items-start justify-center pt-2 lg:flex xl:h-[356px]"
        onPointerLeave={() => setHot(null)}
      >
        {cards.map((card, i) => {
          const d = i - mid;
          const settled = fan.phase === "settled";
          const lifted = settled && hot === i;
          const shift = !settled || hot === null || lifted ? 0 : (i < hot ? -1 : 1) * 30;
          const stacked = fan.phase === "stacked";
          return (
            <Rise
              as="li"
              key={card.href}
              i={2}
              className={cn("-ml-9 first:ml-0", picked?.index === i && "invisible")}
              style={{ zIndex: lifted ? 30 : 10 + i }}
            >
              <m.div
                onPointerEnter={() => setHot(i)}
                initial={false}
                animate={
                  stacked
                    ? { ...pile(i), x: fan.offsets[i]?.x ?? 0, y: (fan.offsets[i]?.y ?? 0) + pile(i).y, scale: 1 }
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
                    onPick={pick(i, lifted ? 0 : d * spread, lifted ? 1.05 : 1)}
                    onFocus={() => setHot(i)}
                    onBlur={() => setHot(null)}
                    className="aspect-[5/7] w-[172px] xl:w-[200px]"
                  />
                </Flip>
              </m.div>
            </Rise>
          );
        })}
      </ul>

      <ul
        ref={rowList}
        className="relative -mx-(--gutter) -mb-8 flex snap-x snap-mandatory overflow-x-auto scroll-px-(--gutter) px-(--gutter) pt-4 pb-12 [scrollbar-width:none] lg:hidden"
      >
        {cards.map((card, i) => (
          <Rise
            as="li"
            key={card.href}
            i={2}
            className={cn("-ml-5 shrink-0 snap-start first:ml-0", picked?.index === i && "invisible")}
            style={{ zIndex: 10 + i }}
          >
            <m.div
              initial={false}
              animate={
                row.phase === "stacked"
                  ? { ...pile(i), x: row.offsets[i]?.x ?? 0 }
                  : { rotate: tilt(i), x: 0, y: i % 2 ? 8 : 0 }
              }
              transition={dealing(row.phase, i)}
              className="perspective-[1400px]"
            >
              <Flip down={row.phase === "stacked"} delay={i * motion.deal.stagger + 0.1} back={deck?.back}>
                <Card
                  card={card}
                  deck={deck}
                  onPick={pick(i, tilt(i), 1)}
                  className="press aspect-[5/7] w-[44vw] max-w-[200px] sm:w-[180px]"
                />
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
          className="mx-auto mt-1 flex w-max max-w-full items-end gap-1 pl-2 lg:-mt-16 lg:translate-x-24"
        >
          <DoodleArrow play={dealt} after={dealTime} className="-mb-1 h-14 w-16 shrink-0 text-accent lg:h-22 lg:w-24" />
          <p className="type-hand -rotate-3 pb-1 lg:pb-2 lg:text-[2rem]">{note}</p>
        </m.div>
      )}

      {picked && (
        <CardZoom
          from={picked.from}
          open={open}
          title={cards[picked.index].title}
          marks={
            <>
              <Corner suit={cards[picked.index].suit} />
              <Corner suit={cards[picked.index].suit} flip />
            </>
          }
          front={<Card card={cards[picked.index]} deck={deck} still className="size-full" />}
          onClose={() => setOpen(false)}
          onClosed={() => setPicked(null)}
        >
          {panels[cards[picked.index].target]}
        </CardZoom>
      )}
    </nav>
  );
}
