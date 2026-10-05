"use client";

import { motion as m } from "motion/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { motion } from "@theme/motion";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/cn";
import type { IconName } from "@/themes/contract";
import { useToast } from "./Toaster";

export type CommandAction = "copy-email" | "toggle-theme";

export type Command = {
  id: string;
  label: string;
  /** A route, #anchor or external URL. */
  href?: string;
  action?: CommandAction;
  keywords?: string;
  /** The id of the item it nests under, in the same group, listed right after it. */
  parent?: string;
  locked?: boolean;
  /** Quiet detail on the right, e.g. the company or the domain. */
  meta?: string;
  /** A company mark from /logos/, shown instead of the icon. */
  logo?: string;
};

/** Each group is also a filter tab. */
export type CommandGroup = { label: string; items: Command[] };

export const OPEN_EVENT = "command-menu:open";

/** Opens the menu from anywhere, e.g. the nav hint. */
export const openCommandMenu = () => window.dispatchEvent(new Event(OPEN_EVENT));

const isApple = () => {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  return /mac|iphone|ipad|ipod/i.test(nav.userAgentData?.platform || nav.platform || nav.userAgent);
};

/** "⌘" on Apple devices, "Ctrl" elsewhere; null until hydrated, since the server cannot know. */
export function useModKey(): "⌘" | "Ctrl" | null {
  return useSyncExternalStore(
    () => () => {},
    () => (isApple() ? "⌘" : "Ctrl"),
    () => null,
  );
}

const ALL = "All";

function iconFor(c: Command): IconName {
  if (c.locked) return "lock";
  if (c.action === "copy-email") return "copy";
  if (c.action === "toggle-theme") return "moon";
  if (c.href?.startsWith("http")) return "arrow-up-right";
  return "arrow-right";
}

type Item = { command: Command; i: number };

/** Each top-level item with the nested items listed right after it. */
function segments(items: Item[]) {
  const out: { head: Item; kids: Item[] }[] = [];
  for (const item of items) {
    const last = out.at(-1);
    if (item.command.parent !== undefined && last?.head.command.id === item.command.parent) last.kids.push(item);
    else out.push({ head: item, kids: [] });
  }
  return out;
}

function Key({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="type-caption inline-grid min-w-5 place-items-center rounded-inset border border-hairline px-1.5 py-0.5 text-ink-2">
      {children}
    </kbd>
  );
}

