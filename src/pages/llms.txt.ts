import type { APIRoute } from 'astro';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * llms.txt — AI/LLM optimization (ChatGPT, Gemini, Perplexity, Claude).
 * Served as page route because Astro's public/ static asset serving was
 * 404'ing the .txt — possibly trailingSlash 'always' + [slug] catch-all
 * conflict. Mirroring the working robots.txt.ts pattern.
 */
export const GET: APIRoute = () => {
  const body = readFileSync(resolve('./public/llms.txt'), 'utf-8');
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
