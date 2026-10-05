import Image from "next/image";
import type { ReactNode } from "react";
import { Asset } from "@/components/media/Asset";
import { CoverMorph } from "@/components/motion/PageTransition";
import { Rise } from "@/components/motion/Rise";
import { TiltIn } from "@/components/motion/TiltIn";
import type { Project } from "@/content/schema";

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="type-label">{label}</dt>
      <dd className="type-small mt-1.5 text-ink">{children}</dd>
    </div>
  );
}

/** The 30-second read: who and when, the title, the bottom line as a standfirst, the facts in a row, then the cover, then `children`. */
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
        <Rise as="p" i={2} className="type-standfirst mt-6 max-w-[46ch]">
          {project.bottomLine}
        </Rise>
        <Rise i={3} className="mt-12 md:mt-14">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-hairline pt-6 md:grid-cols-4">
            <Fact label="My role">{project.role}</Fact>
            <Fact label="Timeline">{project.timeline}</Fact>
            <Fact label="Team">{project.team}</Fact>
            <Fact label="Partners">{project.partners}</Fact>
          </dl>
        </Rise>
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
