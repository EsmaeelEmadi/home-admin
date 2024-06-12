import { type NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const currentUser = null;

  if (currentUser && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (currentUser && request.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (currentUser && !request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.redirect(new URL("/auth/login", request.url));
}

export const config = {
  matcher: "/",
};
