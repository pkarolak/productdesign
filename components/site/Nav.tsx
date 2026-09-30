"use client";

import { AnimatePresence, motion as m, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "@theme/motion";
import { PrimaryLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { openCommandMenu } from "./CommandMenu";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/#work", label: "Work", match: (p: string) => p.startsWith("/work") || p.startsWith("/locked") },
  { href: "/about", label: "About", match: (p: string) => p === "/about" },
];

export function Nav({ name }: { name: string }) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstItem = useRef<HTMLAnchorElement>(null);
  const { rise, ease, spring } = motion;

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 80));
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const behind = Array.from(document.querySelectorAll<HTMLElement>("body > main, body > section, body > footer"));
    root.style.overflow = "hidden";
    behind.forEach((el) => (el.inert = true));
    firstItem.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      behind.forEach((el) => (el.inert = false));
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <m.nav
        aria-label="Primary"
        data-rise=""
        initial={{ opacity: 0, y: rise.y, filter: `blur(${rise.blur}px)` }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: scrolled ? 0.985 : 1 }}
        transition={{
          default: { duration: rise.duration, ease, delay: rise.delay },
          scale: spring,
        }}
        data-scrolled={scrolled}
        style={{ viewTransitionName: "site-header" }}
        className="surface-strong fixed inset-x-0 top-(--nav-top) z-50 mx-auto flex w-max items-center gap-[30px] rounded-pill py-[6px] pr-[6px] pl-[26px] text-[15px] transition-shadow duration-(--t-hover) ease-slow data-[scrolled=true]:surface-deep"
      >
        <Link href="/" transitionTypes={["nav-back"]} className="focus-ring type-wordmark rounded-pill text-ink">
          {name}
        </Link>
        <span aria-hidden className="divider hidden h-[18px] md:block" />
        {links.map((l) => {
          const active = l.match(pathname);
          return (
            <Link
              key={l.href}
              href={l.href}
              transitionTypes={[l.href === "/about" ? "nav-forward" : "nav-back"]}
              aria-current={active ? "page" : undefined}
              className={cn(
                "focus-ring relative hidden rounded-pill text-ink-2 transition-colors duration-(--t-hover-short) ease-slow hover:text-ink md:block",
                active && "text-ink",
              )}
            >
              {l.label}
              {active && (
                <span aria-hidden className="absolute -bottom-2.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent" />
              )}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={openCommandMenu}
          aria-label="Open command menu"
          aria-keyshortcuts="Meta+K Control+K"
          className="focus-ring press -mx-3 flex h-10 cursor-pointer items-center gap-1.5 rounded-pill px-3 text-ink-2 transition-colors duration-(--t-hover-short) ease-slow hover:text-ink max-md:hidden"
        >
          <Icon name="command" className="size-4" />
          <span aria-hidden className="type-caption">K</span>
        </button>
        <ThemeToggle className="-mx-3 max-md:hidden" />
        <PrimaryLink href="#contact" size="compact" className="max-md:hidden">
          Get in touch
        </PrimaryLink>
        <button
          ref={menuButton}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
          className="focus-ring relative -ml-3 grid size-10 cursor-pointer place-items-center rounded-pill text-ink md:hidden"
        >
          <m.span
            className="absolute h-px w-4 bg-current"
            animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3 }}
            transition={spring}
          />
          <m.span
            className="absolute h-px w-4 bg-current"
            animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 3 }}
            transition={spring}
          />
        </button>
      </m.nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            key="sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motion.menu.duration * 0.6, ease }}
            className="surface-sheet fixed inset-0 z-40 flex flex-col px-(--gutter) pt-36 pb-10 md:hidden"
          >
            <ul className="flex flex-col gap-3">
              {links.map((l, i) => (
                <m.li
                  key={l.href}
                  initial={{ opacity: 0, y: rise.y }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: motion.menu.duration, ease, delay: 0.1 + i * motion.menu.stagger }}
                >
                  <Link
                    ref={i === 0 ? firstItem : undefined}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="focus-ring type-menu block rounded-pill py-1 text-ink"
                  >
                    {l.label}
                  </Link>
                </m.li>
              ))}
            </ul>
            <m.div
              initial={{ opacity: 0, y: rise.y }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motion.menu.duration, ease, delay: 0.1 + links.length * motion.menu.stagger }}
              className="mt-8 flex items-center gap-3 text-ink-2"
            >
              <ThemeToggle className="-ml-2 size-11" />
              <span className="type-small">Theme</span>
            </m.div>
            <m.div
              initial={{ opacity: 0, y: rise.y }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motion.menu.duration, ease, delay: 0.1 + (links.length + 1) * motion.menu.stagger }}
              className="mt-auto"
            >
              <PrimaryLink href="#contact" onClick={() => setOpen(false)} className="w-full justify-between">
                Get in touch
              </PrimaryLink>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
