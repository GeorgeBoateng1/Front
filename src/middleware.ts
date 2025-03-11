import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const protectedRoutes = ["/dashboard", "/profile", "/settings"];
  const authProtectedRoutes = ["login", "register", "reset-password"];

  // Read cookies from request headers
  const refreshToken = req.cookies.get("refreshToken")?.value;
  // Prevent logged-in users from accessing the login page
  if (authProtectedRoutes.some((route) => pathname.startsWith(`/auth/${route}/`)) && refreshToken) {
    return NextResponse.redirect(new URL("/dashboard/app", req.url));
  }


  // If the route is protected, check authentication
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    // If accessToken is missing but refreshToken is available, try to refresh
    if (!refreshToken) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile", "/settings", "/auth/:path*"],
};
