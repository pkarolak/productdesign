import { Picture } from "@/components/media/Picture";
import { Rise } from "@/components/motion/Rise";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { IconTile } from "@/components/ui/IconTile";
import type { Site, Statement as StatementData, Suit } from "@/content/schema";
import { beliefTint } from "./Beliefs";
import { BlockHeader } from "./BlockHeader";

/** The short version of About: the lead beside the About portrait, the About beliefs by title, and a link. */
export function Statement({
  statement,
  about,
  suit,
  id = "about-me",
}: {
  statement?: StatementData;
  about: Site["about"];
  suit?: Suit;
  id?: string;
}) {
  if (!statement) return null;
  const { portrait } = about;
  const beliefs = about.beliefs?.items ?? [];
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="container-page section-y scroll-mt-(--nav-clear)">
      <BlockHeader id={`${id}-title`} title={statement.title} suit={suit} className="mb-8 md:mb-10" />
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className={portrait ? "lg:col-span-6" : "lg:col-span-9"}>
          <Rise as="p" i={2} className="type-h2 max-w-[22ch] text-ink">
            {statement.lead}
          </Rise>
          {statement.cta && (
            <Rise i={3} className="mt-8">
              <ArrowLink href={statement.cta.href} transition="nav-forward">
                {statement.cta.label}
              </ArrowLink>
            </Rise>
          )}
        </div>
        {portrait && (
          <Rise i={3} className="card rounded-card p-(--frame-pad) lg:col-span-6">
            <div
              className="core relative aspect-[4/5] overflow-hidden rounded-inset"
              style={portrait.ratio ? { aspectRatio: portrait.ratio } : undefined}
            >
              <Picture src={portrait.src} alt={portrait.alt} sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
          </Rise>
        )}
      </div>
      {beliefs.length > 0 && (
        <ul
          aria-label={about.beliefs?.title}
          className="mt-12 grid gap-x-6 gap-y-4 border-t border-hairline pt-8 sm:grid-cols-2 md:mt-16 lg:grid-cols-5 lg:pt-10"
        >
          {beliefs.map((b, i) => (
            <Rise as="li" key={b.title} i={4 + i} className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-4">
              <IconTile icon={b.icon} tint={beliefTint(i)} />
              <span className="type-body text-balance text-ink">{b.title}</span>
            </Rise>
          ))}
        </ul>
      )}
    </section>
  );
}
