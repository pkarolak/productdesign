import { cn } from "@/lib/cn";

/** A sign-painter's flourish: a filete line with a scroll at each end and a small leaf in the middle. */
export function Filete({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 16"
      aria-hidden
      className={cn(
        "h-4 w-30 fill-none stroke-current text-accent [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.3]",
        className,
      )}
    >
      <path d="M53 8H25c-6 0-8.6-3.8-6.6-6.2 1.9-2.2 5.8-.9 5.1 2" />
      <path d="M67 8h28c6 0 8.6-3.8 6.6-6.2-1.9-2.2-5.8-.9-5.1 2" />
      <path d="M36 8c-3.2 0-5.2 2.6-3.8 4.7 1.2 1.7 3.8.9 3.4-1.1" />
      <path d="M84 8c3.2 0 5.2 2.6 3.8 4.7-1.2 1.7-3.8.9-3.4-1.1" />
      <path d="M60 4.2 63.6 8 60 11.8 56.4 8Z" className="fill-current stroke-none" />
    </svg>
  );
}
