import { Rise } from "@/components/motion/Rise";
import type { Project } from "@/content/schema";
import { WorkCard } from "./WorkCard";

const counts = ["None", "One", "Two", "Three", "All four"];

export function SelectedWork({ projects }: { projects: Project[] }) {
  const [lead, first, second, wide] = projects;
  const locked = projects.filter((p) => p.access === "protected").length;
  return (
    <section id="work" aria-labelledby="work-title" className="container-page section-y">
      <div className="mb-14 md:mb-20">
        <Rise as="h2" id="work-title" className="type-h2 max-w-[14ch] text-ink">
          Selected <em>work</em>
        </Rise>
        <Rise as="p" i={1} className="type-lede mt-4 max-w-[52ch]">
          Four cases, each readable in half a minute.
          {locked > 0 && (
            <>
              {" "}
              {counts[locked]} {locked === 1 ? "is" : "are"} password protected;{" "}
              <a href="#contact" className="focus-ring link rounded-pill">
                ask me for access
              </a>
              .
            </>
          )}
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
