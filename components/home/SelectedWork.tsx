import { Rise } from "@/components/motion/Rise";
import type { Project } from "@/content/schema";
import { WorkCard } from "./WorkCard";

export function SelectedWork({ projects }: { projects: Project[] }) {
  const [lead, first, second, wide] = projects;
  return (
    <section id="work" aria-labelledby="work-title" className="container-page section-y">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
        <Rise as="h2" id="work-title" className="type-h2 max-w-[14ch] text-ink">
          Selected <em>work</em>
        </Rise>
        <Rise as="p" i={1} className="type-caption max-w-[34ch]">
          Four cases, each readable in half a minute. The longer story is best told in person.
        </Rise>
      </div>
      <div className="grid gap-x-7 gap-y-16 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
        <WorkCard project={lead} variant="lead" i={0} className="lg:col-span-7 lg:row-span-2" />
        <WorkCard project={first} variant="companion" i={1} className="lg:col-span-5" />
        <WorkCard project={second} variant="companion" i={2} className="lg:col-span-5" />
        <WorkCard project={wide} variant="wide" i={1} className="lg:col-span-12 lg:mt-8" />
      </div>
    </section>
  );
}
