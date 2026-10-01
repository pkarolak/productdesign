import type { ReactNode } from "react";
import { Picture } from "@/components/media/Picture";
import { Rise } from "@/components/motion/Rise";
import { Emphasis } from "@/components/ui/Emphasis";
import type { Site } from "@/content/schema";

/** The About opener: headline, one to three story paragraphs, an optional portrait and a slot below the story. */
export function StoryHeader({ about, children }: { about: Site["about"]; children?: ReactNode }) {
  const { portrait } = about;
  return (
    <section
      aria-labelledby="story-title"
      className="container-page grid gap-12 pt-(--nav-clear) pb-12 md:pt-44 md:pb-16 lg:grid-cols-12 lg:gap-8"
    >
      <div className={portrait ? "lg:col-span-7" : "lg:col-span-9"}>
        <Rise as="p" className="type-label">
          {about.title}
        </Rise>
        <Rise as="h1" id="story-title" i={1} className="type-display mt-3 max-w-[16ch] text-ink">
          <Emphasis text={about.headline} />
        </Rise>
        <div className="mt-8 grid max-w-[58ch] gap-5">
          {about.story.map((p, i) => (
            <Rise as="p" key={p} i={i + 2} className={i === 0 ? "type-lede" : "type-body text-ink-2"}>
              {p}
            </Rise>
          ))}
        </div>
        {children}
      </div>
      {portrait && (
        <Rise i={3} className="card self-start rounded-card p-(--frame-pad) lg:col-span-5">
          <div className="core relative aspect-[4/5] overflow-hidden rounded-inset">
            <Picture {...portrait} sizes="(min-width: 1024px) 40vw, 100vw" priority className="object-cover" />
          </div>
        </Rise>
      )}
    </section>
  );
}
