// One-off: builds favicons, the link-preview image and web-sized photos from public/media.
// Usage: npm run media
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

const src = await readFile('src/brand/paths.ts', 'utf8');
const LOGO = JSON.parse(src.slice(src.indexOf('{'), src.lastIndexOf('}') + 1));
const W = LOGO.wordmark;
const [, , WW, WH] = W.viewBox.split(' ').map(Number);

const NIGHT = '#121a19';
const CREAM = '#efe7da';
const RED = '#a3101c';

// ---- Favicons: the red Ø from the wordmark on cream, like the logo
// The Ø sits roughly between x=290 and x=590 of the traced wordmark
const O_BOX = { x: 296, y: 0, w: 290, h: WH };
function oSvg(size, radius) {
  const pad = O_BOX.h * 0.16;
  const vb = `${O_BOX.x - (O_BOX.h + pad * 2 - O_BOX.w) / 2} ${O_BOX.y - pad} ${O_BOX.h + pad * 2} ${O_BOX.h + pad * 2}`;
  const [vx, vy, vw] = vb.split(' ').map(Number);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${size}" height="${size}">` +
    `<rect x="${vx}" y="${vy}" width="${vw}" height="${vw}" rx="${vw * radius}" fill="${CREAM}"/>` +
    `<path fill="${RED}" fill-rule="evenodd" d="${W.red}"/></svg>`;
}
await writeFile('public/favicon.svg', oSvg(64, 0.22));
await sharp(Buffer.from(oSvg(32, 0.22))).png().toFile('public/favicon-32.png');
await sharp(Buffer.from(oSvg(180, 0))).png().toFile('public/apple-touch-icon.png');

// ---- Web-sized photos (WebP alongside the originals)
const photos = ['tonne-bar-at-jight.jpg', 'Tone-2022-1.jpg', 'tonne-oct-2020.jpg', 'image-59.png'];
for (const p of photos) {
  const base = p.replace(/\.(jpg|png)$/, '');
  await sharp(`public/media/${p}`).webp({ quality: 78 }).toFile(`public/media/${base}.webp`);
}
// The old shopfront is a PNG with alpha; a flat JPG is lighter for the fallback
await sharp('public/media/image-59.png').flatten({ background: '#ffffff' }).jpeg({ quality: 80, mozjpeg: true }).toFile('public/media/image-59.jpg');

// ---- Link preview: 1200x630. Photo in two thirds, wordmark in the other.
const OG_W = 1200, OG_H = 630, PANEL = 400;
const photo = await sharp('public/media/tonne-bar-at-jight.jpg')
  .resize(OG_W - PANEL, OG_H, { fit: 'cover', position: 'top', kernel: 'lanczos3' })
  .modulate({ brightness: 1.05 })
  .sharpen({ sigma: 0.6 })
  .toBuffer();
const markW = 300, markH = Math.round((markW * WH) / WW);
const glass = (x, fill) =>
  `<path d="M${x} 0 h26 l-3 44 a4 4 0 0 1 -4 4 h-12 a4 4 0 0 1 -4 -4 z" fill="none" stroke="${CREAM}" stroke-width="2.5" stroke-linejoin="round"/>` +
  `<path d="M${x + 2.5} 14 h21 l-2.2 30 a2 2 0 0 1 -2 2 h-12.6 a2 2 0 0 1 -2 -2 z" fill="${fill}"/>`;
const panel = `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}">
  <rect width="${PANEL}" height="${OG_H}" fill="${NIGHT}"/>
  <rect x="${PANEL - 6}" width="6" height="${OG_H}" fill="${RED}"/>
  <svg x="50" y="${(OG_H - markH) / 2 - 30}" width="${markW}" height="${markH}" viewBox="${W.viewBox}">
    <path fill="${CREAM}" fill-rule="evenodd" d="${W.ink}"/>
    <path fill="#c8232c" fill-rule="evenodd" d="${W.red}"/>
  </svg>
  <g transform="translate(50 ${(OG_H + markH) / 2 + 20})">${glass(0, '#e2636a')}${glass(40, '#9b1c2a')}${glass(80, '#efc25c')}</g>
</svg>`;
await sharp({ create: { width: OG_W, height: OG_H, channels: 3, background: NIGHT } })
  .composite([
    { input: photo, left: PANEL, top: 0 },
    { input: Buffer.from(panel), left: 0, top: 0 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/og.jpg');

const meta = await sharp('public/og.jpg').metadata();
const { size } = await import('node:fs').then((fs) => fs.statSync('public/og.jpg'));
console.log(`og.jpg ${meta.width}x${meta.height} ${meta.format} ${(size / 1024).toFixed(1)}KB`);
