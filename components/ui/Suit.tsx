import type { Suit as SuitName } from "@/content/schema";
import { cn } from "@/lib/cn";

const paths: Record<SuitName, string> = {
  heart:
    "M12 21C5.5 15.6 2 12 2 8.2 2 5.3 4.3 3 7.1 3c1.9 0 3.7 1 4.9 2.7C13.2 4 15 3 16.9 3 19.7 3 22 5.3 22 8.2 22 12 18.5 15.6 12 21Z",
  spade:
    "M12 2c-3.8 4.6-9 7.8-9 12 0 2.7 2.1 4.5 4.6 4.5 1.5 0 2.8-.6 3.6-1.7L10 22h4l-1.2-5.2c.8 1.1 2.1 1.7 3.6 1.7 2.5 0 4.6-1.8 4.6-4.5 0-4.2-5.2-7.4-9-12Z",
  diamond: "M12 2 20.5 12 12 22 3.5 12Z",
  club: "M12 2.5a4.3 4.3 0 0 0-3.9 6.1A4.3 4.3 0 1 0 10.7 16L10 22h4l-.7-6a4.3 4.3 0 1 0 2.6-7.4A4.3 4.3 0 0 0 12 2.5Z",
  star: "m12 2 2.9 6.6 7.1.7-5.4 4.8 1.6 7L12 17.4l-6.2 3.7 1.6-7L2 9.3l7.1-.7Z",
};

/** Suit fill colours; the palette itself lives in the theme (--suit-1 to --suit-5). */
export const suitBg: Record<SuitName, string> = {
  heart: "bg-suit-1",
  spade: "bg-suit-2",
  diamond: "bg-suit-3",
  club: "bg-suit-4",
  star: "bg-suit-5",
};

export const suitText: Record<SuitName, string> = {
  heart: "text-suit-1",
  spade: "text-suit-2",
  diamond: "text-suit-3",
  club: "text-suit-4",
  star: "text-suit-5",
};

export function Suit({ suit, className }: { suit: SuitName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-4 fill-current", className)}>
      <path d={paths[suit]} />
    </svg>
  );
}
