import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
  const { url, nextUrl, cookies } = request;
  const { pathname } = nextUrl;

  try {
    const token = cookies.get("token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/auth", url));
    }

    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!);
    const { payload } = await jose.jwtVerify(token, secret);
    const { userRole } = payload;

    const admin = userRole === "admin";
    const seller = userRole === "seller";
    const user = userRole === "user";

    if (pathname === "/" && user) {
      return NextResponse.next();
    }

    if (pathname.includes("/cart") && user) {
      return NextResponse.next();
    }

    if (pathname.includes("/item") && user) {
      return NextResponse.next();
    }

    if (pathname.includes("/my-orders") && user) {
      return NextResponse.next();
    }

    if (pathname.includes("/contact") && user) {
      return NextResponse.next();
    }

    if (pathname.includes("/about") && user) {
      return NextResponse.next();
    }

    if (pathname.includes("/my-profile") && user) {
      return NextResponse.next();
    }

    if (pathname.includes("admin") && admin) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", url));
  } catch (error) {
    return NextResponse.redirect(new URL("/auth", url));
  }
}

export const config = {
  matcher: [
    "/",
    "/cart/:path*",
    "/item/:path*",
    "/my-orders",
    "/contact",
    "/about",
    "/my-profile",
    "/admin/:path*",
  ],
};

// "/admin/:path*", "/", "/cart/:path*"
