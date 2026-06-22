// build-standalone.js
// Reads public/index.html (Gatsby build output) and emits a single-file
// standalone.html with all CSS, fonts, and images inlined as data URIs.
// Intended for self-contained distribution (email, offline demo, archive).
//
// Run AFTER `gatsby build`:
//   node build-standalone.js

const fs = require('fs')
const path = require('path')

const PUBLIC_DIR = path.resolve(__dirname, 'public')
const SRC = path.join(PUBLIC_DIR, 'index.html')
const OUT = path.resolve(__dirname, 'standalone.html')

if (!fs.existsSync(SRC)) {
  console.error(`Missing ${SRC}. Run \`gatsby build\` first.`)
  process.exit(1)
}

const mimeByExt = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  webp: 'image/webp',
  ico: 'image/x-icon',
  otf: 'font/otf',
  ttf: 'font/ttf',
  woff: 'font/woff',
  woff2: 'font/woff2',
}

const cache = new Map()
let inlinedAssets = 0
let missing = 0

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')

// Walk CSS tracking brace depth, returning every top-level rule whose selector
// starts with `prefix`, plus any @media/@supports/@container/@layer block that
// *contains* a matching rule (wrapper preserved so media queries still apply).
function extractMatchingRules(css, prefix) {
  const out = []
  const n = css.length
  let i = 0
  while (i < n) {
    while (i < n && /\s/.test(css[i])) i++
    if (i >= n) break
    const braceOpen = css.indexOf('{', i)
    if (braceOpen < 0) break
    const header = css.slice(i, braceOpen).trim()
    let depth = 1
    let j = braceOpen + 1
    while (j < n && depth > 0) {
      const c = css[j]
      if (c === '{') depth++
      else if (c === '}') depth--
      if (depth === 0) break
      j++
    }
    const body = css.slice(braceOpen + 1, j)
    if (header.startsWith('@')) {
      if (/^@(?:media|supports|container|layer)\b/.test(header)) {
        const inner = extractMatchingRules(body, prefix)
        if (inner.length) out.push(`${header}{${inner.join('')}}`)
      }
      // @font-face/@keyframes/@import etc. are ignored — they belong to the
      // route page's shared chrome, which is already inlined on the home page.
    } else {
      const selectors = header.split(',').map((s) => s.trim())
      if (selectors.some((s) => s.startsWith(prefix))) {
        out.push(`${header}{${body}}`)
      }
    }
    i = j + 1
  }
  return out
}

