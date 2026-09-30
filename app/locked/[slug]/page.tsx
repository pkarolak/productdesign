import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseHeader } from "@/components/case/CaseHeader";
import { UnlockForm } from "@/components/case/UnlockForm";
import { Rise } from "@/components/motion/Rise";
import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { MetricValue } from "@/components/ui/MetricsPanel";
import { Panel } from "@/components/ui/Panel";
import { getProject, projects, protectedSlugs } from "@/content/projects";

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
  const metric = project.metrics[0];
  const open = projects.filter((p) => p.access === "public");

  return (
    <CaseHeader project={project} status={<Chip icon="lock">Password protected</Chip>}>
      <div className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-8">
      <Rise i={3} className="flex items-end gap-4 pb-8">
        <MetricValue metric={metric} />
        <p className="type-small pb-0.5">
          {metric.label}
          <span className="block">{metric.context}</span>
        </p>
      </Rise>
      <Panel rise={4} className="w-full max-w-[460px] p-7 md:p-8">
        <p className="type-body mb-6 flex items-center gap-2.5 text-ink">
          <span className="text-accent">
            <Icon name="lock" />
          </span>
          The full case is password protected.
        </p>
        <UnlockForm slug={project.slug} />
        <p className="type-small mt-1">
          No password?{" "}
          <a href="#contact" className="focus-ring link rounded-pill py-1">
            Ask me for one
          </a>
        </p>
        {open.length > 0 && (
          <p className="type-small mt-3 border-t border-hairline pt-4">
            Or read the open {open.length === 1 ? "case" : "cases"}:{" "}
            {open.map((p, i) => (
              <span key={p.slug}>
                {i > 0 && ", "}
                <Link href={`/work/${p.slug}`} className="focus-ring link rounded-pill py-1">
                  {p.title}
                </Link>
              </span>
            ))}
          </p>
        )}
      </Panel>
      </div>
    </CaseHeader>
  );
}
