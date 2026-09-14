# TripPilot — Design Guide

## Brand Color

| Token | Hex | Usage |
|---|---|---|
| Primary Blue | `#007BFF` | Buttons, active states, logo mark, accents |
| Primary Blue (hover) | `#0069d9` | Button hover state |
| Primary Blue (light) | `#e7f1ff` | Active nav/sidebar item background |
| Text Primary | `#212529` | Headings, body text |
| Text Secondary | `#6C757D` | Subtext, placeholders, muted labels |
| Border | `gray-200` (Tailwind) | Card borders, dividers |
| Background | `#f8f9fa` | Assistant chat bubble background |

Use `#007BFF` sparingly and intentionally — it should read as "the one action color" (primary CTAs, active states), not decoration.

## Typography

- **Body font:** Inter (`next/font/google`), loaded via `--font-inter` CSS variable, applied globally through `font-sans` on `<html>`.
- **Mono font:** Geist Mono (`--font-geist-mono`) — currently defined but only lightly used (e.g. `font-mono-github` class on ChatComponent's `<main>`).
- Headings use `font-semibold` with `tracking-tight` for a clean, condensed SaaS feel (see Navbar logo text, ChatComponent header).

## Styling System

- **Framework:** Tailwind CSS v4, using the `@theme inline` token approach in `globals.css` (not a `tailwind.config.js` — v4 style).
- **Component library:** shadcn/ui (`components/ui/*`) — button, input, sidebar, sheet, skeleton, tooltip, separator all sourced from shadcn and customized with brand colors.
- **Border radius:** defined via CSS custom properties (`--radius-sm` through `--radius-4xl`), scaled off a single `--radius` base — keeps corner rounding consistent across all components.
- **Color system:** uses OKLCH color space for the base shadcn tokens (`--background`, `--foreground`, `--primary`, etc.) rather than hex — this is shadcn's default v4 setup and shouldn't be hand-edited without understanding OKLCH.

## Layout Patterns

- **Landing page (`app/page.tsx`):** sticky `Navbar` + `HeroSection` + `FeatureSection` + `Footer`, single scrollable page with anchor-link nav (`#home`, `#features`, `#how-it-works`, `#contact`).
- **App shell (`app/main/page.tsx`):** `SidebarProvider` wraps `AppSidebar` (collapsible, offcanvas on mobile) + `SidebarInset` wrapping `ChatComponent`. This is the shadcn sidebar pattern — don't restructure this nesting without checking `components/ui/sidebar.tsx`.
- **Chat bubbles:** user messages are right-aligned, solid blue (`bg-[#007BFF] text-white`); assistant messages are left-aligned, light gray (`bg-[#f8f9fa]`) and rendered through `react-markdown` + `remark-gfm` (assistant replies contain real markdown — bold, bullet lists — that must render as HTML, not literal text).

## Markdown Rendering Convention

Assistant chat messages use the `prose prose-sm` Tailwind Typography classes to style rendered markdown consistently with the rest of the UI. User messages are always plain text (`whitespace-pre-wrap`), never passed through `ReactMarkdown` — don't swap this, since untrusted markdown rendering isn't needed for the user's own input and previously logged as a `whitespace-pre-wrap` decision on purpose.

## Design Principles to Follow

1. **One accent color.** `#007BFF` is the only saturated color in the palette — everything else is grayscale. Don't introduce new accent colors without updating this doc.
2. **Flat, not skeuomorphic.** Buttons use `rounded-sm`, subtle `hover:-translate-y-0.5` lift, and soft shadows on hover only — avoid heavy drop-shadows or gradients.
3. **Generous whitespace over dense UI.** Padding values lean toward `px-6 py-4` / `px-4 py-3` rather than tight spacing — keep this consistent when adding new sections.
