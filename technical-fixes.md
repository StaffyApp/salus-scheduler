# Staffy Workforce Scheduling — Technical Fixes

All fixes ordered by impact. Numbers come from the current `standalone.html` build.

---

## 1. Kill the 5.4 MB of inline base64 images (critical)

**Current state:** 13 images embedded as data URIs. Total page weight 5.5 MB. LCP and FCP will be unusable on 4G. Google Images cannot index any of them.

**Target state:** each image shipped as WebP or AVIF from a CDN, max 500 KB combined.

### Extraction script

Run this once to pull every inlined image out of the HTML into real files:

```python
# extract_images.py
# Usage: python3 extract_images.py standalone.html ./images-out
import base64, re, sys, os, pathlib

src = pathlib.Path(sys.argv[1]).read_text(encoding="utf-8")
out = pathlib.Path(sys.argv[2]); out.mkdir(parents=True, exist_ok=True)

pattern = re.compile(r'data:image/(png|jpeg|jpg|webp|svg\+xml);base64,([A-Za-z0-9+/=]+)')
seen, count = {}, 0
for m in pattern.finditer(src):
    ext = m.group(1).replace("svg+xml", "svg").replace("jpeg", "jpg")
    data = m.group(2)
    key = hash(data)
    if key in seen: continue
    seen[key] = True
    count += 1
    fname = f"img-{count:02d}.{ext}"
    (out / fname).write_bytes(base64.b64decode(data))
    print(f"{fname}  {len(data)*3//4:,} bytes")
print(f"\nExtracted {count} unique images to {out}/")
```

### Post-extraction pipeline

```bash
# 1. Run the extractor
python3 extract_images.py ~/Downloads/standalone.html ./images-out

# 2. Convert PNG/JPG to WebP at 82 quality (installs: brew install webp)
for f in ./images-out/*.{png,jpg}; do
  [ -e "$f" ] || continue
  cwebp -q 82 "$f" -o "${f%.*}.webp"
done

# 3. Generate 2x retina and mobile variants with sharp-cli (npm i -g sharp-cli)
for f in ./images-out/*.webp; do
  sharp -i "$f" -o "${f%.*}-800.webp" resize 800
  sharp -i "$f" -o "${f%.*}-1600.webp" resize 1600
done
```

### Replace each `<img>` tag

Before:

```html
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhE..." alt="Upcoming shifts calendar" loading="eager" />
```

After:

```html
<img
  src="https://cdn.staffy.com/home/hero-calendar-800.webp"
  srcset="https://cdn.staffy.com/home/hero-calendar-800.webp 800w,
          https://cdn.staffy.com/home/hero-calendar-1600.webp 1600w"
  sizes="(max-width: 768px) 100vw, 60vw"
  alt="Upcoming shifts calendar, April 2026 monthly view with staff-assigned shift pills across days, filter controls, and a side list of upcoming shifts by role"
  width="1600" height="1000"
  loading="eager"
  fetchpriority="high"
  decoding="async"
/>
```

Rules:
- Hero image: `loading="eager" fetchpriority="high"`. Everything below the fold: `loading="lazy"`.
- Always set explicit `width` and `height` to lock aspect ratio and avoid CLS.
- Keep the detailed alt text already present in the source. Do not trim it.

---

## 2. Externalize the 2.3 MB of inline CSS

**Current state:** two `<style>` blocks inside `<head>`.

**Target state:** one external stylesheet, plus a tiny critical CSS block inlined for above-the-fold paint.

```bash
# Save the contents of both <style> blocks (in order) to:
./assets/css/staffy-workforce.css

# Extract critical path (above-the-fold) using critical (npm i -g critical)
critical standalone.html --base ./ --inline --extract \
  --width 1440 --height 900 \
  --css ./assets/css/staffy-workforce.css \
  --target/css/staffy-workforce.critical.css
```

Then in the final `<head>`:

```html
<style>/* paste staffy-workforce.critical.css here, target 14 KB max */</style>
<link rel="preload" href="/assets/css/staffy-workforce.css" as="style" onload="this.rel='stylesheet'" />
<noscript><link rel="stylesheet" href="/assets/css/staffy-workforce.css" /></noscript>
```

