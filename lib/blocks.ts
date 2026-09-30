import type { HandCard, HandTarget, Site, Suit } from "@/content/schema";

/** Cards whose target block has content; a card into an empty block would lead nowhere. */
export function visibleCards(site: Site, hasWork: boolean): HandCard[] {
  const filled: Record<HandTarget, boolean> = {
    about: true,
    work: hasWork,
    showcase: !!site.showcase?.items.length,
    teaching: !!site.teaching?.items.length,
    outside: !!site.outside?.items.length,
    writing: !!site.writing?.items.length,
    contact: true,
  };
  return site.hand.filter((c) => filled[c.target]);
}

/** The suit of the card pointing at a block, so the block's heading can wear it. */
export const suitFor = (site: Site, target: HandTarget): Suit | undefined =>
  site.hand.find((c) => c.target === target)?.suit;
