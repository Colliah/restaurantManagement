import authConfig from "@/auth.config";
import NextAuth from "next-auth";

import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_PREFIX_ADMIN_ROUTE,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute =
    publicRoutes.includes(nextUrl.pathname) ||
    nextUrl.pathname.match(/^\/properties\/[^/]+$/);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith(DEFAULT_PREFIX_ADMIN_ROUTE);
  const isUploadThingRoute = nextUrl.pathname.startsWith("/api/uploadthing");

  if (isApiAuthRoute) return null;
  if (isUploadThingRoute) return null;

  if (isAdminRoute) {
    if (isLoggedIn) {
      if (req?.auth?.user.isAdmin) {
        return null;
      }
      return Response.redirect(new URL("/permission-denied", nextUrl));
    }

    return Response.redirect(new URL("/", nextUrl));
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl));
    }
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/", nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