function toDataUri(urlPath) {
  const clean = urlPath.replace(/^\//, '').split(/[?#]/)[0]
  if (cache.has(clean)) return cache.get(clean)
  const abs = path.join(PUBLIC_DIR, clean)
  if (!fs.existsSync(abs)) {
    missing++
    return null
  }
  const ext = path.extname(abs).slice(1).toLowerCase()
  const mime = mimeByExt[ext] || 'application/octet-stream'
  const b64 = fs.readFileSync(abs).toString('base64')
  const uri = `data:${mime};base64,${b64}`
  cache.set(clean, uri)
  inlinedAssets++
  return uri
}

let html = fs.readFileSync(SRC, 'utf8')

// 0. Splice routes that the single-file archive can't navigate to. Each
// extra-route HTML (FAQ, contact, ...) gets its main <section> pulled in as
// an anchor section inside the home page, with its scoped CSS concatenated
// into a new <style> block and any nav/footer links rewritten to #anchor.
// NOTE: the FAQ is not spliced here — the home page now carries its own
// server-rendered FAQ section (`faq-home`, id="faq"), so the standalone archive
// already includes it. The /faq nav link is anchored to that section in step
// 11b below. (The dedicated /faq/ route remains a separate, deeper FAQ on the
// live site and is intentionally not duplicated into this single-file archive.)
const extraRoutes = [
  { path: 'contact/index.html', section: 'contact', href: '/contact', cssPrefix: '.contact', sectionClass: 'contact-info' },
]
for (const route of extraRoutes) {
  const abs = path.join(PUBLIC_DIR, route.path)
  if (!fs.existsSync(abs)) continue
  const src = fs.readFileSync(abs, 'utf8')
  const secRe = new RegExp(`<section\\b[^>]*class="${escapeRegex(route.sectionClass)}"[\\s\\S]*?</section>`)
  const secMatch = src.match(secRe)
  if (!secMatch) continue
  // Give the section an id so #anchor navigation works, and demote h1→h2
  // to keep the merged page at a single h1.
  let section = secMatch[0]
    .replace(/^<section\b/, `<section id="${route.section}"`)
    .replace(/<h1\b/g, '<h2').replace(/<\/h1>/g, '</h2>')
  // Pull scoped CSS rules + any @media wrappers that contain them.
  const cssBlocks = [...src.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1])
  const rules = cssBlocks.flatMap((css) => extractMatchingRules(css, route.cssPrefix))
  // Inject the section right before the closing </footer>'s parent <footer>,
  // or before </main> if no footer. Most standalone pages have a <footer>.
  const marker = html.search(/<footer\b/) > -1 ? /<footer\b/ : /<\/main>/
  html = html.replace(marker, (m) => `${section}${m}`)
  if (rules.length) {
    html = html.replace('</head>', `<style id="standalone-${route.section}-css">${rules.join('')}</style></head>`)
  }
  // Rewrite links that pointed to the real route so they anchor-jump instead.
  const hrefRe = new RegExp(`href="${escapeRegex(route.href)}\\/?"`, 'g')
  html = html.replace(hrefRe, `href="#${route.section}"`)
}

// 1. Inline <link rel="stylesheet" href="/foo.css"> (and recursively inline url(...) inside the CSS)
html = html.replace(
  /<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g,
  (match, href) => {
    const clean = href.replace(/^\//, '').split(/[?#]/)[0]
    const abs = path.join(PUBLIC_DIR, clean)
    if (!fs.existsSync(abs)) return match
    let css = fs.readFileSync(abs, 'utf8')
    css = css.replace(/url\((['"]?)([^)'"]+)\1\)/g, (m, q, url) => {
      if (url.startsWith('data:') || /^(https?:)?\/\//.test(url)) return m
      const uri = toDataUri(url)
      return uri ? `url(${uri})` : m
    })
    inlinedAssets++
    return `<style>${css}</style>`
  }
)

// 2. Also inline url(...) inside <style> blocks (Gatsby's critical-CSS inlined block)
html = html.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/g, (match, css) => {
  const next = css.replace(/url\((['"]?)([^)'"]+)\1\)/g, (m, q, url) => {
    if (url.startsWith('data:') || /^(https?:)?\/\//.test(url)) return m
    const uri = toDataUri(url)
    return uri ? `url(${uri})` : m
  })
  return match.replace(css, next)
})

// 3. Collapse <picture> elements — keep only the inner <img>, drop <source>
html = html.replace(/<picture\b[^>]*>([\s\S]*?)<\/picture>/g, (match, inner) => {
  const imgMatch = inner.match(/<img\b[^>]*>/)
  return imgMatch ? imgMatch[0] : match
})

// 3a. Gatsby SSR puts style="opacity:0" on the main image and relies on JS
// to fade it in. Without JS we need to force opacity:1 so the image is visible.
html = html.replace(/(<img\b[^>]*)\sstyle="([^"]*)"/gi, (m, pre, style) => {
  const next = style.replace(/opacity\s*:\s*0(?:\.0+)?\s*;?/gi, 'opacity:1;')
  return `${pre} style="${next}"`
})

// 3b. Drop the placeholder overlay div inside .gatsby-image-wrapper. It sits
// on top of the real image and is normally faded to opacity:0 by JS on load.
// The aspect-ratio spacer SVG is kept — it reserves layout height.
html = html.replace(
  /<div\b[^>]*data-placeholder-image[^>]*><\/div>/g,
  ''
)

// 3c. Gatsby lazy images keep the real URL in data-src / data-srcset and only
// set src/srcset via JS at runtime. We strip Gatsby's JS, so promote these
// attributes ourselves. The existing src is a blank aspect-ratio SVG
// placeholder — strip it before promoting data-src.
html = html.replace(/<img\b[^>]*\sdata-src="[^"]+"[^>]*>/gi, (tag) => {
  let next = tag.replace(/\ssrc="[^"]*"/i, '')
  next = next.replace(/\sdata-src="([^"]+)"/i, ' src="$1"')
  return next
})
html = html.replace(
  /(<(?:img|source)\b[^>]*?)\sdata-srcset="([^"]+)"/gi,
  '$1 srcset="$2"'
)

