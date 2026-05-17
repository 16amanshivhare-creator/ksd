#!/usr/bin/env node
/**
 * Image optimization — compresses /public/images/*.jpg to WebP + smaller JPG.
 * Critical for LCP < 2.5s on mobile (Google Ads QS LP Experience signal).
 *
 * Outputs:
 *  - Original <name>.jpg → optimized in place (max 1600w, quality 78)
 *  - <name>.webp (max 1600w, quality 80)
 *
 * Usage: npm run images
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUB = path.resolve(__dirname, '..', 'public', 'images');

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(p));
    else if (/\.(jpe?g|png)$/i.test(e.name)) out.push(p);
  }
  return out;
}

async function processFile(file) {
  const stat = await fs.stat(file);
  const before = stat.size;
  const buf = await fs.readFile(file);

  const meta = await sharp(buf).metadata();
  const maxW = 1600;
  const needResize = (meta.width || 0) > maxW;

  // Compressed JPG (in place)
  const jpgOut = await sharp(buf)
    .resize({ width: needResize ? maxW : (meta.width || 1600), withoutEnlargement: true })
    .jpeg({ quality: 78, progressive: true, mozjpeg: true })
    .toBuffer();
  await fs.writeFile(file, jpgOut);

  // Sibling WebP
  const webpPath = file.replace(/\.(jpe?g|png)$/i, '.webp');
  const webpOut = await sharp(buf)
    .resize({ width: needResize ? maxW : (meta.width || 1600), withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
  await fs.writeFile(webpPath, webpOut);

  const after = jpgOut.length;
  const webp = webpOut.length;
  const saving = Math.round((1 - after / before) * 100);
  return { file: path.relative(PUB, file), before, after, webp, saving };
}

async function main() {
  console.log('🖼️  Optimizing images for LCP…\n');
  const files = await walk(PUB);
  console.log(`   Found ${files.length} images\n`);

  const results = [];
  for (const f of files) {
    process.stdout.write(`   • ${path.basename(f)} … `);
    try {
      const r = await processFile(f);
      results.push(r);
      console.log(`${(r.before/1024).toFixed(0)}KB → ${(r.after/1024).toFixed(0)}KB JPG · ${(r.webp/1024).toFixed(0)}KB WebP (-${r.saving}%)`);
    } catch (e) {
      console.log(`✗ ${e.message}`);
    }
  }

  const totalBefore = results.reduce((a, r) => a + r.before, 0);
  const totalAfter = results.reduce((a, r) => a + r.after, 0);
  console.log(`\n✅ Total: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB JPG (saved ${Math.round((1-totalAfter/totalBefore)*100)}%)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
