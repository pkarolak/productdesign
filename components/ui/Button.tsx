import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

const primary =
  "group/btn focus-ring inline-flex items-center gap-4 rounded-pill bg-ink py-[7px] pr-[7px] pl-[26px] text-base font-bold text-canvas shadow-button transition-transform duration-(--t-hover-short) ease-slow active:scale-[0.98]";

function Arrow() {
  return (
    <span className="grid size-[38px] place-items-center rounded-pill bg-accent text-accent-ink transition-transform duration-(--t-hover-mid) ease-slow group-hover/btn:translate-x-[3px] group-hover/btn:-translate-y-px group-hover/btn:scale-[1.06]">
      <Icon name="arrow-right" />
    </span>
  );
}

export function PrimaryLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cn(primary, className)}>
      {children}
      <Arrow />
    </Link>
  );
}

export function PrimaryButton({ children, className, ...props }: ComponentPropsWithoutRef<"button">) {
  return (
    <button className={cn(primary, "cursor-pointer disabled:cursor-wait disabled:opacity-80", className)} {...props}>
      {children}
      <Arrow />
    </button>
  );
}

export const ctaPill =
  "focus-ring inline-flex items-center justify-center rounded-pill bg-accent px-5 py-[11px] font-bold text-accent-ink shadow-cta transition-[filter] duration-(--t-hover-short) ease-slow hover:brightness-106";
