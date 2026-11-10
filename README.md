# EQTConnect — Corporate Website

Marketing website for EQTConnect, a centralized platform for AGM management and shareholder communications. Product copy comes from `EQTConnect Website.docx`; anything not covered by that document is shown as a clearly marked placeholder rather than invented.


**Pages:** Home `/` · Platform Overview `/platform` · Pricing `/pricing` · About Us `/about` · Contact / Book a Demo `/contact` · Resources / FAQs `/resources`, plus a custom 404, `sitemap.xml`, `robots.txt`, a generated Open Graph image and a `POST /api/contact` endpoint.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict, `noUncheckedIndexedAccess`)
- Tailwind CSS 4, with design tokens defined in `src/app/globals.css` (`@theme`)
- Geist fonts (self-hosted via the `geist` package, so no third-party font requests)
- `lucide-react` icons, React Hook Form + Zod for the contact form
- Vitest + Testing Library (unit/integration), Playwright + axe-core (end-to-end and accessibility)

Requires Node.js 20.9+ (developed on Node 22).

## Getting started

```bash
npm install
cp .env.example .env.local   # optional: every variable is optional in development
npm run dev                  # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (Next.js + React Compiler rules) |
| `npm test` | Unit and integration tests (Vitest) |
| `npm run test:e2e` | Playwright end-to-end and accessibility tests (run `npm run build` first) |
| `npm run check` | Typecheck, lint, unit tests and build in sequence |

Playwright uses the locally installed Google Chrome by default (`channel: "chrome"`). To use Playwright's bundled Chromium, run `npx playwright install chromium` and set `PLAYWRIGHT_CHANNEL=chromium`. To test an already-running deployment, set `E2E_BASE_URL`.

## Project structure

```
src/
  app/                  Routes, layout, metadata, sitemap/robots, OG image, API route
  components/
    ui/                 Buttons, layout primitives, badges, placeholders, accordion, form fields
    layout/             Header, mobile navigation, footer, logo
    mockups/            Illustrative product UI built in HTML/CSS/SVG
    sections/           Page sections, grouped by page
  content/              All copy and data (edit these files to update the site)
  lib/                  Utilities, SEO helpers, contact form logic
  types/                Shared content types
tests/
  unit/                 Vitest tests
  e2e/                  Playwright tests
```

## Editing content

All copy lives in `src/content/`, separate from layout code:

| File | Contents |
| --- | --- |
| `site.ts` | Company name, contact details, legal links, navigation, footer |
| `capabilities.ts` | The six platform capabilities (verbatim from the source document) |
| `home.ts`, `platform.ts`, `about.ts` | Page copy (`platform.ts` also holds the AGM workflow section) |
| `pricing.ts` | Plans, comparison table, pricing FAQs |
| `resources.ts` | Resource library entries and FAQs |
| `mock-data.ts` | Fictional sample data used by the product mockups |

### Placeholders

Information that needs business confirmation is stored as `null` (or an empty list). Unconfirmed contact/legal fields are hidden until values are supplied. To find what's outstanding:

```bash
rg "null|sample: true|provisional" src/content
```

Specifically:

- **Contact details and legal links**: `site.contact` and `site.legal` in `site.ts`. Footer and contact page hide empty fields until values are provided.
- **Client logos**: the trust section (`src/components/sections/home/trust-logos.tsx`, configured by `logoSlots` in `home.ts`) shows neutral placeholder tiles. Replace them with approved logos only, and only with permission to use them.
- **Pricing**: `pricingPlans` and `planComparison` in `pricing.ts` (Free, Pro, Custom). Feature packaging is based on documented capabilities; Pro/Custom list prices stay contact-led until confirmed. `pricingFaqs` stays empty until verified commercial answers exist.
- **Mission and company story**: `about.ts`. The current mission text is marked provisional.
- **Resources**: `resources.ts` entries are marked `sample: true` with `href: null` ("Coming soon"). Replace them with real articles and links. The FAQ answers are drafts derived from the platform description and are marked for review.
- **AGM workflow**: `platformContent.workflow` in `platform.ts` (the "How the platform supports the work around your AGM" section on `/platform#agm-workflow`) is a proposed narrative built from documented capabilities and is flagged for business review.

### Product mockups

Product visuals are coded illustrations, not screenshots. Every mockup is wrapped in `MockFrame` (`src/components/mockups/primitives.tsx`). This marks the visual as decorative for assistive technology, provides a text description, and shows the caption "Illustrative product concept with fictional sample data — not a screenshot." Keep that caption if real screenshots are added alongside the mockups. All names, folio numbers and figures come from `mock-data.ts` and are fictional.

## Design system

Tokens are defined once in `src/app/globals.css` under `@theme` and used through Tailwind utilities:

- **Colour:** violet brand on light gray/white — `brand-*` (primary `#4c1d95` at `brand-800`, hover `brand-700`, active `brand-900`), soft lavender accents (`brand-50`/`brand-100` and the same-family `signal-*` aliases), purple-tinted `ink-*` dark surfaces, neutrals (`canvas`, `surface`, `subtle`, `line`, `fg`, `fg-muted`, `fg-subtle`), status (`success`, `warning`, `danger`, `info`) and `pending` (placeholder amber)
- **Type scale:** `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lead`, `text-2xs`. These are fluid sizes. If you add new size tokens, also register them in `src/lib/cn.ts` so `tailwind-merge` treats them as font sizes.
- **Radii, shadows, easing, durations and breakpoints** are defined in the same block.

