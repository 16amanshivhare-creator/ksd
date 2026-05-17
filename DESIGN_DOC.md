# kaalsarpdoshpujaujjain.com — Complete Redesign Design Document

> **Project:** Migrate from WordPress to modern stack with 100x better SEO + LP score 95+ + QS 10/10 ready
> **Owner:** Aman Shivhare (ByteFlow Technologies)
> **Status:** Design Phase
> **Last Updated:** 2026-05-10

---

## 1. PROJECT GOALS

### Primary Goals (must-haves)
1. **Preserve ALL existing URLs** — zero URL changes (SEO-safe)
2. **Preserve ALL existing meta data** — title, description, keywords, schemas
3. **LP Score 95+ on PageSpeed Insights mobile** (currently WordPress = 50-70)
4. **Quality Score 10/10 ready** — for Google Ads dominance
5. **SEO 100x better than WordPress** — built-in, no plugins needed
6. **Blog feature** — fully functional, SEO-optimized
7. **Zero hardcoding** — all content/copy/SEO editable from admin panel
8. **GMB-safe** — phone number 9424002309 stays unchanged

### Constraints
- Must use existing domain (kaalsarpdoshpujaujjain.com)
- Cannot break GMB listing
- Cannot lose current organic rankings during migration
- Should be self-hostable on Hostinger (or similar)

---

## 2. RECOMMENDED TECH STACK

### Recommendation: **Astro + Tina CMS**

**Why Astro?**
- **Best LP/Lighthouse scores** in industry (built for content sites)
- **Zero JS by default** — only ships JS where needed (islands architecture)
- **Built-in SEO**: sitemap, RSS, canonical URLs, OpenGraph
- **Built-in image optimization** (WebP/AVIF, responsive)
- **MDX support** — perfect for blog
- **Multi-framework** — can use React for interactive parts
- **Static generation by default** — instant page loads
- **Server-rendered HTML** — Google sees everything (no React SPA crawler issue)

**Why Tina CMS for admin?**
- **Visual editor** — like WordPress page builder
- **Git-based** — content stored in markdown/JSON files (version controlled)
- **Free for self-hosted**
- **Live preview** — see changes before saving
- **Schema-driven** — define content types in code
- **Markdown for blog** — clean, portable
- **Image upload + management** built-in

**Comparison vs WordPress:**

| Factor | WordPress | Astro + Tina | Winner |
|---|---|---|---|
| Page Speed (mobile) | 50-70 | **95-100** | Astro |
| Initial JS bundle | 200-500 KB | **0-30 KB** | Astro |
| Build-time SEO | Plugin (Yoast) | **Built-in** | Astro |
| Schema.org JSON-LD | Manual/plugin | **Native** | Astro |
| Sitemap | Plugin | **Auto** | Astro |
| Image optimization | Plugin | **Built-in** | Astro |
| Security vulnerabilities | High (PHP + plugins) | **Low (static)** | Astro |
| Hosting cost | Medium ($5-20/mo) | **Free static or $5** | Astro |
| Admin UX | Excellent | Good (Tina) | WordPress |
| Plugin ecosystem | Massive | Smaller | WordPress |
| Long-term maintenance | High (updates) | **Low** | Astro |

**Alternative considered but NOT recommended:**
- **Next.js** — heavier, more JS, overkill for content site
- **Pure WordPress (just optimized)** — fundamental tech limitation
- **React + Vite + Pre-render** (current other site stack) — works but Astro is better for SEO-first sites

---

## 3. URL PRESERVATION STRATEGY

### Step 1: Crawl current site
- Use Screaming Frog SEO Spider (free for <500 URLs)
- Export full URL list with: title, description, H1, status code, indexability
- Save as `current-urls.csv`

### Step 2: URL mapping document
- Every existing URL → equivalent new URL
- Goal: 1:1 mapping (no changes)
- Document edge cases (paginated pages, archives, taxonomies)

