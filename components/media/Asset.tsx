import { Diagram } from "@theme/Diagram";
import { Signature } from "@theme/Signature";
import type { Asset as AssetData } from "@/content/schema";
import { Frame } from "@/components/ui/Frame";
import { cn } from "@/lib/cn";
import { Compare } from "./Compare";
import { Picture } from "./Picture";
import { Video } from "./Video";

const defaults: Record<AssetData["kind"], string> = {
  screenshot: "16/10",
  isometric: "16/10",
  mobile: "4/3",
  photo: "4/3",
  diagram: "16/10",
  compare: "16/10",
  video: "16/9",
};

const phoneOffsets = ["translate-y-0", "translate-y-6", "translate-y-3", "translate-y-6"];

export function Asset({
  asset,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  priority,
  rise,
  aspect,
  className,
  flatIsometric,
  compact,
}: {
  asset: AssetData;
  sizes?: string;
  priority?: boolean;
  rise?: number;
  /** Overrides the asset's own ratio, e.g. "4/3" or "auto" to fill the parent. */
  aspect?: string;
  className?: string;
  /** Render isometric plates as a flat screenshot, e.g. inside a small card. */
  flatIsometric?: boolean;
  /** Isometric only: size the signature for a narrow column. */
  compact?: boolean;
}) {
  if (asset.kind === "isometric" && !flatIsometric) {
    return (
      <Signature
        plates={asset.plates}
        priority={priority}
        rise={rise}
        size={compact ? "compact" : "hero"}
        className={className}
      />
    );
  }

  const ratio = aspect ?? ("ratio" in asset && asset.ratio ? asset.ratio : defaults[asset.kind]);
  const box = cn("relative w-full", ratio === "auto" && "h-full");
  const style = ratio === "auto" ? undefined : { aspectRatio: ratio };

  return (
    <Frame rise={rise} className={cn(ratio === "auto" && "h-full", className)} coreClassName={cn(ratio === "auto" && "h-full")}>
      <div className={box} style={style}>
        {asset.kind === "isometric" && (
          <div className="wash absolute inset-0 overflow-hidden">
            {asset.plates.slice(0, 2).map((plate, i) => (
              <div
                key={plate.src}
                className={cn(
                  "absolute aspect-video w-[78%] overflow-hidden rounded-inset shadow-raised ring-1 ring-hairline",
                  asset.plates.length === 1
                    ? "top-1/2 left-1/2 -translate-1/2"
                    : i === 0
                      ? "top-[9%] left-[7%] z-10"
                      : "right-[7%] bottom-[9%]",
                )}
              >
                <Picture {...plate} sizes={sizes} priority={priority && i === 0} className="object-cover object-top" />
              </div>
            ))}
          </div>
        )}

        {asset.kind === "screenshot" && (
          <div className="wash absolute inset-0">
            <div className="absolute inset-x-[7%] top-[9%] bottom-0 overflow-hidden rounded-t-inset shadow-raised">
              <Picture
                src={asset.src}
                srcDark={asset.srcDark}
                alt={asset.alt}
                sizes={sizes}
                priority={priority}
                className="object-cover object-top"
              />
              {asset.annotations?.map((a, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="absolute grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent/18"
                  style={{ left: `${a.x}%`, top: `${a.y}%` }}
                >
                  <span className="size-2 rounded-full bg-accent" />
                </span>
              ))}
            </div>
          </div>
        )}

        {asset.kind === "mobile" && (
          <div className="wash absolute inset-0 flex items-start justify-center gap-[4%] px-[6%] pt-[7%]">
            {asset.screens.map((s, i) => (
              <div
                key={s.src}
                className={cn(
                  "relative aspect-[9/19.5] w-[26%] shrink-0 overflow-hidden rounded-phone shadow-raised ring-1 ring-hairline",
                  phoneOffsets[i],
                )}
              >
                <Picture {...s} sizes="(min-width: 1024px) 18vw, 30vw" priority={priority} className="object-cover object-top" />
              </div>
            ))}
          </div>
        )}

        {asset.kind === "photo" && (
          <>
            <Picture
              src={asset.src}
              srcDark={asset.srcDark}
              alt={asset.alt}
              sizes={sizes}
              priority={priority}
              className="object-cover saturate-[.88]"
            />
            <div aria-hidden className="absolute inset-0 bg-accent/4" />
          </>
        )}

        {asset.kind === "diagram" && (
          <div className="wash absolute inset-0 grid place-items-center p-[6%]">
            <Diagram layers={asset.layers} alt={asset.alt} />
          </div>
        )}

        {asset.kind === "compare" && <Compare before={asset.before} after={asset.after} sizes={sizes} />}

        {asset.kind === "video" && <Video src={asset.src} poster={asset.poster} alt={asset.alt} />}
      </div>
    </Frame>
  );
}

export function assetAlt(asset: AssetData) {
  switch (asset.kind) {
    case "isometric":
      return asset.plates[0].alt;
    case "mobile":
      return asset.screens[0].alt;
    case "compare":
      return asset.after.alt;
    default:
      return asset.alt;
  }
}

export function assetImage(asset: AssetData) {
  switch (asset.kind) {
    case "isometric":
      return asset.plates[0].src;
    case "mobile":
      return asset.screens[0].src;
    case "compare":
      return asset.after.src;
    case "video":
      return asset.poster;
    case "diagram":
      return undefined;
    default:
      return asset.src;
  }
}
