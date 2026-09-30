import { Rise } from "@/components/motion/Rise";
import { Icon } from "@/components/ui/Icon";
import { SmartLink } from "@/components/ui/SmartLink";
import type { Door } from "@/content/schema";
import { cn } from "@/lib/cn";

/** Portal cards into the page's main blocks. Pass only doors whose target has content (see lib/blocks.ts). */
export function DoorCards({ doors }: { doors: Door[] }) {
  if (!doors.length) return null;
  return (
    <nav aria-label="Sections" className="container-page">
      <ul className={cn("grid gap-3 md:gap-4", doors.length === 3 ? "md:grid-cols-3" : doors.length === 2 && "md:grid-cols-2")}>
        {doors.map((d, i) => (
          <Rise as="li" key={d.href} i={i + 2} className="card rounded-card hover:surface-deep">
            <SmartLink
              href={d.href}
              transition={d.href.startsWith("/") ? "nav-forward" : undefined}
              className="focus-ring press group/door flex h-full flex-col rounded-card p-6 md:p-7"
            >
              <span className="type-label">{d.label}</span>
              <span className="type-h3 mt-2 max-w-[24ch] text-ink">{d.title}</span>
              <span className="type-small mt-auto flex items-center gap-1.5 pt-8 text-ink">
                {d.cta}
                <Icon
                  name="arrow-right"
                  className="size-4 transition-transform duration-(--t-hover-mid) ease-slow group-hover/door:translate-x-1"
                />
              </span>
            </SmartLink>
          </Rise>
        ))}
      </ul>
    </nav>
  );
}