Tokens live in `src/app/globals.css`. After any colour change, re-run `npm run test:e2e`, which includes axe colour-contrast checks.

**Motion:** Scroll reveals use a single shared `IntersectionObserver` (`src/components/ui/reveal.tsx`). Content is hidden for animation only when JavaScript is running *and* the user has no reduced-motion preference, so nothing depends on animation to be visible. The home hero headline is never animated, to protect Largest Contentful Paint.

## Contact form

The form (`src/components/sections/contact/contact-form.tsx`) and the API route (`src/app/api/contact/route.ts`) share one Zod schema (`src/lib/contact/schema.ts`). The request-handling logic is a pure function (`src/lib/contact/handler.ts`) so it can be unit-tested.

**Delivery:** Configure exactly one option (see `.env.example`):

- **Webhook:** `CONTACT_WEBHOOK_URL` (plus optional `CONTACT_WEBHOOK_SECRET`). Each inquiry is POSTed as JSON, which suits a CRM or automation tool.
- **Email via Resend:** `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`.

If neither is configured, the form displays an "Online submissions are not active yet" notice and the API returns `503 not_configured`. The site never shows a success message unless the delivery provider accepted the inquiry. **The contact page is statically rendered, so rebuild/redeploy after configuring delivery.**

**Abuse protection:**

- Server-side validation
- Same-origin check
- JSON-only requests, with a 16 KB body limit
- A honeypot field and a form-timing check (minimum 2.5 seconds, maximum 6 hours)
- Optional Cloudflare Turnstile (set both Turnstile keys)
- Per-IP rate limiting (5 requests per 10 minutes)

The rate limiter is in-memory: it applies per server instance and resets on restart. On serverless or multi-instance hosting, also use platform-level rate limiting/WAF rules, or replace `src/lib/contact/rate-limit.ts` with a shared store (e.g. Redis/Upstash).

**Privacy:** Form contents are never logged. Server logs record only outcome codes (e.g. `not_configured`, `delivery_failed` with an HTTP status).

## Security headers

`next.config.ts` sets the following on every route:

- Content-Security-Policy
- `X-Content-Type-Options`
- `X-Frame-Options: DENY`
- `Referrer-Policy`
- `Permissions-Policy`
- `Cross-Origin-Opener-Policy`
- HSTS (production only)

It also disables the `X-Powered-By` header. The CSP allows `'unsafe-inline'` scripts because Next.js injects inline bootstrap scripts; moving to a nonce-based CSP would require dynamic rendering. Cloudflare's origin is added to the CSP only when Turnstile is enabled.

These headers are hardening measures, not a security certification. No security assessment has been performed.

## SEO

- Per-page titles, descriptions, canonical URLs and Open Graph/Twitter metadata are generated by `pageMetadata()` in `src/lib/seo.ts`.
- `sitemap.xml` lists all routes once `NEXT_PUBLIC_SITE_URL` is set.
- **Indexing is off by default:** pages render `noindex` and `robots.txt` disallows everything unless `NEXT_PUBLIC_ALLOW_INDEXING=true`. Enable it only on the production deployment.
- Redirects for common paths (`/home`, `/demo`, `/book-a-demo`, `/faq`, `/faqs`) and the retired `/agm-lifecycle` and `/lifecycle` pages (both to `/platform#agm-workflow`) are in `next.config.ts`.

## Deployment

The site works on any Next.js-capable host (Vercel, Netlify, AWS Amplify, a Node server or a container).

1. Set the environment variables from `.env.example` in the host's settings: at minimum `NEXT_PUBLIC_SITE_URL`, one delivery option and, for production only, `NEXT_PUBLIC_ALLOW_INDEXING=true`.
2. Build with `npm run build` and serve with `npm start` (or let the platform do this).
3. After deploying, check: `/robots.txt`, `/sitemap.xml`, the response headers, a test submission of the contact form, and `E2E_BASE_URL=https://your-domain npm run test:e2e`.

`NEXT_PUBLIC_*` variables and the contact page's delivery status are resolved at build time, so changing them requires a new build.

## Testing

- **Unit/integration (`tests/unit`):** the contact handler (validation, honeypot, timing, verification, rate limiting, not-configured and delivery-failure paths, no false success), delivery-provider selection, utilities (navigation state, resource filtering, metadata) and component behaviour (accordion, pending markers, contact form states).
- **End-to-end (`tests/e2e`, desktop 1440×900 and mobile Pixel 7):** every page renders with a single `h1`, unique titles and metadata; security headers are present; no console errors; axe scans report no serious or critical violations; no horizontal overflow at 320/375/390/768/1024/1440/1920 px; all internal links and anchors resolve; mobile menu keyboard behaviour; skip link; 404 page; redirects; FAQ accordion; resource search; reduced-motion rendering; the honest contact-form error when delivery isn't configured; and the API's 415/403/413/400 responses.

Automated axe checks catch only part of WCAG 2.2 AA. Manual screen-reader and keyboard review is still recommended before launch.
