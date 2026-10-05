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

/** The one primary action style. In-page anchors, mailto: and downloads render a plain anchor. */
export function PrimaryLink({
  href,
  children,
  className,
  size = "default",
  onClick,
  download,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  size?: Size;
  onClick?: () => void;
  /** A file to save, such as a PDF. */
  download?: boolean;
}) {
  const classes = cn(base, sizes[size].button, className);
  const content = (
    <>
      {children}
      <Arrow size={size} />
    </>
  );
  if (download || href.startsWith("#") || href.startsWith("mailto:")) {
    return (
      <a href={href} onClick={onClick} download={download || undefined} className={classes}>
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

const secondaryBase =
  "focus-ring press inline-flex cursor-pointer items-center rounded-pill border border-hairline text-ink transition-colors duration-(--t-hover-short) ease-slow hover:border-ink-3";

/** Heights match the primary sizes, so the two sit level in a row. */
const secondarySizes: Record<Size, string> = {
  default: "h-[52px] gap-2 px-6 text-base",
  compact: "h-11 gap-2 px-5 text-[15px]",
};

export const secondaryClass = (size: Size = "default", className?: string) =>
  cn(secondaryBase, secondarySizes[size], className);

/** The one secondary action style: an outlined pill, for actions beside or below a primary one. */
export function SecondaryButton({
  children,
  className,
  size = "default",
  type = "button",
  ...props
}: ComponentPropsWithoutRef<"button"> & { size?: Size }) {
  return (
    <button type={type} className={secondaryClass(size, className)} {...props}>
      {children}
    </button>
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
