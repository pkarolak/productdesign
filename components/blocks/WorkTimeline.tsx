import Link from "next/link";
import { assetImage } from "@/components/media/Asset";
import { Picture } from "@/components/media/Picture";
import { CoverMorph } from "@/components/motion/PageTransition";
import { Rise } from "@/components/motion/Rise";
import { Icon } from "@/components/ui/Icon";
import type { Project, WorkIntro } from "@/content/schema";
import { BlockHeader } from "./BlockHeader";

const counts = ["None", "One", "Two", "Three", "All four", "All five", "All six"];

function Row({ project, i }: { project: Project; i: number }) {
  const image = assetImage(project.cover);
  const locked = project.access === "protected";
  return (
    <Rise as="li" i={i} className="card rounded-card hover:surface-deep">
      <Link
        href={`/work/${project.slug}`}
        transitionTypes={["nav-forward"]}
        className="focus-ring press group/row grid grid-cols-[88px_minmax(0,1fr)] items-center gap-4 rounded-card p-3 md:grid-cols-[168px_minmax(0,1fr)_auto] md:gap-6 md:pr-6"
      >
        <CoverMorph slug={project.slug}>
          <div className="core relative aspect-[16/10] overflow-hidden rounded-inset">
            {image ? (
              <Picture
                src={image}
                alt=""
                sizes="168px"
                className="object-cover object-[0%_0%] transition-transform duration-(--t-hover) ease-slow group-hover/row:scale-[1.04]"
              />
            ) : (
              <div className="wash absolute inset-0" />
            )}
          </div>
        </CoverMorph>
        <span className="min-w-0">
          <span className="type-h3 block text-ink">{project.title}</span>
          <span className="type-small mt-1 line-clamp-2 block">{project.bottomLine}</span>
          <span className="type-caption mt-1 block text-ink-3">{project.company}</span>
        </span>
        <span className="type-small col-span-2 flex items-center gap-1.5 px-1 md:col-span-1 md:px-0">
          {locked ? (
            <>
              <Icon name="lock" className="size-4 text-ink-3" />
              <span>Password protected</span>
            </>
          ) : (
            <span className="flex items-center gap-1.5 text-accent">
              Read case
              <Icon
                name="arrow-right"
                className="size-4 transition-transform duration-(--t-hover-mid) ease-slow group-hover/row:translate-x-1"
              />
            </span>
          )}
        </span>
      </Link>
    </Rise>
  );
}

/** Cases grouped by year, newest first, each row opening the case with a cover morph. */
export function WorkTimeline({ intro, projects }: { intro: WorkIntro; projects: Project[] }) {
  if (!projects.length) return null;
  const years = [...new Set(projects.map((p) => p.year))].sort((a, b) => b - a);
  const locked = projects.filter((p) => p.access === "protected").length;
  return (
    <section id="work" aria-labelledby="work-title" className="container-page section-y">
      <BlockHeader
        id="work-title"
        title={intro.title}
        note={
          <>
            {intro.note}
            {locked > 0 && (
              <>
                {" "}
                {counts[locked] ?? locked} {locked === 1 ? "is" : "are"} password protected;{" "}
                <a href="#contact" className="focus-ring link rounded-pill">
                  ask me for access
                </a>
                .
              </>
            )}
          </>
        }
      />
      <div className="grid gap-8 md:gap-6">
        {years.map((year) => (
          <div key={year} className="grid gap-3 md:grid-cols-[112px_minmax(0,1fr)] md:gap-6">
            <Rise as="h3" className="type-h3 pt-1 text-ink-3 tabular-nums md:pt-4">
              {year}
            </Rise>
            <ul className="grid gap-3">
              {projects
                .filter((p) => p.year === year)
                .map((p, i) => (
                  <Row key={p.slug} project={p} i={i} />
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
