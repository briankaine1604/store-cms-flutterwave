/**Routes that are publicly accessible */
export const publicRoutes = ["/auth/new-verification", "/api/:path*"];

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

export const DEFAULT_LOGIN_REDIRECT = "/";
