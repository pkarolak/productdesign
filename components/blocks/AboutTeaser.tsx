import { Rise } from "@/components/motion/Rise";
import { PrimaryLink } from "@/components/ui/Button";
import { Emphasis } from "@/components/ui/Emphasis";
import { Filete } from "@/components/ui/Filete";
import { Suit, suitText } from "@/components/ui/Suit";
import type { Site, Suit as SuitName } from "@/content/schema";
import { cn } from "@/lib/cn";

/** The About story in short: headline, the first paragraph and a link to the full page. */
export function AboutTeaser({ about, id, suit }: { about: Site["about"]; id: string; suit?: SuitName }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="container-page section-y">
      <Rise as="p" className="type-label">
        About
      </Rise>
      <Rise as="h2" id={`${id}-title`} i={1} className="type-display filete-shade mt-3 flex max-w-[18ch] items-start gap-4 text-ink">
        {suit && <Suit suit={suit} className={cn("mt-[0.2em] size-[0.6em] shrink-0", suitText[suit])} />}
        <span>
          <Emphasis text={about.headline} />
        </span>
      </Rise>
      <Rise i={1}>
        <Filete className="mt-4" />
      </Rise>
      <div className="mt-8 grid max-w-[58ch] gap-5">
        {about.story.slice(0, 2).map((p, i) => (
          <Rise as="p" key={p} i={i + 2} className={i === 0 ? "type-lede" : "type-body text-ink-2"}>
            {p}
          </Rise>
        ))}
      </div>
      <Rise i={4} className="mt-9">
        <PrimaryLink href="/about">The whole story</PrimaryLink>
      </Rise>
    </section>
  );
}