### Step 3: Astro page structure mirrors URLs
```
src/pages/
├── index.astro                              → /
├── kaal-sarp-dosh-puja/index.astro          → /kaal-sarp-dosh-puja/
├── kaal-sarp-dosh-types/index.astro         → /kaal-sarp-dosh-types/
├── about/index.astro                        → /about/
├── contact/index.astro                      → /contact/
├── blog/index.astro                         → /blog/
├── blog/[slug].astro                        → /blog/post-name/
└── ... (every existing URL)
```

### Step 4: 301 redirects (only if needed)
- If any URL changes (avoid this), set up 301 in `.htaccess`
- Test all redirects with httpstatus.io

### Step 5: Sitemap.xml regeneration
- Astro auto-generates sitemap with same URLs
- Submit to Google Search Console post-launch

---

## 4. SEO PRESERVATION & ENHANCEMENT

### Preservation Checklist (extract from current site)
- [ ] Page titles (every page)
- [ ] Meta descriptions (every page)
- [ ] Meta keywords (every page)
- [ ] H1 tags
- [ ] H2/H3 hierarchy
- [ ] All visible content text (verbatim)
- [ ] Image alt texts
- [ ] Image filenames (preserve)
- [ ] Internal link structure
- [ ] External link nofollow status
- [ ] Canonical URLs
- [ ] Open Graph tags (og:title, og:image, og:description)
- [ ] Twitter Card tags
- [ ] Schema markup (if any)
- [ ] Robots.txt rules
- [ ] Existing 301 redirects (if any)

### Enhancement (100x better than WordPress)

**A. Per-page Metadata API**
```astro
---
// Every page has full metadata control
import Layout from '../layouts/SEOLayout.astro';
const seo = {
  title: "Kaal Sarp Dosh Puja Ujjain | Authentic Vedic Vidhi",
  description: "Book authentic Kaal Sarp Dosh Puja at Ujjain...",
  keywords: "kaal sarp dosh puja ujjain, kalsarp shanti puja",
  canonical: "https://kaalsarpdoshpujaujjain.com/",
  ogImage: "/images/ksd-puja-og.jpg",
};
---
<Layout {...seo}>
  <!-- page content -->
</Layout>
```

**B. Schema.org JSON-LD on every page (auto-generated)**
- LocalBusiness (homepage, contact)
- Service (each puja page)
- FAQPage (FAQ sections)
- BreadcrumbList (navigation)
- Article (blog posts)
- Organization (sitewide)
- AggregateRating (with reviews)

**C. Auto-generated assets**
- `sitemap.xml` (auto, includes blog posts)
- `robots.txt` (configurable, sitemap referenced)
- `rss.xml` (for blog)
- `humans.txt` (optional)
- Web manifest (PWA-ready)
- Favicons (all sizes)

**D. Open Graph + Twitter Cards on every page**
- og:title, og:description, og:image, og:url, og:type
- twitter:card, twitter:title, twitter:image

**E. Performance SEO signals**
- Core Web Vitals optimized:
  - LCP < 1.5s (target)
  - FID < 50ms (target)
  - CLS < 0.05 (target)
- Mobile-first responsive
- HTTPS (Hostinger SSL)
- Fast TTFB (<100ms)

**F. Internal linking strategy**
- Auto breadcrumbs (Astro component)
- Related posts (blog)
- Service cross-links (canonical structure)
- Internal link graph optimization

**G. Image SEO**
- All images optimized (WebP/AVIF + fallback)
- Alt text required (linting rule)
- Lazy-loaded (loading="lazy")
- Width/height attributes (no CLS)
- Responsive srcset

**H. Hindi/English language tagging**
- `<html lang="hi">` for Hindi pages
- `<html lang="en">` for English pages
- Hreflang if multiple languages exist

---

## 5. LP SCORE & PERFORMANCE STRATEGY

**Target metrics:**
- PageSpeed Mobile: **95+**
- PageSpeed Desktop: **98+**
- LCP: **<1.5s**
- FID: **<50ms**
- CLS: **<0.05**
- TTI: **<3s**
- Total page weight: **<200 KB**

**Tactics:**

### A. Static Generation (default)
- All marketing pages pre-rendered at build time
- Served as static HTML from CDN
- Instant load (no server processing)

