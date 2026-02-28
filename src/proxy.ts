import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js 16 Proxy (replaces middleware.ts)
 *
 * Light interception layer for auth redirects.
 * Actual auth verification happens in server layouts (committee/layout.tsx, admin/layout.tsx).
 * This proxy provides a fast UX redirect before hitting the server layout.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /committee/* — require committee_session cookie
  if (pathname.startsWith("/committee")) {
    const session = request.cookies.get("committee_session");
    if (!session?.value) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  // Protect /admin/* — require admin_session cookie
  if (pathname.startsWith("/admin")) {
    const adminSession = request.cookies.get("admin_session");
    if (!adminSession?.value) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/committee/:path*", "/admin/:path*"],
};
