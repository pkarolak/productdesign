import { Picture } from "@/components/media/Picture";
import { Rise } from "@/components/motion/Rise";
import { Tilt } from "@/components/motion/Tilt";
import { tiltZoom } from "@/components/motion/tiltZoom";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { IconTile } from "@/components/ui/IconTile";
import type { Site, Statement as StatementData, Suit } from "@/content/schema";
import { beliefTint } from "./Beliefs";
import { BlockHeader } from "./BlockHeader";

/** The short version of About: the lead beside the portrait, then the beliefs with the same title and text as on About. */
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
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <div className={portrait ? "lg:col-span-6" : "lg:col-span-8"}>
          <Rise as="p" i={2} className="type-standfirst max-w-[44ch] text-ink!">
            {statement.lead}
          </Rise>
          {beliefs.length > 0 && about.beliefs && (
            <div className="mt-10">
              <Rise as="h3" id={`${id}-beliefs`} i={3} className="type-h3 mb-4 text-ink">
                {about.beliefs.title}
              </Rise>
              <ul aria-labelledby={`${id}-beliefs`} className="border-t border-hairline">
                {beliefs.map((b, i) => (
                  <Rise as="li" key={b.title} i={4 + i} className="flex items-start gap-4 border-b border-hairline py-4">
                    <IconTile icon={b.icon} tint={beliefTint(i)} />
                    <div className="min-w-0 pt-1">
                      <p className="type-h3 text-ink">{b.title}</p>
                      <p className="type-small mt-1">{b.text}</p>
                    </div>
                  </Rise>
                ))}
              </ul>
            </div>
          )}
          {statement.cta && (
            <Rise i={4 + beliefs.length} className="mt-8">
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
