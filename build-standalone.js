// build-standalone.js
// Generates standalone.html from site.html by embedding all referenced
// local images as base64 data URIs. Share standalone.html for self-contained
// distribution; keep editing site.html.
//
// Usage: node build-standalone.js

const fs = require('fs');
const path = require('path');

const SRC = 'site.html';
const OUT = 'standalone.html';

const mimeByExt = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  webp: 'image/webp',
  otf: 'font/otf',
  ttf: 'font/ttf',
  woff: 'font/woff',
  woff2: 'font/woff2',
};

const html = fs.readFileSync(SRC, 'utf8');
const cache = new Map();
let embedded = 0;
let embeddedFonts = 0;
let missing = 0;

function toDataUri(relPath) {
  const decoded = decodeURI(relPath).replace(/%20/g, ' ');
  if (cache.has(decoded)) return cache.get(decoded);
  const abs = path.resolve(decoded);
  if (!fs.existsSync(abs)) {
    console.warn('  ! missing:', decoded);
    missing++;
    return null;
  }
  const ext = path.extname(abs).slice(1).toLowerCase();
  const mime = mimeByExt[ext] || 'application/octet-stream';
  const b64 = fs.readFileSync(abs).toString('base64');
  const dataUri = `data:${mime};base64,${b64}`;
  cache.set(decoded, dataUri);
  return dataUri;
}

let output = html;

// 1. Embed <img src="src/images/..."> references
output = output.replace(
  /src="((?:src\/images|\.\/src\/images)\/[^"]+)"/g,
  (match, relPath) => {
    const uri = toDataUri(relPath);
    if (!uri) return match;
    embedded++;
    return `src="${uri}"`;
  }
);

// 2. Embed @font-face url('src/fonts/...') references inside CSS
output = output.replace(
  /url\((['"]?)((?:src\/fonts|\.\/src\/fonts)\/[^'")]+)\1\)/g,
  (match, quote, relPath) => {
    const uri = toDataUri(relPath);
    if (!uri) return match;
    embeddedFonts++;
    return `url('${uri}')`;
  }
);

fs.writeFileSync(OUT, output);
const mb = (Buffer.byteLength(output) / 1024 / 1024).toFixed(2);
console.log(`Wrote ${OUT} (${mb} MB) — embedded ${embedded} images, ${embeddedFonts} fonts, ${missing} missing.`);
