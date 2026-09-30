"use client";

import { AnimatePresence, motion as m } from "motion/react";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { motion } from "@theme/motion";
import { Icon } from "@/components/ui/Icon";

type Toast = { id: number; message: string };

const ToastContext = createContext<(message: string) => void>(() => {});

/** Show a short confirmation, e.g. `toast("Email copied")`. Announced politely to screen readers. */
export const useToast = () => useContext(ToastContext);

let seq = 0;

export function Toaster({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string) => {
    const id = ++seq;
    setToasts((list) => [...list.slice(-2), { id, message }]);
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 2600);
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex flex-col items-center gap-2 px-(--gutter)"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <m.p
              key={t.id}
              layout
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={motion.sheet}
              className="sheet type-small flex items-center gap-2.5 rounded-pill py-2.5 pr-5 pl-4 text-ink"
            >
              <Icon name="check" className="size-4 text-accent" />
              {t.message}
            </m.p>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