### B. Image optimization
- Astro's `<Image>` component
- Auto WebP/AVIF conversion
- Responsive srcset
- Lazy loading
- Width/height attributes

### C. Font optimization
- System fonts as fallback
- Variable fonts (single file)
- Preloaded with `font-display: swap`
- Subset to characters used (Hindi + Latin)

### D. CSS optimization
- Critical CSS inlined per page
- Rest deferred
- Tailwind CSS (purged at build, only used classes)
- No CSS-in-JS runtime overhead

### E. JavaScript optimization
- Astro Islands: only interactive components ship JS
- Static content = 0 JS
- Tracking scripts deferred (after user interaction or 2.5s timeout)
- Code splitting per route

### F. Network optimization
- HTTP/2 (Hostinger supports)
- Brotli compression
- Aggressive cache headers (1 year for hashed assets)
- Preconnect to tracking domains
- DNS-prefetch

### G. Render optimization
- No render-blocking resources
- Above-fold content prioritized
- Hero image preloaded with `fetchpriority="high"`
- Non-critical CSS/JS deferred

---

## 6. QUALITY SCORE 10/10 STRATEGY

For Google Ads QS 10/10, three components must be "Above Average":

### A. Expected CTR
**Owned by:** Ad copy quality (managed separately in Google Ads)
- Strong headlines with keyword
- Compelling descriptions
- Use ad extensions (sitelinks, callouts)
- A/B test ads

### B. Ad Relevance
**Owned by:** Keyword → Ad → LP alignment
- Keyword in H1 of LP
- Keyword in first 100 words
- Keyword in meta title
- Keyword in URL slug
- LP topic = keyword topic

### C. Landing Page Experience (THIS IS WHERE NEW SITE WINS)
**Owned by:** Site quality
- ✅ Fast loading (95+ PageSpeed = automatic)
- ✅ Mobile-friendly (Astro default)
- ✅ Easy navigation (clear menu, breadcrumbs)
- ✅ Trust signals (reviews, photos, address)
- ✅ HTTPS
- ✅ Working contact (tel: links, forms)
- ✅ Original content (not duplicated)
- ✅ Clear value proposition above fold
- ✅ No deceptive practices
- ✅ Proper privacy policy / terms

**LP per keyword theme:**
- `/kaal-sarp-dosh-puja/` — for "kaal sarp dosh puja" searches
- `/kaal-sarp-shanti-puja/` — for "kaal sarp shanti puja" searches
- `/naag-bali-puja/` — for "naag bali puja" searches
- `/kaal-sarp-dosh-types/` — for "kaal sarp types" searches
- Each LP optimized for its specific keyword cluster

---

## 7. CONTENT ARCHITECTURE

### Pages structure
```
/                                    Home (overview, all services)
/kaal-sarp-dosh-puja/                Main service LP
/kaal-sarp-dosh-types/               12 types of KSD (informational)
/naag-bali-puja/                     Related ritual LP
/tripindi-shradh/                    Related ritual LP
/about/                              About + Pandit profile
/gallery/                            Photo gallery
/testimonials/                       Reviews + ratings
/contact/                            Contact + booking form
/blog/                               Blog index
/blog/[slug]/                        Individual blog posts
/faq/                                FAQ page
/privacy-policy/                     Legal
/terms/                              Legal
/sitemap.xml                         Auto-generated
/robots.txt                          Configurable
/rss.xml                             Blog RSS feed
```

### Content types (Tina CMS schemas)
1. **Page** — generic page (home, about, etc.)
2. **Service** — puja service page (with structured data)
3. **BlogPost** — blog article
4. **Testimonial** — customer review
5. **FAQ** — question + answer
6. **GalleryImage** — image with caption + alt
7. **SiteSettings** — global config (phone, email, address, social links)

---

## 8. ADMIN PANEL SPECS (ZERO HARDCODING)

### Tech: Tina CMS (self-hosted, free)

### What's editable from admin

