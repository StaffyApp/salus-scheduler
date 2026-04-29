// postbuild-img-dimensions.js
// After `gatsby build`, walks every HTML file in public/ and promotes the
// width/height from each gatsby-image-wrapper's aspect-ratio spacer SVG onto
// the sibling <img data-main-image> tag. Stops Lighthouse from flagging CLS
// on gatsby-plugin-image output.
//
// Usage (wired into npm run build):
//   gatsby build && node postbuild-img-dimensions.js

const fs = require('fs')
const path = require('path')

const PUBLIC_DIR = path.resolve(__dirname, 'public')

function walkHtml(dir) {
  const out = []
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name)
    const stat = fs.statSync(p)
    if (stat.isDirectory()) out.push(...walkHtml(p))
    else if (p.endsWith('.html')) out.push(p)
  }
  return out
}

// Gatsby's spacer SVG src looks like:
//   data:image/svg+xml;charset=utf-8,%3Csvg height='342' width='834' ...
// In the raw HTML the apostrophes are entity-encoded as &#x27;. Accept both.
const spacerRe = /<img[^>]*aria-hidden="true"[^>]*src="data:image\/svg\+xml[^"]*?height=(?:&#x27;|')(\d+)(?:&#x27;|')%20width=(?:&#x27;|')(\d+)(?:&#x27;|')/gi
const mainImgRe = /<img\b[^>]*\bdata-main-image[^>]*>/gi

let totalTagsAugmented = 0
let totalFilesChanged = 0

for (const file of walkHtml(PUBLIC_DIR)) {
  const html = fs.readFileSync(file, 'utf8')

  // Collect every spacer's position + dimensions in a single pass.
  const spacers = []
  let m
  while ((m = spacerRe.exec(html)) !== null) {
    spacers.push({ pos: m.index, height: m[1], width: m[2] })
  }
  if (!spacers.length) continue

  // For each <img data-main-image>, adopt the dims of the most recent spacer
  // that appeared before it in the document.
  let augmented = 0
  const next = html.replace(mainImgRe, (tag, offset) => {
    if (/\bwidth\s*=/.test(tag) && /\bheight\s*=/.test(tag)) return tag
    let spacer = null
    for (let i = spacers.length - 1; i >= 0; i--) {
      if (spacers[i].pos < offset) { spacer = spacers[i]; break }
    }
    if (!spacer) return tag
    augmented++
    // Inject width/height right before the self-closing `/>` or the final `>`.
    return tag.replace(/\/?>$/, ` width="${spacer.width}" height="${spacer.height}"$&`)
  })

  if (augmented) {
    fs.writeFileSync(file, next)
    totalFilesChanged++
    totalTagsAugmented += augmented
    console.log(`  ${path.relative(PUBLIC_DIR, file)} — added dims to ${augmented} <img>`)
  }
}

console.log(
  `Added width/height to ${totalTagsAugmented} <img data-main-image> tags across ${totalFilesChanged} file(s).`
)
