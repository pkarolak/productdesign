"use client";

import { motion as m } from "motion/react";
import { useState } from "react";
import { Picture } from "@/components/media/Picture";
import { Rise } from "@/components/motion/Rise";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import type { Showcase as ShowcaseData, ShowcaseItem } from "@/content/schema";
import { motion } from "@theme/motion";
import { BlockHeader } from "./BlockHeader";

function Detail({ item, open, onClose }: { item: ShowcaseItem; open: boolean; onClose: () => void }) {
  const titleId = `showcase-${item.id}-title`;
  return (
    <Modal open={open} onClose={onClose} labelledBy={titleId} layoutId={`showcase-${item.id}`}>
      <div className="core relative aspect-[16/10] overflow-hidden">
        <Picture src={item.image.src} srcDark={item.image.srcDark} alt={item.image.alt} sizes="560px" className="object-cover" />
      </div>
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
export function Showcase({ showcase }: { showcase?: ShowcaseData }) {
  const [open, setOpen] = useState(false);
  const [shownId, setShownId] = useState<string | null>(null);
  if (!showcase?.items.length) return null;
  const shown = showcase.items.find((i) => i.id === shownId);

  return (
    <section id="showcase" aria-labelledby="showcase-title" className="container-page section-y">
      <BlockHeader id="showcase-title" title={showcase.title} note={showcase.note} />
      <ul className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {showcase.items.map((item, i) => (
          <Rise as="li" key={item.id} i={i}>
            <m.div
              layoutId={`showcase-${item.id}`}
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
                <span className="core relative block aspect-[16/10] overflow-hidden">
                  <Picture
                    src={item.image.src}
                    srcDark={item.image.srcDark}
                    alt=""
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-(--t-hover) ease-slow group-hover/sc:scale-[1.03]"
                  />
                </span>
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
      {shown && <Detail key={shown.id} item={shown} open={open} onClose={() => setOpen(false)} />}
    </section>
  );
}
