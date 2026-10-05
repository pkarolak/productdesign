import { Rise } from "@/components/motion/Rise";
import { IconTile, tints } from "@/components/ui/IconTile";
import type { Site } from "@/content/schema";
import { BlockHeader } from "./BlockHeader";

/** Convictions as even rows on hairlines: glyph and title, then the reason beside them. Nothing while empty. */
export function Beliefs({ beliefs }: { beliefs?: Site["about"]["beliefs"] }) {
  if (!beliefs?.items.length) return null;
  return (
    <section id="beliefs" aria-labelledby="beliefs-title" className="container-page section-y">
      <BlockHeader id="beliefs-title" title={beliefs.title} />
      <ul className="border-b border-hairline">
        {beliefs.items.map((b, i) => (
          <Rise
            as="li"
            key={b.title}
            i={i}
            className="grid gap-4 border-t border-hairline py-7 md:grid-cols-12 md:items-center md:gap-8 md:py-8"
          >
            <div className="flex items-center gap-4 md:col-span-5">
              <IconTile icon={b.icon} tint={tints[(i + 3) % tints.length]} />
              <h3 className="type-h3 text-ink">{b.title}</h3>
            </div>
            <p className="type-body max-w-[60ch] text-ink-2 md:col-span-7">{b.text}</p>
          </Rise>
        ))}
      </ul>
    </section>
  );
}
