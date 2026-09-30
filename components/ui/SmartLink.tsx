import Link from "next/link";
import type { ReactNode } from "react";

export type TransitionType = "nav-forward" | "nav-back";

const external = (href: string) => /^(https?:|mailto:)/.test(href);

/** Anchors, mailto: and external URLs render a plain <a>; app routes use next/link with an optional slide. */
export function SmartLink({
  href,
  className,
  children,
  transition,
  onClick,
  "aria-label": ariaLabel,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  transition?: TransitionType;
  onClick?: () => void;
  "aria-label"?: string;
}) {
  if (href.startsWith("#") || external(href)) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        aria-label={ariaLabel}
        {...(newTab ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      transitionTypes={transition ? [transition] : undefined}
    >
      {children}
    </Link>
  );
}