// 4. Strip srcset (+ any leftover data-srcset) attributes to force browsers to use src
html = html.replace(/\s(?:data-)?srcset="[^"]*"/gi, '')
html = html.replace(/\ssizes="[^"]*"/gi, '')

// 5. Inline every remaining /static/... reference (img src, favicon, link href)
html = html.replace(/(["'(])\/static\/[^"'<>)\s]+/g, (match, lead) => {
  const url = match.slice(1)
  const uri = toDataUri(url)
  return uri ? `${lead}${uri}` : match
})

// 6. Inline favicon + icons
html = html.replace(
  /<link\b[^>]*rel="(?:icon|apple-touch-icon|manifest)"[^>]*href="([^"]+)"[^>]*>/g,
  (match, href) => {
    if (href.startsWith('data:')) return match
    const uri = toDataUri(href)
    return uri ? match.replace(href, uri) : match
  }
)

// 7. Strip JS bundles (standalone must work without network / build runtime)
html = html.replace(
  /<script\b[^>]*src="\/(?:framework|webpack-runtime|app|commons|polyfill|component---|\d+)[^"]*"[^>]*><\/script>/g,
  ''
)

// 8. Drop <link rel="preload"|"prefetch"|"modulepreload">. JS/page-data
// preloads reference stripped chunks. Font preloads embed the font bytes a
// second time on top of @font-face in the CSS — meaningless for an offline
// single-file archive (no network to prefetch over), so we drop them too.
html = html.replace(/<link\b[^>]*rel="(?:preload|prefetch|modulepreload)"[^>]*>/g, (match) => {
  if (/page-data|\.js|as="script"|as="font"/.test(match)) return ''
  return match
})

// 9. Strip Gatsby page-data inline boot script tags (they reference missing chunks)
html = html.replace(/<script\b[^>]*id="gatsby-chunk-mapping"[^>]*>[\s\S]*?<\/script>/g, '')
html = html.replace(
  /<script\b[^>]*>window\.___[a-zA-Z]+[\s\S]*?<\/script>/g,
  ''
)

// 10. Inject a no-JS override so scroll-triggered .reveal elements are visible.
// Without hydration, IntersectionObserver never adds .is-visible, so CSS
// keeps them at opacity:0. Also force descendants whose visibility cascades
// from a parent's .is-visible (Problem cards/gap, UseCase steps, Diff checks).
const noJsOverride = `<style id="standalone-nojs-override">
.reveal,.reveal-stagger .reveal-child{opacity:1 !important;transform:none !important;}
.problem__card,.problem__gap-text,.use-case__step{opacity:1 !important;transform:none !important;}
.problem__gap-line{transform:scaleX(1) !important;}
.diff__item-check{transform:scale(1) rotate(0deg) !important;}
.scroll-progress{display:none !important;}
.faq__panel{grid-template-rows:1fr !important;opacity:1 !important;}
.faq__trigger{cursor:default !important;}
.faq__icon{display:none !important;}
</style>`
html = html.replace('</head>', `${noJsOverride}</head>`)

