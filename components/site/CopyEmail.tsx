"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { useToast } from "./Toaster";

export function CopyEmail({ email, showAddress, className }: { email: string; showAddress?: boolean; className?: string }) {
  const toast = useToast();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2400);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <p className={cn("type-small flex flex-wrap items-center gap-x-3 gap-y-2", className)}>
      {showAddress && <span className="text-ink">{email}</span>}
      <button
        type="button"
        onClick={() =>
          navigator.clipboard.writeText(email).then(() => {
            setCopied(true);
            toast("Email copied");
          })
        }
        className="focus-ring press inline-flex cursor-pointer items-center gap-2 rounded-pill border border-hairline px-4 py-2 text-ink transition-colors duration-(--t-hover-short) ease-slow hover:border-ink-3"
      >
        <Icon name={copied ? "check" : "copy"} className="size-4" />
        {copied ? "Copied" : "Copy email"}
      </button>
    </p>
  );
}
