import type { Asset } from "@/content/schema";
import { cn } from "@/lib/cn";
import { assetImage } from "./Asset";
import { Picture } from "./Picture";
import { Video } from "./Video";

/** A case cover filling its positioned parent: the loop when there is one, else the cover image. Decorative. */
export function Cover({
  asset,
  sizes,
  play,
  className,
}: {
  asset: Asset;
  sizes: string;
  play?: "view" | "hover";
  className?: string;
}) {
  if (asset.kind === "video")
    return <Video src={asset.src} poster={asset.poster} dark={asset.dark} play={play} alt="" className={className} />;
  const src = assetImage(asset);
  if (!src) return <div className="wash absolute inset-0" />;
  return (
    <Picture
      src={src}
      srcDark={"srcDark" in asset ? asset.srcDark : undefined}
      alt=""
      sizes={sizes}
      className={cn("object-cover object-[0%_0%]", className)}
    />
  );
}
