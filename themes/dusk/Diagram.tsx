import type { DiagramProps } from "../contract";

const ROW = 64;
const GAP = 14;

/** Flat layered bars, first layer at the bottom and widest. */
export function Diagram({ layers, alt }: DiagramProps) {
  const height = layers.length * ROW + (layers.length - 1) * GAP;
  return (
    <svg viewBox={`0 0 640 ${height}`} role="img" aria-label={alt} className="size-full">
      {layers.map((label, k) => {
        const row = layers.length - 1 - k;
        const inset = k * 28;
        const y = row * (ROW + GAP);
        const isTop = k === layers.length - 1;
        return (
          <g key={label}>
            <rect
              x={inset}
              y={y}
              width={640 - inset * 2}
              height={ROW}
              rx={14}
              className={isTop ? "fill-accent/14 stroke-accent/60" : "fill-core stroke-hairline"}
              strokeWidth={1}
            />
            <circle cx={inset + 30} cy={y + ROW / 2} r={4} className={isTop ? "fill-accent" : "fill-ink-3"} />
            <text x={inset + 48} y={y + ROW / 2 + 6} className="fill-ink font-display text-[18px] tracking-[-0.015em]">
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
