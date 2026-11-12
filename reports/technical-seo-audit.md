# Technical SEO audit — Ashok Reddy Kundurru

Date: 12 November 2026. Project: existing `ashok-portfolio` Next.js application, deployed through OpenNext to Cloudflare Workers. Target: https://ashokreddykundurru.com.

## Conclusion

No confirmed site-wide indexing blocker was found. The site already supplies prerendered HTML, canonical URLs, crawlable navigation, a sitemap, and Person/WebSite structured data. Name-search visibility cannot be diagnosed from a screenshot alone: Search Console's indexed status and Google-selected canonical are still needed. Ownership and ranking are not confirmed by this audit.

## Findings and actions

| Severity | Finding and evidence | Fix or recommendation | Outcome |
|---|---|---|---|
| High | Live mobile Lighthouse baseline: performance 66, LCP 5.7 s, FCP 3.0 s, speed index 7.9 s. | Reduce startup work and remove heading visibility dependency; investigate network/TTFB separately. | Text appears immediately; decorative WebGL waits until load plus an idle period, with reduced geometry on mobile. Field CWV remains unconfirmed. |
| Medium | Inline script added `.js`; CSS translated animated text out of its masks before the animation bundle loaded. | Progressive enhancement: visible HTML/CSS before animation initializes. | Removed pre-hide CSS and inline script. Initial hero text no longer waits for animation. Tested JS disabled and scripts blocked. |
| Medium | Homepage H1 was a generic slogan; full name was an adjacent paragraph. | Use the existing visible identity as the H1 without redesigning. | Name is the single H1; original slogan remains visible in the same style. Added contextual About link. |
| Medium | Project titles lacked case-study/overview context; descriptions did not consistently identify the author. | Distinguish delivered work from planned projects; use existing facts only. | Case-study/overview titles and author descriptions, explicit EMAS founder metadata, visible breadcrumb links. |
| Low | Open Graph artwork omitted the person's name, although its alt text mentioned it. | Make the share image clearly attributable. | Name and existing EMAS founder role added; explicit page image metadata includes alt text and dimensions. |
| Low | Lighthouse flagged `aria-label` on animated paragraph elements. | Provide accessible plain text using valid semantics. | Added screen-reader text; visual word spans remain aria-hidden. |
| Low | Lighthouse flagged low-contrast decorative technology marquee text. | If desired, increase decorative text contrast in a separately reviewed visual change. | Retained to preserve the design; the same skills appear in readable content elsewhere. This is not an indexing block. |
| Informational | Three blog articles are labelled drafts, carry `noindex, follow`, and are absent from sitemap. | Publish only after editorial approval, then change `sample` to false. | Intentionally preserved; not an accidental noindex. |
| Informational | 404 template inherits homepage canonical but returns HTTP 404 and noindex. | A page-specific 404 title is optional; not an indexed duplicate. | Verified real 404 response; left unchanged. |
| Unconfirmed | Search Console ownership, selected canonical, indexing exclusions, manual actions and field CWV. | Inspect the correct property in Search Console using the checklist below. | Requires account evidence; no success claim made. |

## Checks that passed

- **Metadata:** all 16 generated content pages have unique document titles/descriptions and exactly one self-referencing canonical on the production HTTPS host. SVG `<title>` elements are not additional document titles.
- **Headings and identity:** one H1 per content page. Homepage name, developer role, founder role and introduction exist in initial server-rendered HTML. Existing content and business claims were preserved, not independently certified or expanded.
- **Robots:** allows `/`, declares the production sitemap. No site-wide noindex/nofollow found. Normal pages do not need explicit `index,follow`; those are defaults.
- **Sitemap:** 13 unique canonical, indexable URLs. All three drafts and the legacy EMAS path are excluded. No fabricated publication or modification dates added.
- **Canonicalization:** live `http://ashokreddykundurru.com/about` and `https://www.ashokreddykundurru.com/about` returned 308 to the HTTPS apex path. Legacy `/projects/emas-attendance` returned 308 to `/emas`. Representative redirects were tested; not every possible host/path combination.
- **Structured data:** existing Person and WebSite entities share stable `@id` references; About has ProfilePage and articles have BlogPosting. JSON parses correctly. Existing appropriate schema was retained instead of duplicated. No unsupported credentials, ratings, business statistics or dates added. Google's Rich Results Test remains an external validation step, not claimed as passed.
- **Verified profile URLs in sameAs:** LinkedIn `https://www.linkedin.com/in/ashok-reddy-kundurru-8b6b463a3/`, GitHub `https://github.com/ashokreddy67w`, Instagram `https://www.instagram.com/ashokreddy__67/`, YouTube `https://www.youtube.com/@Ashokreddy-m6g7p`, X `https://x.com/AshokRe90258906`, Facebook `https://www.facebook.com/ashokreddy.kunduru.50`. These are user-confirmed identities; account ownership was not independently authenticated.
- **Rendering:** production HTML includes actual content and crawlable links. Mobile Chrome at 390 px had no horizontal overflow. Full name and introduction remained present without JavaScript; animated text had no hiding transform when script requests were blocked.
- **Images:** all rendered content images have nonempty alt attributes and width/height attributes. Responsive Next Image use is present; no missing-alt defect was found. Open Graph and Twitter images exist on all content routes. Share image returned 200 and was visually inspected.
- **Internal links:** all generated root-relative link targets resolve to a content route or existing public file. Fragments and external destination availability were not exhaustively crawled. Footer navigation already exposes the main pages.
- **Duplicates:** unique titles, descriptions and canonicals across content pages. The two AI project routes describe different scopes (planned resolution product versus support-agent project); they are not merged. No content-level deduplication or invented canonical relationship was applied.
- **Verification file:** original `google29dc148db9bac5ef.html` retained byte-for-byte in public and production assets; preview returns 200. This proves file availability, not Search Console ownership.

