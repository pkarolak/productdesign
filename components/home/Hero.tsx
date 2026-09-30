import { Signature } from "@theme/Signature";
import { Rise } from "@/components/motion/Rise";
import { PrimaryLink } from "@/components/ui/Button";
import { Emphasis } from "@/components/ui/Emphasis";
import { MetricsPanel } from "@/components/ui/MetricsPanel";
import type { Site } from "@/content/schema";

export function Hero({ hero }: { hero: Site["hero"] }) {
  return (
    <section className="container-page grid min-h-dvh items-center gap-12 pt-(--nav-clear) pb-16 md:grid-cols-2 md:pt-24 md:pb-0">
      <div>
        <Rise as="h1" i={1} className="type-display mb-7 max-w-[13.5ch] text-ink">
          <Emphasis text={hero.headline} />
        </Rise>
        <Rise as="p" i={2} className="type-lede mb-10 max-w-[38ch]">
          {hero.lede}
        </Rise>
        <Rise i={3}>
          <PrimaryLink href="/#work">View work</PrimaryLink>
        </Rise>
        <MetricsPanel metrics={hero.metrics} rise={4} className="mt-16 max-w-[600px]" />
      </div>
      <Signature plates={hero.plates} priority rise={3} />
    </section>
  );
}
