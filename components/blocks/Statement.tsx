import { Picture } from "@/components/media/Picture";
import { Rise } from "@/components/motion/Rise";
import { Tilt } from "@/components/motion/Tilt";
import { tiltZoom } from "@/components/motion/tiltZoom";
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
        <div className={portrait ? "lg:col-span-6" : "lg:col-span-8"}>
          <Rise as="p" i={2} className="type-standfirst max-w-[44ch] text-ink!">
            {statement.lead}
          </Rise>
          {beliefs.length > 0 && (
            <ul aria-label={about.beliefs?.title} className="mt-8 border-t border-hairline">
              {beliefs.map((b, i) => (
                <Rise as="li" key={b.title} i={3 + i} className="flex items-center gap-4 border-b border-hairline py-3">
                  <IconTile icon={b.icon} tint={beliefTint(i)} />
                  <span className="type-body text-ink-2">{b.title}</span>
                </Rise>
              ))}
            </ul>
          )}
          {statement.cta && (
            <Rise i={3 + beliefs.length} className="mt-8">
              <ArrowLink href={statement.cta.href} transition="nav-forward">
                {statement.cta.label}
              </ArrowLink>
            </Rise>
          )}
        </div>
        {portrait && (
          <Rise i={3} className="lg:col-span-5 lg:col-start-8">
            <Tilt className="card rounded-card p-(--frame-pad)">
              <div
                className="core relative aspect-[4/5] overflow-hidden rounded-inset"
                style={portrait.ratio ? { aspectRatio: portrait.ratio } : undefined}
              >
                <Picture
                  src={portrait.src}
                  alt={portrait.alt}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className={`object-cover ${tiltZoom}`}
                />
              </div>
            </Tilt>
          </Rise>
        )}
      </div>
    </section>
  );
}
