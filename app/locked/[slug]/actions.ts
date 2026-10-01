"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { protectedSlugs } from "@/content/projects";
import { ACCESS_COOKIE, ACCESS_MAX_AGE, accessConfigured, passwordMatches, signAccess } from "@/lib/access";

export type UnlockState = { error?: string };

const FAILED_ATTEMPT_DELAY_MS = 600;

export async function unlock(_: UnlockState, formData: FormData): Promise<UnlockState> {
  const slug = String(formData.get("slug") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!accessConfigured()) {
    return { error: "Unlocking is not set up on this deployment yet." };
  }
  if (!passwordMatches(password)) {
    await new Promise((r) => setTimeout(r, FAILED_ATTEMPT_DELAY_MS));
    return { error: "That password did not work." };
  }

  (await cookies()).set(ACCESS_COOKIE, await signAccess(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_MAX_AGE,
  });
  redirect(protectedSlugs.includes(slug) ? `/work/${slug}` : "/#big-ones");
}

export async function lock() {
  (await cookies()).delete(ACCESS_COOKIE);
  redirect("/#big-ones");
}
