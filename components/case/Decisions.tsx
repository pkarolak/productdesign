import { BlockHeader } from "@/components/blocks/BlockHeader";
import { Rise } from "@/components/motion/Rise";
import { Icon } from "@/components/ui/Icon";
import type { Decision } from "@/content/schema";

/** The close of a case: what I decided, and where each choice led. Nothing while empty. */
export function Decisions({ decisions }: { decisions?: readonly Decision[] }) {
  if (!decisions?.length) return null;
  return (
    <section id="decisions" aria-labelledby="decisions-title" className="container-page section-y scroll-mt-(--nav-clear)">
      <BlockHeader id="decisions-title" title="Decisions and outcome" className="mb-6 md:mb-8" />
      <div aria-hidden className="hidden gap-8 border-b border-hairline pb-3 md:grid md:grid-cols-12">
        <span className="type-label md:col-span-5">Decision</span>
        <span className="type-label md:col-span-7 md:pl-8">Outcome</span>
      </div>
      <dl>
        {decisions.map((d, i) => (
          <Rise
            key={d.decision}
            i={i}
            className="grid gap-3 border-b border-hairline py-7 md:grid-cols-12 md:items-start md:gap-8 md:py-8"
          >
            <dt className="type-h3 max-w-[30ch] text-ink md:col-span-5">{d.decision}</dt>
            <dd className="type-body flex max-w-[62ch] gap-3 text-ink-2 md:col-span-7">
              <span aria-hidden className="mt-[0.2em] hidden shrink-0 text-ink-3 md:block">
                <Icon name="arrow-right" size="nav" />
              </span>
              <span>{d.outcome}</span>
            </dd>
          </Rise>
        ))}
      </dl>
    </section>
  );
}
