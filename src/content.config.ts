import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    category: z.enum(['product', 'experience', 'travel']).default('experience'),
    draft: z.boolean().default(false),
  }),
});

const home = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/home' }),
  schema: z.object({
    headline: z.string(),
    nav: z.array(z.object({
      label: z.string(),
      href: z.string(),
    })),
    meta: z.object({
      fullName: z.string(),
      jobTitle: z.string(),
      employer: z.string(),
      description: z.string(),
      email: z.string(),
      knowsAbout: z.array(z.string()),
      social: z.array(z.string()),
    }),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    roles: z.array(z.object({
      company: z.string(),
      title: z.string(),
      dates: z.string(),
      description: z.string(),
    })),
    proofOfWork: z.array(z.object({
      title: z.string(),
      description: z.string(),
      type: z.enum(['talk', 'blog', 'press', 'launch', 'impact', 'open-source']).optional(),
      link: z.string().url().optional(),
    })),
  }),
});

export const collections = { home, writing, work };