## Performance evidence and limitations

Mobile Lighthouse baseline (live): performance **66**, accessibility **93**, SEO **100**; LCP **5.7 s**, TBT **70 ms**, CLS **0.003**. Updated Cloudflare preview: performance **92**, accessibility **96**, SEO **100**; LCP **3.2 s**, TBT **70 ms**, CLS **0**. Local preview is not a controlled live before/after comparison. Reports are saved alongside this document.

The live baseline also reported approximately 205 KiB of unused JavaScript, 24 KiB of legacy JavaScript, a 780 ms document response, and render-blocking resources. Deferring the decorative import does not remove all JavaScript cost. Deeper splitting of the interactive lab/chat widgets should be considered only after repeat profiling and a separate functional review. Existing screenshots total approximately 2.4 MB on disk, but responsive image requests and lazy loading mean this is not the initial page transfer size.

Google PageSpeed's public API returned HTTP 429 (quota exhausted). Lighthouse is lab data; no field INP or CrUX pass is claimed. Good field thresholds at the 75th percentile are LCP <=2.5 s, INP <=200 ms, CLS <=0.1. Use Search Console's mobile Core Web Vitals report or PageSpeed Insights for field data when sufficient traffic exists.

## Validation

- ESLint and TypeScript passed.
- Next.js production compilation, page generation and OpenNext worker packaging passed.
- Production-output checker: 16 pages, 13 sitemap URLs, metadata, canonicals, headings, image attributes, schema, internal targets and original verification asset passed.
- Headless mobile rendering, no-JavaScript, blocked-script and share-image checks passed.
- Missing route returned HTTP 404; verification file returned HTTP 200 in Cloudflare preview.
- See deployment and final live measurement addendum below.

## Exact Google Search Console steps

1. Select the URL-prefix property **https://ashokreddykundurru.com/**, not the EMAS property.
2. Open **Settings → Ownership verification**. If ownership is not confirmed, select HTML file and use the existing downloaded token. Open https://ashokreddykundurru.com/google29dc148db9bac5ef.html, then click **Verify** yourself. Do not replace the token with an invented one; keep the file deployed after verification.
3. In **URL Inspection**, enter **https://ashokreddykundurru.com/**. Record indexed status, last crawl, indexing allowance, user-declared canonical and Google-selected canonical. If Google selected a different URL, share that result for diagnosis.
4. Click **Test live URL**. Open the tested page HTML/screenshot and verify that your name and main content render. A successful live test is not proof of indexing. Click **Request indexing** if the page is eligible and has changed.
5. Open **Sitemaps** and submit **sitemap.xml**, resulting in **https://ashokreddykundurru.com/sitemap.xml**. If it is already successful, do not repeatedly resubmit it. Confirm successful fetch and inspect any reported errors.
6. Inspect **/about**, **/emas**, and **/projects** in the same way. Do not request indexing for the three draft articles until they are finished and deliberately published.
7. In **Page indexing**, review exclusion reasons. Expected draft noindex URLs and the redirected legacy EMAS URL are not failures to fix by removing their directives. Investigate unexpected blocked, duplicate, crawled-not-indexed or discovered-not-indexed pages individually.
8. Check **Manual actions**, **Security issues**, and **Core Web Vitals → Mobile**. Send any reported issue details; these account reports were unavailable to this audit.
9. In **Performance → Search results**, monitor the homepage and queries containing **Ashok Reddy Kundurru**, including Developer, Portfolio and Founder variants. Allow recrawling time; structured data and indexing requests do not guarantee inclusion, timing or ranking position.

## Official references

- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/appearance/structured-data/profile-page
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- https://web.dev/articles/vitals

## Deployment and final live measurements

Successfully deployed through the existing `npm run deploy` command after production validation. Cloudflare version: `18ce8829-7c8d-4ac3-901b-05f8c44a289a`.

All 16 live content pages were fetched successfully and compared with the final build for title, canonical, H1 count, robots directive and JSON-LD. All matched. Live robots.txt, sitemap.xml and the original Google verification file matched byte-for-byte. The machine's DNS workaround used public DNS addresses with HTTPS hostname verification intact; no DNS records were changed.

| Mobile Lighthouse lab metric | Before, live | After, live |
|---|---:|---:|
| Performance | 66 | 80 |
| Accessibility | 93 | 96 |
| Automated SEO | 100 | 100 |
| LCP | 5.7 s | 4.0 s |
| FCP | 3.0 s | 2.0 s |
| Total blocking time | 70 ms | 80 ms |
| CLS | 0.003 | 0 |
| Speed index | 7.9 s | 6.4 s |

The final LCP remains above the good threshold; performance work is not declared complete. Live document response time varied from approximately 780 ms to 1,590 ms, and these single runs do not isolate causation. Remaining candidates are network/edge response investigation, interactive widget bundle splitting, font/CSS startup cost and repeated mobile profiling. No field INP or CWV success is inferred from TBT or Lighthouse scores. The low-contrast decorative marquee remains the accessibility finding.

The preview watcher reported a transient missing generated module while the deployment command rebuilt `.open-next`; preview checks had already passed, the production rebuild and deployment completed successfully, and all live routes were subsequently validated. The preview process was stopped after the checks.

No DNS/email-routing changes, invented verification identifiers, fabricated claims, external backlinks or ranking guarantees were introduced. Search Console verification and indexing status remain for the owner to confirm using the checklist above.
