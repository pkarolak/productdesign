"use client";

import { animate, motion as m, useMotionValue, useReducedMotion, useSpring, type MotionValue } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export const UNLOCK_FAILED = "unlock:failed";

const VIEW = { w: 200, h: 184 };
const EYES = [
  { cx: 78, cy: 118 },
  { cx: 122, cy: 118 },
];
const REACH = 6.5;
const SPRING = { stiffness: 300, damping: 26, mass: 0.6 };

function Eye({ cx, cy, x, y, closed }: { cx: number; cy: number; x: MotionValue<number>; y: MotionValue<number>; closed: boolean }) {
  return (
    <m.g
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
      animate={{ scaleY: closed ? 0.12 : 1 }}
      transition={{ duration: 0.14, ease: "easeOut" }}
    >
      <circle cx={cx} cy={cy} r={17} className="fill-canvas" />
      <m.g style={{ x, y }}>
        <circle cx={cx} cy={cy - 2} r={4.5} className="fill-ink" />
        <path d={`M${cx - 2.6} ${cy} h5.2 l1.4 9 h-8 z`} className="fill-ink" />
      </m.g>
    </m.g>
  );
}

/** A lock whose keyhole eyes follow the pointer, look at the password field, shut while you type and shake on a wrong password. */
export function LockFace({ className, inputId = "password" }: { className?: string; inputId?: string }) {
  const svg = useRef<SVGSVGElement>(null);
  const reduce = useReducedMotion();
  const lx = useMotionValue(0);
  const ly = useMotionValue(0);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const slx = useSpring(lx, SPRING);
  const sly = useSpring(ly, SPRING);
  const srx = useSpring(rx, SPRING);
  const sry = useSpring(ry, SPRING);
  const raw = useMemo(() => [[lx, ly], [rx, ry]] as const, [lx, ly, rx, ry]);
  const eyes = useMemo(() => [[slx, sly], [srx, sry]] as const, [slx, sly, srx, sry]);
  const shake = useMotionValue(0);
  const [blink, setBlink] = useState(false);
  const [typing, setTyping] = useState(false);
  const [sad, setSad] = useState(false);

  useEffect(() => {
    const el = svg.current;
    if (!el) return;

    const lookAt = (px: number, py: number) => {
      const box = el.getBoundingClientRect();
      const scale = box.width / VIEW.w;
      EYES.forEach((e, i) => {
        const dx = px - (box.left + e.cx * scale);
        const dy = py - (box.top + e.cy * scale);
        const dist = Math.hypot(dx, dy) || 1;
        const reach = Math.min(1, dist / 220) * REACH;
        const tx = (dx / dist) * reach;
        const ty = (dy / dist) * reach;
        if (reduce) {
          eyes[i][0].jump(tx);
          eyes[i][1].jump(ty);
        } else {
          raw[i][0].set(tx);
          raw[i][1].set(ty);
        }
      });
    };
    const lookAtInput = () => {
      const input = document.getElementById(inputId);
      if (!input) return;
      const r = input.getBoundingClientRect();
      lookAt(r.left + Math.min(r.width * 0.3, 120), r.top + r.height / 2);
    };

    let quiet: ReturnType<typeof setTimeout> | undefined;
    const onMove = (e: PointerEvent) => lookAt(e.clientX, e.clientY);
    const onFocus = (e: FocusEvent) => (e.target as HTMLElement)?.id === inputId && lookAtInput();
    const onInput = (e: Event) => {
      if ((e.target as HTMLElement)?.id !== inputId) return;
      setTyping(true);
      clearTimeout(quiet);
      quiet = setTimeout(() => setTyping(false), 700);
    };
    const onFail = () => {
      setSad(true);
      setTimeout(() => setSad(false), 1600);
      if (!reduce) animate(shake, [0, -9, 8, -6, 4, 0], { duration: 0.5, ease: "easeInOut" });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("focusin", onFocus);
    document.addEventListener("input", onInput);
    window.addEventListener(UNLOCK_FAILED, onFail);
    return () => {
      clearTimeout(quiet);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("input", onInput);
      window.removeEventListener(UNLOCK_FAILED, onFail);
    };
  }, [eyes, raw, inputId, reduce, shake]);

  useEffect(() => {
    if (reduce) return;
    let t: ReturnType<typeof setTimeout>;
    const next = () => {
      t = setTimeout(() => {
        setBlink(true);
        t = setTimeout(() => {
          setBlink(false);
          next();
        }, 140);
      }, 2600 + Math.random() * 3200);
    };
    next();
    return () => clearTimeout(t);
  }, [reduce]);

  const closed = blink || typing;

  return (
    <m.svg
      ref={svg}
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      aria-hidden
      style={{ x: shake }}
      className={cn("block h-auto w-[168px] overflow-visible", className)}
    >
      <path d="M68 86 V58 a32 32 0 0 1 64 0 V86" strokeWidth={13} strokeLinecap="round" className="fill-none stroke-accent" />
      <g transform="rotate(-4 100 124)">
        <rect x={32} y={74} width={136} height={100} rx={24} className="fill-ink" />
        {EYES.map((e, i) => (
          <Eye key={i} cx={e.cx} cy={e.cy} x={eyes[i][0]} y={eyes[i][1]} closed={closed} />
        ))}
        <m.path
          initial={false}
          animate={{ d: sad ? "M92 156 q8 -6 16 0" : typing ? "M93 152 h14" : "M93 150 q7 7 14 0" }}
          transition={{ duration: 0.2 }}
          strokeWidth={3.5}
          strokeLinecap="round"
          className="fill-none stroke-canvas"
        />
      </g>
    </m.svg>
  );
}
