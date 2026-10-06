import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Artifacts } from "@/components/case/Artifacts";
import { AskMeAbout } from "@/components/case/AskMeAbout";
import { Beats } from "@/components/case/Beats";
import { CaseHeader } from "@/components/case/CaseHeader";
import { Decisions } from "@/components/case/Decisions";
import { NextCase } from "@/components/case/NextCase";
import { Story } from "@/components/case/Story";
import { PageTransition } from "@/components/motion/PageTransition";
import { Contact } from "@/components/site/Contact";
import { MetricsPanel } from "@/components/ui/MetricsPanel";
import { getProject, nextProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { organizations } from "@/lib/companies";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.bottomLine,
    robots: project.access === "protected" ? { index: false, follow: false } : undefined,
  };
}

export default async function CasePage({ params }: PageProps<"/work/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  return (
    <PageTransition>
      <div>
        <article>
          <CaseHeader project={project} logo={organizations(site).get(project.company)?.logo}>
            <MetricsPanel metrics={project.metrics} rise={5} />
          </CaseHeader>
          {project.story ? (
            <Story chapters={project.story} />
          ) : (
            <>
              <Beats beats={project.beats} />
              <Artifacts artifacts={project.artifacts} />
            </>
          )}
          <Decisions decisions={project.decisions} />
          <AskMeAbout prompts={project.askMeAbout} />
          <NextCase next={nextProject(project.slug)} />
        </article>
        <Contact site={site} />
      </div>
    </PageTransition>
  );
}