export function CommandMenu({ groups, email }: { groups: CommandGroup[]; email?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(ALL);
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const dialogOpen = useRef(false);
  const router = useRouter();
  const toast = useToast();
  const { resolvedTheme, setTheme } = useTheme();
  const titleId = useId();
  const listId = useId();

  const filters = useMemo(() => [ALL, ...groups.map((g) => g.label)], [groups]);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const show = () => {
      setQuery("");
      setFilter(ALL);
      setActive(0);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialogOpen.current) setOpen(false);
        else show();
      }
    };
    const onOpen = show;
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    dialogOpen.current = open;
  }, [open]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = (c: Command) => !q || `${c.label} ${c.meta ?? ""} ${c.keywords ?? ""}`.toLowerCase().includes(q);
    let n = 0;
    return groups
      .filter((g) => filter === ALL || g.label === filter)
      .map((g) => {
        const hit = new Set(g.items.filter(matches).map((c) => c.id));
        return {
          label: g.label,
          items: g.items.filter(
            (c) =>
              hit.has(c.id) ||
              (c.parent !== undefined && hit.has(c.parent)) ||
              g.items.some((child) => child.parent === c.id && hit.has(child.id)),
          ),
        };
      })
      .filter((g) => g.items.length > 0)
      .map((g) => ({ label: g.label, items: g.items.map((command) => ({ command, i: n++ })) }));
  }, [groups, query, filter]);

  const flat = visible.flatMap((g) => g.items.map((x) => x.command));

  const optionId = (i: number) => `${listId}-${i}`;

  useEffect(() => {
    if (!open) return;
    document.getElementById(optionId(active))?.scrollIntoView({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, open]);

  const pickFilter = (f: string) => {
    setFilter(f);
    setActive(0);
    list.current?.scrollTo({ top: 0 });
  };

  const run = (c: Command) => {
    setOpen(false);
    if (c.action === "copy-email") {
      if (!email) return;
      navigator.clipboard.writeText(email).then(() => toast("Email copied"));
      return;
    }
    if (c.action === "toggle-theme") {
      const next = resolvedTheme === "dark" ? "light" : "dark";
      setTheme(next);
      toast(`Switched to ${next} mode`);
      return;
    }
    if (!c.href) return;
    if (c.href.startsWith("http")) {
      window.open(c.href, "_blank", "noreferrer");
      return;
    }
    router.push(c.href);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const el = e.currentTarget;
    const atStart = el.selectionStart === 0 && el.selectionEnd === 0;
    const atEnd = el.selectionStart === el.value.length;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!flat.length) return;
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (i + step + flat.length) % flat.length);
    } else if ((e.key === "ArrowRight" && atEnd) || (e.key === "ArrowLeft" && atStart)) {
      e.preventDefault();
      const step = e.key === "ArrowRight" ? 1 : -1;
      pickFilter(filters[(filters.indexOf(filter) + step + filters.length) % filters.length]);
    } else if (e.key === "Enter" && flat[active]) {
      e.preventDefault();
      run(flat[active]);
    }
  };

  const row = ({ command: c, i }: Item) => {
    const selected = i === active;
    const nested = c.parent !== undefined;
    return (
      <div
        key={c.id}
        id={optionId(i)}
        role="option"
        aria-selected={selected}
        onPointerMove={() => setActive(i)}
        onClick={() => run(c)}
        className={cn(
          "relative isolate flex cursor-pointer items-center justify-between gap-4 rounded-inset px-2.5 transition-colors duration-(--t-hover-short) ease-slow",
          nested ? "type-small py-1.5" : "type-body py-2",
          selected ? "text-ink" : "text-ink-2",
        )}
      >
        {selected && (
          <m.span
            layoutId={`${listId}-active`}
            transition={motion.spring}
            className="absolute inset-0 -z-10 rounded-inset bg-skeleton"
          />
        )}
        <span className="flex min-w-0 items-center gap-3">
          <span
            className={cn(
              "grid shrink-0 place-items-center rounded-inset border border-hairline bg-canvas transition-colors duration-(--t-hover-short) ease-slow",
              nested ? "size-7" : "size-8",
              selected ? "text-accent" : "text-ink-3",
            )}
          >
            {c.logo ? (
              <Image src={c.logo} alt="" width={16} height={16} className="size-4 object-contain" />
            ) : (
              <Icon name={iconFor(c)} className={nested ? "size-3.5" : "size-4"} />
            )}
          </span>
          <span className="truncate">{c.label}</span>
          {c.locked && <span className="sr-only">, password protected</span>}
        </span>
        <span className="flex shrink-0 items-center gap-2.5 text-ink-3">
          {c.meta && <span className={cn("type-small", c.logo && "max-sm:hidden")}>{c.meta}</span>}
          {c.locked && c.logo && <Icon name="lock" className="size-3.5" />}
          <Icon
            name="corner-down-left"
            className={cn(
              "size-4 transition-opacity duration-(--t-hover-short) ease-slow max-sm:hidden",
              !selected && "opacity-0",
            )}
          />
        </span>
      </div>
    );
  };

  return (
    <Modal open={open} onClose={close} labelledBy={titleId} placement="palette" initialFocus={input}>
      <h2 id={titleId} className="sr-only">
        Command menu
      </h2>
      <div className="flex shrink-0 items-center gap-3 px-5 pt-2">
        <Icon name="search" className="size-5 shrink-0 text-ink-3" />
        <input
          ref={input}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={flat[active] ? optionId(active) : undefined}
          aria-autocomplete="list"
          aria-label="Search pages, cases, actions and links"
          placeholder="Search or jump to..."
          className="type-lede h-16 w-full bg-transparent text-ink outline-none placeholder:text-ink-3"
        />
      </div>

      <m.div
        layoutScroll
        role="group"
        aria-label="Filter"
        className="flex shrink-0 gap-1 overflow-x-auto border-b border-hairline px-4 pb-3"
      >
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={f === filter}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              pickFilter(f);
              input.current?.focus();
            }}
            className={cn(
              "focus-ring type-small relative isolate shrink-0 cursor-pointer rounded-pill px-3.5 py-1.5 transition-colors duration-(--t-hover-short) ease-slow",
              f === filter ? "text-ink" : "text-ink-2 hover:text-ink",
            )}
          >
            {f === filter && (
              <m.span
                layoutId={`${listId}-filter`}
                transition={motion.spring}
                className="absolute inset-0 -z-10 rounded-pill border border-hairline bg-skeleton"
              />
            )}
            {f}
          </button>
        ))}
      </m.div>

      <m.div
        layoutScroll
        ref={list}
        id={listId}
        role="listbox"
        aria-label="Commands"
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2"
      >
        {visible.length === 0 && (
          <div className="grid place-items-center gap-1 px-6 py-12 text-center">
            <span className="mb-3 grid size-10 place-items-center rounded-inset border border-hairline bg-canvas text-ink-3">
              <Icon name="search" className="size-4" />
            </span>
            <p className="type-body text-ink">Nothing matches “{query}”</p>
            <p className="type-small text-ink-3">
              {filter === ALL ? "Try a company, a case or a chapter." : "Try another word, or look in All."}
            </p>
          </div>
        )}
        {visible.map((g) => (
          <div key={g.label} role="group" aria-label={g.label} className="pb-1">
            <p aria-hidden className="type-caption px-3 pt-3 pb-2 text-ink-3">
              {g.label}
            </p>
            {segments(g.items).map(({ head, kids }) => (
              <div key={head.command.id}>
                {row(head)}
                {kids.length > 0 && <div className="ml-7 border-l border-hairline pl-2">{kids.map(row)}</div>}
              </div>
            ))}
          </div>
        ))}
      </m.div>

      <div
        aria-hidden
        className="wash type-caption flex shrink-0 items-center gap-5 border-t border-hairline px-5 py-3 text-ink-3 max-md:hidden"
      >
        <span className="flex items-center gap-1.5">
          <Key>↑</Key>
          <Key>↓</Key>
          Select
        </span>
        <span className="flex items-center gap-1.5">
          <Key>↵</Key>
          Open
        </span>
        <span className="flex items-center gap-1.5">
          <Key>←</Key>
          <Key>→</Key>
          Change filter
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <Key>esc</Key>
          Close
        </span>
      </div>
    </Modal>
  );
}
