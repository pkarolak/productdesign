import { Rise } from "@/components/motion/Rise";
import { IconTile } from "@/components/ui/IconTile";
import type { Tint } from "@/components/ui/Suit";
import type { Education, Teaching } from "@/content/schema";
import type { IconName } from "@/themes/contract";

type Row = { key: string; title: string; detail: string; years: string };

function Column({ id, icon, tint, title, rows, i }: { id: string; icon: IconName; tint: Tint; title: string; rows: Row[]; i: number }) {
  return (
    <Rise i={i}>
      <div className="flex items-center gap-3">
        <IconTile icon={icon} tint={tint} />
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
            tint="blue"
            title={educationTitle}
            i={0}
            rows={education.map((e) => ({ key: `${e.school}-${e.degree}`, title: e.degree, detail: e.school, years: e.years }))}
          />
        )}
        {teaching && taught.length > 0 && (
          <Column
            id="teaching-title"
            icon="presentation"
            tint="green"
            title={teaching.title}
            i={1}
            rows={taught.map((t) => ({ key: t.place, title: t.place, detail: t.role, years: t.years }))}
          />
        )}
      </div>
    </section>
  );
}
