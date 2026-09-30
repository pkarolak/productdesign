import { createHash, timingSafeEqual } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";

export const ACCESS_COOKIE = "pf_access";
export const ACCESS_MAX_AGE = 60 * 60 * 24 * 30;

const sha256 = (value: string) => createHash("sha256").update(value).digest();

function config() {
  const secret = process.env.AUTH_SECRET;
  const password = process.env.CASE_PASSWORD;
  if (!secret || secret.length < 32 || !password) return null;
  return {
    key: new TextEncoder().encode(secret),
    password,
    // Rotating CASE_PASSWORD invalidates every cookie issued for the old one.
    fingerprint: sha256(password).toString("hex").slice(0, 16),
  };
}

export const accessConfigured = () => config() !== null;

export function passwordMatches(input: string) {
  const c = config();
  if (!c) return false;
  return timingSafeEqual(sha256(input), sha256(c.password));
}

export async function signAccess() {
  const c = config();
  if (!c) throw new Error("CASE_PASSWORD and AUTH_SECRET (32+ chars) must be set.");
  return new SignJWT({ v: c.fingerprint })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${ACCESS_MAX_AGE}s`)
    .sign(c.key);
}

export async function verifyAccess(token: string | undefined) {
  const c = config();
  if (!c || !token) return false;
  try {
    const { payload } = await jwtVerify(token, c.key, { algorithms: ["HS256"] });
    return payload.v === c.fingerprint;
  } catch {
    return false;
  }
}
