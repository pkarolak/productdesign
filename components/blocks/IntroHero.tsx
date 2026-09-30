import Image from "next/image";
import { Rise } from "@/components/motion/Rise";
import { PrimaryLink } from "@/components/ui/Button";
import { Definition } from "@/components/ui/Definition";
import { Filete } from "@/components/ui/Filete";
import { Icon } from "@/components/ui/Icon";
import { SmartLink } from "@/components/ui/SmartLink";
import type { Hero, Site } from "@/content/schema";

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

const leading = /^[.,;:!?)]+/;

type Part = Hero["intro"][number]["parts"][number];

/**
 * A run of intro text and company pills. Each pill is glued to the word before it, so a pill never starts a line on
 * its own. `quiet` pills drop the frame: a mark and a name, for the follow-up line.
 */
function Parts({ parts, quiet }: { parts: Part[]; quiet?: boolean }) {
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
    const mark = part.logo ? (
      <Image src={part.logo} alt="" width={16} height={16} className={quiet ? "mr-1.5 inline-block size-3.5 object-contain align-[-0.2em]" : "size-4 object-contain"} />
    ) : (
      <span aria-hidden className="grid size-4 place-items-center rounded-pill bg-accent/15 text-[10px] leading-none text-accent">
        {part.pill[0]}
      </span>
    );
    return (
      <span key={part.pill}>
        {i > 0 && " "}
        <span className="whitespace-nowrap">
          {glued && `${glued} `}
          <SmartLink
            href={part.href}
            className={
              quiet
                ? "focus-ring rounded-inset text-ink-2 transition-colors duration-(--t-hover-short) ease-slow hover:text-ink"
                : "inline-pill focus-ring type-small"
            }
          >
            {mark}
            {part.pill}
          </SmartLink>
          {trailing}
        </span>
      </span>
    );
  });
}

/** Where the day goes: a label column with a time-of-day icon, and one short line each. */
function Schedule({ rows }: { rows: Hero["intro"] }) {
  return (
    <dl className="grid max-w-[36rem]">
      {rows.map((row) => (
        <div
          key={row.when}
          className="grid gap-y-1 border-t border-hairline py-3.5 first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:items-baseline sm:gap-x-6"
        >
          <dt className="type-label flex items-center gap-2">
            <Icon name={row.icon} className="size-4 shrink-0 text-accent" />
            {row.when}
          </dt>
          <dd className="type-lede text-ink">
            <Parts parts={row.parts} />
            {row.note && (
              <span className="type-small mt-1 block text-ink-3">
                <Parts parts={row.note} quiet />
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * A small greeting over the tagline, one shaded phrase and a filete flourish, a day-to-night schedule with company
 * pills, and the photo on card paper. The block centres on the same axis as the hand below it.
 */
export function IntroHero({ hero, avatar }: { hero: Hero; avatar?: Site["avatar"] }) {
  return (
    <section
      aria-labelledby="intro-title"
      className="container-page grid gap-10 pt-(--nav-clear) pb-12 md:grid-cols-[auto_minmax(0,38rem)] md:justify-center md:gap-12 md:pt-44 md:pb-16 lg:gap-16"
    >
      {avatar && (
        <Rise className="hidden pt-[0.6rem] pb-[0.45rem] md:block">
          <div className="group/avatar playing-card h-full w-[168px] rounded-card p-1.5 transition-transform duration-(--t-hover) ease-slow hover:-translate-y-1 hover:-rotate-2 lg:w-[212px]">
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
        <Rise as="h1" id="intro-title" className="type-display max-w-[15ch] text-ink">
          <span className="type-lede mb-3 block font-medium tracking-[-0.01em]">{hero.greeting}</span>
          <Tagline hero={hero} />
        </Rise>
        <Rise i={1}>
          <Filete className="mt-5" />
        </Rise>
        <Rise i={1} className="mt-7">
          <Schedule rows={hero.intro} />
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
