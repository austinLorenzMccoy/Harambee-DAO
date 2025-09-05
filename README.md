# Harambee DAO — Frontend

A modern, accessible, and performant web frontend for Harambee DAO built with Next.js 15, React 19, Tailwind CSS v4, and shadcn/ui (Radix primitives). This app showcases the DAO’s mission, features, governance approach, and resource links while providing a clean foundation for rapid iteration.

## Overview

This repository contains the user-facing site for Harambee DAO. It uses the Next.js App Router (`/app/`), TypeScript, Tailwind v4, and a component system powered by Radix + shadcn/ui. Styling is defined globally in `app/globals.css` and composed via utility classes for consistency and speed.

## Features

- App Router structure with file-based routing in `app/`
- TypeScript-first with strict settings and path aliases
- Tailwind CSS v4 with PostCSS plugin and CSS variables
- shadcn/ui + Radix UI primitives for accessible components
- Theming via `next-themes` compatible approach and design tokens
- Optimized for Vercel or Node hosting (Next.js 15)

## Tech Stack

- Next.js `15.x` (App Router)
- React `19.x`
- TypeScript `5.x`
- Tailwind CSS `^4.x` with `@tailwindcss/postcss`
- shadcn/ui + Radix UI
- PNPM (lockfile present)

## Requirements

- Node.js 18.18+ or 20+ (recommended)
- PNPM 8+ (recommended) or your preferred package manager

Confirm versions:

```
node -v
pnpm -v
```

## Getting Started

1) Install dependencies (uses PNPM lockfile):

```
pnpm install
```

2) Run the dev server:

```
pnpm dev
```

Open http://localhost:3000 to view the site. The app uses the App Router with a root layout at `app/layout.tsx` and the home page at `app/page.tsx`.

## Scripts

Defined in `package.json`:

- `pnpm dev` — Start Next.js in development mode
- `pnpm build` — Create an optimized production build
- `pnpm start` — Start the production server after building
- `pnpm lint` — Run Next.js lint

Note: `next.config.mjs` is configured to skip TypeScript and ESLint errors during builds to avoid CI disruptions while iterating:

```
typescript.ignoreBuildErrors = true
eslint.ignoreDuringBuilds = true
```

## Environment Variables

This project supports environment variables via `.env` files (ignored by Git). Create `.env.local` for local development:

```
# example
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

Place `.env.local` at the repo root (same level as `package.json`). Any variables prefixed with `NEXT_PUBLIC_` are exposed to the browser; keep secrets server-side only.

## Project Structure

```
frontend/
  app/
    globals.css         # Global CSS (Tailwind v4)
    layout.tsx          # Root layout & metadata
    page.tsx            # Home page
    ...                 # Additional route groups (e.g., /features, /governance)
  components/           # UI components (shadcn/ui, Radix, custom)
  lib/                  # Utilities and shared helpers
  public/               # Static assets
  styles/               # Additional styles (if any)
  tsconfig.json         # Path aliases and TS config
  next.config.mjs       # Next.js config (images, lint/TS options)
  postcss.config.mjs    # Tailwind v4 PostCSS plugin
  components.json       # shadcn/ui config
  package.json
  pnpm-lock.yaml
```

Important files:

- `app/layout.tsx` — global `<html>`/`<body>`, fonts, and `metadata`
- `app/globals.css` — Tailwind layers, tokens, and app-level styles
- `components.json` — shadcn/ui configuration, aliases, theme style, and icon library
- `tsconfig.json` — path alias `@/*` mapping used throughout the project

## Styling and UI

- Tailwind v4 is wired via `@tailwindcss/postcss` in `postcss.config.mjs`.
- Global styles are defined in `app/globals.css`.
- Component primitives are built on Radix and shadcn/ui; check `components/` and `components.json`.

If you add new shadcn/ui components, follow the shadcn generator instructions and keep design tokens consistent with the current theme.

## Development Workflow

1) Create or update routes under `app/` using the App Router conventions.
2) Build UI in `components/` and import via path aliases (e.g., `@/components/...`).
3) Keep utilities in `lib/` (e.g., `@/lib/utils`).
4) Use `pnpm dev` for local development and `pnpm build && pnpm start` to verify production behavior.

## Building and Deployment

Production build:

```
pnpm build
pnpm start
```

Deployment options:

- Vercel: Import the repository and it will auto-detect Next.js. Set environment variables in the Vercel dashboard.
- Custom Node hosting: Build and run with `pnpm build` and `pnpm start` behind your preferred process manager/reverse proxy.

Note: `images.unoptimized` is enabled in `next.config.mjs`. If you want Next.js Image Optimization with a specific loader or domain allowlist, update `next.config.mjs` accordingly.

## Testing

No testing framework is configured in this repo yet. You can add Playwright for E2E and/or Vitest/Jest + React Testing Library for unit/integration tests. Recommended scripts:

```
"test": "vitest",
"test:e2e": "playwright test"
```

## Troubleshooting

- Port already in use: change port via `pnpm dev -- -p 3001`.
- TypeScript complaints but build passes: `typescript.ignoreBuildErrors=true` is set; fix type issues during development to avoid runtime bugs.
- CSS not applying: ensure `app/globals.css` is imported by `app/layout.tsx`, and that Tailwind classes are correctly spelled.
- Slow install: prefer PNPM (lockfile present). If switching package managers, delete the lockfile to avoid conflicts.

## Contributing

1) Create a feature branch from `main`.
2) Make changes with clear commit messages.
3) Keep components accessible and composable; prefer Radix/shadcn patterns.
4) Open a PR with a clear description, screenshots, and steps to test.

## License

Unless specified otherwise in the root repository, this project is provided under its parent repository’s license. Review the root-level `LICENSE` for details.
