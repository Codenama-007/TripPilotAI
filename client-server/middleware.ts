import { clerkMiddleware } from "@clerk/nextjs/server";

// List every route that should be reachable WITHOUT signing in.
// Everything else is treated as private and requires authentication.
const PUBLIC_PATHS = [
  "/",
  "/sign-in",
  "/sign-up",
];

function isPublicRoute(pathname: string) {
  return PUBLIC_PATHS.some((path) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path)
  );
}

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  // Let public routes through untouched.
  if (isPublicRoute(pathname)) {
    return;
  }

  const { userId, redirectToSignIn } = await auth();

  // No signed-in user trying to hit a private route -> bounce to sign-in.
  if (!userId) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // Signed-in user, private route -> let the request continue.
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Always run for Clerk-specific frontend API routes
    "/__clerk/(.*)",
  ],
};