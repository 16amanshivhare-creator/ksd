import type { APIRoute } from 'astro';
import { SITE } from '@data/site';

export const GET: APIRoute = () => {
  const body = `# robots.txt — ${SITE.name}
User-agent: *
Allow: /

# Block admin UI
Disallow: /admin/
Disallow: /admin

# Sitemap
Sitemap: ${SITE.url}/sitemap.xml
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
