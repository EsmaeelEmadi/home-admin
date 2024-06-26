import { type NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // default case
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
