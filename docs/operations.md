# Operations

## Environment variables

| Name | Where | Value |
| --- | --- | --- |
| `CASE_PASSWORD` | Vercel project settings (Production and Preview), local `.env.local` | The shared password for protected cases. |
| `AUTH_SECRET` | Same | At least 32 random characters: `openssl rand -base64 48`. |
| `NEXT_PUBLIC_SITE_URL` | Vercel (optional) | Canonical URL for metadata, sitemap and OG. Defaults to the placeholder in `content/site.ts`. |

Never commit these. `.env.example` lists the names only. Without both secrets the site still builds and runs; the unlock form says it is not set up.

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

1. Import `pkarolak/productdesign` in Vercel. Framework preset: Next.js. No build settings to change.
2. Add `CASE_PASSWORD` and `AUTH_SECRET` (and optionally `NEXT_PUBLIC_SITE_URL`) for Production and Preview.
3. Deploy. Analytics and Speed Insights are already wired in the root layout; enable them in the Vercel dashboard.

## Firewall rate limit (brute force)

The unlock Server Action posts to the page URL, which is `/work/<slug>` (the proxy rewrites it to the locked page). In Vercel, go to **Firewall** and add a **Rate Limit** rule:

- If request method equals `POST` and path starts with `/work/` or `/locked/`,
- limit to 10 requests per 60 seconds per IP, action: deny (429).

## Rotating the password

Change `CASE_PASSWORD` in Vercel and redeploy. Every existing unlock stops working at once, because each cookie carries a fingerprint of the password it was issued for. Rotating `AUTH_SECRET` has the same effect.

## Honest limit

The gate keeps case content out of public view and search engines. It is not strong security: anyone with the password can share it, and anyone unlocked can save what they see.
