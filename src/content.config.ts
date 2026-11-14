import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const noticias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/noticias' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    excerpt: z.string().optional(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    author: z.string().default('Redacción PDC Noticias'),
    category: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    imageCaption: z.string().optional(),
    heroImage: z.string().optional(),
    featured: z.boolean().default(false),
    breaking: z.boolean().default(false),
    oldSlug: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { noticias };
