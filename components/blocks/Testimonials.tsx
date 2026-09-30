import { Rise } from "@/components/motion/Rise";
import { Icon } from "@/components/ui/Icon";
import type { Testimonials as TestimonialsData } from "@/content/schema";
import { cn } from "@/lib/cn";
import { BlockHeader } from "./BlockHeader";

/** Quotes from people who worked with the designer. Renders nothing while there are none. */
export function Testimonials({ testimonials }: { testimonials?: TestimonialsData }) {
  if (!testimonials?.items.length) return null;
  const { items } = testimonials;
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="container-page section-y">
      <BlockHeader id="testimonials-title" title={testimonials.title} />
      <ul className={cn("grid gap-3 md:gap-4", items.length > 1 && "md:grid-cols-2", items.length === 3 && "lg:grid-cols-3")}>
        {items.map((t, i) => (
          <Rise as="li" key={t.name} i={i} className="card rounded-card">
            <figure className="flex h-full flex-col p-6 md:p-7">
              <Icon name="quote" className="size-5 text-accent" />
              <blockquote className="type-quote mt-4 text-ink">
                <p>{t.quote}</p>
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-6">
                <span aria-hidden className="type-small grid size-9 shrink-0 place-items-center rounded-pill bg-skeleton text-ink">
                  {t.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <span>
                  <span className="type-small block text-ink">{t.name}</span>
                  <span className="type-caption block">
                    {t.role}, {t.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Rise>
        ))}
      </ul>
    </section>
  );
}
