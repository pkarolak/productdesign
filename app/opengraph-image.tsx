import { plain } from "@/components/ui/Emphasis";
import { site } from "@/content/site";
import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = `${site.name}, ${site.role}`;

export default function Image() {
  return renderOg({ eyebrow: site.name, title: plain(site.hero.headline), footer: site.role });
}
