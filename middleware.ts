import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRouteGroups,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);
//it's necessary because middleware works with edge functions and those don't work with prisma, so addition of prisma is doe separetely

//@ts-ignore
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  /* console.log("isLoggedIn: ", isLoggedIn);
  console.log(
    "req.nextUrl.pathname in auth middleware: ",
    req.nextUrl.pathname
  );
  //console.log("split in auth middleware: ", nextUrl.pathname.split("/"));
  console.log("first in auth middleware: ", nextUrl.pathname.split("/")[1]); */

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  //console.log("isApiAuthRoute in auth middleware: ", isApiAuthRoute);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname); //if logged in - redirect
  //console.log("isAuthRoute in auth middleware: ", isAuthRoute);
  /*  const isPublicRoute =
    publicRoutes.includes(nextUrl.pathname) ||
    publicRouteGroups.includes(nextUrl.pathname.split("/")[1]); */
  //const isPublicRoute = nextUrl.pathname.split("/")[1] != "admin";
  const isPublicRoute = isAuthRoute || isApiAuthRoute;
  //console.log("isPublicRoute in auth middleware: ", isPublicRoute);

  if (isApiAuthRoute) {
    // console.log("isApiAuthRoute in auth middleware work: ", isApiAuthRoute);
    return null; //do nothing
  }

  if (isAuthRoute) {
    // console.log("isAuthRoute in auth middleware work: ", isAuthRoute);
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  //if not allowed to enter a route
  if (!isLoggedIn && !isPublicRoute) {
    //we form a URL for redirection of user after logging in
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    /* console.log(
      "redirect in auth middleware work: ",
      `/auth/login?callbackUrl=${encodedCallbackUrl}`
    ); */
    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
      //after logging in user will be redirected to this URL
    );
  }

  return null; //all the rest routes are not affected
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
