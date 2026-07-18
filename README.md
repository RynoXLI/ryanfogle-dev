# ryanfogle-dev

Personal website — CV and work (writing + projects) — built with [Astro](https://astro.build) and edited via [Keystatic](https://keystatic.com), a git-based CMS.

## Stack

- **Astro** — static site generation, content collections
- **Tailwind CSS v4** (+ `@tailwindcss/typography`) — styling
- **Markdoc** — work entry content format
- **Keystatic** — CMS admin UI at `/keystatic`, currently in `local` storage mode (reads/writes files directly on disk; no auth required)
- **@astrojs/node** — server adapter, required so Keystatic's admin UI can run; all public pages (`/`, `/cv`, `/work/*`) are still prerendered to static HTML at build time

## Development

```sh
pnpm install
pnpm dev
```

- Site: http://localhost:4321
- CMS admin: http://localhost:4321/keystatic

Content edited through the admin UI is written straight to the files under `src/content/`. Commit those changes like any other source file.

## Content model

Defined in [`keystatic.config.ts`](keystatic.config.ts) (CMS schema) and [`src/content.config.ts`](src/content.config.ts) (Astro content collections read by pages):

- **CV** (singleton) — `src/content/cv/index.yaml`
- **Work** (collection) — `src/content/work/*.mdoc`, a single content type covering both writing and projects (optional `url`/`repo` fields for project links), shown as one public "Work" section at `/work`

## Build

```sh
pnpm build
pnpm preview
```

`pnpm build` produces a hybrid output in `dist/`: prerendered static HTML for all public pages, plus a small Node server (`dist/server/`) that serves the Keystatic admin routes. Run it with `node dist/server/entry.mjs`, or `pnpm preview` for a quick local check.

## Type checking

```sh
pnpm astro check
```

TypeScript is pinned to `^6` — TypeScript 7 removed APIs that `@astrojs/check` currently depends on.

## Deployment notes

- Keystatic is currently in **local** storage mode, meant for editing on your own machine before committing. It is not intended to be exposed publicly as-is.
- Moving to **GitHub** storage mode (so the admin UI can be used from anywhere, with GitHub-backed auth) requires creating a GitHub App and setting `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, and `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` env vars — see the [Keystatic GitHub mode docs](https://keystatic.com/docs/github-model).
- The Cloudflare adapter (`@astrojs/cloudflare`) was evaluated but dropped: its workerd-based dev/build simulation broke both direct filesystem reads and Keystatic's admin UI bundle. `@astrojs/node` does not have this problem. If deploying to Cloudflare is still a goal, revisit this with a plain static export (no adapter, admin UI disabled in production) or check for updated adapter compatibility.
