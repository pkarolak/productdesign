import Image from "next/image";
import { Rise } from "@/components/motion/Rise";
import { PrimaryLink } from "@/components/ui/Button";
import { Definition } from "@/components/ui/Definition";
import { Filete } from "@/components/ui/Filete";
import type { Deck, Hero, Site } from "@/content/schema";
import { Art, Corner, DECK_ORIGIN } from "./CardHand";
import { DayCycle, Daylight } from "./DayCycle";

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

/** The designer as the top card of the deck: a face card with the photo framed between corner marks, that turns
 * over on hover to a second photo or the deck back. The hand below stacks under it and is dealt from it. */
function FaceCard({ avatar, deck }: { avatar: NonNullable<Site["avatar"]>; deck?: Deck }) {
  return (
    <div
      id={DECK_ORIGIN}
      className="group/avatar aspect-[5/7] w-[172px] perspective-[1200px] transition-transform duration-(--t-hover) ease-slow hover:-translate-y-1 hover:-rotate-2 xl:w-[200px]"
    >
      <div className="relative size-full transform-3d transition-transform duration-(--t-hover) ease-slow group-hover/avatar:rotate-y-180">
        <div className="playing-card absolute inset-0 overflow-hidden rounded-inset backface-hidden">
          <Corner suit="heart" rank="P" />
          <div className="absolute inset-x-[15%] inset-y-[10%] overflow-hidden border border-card-ink/15">
            <Image
              src={avatar.src}
              alt={avatar.alt}
              fill
              preload
              sizes="160px"
              className="object-cover object-[50%_30%] sepia-[0.14]"
            />
          </div>
          <Corner suit="heart" rank="P" flip />
        </div>
        <div className="playing-card absolute inset-0 overflow-hidden rounded-inset backface-hidden rotate-y-180">
          {avatar.back ? (
            <Image src={avatar.back.src} alt={avatar.back.alt} fill sizes="212px" className="object-cover" />
          ) : (
            deck && <Art art={deck.back} sizes="212px" className="object-fill" />
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * A small greeting over the tagline, one shaded phrase and a filete hairline, a day-cycle switch whose time of day
 * sets the light behind the block, and the designer's face card. The block centres on the same axis as the hand.
 */
export function IntroHero({ hero, avatar, deck }: { hero: Hero; avatar?: Site["avatar"]; deck?: Deck }) {
  return (
    <section
      aria-labelledby="intro-title"
      className="relative container-page grid gap-10 pt-(--nav-clear) pb-12 md:grid-cols-[auto_minmax(0,38rem)] md:justify-center md:gap-12 md:pt-28 md:pb-2 lg:gap-16"
    >
      <Daylight className="-z-10 left-1/2! w-screen -translate-x-1/2" />
      {avatar && (
        <Rise className="relative z-20 hidden self-center md:block">
          <FaceCard avatar={avatar} deck={deck} />
        </Rise>
      )}
      <div className="relative z-30">
        <Rise as="h1" id="intro-title" className="group/tagline type-display max-w-[15ch] text-ink">
          <span className="type-lede mb-3 block font-medium tracking-[-0.01em]">{hero.greeting}</span>
          <Tagline hero={hero} />
        </Rise>
        <Rise i={1}>
          <Filete className="mt-4" />
        </Rise>
        <Rise i={1} className="mt-6">
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