// 11. The React modal that normally opens on "Request Beta Access" is never
// in the SSR output (PilotModal returns null when !isOpen) and the click
// handler is JS-only. Inject a CSS-only `:target`-driven modal with a real
// HTML form that POSTs to the StaffyAPI salus-lead endpoint so the archive
// still converts leads when opened from email/offline.
const STANDALONE_API_BASE =
  process.env.GATSBY_STAFFY_API_BASE || 'https://api.staffy.com'
const STANDALONE_SALUS_LEAD_ENDPOINT = `${STANDALONE_API_BASE}/api/salus-leads`
const betaModalCss = `<style id="standalone-beta-modal-css">
.standalone-modal{display:none;position:fixed;inset:0;z-index:9999;align-items:center;justify-content:center;padding:24px;font-family:inherit}
.standalone-modal:target{display:flex}
.standalone-modal__backdrop{position:absolute;inset:0;background:rgba(15,23,42,.55)}
.standalone-modal__panel{position:relative;background:#fff;border-radius:16px;padding:32px;max-width:520px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.25)}
.standalone-modal__close{position:absolute;top:12px;right:16px;font-size:28px;line-height:1;text-decoration:none;color:#94a3b8;font-weight:300}
.standalone-modal__close:hover{color:#0f172a}
.standalone-modal__title{font-size:24px;font-weight:800;color:#0f172a;margin:0 0 8px;letter-spacing:-.01em}
.standalone-modal__lead{color:#64748b;font-size:15px;line-height:1.5;margin:0 0 20px}
.standalone-modal__grid{display:grid;gap:14px}
.standalone-modal__row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.standalone-modal label{display:block;font-size:13px;font-weight:600;color:#0f172a;position:relative;line-height:20px}
.standalone-modal__req{position:absolute;color:#ff6b35;margin-left:2px;font-weight:600;line-height:inherit}
.standalone-modal input,.standalone-modal select{display:block;width:100%;padding:10px 12px;margin-top:5px;border:1px solid #e2e8f0;border-radius:8px;font-size:14px;font-family:inherit;background:#fff;color:#0f172a}
.standalone-modal input::placeholder{color:#94a3b8}
.standalone-modal input:focus,.standalone-modal select:focus{outline:none;border-color:#ff6b35;box-shadow:0 0 0 3px rgba(255,107,53,.15)}
/* Error state: only after user interaction (:user-invalid) or after submit attempt (:invalid after form :invalid) */
.standalone-modal input:user-invalid,.standalone-modal select:user-invalid{border-color:#dc2626;background:#fef2f2}
.standalone-modal input:user-invalid:focus,.standalone-modal select:user-invalid:focus{box-shadow:0 0 0 3px rgba(220,38,38,.15)}
.standalone-modal__hint{display:none;font-size:12px;color:#dc2626;margin-top:4px;font-weight:500}
.standalone-modal input:user-invalid~.standalone-modal__hint,.standalone-modal select:user-invalid~.standalone-modal__hint{display:block}
.standalone-modal__submit{background:#ff6b35;color:#fff;padding:12px 20px;border:none;border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;width:100%;margin-top:8px;font-family:inherit;display:flex;align-items:center;justify-content:center;text-align:center}
.standalone-modal__submit:hover{background:#e55a28}
.standalone-modal__submit:disabled{background:#cbd5e1;cursor:not-allowed}
@media(max-width:560px){.standalone-modal__row{grid-template-columns:1fr}}
</style>`
const betaModalHtml = `<div id="beta-modal" class="standalone-modal" role="dialog" aria-modal="true" aria-labelledby="beta-modal-title">
<a href="#" class="standalone-modal__backdrop" aria-label="Close"></a>
<div class="standalone-modal__panel">
<a href="#" class="standalone-modal__close" aria-label="Close">&times;</a>
<h2 id="beta-modal-title" class="standalone-modal__title">Request Beta Access</h2>
<p class="standalone-modal__lead">Tell us about your facility. We&rsquo;ll reach out with pilot details.</p>
<form class="standalone-modal__grid" action="${STANDALONE_SALUS_LEAD_ENDPOINT}" method="POST">
<input type="hidden" name="type" value="beta">
<input type="hidden" name="source" value="salusworkforcemanagement.staffy.com (standalone)">
<input type="hidden" name="_next" value="https://salusworkforcemanagement.staffy.com/?submitted=1">
<label>Facility name
<input type="text" name="facilityName" placeholder="e.g. Sunrise Long-Term Care" maxlength="120" autocomplete="organization">
</label>
<div class="standalone-modal__row">
<label>Contact name<span class="standalone-modal__req">*</span>
<input type="text" name="contactName" required minlength="2" maxlength="80" pattern="[A-Za-z\\u00C0-\\u024F\\s.'\\-]{2,80}" title="Use letters, spaces, hyphens, apostrophes or periods only" placeholder="Jane Smith" autocomplete="name">
<span class="standalone-modal__hint">Names can&rsquo;t contain numbers or special characters.</span>
</label>
<label>Email<span class="standalone-modal__req">*</span>
<input type="email" name="email" required placeholder="jane@facility.com" autocomplete="email" pattern="[^@\\s]+@[^@\\s]+\\.[^@\\s]+" maxlength="120">
<span class="standalone-modal__hint">Please enter a valid email address.</span>
</label>
</div>
<div class="standalone-modal__row">
<label>Phone
<input type="tel" name="phone" placeholder="(416) 555-0100" pattern="[\\d\\s()+\\-.]{7,}" autocomplete="tel" maxlength="30">
<span class="standalone-modal__hint">Please enter a valid phone number.</span>
</label>
<label>Facility type<span class="standalone-modal__req">*</span>
<select name="facilityType" required>
<option value="">Select type...</option>
<option value="ltc">Long-Term Care</option>
<option value="retirement">Retirement Home</option>
<option value="hospital">Hospital</option>
<option value="homecare">Homecare</option>
<option value="other">Other</option>
</select>
<span class="standalone-modal__hint">Please select a facility type.</span>
</label>
</div>
<label>Number of staff
<input type="number" name="staffCount" min="0" max="100000" step="1" placeholder="e.g. 150" inputmode="numeric">
<span class="standalone-modal__hint">Must be a whole number between 0 and 100000.</span>
</label>
<button type="submit" class="standalone-modal__submit">Request Beta Access</button>
</form>
</div>
</div>`
html = html.replace('</head>', `${betaModalCss}</head>`)
html = html.replace('</body>', `${betaModalHtml}</body>`)

