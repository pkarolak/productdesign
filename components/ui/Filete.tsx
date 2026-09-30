import { cn } from "@/lib/cn";

/** A short accent hairline under a heading: the last trace of the sign painter's filete. */
export function Filete({ className }: { className?: string }) {
  return <span aria-hidden className={cn("block h-px w-6 bg-accent", className)} />;
}