**Site Settings (global)**
- Site name, logo, favicon
- Phone number
- Email
- Address
- Social media links
- Business hours
- Header/footer links
- Default meta tags
- Tracking IDs (Google Ads, GA4, GTM, Clarity)

**Per-page editable**
- Page title
- Meta title
- Meta description
- Meta keywords
- Open Graph image
- Schema markup type
- H1, H2, all content
- Hero image
- Sections (drag-drop to reorder)
- CTAs (text, link, color)
- Form fields (add/remove/reorder)

**Blog management**
- Create/edit/delete posts
- Rich text editor (with image upload)
- Categories, tags
- Featured image
- SEO meta per post
- Publish/draft status
- Scheduled publishing
- Author selection

**Image management**
- Upload (auto WebP conversion)
- Crop/resize in admin
- Alt text required
- Folder organization

**SEO settings**
- Robots.txt rules
- Custom redirects (301 manager)
- Canonical URLs
- Schema templates

**Forms**
- Drag-drop form builder
- Submission viewer
- Email notifications
- Webhook integrations

### Admin authentication
- Tina Cloud (free tier) OR self-hosted auth
- Multi-user support
- Role-based access (admin, editor, contributor)

---

## 9. BLOG FEATURE

### Features
- Markdown/MDX content (clean, portable)
- Rich text editor in admin
- Categories + tags
- Featured image (auto-optimized)
- Author profiles
- Reading time estimate
- Table of contents (auto-generated for long posts)
- Related posts (algorithmic)
- Share buttons (WhatsApp, FB, Twitter)
- RSS feed (`/rss.xml`)
- Schema.org Article markup
- Pagination (10 posts/page)
- Search (client-side or Algolia)
- Comments? **Optional** (recommend disabling — spam risk)

### Blog post template
```mdx
---
title: "Kaal Sarp Dosh Ke 12 Prakar Aur Unke Prabhav"
slug: "kaal-sarp-dosh-12-types"
description: "Kaal Sarp Dosh ke 12 types — Anant, Kulik, Vasuki..."
publishDate: 2026-05-10
author: "Pandit Aman"
category: "Kaal Sarp Dosh"
tags: ["kaal sarp", "types", "vedic astrology"]
featuredImage: "/images/blog/ksd-12-types.webp"
seo:
  title: "Kaal Sarp Dosh ke 12 Types — Complete Guide"
  description: "..."
  keywords: "kaal sarp dosh 12 types, anant kaal sarp, kulik kaal sarp"
schema: "Article"
---

# Kaal Sarp Dosh Ke 12 Prakar

## Introduction
...
```

### SEO for blog
- Auto sitemap inclusion
- Schema.org Article on every post
- Breadcrumbs
- Internal linking suggestions
- Open Graph + Twitter Cards
- Canonical URLs
- Reading time in meta

---

## 10. TRACKING & ANALYTICS

### Google Ads conversion tracking
- **Same Google Ads account** as mangaldoshnivaranpujaujjain.com (per official Google policy: multiple sites allowed in one account)
- **Separate conversion action** for KSD site (since phone number different: 9424002309)
- Setup:
  1. In Google Ads → Conversions → New conversion action
  2. Type: Phone calls from website
  3. Phone number: +91 9424002309
  4. Conversion name: "KSD Site Call"
  5. Get conversion ID + label
  6. Add to site

### Tracking code architecture (same pattern as mangaldoshnivaranpujaujjain.com — proven safe)
```html
<!-- In <head>, BEFORE Astro hydrates -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-XXXXX');
  gtag('config', 'AW-XXXXX/CONVERSION_LABEL', {
    phone_conversion_number: '+91 9424002309'
  });
</script>

<!-- Static fallback for tel: clicks (single source of conversion) -->
<script>
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href^="tel:"]');
    if (!link || typeof window.gtag !== 'function') return;
    var txnId = 'tel_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    window.gtag('event', 'conversion', {
      send_to: 'AW-XXXXX/CONVERSION_LABEL',
      transaction_id: txnId
    });
  });
</script>
```

