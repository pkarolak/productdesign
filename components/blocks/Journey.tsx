import Image from "next/image";
import { Rise } from "@/components/motion/Rise";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Icon } from "@/components/ui/Icon";
import type { Journey as JourneyData, Project } from "@/content/schema";
import { cn } from "@/lib/cn";
import type { Org } from "@/lib/companies";
import { BlockHeader } from "./BlockHeader";

type Role = JourneyData["roles"][number];
type Stint = { company: string; roles: Role[]; from: number; to?: number };

const slugOf = (s: Stint) => `at-${s.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${s.from}`;
const years = (from: number, to?: number) => (to === undefined ? `${from} to now` : to === from ? String(from) : `${from} to ${to}`);

/** Consecutive roles at one company, newest first, become one stint. */
function stints(roles: Role[]): Stint[] {
  const out: Stint[] = [];
  for (const r of [...roles].sort((a, b) => b.from - a.from)) {
    const last = out.at(-1);
    if (last && last.company === r.company) {
      last.roles.push(r);
      last.from = Math.min(last.from, r.from);
    } else out.push({ company: r.company, roles: [r], from: r.from, to: r.to });
  }
  return out;
}

function Mark({ stint, logo, size }: { stint: Stint; logo?: string; size: "sm" | "lg" }) {
  const icon = stint.roles.find((r) => r.icon)?.icon;
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-inset border border-hairline bg-canvas text-ink",
        size === "lg" ? "size-12" : "size-8",
      )}
    >
      {logo ? (
        <Image src={logo} alt="" width={24} height={24} className={size === "lg" ? "size-6 object-contain" : "size-4 object-contain"} />
      ) : icon ? (
        <Icon name={icon} className={size === "lg" ? "size-5" : "size-4"} />
      ) : (
        <span className="type-caption">{stint.company[0]}</span>
      )}
    </span>
  );
}

/**
 * Roles grouped by company, newest first: a card per company with its mark and span, and the roles on a rail inside,
 * so promotions read at a glance. A sticky company list jumps to each card. Cases link from the role that produced them.
 */
export function Journey({ journey, projects, orgs }: { journey?: JourneyData; projects: Project[]; orgs?: Map<string, Org> }) {
  if (!journey?.roles.length) return null;
  const list = stints(journey.roles);
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const logoOf = (s: Stint) => orgs?.get(s.company)?.logo ?? s.roles.find((r) => r.logo)?.logo;

  return (
    <section id="journey" aria-labelledby="journey-title" className="container-page section-y">
      <BlockHeader id="journey-title" title={journey.title} note={journey.note} />
      <div className="grid gap-8 md:grid-cols-[200px_minmax(0,1fr)] md:gap-8">
        <nav aria-label="Companies" className="max-md:hidden">
          <ol className="sticky top-(--nav-clear) grid gap-1">
            {list.map((s) => (
              <li key={slugOf(s)}>
                <a
                  href={`#${slugOf(s)}`}
                  className="focus-ring group flex items-center gap-3 rounded-inset py-1.5 transition-colors duration-(--t-hover-short) ease-slow"
                >
                  <Mark stint={s} logo={logoOf(s)} size="sm" />
                  <span className="grid">
                    <span className="type-small text-ink-2 transition-colors duration-(--t-hover-short) ease-slow group-hover:text-ink">
                      {s.company}
                    </span>
                    <span className="type-caption text-ink-3 tabular-nums">{years(s.from, s.to)}</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <ol className="grid gap-4">
          {list.map((s, i) => {
            const kind = s.roles[0].kind;
            return (
              <Rise as="li" key={slugOf(s)} id={slugOf(s)} i={i} className="card scroll-mt-(--nav-clear) rounded-card p-6 md:p-8">
                <article aria-labelledby={`${slugOf(s)}-title`}>
                  <header className="flex items-center gap-4">
                    <Mark stint={s} logo={logoOf(s)} size="lg" />
                    <div className="min-w-0 flex-1">
                      <h3 id={`${slugOf(s)}-title`} className="type-h3 text-ink">
                        {s.company}
                      </h3>
                      <p className="type-small">{kind}</p>
                    </div>
                    <p className="type-caption self-start pt-1 text-ink-3 tabular-nums">{years(s.from, s.to)}</p>
                  </header>
                  <ol className="mt-7 grid">
                    {s.roles.map((r, j) => {
                      const last = j === s.roles.length - 1;
                      const current = r.to === undefined;
                      const cases = r.cases.map((c) => bySlug.get(c)).filter((p): p is Project => !!p);
                      return (
                        <li key={`${r.role}-${r.from}`} className="relative grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-4">
                          <span aria-hidden className="relative flex justify-center">
                            <span
                              className={cn(
                                "relative z-1 mt-1.5 size-2.5 rounded-pill border-2",
                                current ? "border-accent bg-accent" : "border-ink-3 bg-canvas",
                              )}
                            />
                            {!last && <span className="absolute top-5 bottom-0 w-px bg-hairline" />}
                          </span>
                          <div className={cn(!last && "pb-8")}>
                            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                              <h4 className="type-body font-medium text-ink">{r.role}</h4>
                              {s.roles.length > 1 && <p className="type-caption text-ink-3 tabular-nums">{years(r.from, r.to)}</p>}
                            </div>
                            <p className="type-body mt-2 max-w-[62ch] text-ink-2">{r.summary}</p>
                            {r.points.length > 0 && (
                              <ul className="type-small mt-3 grid max-w-[66ch] gap-2">
                                {r.points.map((p) => (
                                  <li key={p} className="flex gap-2.5">
                                    <span aria-hidden className="mt-2 size-1 shrink-0 rounded-pill bg-ink-3" />
                                    {p}
                                  </li>
                                ))}
                              </ul>
                            )}
                            {cases.length > 0 && (
                              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                                {cases.map((p) => (
                                  <li key={p.slug}>
                                    <ArrowLink href={`/work/${p.slug}`} transition="nav-forward">
                                      {p.title}
                                    </ArrowLink>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </article>
              </Rise>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
