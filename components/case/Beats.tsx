import { Rise } from "@/components/motion/Rise";
import type { Project } from "@/content/schema";

export function Beats({ beats }: { beats: Project["beats"] }) {
  return (
    <section aria-label="How it went" className="container-page py-12 md:py-16">
      <ol className="grid gap-10 md:grid-cols-3 md:gap-0">
        {beats.map((b, i) => (
          <Rise
            as="li"
            key={b.label}
            i={i}
            className="md:border-l md:border-hairline md:px-10 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
          >
            <h2 className="type-h3 text-ink">{b.label}</h2>
            <p className="type-body mt-3 text-ink-2">{b.text}</p>
          </Rise>
        ))}
      </ol>
    </section>
  );
}
