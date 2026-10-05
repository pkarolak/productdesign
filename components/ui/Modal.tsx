"use client";

import { AnimatePresence, motion as m } from "motion/react";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { motion } from "@theme/motion";
import { cn } from "@/lib/cn";

/**
 * A native modal <dialog>: the browser traps focus, closes on Escape and restores focus on close.
 * The panel animates out before the dialog closes. With `layoutId`, it morphs from the element sharing that id.
 */
export function Modal({
  open,
  onClose,
  labelledBy,
  placement = "sheet",
  layoutId,
  initialFocus,
  className,
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  /** "sheet": bottom sheet on mobile, centred panel from md. "palette": near the top, for the command menu; its children lay out as a column and scroll themselves. */
  placement?: "sheet" | "palette";
  layoutId?: string;
  initialFocus?: RefObject<HTMLElement | null>;
  className?: string;
  children: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);

  if (open && !mounted) setMounted(true);

  useEffect(() => {
    const d = dialog.current;
    if (!mounted || !d || d.open) return;
    d.showModal();
    document.documentElement.style.overflow = "hidden";
    initialFocus?.current?.focus();
  }, [mounted, initialFocus]);

  useEffect(() => () => void (document.documentElement.style.overflow = ""), []);

  const finish = () => {
    dialog.current?.close();
    document.documentElement.style.overflow = "";
    setMounted(false);
  };

  return (
    <dialog
      ref={dialog}
      aria-labelledby={labelledBy}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      className={cn(
        "fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden bg-transparent p-0 text-ink backdrop:bg-transparent open:flex open:justify-center",
        placement === "sheet" ? "p-2 open:items-end md:p-6 md:open:items-center" : "px-4 pt-[12vh] open:items-start",
      )}
    >
      <AnimatePresence onExitComplete={finish}>
        {open && (
          <m.div
            key="scrim"
            aria-hidden
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-canvas/75"
          />
        )}
        {open && (
          <m.div
            key="panel"
            layoutId={layoutId}
            initial={layoutId ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={layoutId ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={motion.sheet}
            style={{ borderRadius: "var(--r-sheet)" }}
            className={cn(
              "sheet relative z-10 w-full overscroll-contain",
              placement === "sheet"
                ? "max-h-[88dvh] overflow-y-auto md:max-w-[560px]"
                : "flex max-h-[min(76dvh,640px)] max-w-[680px] flex-col overflow-hidden",
              className,
            )}
          >
            {children}
          </m.div>
        )}
      </AnimatePresence>
    </dialog>
  );
}
