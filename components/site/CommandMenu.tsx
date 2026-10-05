"use client";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
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
};

/** Each group is also a filter tab. */
export type CommandGroup = { label: string; items: Command[] };

export const OPEN_EVENT = "command-menu:open";

/** Opens the menu from anywhere, e.g. the nav hint. */
export const openCommandMenu = () => window.dispatchEvent(new Event(OPEN_EVENT));

const ALL = "All";

function iconFor(c: Command): IconName {
  if (c.locked) return "lock";
  if (c.action === "copy-email") return "copy";
  if (c.action === "toggle-theme") return "moon";
  if (c.href?.startsWith("http")) return "arrow-up-right";
  return "arrow-right";
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

      <div
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
              "focus-ring type-small shrink-0 cursor-pointer rounded-pill px-3.5 py-1.5 transition-colors duration-(--t-hover-short) ease-slow",
              f === filter ? "bg-skeleton text-ink" : "text-ink-2 hover:text-ink",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div
        ref={list}
        id={listId}
        role="listbox"
        aria-label="Commands"
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2"
      >
        {visible.length === 0 && <p className="type-small px-3 py-8 text-center">Nothing matches “{query}”.</p>}
        {visible.map((g) => (
          <div key={g.label} role="group" aria-label={g.label} className="py-1">
            <p aria-hidden className="type-small px-3 pt-2 pb-1.5 text-ink-3">
              {g.label}
            </p>
            {g.items.map(({ command: c, i }) => {
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
                    "flex cursor-pointer items-center justify-between gap-4 rounded-inset px-3 text-ink-2",
                    nested ? "type-small ml-5 border-l border-hairline py-2 pl-4" : "type-body py-2.5",
                    selected && "bg-skeleton text-ink",
                  )}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Icon name={iconFor(c)} className={cn("shrink-0 text-ink-3", nested ? "size-3.5" : "size-4")} />
                    <span className="truncate">{c.label}</span>
                    {c.locked && <span className="sr-only">, password protected</span>}
                  </span>
                  <span className="flex shrink-0 items-center gap-3">
                    {c.meta && <span className="type-small text-ink-3">{c.meta}</span>}
                    {selected && <Icon name="corner-down-left" className="size-4 text-ink-3" />}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div
        aria-hidden
        className="type-caption flex shrink-0 items-center gap-5 border-t border-hairline px-5 py-3 text-ink-3 max-md:hidden"
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
