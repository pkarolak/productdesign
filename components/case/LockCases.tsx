import { lock } from "@/app/locked/[slug]/actions";
import { Icon } from "@/components/ui/Icon";

/** Status plus the way back: shown on protected cases the visitor has unlocked. */
export function LockCases() {
  return (
    <form action={lock} className="type-small flex items-center gap-2">
      <Icon name="lock-open" className="size-3.5 text-accent" />
      <span>Unlocked</span>
      <span aria-hidden>·</span>
      <button type="submit" className="focus-ring link cursor-pointer rounded-pill py-1">
        Lock cases
      </button>
    </form>
  );
}
