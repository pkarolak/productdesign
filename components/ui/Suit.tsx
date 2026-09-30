import type { Suit as SuitName } from "@/content/schema";
import { cn } from "@/lib/cn";

const paths: Record<SuitName, string> = {
  heart:
    "M12 21C5.5 15.6 2 12 2 8.2 2 5.3 4.3 3 7.1 3c1.9 0 3.7 1 4.9 2.7C13.2 4 15 3 16.9 3 19.7 3 22 5.3 22 8.2 22 12 18.5 15.6 12 21Z",
  spade:
    "M12 2c-3.8 4.6-9 7.8-9 12 0 2.7 2.1 4.5 4.6 4.5 1.5 0 2.8-.6 3.6-1.7L10 22h4l-1.2-5.2c.8 1.1 2.1 1.7 3.6 1.7 2.5 0 4.6-1.8 4.6-4.5 0-4.2-5.2-7.4-9-12Z",
  diamond: "M12 2 20.5 12 12 22 3.5 12Z",
  club: "M12 2.5a4.3 4.3 0 0 0-3.9 6.1A4.3 4.3 0 1 0 10.7 16L10 22h4l-.7-6a4.3 4.3 0 1 0 2.6-7.4A4.3 4.3 0 0 0 12 2.5Z",
  joker:
    "M3.6 17.5C4.4 12.6 3.9 9 2.6 6.4 6.4 7.2 9.1 9.8 10.6 13.4 10.9 9.4 11.4 6.6 12 4.6c.6 2 1.1 4.8 1.4 8.8 1.5-3.6 4.2-6.2 8-7-1.3 2.6-1.8 6.2-1 11.1ZM3.4 18.6h17.2v2.6H3.4ZM1 5.2a1.6 1.6 0 1 0 3.2 0 1.6 1.6 0 1 0-3.2 0ZM10.4 3.2a1.6 1.6 0 1 0 3.2 0 1.6 1.6 0 1 0-3.2 0ZM19.8 5.2a1.6 1.6 0 1 0 3.2 0 1.6 1.6 0 1 0-3.2 0Z",
};

/** Pip ink on a card face: red hearts and diamonds, black spades and clubs, a red joker. */
export const suitInk: Record<SuitName, string> = {
  heart: "text-card-red",
  spade: "text-card-ink",
  diamond: "text-card-red",
  club: "text-card-ink",
  joker: "text-card-red",
};

/** The same split on the page itself, where black pips take the ink colour so they read in dark mode. */
export const suitText: Record<SuitName, string> = {
  heart: "text-card-red",
  spade: "text-ink",
  diamond: "text-card-red",
  club: "text-ink",
  joker: "text-card-red",
};

export function Suit({ suit, className }: { suit: SuitName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-4 fill-current", className)}>
      <path d={paths[suit]} />
    </svg>
  );
}

/** The joker's centre figure: a harlequin hat in alternating red and black. */
export function JokerEmblem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-16", className)}>
      <g className="fill-card-red">
        <path d="M3.6 17.5C4.4 12.6 3.9 9 2.6 6.4c3.8.8 6.5 3.4 8 7L12 17.5Z" />
        <path d="M20.4 17.5c-.8-4.9-.3-8.5 1-11.1-3.8.8-6.5 3.4-8 7L12 17.5Z" />
        <circle cx="12" cy="3.2" r="1.6" />
      </g>
      <g className="fill-card-ink">
        <path d="M10.6 13.4c.3-4 .8-6.8 1.4-8.8.6 2 1.1 4.8 1.4 8.8L12 17.5Z" />
        <path d="M3.4 18.6h17.2v2.6H3.4Z" />
        <circle cx="2.6" cy="5.2" r="1.6" />
        <circle cx="21.4" cy="5.2" r="1.6" />
      </g>
    </svg>
  );
}
