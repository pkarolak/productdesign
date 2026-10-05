import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LockedNote, WorkTimeline } from "@/components/blocks/WorkTimeline";
import { PageTransition } from "@/components/motion/PageTransition";
import { Rise } from "@/components/motion/Rise";
import { Contact } from "@/components/site/Contact";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { organizations } from "@/lib/companies";

const { work } = site;
const { index } = work;

export const metadata: Metadata = {
  title: index?.title ?? work.more,
  description: index?.note ?? work.note,
};

/** Every case, for when home only has room for the featured ones. Lists covers only, like the home chapter. */
export default function Work() {
  if (projects.length <= work.featured) notFound();
  return (
    <PageTransition>
      <div>
        <header className="container-page pt-(--nav-clear) pb-10 md:pt-44 md:pb-12">
          <Rise as="p" className="type-label">
            {index?.eyebrow ?? work.title}
          </Rise>
          <Rise as="h1" i={1} className="type-display mt-3 max-w-[16ch] text-ink">
            {index?.title ?? work.more}
          </Rise>
          <Rise as="p" i={2} className="type-lede mt-4 max-w-[58ch]">
            {index ? (
              <>
                {index.note}{" "}
                <a href="#contact" className="focus-ring link rounded-pill">
                  {index.ask.link}
                </a>{" "}
                {index.ask.text}
              </>
            ) : (
              <>
                {work.note}
                <LockedNote projects={projects} />
              </>
            )}
          </Rise>
        </header>
        <WorkTimeline intro={work} projects={projects} orgs={organizations(site)} id="all-work" header={false} />
        <Contact site={site} />
      </div>
    </PageTransition>
  );
}
