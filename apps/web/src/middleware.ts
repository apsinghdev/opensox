import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { PROTECTED_DASHBOARD_ROUTES } from "@/lib/auth/protected-routes";

export async function middleware(req: NextRequest) {
  const adaptedReq = {
    headers: req.headers,
    cookies: req.cookies,
  };
  const token = await getToken({
    req: adaptedReq as any,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const pathname = req.nextUrl.pathname;

  const isProtectedRoute = PROTECTED_DASHBOARD_ROUTES.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedRoute && !token) {
    const signInUrl = new URL("/login", req.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}
