import Link from "next/link";
import { Rise } from "@/components/motion/Rise";
import { Icon } from "@/components/ui/Icon";
import type { Project } from "@/content/schema";
import { lock } from "@/app/locked/[slug]/actions";

export function NextCase({ next, showLock }: { next: Project; showLock: boolean }) {
  return (
    <section aria-label="Next case" className="container-page pb-(--section-y)">
      <Rise className="flex flex-wrap items-end justify-between gap-8 border-t border-hairline pt-12">
        <Link href={`/work/${next.slug}`} className="focus-ring group/n rounded-frame">
          <span className="type-small block">Next case</span>
          <span className="type-h2 mt-2 flex items-center gap-4 text-ink">
            {next.title}
            <span className="grid size-11 place-items-center rounded-pill bg-accent text-accent-ink transition-transform duration-(--t-hover-mid) ease-slow group-hover/n:translate-x-1">
              <Icon name="arrow-right" />
            </span>
          </span>
        </Link>
        {showLock && (
          <form action={lock}>
            <button
              type="submit"
              className="focus-ring type-small inline-flex cursor-pointer items-center gap-2 rounded-pill transition-colors duration-(--t-hover-short) ease-slow hover:text-ink"
            >
              <Icon name="lock" />
              Lock cases
            </button>
          </form>
        )}
      </Rise>
    </section>
  );
}
