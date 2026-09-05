import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '@data/site';

const STATIC_PAGES = [
  { url: '/', priority: 1.0, changefreq: 'daily' },
  { url: '/about-us/', priority: 0.8, changefreq: 'monthly' },
  { url: '/our-pujas/', priority: 0.9, changefreq: 'weekly' },
  { url: '/our-blog/', priority: 0.8, changefreq: 'daily' },
  { url: '/contact-us/', priority: 0.7, changefreq: 'monthly' },
  { url: '/customer-cabinet/', priority: 0.5, changefreq: 'monthly' },
  { url: '/kaal-sarp-dosh-puja-in-ujjain/', priority: 1.0, changefreq: 'weekly' },
  { url: '/mangal-dosh-puja-in-ujjain/', priority: 0.9, changefreq: 'weekly' },
  { url: '/mahamritunjaya-jaap-in-ujjain/', priority: 0.9, changefreq: 'weekly' },
  { url: '/category/kaal-sarp-dosh/', priority: 0.7, changefreq: 'weekly' },
  { url: '/category/blog/', priority: 0.6, changefreq: 'weekly' }
];

/**
 * Money-cluster blog posts that must NOT be sitemap-signalled as ordinary posts.
 * 2026-09-05: /kaal-sarp-dosh-puja-ujjain-cost/ (built 06-14, the highest
 * commercial-intent page on the site) was still "Discovered - currently not
 * indexed, crawl=NEVER" after 83 days. It shipped at priority 0.6 / monthly —
 * the same tier as the generic astrology posts — and Google spent its crawl
 * budget accordingly. Raise the commercial pages; leave the rest at 0.6.
 */
const BLOG_PRIORITY_OVERRIDES: Record<string, { priority: number; changefreq: string }> = {
  'kaal-sarp-dosh-puja-ujjain-cost': { priority: 0.9, changefreq: 'weekly' },
  'ujjain-mein-kaalsarp-dosh-ki-puja-kab-hoti-hai': { priority: 0.8, changefreq: 'weekly' },
  'kaal-sarp-dosh-ki-puja-kaha-hoti-hai': { priority: 0.8, changefreq: 'weekly' }
};

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const today = new Date().toISOString().split('T')[0];

  const urls = [
    ...STATIC_PAGES.map((p) => ({
      loc: `${SITE.url}${p.url}`,
      lastmod: today,
      changefreq: p.changefreq,
      priority: p.priority
    })),
    ...posts.map((p) => {
      const o = BLOG_PRIORITY_OVERRIDES[p.slug];
      return {
        loc: `${SITE.url}/${p.slug}/`,
        lastmod: (p.data.updatedDate || p.data.pubDate).toISOString().split('T')[0],
        changefreq: o?.changefreq ?? 'monthly',
        priority: o?.priority ?? 0.6
      };
    })
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
