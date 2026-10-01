# Operations

## Environment variables

| Name | Where | Value |
| --- | --- | --- |
| `CASE_PASSWORD` | Vercel project settings (Production and Preview), local `.env.local` | The shared password for protected cases. |
| `AUTH_SECRET` | Same | At least 32 random characters: `openssl rand -base64 48`. |
| `RESEND_API_KEY` | Same | A Resend API key with sending access, for the home contact form. |
| `CONTACT_TO` | Same | The inbox contact form messages go to. |
| `CONTACT_FROM` | Same (optional) | The sender, on a domain verified in Resend, e.g. `Portfolio <hello@example.com>`. Defaults to `onboarding@resend.dev`, which Resend only delivers to the account owner's own address. |
| `NEXT_PUBLIC_SITE_URL` | Vercel (optional) | Canonical URL for metadata, sitemap and OG. Defaults to the placeholder in `content/site.ts`. |

Never commit these. `.env.example` lists the names only. Without both secrets the site still builds and runs; the unlock form says it is not set up. Without `RESEND_API_KEY` or `CONTACT_TO`, the contact form logs messages to the server console in development and, in production, says it did not go through and offers the email address.

## Local

```bash
pnpm install
cp .env.example .env.local   # then fill in both values
pnpm dev                     # http://localhost:3000
pnpm build && pnpm start     # production build; theme:check runs first
pnpm shots                   # against a running server; SHOTS_URL=http://localhost:3100 to change
```

`pnpm shots` narrows with `SHOTS_ONLY=home,case-locked`, `SHOTS_THEMES=light`, `SHOTS_VIEWPORTS=desktop`. It uses local Chrome (`SHOTS_CHANNEL`), falling back to Playwright's Chromium (`pnpm exec playwright install chromium`).

## Deploy on Vercel

1. Import `pkarolak/productdesign` in Vercel. `vercel.json` pins the framework to Next.js, so no build settings need changing. If the site answers `404 NOT_FOUND` in plain text while files from `public/` load, the project is building as "Other": check that `vercel.json` is on the deployed commit, and clear any Output Directory override in the project settings.
2. Add `CASE_PASSWORD`, `AUTH_SECRET`, `RESEND_API_KEY` and `CONTACT_TO` (and optionally `CONTACT_FROM` and `NEXT_PUBLIC_SITE_URL`) for Production and Preview.
3. Deploy. Analytics and Speed Insights are already wired in the root layout; enable them in the Vercel dashboard.

## Firewall rate limit (brute force)

The unlock Server Action posts to the page URL, which is `/work/<slug>` (the proxy rewrites it to the locked page). In Vercel, go to **Firewall** and add a **Rate Limit** rule:

- If request method equals `POST` and path starts with `/work/` or `/locked/`,
- limit to 10 requests per 60 seconds per IP, action: deny (429).

## Contact form (Resend)

1. Create a Resend account and an API key with sending access.
2. To send from your own address, add and verify the domain in Resend, then set `CONTACT_FROM`. Until then, the test sender only delivers to the email you signed up with, so set `CONTACT_TO` to that.
3. Set the variables in Vercel and `.env.local`, then redeploy.
4. The form posts to `/` through a Server Action. Add a second Firewall rate limit: method `POST`, path equals `/`, 5 requests per 10 minutes per IP. The action also drops honeypot hits and forms sent within 3 seconds of first focus.

## Rotating the password

Change `CASE_PASSWORD` in Vercel and redeploy. Every existing unlock stops working at once, because each cookie carries a fingerprint of the password it was issued for. Rotating `AUTH_SECRET` has the same effect.

## Honest limit

The gate keeps case content out of public view and search engines. It is not strong security: anyone with the password can share it, and anyone unlocked can save what they see.
