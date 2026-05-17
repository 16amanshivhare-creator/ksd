# Kaal Sarp Dosh Puja Ujjain — Astro Build

> **Live target:** kaalsarpdoshpujaujjain.com
> **Stack:** Astro 4 (static) · Tailwind · Sveltia CMS · Cloudflare Pages
> **Mission:** QS 10/10 ready · LP score 95+ mobile · SEO 100x WordPress

---

## Quick start

```bash
cd D:/aman/claude/website/websites/kaalsarpdoshpujaujjain-redesign

# 1. Install deps (one-time)
npm install

# 2. Extract content from current WordPress site (35 blog posts + images)
npm run extract

# 3. Run dev server
npm run dev
# → http://localhost:4321

# 4. Build for production
npm run build
# → outputs /dist (static HTML)
```

---

## Project layout

```
kaalsarpdoshpujaujjain-redesign/
├── src/
│   ├── data/site.ts            # ⭐ single source of truth (phone, address, pricing, tracking IDs)
│   ├── content/
│   │   ├── config.ts            # content collection schemas
│   │   ├── blog/                # 35 posts (markdown, populated by `npm run extract`)
│   │   ├── testimonials/        # 6 customer reviews (JSON)
│   │   └── faqs/                # 8 global FAQs (JSON)
│   ├── layouts/BaseLayout.astro # <head> + tracking + schema
│   ├── components/              # Header, Footer, Hero, FAQ, Testimonials, ...
│   ├── lib/schema.ts            # JSON-LD generators (LocalBusiness, Service, FAQ, Article, Breadcrumb)
│   ├── pages/
│   │   ├── index.astro                          # /
│   │   ├── about-us.astro                       # /about-us/
│   │   ├── contact-us.astro                     # /contact-us/
│   │   ├── our-pujas.astro                      # /our-pujas/
│   │   ├── customer-cabinet.astro               # /customer-cabinet/
│   │   ├── mangal-dosh-puja-in-ujjain.astro     # /mangal-dosh-puja-in-ujjain/
│   │   ├── mahamritunjaya-jaap-in-ujjain.astro  # /mahamritunjaya-jaap-in-ujjain/
│   │   ├── our-blog/index.astro                 # /our-blog/
│   │   ├── [slug].astro                         # /{post-slug}/  (35 posts)
│   │   ├── category/[category].astro            # /category/kaal-sarp-dosh/ + /category/blog/
│   │   ├── 404.astro
│   │   └── robots.txt.ts                        # dynamic robots
│   └── styles/global.css
├── public/
│   ├── admin/                  # Sveltia CMS (admin panel at /admin/)
│   ├── images/                 # hero/og/pandit photos (copied from D:\aman\Google Ads\KSD Photo)
│   ├── _redirects              # CF Pages 301 map (WordPress → Astro safety net)
│   ├── _headers                # CF Pages security + cache headers
│   ├── favicon.svg
│   └── manifest.webmanifest
├── scripts/
│   └── extract-wp-content.mjs  # WP REST API → Astro markdown extractor
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## Critical rules (do NOT break)

1. **Phone 9424002309 is LOCKED** (GMB safety) — never change, edit only in `src/data/site.ts`
2. **All 45 existing URLs preserved 1:1** — never change slugs without 301 redirect
3. **Conversion tracking architecture**: `gtag('event','conversion')` fires ONCE per tel: click, from `BaseLayout.astro` inline script. Do NOT add tracking anywhere else (per Ads HANDOFF 2026-05-10 — fixes prior double-fire bug)
4. **Ad copy + LP restrictions** (per ads HANDOFF):
   - ❌ Never: "guaranteed", "100% result", "best", "No.1", competitor compare, fear claims
   - ✅ Safe: Authentic, Vedic, 500+ Families, Mangalnath Mandir, 15+ Years, Vedic, Personalized
5. **No WhatsApp button** — owner wants calls only

---

## Deployment to Cloudflare Pages

### Step 1 — Push to GitHub
```bash
cd D:/aman/claude/website/websites/kaalsarpdoshpujaujjain-redesign
git init
git add .
git commit -m "Initial KSD Astro build — 8 pages + 35 blog ports + Sveltia CMS"
git branch -M main
git remote add origin https://github.com/16amanshivhare-creator/ksd.git
git push -u origin main
```

### Step 2 — Connect to Cloudflare Pages
1. https://dash.cloudflare.com → Workers & Pages → Create application → Pages → Connect to Git
2. Select repo `16amanshivhare-creator/ksd`
3. Build config:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (leave blank)
   - **Node version:** 20 (Environment variables → `NODE_VERSION=20`)
4. **Environment variables** (Settings → Environment variables → Production):
   - `PUBLIC_GA_ID` = `G-XXXXXX` (when GA4 setup)
   - `PUBLIC_ADS_ID` = `AW-XXXXXX` (from ads team)
   - `PUBLIC_ADS_CALL_LABEL` = `XXXXXX/XXXXXXXXXXX` (from ads team)
5. **Deploy** → live at `ksd.pages.dev` within ~2 min

### Step 3 — Custom domain (kaalsarpdoshpujaujjain.com)
1. CF Pages → Custom domains → Set up → `kaalsarpdoshpujaujjain.com` + `www.kaalsarpdoshpujaujjain.com`
2. CF will give you the **CNAME target** (e.g. `ksd-abc.pages.dev`)
3. Go to **Hostinger → hPanel → Domains → DNS Zone** for kaalsarpdoshpujaujjain.com
4. Update:
   - `@` (root) — change to CNAME / ALIAS pointing to `ksd-abc.pages.dev` (or use CF's nameservers — better)
   - `www` — CNAME to `ksd-abc.pages.dev`
5. SSL: auto-provisioned by CF within 15 min
6. DNS propagation: 5 min – 1 hour

**Recommended: switch NS to Cloudflare for fastest setup**
- CF Dashboard → Websites → Add Site → `kaalsarpdoshpujaujjain.com`
- CF will give 2 nameservers (e.g. `xxx.ns.cloudflare.com`)
- Hostinger → Domains → Nameservers → Change → paste CF nameservers
- Wait 1-24h propagation
- After CF takes over, the custom domain in Pages just works

### Step 4 — Setup Sveltia CMS GitHub OAuth (for /admin/)
Sveltia CMS uses GitHub OAuth. Options:
- **Easy:** Use Cloudflare Workers OAuth proxy (free) — guide: https://github.com/sveltia/sveltia-cms#cloudflare-workers
- **Alternative:** Use Decap CMS-compatible OAuth provider (Netlify Identity, Auth0, etc.)
- During dev, run `npx decap-server` in another terminal and Sveltia uses local backend.

### Step 5 — Submit new sitemap to Google Search Console
1. GSC → Sitemaps → Submit `https://kaalsarpdoshpujaujjain.com/sitemap-index.xml`
2. Request indexing for top 10 priority URLs (homepage + 2 service pages + top 7 KSD blogs)
3. Monitor coverage report for 7-14 days post launch

