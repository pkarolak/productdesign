# 0004: Password gating

- **Status:** Accepted
- **Date:** 2026-09-30
- **Todo:** gating

## Context

Case studies must be password gated in v1, but the bottom line of every case should stay public. The site should stay fully static and cheap on Vercel.

## Decision

- **One shared password** (`CASE_PASSWORD`) unlocks every protected case for 30 days. Cases default to `access: "protected"`; `"public"` opts out.
- **`proxy.ts`** (Next.js 16's renamed middleware, Node runtime) matches `/work/:slug*` and `/media/protected/:path*`:
  - Protected case without a valid cookie: rewrite to the static `/locked/<slug>` teaser. The URL stays shareable.
  - Protected media without a valid cookie: 401.
  - The case's `opengraph-image` sub-route always passes (it only shows public teaser fields).
  - Unlocked and locked responses are `Cache-Control: private, no-store`; unlocked ones add `X-Robots-Tag: noindex`.
- **Unlock** is a Server Action (`app/locked/[slug]/actions.ts`): SHA-256 plus `timingSafeEqual` compare, a fixed 600ms delay on failure, then an HttpOnly, Secure, SameSite=Lax cookie `pf_access` holding an HS256 JWT (`jose`) signed with `AUTH_SECRET`.
- **The token carries a fingerprint of the password**, so rotating `CASE_PASSWORD` revokes every existing unlock.
- **Lock again:** "Lock cases" on full protected case pages clears the cookie. It lives there (not in the global footer) because the static footer cannot know the HttpOnly cookie state, and full protected pages are only ever served to unlocked visitors.
- **Protected media** render with `next/image unoptimized`, because the optimizer fetches without the visitor's cookie.
- **Rate limiting:** a Vercel Firewall rule on POSTs to `/work/*` and `/locked/*` (setup in [../operations.md](../operations.md)).

## Alternatives considered

- **Vercel Password Protection / Deployment Protection:** whole-site only, and it hides the bottom lines that must stay public.
- **Server-rendering every case per request:** works, but loses static rendering for no security gain at this threat level.
- **Per-person passwords and analytics:** out of scope for v1.

## Consequences

- Verified locally: the locked HTML and RSC payloads contain no case content or protected media paths, media return 401, and unlocking through the real form works (`pnpm shots` exercises it).
- **Honest limit:** this keeps content out of public view and search engines. It does not protect secrets; anyone with the password can share it.

## Related

- [../plan.md](../plan.md) (password gating), [../architecture.md](../architecture.md), [../operations.md](../operations.md)