### Other tracking
- **GA4** — universal analytics
- **Microsoft Clarity** — heatmaps + session recordings (free)
- **Google Tag Manager** (optional) — for marketing team flexibility
- **Search Console** — index monitoring

---

## 11. DEPLOYMENT STRATEGY

### Hosting recommendation: **Hostinger (current)** OR **Cloudflare Pages (free)**

**Hostinger pros:**
- Already using, no migration needed
- Familiar admin
- Email + DB hosting included
- Cost: ~₹500/mo (existing)

**Cloudflare Pages pros:**
- **FREE** for static sites
- Global CDN (fastest worldwide)
- Auto HTTPS
- Auto deploy from Git
- Better performance than Hostinger
- Cost: ₹0

**Recommendation:** Cloudflare Pages for site, Hostinger for any backend (forms, API).

### Build & Deploy pipeline
1. Code in Git (GitHub)
2. Tina CMS commits content changes to Git
3. Cloudflare Pages auto-builds on push
4. Build runs `astro build` → static files
5. Deployed to global CDN
6. DNS points kaalsarpdoshpujaujjain.com → Cloudflare

### Build output
- All routes pre-rendered as HTML
- Optimized images (WebP/AVIF)
- Compressed CSS/JS
- Sitemap, robots.txt, RSS auto-generated
- Total bundle: <2 MB

---

## 12. MIGRATION PLAN (ZERO DOWNTIME, SEO-SAFE)

### Phase 1: Discovery (Days 1-3)
- [ ] Crawl current WordPress site (Screaming Frog)
- [ ] Export all URLs + meta data
- [ ] Document all pages, posts, categories, tags
- [ ] Export all images (FTP)
- [ ] Document all redirects (.htaccess)
- [ ] Backup current WordPress (full DB + files)
- [ ] Verify Google Search Console access

### Phase 2: Build (Days 4-14)
- [ ] Set up Astro project
- [ ] Set up Tina CMS
- [ ] Build all page templates
- [ ] Build all components (header, footer, hero, FAQ, etc.)
- [ ] Migrate content (page by page, exact text match)
- [ ] Migrate blog posts (preserving slugs + metadata)
- [ ] Set up tracking code
- [ ] Set up admin panel
- [ ] Test all forms
- [ ] Test all internal links

### Phase 3: Pre-launch validation (Days 15-17)
- [ ] Stage on temporary URL (e.g., new.kaalsarpdoshpujaujjain.com)
- [ ] Run PageSpeed Insights — target 95+
- [ ] Run Lighthouse audit — target 95+ all categories
- [ ] Test mobile responsiveness
- [ ] Test all forms (submit + email notification)
- [ ] Verify all tracking fires (Tag Assistant)
- [ ] Verify all schema markup (Schema Validator)
- [ ] Test search functionality
- [ ] Verify sitemap.xml accuracy
- [ ] Verify robots.txt
- [ ] Cross-browser testing (Chrome, Safari, Firefox, mobile)
- [ ] Verify Hindi content rendering correctly
- [ ] Verify all images loading
- [ ] Verify SSL working
- [ ] Verify URLs match exactly (sample 20+)

### Phase 4: Cutover (Day 18)
**Best time:** Sunday 2 AM (lowest traffic)
1. Backup current production WordPress one more time
2. Update DNS A record (if changing host)
3. Or deploy new code to existing Hostinger
4. Verify homepage loads
5. Verify 5 random URLs load correctly
6. Submit new sitemap to Search Console
7. Verify tracking fires (test with gclid URL)
8. Monitor for 2 hours

### Phase 5: Post-launch monitoring (Days 19-32)
- [ ] Daily Search Console check (crawl errors, index coverage)
- [ ] Daily PageSpeed check
- [ ] Daily traffic monitoring
- [ ] Daily conversion check
- [ ] Weekly ranking check (top 20 keywords)
- [ ] Fix 404s immediately
- [ ] Monitor Core Web Vitals

### Phase 6: Optimization (Days 33+)
- A/B testing framework setup
- Content additions (more blog posts)
- Schema markup refinements
- Image optimization audit
- Internal linking optimization

---

