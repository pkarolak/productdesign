import Link from "next/link";
import { assetImage } from "@/components/media/Asset";
import { Picture } from "@/components/media/Picture";
import { CoverMorph } from "@/components/motion/PageTransition";
import { Rise } from "@/components/motion/Rise";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Icon } from "@/components/ui/Icon";
import type { Project, Suit, WorkIntro } from "@/content/schema";
import { BlockHeader } from "./BlockHeader";

const counts = ["None", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"];

/** "Three are password protected; ask me for access." Nothing when every case is public. */
export function LockedNote({ projects }: { projects: Project[] }) {
  const locked = projects.filter((p) => p.access === "protected").length;
  if (!locked) return null;
  const count = counts[locked] ?? String(locked);
  const all = locked === projects.length && locked > 1;
  return (
    <>
      {" "}
      {all ? `All ${count.toLowerCase()}` : count} {locked === 1 ? "is" : "are"} password protected;{" "}
      <a href="#contact" className="focus-ring link rounded-pill">
        ask me for access
      </a>
      .
    </>
  );
}

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

/**
 * Cases grouped by year, newest first, each row opening the case with a cover morph. Only covers show, which are
 * public, so the list is safe for locked cases. With `featured`, it shows the first `intro.featured` cases and links
 * to the full index when there are more.
 */
export function WorkTimeline({
  intro,
  projects: all,
  suit,
  id = "work",
  featured = false,
  header = true,
}: {
  intro: WorkIntro;
  projects: Project[];
  suit?: Suit;
  id?: string;
  featured?: boolean;
  /** Off where the page supplies its own heading. */
  header?: boolean;
}) {
  if (!all.length) return null;
  const projects = featured ? all.slice(0, intro.featured) : all;
  const more = featured && all.length > projects.length;
  const years = [...new Set(projects.map((p) => p.year))].sort((a, b) => b - a);
  return (
    <section
      id={id}
      aria-labelledby={header ? `${id}-title` : undefined}
      aria-label={header ? undefined : intro.title}
      className={header ? "container-page section-y scroll-mt-(--nav-clear)" : "container-page pb-(--section-y)"}
    >
      {header && (
        <BlockHeader
          id={`${id}-title`}
          title={intro.title}
          suit={suit}
          note={
            <>
              {intro.note}
              <LockedNote projects={all} />
            </>
          }
        />
      )}
      <div className="grid gap-8 md:gap-6">
        {years.map((year) => (
          <div key={year} className="grid gap-3 md:grid-cols-[112px_minmax(0,1fr)] md:gap-6">
            <Rise as={header ? "h3" : "h2"} className="type-h3 pt-1 text-ink-3 tabular-nums md:pt-4">
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
      {more && (
        <Rise className="mt-8 md:pl-[136px]">
          <ArrowLink href="/work" transition="nav-forward">
            {intro.more}
          </ArrowLink>
        </Rise>
      )}
    </section>
  );
}
