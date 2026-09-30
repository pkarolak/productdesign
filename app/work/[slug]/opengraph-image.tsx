import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Case study preview";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) return renderOg({ eyebrow: site.name, title: "Case study", footer: site.role });
  return renderOg({
    eyebrow: `${project.title}, ${project.company} ${project.year}`,
    title: project.bottomLine,
    footer: site.name,
  });
}
