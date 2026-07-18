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
  }),
});

const home = defineCollection({
  loader: file('src/content/home/index.yaml', {
    parser: (text) => ({ home: parse(text) }),
  }),
  schema: z.object({
    heading: z.string(),
    intro: z.string(),
    ctas: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
  }),
});

const cv = defineCollection({
  loader: file('src/content/cv/index.yaml', {
    parser: (text) => ({ cv: parse(text) }),
  }),
  schema: z.object({
    name: z.string(),
    headline: z.string(),
    email: z.string(),
    location: z.string(),
    summary: z.string(),
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    skills: z.array(z.string()).default([]),
    experience: z
      .array(
        z.object({
          role: z.string(),
          company: z.string(),
          startDate: z.string(),
          endDate: z.string().nullish(),
          description: z.array(z.string()).default([]),
        })
      )
      .default([]),
    education: z
      .array(
        z.object({
          school: z.string(),
          degree: z.string(),
          startDate: z.string().nullish(),
          endDate: z.string().nullish(),
        })
      )
      .default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    url: z.string().nullish(),
    repo: z.string().nullish(),
    featured: z.boolean().default(false),
    coverImage: z.string().optional(),
  }),
});

export const collections = { settings, home, cv, blog, projects };
