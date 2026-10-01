import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

/** Protected cases are listed because their URL serves only the public teaser until unlocked. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/about`, priority: 0.6 },
    ...(projects.length > site.work.featured ? [{ url: `${site.url}/work`, priority: 0.7 }] : []),
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}`, priority: 0.8 })),
  ];
}
