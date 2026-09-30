import { Rise } from "@/components/motion/Rise";
import type { Outside } from "@/content/schema";
import { cn } from "@/lib/cn";
import { BlockHeader } from "./BlockHeader";

/** A few lines about life outside work. Renders nothing while empty. */
export function OutsideWork({ outside }: { outside?: Outside }) {
  if (!outside?.items.length) return null;
  const { items } = outside;
  return (
    <section id="outside" aria-labelledby="outside-title" className="container-page section-y">
      <BlockHeader id="outside-title" title={outside.title} note={outside.note} />
      <ul className={cn("grid gap-3 md:gap-4", items.length > 1 && "md:grid-cols-2", items.length === 3 && "lg:grid-cols-3")}>
        {items.map((o, i) => (
          <Rise as="li" key={o.title} i={i} className="card rounded-card p-6 md:p-7">
            <h3 className="type-h3 text-ink">{o.title}</h3>
            <p className="type-small mt-2">{o.text}</p>
          </Rise>
        ))}
      </ul>
    </section>
  );
}
