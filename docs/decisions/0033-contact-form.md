# 0033: A real contact form, sent through Resend from a Server Action

- **Status:** Withdrawn the same day. The owner found the form a stretch; the form, the Server Action, `site.contactForm` and the Resend variables were removed, and the letter is `#contact` again. Kept for history.
- **Date:** 2026-10-01
- **Todo:** `contact-form` (plan "Clear IA and card nav")

## Context

Home ended on the letter, with "Book a call", copy email and LinkedIn. A visitor who wanted to say something short had to leave the site for their mail app. The owner asked for a real form.

## Decision

- **"Drop me a line"** (`components/blocks/ContactForm.tsx`) sits after the letter on home. It asks for a name, an email and a message, and the button reads "Send it". Its copy lives in `site.contactForm`, and the block renders nothing without it.
- **Server Action** `app/actions/contact.ts`: zod validation (name 2 to 60 characters, a valid email, a message of 10 to 2000), then a honeypot field and a 3-second minimum from first focus. Failing either still answers "sent", so bots learn nothing. It posts to Resend's REST API with `fetch` (no SDK), sending to `CONTACT_TO` with the visitor as `reply_to`.
- **Secrets** `RESEND_API_KEY`, `CONTACT_TO` and the optional `CONTACT_FROM` live in Vercel and `.env.local`. `.env.example` lists the names only.
- **Without the secrets**, development logs the message and answers "sent", which is also how the Playwright check runs. Production answers with an error that offers the email address.
- **Accessible:** visible labels, `aria-invalid` and `aria-describedby` per field, focus moves to the first invalid field, values are kept on error, and success is announced by the existing Toaster ("Got it. I will write back soon."). Copy email and LinkedIn stay under the form as fallbacks.
- When the form shows, the letter's anchor becomes `#letter` and the form takes `#contact`, so "Say hi" lands on the form.

## Consequences

- One more Firewall rate limit to set in Vercel (`docs/operations.md`).
- Resend's test sender only delivers to the account owner's address until a domain is verified.
