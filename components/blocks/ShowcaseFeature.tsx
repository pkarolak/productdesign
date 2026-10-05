"use client";

import { motion as m, useReducedMotion } from "motion/react";
import { Video } from "@/components/media/Video";
import { Rise } from "@/components/motion/Rise";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Icon } from "@/components/ui/Icon";
import { tints } from "@/components/ui/IconTile";
import type { ShowcaseItem } from "@/content/schema";
import { cn } from "@/lib/cn";
import { motion } from "@theme/motion";

const chipSpots = ["left-0 top-[14%] md:left-[4%]", "right-0 top-[42%] md:right-[6%]", "bottom-[12%] left-[2%] md:left-[10%]"];
const chipTints = [tints[4], tints[1], tints[2]];

/** The phone deals in tilted and settles, its loop plays in view, and the item's tags drift beside it. */
function PhoneStage({ item, className }: { item: ShowcaseItem; className?: string }) {
  const reduced = useReducedMotion();
  const loop = item.loop!;
  return (
    <div className={cn("relative flex justify-center py-6 md:py-10", className)}>
      <m.div
        initial={reduced ? false : { y: 56, rotate: 9, opacity: 0 }}
        whileInView={{ y: 0, rotate: -3, opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={motion.deal}
        className="relative aspect-[9/19.5] w-[min(56%,16.5rem)] overflow-hidden rounded-phone shadow-raised ring-1 ring-hairline"
      >
        <Video src={loop.src} poster={loop.poster} alt={loop.alt} />
      </m.div>
      {item.tags?.map((t, i) => (
        <m.span
          key={t.label}
          aria-hidden
          initial={reduced ? false : { opacity: 0, scale: 0.8, y: 14 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ ...motion.spring, delay: reduced ? 0 : 0.45 + i * 0.14 }}
          className={cn("absolute", chipSpots[i])}
        >
          <m.span
            animate={reduced ? undefined : { y: [0, -7, 0], rotate: [0, i % 2 ? 1.5 : -1.5, 0] }}
            transition={{ duration: 4.2 + i * 0.9, ease: "easeInOut", repeat: Infinity, delay: i * 0.6 }}
            className="card type-small inline-flex items-center gap-2 rounded-pill py-1.5 pr-3.5 pl-1.5 text-ink"
          >
            <span data-tint={chipTints[i]} className="icon-tint grid size-7 place-items-center rounded-pill">
              <Icon name={t.icon} className="size-4" />
            </span>
            {t.label}
          </m.span>
        </m.span>
      ))}
    </div>
  );
}

/** A full-width side gig: the story beside its recording in a phone, on a violet wash. */
export function ShowcaseFeature({ item, i }: { item: ShowcaseItem; i: number }) {
  return (
    <Rise as="li" i={i} className="sm:col-span-2 lg:col-span-3">
      <article aria-labelledby={`feature-${item.id}-title`} className="card relative overflow-hidden rounded-card">
        <span aria-hidden data-tint="violet" className="card-tint" />
        <div className="relative grid items-center gap-2 p-6 md:grid-cols-12 md:gap-8 md:px-10 md:py-6 lg:px-14">
          <div className="md:col-span-6 lg:col-span-5">
            <p className="type-label">{item.kicker}</p>
            <h3 id={`feature-${item.id}-title`} className="type-h2 mt-2 text-ink">
              {item.title}
            </h3>
            <p className="type-body mt-4 max-w-[44ch] text-ink-2">{item.detail}</p>
            {item.link && (
              <div className="mt-7">
                <ArrowLink href={item.link.href}>{item.link.label}</ArrowLink>
              </div>
            )}
          </div>
          <PhoneStage item={item} className="md:col-span-6 lg:col-span-7" />
        </div>
      </article>
    </Rise>
  );
}
