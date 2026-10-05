import Image from "next/image";
import type { ReactNode } from "react";
import { Asset } from "@/components/media/Asset";
import { CoverMorph } from "@/components/motion/PageTransition";
import { Rise } from "@/components/motion/Rise";
import { TiltIn } from "@/components/motion/TiltIn";
import type { Project } from "@/content/schema";

function Fact({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <dt className="type-label">{label}</dt>
      <dd className="type-small mt-1.5 text-ink">{children}</dd>
    </div>
  );
}

/** The 30-second read: who and when, the title, the bottom line beside the facts, then the cover, then `children`. */
export function CaseHeader({ project, logo, children }: { project: Project; logo?: string; children?: ReactNode }) {
  const loop = project.cover.kind === "video";
  return (
    <header className="pt-(--nav-clear) md:pt-36">
      <div className="container-page">
        <Rise as="p" i={0} className="type-small flex items-center gap-2.5">
          {logo && (
            <span className="grid size-7 shrink-0 place-items-center rounded-inset border border-hairline bg-canvas">
              <Image src={logo} alt="" width={16} height={16} className="size-4 object-contain" />
            </span>
          )}
          {project.company}, {project.year}
        </Rise>
        <Rise as="h1" i={1} className="type-display mt-5 max-w-[16ch] text-ink">
          {project.title}
        </Rise>
        <div className="mt-8 grid gap-10 md:mt-10 lg:grid-cols-12 lg:gap-8">
          <Rise as="p" i={2} className="type-bottomline max-w-[34ch] text-ink lg:col-span-7">
            {project.bottomLine}
          </Rise>
          <Rise i={3} className="self-end lg:col-span-4 lg:col-start-9">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-hairline pt-5">
              <Fact label="Role">{project.role}</Fact>
              <Fact label="Timeline">{project.timeline}</Fact>
              <Fact label="Team" className="col-span-2">
                {project.team}
              </Fact>
              <Fact label="Partners" className="col-span-2">
                {project.partners}
              </Fact>
            </dl>
          </Rise>
        </div>
      </div>
      <div className="container-page mt-12 md:mt-16">
        <TiltIn>
          <CoverMorph slug={project.slug}>
            <div>
              <Asset
                asset={project.cover}
                priority
                rise={4}
                aspect={loop ? "16/10" : "21/9"}
                sizes="(min-width: 1280px) 1200px, 100vw"
              />
            </div>
          </CoverMorph>
        </TiltIn>
      </div>
      {children && <div className="container-page mt-6 md:mt-8">{children}</div>}
    </header>
  );
}
