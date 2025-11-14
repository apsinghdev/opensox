import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // TEMPORARILY DISABLED FOR UI DEVELOPMENT - REMOVE THIS COMMENT AND UNCOMMENT BELOW WHEN DONE
  return NextResponse.next();
  
  /* ORIGINAL AUTH CODE - UNCOMMENT WHEN DONE WITH UI WORK
  const adaptedReq = {
    headers: req.headers,
    cookies: req.cookies,
  };
  const token = await getToken({
    req: adaptedReq as any,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const protectedPaths = ["/dashboard"];
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!token) {
      const signInUrl = new URL("/login", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }
  return NextResponse.next();
  */
}
