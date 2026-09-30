import { Rise } from "@/components/motion/Rise";
import { Icon } from "@/components/ui/Icon";

export function AskMeAbout({ prompts }: { prompts: string[] }) {
  return (
    <section aria-labelledby="ask-title" className="container-page section-y grid gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-4">
        <Rise as="h2" id="ask-title" className="type-h2 max-w-[10ch] text-ink">
          Ask me <em>about</em>
        </Rise>
        <Rise as="p" i={1} className="type-body mt-4 max-w-[32ch] text-ink-2">
          The parts that do not fit on a page. Happy to go deep on any of them.
        </Rise>
      </div>
      <ul className="lg:col-span-8">
        {prompts.map((p, i) => (
          <Rise
            as="li"
            key={p}
            i={i}
            className="flex items-baseline gap-4 border-t border-hairline py-7 first:border-t-0 first:pt-0 md:py-8"
          >
            <span className="translate-y-0.5 text-accent">
              <Icon name="arrow-right" />
            </span>
            <p className="type-h3 text-ink">{p}</p>
          </Rise>
        ))}
        <Rise as="li" i={prompts.length} className="pt-6">
          <a href="#contact" className="focus-ring link type-body rounded-pill">
            Get in touch
          </a>
        </Rise>
      </ul>
    </section>
  );
}
