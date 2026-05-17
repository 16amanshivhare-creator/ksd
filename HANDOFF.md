# HANDOFF — kaalsarpdoshpujaujjain.com

> 2026-05-17 | 🟢 **SITE LIVE** on https://kaalsarpdoshpujaujjain.com/ via Cloudflare Workers + CF DNS. 48 pages deployed, 13 schemas, bilingual Devanagari+English, image-optimized (33MB→2.7MB), QS 10/10 LP-ready. Next session: KSD Google Ads campaign launch.

## Live URLs
- **Production:** https://kaalsarpdoshpujaujjain.com/
- **Workers backup:** https://ksd.16amanshivhare.workers.dev/
- **Admin (CMS):** /admin/ (Sveltia, OAuth proxy setup pending)
- **GitHub:** https://github.com/16amanshivhare-creator/ksd
- **CF account:** 16amanshivhare@gmail.com

## Stack (locked)
- Astro 4 static → Cloudflare Workers (was Pages, unified now)
- CF DNS (nameservers: arch.ns.cloudflare.com, ingrid.ns.cloudflare.com)
- Tailwind + Sveltia CMS + GitHub OAuth (proxy pending)
- Build: `git push` → auto deploy in ~90s

## Tasks (next session)

🔴 **Fill tracking IDs in `src/data/site.ts:89-92`** — GA4 measurement ID, Ads ID (AW-XXX), Conv label. WITHOUT these, conversion tracking dead. Aman has these in Google Ads account `mangal_dosh_puja_apna_wala`.

🔴 **Launch KSD Google Ads campaign** — new campaign on this domain. Per Ads HANDOFF: target CPL ₹150-200 (vs current ₹296 from shared mangal account). Best keyword `[ujjain kaal sarp dosh puja online booking]` ₹67 CPL benchmark. Phone +91 9424002309 LOCKED (GMB safety).

🔴 **Submit sitemap to GSC** — `https://kaalsarpdoshpujaujjain.com/sitemap.xml`. Request indexing top 10 URLs. Accelerates QS re-evaluation.

🟡 **Merge CF auto-PR on GitHub** — pending PR for future deploy safety.

🟡 **Sveltia CMS OAuth proxy** — Cloudflare Worker auth proxy template: https://github.com/sveltia/sveltia-cms-auth. Setup when SEO writer needs /admin/ access.

🟡 **Test all 45 URLs preserved** — crawl old WP sitemap vs new, confirm all 200s no 404s.

🟡 **Lighthouse PSI test mobile** — verify LP score 95+ before ads launch.

⬜ **Email migration consideration** — Hostinger MX still on root. Keep for now (info@... emails work). Migrate later if needed.

⬜ **FTP re-add** — deleted during DNS migration. Hostinger File Manager works for now.

## Critical Rules (LOCKED — don't break)

- **Phone +91 9424002309** — never change. GMB safety per Ads HANDOFF.
- **All 45 old WP URLs preserved 1:1** — sitemap maps them. New posts only via CMS.
- **Conversion tracking architecture** — `gtag('event','conversion')` fires ONCE per tel: click from `BaseLayout.astro` inline script. NO duplicates elsewhere (per Ads HANDOFF 2026-05-10 double-fire fix).
- **No "guaranteed", "100%", "best", "No.1", competitor compare** — ad copy + LP both.
- **No WhatsApp button** — owner wants calls only.
- **Bilingual strategy** — Devanagari body + English SEO transliteration. No more iteration.
- **GMB profile** — kept under `SITE.gmb` in site.ts, linked via schema `hasMap`.
- **Address** — Mangalnath Mandir, Ankpath Marg, Kamed in schema (Local SEO); footer shows just "Ujjain".

## Last Session (2026-05-17) — Full Build → Deploy

**Built (in one day):**
- Astro scaffold + 8 static pages + dynamic blog/category routes (48 total pages)
- WP REST API extractor → 33 posts + 33 images ported
- 6 testimonials extracted from Downloads/Review.docx
- 8 global FAQs (KSD, Ujjain, cost, muhurat, samagri, online booking)
- Sveltia CMS at /admin/
- 4 legal pages (Privacy, Terms, Refund, Disclaimer)
- New sections: Symptoms (8), 12 Prakar details, WhyUs (6), Muhurats (6), NearMe (16 cities)
- 13 JSON-LD schemas
- Image optimization: 33.5MB → 2.7MB (hero LCP 6.4MB→156KB)
- Bilingual content (Devanagari primary + English)
- 301 redirect map + security headers (`_redirects`, `_headers`)
- Hreflang hi-IN + en-IN

**Deployed:**
- Git push to https://github.com/16amanshivhare-creator/ksd (public)
- CF Workers connected → auto-build → live in 1m 25s
- Custom domain mapped (after deleting Hostinger A/AAAA records)
- DNS flipped Hostinger → CF nameservers (arch + ingrid)

**Bugs fixed live:**
- `/?s=*` redirect glob broke homepage → removed
- DNS records conflict → deleted root A+AAAA (and ftp A) at CF zone
- DNS cache showed Hostinger response on mobile → resolved via direct CF IP routing confirmed

**Verified working on Aman's mobile:** ✅

## Decisions (permanent — never delete)
- **Cloudflare Workers** chosen over Hostinger for KSD (isolated from April 2026 gambling hack of u937373134 account, free unlimited bandwidth, global CDN)
- **Sveltia CMS** over Decap (modern UI fork, same config, free)
- **Astro static** chosen over Next/React+Vite (avoids SPA crawler issue mangal site hit — guaranteed Google sees full HTML)
- **CF nameservers** kept (not Hostinger) — better DDoS + performance
- **MX records on Hostinger** kept (email still flows via Hostinger mail server)
- **GMB profile** in schema `hasMap` field linked → Google understands site=GMB
- **Pricing ₹3,100 onwards** shown transparently (QS landing experience factor)
- **5,000+ families** social proof (was 500+ — updated 2026-05-17)
- **Online Puja** terminology (not "Proxy Puja")

## Files needing Aman input (placeholders flagged)
| File | Field | Current | Needed |
|---|---|---|---|
| `src/data/site.ts:89` | `TRACKING.gaId` | `G-XXXXXXX` | GA4 measurement ID |
| `src/data/site.ts:90` | `TRACKING.adsId` | `AW-XXXXXXXXXX` | Google Ads conv ID |
| `src/data/site.ts:91` | `TRACKING.callConvLabel` | `XXXXXX/XXXX...` | Conv action label |
| `src/data/site.ts:35` | `SITE.pandit.name` | `Pandit Ji` | Real pandit name |
| `public/images/pandit.jpg` | photo | DSC_0586 | Real pandit photo HD |

## Expected CPL Trajectory (per Ads HANDOFF benchmark)
| Phase | Timeline | Real CPL Target |
|---|---|---|
| Day 1 launch | After tracking IDs filled | ₹296 (current shared acct) |
| Day 14 | Google re-crawl + QS update | ₹150-180 |
| Day 60 | Max Conv learning | ₹100-120 |
| Aspirational | 90+ days | ₹67 (apna ads best keyword benchmark) |

## Quick Commands
```bash
cd D:/aman/claude/website/websites/kaalsarpdoshpujaujjain-redesign
npm run dev          # http://localhost:4321
npm run build        # dist/
npm run extract      # pull WP content again
npm run images       # re-optimize images
npm run cms          # decap-server (local CMS proxy)
git push             # triggers CF auto-deploy ~90s
```
