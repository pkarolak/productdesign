"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";
import { Rise } from "@/components/motion/Rise";
import { CopyEmail } from "@/components/site/CopyEmail";
import { useToast } from "@/components/site/Toaster";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { PrimaryButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { ContactFormCopy, Site } from "@/content/schema";
import { cn } from "@/lib/cn";

type Field = "name" | "email" | "message";

const fields: { name: Field; label: string; type?: string; autoComplete: string; max: number }[] = [
  { name: "name", label: "Your name", autoComplete: "name", max: 60 },
  { name: "email", label: "Your email", type: "email", autoComplete: "email", max: 254 },
  { name: "message", label: "Your message", autoComplete: "off", max: 2000 },
];

const input =
  "core w-full min-w-0 rounded-inset px-5 text-ink outline-none placeholder:text-ink-3 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent aria-invalid:outline-2 aria-invalid:outline-accent";

function FieldError({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <span id={id} className="type-small mt-2 inline-flex items-center gap-2 text-ink">
      <span className="text-accent">
        <Icon name="circle-alert" />
      </span>
      {text}
    </span>
  );
}

/** The home contact form: name, email and message, sent by a server action. Email and LinkedIn stay underneath. */
export function ContactForm({
  copy,
  links,
  id = "contact",
}: {
  copy?: ContactFormCopy;
  links: Site["links"];
  id?: string;
}) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });
  const [started, setStarted] = useState(0);
  const form = useRef<HTMLFormElement>(null);
  const toast = useToast();

  useEffect(() => {
    if (state.status === "sent" && copy) {
      toast(copy.sent);
    }
    if (state.status === "invalid") {
      const first = fields.find((f) => state.errors?.[f.name]);
      if (first) form.current?.querySelector<HTMLElement>(`[name="${first.name}"]`)?.focus();
    }
  }, [state, copy, toast]);

  if (!copy) return null;
  const errors = state.status === "invalid" ? (state.errors ?? {}) : {};
  const kept = state.status === "sent" ? undefined : state.values;

  return (
    <section data-dock-hide id={id} aria-labelledby={`${id}-title`} className="container-page pb-(--section-y) scroll-mt-(--nav-clear)">
      <Rise className="card mx-auto max-w-[720px] rounded-card p-7 md:p-12">
        <h2 id={`${id}-title`} className="type-h2 text-ink">
          {copy.title}
        </h2>
        <p className="type-lede mt-3 max-w-[48ch]">{copy.note}</p>

        <form
          ref={form}
          action={action}
          noValidate
          onFocusCapture={() => started || setStarted(Date.now())}
          className="relative mt-8 grid gap-5 sm:grid-cols-2"
        >
          <input type="hidden" name="started" value={started} />
          <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          {fields.map((f) => {
            const err = errors[f.name];
            const errId = `${id}-${f.name}-error`;
            const shared = {
              id: `${id}-${f.name}`,
              name: f.name,
              required: true,
              maxLength: f.max,
              autoComplete: f.autoComplete,
              defaultValue: kept?.[f.name],
              "aria-invalid": err ? true : undefined,
              "aria-describedby": err ? errId : undefined,
            };
            return (
              <div key={f.name} className={cn("flex flex-col", f.name === "message" && "sm:col-span-2")}>
                <label htmlFor={shared.id} className="type-label mb-2">
                  {f.label}
                </label>
                {f.name === "message" ? (
                  <textarea {...shared} rows={5} className={cn(input, "min-h-[148px] resize-y py-4")} />
                ) : (
                  <input {...shared} type={f.type ?? "text"} className={cn(input, "h-[52px]")} />
                )}
                <FieldError id={errId} text={err} />
              </div>
            );
          })}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:col-span-2">
            <PrimaryButton type="submit" disabled={pending}>
              {pending ? "Sending" : copy.submit}
            </PrimaryButton>
            <p role="alert" className="type-small text-ink">
              {state.status === "error" && (
                <span className="inline-flex items-center gap-2">
                  <span className="text-accent">
                    <Icon name="circle-alert" />
                  </span>
                  <span>
                    It did not go through. Write to{" "}
                    <a href={`mailto:${links.email}`} className="focus-ring link rounded-pill">
                      {links.email}
                    </a>{" "}
                    instead?
                  </span>
                </span>
              )}
            </p>
          </div>
        </form>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-hairline pt-6">
          <span className="type-small">Rather use email?</span>
          <CopyEmail email={links.email} />
          <ArrowLink href={links.linkedin}>LinkedIn</ArrowLink>
        </div>
      </Rise>
    </section>
  );
}
