// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  adapter: node({ mode: 'standalone' }),

  // The Keystatic admin UI (/keystatic) is server-rendered; the rest of the
  // site's pages are still prerendered to static HTML by default.
  integrations: [react(), markdoc(), keystatic()]
});