import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/**
 * Protected media must skip the optimizer: it fetches without the visitor's
 * access cookie, so the proxy would answer 401.
 */
const isProtected = (src: string) => src.startsWith("/media/protected/");

export function Picture({
  src,
  srcDark,
  alt,
  sizes,
  priority,
  className,
  style,
  dim = true,
}: {
  src: string;
  srcDark?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Tone down a light-only image in dark mode. Off when the caller sets its own filter. */
  dim?: boolean;
}) {
  const light = (
    <Image
      fill
      src={src}
      alt={alt}
      sizes={sizes}
      preload={priority}
      unoptimized={isProtected(src)}
      style={style}
      className={cn(className, srcDark ? "dark:hidden" : dim && "media")}
    />
  );
  if (!srcDark) return light;
  return (
    <>
      {light}
      <Image
        fill
        src={srcDark}
        alt={alt}
        sizes={sizes}
        preload={priority}
        unoptimized={isProtected(srcDark)}
        style={style}
        className={cn(className, "hidden dark:block")}
      />
    </>
  );
}
