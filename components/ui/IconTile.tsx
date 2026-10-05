import type { IconName } from "@/themes/contract";
import { Icon } from "./Icon";
import type { Tint } from "./Suit";

export const tints: Tint[] = ["blue", "violet", "green", "amber", "rose"];

/** A glyph on a tile washed in one hue (`icon-tint`). */
export function IconTile({ icon, tint }: { icon: IconName; tint: Tint }) {
  return (
    <span data-tint={tint} className="icon-tint grid size-12 shrink-0 place-items-center rounded-inset">
      <Icon name={icon} size="nav" />
    </span>
  );
}
