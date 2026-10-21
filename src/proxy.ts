import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Personalised links (?b=BusinessName) are private to one recipient, so they
 * must never be indexed. A header is used because the pages are static and
 * cannot read the query string while rendering.
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  if (request.nextUrl.searchParams.has("b")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  matcher: ["/for/:path*", "/book", "/demo"],
};
