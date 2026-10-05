import type { Asset } from "@/content/schema";
import { cn } from "@/lib/cn";
import { assetImage } from "./Asset";
import { Picture } from "./Picture";
import { Video } from "./Video";

/** A case cover filling its positioned parent: the loop when there is one, else the cover image. Decorative. */
export function Cover({ asset, sizes, className }: { asset: Asset; sizes: string; className?: string }) {
  if (asset.kind === "video") return <Video src={asset.src} poster={asset.poster} alt="" className={className} />;
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
