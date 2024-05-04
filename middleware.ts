import NextAuth, { Session } from "next-auth";
import authConfig from "./auth.config";
import { authRoutes, publicRoutes, DEFAULT_LOGIN_REDIRECT } from "@/route";
import { NextRequest, NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
