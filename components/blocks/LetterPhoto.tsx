"use client";

import {
  AnimatePresence,
  animate,
  motion as m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type PanInfo,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "@theme/motion";
import { Suit } from "@/components/ui/Suit";
import { cn } from "@/lib/cn";

type Photo = { src: string; alt: string };

const REST = -3;
const SWIPE = 90;
const FLING = 500;
const TILT = 10;
const burst = [-50, -25, 0, 25, 50];

/**
 * The letter's photo as a card to like: tilt on hover and a heart button where there is a mouse, swipe right on
 * touch. A like flies the card off, opens the calendar in a new tab and deals the card back as a match.
 * Without a calendar it is a still photo.
 */
export function LetterPhoto({ photo, calendar }: { photo: Photo; calendar?: string }) {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { once: true, amount: 0.8 });
  const [liked, setLiked] = useState(false);
  const [pops, setPops] = useState(0);
  const flying = useRef(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, (v) => REST + v / 14);
  const stamp = useTransform(x, [16, SWIPE], [0, 1]);
  const fade = useTransform(x, [SWIPE * 2, 420], [1, 0]);
  const rotateX = useSpring(0, motion.spring);
  const rotateY = useSpring(0, motion.spring);

  useEffect(() => {
    if (!inView || reduce || !calendar) return;
    const nudge = animate(x, [0, 34, 0], { duration: 1.1, ease: motion.ease, delay: 0.6 });
    return () => nudge.stop();
  }, [inView, reduce, calendar, x]);

  if (!calendar) {
    return (
      <div className="core relative aspect-[5/7] w-28 -rotate-3 overflow-hidden rounded-inset md:w-full">
        <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 160px, 112px" className="media object-cover object-[50%_20%]" />
      </div>
    );
  }

  const like = async () => {
    if (flying.current) return;
    setPops((n) => n + 1);
    if (reduce) {
      setLiked(true);
      window.open(calendar, "_blank", "noopener");
      return;
    }
    flying.current = true;
    rotateX.set(0);
    rotateY.set(0);
    await animate(x, 520, { duration: 0.45, ease: [0.4, 0, 1, 1], delay: 0.25 });
    window.open(calendar, "_blank", "noopener");
    setLiked(true);
    x.jump(0);
    flying.current = false;
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE || info.velocity.x > FLING) like();
    else animate(x, 0, motion.spring);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || reduce || flying.current) return;
    const box = e.currentTarget.getBoundingClientRect();
    rotateX.set(-((e.clientY - box.top) / box.height - 0.5) * TILT);
    rotateY.set(((e.clientX - box.left) / box.width - 0.5) * TILT);
  };

  const onPointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div ref={root} className="flex items-center gap-5 md:flex-col md:items-stretch md:gap-4">
      <div className="group/frame relative w-28 shrink-0 perspective-[800px] md:w-full">
        <m.div
          key={liked ? "match" : "card"}
          initial={liked && !reduce ? { scale: 0.85, y: 12 } : false}
          animate={{ scale: 1, y: 0 }}
          transition={motion.sheet}
          drag={reduce ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={{ left: 0.1, right: 0.9 }}
          onDragEnd={onDragEnd}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          whileHover={reduce ? undefined : { scale: 1.04 }}
          style={{ x, rotate, rotateX, rotateY, opacity: fade }}
          className="group/photo core relative aspect-[5/7] cursor-grab touch-pan-y overflow-hidden rounded-inset transition-shadow duration-(--t-hover) ease-slow select-none hover:surface-deep active:cursor-grabbing"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            draggable={false}
            sizes="(min-width: 768px) 160px, 112px"
            className="media pointer-events-none object-cover object-[50%_20%] transition-transform duration-(--t-hover) ease-slow group-hover/photo:scale-[1.06]"
          />
          <m.span
            aria-hidden
            style={{ opacity: stamp }}
            className="type-label absolute top-3 left-2.5 -rotate-12 rounded-pill bg-accent px-2.5 py-1 text-accent-ink"
          >
            Let&apos;s talk
          </m.span>
          {liked && (
            <span
              aria-hidden
              className="surface-strong absolute top-2 right-2 grid size-7 place-items-center rounded-pill"
            >
              <Suit suit="heart" className="size-3.5 text-card-red" />
            </span>
          )}
        </m.div>

        <div className="absolute -bottom-4 left-1/2 z-10 -translate-x-1/2">
          <button
            type="button"
            onClick={like}
            aria-label="Like the photo and book a call"
            className={cn(
              "focus-ring press surface-strong grid size-11 cursor-pointer place-items-center rounded-pill transition-[opacity,scale] duration-(--t-hover-short) ease-slow hover:scale-110",
              "[@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/frame:opacity-100 [@media(hover:hover)]:focus-visible:opacity-100",
            )}
          >
            <Suit suit="heart" className="size-5 text-card-red" />
          </button>
          <AnimatePresence>
            {pops > 0 &&
              !reduce &&
              burst.map((dx, i) => (
                <m.span
                  key={`${pops}-${i}`}
                  aria-hidden
                  initial={{ opacity: 1, x: 0, y: 0, scale: 0.6 }}
                  animate={{ opacity: 0, x: dx, y: -70 - (i % 2) * 24, scale: 1.1 }}
                  transition={{ duration: 0.8, ease: motion.ease }}
                  className="pointer-events-none absolute top-3 left-3.5"
                >
                  <Suit suit="heart" className="size-4 text-card-red" />
                </m.span>
              ))}
          </AnimatePresence>
        </div>
      </div>

      <p aria-live="polite" className="type-caption text-ink-3 md:mt-4 md:text-center">
        {liked ? (
          "It's a match! Pick a time in the new tab."
        ) : (
          <>
            <span className="[@media(hover:hover)]:hidden">Swipe right to book a call</span>
            <span className="hidden [@media(hover:hover)]:inline">Like me? Book a call!</span>
          </>
        )}
      </p>
    </div>
  );
}
