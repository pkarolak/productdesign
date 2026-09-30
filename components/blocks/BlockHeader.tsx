import type { ReactNode } from "react";
import { Rise } from "@/components/motion/Rise";
import { Emphasis } from "@/components/ui/Emphasis";
import { Suit, suitText } from "@/components/ui/Suit";
import type { Suit as SuitName } from "@/content/schema";
import { cn } from "@/lib/cn";

/** The heading row every block shares: optional label, the h2, an optional note. */
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
  /** Ties the section to its card in the hand. */
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
      <Rise as="h2" id={id} i={1} className="type-h2 flex items-center gap-3 text-ink">
        {suit && <Suit suit={suit} className={cn("size-[0.8em] shrink-0", suitText[suit])} />}
        <span>
          <Emphasis text={title} />
        </span>
      </Rise>
      {note && (
        <Rise as="p" i={2} className="type-lede mt-3">
          {note}
        </Rise>
      )}
    </div>
  );
}
