import { Rise } from "@/components/motion/Rise";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Icon } from "@/components/ui/Icon";
import type { Project, Values as ValuesData } from "@/content/schema";
import { cn } from "@/lib/cn";
import { BlockHeader } from "./BlockHeader";

/** Working principles, each backed by the case that shows it. Renders nothing while empty. */
export function Values({ values, projects }: { values?: ValuesData; projects: Project[] }) {
  if (!values?.items.length) return null;
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const { items } = values;
  return (
    <section id="values" aria-labelledby="values-title" className="container-page section-y">
      <BlockHeader id="values-title" title={values.title} note={values.note} />
      {values.loop && (
        <ol aria-label="The working loop" className="mb-12 grid md:mb-16 md:grid-cols-4">
          {values.loop.map((s, i, all) => {
            const last = i === all.length - 1;
            return (
              <Rise as="li" key={s.title} i={i} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 md:block md:pr-6">
                <div className="flex flex-col items-center md:flex-row md:gap-3">
                  <span className="card grid size-12 shrink-0 place-items-center rounded-inset text-ink">
                    <Icon name={s.icon} size="nav" />
                  </span>
                  <span
                    aria-hidden
                    className={cn("w-px flex-1 bg-hairline max-md:my-2 md:h-px md:w-auto", last && "max-md:hidden")}
                  />
                  <Icon name={last ? "repeat" : "arrow-right"} className="shrink-0 text-ink-3 max-md:hidden" />
                </div>
                <div className={cn("pt-2.5 md:pt-4", !last && "max-md:pb-8")}>
                  <h3 className="type-h3 text-ink">{s.title}</h3>
                  <p className="type-small mt-1.5 max-w-[30ch]">{s.text}</p>
                </div>
              </Rise>
            );
          })}
        </ol>
      )}
      <ol className={cn("grid gap-3 md:gap-4", items.length > 1 && "md:grid-cols-2", items.length === 3 && "lg:grid-cols-3")}>
        {items.map((v, i) => {
          const evidence = v.evidence ? bySlug.get(v.evidence) : undefined;
          return (
            <Rise as="li" key={v.title} i={i} className="card flex flex-col rounded-card p-6 md:p-7">
              <span aria-hidden className="type-caption text-ink-3 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="type-h3 mt-3 text-ink">{v.title}</h3>
              <p className="type-small mt-2">{v.text}</p>
              {evidence && (
                <div className="mt-auto pt-5">
                  <ArrowLink href={`/work/${evidence.slug}`} transition="nav-forward">
                    See it in {evidence.title}
                  </ArrowLink>
                </div>
              )}
            </Rise>
          );
        })}
      </ol>
    </section>
  );
}
