import type { ReactNode } from "react";
import { Asset } from "@/components/media/Asset";
import { CoverMorph } from "@/components/motion/PageTransition";
import { Rise } from "@/components/motion/Rise";
import type { Project } from "@/content/schema";

/** Shared by the full case and the locked teaser, so both lead with the bottom line. */
export function CaseHeader({
  project,
  status,
  children,
}: {
  project: Project;
  /** Shown beside the company and year, e.g. the unlocked state. */
  status?: ReactNode;
  children: ReactNode;
}) {
  return (
    <header className="container-page grid items-center gap-12 pt-(--nav-clear) pb-16 md:pt-36 lg:min-h-[92dvh] lg:grid-cols-12 lg:gap-8 lg:pb-8">
      <div className="lg:col-span-7">
        <Rise i={0} className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <p className="type-small">
            {project.company}, {project.year}
          </p>
          {status}
        </Rise>
        <Rise as="h1" i={1} className="type-h3 mt-2 text-ink">
          {project.title}
        </Rise>
        <Rise as="p" i={2} className="type-bottomline mt-6 max-w-[28ch] text-ink">
          {project.bottomLine}
        </Rise>
        {children}
      </div>
      <div className="lg:col-span-5">
        <CoverMorph slug={project.slug}>
          <div>
            <Asset
              asset={project.cover}
              compact
              priority
              rise={3}
              aspect={project.cover.kind === "mobile" ? "4/5" : "4/3"}
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </CoverMorph>
      </div>
    </header>
  );
}
