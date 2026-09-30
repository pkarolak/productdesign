import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

type Size = "default" | "compact";

const base =
  "group/btn focus-ring inline-flex items-center rounded-pill bg-ink font-bold text-canvas transition-transform duration-(--t-hover-short) ease-slow active:scale-[0.98]";

const sizes: Record<Size, { button: string; arrow: string }> = {
  default: { button: "gap-4 py-[7px] pr-[7px] pl-[26px] text-base shadow-button", arrow: "size-[38px]" },
  compact: { button: "gap-3 py-[5px] pr-[5px] pl-5 text-[15px]", arrow: "size-[34px]" },
};

function Arrow({ size }: { size: Size }) {
  return (
    <span
      className={cn(
        "grid place-items-center rounded-pill bg-accent text-accent-ink transition-transform duration-(--t-hover-mid) ease-slow group-hover/btn:translate-x-[3px] group-hover/btn:-translate-y-px group-hover/btn:scale-[1.06]",
        sizes[size].arrow,
      )}
    >
      <Icon name="arrow-right" />
    </span>
  );
}

/** The one primary action style. Links to in-page anchors and mailto: render a plain anchor. */
export function PrimaryLink({
  href,
  children,
  className,
  size = "default",
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  size?: Size;
  onClick?: () => void;
}) {
  const classes = cn(base, sizes[size].button, className);
  const content = (
    <>
      {children}
      <Arrow size={size} />
    </>
  );
  if (href.startsWith("#") || href.startsWith("mailto:")) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={classes}>
      {content}
    </Link>
  );
}

export function PrimaryButton({
  children,
  className,
  size = "default",
  ...props
}: ComponentPropsWithoutRef<"button"> & { size?: Size }) {
  return (
    <button
      className={cn(base, sizes[size].button, "cursor-pointer disabled:cursor-wait", className)}
      {...props}
    >
      {children}
      <Arrow size={size} />
    </button>
  );
}
