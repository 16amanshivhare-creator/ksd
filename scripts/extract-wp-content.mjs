#!/usr/bin/env node
/**
 * WordPress → Astro content extractor.
 * Pulls all posts + pages from kaalsarpdoshpujaujjain.com WP REST API.
 * Converts HTML → Markdown, downloads featured images, writes Astro content files.
 *
 * Usage: npm run extract
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fetch from 'node-fetch';
import TurndownService from 'turndown';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const WP_BASE = 'https://kaalsarpdoshpujaujjain.com/wp-json/wp/v2';
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');
const IMG_DIR = path.join(ROOT, 'public', 'images', 'blog');

const td = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '_'
});

td.addRule('preserveLineBreaks', {
  filter: ['br'],
  replacement: () => '\n'
});

td.addRule('cleanFigureCaption', {
  filter: (node) => node.nodeName === 'FIGCAPTION',
  replacement: (content) => content ? `\n\n*${content}*\n\n` : ''
});

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function fetchAll(endpoint) {
  const out = [];
  let page = 1;
  while (true) {
    const url = `${WP_BASE}/${endpoint}?per_page=100&page=${page}&_embed=wp:featuredmedia,wp:term`;
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 400) break; // no more pages
      throw new Error(`${endpoint} page ${page}: ${res.status}`);
    }
    const items = await res.json();
    if (!Array.isArray(items) || items.length === 0) break;
    out.push(...items);
    if (items.length < 100) break;
    page++;
  }
  return out;
}

async function downloadImage(url, slug) {
  if (!url) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    const ext = path.extname(new URL(url).pathname) || '.jpg';
    const filename = `${slug}${ext}`;
    const filepath = path.join(IMG_DIR, filename);
    await fs.writeFile(filepath, buf);
    return `/images/blog/${filename}`;
  } catch (e) {
    console.warn(`  ! image download failed for ${slug}: ${e.message}`);
    return null;
  }
}

function decodeEntities(s) {
  if (!s) return '';
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&hellip;/g, '…')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8217;/g, '’')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”');
}

function detectLanguage(text) {
  const devanagari = (text.match(/[ऀ-ॿ]/g) || []).length;
  const total = text.replace(/\s/g, '').length;
  if (devanagari / total > 0.4) {
    // crude Marathi vs Hindi — Marathi uses "च्या / ची / ला / ने / आहे"
    if (/(\sच्या\s|\sची\s|\sला\s|\sआहे)/.test(text)) return 'mr';
    return 'hi';
  }
  return 'en';
}

function getSeoFromYoast(yoast) {
  if (!yoast) return {};
  return {
    title: yoast.title,
    description: yoast.description || yoast.og_description,
    ogImage: yoast.og_image?.[0]?.url
  };
}

function frontmatterEscape(v) {
  if (v === undefined || v === null) return '';
  const s = String(v).replace(/"/g, '\\"').replace(/\n/g, ' ').trim();
  return `"${s}"`;
}

async function processPost(post) {
  const slug = post.slug;
  const titleRaw = decodeEntities(post.title.rendered);
  const html = post.content.rendered;
  const body = td.turndown(html);
  const lang = detectLanguage(titleRaw + ' ' + body.slice(0, 500));

  const yoast = getSeoFromYoast(post.yoast_head_json);
  const seoTitle = decodeEntities(yoast.title || titleRaw).slice(0, 70);
  const seoDesc = (decodeEntities(yoast.description || '') ||
                   decodeEntities(post.excerpt?.rendered || '').replace(/<[^>]*>/g, '').slice(0, 160)).trim();

  const featured = post._embedded?.['wp:featuredmedia']?.[0];
  let imagePath = null;
  if (featured?.source_url) {
    imagePath = await downloadImage(featured.source_url, slug);
  } else if (yoast.ogImage) {
    imagePath = await downloadImage(yoast.ogImage, slug);
  }

  const terms = post._embedded?.['wp:term']?.flat() || [];
  const categories = terms.filter((t) => t.taxonomy === 'category').map((t) => t.slug);
  const tags = terms.filter((t) => t.taxonomy === 'post_tag').map((t) => t.name);
  const category = categories.includes('kaal-sarp-dosh') ? 'kaal-sarp-dosh' : 'blog';

  // Extract focus keyword guess
  const focusKw = (yoast.title || titleRaw)
    .replace(/[|·:].*$/, '')
    .toLowerCase()
    .trim()
    .slice(0, 60);

  // Pad description if too short
  let descFinal = seoDesc;
  if (descFinal.length < 120) {
    descFinal = (descFinal + ' — Ujjain ke vaidik pandit ji se jaaniye prachin gyaan, vidhi aur upay.').slice(0, 170);
  }
  if (descFinal.length > 170) descFinal = descFinal.slice(0, 167) + '...';

  const fm = [
    '---',
    `title: ${frontmatterEscape(seoTitle)}`,
    `description: ${frontmatterEscape(descFinal)}`,
    `pubDate: ${frontmatterEscape(post.date.split('T')[0])}`,
    `updatedDate: ${frontmatterEscape(post.modified.split('T')[0])}`,
    `slug: ${frontmatterEscape(slug)}`,
    imagePath ? `image: ${frontmatterEscape(imagePath)}` : null,
    imagePath ? `imageAlt: ${frontmatterEscape(seoTitle)}` : null,
    `category: ${frontmatterEscape(category)}`,
    `tags: [${tags.map((t) => frontmatterEscape(t)).join(', ')}]`,
    `focusKeyword: ${frontmatterEscape(focusKw)}`,
    `language: ${frontmatterEscape(lang)}`,
    `author: "Pandit Ji"`,
    `legacyWpId: ${post.id}`,
    'draft: false',
    '---',
    '',
    body.trim()
  ].filter(Boolean).join('\n');

  const filepath = path.join(BLOG_DIR, `${slug}.md`);
  await fs.writeFile(filepath, fm, 'utf8');
  return { slug, lang, category, image: imagePath };
}

async function main() {
  console.log('🪔 KSD WP → Astro extractor\n');
  await ensureDir(BLOG_DIR);
  await ensureDir(IMG_DIR);

  console.log('📥 Fetching posts from WP REST API…');
  const posts = await fetchAll('posts');
  console.log(`   Found ${posts.length} posts\n`);

  const results = [];
  for (const post of posts) {
    process.stdout.write(`   • ${post.slug} … `);
    try {
      const r = await processPost(post);
      results.push(r);
      console.log(`✓ (${r.lang}, ${r.category}${r.image ? ', img' : ''})`);
    } catch (e) {
      console.log(`✗ ${e.message}`);
    }
  }

  console.log(`\n✅ Done. ${results.length} posts written to src/content/blog/`);
  console.log('\nBy language:');
  for (const lang of ['hi', 'en', 'mr']) {
    console.log(`   ${lang}: ${results.filter((r) => r.lang === lang).length}`);
  }
  console.log('\nBy category:');
  for (const cat of ['kaal-sarp-dosh', 'blog']) {
    console.log(`   ${cat}: ${results.filter((r) => r.category === cat).length}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
