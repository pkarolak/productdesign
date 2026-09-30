import Image from "next/image";
import { Rise } from "@/components/motion/Rise";
import { PrimaryLink } from "@/components/ui/Button";
import { Definition } from "@/components/ui/Definition";
import { SmartLink } from "@/components/ui/SmartLink";
import type { Hero, Site } from "@/content/schema";

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** The tagline with each glossary term wrapped in a Definition. */
function Tagline({ hero }: { hero: Hero }) {
  if (!hero.glossary.length) return hero.tagline;
  const pattern = new RegExp(`(${hero.glossary.map((g) => escape(g.term)).join("|")})`, "gi");
  return hero.tagline.split(pattern).map((part, i) => {
    const entry = hero.glossary.find((g) => g.term.toLowerCase() === part.toLowerCase());
    return entry ? (
      <Definition key={i} entry={entry}>
        {part}
      </Definition>
    ) : (
      part
    );
  });
}

const leading = /^[.,;:!?)]+/;

/** The intro sentence. Each pill is glued to the word before it, so a pill never starts a line on its own. */
function Intro({ parts }: { parts: Hero["intro"] }) {
  return parts.map((part, i) => {
    const prev = parts[i - 1];
    const next = parts[i + 1];
    if (typeof part === "string") {
      let text = prev && typeof prev !== "string" ? part.replace(leading, "") : part;
      if (next && typeof next !== "string") text = text.replace(/\s*\S+\s*$/, "");
      if (!text) return null;
      const space = i > 0 && !leading.test(part) ? " " : "";
      return `${space}${text}`;
    }
    const glued = typeof prev === "string" ? (prev.trimEnd().match(/\S+$/)?.[0] ?? "") : "";
    const trailing = typeof next === "string" ? (next.match(leading)?.[0] ?? "") : "";
    return (
      <span key={part.pill}>
        {i > 0 && " "}
        <span className="whitespace-nowrap">
          {glued && `${glued} `}
          <SmartLink href={part.href} className="inline-pill focus-ring type-small">
            <span
              aria-hidden
              className="grid size-4 place-items-center rounded-pill bg-accent/15 text-[10px] leading-none text-accent"
            >
              {part.pill[0]}
            </span>
            {part.pill}
          </SmartLink>
          {trailing}
        </span>
      </span>
    );
  });
}

/** A quiet greeting, the tagline in full ink with a sign-painter shade, one sentence with inline company pills, and
 * the photo set like a card laid on the table. The block centres on the same axis as the hand below it. */
export function IntroHero({ hero, avatar }: { hero: Hero; avatar?: Site["avatar"] }) {
  return (
    <section
      aria-labelledby="intro-title"
      className="container-page grid gap-10 pt-(--nav-clear) pb-12 md:grid-cols-[auto_minmax(0,38rem)] md:justify-center md:gap-12 md:pt-44 md:pb-16 lg:gap-16"
    >
      {avatar && (
        <Rise className="hidden pt-[0.6rem] pb-[0.45rem] md:block">
          <div className="group/avatar playing-card h-full w-[168px] -rotate-2 rounded-card p-1.5 transition-transform duration-(--t-hover) ease-slow hover:rotate-0 lg:w-[212px]">
            <div className="relative size-full overflow-hidden rounded-inset">
              <Image
                src={avatar.src}
                alt={avatar.alt}
                fill
                preload
                sizes="212px"
                className="object-cover object-[50%_28%] sepia-[0.14] transition-transform duration-(--t-hover) ease-slow group-hover/avatar:scale-[1.03]"
              />
            </div>
          </div>
        </Rise>
      )}
      <div>
        <Rise as="h1" id="intro-title" className="type-display max-w-[16ch] text-ink">
          <span className="text-ink-2">{hero.greeting}</span>
          <span className="filete-shade block">
            <Tagline hero={hero} />
          </span>
        </Rise>
        <Rise as="p" i={1} className="type-lede mt-6 max-w-[58ch]">
          <Intro parts={hero.intro} />
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
