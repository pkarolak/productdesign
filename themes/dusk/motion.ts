import type { MotionTokens } from "../contract";

export const motion = {
  ease: [0.22, 1, 0.36, 1],
  spring: { type: "spring", stiffness: 260, damping: 30, mass: 1 },
  rise: { duration: 0.8, stagger: 0.06, delay: 0.04, y: 12, blur: 4, amount: 0.15 },
  hover: { duration: 0.5, scale: 1.015 },
  menu: { duration: 0.5, stagger: 0.05 },
  press: { scale: 0.97 },
  sheet: { type: "spring", stiffness: 380, damping: 36, mass: 1 },
  deal: { type: "spring", stiffness: 140, damping: 20, mass: 1, hold: 0.6, stagger: 0.07 },
  zoom: { open: 1.1, close: 0.8, flip: [0.65, 0, 0.35, 1] },
} satisfies MotionTokens;
