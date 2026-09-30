import type { ReactNode } from "react";
import { Rise } from "@/components/motion/Rise";
import { cn } from "@/lib/cn";

/**
 * Surfaces rise themselves (`rise` = stagger index) instead of being wrapped:
 * an animating ancestor would become the backdrop root and flatten the surface.
 */
export function Panel({
  className,
  children,
  rise,
}: {
  className?: string;
  children: ReactNode;
  rise?: number;
}) {
  const classes = cn("surface rounded-panel", className);
  if (rise === undefined) return <div className={classes}>{children}</div>;
  return (
    <Rise i={rise} className={classes}>
      {children}
    </Rise>
  );
}
