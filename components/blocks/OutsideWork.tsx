import { Picture } from "@/components/media/Picture";
import { Rise } from "@/components/motion/Rise";
import { Tilt } from "@/components/motion/Tilt";
import { tiltZoom } from "@/components/motion/tiltZoom";
import { Icon } from "@/components/ui/Icon";
import type { Outside, Suit } from "@/content/schema";
import { cn } from "@/lib/cn";
import { BlockHeader } from "./BlockHeader";

const columns: Record<number, string> = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" };

/** A few lines about life outside work, each led by a photo when there is one. Renders nothing while empty. */
export function OutsideWork({ outside, id = "outside", suit }: { outside?: Outside; id?: string; suit?: Suit }) {
  if (!outside?.items.length) return null;
  const { items } = outside;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="container-page section-y scroll-mt-(--nav-clear)">
      <BlockHeader id={`${id}-title`} title={outside.title} note={outside.note} suit={suit} />
      <ul className={cn("grid gap-3 md:gap-4", columns[items.length])}>
        {items.map((o, i) => {
          const badge = o.icon && (
            <span
              className={cn(
                "grid size-11 place-items-center rounded-inset border border-hairline bg-canvas text-ink",
                o.photo ? "absolute bottom-3 left-3" : "mb-5",
              )}
            >
              <Icon name={o.icon} />
            </span>
          );
          return (
            <Rise as="li" key={o.title} i={i} className="flex">
              <Tilt className={cn("card flex w-full flex-col rounded-card", o.photo ? "p-2.5 pb-6" : "p-6 md:p-7")}>
                {o.photo && (
                  <div className="core relative aspect-[4/5] overflow-hidden rounded-inset md:aspect-[4/3] lg:aspect-[4/5]">
                    <Picture
                      src={o.photo.src}
                      alt={o.photo.alt}
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                      className={cn("object-cover", tiltZoom)}
                      style={o.photo.focus ? { objectPosition: o.photo.focus } : undefined}
                    />
                    {badge}
                  </div>
                )}
                <div className={cn(o.photo && "px-3.5 pt-5")}>
                  {!o.photo && badge}
                  <h3 className="type-h3 text-ink">{o.title}</h3>
                  <p className="type-small mt-2">{o.text}</p>
                </div>
              </Tilt>
            </Rise>
          );
        })}
      </ul>
    </section>
  );
}
