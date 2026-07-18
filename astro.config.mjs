// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';

// Keystatic uses `storage: { kind: 'local' }` (see keystatic.config.ts), which
// edits content files directly on disk. That only makes sense when running
// `astro dev` locally — it can't write files on a static host like Cloudflare
// Pages, and previously caused filesystem-sandboxing failures when deployed
// with an SSR adapter. So the /keystatic admin UI is only included in dev;
// production builds are 100% static (no adapter needed at all).
const isDev = process.env.NODE_ENV !== 'production';

// https://astro.build/config
export default defineConfig({
  site: 'https://ryanfogle.dev',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), markdoc(), sitemap(), ...(isDev ? [keystatic()] : [])]
});