import type { ReactNode } from "react";
import { Rise } from "@/components/motion/Rise";
import { cn } from "@/lib/cn";

/** Media frame: a raised shell around an inset core. `rise` works as in Panel. */
export function Frame({
  children,
  className,
  coreClassName,
  rise,
}: {
  children: ReactNode;
  className?: string;
  coreClassName?: string;
  rise?: number;
}) {
  const classes = cn(
    "surface rounded-frame p-(--frame-pad) transition-shadow duration-(--t-hover) ease-slow",
    className,
  );
  const core = <div className={cn("core relative overflow-hidden rounded-frame-core", coreClassName)}>{children}</div>;
  if (rise === undefined) return <div className={classes}>{core}</div>;
  return (
    <Rise i={rise} className={classes}>
      {core}
    </Rise>
  );
}
