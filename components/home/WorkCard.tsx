import Link from "next/link";
import { Asset } from "@/components/media/Asset";
import { Rise } from "@/components/motion/Rise";
import { Icon } from "@/components/ui/Icon";
import { MetricValue } from "@/components/ui/MetricsPanel";
import type { Project } from "@/content/schema";
import { cn } from "@/lib/cn";

const hoverMedia =
  "group-hover:surface-deep [&_img]:transition-transform [&_img]:duration-(--t-hover) [&_img]:ease-slow group-hover:[&_img]:scale-[1.025]";

function Meta({ project, lead }: { project: Project; lead?: boolean }) {
  const metric = project.metrics[0];
  return (
    <div className="mt-6 flex items-start justify-between gap-6">
      <div>
        <p className="type-small">
          {project.company}, {project.year}
        </p>
        <h3 className="type-h3 mt-1.5 flex items-center gap-2 text-ink">
          {project.title}
          {project.access === "protected" && (
            <span className="text-ink-3">
              <Icon name="lock" />
              <span className="sr-only">(password protected)</span>
            </span>
          )}
        </h3>
        <p className="type-body mt-2.5 max-w-[54ch] text-ink-2">{project.bottomLine}</p>
        {lead && (
          <div className="mt-6 flex items-end gap-4 border-t border-hairline pt-6">
            <MetricValue metric={metric} />
            <p className="type-small pb-0.5">
              {metric.label}
              <span className="block">{metric.context}</span>
            </p>
          </div>
        )}
      </div>
      <span
        aria-hidden
        className="mt-1 grid size-10 shrink-0 place-items-center rounded-pill border border-hairline text-ink opacity-0 transition-[opacity,transform] duration-(--t-hover-mid) ease-slow group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <Icon name="arrow-up-right" />
      </span>
    </div>
  );
}

export function WorkCard({
  project,
  variant,
  i,
  className,
}: {
  project: Project;
  variant: "lead" | "companion" | "wide";
  i: number;
  className?: string;
}) {
  const href = `/work/${project.slug}`;

  if (variant === "wide") {
    return (
      <article className={cn("group relative", className)}>
        <Link href={href} className="focus-ring grid gap-7 rounded-frame lg:grid-cols-12 lg:items-end">
          <div className="lg:order-last lg:col-span-8">
            <Asset asset={project.cover} flatIsometric aspect="2/1" rise={i} sizes="(min-width: 1024px) 66vw, 100vw" className={hoverMedia} />
          </div>
          <Rise i={i + 1} className="lg:col-span-4 lg:pb-2">
            <Meta project={project} />
          </Rise>
        </Link>
      </article>
    );
  }

  return (
    <article className={cn("group relative", className)}>
      <Link href={href} className="focus-ring flex h-full flex-col rounded-frame">
        <div className={cn(variant === "lead" && "min-h-[360px] flex-1")}>
          <Asset
            asset={project.cover}
            flatIsometric
            aspect={variant === "lead" ? "auto" : "16/10"}
            rise={i}
            priority={variant === "lead"}
            sizes={variant === "lead" ? "(min-width: 1024px) 56vw, 100vw" : "(min-width: 1024px) 40vw, 100vw"}
            className={cn(hoverMedia, variant === "lead" && "min-h-[360px]")}
          />
        </div>
        <Rise i={i + 1}>
          <Meta project={project} lead={variant === "lead"} />
        </Rise>
      </Link>
    </article>
  );
}
