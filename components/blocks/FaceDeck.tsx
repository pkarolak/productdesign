"use client";

import Image from "next/image";
import { motion as m, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Suit as SuitName } from "@/content/schema";
import { cn } from "@/lib/cn";
import { motion } from "@theme/motion";
import { suitTint } from "@/components/ui/Suit";
import { Corner, DECK_ORIGIN } from "./CardHand";
import { setDaytime, useDaytime, type Daytime } from "./daytime";

export type Face = { time: Daytime; when: string; src: string; cutout?: string; alt: string };

/** Each time of day is its own card in the deck, in its suit's wash. */
const suits: Record<Daytime, SuitName> = { sun: "diamond", sunset: "heart", moon: "spade" };

/**
 * A face card: a P with the photo between corner marks. A cut-out stands on the bottom edge and fills the card; a
 * plain photo is framed on the paper. `tinted` in a deck of several.
 */
function FaceCard({ face, preload, tinted }: { face: Face; preload?: boolean; tinted?: boolean }) {
  const suit = tinted ? suits[face.time] : "heart";
  return (
    <div className="playing-card absolute inset-0 overflow-hidden rounded-inset">
      {(tinted || face.cutout) && <span aria-hidden data-tint={suitTint[suit]} className="card-tint" />}
      {face.cutout ? (
        <div className="absolute inset-x-0 top-[9%] bottom-0">
          <Image
            src={face.cutout}
            alt={face.alt}
            fill
            preload={preload}
            sizes="200px"
            className="object-contain object-bottom sepia-[0.14]"
          />
        </div>
      ) : (
        <div className="absolute inset-x-[15%] inset-y-[10%] overflow-hidden rounded-print border border-card-ink/15">
          <Image
            src={face.src}
            alt={face.alt}
            fill
            preload={preload}
            sizes="160px"
            className="object-cover object-[50%_30%] sepia-[0.14]"
          />
        </div>
      )}
      <Corner suit={suit} rank="P" />
      <Corner suit={suit} rank="P" flip />
    </div>
  );
}

/** Where a card rests by its depth in the deck: the top card square, the ones below peeking out up and right. */
const rest = (depth: number, count: number) => ({ x: depth * 7, y: -depth * 5, rotate: depth * 3.5, zIndex: count - depth });

/**
 * The designer as a small deck of face cards, one photo per time of day. When the intro's time changes, the top
 * card is cut off to the left and tucked under the others, and the next photo comes up. Clicking the deck shuffles
 * to the next time. The hand below stacks under it and is dealt from it.
 */
export function FaceDeck({ faces }: { faces: Face[] }) {
  const still = useReducedMotion();
  const { time } = useDaytime();
  const top = Math.max(0, faces.findIndex((f) => f.time === time));
  const [shown, setShown] = useState(top);
  const [leaving, setLeaving] = useState<number | null>(null);
  if (shown !== top) {
    setLeaving(shown);
    setShown(top);
  }
  const count = faces.length;
  const frame =
    "aspect-[5/7] w-[172px] transition-transform duration-(--t-hover) ease-slow hover:-translate-y-1 hover:-rotate-2 xl:w-[200px]";

  if (count < 2) {
    return (
      <div id={DECK_ORIGIN} className={cn("relative", frame)}>
        {faces[0] && <FaceCard face={faces[0]} preload />}
      </div>
    );
  }

  const next = faces[(top + 1) % count];
  return (
    <button
      id={DECK_ORIGIN}
      type="button"
      aria-label={`Shuffle to ${next.when.toLowerCase()}`}
      onClick={() => setDaytime(next.time, true)}
      className={cn("focus-ring relative block cursor-pointer rounded-inset", frame)}
    >
      {faces.map((face, i) => {
        const depth = (i - top + count) % count;
        const to = rest(depth, count);
        const cut = i === leaving && !still;
        return (
          <m.div
            key={face.time}
            aria-hidden={depth !== 0}
            className="absolute inset-0"
            initial={false}
            animate={
              cut
                ? {
                    x: [0, -150, to.x],
                    y: [0, -28, to.y],
                    rotate: [0, -14, to.rotate],
                    zIndex: [count + 1, count + 1, to.zIndex],
                  }
                : to
            }
            transition={
              still
                ? { duration: 0 }
                : cut
                  ? { duration: 0.75, times: [0, 0.45, 1], ease: motion.ease, zIndex: { duration: 0.75, times: [0, 0.55, 1] } }
                  : { ...motion.spring, zIndex: { duration: 0 } }
            }
          >
            <FaceCard face={face} preload={i === 0} tinted />
          </m.div>
        );
      })}
    </button>
  );
}
