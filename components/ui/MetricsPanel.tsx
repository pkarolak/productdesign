import type { Metric } from "@/content/schema";
import { cn } from "@/lib/cn";
import { Panel } from "./Panel";

export function MetricValue({ metric, className }: { metric: Metric; className?: string }) {
  return (
    <b className={cn("type-metric block text-ink", className)}>
      {metric.value}
      {metric.unit ? <sup>{metric.unit}</sup> : null}
    </b>
  );
}

export function MetricsPanel({
  metrics,
  className,
  rise,
}: {
  metrics: Metric[];
  className?: string;
  rise?: number;
}) {
  return (
    <Panel rise={rise} className={cn("px-8 py-7", className)}>
      <dl
        className={cn(
          "grid gap-0 md:gap-7",
          metrics.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2",
        )}
      >
        {metrics.map((m) => (
          <div
            key={m.label}
            className="flex flex-col-reverse border-hairline py-4 first:pt-0 last:pb-0 max-md:not-last:border-b md:py-0"
          >
            <dd className="type-small mt-2.5">
              {m.label}
              <span className="block">{m.context}</span>
            </dd>
            <dt>
              <MetricValue metric={m} />
            </dt>
          </div>
        ))}
      </dl>
    </Panel>
  );
}
