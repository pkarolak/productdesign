import { z } from "zod";
import { projectSchema, type Project } from "../schema";
import { contentExplorer } from "./content-explorer";
import { dataAccessManagement } from "./data-access-management";
import { egnyteProductPlatform } from "./egnyte-product-platform";
import { merchantEconomicTools } from "./merchant-economic-tools";
import { miroAnalytics } from "./miro-analytics";
import { miroEnterpriseGuard } from "./miro-enterprise-guard";

/** Order matters: home shows the first `site.work.featured` cases. */
export const projects: Project[] = z
  .array(projectSchema)
  .length(6)
  .refine((list) => new Set(list.map((p) => p.slug)).size === list.length, "Slugs must be unique.")
  .parse([contentExplorer, miroAnalytics, miroEnterpriseGuard, merchantEconomicTools, egnyteProductPlatform, dataAccessManagement]);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export const protectedSlugs = projects.filter((p) => p.access === "protected").map((p) => p.slug);