// 11b. Rewrite Gatsby's absolute internal hrefs so they work from file:// or
// any non-root host. "/" (brand/logo) becomes "#" (scroll to top). "/#foo"
// (section anchor jumps) becomes "#foo" (in-page anchor). External URLs and
// #-only hrefs are left alone.
html = html.replace(/<a\b([^>]*?)\shref="\/"/gi, '<a$1 href="#"')
html = html.replace(/<a\b([^>]*?)\shref="\/#([^"]+)"/gi, '<a$1 href="#$2"')
// /faq nav link → in-page anchor to the home page's own FAQ section (id="faq").
html = html.replace(/<a\b([^>]*?)\shref="\/faq\/?"/gi, '<a$1 href="#faq"')

// 12. Rewire every <button> whose text contains "Request Beta Access" into an
// anchor targeting #beta-modal. Keeps the original classes so the CTA styling
// stays intact; drops type="button" since anchors don't need it.
html = html.replace(
  /<button\b([^>]*)>([\s\S]*?)<\/button>/gi,
  (match, attrs, inner) => {
    if (!/Request Beta Access/i.test(inner)) return match
    const cleanAttrs = attrs.replace(/\s*type="[^"]*"/gi, '')
    return `<a${cleanAttrs} href="#beta-modal">${inner}</a>`
  }
)

fs.writeFileSync(OUT, html)
const mb = (Buffer.byteLength(html) / 1024 / 1024).toFixed(2)
console.log(
  `Wrote ${OUT} (${mb} MB) — inlined ${inlinedAssets} assets, ${missing} missing.`
)
