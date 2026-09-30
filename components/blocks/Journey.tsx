import { Rise } from "@/components/motion/Rise";
import { ArrowLink } from "@/components/ui/ArrowLink";
import type { Journey as JourneyData, Project } from "@/content/schema";
import { BlockHeader } from "./BlockHeader";

const anchor = (r: JourneyData["roles"][number]) => `role-${r.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${r.from}`;

/** Roles newest first, with a year rail that jumps to each role and links to the cases it produced. */
export function Journey({ journey, projects }: { journey?: JourneyData; projects: Project[] }) {
  if (!journey?.roles.length) return null;
  const roles = [...journey.roles].sort((a, b) => b.from - a.from);
  const bySlug = new Map(projects.map((p) => [p.slug, p]));

  return (
    <section id="journey" aria-labelledby="journey-title" className="container-page section-y">
      <BlockHeader id="journey-title" title={journey.title} note={journey.note} />
      <div className="grid gap-8 md:grid-cols-[112px_minmax(0,1fr)] md:gap-6">
        <nav aria-label="Years" className="max-md:hidden">
          <ol className="sticky top-(--nav-clear) grid gap-1">
            {roles.map((r) => (
              <li key={anchor(r)}>
                <a
                  href={`#${anchor(r)}`}
                  className="focus-ring type-small block rounded-pill py-1 tabular-nums transition-colors duration-(--t-hover-short) ease-slow hover:text-ink"
                >
                  {r.from}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <ol className="grid gap-3">
          {roles.map((r, i) => {
            const cases = r.cases.map((s) => bySlug.get(s)).filter((p): p is Project => !!p);
            return (
              <Rise
                as="li"
                key={anchor(r)}
                id={anchor(r)}
                i={i}
                className="card scroll-mt-(--nav-clear) rounded-card p-6 md:p-7"
              >
                <article aria-labelledby={`${anchor(r)}-title`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 id={`${anchor(r)}-title`} className="type-h3 text-ink">
                      {r.company}
                    </h3>
                    <p className="type-caption text-ink-3 tabular-nums">
                      {r.from} to {r.to ?? "now"}
                    </p>
                  </div>
                  <p className="type-small mt-1">
                    {r.role} · {r.kind}
                  </p>
                  <p className="type-body mt-4 text-ink-2">{r.summary}</p>
                  {r.points.length > 0 && (
                    <ul className="type-small mt-3 grid list-disc gap-1.5 pl-5 marker:text-ink-3">
                      {r.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  )}
                  {cases.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                      {cases.map((p) => (
                        <li key={p.slug}>
                          <ArrowLink href={`/work/${p.slug}`} transition="nav-forward">
                            {p.title}
                          </ArrowLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </Rise>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
