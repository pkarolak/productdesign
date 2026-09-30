import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LockFace } from "@/components/case/LockFace";
import { UnlockForm } from "@/components/case/UnlockForm";
import { PageTransition } from "@/components/motion/PageTransition";
import { Rise } from "@/components/motion/Rise";
import { Contact } from "@/components/site/Contact";
import { Icon } from "@/components/ui/Icon";
import { getProject, projects, protectedSlugs } from "@/content/projects";
import { site } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return protectedSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/locked/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.bottomLine,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

/** The public teaser served at /work/[slug] (via proxy.ts) until the visitor unlocks. Never render artifacts here. */
export default async function LockedCase({ params }: PageProps<"/locked/[slug]">) {
  const project = getProject((await params).slug);
  if (!project || project.access !== "protected") notFound();
  const open = projects.filter((p) => p.access === "public");

  return (
    <PageTransition>
      <div>
        <section aria-labelledby="locked-title" className="container-page pt-(--nav-clear) pb-(--section-y) md:pt-36">
          <div className="mx-auto max-w-[440px]">
            <Rise>
              <Link
                href="/#work"
                transitionTypes={["nav-back"]}
                className="focus-ring type-small group/back inline-flex items-center gap-1.5 rounded-pill py-2 transition-colors duration-(--t-hover-short) ease-slow hover:text-ink"
              >
                <Icon
                  name="arrow-right"
                  className="size-4 rotate-180 transition-transform duration-(--t-hover-mid) ease-slow group-hover/back:-translate-x-0.5"
                />
                All work
              </Link>
            </Rise>

            <Rise i={1} className="card mt-3 rounded-card px-6 pt-10 pb-6 text-center md:px-9">
              <LockFace className="mx-auto" />
              <h1 id="locked-title" className="type-h2 mt-7 text-ink">
                Password, please.
              </h1>
              <p className="type-small mx-auto mt-3 max-w-[34ch]">
                <span className="text-ink">{project.title}</span> for {project.company} is shared on request.
              </p>
              <div aria-hidden className="mx-auto my-7 h-px w-12 bg-hairline" />
              <UnlockForm slug={project.slug} stacked />
              <p className="type-small">
                No password?{" "}
                <a href="#contact" className="focus-ring link rounded-pill py-1">
                  Ask me for one
                </a>
              </p>
            </Rise>

            <Rise i={2} className="mt-10 text-center">
              <p className="type-label">
                The short version, {project.company}, {project.year}
              </p>
              <p className="type-body mx-auto mt-2 max-w-[44ch] text-ink-2">{project.bottomLine}</p>
              {open.length > 0 && (
                <p className="type-small mt-5">
                  Or read the open {open.length === 1 ? "case" : "cases"}:{" "}
                  {open.map((p, i) => (
                    <span key={p.slug}>
                      {i > 0 && ", "}
                      <Link
                        href={`/work/${p.slug}`}
                        transitionTypes={["nav-forward"]}
                        className="focus-ring link rounded-pill py-1"
                      >
                        {p.title}
                      </Link>
                    </span>
                  ))}
                </p>
              )}
            </Rise>
          </div>
        </section>
        <Contact site={site} />
      </div>
    </PageTransition>
  );
}
