"use client";

import { useEffect, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2400);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <p className="type-small flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="text-ink">{email}</span>
      <button
        type="button"
        onClick={() => navigator.clipboard.writeText(email).then(() => setCopied(true))}
        className="focus-ring link cursor-pointer rounded-pill py-1"
      >
        {copied ? "Copied" : "Copy address"}
      </button>
      <span role="status" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </p>
  );
}
