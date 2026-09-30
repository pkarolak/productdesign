import Image from "next/image";
import { Rise } from "@/components/motion/Rise";
import { PrimaryLink } from "@/components/ui/Button";
import { Definition } from "@/components/ui/Definition";
import { Filete } from "@/components/ui/Filete";
import type { Hero, Site } from "@/content/schema";
import { DayCycle } from "./DayCycle";

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** A run of tagline text with each glossary term wrapped in a Definition. */
function Terms({ text, glossary }: { text: string; glossary: Hero["glossary"] }) {
  if (!glossary.length) return text;
  const pattern = new RegExp(`(${glossary.map((g) => escape(g.term)).join("|")})`, "gi");
  return text.split(pattern).map((part, i) => {
    const entry = glossary.find((g) => g.term.toLowerCase() === part.toLowerCase());
    return entry ? (
      <Definition key={i} entry={entry}>
        {part}
      </Definition>
    ) : (
      part
    );
  });
}

/** The tagline, with its one shaded phrase painted like a sign. */
function Tagline({ hero }: { hero: Hero }) {
  const at = hero.shade ? hero.tagline.indexOf(hero.shade) : -1;
  if (!hero.shade || at < 0) return <Terms text={hero.tagline} glossary={hero.glossary} />;
  return (
    <>
      <Terms text={hero.tagline.slice(0, at)} glossary={hero.glossary} />
      <span className="filete-shade">
        <Terms text={hero.shade} glossary={hero.glossary} />
      </span>
      <Terms text={hero.tagline.slice(at + hero.shade.length)} glossary={hero.glossary} />
    </>
  );
}

/**
 * A small greeting over the tagline, one shaded phrase and a filete flourish, a day-cycle switch with company
 * links, and the photo on card paper. The block centres on the same axis as the hand below it.
 */
export function IntroHero({ hero, avatar }: { hero: Hero; avatar?: Site["avatar"] }) {
  return (
    <section
      aria-labelledby="intro-title"
      className="container-page grid gap-10 pt-(--nav-clear) pb-12 md:grid-cols-[auto_minmax(0,38rem)] md:justify-center md:gap-12 md:pt-44 md:pb-16 lg:gap-16"
    >
      {avatar && (
        <Rise className="hidden self-center md:block">
          <div className="group/avatar playing-card aspect-[5/7] w-[172px] rounded-card p-1.5 transition-transform duration-(--t-hover) ease-slow hover:-translate-y-1 hover:-rotate-2 xl:w-[212px]">
            <div className="relative size-full overflow-hidden rounded-inset">
              <Image
                src={avatar.src}
                alt={avatar.alt}
                fill
                preload
                sizes="212px"
                className="object-cover sepia-[0.14] transition-transform duration-(--t-hover) ease-slow group-hover/avatar:scale-[1.03]"
              />
            </div>
          </div>
        </Rise>
      )}
      <div>
        <Rise as="h1" id="intro-title" className="type-display max-w-[15ch] text-ink">
          <span className="type-lede mb-3 block font-medium tracking-[-0.01em]">{hero.greeting}</span>
          <Tagline hero={hero} />
        </Rise>
        <Rise i={1}>
          <Filete className="mt-5" />
        </Rise>
        <Rise i={1} className="mt-7">
          <DayCycle rows={hero.intro} />
        </Rise>
        {hero.cta && (
          <Rise i={2} className="mt-9">
            <PrimaryLink href={hero.cta.href}>{hero.cta.label}</PrimaryLink>
          </Rise>
        )}
      </div>
    </section>
  );
}
