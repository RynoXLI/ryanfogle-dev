import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse } from 'yaml';

const settings = defineCollection({
  loader: file('src/content/settings/index.yaml', {
    parser: (text) => ({ settings: parse(text) }),
  }),
  schema: z.object({
    siteName: z.string(),
    defaultDescription: z.string(),
    footerText: z.string(),
    navLinks: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
    socialLinks: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
  }),
});

const home = defineCollection({
  loader: file('src/content/home/index.yaml', {
    parser: (text) => ({ home: parse(text) }),
  }),
  schema: z.object({
    heading: z.string(),
    intro: z.string(),
    photo: z.string().optional(),
    ctas: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    url: z.string().nullish(),
    repo: z.string().nullish(),
    featured: z.boolean().default(false),
    coverImage: z.string().optional(),
  }),
});

export const collections = { settings, home, work };
