import type { Door, DoorTarget, Site } from "@/content/schema";

/** Doors whose target block has content; a door into an empty block would lead nowhere. */
export function visibleDoors(site: Site, hasWork: boolean): Door[] {
  const filled: Record<DoorTarget, boolean> = {
    work: hasWork,
    showcase: !!site.showcase?.items.length,
    writing: !!site.writing?.items.length,
    about: true,
    contact: true,
  };
  return site.doors.filter((d) => filled[d.target]);
}
