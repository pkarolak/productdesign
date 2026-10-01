"use server";

import { z } from "zod";

type Field = "name" | "email" | "message";

export type ContactState = {
  status: "idle" | "sent" | "invalid" | "error";
  errors?: Partial<Record<Field, string>>;
  values?: Record<Field, string>;
};

const schema = z.object({
  name: z.string().trim().min(2, "Tell me your name.").max(60, "Keep your name under 60 characters."),
  email: z.email("That email looks off. Check it once more?"),
  message: z
    .string()
    .trim()
    .min(10, "A few more words, please. Ten characters at least.")
    .max(2000, "That is a lot. Keep it under 2000 characters, and we can talk about the rest."),
});

/** Bots fill the form in well under this; people do not. */
const MIN_MS = 3000;

/**
 * Sends a message from the home contact form through Resend to `CONTACT_TO`. Honeypot hits and forms sent too
 * fast are dropped but answered as sent, so bots learn nothing. Without `RESEND_API_KEY` or `CONTACT_TO`, it logs
 * the message in development and fails in production, where the form offers the email link instead.
 */
export async function sendContact(_: ContactState, form: FormData): Promise<ContactState> {
  const values = {
    name: String(form.get("name") ?? ""),
    email: String(form.get("email") ?? "").trim(),
    message: String(form.get("message") ?? ""),
  };
  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as Field;
      errors[field] ??= issue.message;
    }
    return { status: "invalid", errors, values };
  }

  const started = Number(form.get("started"));
  if (form.get("website") || !started || Date.now() - started < MIN_MS) return { status: "sent" };

  const { name, email, message } = parsed.data;
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!key || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[contact] RESEND_API_KEY or CONTACT_TO is not set; not sent.\n${name} <${email}>\n${message}`);
      return { status: "sent" };
    }
    console.error("[contact] RESEND_API_KEY or CONTACT_TO is not set.");
    return { status: "error", values };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `${name} wrote through the portfolio`,
        text: `${message}\n\n${name} <${email}>`,
      }),
    });
    if (res.ok) return { status: "sent" };
    console.error(`[contact] Resend answered ${res.status}: ${await res.text()}`);
  } catch (error) {
    console.error("[contact] Resend request failed.", error);
  }
  return { status: "error", values };
}
