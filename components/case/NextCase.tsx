import Link from "next/link";
import { Rise } from "@/components/motion/Rise";
import { Icon } from "@/components/ui/Icon";
import type { Project } from "@/content/schema";

export function NextCase({ next }: { next: Project }) {
  return (
    <section aria-label="Next case" className="container-page pb-(--section-y)">
      <Rise className="border-t border-hairline pt-12">
        <Link href={`/work/${next.slug}`} className="focus-ring group/n inline-block rounded-frame">
          <span className="type-small block">Next case</span>
          <span className="type-h2 mt-2 flex items-center gap-4 text-ink">
            {next.title}
            <span className="grid size-11 place-items-center rounded-pill bg-accent text-accent-ink transition-transform duration-(--t-hover-mid) ease-slow group-hover/n:translate-x-1">
              <Icon name="arrow-right" />
            </span>
          </span>
        </Link>
      </Rise>
    </section>
  );
}
