import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  // const { nextUrl } = req;
  // const session = await auth();
  // const isLoggedIn = !!session;

  // const isPublicRoute =
  //   ["/", "/sign-in"].includes(nextUrl.pathname) ||
  //   nextUrl.pathname.startsWith("/api/auth");

  // const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  // const isAdmin = session?.user?.role === "admin";

  // if (!isLoggedIn && !isPublicRoute) {
  //   return Response.redirect(new URL("/sign-in", nextUrl));
  // }

  // if (isPublicRoute) {
  //   if (isLoggedIn && nextUrl.pathname === "/sign-in") {
  //     return Response.redirect(new URL("/admin/pos", nextUrl));
  //   }

  //   return NextResponse.next();
  // }

  // if (isLoggedIn && isAdminRoute && !isAdmin) {
  //   return Response.redirect(new URL("/", nextUrl));
  // }

  return NextResponse.next();
});

export const config = {
  /*
   * Match all request paths except for:
   * - api (API routes)
   * - _next (Next.js internals)
   * - .*\..* (static files)
   * - auth/sign-in (sign-in page)
   * - auth/sign-up (sign-up page)
   */
  matcher: ["/((?!api|_next|.*\\..*|auth/sign-in|auth/sign-up).*)"],
};
