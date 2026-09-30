import type { Metadata } from "next";
import { Approach } from "@/components/home/Approach";
import { Picture } from "@/components/media/Picture";
import { Rise } from "@/components/motion/Rise";
import { Emphasis } from "@/components/ui/Emphasis";
import { Panel } from "@/components/ui/Panel";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: site.about.bio.split(". ")[0] + ".",
};

export default function About() {
  const { about } = site;
  return (
    <>
      <section className="container-page grid items-center gap-12 pt-(--nav-clear) pb-16 md:pt-44 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <Rise as="p" className="type-small">
            About
          </Rise>
          <Rise as="h1" i={1} className="type-display mt-3 max-w-[13ch] text-ink">
            <Emphasis text={about.headline} />
          </Rise>
          <Rise as="p" i={2} className="type-lede mt-8 max-w-[52ch]">
            {about.bio}
          </Rise>
        </div>
        <div className="lg:col-span-5">
          <Panel rise={3} className="p-(--frame-pad)">
            <div className="core relative aspect-[4/5] overflow-hidden rounded-inset">
              <Picture {...about.portrait} sizes="(min-width: 1024px) 40vw, 100vw" priority className="object-cover saturate-[.88]" />
            </div>
          </Panel>
        </div>
      </section>

      <section aria-labelledby="experience-title" className="container-page py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Rise as="h2" id="experience-title" className="type-h2 text-ink lg:col-span-4">
            Experience
          </Rise>
          <ol className="lg:col-span-8">
            {about.experience.map((e, i) => (
              <Rise
                as="li"
                key={`${e.company}-${e.years}`}
                i={i}
                className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-t border-hairline py-6 first:border-t-0 first:pt-0 md:grid-cols-[1.2fr_1fr_auto]"
              >
                <span className="type-h3 text-ink">{e.company}</span>
                <span className="type-body text-ink-2 max-md:order-last max-md:col-span-2">{e.role}</span>
                <span className="type-small self-center tabular-nums">{e.years}</span>
              </Rise>
            ))}
          </ol>
        </div>
      </section>

      <Approach principles={site.approach} projects={projects} long />
    </>
  );
}
