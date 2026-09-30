import Link from "next/link";
import { Rise } from "@/components/motion/Rise";
import type { Project, Site } from "@/content/schema";

export function Approach({
  principles,
  projects,
  long,
}: {
  principles: Site["approach"];
  projects: Project[];
  long?: boolean;
}) {
  return (
    <section aria-labelledby="approach-title" className="container-page section-y grid gap-12 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-4">
        <Rise as="h2" id="approach-title" className="type-h2 max-w-[10ch] text-ink lg:sticky lg:top-40">
          How I <em>work</em>
        </Rise>
      </div>
      <ol className="lg:col-span-8">
        {principles.map((p, i) => {
          const evidence = projects.find((x) => x.slug === p.evidence);
          return (
            <Rise
              as="li"
              key={p.title}
              i={i}
              className="grid gap-4 border-t border-hairline py-10 first:border-t-0 first:pt-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:gap-10"
            >
              <h3 className="type-h3 text-ink">{p.title}</h3>
              <div>
                <p className="type-body text-ink-2">{long ? p.long : p.text}</p>
                {evidence && (
                  <Link href={`/work/${evidence.slug}`} className="focus-ring link type-small mt-4 inline-block rounded-pill">
                    See {evidence.title}
                  </Link>
                )}
              </div>
            </Rise>
          );
        })}
      </ol>
    </section>
  );
}
