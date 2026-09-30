import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Artifacts } from "@/components/case/Artifacts";
import { AskMeAbout } from "@/components/case/AskMeAbout";
import { Beats } from "@/components/case/Beats";
import { CaseFacts } from "@/components/case/CaseFacts";
import { CaseHeader } from "@/components/case/CaseHeader";
import { NextCase } from "@/components/case/NextCase";
import { MetricsPanel } from "@/components/ui/MetricsPanel";
import { getProject, nextProject, projects } from "@/content/projects";

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
    <article>
      <CaseHeader project={project}>
        <MetricsPanel metrics={project.metrics} rise={3} className="mt-12 max-w-[640px]" />
      </CaseHeader>
      <CaseFacts project={project} />
      <Beats beats={project.beats} />
      <Artifacts artifacts={project.artifacts} />
      <AskMeAbout prompts={project.askMeAbout} />
      <NextCase next={nextProject(project.slug)} showLock={project.access === "protected"} />
    </article>
  );
}
