# Mahmoud BI: Architecture and Status

## How the pieces fit
Browser (static HTML/CSS/JS on Cloudflare Pages) -> Pages Functions `/api/*` (auth, products, orders, analytics, payments, webhooks, downloads) -> D1 (all data) + R2 (private product files).
Checkout: customer -> POST /api/orders (server creates Pending order, price read from D1, never from the browser) -> server calls Paymob to create the payment intention -> customer is redirected to Paymob hosted checkout (no card data touches this site) -> Paymob calls POST /api/webhooks/paymob -> server verifies HMAC, checks the transaction with Paymob's API, dedupes on transaction ID (UNIQUE index in payment_webhook_events), then marks the order Paid, creates a download entitlement and emails the link. A browser redirect never marks an order paid.
Settlement: Paymob pays out to the bank account you register during merchant onboarding. The site only imports settlement reports (API or CSV upload) into `settlements` for reconciliation. No bank credentials are ever handled.
Admin: /admin pages are static shells; every /api/admin/* call checks a signed, HttpOnly, Secure, SameSite=Strict session cookie against admin_users on the server. Passwords hashed with PBKDF2 (WebCrypto). Optional TOTP 2FA. No registration endpoint.
Analytics: first-party, cookie-light; session ID random per visit, unique visitor = daily-salted hash of IP+UA (no raw IP stored).
Downloads: files in private R2; /api/downloads/:token checks entitlement, expiry, revocation and logs each download.

## Technical limitations
- Static hosting alone cannot do auth, payments or private analytics: Phase 3+ needs a Cloudflare account (Pages, D1, R2).
- Paymob live payments need merchant approval and production keys. Sandbox first.
- Refund amounts, gateway fees and settlements come from Paymob data; net revenue is accurate only once those are synced.
- Email delivery needs a provider (e.g. MailChannels or Resend) configured.
- Unique-visitor counts are approximate by design (privacy).
- Strong 2FA/password-reset email also depends on the email provider.

## Phase status
| Phase | Status |
|---|---|
| 1 Homepage, EN/AR, categories, featured, catalog search/filter | Built; browser testing pending |
| 2 Product pages, demos, gallery, pricing | Not started |
| 3 Backend, D1, admin, analytics, orders | Not started |
| 4 Paymob sandbox, webhooks | Awaiting Paymob sandbox keys |
| 5 Delivery, requests, email | Not started |
| 6 Security/perf review, deployment | Not started |

## Placeholders in Phase 1
- Product cards are DEMO content (marked) with no prices. "View details" is disabled until Phase 2.
- LinkedIn is empty: set CONFIG.linkedin in public/js/products.js.
- No custom-request form yet (WhatsApp button only).
