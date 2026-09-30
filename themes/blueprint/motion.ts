import type { MotionTokens } from "../contract";

export const motion = {
  ease: [0.16, 1, 0.3, 1],
  spring: { type: "spring", stiffness: 70, damping: 20, mass: 1 },
  rise: { duration: 1.4, stagger: 0.1, delay: 0.08, y: 20, blur: 8, amount: 0.1 },
  hover: { duration: 1.2, scale: 1.025 },
  menu: { duration: 0.9, stagger: 0.09 },
  press: { scale: 0.98 },
  sheet: { type: "spring", stiffness: 160, damping: 26, mass: 1 },
  deal: { type: "spring", stiffness: 90, damping: 20, mass: 1, hold: 0.9, stagger: 0.1 },
  zoom: { open: 1.4, close: 1, flip: [0.65, 0, 0.35, 1] },
} satisfies MotionTokens;
