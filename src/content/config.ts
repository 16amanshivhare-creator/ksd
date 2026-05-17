import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(70, 'SEO: keep ≤70 chars'),
    description: z.string().min(120).max(170, 'Meta desc 120-170 chars'),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    category: z.enum(['kaal-sarp-dosh', 'blog']).default('blog'),
    tags: z.array(z.string()).default([]),
    focusKeyword: z.string(),
    author: z.string().default('Pandit Ji'),
    language: z.enum(['hi', 'en', 'mr']).default('hi'),
    faq: z
      .array(z.object({ q: z.string(), a: z.string() }))
      .default([]),
    schemaType: z.enum(['Article', 'BlogPosting', 'FAQPage']).default('BlogPosting'),
    legacyWpId: z.number().optional()
  })
});

const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    city: z.string(),
    rating: z.number().min(1).max(5).default(5),
    quote: z.string().min(20).max(500),
    pujaType: z.string().optional(),
    date: z.coerce.date()
  })
});

const faqs = defineCollection({
  type: 'data',
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    tags: z.array(z.string()).default([])
  })
});

export const collections = { blog, testimonials, faqs };
