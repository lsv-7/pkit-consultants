import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (path.startsWith("/portal") && path !== "/portal/login") {
    const clientToken = req.cookies.get("client_token")?.value;
    if (!clientToken) {
      return NextResponse.redirect(new URL("/portal/login", req.url));
    }

    try {
      const { payload } = await jwtVerify(
        clientToken,
        new TextEncoder().encode(process.env.JWT_SECRET!)
      );

      if (payload && payload.role === "CLIENT") {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/portal/login", req.url));
    } catch {
      return NextResponse.redirect(new URL("/portal/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/portal", "/portal/:path*"],
};
