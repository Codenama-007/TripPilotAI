# TripPilot — Clerk Authentication

## Overview

Auth is handled entirely by Clerk (`@clerk/nextjs`, Core 3 / `<Show>` API). No custom auth logic, no passwords stored by us — Clerk owns the user database, sessions, and hosted UI.

## Flow

```
Landing "/"
   │
   ├── Sign Up ──┐
   │             │
   └── Sign In ──┤
                 ▼
            Clerk Auth
                 │
                 ▼
              /main
                 │
        TripPilot UI + 👤 Username
                 │
              Logout
                 │
                 ▼
                "/"
```

Both Sign Up and Sign In use **dedicated pages** (`mode="redirect"`), not modals, both landing on `/main` via `forceRedirectUrl="/main"`.

## Key Files

### `app/layout.tsx` — Provider setup
Wraps the entire app in `<ClerkProvider>` at the root, above `<html>`/`<body>` content. This must stay at the top of the tree — every Clerk hook (`useUser`, `useClerk`) and component (`<UserButton>`, `<Show>`) depends on this context being present.

### `app/sign-in/[[...sign-in]]/page.tsx` and `app/sign-up/[[...sign-up]]/page.tsx`
Catch-all optional routes (**three dots** — `[[...sign-in]]`, not two) rendering Clerk's `<SignIn />` / `<SignUp />` components. The triple-dot catch-all is required because Clerk's components render multiple internal sub-steps (email entry, verification code, OAuth callback, etc.) under the same route.

### `proxy.ts` — Route protection
Next.js 16 renamed `middleware.ts` to `proxy.ts` — this is that file, not a custom concept. Runs `clerkMiddleware` on every request:

- Public routes: `/`, `/sign-in`, `/sign-up`
- Any other route (currently just `/main`) requires a signed-in session — unauthenticated visitors are redirected via `redirectToSignIn()`
- Signed-in users visiting `/` are redirected straight to `/main` (skips the landing page for returning users)

### `components/Navbar.tsx` — Entry points
Uses Clerk's `<Show when="signed-out">` to conditionally render `<SignInButton>` and `<SignUpButton>` — both `mode="redirect"`, both `forceRedirectUrl="/main"`. These only render when signed out; there's no signed-in state handling here since signed-in users are redirected away from `/` by `proxy.ts` before the Navbar would even need to show anything else.

### `components/AppSidebar.tsx` — Signed-in identity + logout
- `<UserButton>` — shows the avatar + `showName` displays the username/full name inline. `signInUrl="/sign-in"` is a fallback only used if Clerk internally needs to redirect an unauthenticated session mid-interaction (shouldn't normally trigger, since `proxy.ts` already gates this route).
- `useClerk().signOut({ redirectUrl: "/" })` — manually wired Logout button, redirects to landing page after sign-out.

## Environment Variables Required

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx   # or pk_test_xxxxx in development
CLERK_SECRET_KEY=sk_live_xxxxx                     # or sk_test_xxxxx in development
```

Get these from the Clerk Dashboard under **API Keys**. Development and Production are separate Clerk instances with separate key pairs — don't mix them.

## Production Checklist

- [ ] Clerk Dashboard → switch to **Production** instance → copy production keys into the hosting platform's env vars (not the dev keys)
- [ ] Clerk Dashboard → **Domains** → add the deployed frontend domain (Netlify/Vercel URL, and any custom domain)
- [ ] Confirm **Username** is enabled under **User & Authentication → Personal Information** if the app is expected to always have a `username` value — otherwise `user.username` is `null` and code should fall back to `firstName`/email (already handled in `AppSidebar.tsx`)
- [ ] Re-deploy the frontend after changing any `NEXT_PUBLIC_*` env var — Next.js bakes these into the client bundle at **build time**, not runtime, so saving the variable alone does not apply it

## Common Pitfalls (already hit and fixed in this project)

1. **`mode="redirect"` with no matching page route** — if you ever add another `SignInButton`/`SignUpButton` elsewhere, make sure it points somewhere that actually exists, or switch to `mode="modal"` instead.
2. **`signInUrl` pointing at a protected route** — this prop tells Clerk where to send someone who needs to sign in; it must point to `/sign-in`, never to `/main` or any other auth-gated page.
3. **Missing `SignInButton` in the UI** — always provide both Sign In and Sign Up entry points; a returning user with no visible "Sign In" option has no way back into the app.
