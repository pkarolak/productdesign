"use client";

import { useSyncExternalStore } from "react";
import type { Hero } from "@/content/schema";

export type Daytime = Hero["intro"][number]["icon"];

/** The intro's time of day, shared by the day switch, the hero light and the face-card deck. */
let state: { time: Daytime; stopped: boolean } = { time: "sun", stopped: false };
const listeners = new Set<() => void>();
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const server = { time: "sun" as Daytime, stopped: false };

/** `stop` ends the day switch's autoplay for good: set when a visitor picks a time themselves. */
export function setDaytime(time: Daytime, stop = false) {
  if (time === state.time && (!stop || state.stopped)) return;
  state = { time, stopped: state.stopped || stop };
  listeners.forEach((l) => l());
}

export function useDaytime() {
  return useSyncExternalStore(subscribe, () => state, () => server);
}
