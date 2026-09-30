import type { IconName } from "@/themes/contract";
import { Icon } from "./Icon";

/** A static status label, never an action. */
export function Chip({ children, icon }: { children: string; icon?: IconName }) {
  return (
    <span className="core type-small inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 leading-none text-ink-2">
      {icon && <Icon name={icon} className="size-3.5" />}
      {children}
    </span>
  );
}
