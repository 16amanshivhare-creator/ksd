// html-charset-headers.mjs — append a Content-Type rule per HTML route to dist/_headers.
//
// Why this exists (2026-09-17): the live Worker served every page as bare
// "Content-Type: text/html", no charset. On panditg.in the identical gap put a Hindi
// title into Google's SERP as "à¤ªà¥ à¤œà¤¾ …" — UTF-8 read as Latin-1. This site is a
// Hindi puja site; it is the same exposure.
//
// Three things were measured before writing this, because each one ruled an option out:
//
//   1. `wrangler dev` DOES send charset=utf-8. Production does not. The local assets
//      emulation and the real Workers Assets service disagree, so local is not evidence
//      here — every claim below was checked against the deployed Worker.
//   2. Redeploying unchanged (version dc728daf) did NOT fix it. It is not a stale runtime.
//   3. `_headers` CAN set Content-Type on Workers Assets — probed in production with
//      an exact rule (/contact-us/) and a glob (/terms-of-service/*); both applied, while
//      an unruled path stayed bare. That is what this script uses.
//
// The rules cannot be hand-written: astro.config has format 'directory' +
// trailingSlash 'always', so routes are extensionless ("/our-pujas/") and the existing
// `/*.html` rule in public/_headers NEVER matches them — verified, its header did not
// appear. Hand-maintaining the list would silently miss every new page, which is exactly
// the failure this site has had before. So it is generated from what was actually built.
//
// Runs after `astro build`; writes only dist/_headers, never public/_headers.
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '../dist');
const MARKER = '# ── generated: charset per HTML route (scripts/html-charset-headers.mjs)';

function htmlFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) htmlFiles(p, out);
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

/** dist/our-pujas/index.html -> /our-pujas/ ; dist/index.html -> / ; dist/404.html -> /404.html */
const routeOf = (file) => {
  const rel = relative(DIST, file).split('\\').join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return '/' + rel.slice(0, -'index.html'.length);
  return '/' + rel;
};

const routes = [...new Set(htmlFiles(DIST).map(routeOf))].sort();

const headersPath = join(DIST, '_headers');
// Drop any previously generated block so repeated builds do not stack up.
const base = readFileSync(headersPath, 'utf8').split(MARKER)[0].trimEnd();

const block = routes.map((r) => `${r}\n  Content-Type: text/html; charset=utf-8`).join('\n\n');
writeFileSync(headersPath, `${base}\n\n${MARKER}\n# ${routes.length} routes.\n\n${block}\n`);

console.log(`html-charset-headers: ${routes.length} HTML routes given an explicit UTF-8 content type`);