---

## Tracking placeholders to fill before launch

Edit `src/data/site.ts` → `TRACKING` object:
```ts
export const TRACKING = {
  gaId: 'G-XXXXXXX',          // ⚠️ Replace before launch
  adsId: 'AW-XXXXXXXXXX',     // ⚠️ Replace before launch
  callConvLabel: 'XXXXXX/XXXXXXXXXXX', // ⚠️ Replace before launch
  txnIdPrefix: 'ksd_'
};
```

Get these from Aman's Google Ads account (`mangal_dosh_puja_apna_wala`).

---

## QS 10/10 checklist (verify before ads launch)

- [ ] LP Score 95+ on PageSpeed Insights mobile (target metric)
- [ ] LCP < 2.5s on 4G
- [ ] All schemas valid (https://search.google.com/test/rich-results)
- [ ] All 45 old URLs return 200 (or 301 to themselves)
- [ ] Phone 9424002309 in `<head>`, header, hero, mobile bar, footer (5 placements)
- [ ] Sticky mobile call bar visible <768px
- [ ] Sitemap submitted to GSC + indexed
- [ ] H1 of /  contains "काल सर्प दोष पूजा उज्जैन" + ad headline match
- [ ] No JS errors in console
- [ ] No "best/guaranteed/100%" language (compliance check)

---

## Updating content (post-launch — for SEO team)

1. Login at https://kaalsarpdoshpujaujjain.com/admin/ (GitHub OAuth)
2. Edit/create blog posts via visual editor
3. Save → triggers Cloudflare Pages rebuild (auto, ~90s)
4. Live update visible

---

## Maintenance

- **Dependencies:** `npm update` quarterly
- **Astro upgrade:** `npx @astrojs/upgrade` on minor versions
- **Backup:** GitHub repo IS the backup (all content versioned)
