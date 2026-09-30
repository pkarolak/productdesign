"use client";

import { useTheme } from "next-themes";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className, quiet }: { className?: string; quiet?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "focus-ring grid size-9 cursor-pointer place-items-center rounded-pill transition-colors duration-(--t-hover-short) ease-slow hover:text-ink",
        quiet ? "text-ink-3" : "text-ink-2",
        className,
      )}
    >
      <Icon name="moon" size="nav" className="block dark:hidden" />
      <Icon name="sun" size="nav" className="hidden dark:block" />
    </button>
  );
}
