import { Rise } from "@/components/motion/Rise";
import type { Suit, Teaching as TeachingData } from "@/content/schema";
import { cn } from "@/lib/cn";
import { BlockHeader } from "./BlockHeader";

/** Teaching roles with the topics covered. Renders nothing while empty. */
export function Teaching({ teaching, suit, id = "teaching" }: { teaching?: TeachingData; suit?: Suit; id?: string }) {
  if (!teaching?.items.length) return null;
  const { items } = teaching;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="container-page section-y scroll-mt-(--nav-clear)">
      <BlockHeader id={`${id}-title`} title={teaching.title} note={teaching.note} suit={suit} />
      <ul className={cn("grid gap-3 md:gap-4", items.length > 1 && "md:grid-cols-2")}>
        {items.map((t, i) => (
          <Rise as="li" key={t.place} i={i} className="card flex flex-col rounded-card p-6 md:p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="type-h3 text-ink">{t.place}</h3>
              <p className="type-caption text-ink-3 tabular-nums">{t.years}</p>
            </div>
            <p className="type-small mt-1">{t.role}</p>
            <p className="type-body mt-4 text-ink-2">{t.text}</p>
            {t.topics.length > 0 && (
              <ul aria-label="Topics" className="mt-auto flex flex-wrap gap-2 pt-5">
                {t.topics.map((topic) => (
                  <li key={topic} className="inline-pill type-caption">
                    {topic}
                  </li>
                ))}
              </ul>
            )}
          </Rise>
        ))}
      </ul>
    </section>
  );
}
