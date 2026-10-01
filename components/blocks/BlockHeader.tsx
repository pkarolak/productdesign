import type { ReactNode } from "react";
import { Rise } from "@/components/motion/Rise";
import { Emphasis } from "@/components/ui/Emphasis";
import { Filete } from "@/components/ui/Filete";
import type { Suit as SuitName } from "@/content/schema";
import { cn } from "@/lib/cn";
import { ChapterEmblem } from "./ChapterHeader";

/** The heading row every block shares: optional label, the h2, an optional note. A suit makes it a chapter. */
export function BlockHeader({
  id,
  label,
  title,
  note,
  suit,
  className,
}: {
  id: string;
  label?: string;
  title: string;
  note?: ReactNode;
  /** Ties the section to its card in the hand, shown as the chapter's emblem card. */
  suit?: SuitName;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 max-w-[62ch] md:mb-10", className)}>
      {label && (
        <Rise as="p" className="type-label mb-3">
          {label}
        </Rise>
      )}
      <Rise as="h2" id={id} i={1} className="type-h2 flex items-center gap-4 text-ink">
        {suit && <ChapterEmblem suit={suit} />}
        <span>
          <Emphasis text={title} />
        </span>
      </Rise>
      <Rise i={1}>
        <Filete className="mt-3" />
      </Rise>
      {note && (
        <Rise as="p" i={2} className="type-lede mt-3">
          {note}
        </Rise>
      )}
    </div>
  );
}
