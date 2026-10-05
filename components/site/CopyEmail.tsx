"use client";

import { useEffect, useState } from "react";
import { SecondaryButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { useToast } from "./Toaster";

export function CopyEmail({
  email,
  showAddress,
  size = "compact",
  className,
}: {
  email: string;
  showAddress?: boolean;
  size?: "default" | "compact";
  className?: string;
}) {
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
      <SecondaryButton
        size={size}
        onClick={() =>
          navigator.clipboard.writeText(email).then(() => {
            setCopied(true);
            toast("Email copied");
          })
        }
      >
        <Icon name={copied ? "check" : "copy"} className="size-4" />
        {copied ? "Copied" : "Copy email"}
      </SecondaryButton>
    </p>
  );
}
