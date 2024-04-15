import NextAuth, { Session } from "next-auth";
import authConfig from "./auth.config";
import { authRoutes, publicRoutes, DEFAULT_LOGIN_REDIRECT } from "@/route";
import { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"], // every single route except the ones mentioned here will trigger middleware
};
