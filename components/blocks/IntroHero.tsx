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

const leadsWithPunctuation = (s: string) => /^[.,;:!?)]/.test(s);

/** Greeting, a second line in Ink 2, then one sentence with inline company pills; the photo spans the text block. */
export function IntroHero({ hero, avatar }: { hero: Hero; avatar?: Site["avatar"] }) {
  return (
    <section
      aria-labelledby="intro-title"
      className="container-page grid gap-10 pt-(--nav-clear) pb-12 md:grid-cols-[auto_minmax(0,1fr)] md:gap-12 md:pt-44 md:pb-16 lg:gap-14"
    >
      {avatar && (
        <Rise className="hidden pt-[0.6rem] pb-[0.45rem] md:block">
          <div className="group/avatar relative h-full w-[168px] overflow-hidden rounded-card border border-hairline shadow-raised lg:w-[212px]">
            <Image
              src={avatar.src}
              alt={avatar.alt}
              fill
              preload
              sizes="212px"
              className="object-cover object-[50%_28%] transition-transform duration-(--t-hover) ease-slow group-hover/avatar:scale-[1.03]"
            />
          </div>
        </Rise>
      )}
      <div>
        {avatar && (
          <Rise className="mb-6 md:hidden">
            <Image
              src={avatar.src}
              alt={avatar.alt}
              width={72}
              height={72}
              preload
              className="size-18 rounded-pill border border-hairline object-cover"
            />
          </Rise>
        )}
        <Rise as="h1" id="intro-title" className="type-display max-w-[16ch] text-ink">
          {hero.greeting}
          <em className="block">
            <Tagline hero={hero} />
          </em>
        </Rise>
        <Rise as="p" i={1} className="type-lede mt-6 max-w-[58ch]">
          {hero.intro.map((part, i) => {
            const space = i > 0 && !(typeof part === "string" && leadsWithPunctuation(part)) ? " " : "";
            if (typeof part === "string") {
              const prev = hero.intro[i - 1];
              return `${space}${prev && typeof prev !== "string" ? part.replace(/^[.,;:!?)]+/, "") : part}`;
            }
            const next = hero.intro[i + 1];
            const trailing = typeof next === "string" ? (next.match(/^[.,;:!?)]+/)?.[0] ?? "") : "";
            return (
              <span key={part.pill}>
                {space}
                <span className="whitespace-nowrap">
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
          })}
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
