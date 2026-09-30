import { Rise } from "@/components/motion/Rise";
import { Picture } from "@/components/media/Picture";
import { Frame } from "@/components/ui/Frame";
import { cn } from "@/lib/cn";
import type { SignatureProps } from "../contract";

const placement = [
  { top: 40, left: 70, z: 3 },
  { top: 250, left: 150, z: 2 },
  { top: 460, left: 230, z: 1 },
];

const skeletons = [
  { rows: ["100%", "60%"], tail: "80%" },
  { rows: ["100%", "70%"], tail: "50%" },
  { rows: ["100%", "45%"], tail: "65%" },
];

function Skeleton({ variant }: { variant: number }) {
  const s = skeletons[variant % skeletons.length];
  return (
    <div className="grid h-full grid-cols-[104px_1fr] gap-5 p-[26px]">
      <div>
        <span className="mb-4 block h-2.5 w-[56%] rounded-pill bg-accent opacity-90" />
        <span className="mb-4 block h-2.5 rounded-pill bg-skeleton" />
        <span className="mb-4 block h-2.5 rounded-pill bg-skeleton" />
        <span className="mb-4 block h-2.5 rounded-pill bg-skeleton" />
      </div>
      <div>
        {s.rows.map((w, i) => (
          <div key={i} className="mb-3.5 h-3 rounded-pill bg-skeleton" style={{ width: w }} />
        ))}
        <div className="wash core my-5 h-[118px] rounded-inset" />
        <div className="h-3 rounded-pill bg-skeleton" style={{ width: s.tail }} />
      </div>
    </div>
  );
}

const scales = {
  hero: { steps: "md:scale-[.62] lg:scale-[.8] xl:scale-100", xl: 1 },
  compact: { steps: "md:scale-[.5] lg:scale-[.6] xl:scale-[.78]", xl: 0.78 },
};

export function Signature({ plates, priority, className, rise, size = "hero" }: SignatureProps) {
  const count = Math.max(2, plates?.length ?? 0);
  const items = Array.from({ length: Math.min(count, 3) }, (_, i) => plates?.[i]);
  const first = plates?.[0];
  const height = items.length === 3 ? 850 : 640;
  const scale = scales[size];

  return (
    <div className={className}>
      <div
        className={cn("bp-stage relative hidden origin-top-left md:block", scale.steps)}
        style={{ height, marginBottom: height * (scale.xl - 1) }}
        aria-hidden={!first}
        role={first ? "img" : undefined}
        aria-label={first ? plates?.map((p) => p.alt).join(". ") : undefined}
      >
        <div className="bp-guide absolute z-10 w-0" style={{ left: 170, top: 250, height: 170 }} />
        <div className="bp-guide absolute z-10 w-0" style={{ left: 560, top: 200, height: 170 }} />
        <span className="bp-node absolute z-10 size-[7px] rounded-full" style={{ left: 167, top: 246 }} />
        <span className="bp-node absolute z-10 size-[7px] rounded-full" style={{ left: 557, top: 366 }} />
        {items.map((plate, i) => {
          const p = placement[i];
          const Shell = (rise === undefined ? "div" : Rise) as typeof Rise;
          return (
            <div
              key={i}
              data-phase={i}
              className="bp-plate absolute w-[500px]"
              style={{ top: p.top, left: p.left, zIndex: p.z }}
            >
            <Shell
              {...(rise === undefined ? {} : { i: rise + items.length - 1 - i })}
              className="surface rounded-plate p-(--frame-pad)"
            >
              <div className="core relative h-[300px] overflow-hidden rounded-plate-core">
                {plate ? (
                  <Picture
                    src={plate.src}
                    srcDark={plate.srcDark}
                    alt=""
                    sizes="500px"
                    priority={priority && i === 0}
                    className="object-cover object-top"
                  />
                ) : (
                  <Skeleton variant={i} />
                )}
              </div>
            </Shell>
            </div>
          );
        })}
      </div>
      <div className="md:hidden">
        <Frame rise={rise}>
          <div className="relative aspect-[16/10]">
            {first ? (
              <Picture
                src={first.src}
                srcDark={first.srcDark}
                alt={first.alt}
                sizes="100vw"
                priority={priority}
                className="object-cover object-top"
              />
            ) : (
              <Skeleton variant={0} />
            )}
          </div>
        </Frame>
      </div>
    </div>
  );
}
