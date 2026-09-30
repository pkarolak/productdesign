"use client";

import { useActionState, useEffect } from "react";
import { unlock, type UnlockState } from "@/app/locked/[slug]/actions";
import { PrimaryButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { UNLOCK_FAILED } from "./LockFace";

export function UnlockForm({ slug, stacked }: { slug: string; stacked?: boolean }) {
  const [state, action, pending] = useActionState<UnlockState, FormData>(unlock, {});

  useEffect(() => {
    if (state.error) window.dispatchEvent(new Event(UNLOCK_FAILED));
  }, [state]);

  return (
    <form action={action} className="flex flex-col gap-3 text-left">
      <input type="hidden" name="slug" value={slug} />
      <label htmlFor="password" className="type-label">
        Password
      </label>
      <div className={cn("flex flex-col gap-3", !stacked && "sm:flex-row sm:items-center")}>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "unlock-error" : undefined}
          className={cn(
            "core h-[52px] w-full min-w-0 shrink-0 rounded-pill px-6 text-ink outline-none placeholder:text-ink-3 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent",
            !stacked && "sm:flex-1",
          )}
        />
        <PrimaryButton
          type="submit"
          disabled={pending}
          className={stacked ? "w-full justify-between" : "justify-between sm:justify-start"}
        >
          {pending ? "Checking" : "Unlock"}
        </PrimaryButton>
      </div>
      <p id="unlock-error" role="alert" aria-live="polite" className="min-h-6 text-ink">
        {state.error && (
          <span className="type-small inline-flex items-center gap-2 text-ink">
            <span className="text-accent">
              <Icon name="circle-alert" />
            </span>
            {state.error}
          </span>
        )}
      </p>
    </form>
  );
}