## 13. RISK & MITIGATION

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Lose SEO rankings | Medium | High | Match URLs + meta exactly, 301 only if changing |
| Page speed regression | Low | Medium | Performance budget, test before launch |
| Tracking breaks | Low | High | Verify with Tag Assistant pre-launch, automated build checks |
| Forms broken | Medium | High | Test ALL forms on staging, smoke test post-launch |
| GMB phone confusion | Low | Critical | Phone stays unchanged (9424002309) |
| Blog posts not migrated correctly | Medium | Medium | Spot check 10% of posts, automated comparison |
| Schema markup errors | Low | Medium | Schema validator pre-launch |
| Mobile rendering issues | Low | High | Real device testing |
| HTTPS issues | Low | High | Cloudflare auto-SSL or Hostinger Lets Encrypt |
| Server downtime during cutover | Low | High | Sunday 2 AM cutover, rollback plan ready |

---

## 14. TIMELINE & EFFORT

### Total: **3-4 weeks** for complete migration

| Week | Focus | Deliverables |
|---|---|---|
| Week 1 | Discovery + Architecture | Site audit, content extraction, project setup |
| Week 2 | Page builds + components | All marketing pages built, components reusable |
| Week 3 | Admin panel + Blog + SEO | Tina CMS configured, blog working, SEO complete |
| Week 4 | Testing + Cutover | Staging tested, live cutover, monitoring |

### Effort estimate
- Development: 60-80 hours
- Content migration: 10-15 hours
- Testing: 10-15 hours
- Cutover + monitoring: 5-10 hours
- **Total: 85-120 hours**

### Cost estimate
- Domain: ₹0 (already owned)
- Hosting (Cloudflare Pages): ₹0
- Tina CMS: ₹0 (self-hosted)
- Development tools: ₹0 (open source)
- **Total recurring: ₹0/mo (vs WordPress ~₹500/mo)**

---

## 15. SUCCESS METRICS

### Pre-launch baseline (current WordPress)
- [ ] Document current PageSpeed score
- [ ] Document current Lighthouse score
- [ ] Document current top 20 keyword rankings
- [ ] Document current organic traffic
- [ ] Document current conversion rate
- [ ] Document current QS for top keywords

### Post-launch targets (30 days after migration)
| Metric | Current | Target | Stretch |
|---|---|---|---|
| PageSpeed Mobile | 50-70 | **95+** | 98+ |
| Lighthouse SEO | 80-90 | **100** | 100 |
| LCP | 3-5s | **<1.5s** | <1s |
| CLS | 0.1-0.3 | **<0.05** | 0 |
| Total page weight | 2-5 MB | **<200 KB** | <100 KB |
| Organic traffic | baseline | **+20%** | +50% |
| Conversion rate | baseline | **+50%** | +100% |
| Google QS (KSD keywords) | unknown | **8-10** | 10/10 |

---

## 16. NEXT STEPS

### Decision points (Aman to confirm)
1. **Tech stack: Astro + Tina CMS — APPROVED?**
2. **Hosting: Stay on Hostinger OR move to Cloudflare Pages?**
3. **Phone: 9424002309 confirmed (no change for GMB safety)?**
4. **Timeline: 3-4 week aggressive OR 6-8 week comfortable?**
5. **Content audit access: WordPress admin credentials needed for full extraction**

### Immediate next steps (after approval)
1. Set up empty Astro project (1 day)
2. Run Screaming Frog crawl of current site (30 min)
3. Set up Tina CMS in project (1 day)
4. Build first page (homepage) end-to-end (1-2 days)
5. Review with Aman before continuing

### What I need from Aman
- [ ] WordPress admin login credentials
- [ ] Hostinger FTP credentials (for current site backup)
- [ ] Confirmation on tech stack
- [ ] Confirmation on hosting choice
- [ ] List of any known issues with current site
- [ ] Brand guidelines (colors, fonts, logo)
- [ ] Pandit profile content (bio, photos)
- [ ] Sample testimonials (for showcase)

---

## 17. GOOGLE ADS STRATEGY — CPL REDUCTION PLAN

