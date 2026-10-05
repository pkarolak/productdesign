"use client";

import { useId, useState } from "react";
import { openCommandMenu } from "@/components/site/CommandMenu";
import { CopyEmail } from "@/components/site/CopyEmail";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { useToast } from "@/components/site/Toaster";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { PrimaryButton, PrimaryLink, secondaryClass } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";

const secondary = secondaryClass("compact");

/** The app primitives in every state, for review on /kit. */
export function Primitives({ email }: { email?: string }) {
  const toast = useToast();
  const [sheet, setSheet] = useState(false);
  const titleId = useId();

  return (
    <div className="grid gap-3 md:grid-cols-2 md:gap-4">
      <div className="card rounded-card p-6 md:p-7">
        <p className="type-label mb-5">Actions</p>
        <div className="flex flex-wrap items-center gap-4">
          <PrimaryLink href="#kit-primitives">Primary link</PrimaryLink>
          <PrimaryButton type="button" size="compact" onClick={() => toast("Primary button pressed")}>
            Compact button
          </PrimaryButton>
          <ArrowLink href="#kit-primitives">Arrow link</ArrowLink>
          <ArrowLink href="https://example.com">External link</ArrowLink>
        </div>
        <p className="type-body mt-5 text-ink-2">
          Running text with{" "}
          <a href="#kit-primitives" className="focus-ring link rounded-pill">
            an inline link
          </a>{" "}
          and a <span className="inline-pill type-small">pill</span> in it.
        </p>
      </div>

      <div className="card rounded-card p-6 md:p-7">
        <p className="type-label mb-5">Status and feedback</p>
        <div className="flex flex-wrap items-center gap-3">
          <Chip icon="lock">Password protected</Chip>
          <Chip>Static chip</Chip>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button type="button" className={secondary} onClick={() => toast("Saved to your clipboard")}>
            <Icon name="check" className="size-4" />
            Show a toast
          </button>
          {email && <CopyEmail email={email} />}
        </div>
      </div>

      <div className="card rounded-card p-6 md:p-7">
        <p className="type-label mb-5">Overlays</p>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className={secondary} aria-haspopup="dialog" onClick={() => setSheet(true)}>
            Open a sheet
          </button>
          <button type="button" className={secondary} aria-haspopup="dialog" onClick={openCommandMenu}>
            <Icon name="command" className="size-4" />
            Open the command menu
          </button>
        </div>
        <p className="type-small mt-4">The command menu also opens with Cmd K or Ctrl K on any page.</p>
      </div>

      <div className="card rounded-card p-6 md:p-7">
        <p className="type-label mb-5">Theme</p>
        <div className="flex items-center gap-3">
          <ThemeToggle className="size-11" />
          <span className="type-small">Dark by default, light on request.</span>
        </div>
      </div>

      <Modal open={sheet} onClose={() => setSheet(false)} labelledBy={titleId}>
        <div className="p-6 md:p-7">
          <p className="type-label">Sheet</p>
          <h3 id={titleId} className="type-h3 mt-2 text-ink">
            A sheet for details
          </h3>
          <p className="type-body mt-3 text-ink-2">
            It rises from the bottom on phones and sits centred from tablet width up. Escape, the scrim and the button all
            close it, and focus returns to where it was.
          </p>
          <div className="mt-6 flex justify-end">
            <button type="button" className={secondary} onClick={() => setSheet(false)}>
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
