import type { APIRoute } from 'astro';
import { SITE } from '@data/site';

/**
 * robots.txt — MINIMAL (sitemap-only).
 * - CF AI Crawl Control auto-injects its own User-agent groups
 * - /admin already has <meta name="robots" content="noindex, nofollow" />
 *   so it's protected without robots.txt disallow
 * - This avoids duplicate User-agent: * groups (validator error)
 */
export const GET: APIRoute = () => {
  const body = `Sitemap: ${SITE.url}/sitemap.xml
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
