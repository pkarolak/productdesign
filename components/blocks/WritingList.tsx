import { Rise } from "@/components/motion/Rise";
import { Icon } from "@/components/ui/Icon";
import type { Writing } from "@/content/schema";
import { BlockHeader } from "./BlockHeader";

const format = (date: string) => {
  const [y, m] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
};

/** Dated external links, newest first. Renders nothing while there are no items. */
export function WritingList({ writing }: { writing?: Writing }) {
  if (!writing?.items.length) return null;
  const items = [...writing.items].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <section id="writing" aria-labelledby="writing-title" className="container-page section-y">
      <BlockHeader id="writing-title" title={writing.title} note={writing.note} />
      <ul className="border-t border-hairline">
        {items.map((item, i) => (
          <Rise as="li" key={item.href} i={i} className="border-b border-hairline">
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="focus-ring press group/w grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1 rounded-inset py-5 md:grid-cols-[120px_minmax(0,1fr)_auto]"
            >
              <time dateTime={item.date} className="type-caption text-ink-3 tabular-nums max-md:order-2 max-md:col-span-2">
                {format(item.date)}
                {item.source && <span className="md:hidden"> · {item.source}</span>}
              </time>
              <span className="type-h3 text-ink transition-colors duration-(--t-hover-short) ease-slow group-hover/w:text-accent">
                {item.title}
              </span>
              <span className="type-small flex items-center gap-1.5">
                {item.source && <span className="max-md:hidden">{item.source}</span>}
                <Icon name="arrow-up-right" className="size-4 text-ink-3" />
                <span className="sr-only">(opens in a new tab)</span>
              </span>
            </a>
          </Rise>
        ))}
      </ul>
    </section>
  );
}
