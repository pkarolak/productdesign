import { Rise } from "@/components/motion/Rise";
import type { Education as EducationData } from "@/content/schema";

/** A compact list of schools. Renders nothing while empty. */
export function Education({ education, title, i = 0 }: { education: EducationData; title: string; i?: number }) {
  if (!education.length) return null;
  return (
    <Rise i={i} className="mt-10">
      <h2 className="type-label mb-3">{title}</h2>
      <ul className="grid gap-3">
        {education.map((e) => (
          <li key={e.school} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-0.5">
            <span className="type-body text-ink">{e.school}</span>
            <span className="type-caption text-ink-3 tabular-nums">{e.years}</span>
            <span className="type-small col-span-2">{e.degree}</span>
          </li>
        ))}
      </ul>
    </Rise>
  );
}
