import { Rise } from "@/components/motion/Rise";
import { Icon } from "@/components/ui/Icon";
import type { Site } from "@/content/schema";
import { cn } from "@/lib/cn";
import { BlockHeader } from "./BlockHeader";

/** Convictions, each with a glyph, on hairlines. The last one closes wider when it would sit alone. Nothing while empty. */
export function Beliefs({ beliefs }: { beliefs?: Site["about"]["beliefs"] }) {
  if (!beliefs?.items.length) return null;
  const { items } = beliefs;
  const closing = items.length % 3 === 2;
  return (
    <section id="beliefs" aria-labelledby="beliefs-title" className="container-page section-y">
      <BlockHeader id="beliefs-title" title={beliefs.title} />
      <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {items.map((b, i) => {
          const wide = closing && i === items.length - 1;
          return (
            <Rise
              as="li"
              key={b.title}
              i={i % 3}
              className={cn("border-t border-hairline pt-6", wide && "lg:col-span-2")}
            >
              <span className="card grid size-12 place-items-center rounded-inset text-ink">
                <Icon name={b.icon} size="nav" />
              </span>
              <h3 className={cn("mt-5 text-ink", wide ? "type-h2 max-w-[22ch]" : "type-h3")}>{b.title}</h3>
              <p className={cn("mt-2", wide ? "type-lede max-w-[52ch]" : "type-small max-w-[36ch]")}>{b.text}</p>
            </Rise>
          );
        })}
      </ul>
    </section>
  );
}
