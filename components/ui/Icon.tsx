import { icons } from "@theme/icons";
import type { IconName } from "@/themes/contract";

export function Icon({
  name,
  size = "ui",
  className,
}: {
  name: IconName;
  size?: keyof typeof icons.size;
  className?: string;
}) {
  const Glyph = icons.set[name];
  return (
    <Glyph
      aria-hidden
      focusable={false}
      size={icons.size[size]}
      strokeWidth={icons.strokeWidth}
      className={className}
    />
  );
}
