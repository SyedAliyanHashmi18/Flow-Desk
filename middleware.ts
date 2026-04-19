import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith("/signin") || pathname.startsWith("/register");

  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/api/projects") ||
    pathname.startsWith("/api/tasks");

  // 🔥 if logged in and trying auth pages → redirect dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 🔥 if NOT logged in and trying protected pages → redirect signin
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  console.log("TOKEN:", token);
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/signin",
    "/register",
    "/api/projects/:path*",
    "/api/tasks/:path*",
  ],
};