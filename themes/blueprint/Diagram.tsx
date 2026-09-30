import type { DiagramProps } from "../contract";

const COS = 0.866;
const HALF = 80;
const SIDE = HALF * 2 * COS;
const THICK = 14;
const STEP = 72;
const CX = 210;

/** Isometric stacked layers, first layer at the bottom (DESIGN.md section 7, `diagram`). */
export function Diagram({ layers, alt }: DiagramProps) {
  const base = 150 + (layers.length - 1) * STEP;
  return (
    <svg viewBox={`0 0 640 ${base + HALF + THICK + 40}`} role="img" aria-label={alt} className="h-auto w-full">
      {layers.map((label, k) => {
        const y = base - k * STEP;
        const top = `${CX},${y - HALF} ${CX + SIDE / 2},${y} ${CX},${y + HALF} ${CX - SIDE / 2},${y}`;
        const left = `${CX - SIDE / 2},${y} ${CX},${y + HALF} ${CX},${y + HALF + THICK} ${CX - SIDE / 2},${y + THICK}`;
        const right = `${CX},${y + HALF} ${CX + SIDE / 2},${y} ${CX + SIDE / 2},${y + THICK} ${CX},${y + HALF + THICK}`;
        const isTop = k === layers.length - 1;
        return (
          <g key={label}>
            <polygon points={left} className="fill-core/40 stroke-accent" strokeWidth={1.25} strokeLinejoin="round" />
            <polygon points={right} className="fill-core/25 stroke-accent" strokeWidth={1.25} strokeLinejoin="round" />
            <polygon
              points={top}
              className={isTop ? "fill-accent/12 stroke-accent" : "fill-core/60 stroke-accent"}
              strokeWidth={1.25}
              strokeLinejoin="round"
            />
            <path
              d={`M${CX - SIDE / 2 + 18},${y - 2} L${CX - 12},${y - HALF + 14}`}
              className="stroke-canvas/80"
              strokeWidth={1.25}
              strokeLinecap="round"
            />
            <line
              x1={CX + SIDE / 2 + 10}
              y1={y}
              x2={452}
              y2={y}
              className="stroke-accent/60"
              strokeWidth={1}
              strokeDasharray="3 4"
            />
            <circle cx={456} cy={y} r={7} className="fill-accent/18" />
            <circle cx={456} cy={y} r={3.5} className="fill-accent" />
            <text x={474} y={y + 5} className="fill-ink font-display text-[17px] tracking-[-0.02em]">
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
