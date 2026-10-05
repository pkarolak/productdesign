"use client";

import { motion } from "@theme/motion";
import { AnimatePresence, motion as m } from "motion/react";
import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/cn";

export type StoryOutline = { id: string; nav: string; steps: { id: string; nav: string }[] }[];

/** The reading line: whatever last crossed it is where the reader is. */
const LINE = 0.3;

/**
 * "On this page": every chapter, with the steps of the one in view. Tracks `[data-story]` anchors rendered by Story,
 * through an observer on the reading line, never a scroll listener.
 */
export function StoryNav({ outline, className }: { outline: StoryOutline; className?: string }) {
  const uid = useId();
  const [at, setAt] = useState<{ chapter: string; step?: string }>({ chapter: outline[0].id });

  useEffect(() => {
    const anchors = [...document.querySelectorAll<HTMLElement>("[data-story]")];
    const locate = () => {
      const line = window.innerHeight * LINE;
      let chapter = outline[0].id;
      let step: string | undefined;
      for (const el of anchors) {
        if (el.getBoundingClientRect().top > line) break;
        if (el.dataset.story === "chapter") {
          chapter = el.id;
          step = undefined;
        } else step = el.id;
      }
      setAt((cur) => (cur.chapter === chapter && cur.step === step ? cur : { chapter, step }));
    };
    const io = new IntersectionObserver(locate, {
      rootMargin: `-${LINE * 100}% 0px -${100 - LINE * 100}% 0px`,
    });
    anchors.forEach((el) => io.observe(el));
    locate();
    return () => io.disconnect();
  }, [outline]);

  return (
    <nav aria-label="On this page" className={cn("card rounded-card p-3", className)}>
      <p className="type-label px-3 pt-2 pb-3">On this page</p>
      <ol className="grid gap-0.5">
        {outline.map((c) => {
          const on = c.id === at.chapter;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={on && !at.step ? "location" : undefined}
                className={cn(
                  "focus-ring type-small relative isolate flex items-center gap-2.5 rounded-pill px-3 py-2 transition-colors duration-(--t-hover-short) ease-slow",
                  on ? "text-ink" : "hover:text-ink",
                )}
              >
                {on && (
                  <m.span
                    layoutId={`${uid}-chapter`}
                    transition={motion.spring}
                    className="absolute inset-0 -z-10 rounded-pill bg-skeleton"
                  />
                )}
                <span
                  aria-hidden
                  className={cn(
                    "size-1.5 shrink-0 rounded-full transition-colors duration-(--t-hover-short) ease-slow",
                    on ? "bg-accent" : "bg-hairline",
                  )}
                />
                {c.nav}
              </a>
              <AnimatePresence initial={false}>
                {on && c.steps.length > 0 && (
                  <m.ol
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.12 } }}
                    transition={{ duration: 0.35, ease: motion.ease }}
                    className="my-1 ml-[1.0625rem] grid border-l border-hairline"
                  >
                    {c.steps.map((s) => {
                      const here = s.id === at.step;
                      return (
                        <li key={s.id}>
                          <a
                            href={`#${s.id}`}
                            aria-current={here ? "location" : undefined}
                            className={cn(
                              "focus-ring type-small -ml-px block border-l py-1.5 pr-2 pl-4 transition-colors duration-(--t-hover-short) ease-slow",
                              here ? "border-ink font-medium text-ink" : "border-transparent hover:text-ink",
                            )}
                          >
                            {s.nav}
                          </a>
                        </li>
                      );
                    })}
                  </m.ol>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