> **This section is the strategic driver. Every design choice above should serve CPL reduction.**
> Linked Ads HANDOFF: `byteflow/services/google-ads/HANDOFF.md` (account: `mangal_dosh_puja_apna_wala`)

### 17.1 Baseline & Target

| Metric | Current (WordPress) | Target (post-launch) | Stretch |
|---|---|---|---|
| KSD CPL | ₹296 | **₹150-200** | ₹100 |
| LP Experience | Below Avg (assumed) | **Above Avg** | Above Avg |
| Quality Score | 3-7 | **8-10** | 10 |
| PageSpeed Mobile | 50-70 | **95+** | 98+ |
| Phone (locked) | +91 9424002309 | **Same** (GMB safety) | Same |

### 17.2 Account Setup

- **Same Google Ads account** as `mangal_dosh_puja_apna_wala` (per Google policy: multi-domain allowed)
- **Separate new campaign** for KSD — don't mix with Mangal Dosh campaign
- **New conversion action** = "KSD Site Call" → phone +91 9424002309
- **Conversion architecture** = COPY EXACTLY from mangaldoshnivaranpujaujjain.com:
  - Static handler in `index.html` = SOLE source of Google Ads `conversion` event
  - Other tracking (GA4, dataLayer, enhanced) = separate, NO conversion event
  - `transaction_id` dedup mandatory
  - Build-time check: fail if React bundle contains `gtag conversion` call

### 17.3 Target Keyword Clusters → LP Mapping (per-keyword LP = QS killer)

| Keyword Cluster | Dedicated LP | H1 (exact) |
|---|---|---|
| `kaal sarp dosh puja ujjain` + variants | `/kaal-sarp-dosh-puja/` | "Kaal Sarp Dosh Puja Ujjain — Authentic Vedic Vidhi" |
| `kaal sarp shanti puja` + variants | `/kaal-sarp-shanti-puja/` | "Kaal Sarp Shanti Puja Ujjain" |
| `naag bali puja ujjain` | `/naag-bali-puja/` | "Naag Bali Puja Ujjain" |
| `tripindi shradh ujjain` | `/tripindi-shradh/` | "Tripindi Shradh Puja Ujjain" |
| `kaal sarp dosh ke prakar / types` | `/kaal-sarp-dosh-types/` (informational) | "Kaal Sarp Dosh ke 12 Prakar" |
| `trimbakeshwar kaal sarp puja` | DO NOT BID (off-location, will burn budget) | — |

**Rule:** Ad group → exact match keywords → mirror LP with same H1. Ad relevance "Above Avg" automatic.

### 17.4 Landing Page Critical Elements (CPL impact ranked)

| # | Element | CPL Impact | Where |
|---|---|---|---|
| 1 | Click-to-call button above fold | ⭐⭐⭐⭐⭐ | Hero, first 100vh |
| 2 | Sticky mobile call button (bottom) | ⭐⭐⭐⭐⭐ | Persistent on scroll |
| 3 | H1 = exact keyword + "Ujjain" | ⭐⭐⭐⭐⭐ | First H1 only |
| 4 | Keyword in first 100 words | ⭐⭐⭐⭐ | Intro paragraph |
| 5 | Real Pandit photo (face visible) | ⭐⭐⭐⭐ | Hero or about block |
| 6 | 20+ reviews with names + dates | ⭐⭐⭐⭐ | Testimonials section |
| 7 | Address + GMB embed | ⭐⭐⭐ | Footer + contact |
| 8 | Pricing transparency (₹X-Y range) | ⭐⭐⭐ | Service page |
| 9 | FAQ schema (4-6 Q&A) | ⭐⭐⭐ | Below fold |
| 10 | No form OR max 3 fields | ⭐⭐ | Optional, calls preferred |

**No-WhatsApp rule** — owner wants calls only (per ads CLAUDE.md). Don't add WhatsApp button.

### 17.5 Ad Copy Safety Rules (ZERO EXCEPTIONS — copy from ads CLAUDE.md)

