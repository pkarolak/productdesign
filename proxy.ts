import { NextResponse, type NextRequest } from "next/server";
import { protectedSlugs } from "@/content/projects";
import { ACCESS_COOKIE, verifyAccess } from "@/lib/access";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const unlocked = await verifyAccess(request.cookies.get(ACCESS_COOKIE)?.value);

  if (pathname.startsWith("/media/protected/")) {
    return unlocked
      ? NextResponse.next({ headers: { "Cache-Control": "private, no-store" } })
      : new NextResponse("Locked", { status: 401 });
  }

  const [, , segment = "", sub] = pathname.split("/");
  const slug = segment.split(".")[0];
  if (!protectedSlugs.includes(slug)) return NextResponse.next();
  if (sub && /^(opengraph|twitter)-image/.test(sub)) return NextResponse.next();

  if (unlocked) {
    const res = NextResponse.next();
    res.headers.set("Cache-Control", "private, no-store");
    res.headers.set("X-Robots-Tag", "noindex");
    return res;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/locked/${slug}`;
  const res = NextResponse.rewrite(url);
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}

export const config = {
  matcher: ["/work/:slug*", "/media/protected/:path*"],
};
