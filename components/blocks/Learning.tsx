import { Rise } from "@/components/motion/Rise";
import { Icon } from "@/components/ui/Icon";
import type { Education, Teaching } from "@/content/schema";
import type { IconName } from "@/themes/contract";

type Row = { key: string; title: string; detail: string; years: string };

function Column({ id, icon, title, rows, i }: { id: string; icon: IconName; title: string; rows: Row[]; i: number }) {
  return (
    <Rise i={i}>
      <div className="flex items-center gap-3">
        <span className="card grid size-12 place-items-center rounded-inset text-ink">
          <Icon name={icon} size="nav" />
        </span>
        <h2 id={id} className="type-h3 text-ink">
          {title}
        </h2>
      </div>
      <ul aria-labelledby={id} className="mt-6 border-t border-hairline">
        {rows.map((r) => (
          <li
            key={r.key}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-0.5 border-b border-hairline py-4"
          >
            <span className="type-body text-ink">{r.title}</span>
            <span className="type-caption text-ink-3 tabular-nums">{r.years}</span>
            <span className="type-small col-span-2">{r.detail}</span>
          </li>
        ))}
      </ul>
    </Rise>
  );
}

/** Where I learned and where I teach, side by side. Either column hides while empty. */
export function Learning({
  education,
  educationTitle,
  teaching,
}: {
  education: Education;
  educationTitle: string;
  teaching?: Teaching;
}) {
  const taught = teaching?.items ?? [];
  if (!education.length && !taught.length) return null;
  return (
    <section aria-label={[educationTitle, teaching?.title].filter(Boolean).join(" and ")} className="container-page section-y">
      <div className="grid gap-14 md:grid-cols-2 md:gap-8">
        {education.length > 0 && (
          <Column
            id="education-title"
            icon="graduation-cap"
            title={educationTitle}
            i={0}
            rows={education.map((e) => ({ key: `${e.school}-${e.degree}`, title: e.degree, detail: e.school, years: e.years }))}
          />
        )}
        {teaching && taught.length > 0 && (
          <Column
            id="teaching-title"
            icon="presentation"
            title={teaching.title}
            i={1}
            rows={taught.map((t) => ({ key: t.place, title: t.place, detail: t.role, years: t.years }))}
          />
        )}
      </div>
    </section>
  );
}
