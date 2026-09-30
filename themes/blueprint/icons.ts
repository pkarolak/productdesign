import {
  ArrowRight,
  ArrowUpRight,
  CircleAlert,
  Lock,
  LockOpen,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import type { IconTokens } from "../contract";

export const icons = {
  set: {
    "arrow-right": ArrowRight,
    "arrow-up-right": ArrowUpRight,
    sun: Sun,
    moon: Moon,
    lock: Lock,
    "lock-open": LockOpen,
    "circle-alert": CircleAlert,
    menu: Menu,
    x: X,
  },
  strokeWidth: 1.5,
  size: { ui: 18, nav: 20 },
} satisfies IconTokens;
