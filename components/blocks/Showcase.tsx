"use client";

import { motion as m } from "motion/react";
import { useState } from "react";
import { Picture } from "@/components/media/Picture";
import { Rise } from "@/components/motion/Rise";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import { JokerEmblem, Suit, suitInk } from "@/components/ui/Suit";
import { suits, type Showcase as ShowcaseData, type ShowcaseItem, type Suit as SuitName } from "@/content/schema";
import { cn } from "@/lib/cn";
import { motion } from "@theme/motion";
import { BlockHeader } from "./BlockHeader";

/** The item's image, or a suit-coloured panel when it has none. */
function Cover({
  item,
  suit,
  sizes,
  alt,
  className,
}: {
  item: ShowcaseItem;
  suit: SuitName;
  sizes: string;
  alt: string;
  className?: string;
}) {
  if (item.image)
    return (
      <span className={cn("core relative block overflow-hidden", className)}>
        <Picture
          src={item.image.src}
          srcDark={item.image.srcDark}
          alt={alt}
          sizes={sizes}
          className="object-cover transition-transform duration-(--t-hover) ease-slow group-hover/sc:scale-[1.03]"
        />
      </span>
    );
  const pip = "transition-transform duration-(--t-hover) ease-slow group-hover/sc:scale-110 group-hover/sc:rotate-12";
  return (
    <span className={cn("playing-card relative grid place-items-center overflow-hidden", suitInk[suit], className)}>
      {suit === "joker" ? (
        <JokerEmblem className={cn("size-[34%]", pip)} />
      ) : (
        <Suit suit={suit} className={cn("size-[30%]", pip)} />
      )}
    </span>
  );
}

function Detail({
  item,
  scope,
  suit,
  open,
  onClose,
}: {
  item: ShowcaseItem;
  scope: string;
  suit: SuitName;
  open: boolean;
  onClose: () => void;
}) {
  const titleId = `${scope}-${item.id}-title`;
  return (
    <Modal open={open} onClose={onClose} labelledBy={titleId} layoutId={`${scope}-${item.id}`}>
      <Cover
        item={item}
        suit={suit}
        sizes="560px"
        alt={item.image?.alt ?? ""}
        className={item.image ? "aspect-[16/10]" : "aspect-[16/6]"}
      />
      <div className="p-6 md:p-7">
        <p className="type-label">{item.kicker}</p>
        <h3 id={titleId} className="type-h3 mt-2 text-ink">
          {item.title}
        </h3>
        <p className="type-body mt-3 text-ink-2">{item.detail}</p>
        <div className="mt-6 flex items-center justify-between gap-4">
          {item.link ? <ArrowLink href={item.link.href}>{item.link.label}</ArrowLink> : <span />}
          <button
            type="button"
            onClick={onClose}
            className="focus-ring press type-small cursor-pointer rounded-pill border border-hairline px-4 py-2 text-ink"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

/** Small cards that expand into a sheet. Renders nothing while there are no items. */
export function Showcase({
  showcase,
  id = "showcase",
  suit,
}: {
  showcase?: ShowcaseData;
  id?: string;
  /** Heading suit; cards without an image cycle through all suits starting here. */
  suit?: SuitName;
}) {
  const [open, setOpen] = useState(false);
  const [shownId, setShownId] = useState<string | null>(null);
  if (!showcase?.items.length) return null;
  const start = suit ? suits.indexOf(suit) : 0;
  const suitOf = (i: number) => suits[(start + i) % suits.length];
  const shownIndex = showcase.items.findIndex((i) => i.id === shownId);
  const shown = showcase.items[shownIndex];

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="container-page section-y scroll-mt-(--nav-clear)">
      <BlockHeader id={`${id}-title`} title={showcase.title} note={showcase.note} suit={suit} />
      <ul className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {showcase.items.map((item, i) => (
          <Rise as="li" key={item.id} i={i}>
            <m.div
              layoutId={`${id}-${item.id}`}
              transition={motion.sheet}
              style={{ borderRadius: "var(--r-card)" }}
              className="card h-full overflow-hidden hover:surface-deep"
            >
              <button
                type="button"
                onClick={() => {
                  setShownId(item.id);
                  setOpen(true);
                }}
                aria-haspopup="dialog"
                className="focus-ring press group/sc flex h-full w-full cursor-pointer flex-col text-left"
              >
                <Cover
                  item={item}
                  suit={suitOf(i)}
                  alt=""
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[16/10]"
                />
                <span className="flex flex-1 flex-col p-5">
                  <span className="type-label">{item.kicker}</span>
                  <span className="type-h3 mt-1.5 text-ink">{item.title}</span>
                  <span className="type-small mt-1.5">{item.text}</span>
                  <span className="type-small mt-auto flex items-center gap-1.5 pt-5 text-ink">
                    Open
                    <Icon name="arrow-up-right" className="size-4" />
                  </span>
                </span>
              </button>
            </m.div>
          </Rise>
        ))}
      </ul>
      {shown && <Detail key={shown.id} item={shown} scope={id} suit={suitOf(shownIndex)} open={open} onClose={() => setOpen(false)} />}
    </section>
  );
}
