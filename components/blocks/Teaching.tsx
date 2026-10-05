import { Rise } from "@/components/motion/Rise";
import { Icon } from "@/components/ui/Icon";
import { IconTile } from "@/components/ui/IconTile";
import type { Tint } from "@/components/ui/Suit";
import type { Suit, Teaching as TeachingData } from "@/content/schema";
import { cn } from "@/lib/cn";
import { BlockHeader } from "./BlockHeader";

const cardTints: Tint[] = ["green", "violet", "amber"];

/** Teaching roles with the topics covered, each on its own hue. Renders nothing while empty. */
export function Teaching({ teaching, suit, id = "teaching" }: { teaching?: TeachingData; suit?: Suit; id?: string }) {
  if (!teaching?.items.length) return null;
  const { items } = teaching;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="container-page section-y scroll-mt-(--nav-clear)">
      <BlockHeader id={`${id}-title`} title={teaching.title} note={teaching.note} suit={suit} />
      <ul className={cn("grid gap-3 md:gap-4", items.length > 1 && "md:grid-cols-2")}>
        {items.map((t, i) => {
          const tint = cardTints[i % cardTints.length];
          return (
            <Rise as="li" key={t.place} i={i} className="card group relative flex flex-col overflow-hidden rounded-card p-6 md:p-8">
              <span aria-hidden data-tint={tint} className="card-tint" />
              {t.icon && (
                <span
                  aria-hidden
                  data-tint={tint}
                  className="tint-ink pointer-events-none absolute -right-8 -bottom-10 opacity-10 transition-transform duration-(--t-hover) ease-slow group-hover:-rotate-12 group-hover:scale-110 [&_svg]:size-44"
                >
                  <Icon name={t.icon} />
                </span>
              )}
              <div className="relative flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-6">
                  {t.icon && (
                    <span className="transition-transform duration-(--t-hover-mid) ease-slow group-hover:-rotate-6">
                      <IconTile icon={t.icon} tint={tint} />
                    </span>
                  )}
                  <p className="type-caption pt-1 text-ink-3 tabular-nums">{t.years}</p>
                </div>
                <h3 className="type-h3 mt-6 text-ink">{t.place}</h3>
                <p className="type-small mt-1">{t.role}</p>
                <p className="type-body mt-4 max-w-[52ch] text-ink-2">{t.text}</p>
                {t.topics.length > 0 && (
                  <ul aria-label="Topics" className="mt-auto flex flex-wrap gap-2 pt-6">
                    {t.topics.map((topic) => (
                      <li key={topic} className="inline-pill type-caption">
                        <span aria-hidden data-tint={tint} className="tint-ink size-1.5 rounded-pill bg-current" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Rise>
          );
        })}
      </ul>
    </section>
  );
}
