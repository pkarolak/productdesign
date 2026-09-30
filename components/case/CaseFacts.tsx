import { Rise } from "@/components/motion/Rise";
import { Chip } from "@/components/ui/Chip";
import type { Project } from "@/content/schema";

export function CaseFacts({ project }: { project: Project }) {
  const facts = [
    { label: "Role", value: project.role },
    { label: "Team", value: project.team },
    { label: "Timeline", value: project.timeline },
  ];
  return (
    <section aria-label="Role and scope" className="container-page py-16 md:py-20">
      <Rise className="grid gap-8 border-y border-hairline py-10 md:grid-cols-12 md:gap-8">
        <dl className="grid gap-6 sm:grid-cols-3 md:col-span-7">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="type-label">{f.label}</dt>
              <dd className="type-body mt-2.5 text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="md:col-span-5">
          <p className="type-body text-ink-2">{project.partners}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Scope">
            {project.scope.map((s) => (
              <li key={s}>
                <Chip>{s}</Chip>
              </li>
            ))}
          </ul>
        </div>
      </Rise>
    </section>
  );
}
