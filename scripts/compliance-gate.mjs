// Puja compliance gate — fails the build if a rendered page makes a claim this site
// never makes: that puja is performed at Mahakaleshwar, darshan/Bhasma Aarti access,
// VIP darshan, cure or guarantee promises, comparisons with other cities.
//
// It scans rendered dist/ HTML (text, meta, alt, JSON-LD) rather than source, because
// source scans also hit code comments that never reach a reader.
//
// Patterns: scripts/puja_compliance.json
//   content_block  -> FAIL the build
//   content_review -> printed for a human, never fails
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const C = JSON.parse(readFileSync(new URL('./puja_compliance.json', import.meta.url), 'utf8'));
const QUIET_REVIEW = process.argv.includes('--quiet-review');

function walk(d) {
  return readdirSync(d).flatMap((n) => {
    const p = join(d, n);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
  });
}

// Keep what a reader or a search engine reads: text, meta/alt/title attributes, JSON-LD.
function readable(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<script(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<(?:meta|img)[^>]*?(?:content|alt)="([^"]*)"[^>]*>/gi, ' $1 ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');
}

// A hit is excused only by the row's own options (see _options in the JSON):
//   negatable      -> the sentence around it contains a negator
//   skip_questions -> the sentence around it is a question
const NEG = /\b(?:no|not|never|cannot|can't|don't|doesn't)\b|नहीं|न\s*ही/i;
function sentenceAt(t, i, len) {
  const stop = /[.।?!\n]/;
  let a = i; while (a > 0 && !stop.test(t[a - 1])) a--;
  let b = i + len; while (b < t.length && !stop.test(t[b])) b++;
  return t.slice(a, Math.min(t.length, b + 1));
}
function excused(t, m, o = {}) {
  const s = sentenceAt(t, m.index, m[0].length);
  if (o.skip_questions && /\?\s*$/.test(s)) return true;
  if (o.negatable && NEG.test(s)) return true;
  return false;
}

const fails = [];
const reviews = [];
const files = walk(DIST).filter((f) => !f.includes('/admin/'));
for (const f of files) {
  const t = readable(readFileSync(f, 'utf8'));
  const route = '/' + relative(DIST, f).replace(/index\.html$/, '').replace(/\.html$/, '/');
  for (const [p, why, o] of C.content_block) {
    const re = new RegExp(p, 'gi');
    let m;
    while ((m = re.exec(t))) {
      if (excused(t, m, o)) continue;
      fails.push([route, why, t.slice(Math.max(0, m.index - 40), m.index + m[0].length + 30)]);
    }
  }
  for (const [p, why] of C.content_review || []) {
    const re = new RegExp(p, 'gi');
    let m;
    while ((m = re.exec(t))) reviews.push([route, why, t.slice(Math.max(0, m.index - 30), m.index + m[0].length + 20)]);
  }
}

if (reviews.length && !QUIET_REVIEW) {
  const byWhy = {};
  for (const [r, why] of reviews) (byWhy[why] ||= new Set()).add(r);
  console.log(`\n[compliance] REVIEW (human reads, does not fail) — ${reviews.length} hits`);
  for (const [why, rs] of Object.entries(byWhy)) console.log(`  · ${why.split(' — ')[0]}: ${rs.size} page(s)`);
}

if (fails.length) {
  console.error(`\n[compliance] ❌ ${fails.length} blocked claim(s) in ${new Set(fails.map((x) => x[0])).size} page(s):`);
  for (const [r, why, ctx] of fails) console.error(`  ${r}\n     ${why}\n     …${ctx.trim()}…`);
  process.exit(1);
}
console.log(`[compliance] ✅ ${files.length} pages clean`);
