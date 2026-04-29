# Salus Workforce Scheduling — Marketing Site

The public marketing site for **Staffy Workforce Scheduling** (salus.staffy.com).
Built with Gatsby. Deployed to Netlify. Feeds leads into HubSpot and FormSubmit.

```
Live:  https://salus.staffy.com
Stage: Netlify deploy preview per branch
```

---

## What this project is

A three-page marketing site:

| URL          | Purpose                                                     |
|--------------|-------------------------------------------------------------|
| `/`          | Hero + product pitch + pilot CTA                            |
| `/faq/`      | Eight indexable Q&As with `FAQPage` schema                  |
| `/contact/`  | Sales contact info with `ContactPage` schema                |

Each page ships with full SEO chrome: canonical URL, OpenGraph + Twitter cards,
JSON-LD (Organization + WebSite + Software/FAQ/ContactPage + BreadcrumbList),
and is listed in `public/sitemap.xml`.

Lead capture fires through the **Request Beta Access** modal — a controlled
React form (`src/components/PilotModal.js`) that POSTs to FormSubmit. Analytics
runs via HubSpot (`gatsby-plugin-hubspot`, tracking code `23801619`, same
account as the main staffy.com site).

### What makes this repo slightly non-standard

- **`build-standalone.js`** generates `standalone.html` — a single-file,
  offline-viewable archive with every asset inlined as base64. Used for
  email pitches, investor decks, and offline demos. Includes its own
  JS-free CSS `:target` modal with a working HTML form.
- **`postbuild-img-dimensions.js`** runs after every `gatsby build` and
  stamps explicit `width`/`height` attributes onto every Gatsby-generated
  image, reading dimensions from the aspect-ratio spacer SVG. Stops
  Lighthouse from flagging CLS.

---

## Prerequisites

- **Node.js** `>=20.0.0 <21` (pinned in `package.json` and `.nvmrc`)
- **npm** (shipped with Node)

Quickest way to get the right Node:

```bash
# If you use nvm-windows:
nvm install 20
nvm use 20

# Or nvm on mac/linux:
nvm install  # picks up .nvmrc
```

---

## Setup

```bash
git clone <repo-url> salus-scheduler
cd salus-scheduler
npm install
```

First install will take a few minutes — Gatsby + sharp + sass pull in a lot.

---

## Scripts

| Command             | What it does                                                         |
|---------------------|----------------------------------------------------------------------|
| `npm run develop`   | Start the local dev server at `http://localhost:8000` with hot reload |
| `npm start`         | Alias for `develop`                                                  |
| `npm run build`     | Production build → `public/`, then runs `postbuild-img-dimensions.js` |
| `npm run serve`     | Serve the last `public/` build locally at `http://localhost:9000`    |
| `npm run clean`     | Wipe Gatsby's `.cache/` and `public/` — run if things get weird      |

### Generating `standalone.html`

After a production build:

```bash
npm run build
node build-standalone.js
```

This reads `public/index.html`, `public/faq/index.html`, and
`public/contact/index.html`, inlines every referenced asset as base64,
splices the FAQ and Contact sections into the home page with anchor
navigation (`#faq`, `#contact`), and injects a CSS-only pilot modal. Result:
`standalone.html` at the repo root.

---

## Project layout

```
src/
  components/         # React components (Navbar, Hero, Footer, PilotModal, etc.)
  pages/              # Route entrypoints — one file per URL
    index.js          # /
    faq.js            # /faq/
    contact.js        # /contact/
  hooks/
    useScrollReveal.js  # IntersectionObserver-based fade-in helper
  seo/
    schema.js         # JSON-LD definitions + FAQ copy
  styles/             # Global SCSS (fonts, variables, resets)
  images/             # Source PNG/WebP — processed by gatsby-plugin-sharp
  fonts/              # Mont .otf files (5 weights kept, rest purged)

static/               # Copied verbatim to public/ at build time
  favicon.webp        # Browser tab icon (128x128 WebP, ~1.3 KB)
  robots.txt
  sitemap.xml

public/               # Build output (gitignored)
standalone.html       # Single-file archive (regenerate with build-standalone.js)

gatsby-config.js      # Plugins: sharp, image, sass, netlify, hubspot, filesystem
gatsby-ssr.js         # Head component for font preloads
netlify.toml          # Build command + cache headers + full CSP
```

---

## Deployment

Netlify auto-deploys on push. `netlify.toml` controls:

- **Build command** — `npm run build` (runs `gatsby build` + the postbuild
  dimensions script)
- **Publish dir** — `public`
- **Cache-Control** — immutable for `/static/*`, `*.js`, `*.css`, `*.webp`;
  must-revalidate for `*.html`
- **Security headers** — HSTS, X-Content-Type-Options, Referrer-Policy,
  Permissions-Policy, Content-Security-Policy (tuned for HubSpot +
  FormSubmit)

Preview URLs appear per pull request.

---

## SEO & analytics summary

- Titles & descriptions under Google's 60/160 char limits on all routes
- JSON-LD: Organization, WebSite, WebPage, SoftwareApplication on `/`;
  adds FAQPage + BreadcrumbList on `/faq/`, ContactPage + BreadcrumbList
  on `/contact/`
- Sitemap at `/sitemap.xml`, robots at `/robots.txt`
- Open Graph + Twitter summary_large_image on every page
- HubSpot pageview tracking (production only, respects DNT)
- Lead form POSTs to `https://formsubmit.co/info@staffy.com`

---

## Common tasks

**Change FAQ content** → `src/seo/schema.js`, `faqItems` array.
Both the rendered `/faq/` page and the JSON-LD schema read from the same
source.

**Change meta tags** → The `Head` component in `src/pages/index.js`,
`faq.js`, or `contact.js`.

**Add a new page** → New file under `src/pages/`. Gatsby auto-routes by
filename. Add it to `static/sitemap.xml` and register it in the
`extraRoutes` array in `build-standalone.js` if you want it inlined into
the archive.

**Change the favicon** → Replace `static/favicon.webp`. 128×128 WebP
recommended.

**Change the form fields** → `src/components/PilotModal.js` (live site)
**and** the `betaModalHtml` block in `build-standalone.js` (standalone
archive). Keep them in sync or the two experiences diverge.
