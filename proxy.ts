import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET!);

        return NextResponse.redirect(new URL("/", request.url));
      } catch {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  if (pathname === "/") {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup"],
};
