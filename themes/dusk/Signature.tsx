import { Picture } from "@/components/media/Picture";
import { Frame } from "@/components/ui/Frame";
import { cn } from "@/lib/cn";
import type { SignatureProps } from "../contract";

/** A quiet stack: the first plate in front, the second peeking behind it. */
export function Signature({ plates, priority, className, rise, size = "hero" }: SignatureProps) {
  const [front, back] = plates ?? [];
  return (
    <div
      className={cn("relative", size === "hero" ? "pt-[7%] pr-[6%]" : "pt-[6%] pr-[5%]", className)}
      role={front ? "img" : undefined}
      aria-label={front ? plates?.map((p) => p.alt).join(". ") : undefined}
      aria-hidden={front ? undefined : true}
    >
      {back && (
        <div aria-hidden className="dk-stack-back surface absolute inset-0 overflow-hidden rounded-frame">
          <Picture src={back.src} srcDark={back.srcDark} alt="" sizes="40vw" className="object-cover object-[0%_0%]" />
        </div>
      )}
      <Frame rise={rise} className="relative">
        <div className="relative aspect-[16/10]">
          {front ? (
            <Picture
              src={front.src}
              srcDark={front.srcDark}
              alt=""
              sizes={size === "hero" ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 40vw, 100vw"}
              priority={priority}
              className="object-cover object-[0%_0%]"
            />
          ) : (
            <div className="wash absolute inset-0" />
          )}
        </div>
      </Frame>
    </div>
  );
}