---

## 3. Replace the SPA-style hidden pages with real URLs

**Current state:** `#page-home` and `#page-contact` are sibling divs toggled with JS. Only the home content is indexable. Contact, FAQ, and (later) blog all share the same URL, title, description, and schema.

**Target state:** one HTML file per URL.

| URL | Source |
|-----|--------|
| `/workforce-scheduling/` | home section only, with the head block from `fixed-head.html` |
| `/contact/` | ship `contact.html` already written |
| `/faq/` | new page, pull the FAQ Q and As from `schema.json` and render them as real content |

Delete the `.page` toggling JS after the split.

---

## 4. Fix the navbar IA

**Current state:**
- Nav label "Blog" points to `https://salus.staffy.com/roi-calculator/`
- Nav label "FAQ" points to `#problem` (the two-card problem section, not a FAQ)

**Fix:**

```html
<li><a href="/blog/">Blog</a></li>
<li><a href="/faq/">FAQ</a></li>
```

If the blog does not exist yet, remove the nav item until it does. Pointing a "Blog" link at a calculator tool degrades trust and crawl signals.

---

## 5. Pick one primary CTA

**Current state:** two hero CTAs with different destinations:
- `Request Beta Access` opens an on-page modal
- `Or book a demo` goes to `salus.staffy.com/#book` (different property, different brand surface)

**Fix:** primary CTA is the beta modal. Move `book a demo` to a secondary link in the footer, or unify the destinations. Having two conflicting funnels on the hero halves conversion and confuses crawlers about the page's intent.

---

## 6. Ship `robots.txt` and `sitemap.xml`

Files generated alongside this doc. Upload to the web root. See `robots.txt` and `sitemap.xml` in this folder.

---

## 7. Add a form endpoint and success state

**Current state:** the pilot modal calls `openModal()`. No server endpoint is visible in the standalone file.

**Fix:** point the form to a real POST endpoint (e.g., `/api/beta-request`) or a no-code form service (HubSpot, Formspree, Default, Plunk). On success, navigate to `/beta-confirmed/` so the conversion is a real page hit that analytics and paid ad platforms can count.

---

## 8. Add analytics plus consent

Nothing is instrumented in the standalone file. Add, in this order:

```html
<!-- Cookie consent: Klaro, Cookiebot, or similar -->
<script defer src="/assets/js/consent.js"></script>

<!-- GA4 (load only after consent) -->
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.addEventListener('consent:granted', () => {
    const s = document.createElement('script');
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX';
    s.async = true;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXX', { anonymize_ip: true });
  });
</script>
```

Fire a custom event on beta form submit so you can tie ad spend back to conversions.

---

## 9. Internal linking

The page is a dead end. Add at least these internal links once the target pages exist:

- Footer already links to `staffy.com`, `salus.staffy.com`. Keep.
- In the "Real-Time Credential Verification" card, link the phrase "credential-verified" to `salus.staffy.com`.
- In the Use Case section, link "20,000+ vetted external workers" to `staffy.com/find-talent`.
- Add a "Resources" strip above the footer with 3 links: Blog, FAQ, Pricing, once those pages exist.

---

## 10. Server headers to set

```
Cache-Control: public, max-age=31536000, immutable   # for /assets/* and /cdn/*
Cache-Control: public, max-age=3600                  # for HTML
Content-Security-Policy: default-src 'self'; img-src 'self' https://cdn.staffy.com data:; style-src 'self' 'unsafe-inline'; script-src 'self' https://www.googletagmanager.com
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## Expected outcome

If all 10 fixes ship:

| Metric | Current (est.) | Target |
|--------|---------------|--------|
| Page weight | 5.5 MB | under 600 KB |
| LCP (4G mobile) | 12 to 18 s | under 2.5 s |
| Lighthouse performance | under 30 | 85 plus |
| Indexable URLs | 1 | 3 plus (home, contact, FAQ) |
| Rich result eligibility | 0 | FAQ, SoftwareApplication, Organization, Breadcrumb |
| OG share preview | blank | full card |
