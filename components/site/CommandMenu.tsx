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
};

export type CommandGroup = { label: string; items: Command[] };

export const OPEN_EVENT = "command-menu:open";

/** Opens the menu from anywhere, e.g. the nav hint. */
export const openCommandMenu = () => window.dispatchEvent(new Event(OPEN_EVENT));

function iconFor(c: Command): IconName {
  if (c.action === "copy-email") return "copy";
  if (c.action === "toggle-theme") return "moon";
  if (c.href?.startsWith("http")) return "arrow-up-right";
  return "arrow-right";
}

export function CommandMenu({ groups, email }: { groups: CommandGroup[]; email: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const dialogOpen = useRef(false);
  const router = useRouter();
  const toast = useToast();
  const { resolvedTheme, setTheme } = useTheme();
  const titleId = useId();
  const listId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const show = () => {
      setQuery("");
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
    let n = 0;
    return groups
      .map((g) => ({
        label: g.label,
        items: g.items.filter((c) => !q || `${c.label} ${c.keywords ?? ""}`.toLowerCase().includes(q)),
      }))
      .filter((g) => g.items.length > 0)
      .map((g) => ({ label: g.label, items: g.items.map((command) => ({ command, i: n++ })) }));
  }, [groups, query]);

  const flat = visible.flatMap((g) => g.items.map((x) => x.command));

  const run = (c: Command) => {
    setOpen(false);
    if (c.action === "copy-email") {
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

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!flat.length) return;
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (i + step + flat.length) % flat.length);
    } else if (e.key === "Enter" && flat[active]) {
      e.preventDefault();
      run(flat[active]);
    }
  };

  const optionId = (i: number) => `${listId}-${i}`;

  return (
    <Modal open={open} onClose={close} labelledBy={titleId} placement="palette" initialFocus={input}>
      <h2 id={titleId} className="sr-only">
        Command menu
      </h2>
      <div className="flex items-center gap-3 border-b border-hairline px-5">
        <Icon name="search" className="size-4 shrink-0 text-ink-3" />
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
          aria-label="Type a command or search"
          placeholder="Type a command or search"
          className="type-body h-14 w-full bg-transparent text-ink outline-none placeholder:text-ink-3"
        />
        <kbd className="type-caption shrink-0 rounded-pill border border-hairline px-2 py-0.5">esc</kbd>
      </div>
      <div id={listId} role="listbox" aria-label="Commands" className="p-2">
        {visible.length === 0 && <p className="type-small px-3 py-6 text-center">Nothing matches “{query}”.</p>}
        {visible.map((g) => (
          <div key={g.label} role="group" aria-label={g.label} className="py-1">
            <p aria-hidden className="type-label px-3 pt-2 pb-1.5">
              {g.label}
            </p>
            {g.items.map(({ command: c, i }) => {
              const selected = i === active;
              return (
                <div
                  key={c.id}
                  id={optionId(i)}
                  role="option"
                  aria-selected={selected}
                  onPointerMove={() => setActive(i)}
                  onClick={() => run(c)}
                  className={cn(
                    "type-body flex cursor-pointer items-center justify-between gap-4 rounded-inset px-3 py-2.5 text-ink-2",
                    selected && "bg-skeleton text-ink",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <Icon name={iconFor(c)} className="size-4 text-ink-3" />
                    {c.label}
                  </span>
                  {selected && <Icon name="corner-down-left" className="size-4 text-ink-3" />}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Modal>
  );
}
