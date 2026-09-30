import { ViewTransition, type ReactNode } from "react";

const slide = { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" };

/** Wrap each page (not the layout): pages slide on links tagged nav-forward or nav-back. */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={slide} exit={slide} default="none">
      {children}
    </ViewTransition>
  );
}

/** A case cover that morphs between the work list and the case header. One per slug per page. */
export function CoverMorph({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <ViewTransition name={`cover-${slug}`} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
