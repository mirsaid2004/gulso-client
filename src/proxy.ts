import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// 1. Create the intl middleware
const intlMiddleware = createMiddleware(routing);

// 2. Export it specifically as 'proxy' to satisfy Next.js 16+
export const proxy = intlMiddleware;

// 3. Keep your matcher exactly as it was
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)',"/", "/(uz|en|ru)/:path*"],
};

// 4. Your auth export stays as is (it's fine to have other exports)
export { auth as middlewareProxy } from "@/auth";
