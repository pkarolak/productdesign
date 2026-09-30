import type { ReactNode } from "react";
import { Rise } from "@/components/motion/Rise";
import { Emphasis } from "@/components/ui/Emphasis";
import { cn } from "@/lib/cn";

/** The heading row every block shares: optional label, the h2, an optional note. */
export function BlockHeader({
  id,
  label,
  title,
  note,
  className,
}: {
  id: string;
  label?: string;
  title: string;
  note?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 max-w-[62ch] md:mb-10", className)}>
      {label && (
        <Rise as="p" className="type-label mb-3">
          {label}
        </Rise>
      )}
      <Rise as="h2" id={id} i={1} className="type-h2 text-ink">
        <Emphasis text={title} />
      </Rise>
      {note && (
        <Rise as="p" i={2} className="type-lede mt-3">
          {note}
        </Rise>
      )}
    </div>
  );
}
