import { z } from "zod";
import { projectSchema, type Project } from "../schema";
import { accessibleByDefault } from "./accessible-by-default";
import { dispatchBoard } from "./dispatch-board";
import { keelDesignSystem } from "./keel-design-system";
import { runwayForecast } from "./runway-forecast";

/** Order matters: the first case is the lead cell on the home page. */
export const projects: Project[] = z
  .array(projectSchema)
  .length(4, "The home bento is designed for exactly 4 cases.")
  .refine((list) => new Set(list.map((p) => p.slug)).size === list.length, "Slugs must be unique.")
  .parse([keelDesignSystem, dispatchBoard, runwayForecast, accessibleByDefault]);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export const protectedSlugs = projects.filter((p) => p.access === "protected").map((p) => p.slug);
