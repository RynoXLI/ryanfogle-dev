---
title: This site
description: How this site is built — Astro, Sveltia CMS, Tailwind, and a Cloudflare Workers deploy with a few surprises along the way.
publishedDate: 2026-07-18
tags:
  - astro
  - sveltia-cms
  - typescript
  - cloudflare
url: ''
repo: https://github.com/RynoXLI/ryanfogle-dev
featured: true
---

This is my second personal site; the first was a Flask app on an EC2 box
that billed me around the clock. This one is my home base for sharing
projects and writing about what I'm building — and it costs me nothing to
run. Here's how it's put together.

## Stack

- [**Astro**](https://astro.build) for static site generation. There's no
  server-side rendering here — every page is built to plain HTML at build
  time, which keeps things fast and simple to host.
- [**Sveltia CMS**](https://sveltiacms.app) as a git-based CMS. It's a single
  static admin page (`/admin`) that talks to the GitHub API directly, so I
  can edit content — this post included — from any browser, on any device,
  with changes committed straight to the repo. No server, no database.
- **Tailwind CSS v4** for styling, with the typography plugin handling the
  prose styling you're reading right now.
- **TypeScript** throughout, including typed content collections defined in
  `content.config.ts`.

## Hosting

The built site is a folder of static files, deployed to **Cloudflare**
**Workers** using its static assets feature — no server, no adapter, just
`wrangler deploy` uploading the `dist/` folder. It's connected to GitHub, so
pushes to `main` trigger a fresh build and deploy automatically, and it's
served from a custom domain (`ryanfogle.dev`) instead of the default
`workers.dev` subdomain.

## A bit of history

The old site, [resume_server](https://github.com/RynoXLI/resume_server), was
a Flask app served with Gunicorn in a Docker container, running on a `t3.micro`
AWS EC2 instance. It worked, but that EC2 box was a real server — always on,
always billing me by the hour whether anyone visited the site or not
(`t3.micro` on-demand pricing runs about $0.0104/hour, which adds up to
roughly $7–8 a month just for compute, before storage or data transfer), and
something I had to patch and maintain myself (it even moonlighted as a
Valheim game server on the side). I took it down around 2022/2023 once the
upkeep and cost stopped feeling worth it.

This new stack flips that equation. There's no server to keep alive:
everything builds down to static HTML ahead of time, and Cloudflare Workers'
static assets hosting serves it for effectively free at this scale. No
patching, no idle compute burning money overnight, no SSH-ing in to restart
anything — just a `git push` and the site rebuilds and redeploys itself.

## How it was built

I built this site pairing with **Claude Sonnet 5** in an agentic coding
setup — I chose the stack and made the architectural calls, and Claude
handled most of the implementation: scaffolding the Astro/Tailwind setup,
writing the content collections and pages, and working through the
Cloudflare Workers deployment, custom domain and all. It also handled
migrating the CMS from Keystatic to Sveltia CMS once I decided I wanted to
edit content from anywhere without reintroducing a server.

What made the deployment part actually work smoothly was a set of
Cloudflare-specific agent skills it had access to — reference docs for
Workers, Pages, and Wrangler that it could pull from instead of relying
purely on stale training knowledge.
