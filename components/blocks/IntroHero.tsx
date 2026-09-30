import { Rise } from "@/components/motion/Rise";
import { PrimaryLink } from "@/components/ui/Button";
import { Definition } from "@/components/ui/Definition";
import { Filete } from "@/components/ui/Filete";
import type { Hero, Site } from "@/content/schema";
import { DayCycle, Daylight } from "./DayCycle";
import { FaceDeck, type Face } from "./FaceDeck";

/** One face card per time of day with its own photo; with none, the avatar alone. */
function faces(hero: Hero, avatar: NonNullable<Site["avatar"]>): Face[] {
  const own = hero.intro.filter((row) => row.photo);
  if (!own.length) return [{ time: hero.intro[0]?.icon ?? "sun", when: hero.intro[0]?.when ?? "", ...avatar }];
  return hero.intro.map((row) => ({ time: row.icon, when: row.when, ...(row.photo ?? avatar) }));
}

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
 * A small greeting over the tagline, one shaded phrase and a filete hairline, a day-cycle switch whose time of day
 * sets the light behind the block, and the designer's face cards, one photo per time of day. The block centres on the same axis as the hand.
 */
export function IntroHero({ hero, avatar }: { hero: Hero; avatar?: Site["avatar"] }) {
  return (
    <section
      aria-labelledby="intro-title"
      className="relative container-page grid gap-10 pt-(--nav-clear) pb-12 md:grid-cols-[auto_minmax(0,38rem)] md:justify-center md:gap-12 md:pt-28 md:pb-2 md:[@media(min-height:940px)]:pt-32 md:[@media(min-height:940px)]:pb-10 lg:gap-16"
    >
      <Daylight className="-z-10 left-1/2! w-screen -translate-x-1/2" />
      {avatar && (
        <Rise className="relative z-20 hidden self-center md:block">
          <FaceDeck faces={faces(hero, avatar)} />
        </Rise>
      )}
      <div className="relative z-30">
        <Rise as="h1" id="intro-title" className="group/tagline type-display max-w-[15ch] text-ink">
          <span className="type-lede mb-4 block font-medium tracking-[-0.01em]">{hero.greeting}</span>
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
