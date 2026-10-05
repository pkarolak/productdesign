import type { Site } from "@/content/schema";

export type Org = {
  logo?: string;
  from?: number;
  /** Undefined while any role there is current. */
  to?: number;
  current: boolean;
};

/** Each company's logo mark, from the hero intro, and its whole span across roles, from the journey. */
export function organizations(site: Pick<Site, "hero" | "journey">): Map<string, Org> {
  const orgs = new Map<string, Org>();
  const get = (name: string) => orgs.get(name) ?? orgs.set(name, { current: false }).get(name)!;
  for (const row of site.hero.intro) {
    for (const part of [...row.parts, ...(row.note ?? [])]) {
      if (typeof part === "object" && "pill" in part && part.logo) get(part.pill).logo = part.logo;
    }
  }
  for (const r of site.journey?.roles ?? []) {
    const org = get(r.company);
    if (r.logo && !org.logo) org.logo = r.logo;
    org.from = Math.min(org.from ?? r.from, r.from);
    if (r.to === undefined) org.current = true;
    else org.to = Math.max(org.to ?? r.to, r.to);
  }
  return orgs;
}

/** "2022 to now", "2021 to 2022", "2021". */
export function span(org: Org | undefined): string | undefined {
  if (org?.from === undefined) return undefined;
  if (org.current) return `${org.from} to now`;
  if (org.to === undefined || org.to === org.from) return String(org.from);
  return `${org.from} to ${org.to}`;
}
