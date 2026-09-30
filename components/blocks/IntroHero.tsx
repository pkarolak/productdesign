import { Rise } from "@/components/motion/Rise";
import { PrimaryLink } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import type { Hero } from "@/content/schema";

const leadsWithPunctuation = (s: string) => /^[.,;:!?)]/.test(s);

/** Greeting, a second line in Ink 2, then one sentence with inline company pills. */
export function IntroHero({ hero }: { hero: Hero }) {
  return (
    <section aria-labelledby="intro-title" className="container-page pt-(--nav-clear) pb-12 md:pt-44 md:pb-16">
      <Rise as="h1" id="intro-title" className="type-display max-w-[16ch] text-ink">
        {hero.greeting}
        <em className="block">{hero.tagline}</em>
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
                  <span aria-hidden className="grid size-4 place-items-center rounded-pill bg-accent/15 text-[10px] leading-none text-accent">
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
    </section>
  );
}
