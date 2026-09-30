"use client";

import { useTheme } from "next-themes";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "focus-ring grid size-9 cursor-pointer place-items-center rounded-pill text-ink-2 transition-colors duration-(--t-hover-short) ease-slow hover:text-ink",
        className,
      )}
    >
      <Icon name="moon" size="nav" className="block dark:hidden" />
      <Icon name="sun" size="nav" className="hidden dark:block" />
    </button>
  );
}
