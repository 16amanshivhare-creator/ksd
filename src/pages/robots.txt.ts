import type { APIRoute } from 'astro';
import { SITE } from '@data/site';

/**
 * robots.txt — Cloudflare AI Crawl Control may prepend a managed block.
 * To avoid duplicate `User-agent: *` groups (invalid per Google spec),
 * we only specify admin-disallow + sitemap. Universal Allow is implicit.
 */
export const GET: APIRoute = () => {
  const body = `# Block admin UI for all crawlers
User-agent: *
Disallow: /admin/
Disallow: /admin

# Sitemap
Sitemap: ${SITE.url}/sitemap.xml
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
