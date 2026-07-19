# ryanfogle-dev

Personal website — home page, work/writing entries — built with [Astro](https://astro.build) and edited via [Sveltia CMS](https://sveltiacms.app), a git-based CMS.

## Stack

- **Astro** — static site generation, content collections. No SSR adapter — every page is prerendered to plain HTML at build time.
- **Tailwind CSS v4** (+ `@tailwindcss/typography`) — styling
- **Sveltia CMS** — CMS admin UI at `/admin`, a static single-page app that talks to the GitHub API directly. Authentication goes through a small, separately-deployed Cloudflare Worker ([`sveltia-cms-auth`](https://github.com/sveltia/sveltia-cms-auth)) since GitHub's OAuth token exchange needs a confidential client. See [`public/admin/config.yml`](public/admin/config.yml) for the CMS schema.
- **Cloudflare Workers** (static assets) — hosting, with `ryanfogle.dev` as a custom domain. See [`wrangler.jsonc`](wrangler.jsonc).

## Development

```sh
pnpm install
pnpm dev
```

- Site: http://localhost:4321
- CMS admin: http://localhost:4321/admin (local dev uses the "Sign In Using Access Token" or "Work with Local Repository" options; GitHub OAuth sign-in only works on the production domain, since the auth worker's `ALLOWED_DOMAINS` is scoped to `ryanfogle.dev`)

Content edited through the admin UI is committed straight to this repo via the GitHub API. Content edited locally is just regular files under `src/content/` — commit those like any other source file.

## Content model

Defined in [`src/content.config.ts`](src/content.config.ts) (Astro content collections) and mirrored in [`public/admin/config.yml`](public/admin/config.yml) (Sveltia CMS schema):

- **Home** (singleton) — `src/content/home/index.yaml` — heading, intro, photo, CTA buttons
- **Settings** (singleton) — `src/content/settings/index.yaml` — site name, meta description, footer text, nav/social links
- **Work** (collection) — `src/content/work/*.md` — plain Markdown with YAML frontmatter, covering both writing and projects (optional `url`/`repo` fields), shown at `/work`

Media uploaded through the CMS is stored in `public/media/`.

## Build

```sh
pnpm build
pnpm preview
```

`pnpm build` produces a fully static `dist/` — no server required.

## Type checking

```sh
pnpm astro check
```

TypeScript is pinned to `^6` — TypeScript 7 removed APIs that `@astrojs/check` currently depends on.

## Deployment

Deployed to Cloudflare Workers (static assets, no adapter needed) via `wrangler deploy`, with automatic builds/deploys on push to `main` through Cloudflare's Git integration.

```sh
wrangler deploy
```

### CMS authentication

The GitHub OAuth flow for Sveltia CMS is handled by a separate, standalone Cloudflare Worker deployed from [sveltia/sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) (not part of this repo). It requires:

- A GitHub OAuth App with its callback URL pointing at that worker (`<worker-url>/callback`)
- `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` set as Worker secrets (`wrangler secret put`, not `.env` — Workers don't read `.env` files)
- `ALLOWED_DOMAINS` set to restrict which site origin can use it

Only accounts with GitHub write/collaborator access to this repo can actually save changes through the CMS, regardless of the repo's public/private visibility.