**NEVER use in headlines/descriptions/sitelinks/LP copy:**
- "Guaranteed result" / "100% result" / "पक्का फल"
- Medical/health cure claims
- Fear-based ("agar puja nahi ki toh...")
- Unverifiable superlatives: "Best in India", "No. 1 Pandit"
- Comparative claims ("doosre pandits se behtar")

**SAFE words:** Authentic, Vedic, Expert, Experienced, 500+ Families, Trimbakeshwar/Ujjain authority, Personalized, Traditional, 15+ Years

### 17.6 Conv Tracking Code (to embed in `index.html`)

```html
<!-- In <head>, BEFORE any framework hydrates -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-XXXXX');
  gtag('config', 'AW-XXXXX/KSD_CONV_LABEL', {
    phone_conversion_number: '+91 9424002309'
  });
</script>
<!-- Static tel: click handler — SOLE source of conversion event -->
<script>
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href^="tel:"]');
    if (!link || typeof window.gtag !== 'function') return;
    var txnId = 'tel_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    window.gtag('event', 'conversion', {
      send_to: 'AW-XXXXX/KSD_CONV_LABEL',
      transaction_id: txnId
    });
  });
</script>
```

**Build verification check (mandatory):** Astro build must fail if:
- `index.html` missing `gtag` AND `conversion` keyword
- Any framework bundle contains `gtag('event', 'conversion')` (would double-fire)

### 17.7 Phase Plan (campaign lifecycle)

| Phase | Trigger | Action | Expected CPL |
|-------|---------|--------|--------------|
| 0 — Baseline | Now | Run ads on current WP site, ₹500/day, 2 weeks | ₹296 baseline |
| 1 — Launch new LP | Astro site live, URLs preserved | Maximize Conversions, ₹500-700/day | ₹220 |
| 2 — QS stabilize | 3-7 days post-launch (Google re-crawl) | Verify LP Experience → Above Avg, no tweaks | ₹180 |
| 3 — Per-keyword LP refinement | 30+ conv data | A/B test hero copy, CTA placement | ₹150 |
| 4 — Target CPA | 30+ conv/30D stable | Switch to tCPA ₹150 → ₹120 → ₹100 | ₹100 |

### 17.8 What NOT to Do (locked decisions from ads HANDOFF)

- **No phone change** — 9424002309 stays (GMB suspension risk)
- **No Mangalnath keywords** (handled in main account, conflict risk)
- **No Tuesday bid boost** — customer base = advance bookers, not same-day searchers
- **No "guaranteed" / comparative ad copy** — suspension risk
- **No PMAX** initially — Search only for control
- **No WhatsApp button** — owner wants calls only
- **Don't tweak account first 2-3 weeks post-launch** — let Smart Bidding learn

---

## 18. APPENDIX: WHY ASTRO BEATS WORDPRESS FOR SEO

### Technical comparison

**WordPress page render flow:**
1. Browser requests URL
2. Apache/Nginx receives request
3. PHP loads WordPress core (~5MB)
4. WordPress queries MySQL DB
5. WordPress runs ALL active plugins
6. Theme renders HTML
7. HTML sent to browser
8. Browser loads jQuery, plugin JS, theme CSS
9. Page renders

**Total: 1-3 seconds, 200-500 KB JS, 5-10 KB CSS**

**Astro page render flow:**
1. Browser requests URL
2. CDN serves pre-built HTML file (<10 KB)
3. Browser parses HTML, content visible
4. Browser loads tiny JS for interactivity (if any)
5. Page fully interactive

**Total: 0.2-0.5 seconds, 0-30 KB JS, 0-5 KB CSS**

**Net result:** Astro pages load 5-10x faster than WordPress, with 10x less JavaScript. This directly improves:
- PageSpeed score (95+ vs 50-70)
- Core Web Vitals (all green vs all yellow/red)
- Google Ads QS (LP Experience "Above Average" vs "Below Average")
- User experience (instant load, no jank)
- Mobile performance (especially critical for 3G/4G users)

---

**End of Design Document**

*For questions or revisions, update this document and notify Aman.*
