import type { ReactNode } from "react";
import { Rise } from "@/components/motion/Rise";
import type { Project } from "@/content/schema";

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="type-label">{label}</dt>
      <dd className="type-body mt-2.5 text-ink">{children}</dd>
    </div>
  );
}

export function CaseFacts({ project }: { project: Project }) {
  return (
    <section aria-label="Role and scope" className="container-page py-16 md:py-20">
      <Rise>
        <div className="grid gap-8 border-y border-hairline py-10 md:grid-cols-12 md:gap-8">
          <dl className="grid gap-6 sm:grid-cols-3 md:col-span-7">
            <Fact label="Role">{project.role}</Fact>
            <Fact label="Team">{project.team}</Fact>
            <Fact label="Timeline">{project.timeline}</Fact>
          </dl>
          <dl className="grid gap-6 md:col-span-5">
            <Fact label="Partners">{project.partners}</Fact>
            <Fact label="Scope">{project.scope.join(", ")}</Fact>
          </dl>
        </div>
      </Rise>
    </section>
  );
}
