import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";
import { SmartLink, type TransitionType } from "./SmartLink";

/** A standalone text action with a trailing arrow. Inside running text, use the `link` utility instead. */
export function ArrowLink({
  href,
  children,
  className,
  transition,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  transition?: TransitionType;
}) {
  const external = href.startsWith("http");
  return (
    <SmartLink
      href={href}
      transition={transition}
      className={cn(
        "focus-ring group/al type-small inline-flex items-center gap-1.5 rounded-pill py-1 text-accent",
        className,
      )}
    >
      {children}
      <Icon
        name={external ? "arrow-up-right" : "arrow-right"}
        className="size-4 transition-transform duration-(--t-hover-mid) ease-slow group-hover/al:translate-x-0.5"
      />
    </SmartLink>
  );
}
