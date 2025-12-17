import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import {
  PROTECTED_DASHBOARD_ROUTES,
  PROTECTED_PRO_ROUTES,
} from "@/lib/auth/protected-routes";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const pathname = req.nextUrl.pathname;

  const isProtectedRoute = PROTECTED_DASHBOARD_ROUTES.some((path) =>
    pathname.startsWith(path)
  );

  const isProRoute = PROTECTED_PRO_ROUTES.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedRoute && !token) {
    const signInUrl = new URL("/login", req.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (isProRoute) {
    if (!token) {
      const signInUrl = new URL("/login", req.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }

    const isPaidUser = (token as any).isPaidUser || false;

    if (!isPaidUser) {
      const pricingUrl = new URL("/pricing", req.url);
      return NextResponse.redirect(pricingUrl);
    }
  }

  return NextResponse.next();
}
