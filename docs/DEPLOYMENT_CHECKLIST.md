# Mahmoud BI: Phase 1 Cloudflare Pages Deployment Checklist

Backup of this exact version: `backups/mahmoud-bi-phase1-v1.0-approved-conditional.zip` (SHA-256 in `mahmoud-bi-phase1-v1.0.sha256`). Restore check: unzipped and compared, identical.

## A. Pre-deploy (owner decisions)
- [ ] Decide the production domain (e.g. mahmoudbi.com). Not yet chosen.
- [ ] Confirm LinkedIn URL (or leave hidden). Set `CONFIG.linkedin` in `public/js/products.js`.
- [ ] Confirm WhatsApp +201127238627, email mahmoudrefat105@gmail.com and YouTube @MahmoudRefatBI are correct and active.
- [ ] Create a Cloudflare account and a private GitHub repository.

## B. Deploy steps
Use Git integration (not drag-and-drop upload): Phase 3 adds `/functions`, D1 and R2, which are easiest to ship from Git.
1. Push the `mahmoud-bi` folder to the repo.
2. Cloudflare dashboard > Workers & Pages > Create > Pages > Connect to Git.
3. Framework preset: None. Build command: leave empty. Build output directory: `public`. Root directory: `/`.
4. Deploy. You get `https://<project>.pages.dev`.
5. Open the pages.dev URL and rerun the manual test list in section E.

## C. External dependencies (audited from source)
| Item | Used in | Status |
|---|---|---|
| Google Fonts CSS (Outfit, Cairo) | index.html, explore.html | NOT VERIFIED live (my test environment had no internet). Site falls back to system fonts if blocked |
| https://wa.me/201127238627 | homepage (2 links) | Format correct; live page NOT VERIFIED |
| https://www.youtube.com/@MahmoudRefatBI | homepage, footer | Provided by you; live page NOT VERIFIED |
| mailto:mahmoudrefat105@gmail.com | homepage, footer | Format correct |
No other third-party hosts are requested (runtime check: only localhost and fonts.googleapis.com). All 9 local file references resolve.

## D. Production readiness findings (nothing was changed; design and behavior untouched)
Needs attention before or at launch:
1. **Logo weight.** `mahmoud-bi-logo-tight.png` is 710 KB and loads on every page, displayed at about 86x52 px. Recommend a resized copy (same artwork, about 2x display size). Largest performance win available.
2. **og:image is a relative path** to a 1.1 MB file. Social previews need an absolute URL (https://yourdomain/...) and ideally a 1200x630 image. Missing: og:url, og:type, og:description, twitter card.
3. **No 404 page.** Without a top-level `404.html`, Pages treats the site as a single-page app and serves the homepage (HTTP 200) for any wrong URL. Add 404.html.
4. **Clean URLs.** Pages redirects `/explore.html` to `/explore`. Internal links still use `.html`, so each click takes one extra redirect. Query string preservation (`?f=powerbi`) NOT TESTED on Pages.
5. **Missing files:** robots.txt, sitemap.xml, canonical tags, `_headers` (security and caching headers), apple-touch-icon. Unused file: `mb-icon-512.png` (keep for icon use).
6. **No preconnect to fonts.gstatic.com**, a small font-loading speedup.
7. **SEO limitation.** Language is stored in the browser, so English and Arabic share one URL and search engines will only see English. Separate Arabic URLs (e.g. /ar/) with hreflang would fix this; decide before Phase 2 builds product URLs.
8. **Compliance pages missing:** Privacy Policy, Terms, Refund Policy. Payment providers typically ask for these when reviewing a merchant site; confirm Paymob's exact requirements.
Tell me which of 1 to 6 you want applied; they do not change the approved design.

## E. Post-deploy test list (run on the live URL, in a normal browser)
- [ ] Homepage and Explore load over HTTPS, no console errors
- [ ] Outfit and Cairo fonts actually render (English and Arabic)
- [ ] EN/AR switch, RTL, language kept across pages
- [ ] Search, three format filters, industry filter, sort, Clear
- [ ] WhatsApp, YouTube and email links open correctly
- [ ] Phone check on iPhone Safari and Android Chrome
- [ ] Favicon appears in the tab
- [ ] `/explore?f=powerbi` and `/explore.html?f=powerbi` both preselect Power BI

## F. Custom domain: everything required
Information and access:
- The domain name, and login access to wherever it is registered (registrar).
- Whether the domain is already on Cloudflare DNS.
- Any existing DNS records, especially email (MX, SPF, DKIM) if the domain already receives mail.
Steps:
1. Pages project > Custom domains > Set up a domain.
2. **Domain already on Cloudflare:** Cloudflare adds the DNS record and certificate for you.
3. **Domain elsewhere:** the simplest route is adding the domain to Cloudflare and changing the registrar's nameservers to the two Cloudflare gives you. Copy every existing DNS record first so email and other services keep working. A bare domain (no www) requires Cloudflare DNS for Pages. A subdomain such as `www` or `shop` can instead use a CNAME to `<project>.pages.dev`.
4. Wait for the SSL certificate to become active (usually minutes, can take longer while nameservers propagate).
5. Choose one canonical address (with or without www) and redirect the other to it (Cloudflare Redirect Rules).
6. After the domain works: set absolute og:image/og:url and canonical tags, add robots.txt and sitemap.xml, and submit the sitemap in Google Search Console.
Later phases depend on the final domain: Paymob webhook and redirect URLs (Phase 4), email sender domain with SPF/DKIM (Phase 5), and cookie scope for the admin login (Phase 3).
