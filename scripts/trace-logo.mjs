// One-off: traces the bar's Facebook logo into SVG paths for the wordmark and the octopus.
// Usage: node scripts/trace-logo.mjs  ->  writes src/brand/paths.ts
import sharp from 'sharp';
import potrace from 'potrace';
import { writeFile, mkdir } from 'node:fs/promises';
import { promisify } from 'node:util';

const trace = promisify(potrace.trace);
const SRC = 'scripts/source/tonne-logo-facebook.jpg';
const PAD = 16;

// Measured on the 2048px source
const WORDMARK = { left: 266 - PAD, top: 1439 - PAD, width: 1781 - 266 + PAD * 2, height: 1804 - 1439 + PAD * 2 };
const OCTOPUS = { left: 588 - PAD, top: 270 - PAD, width: 1459 - 588 + PAD * 2, height: 1338 - 270 + PAD * 2 };
// Red ink lives in these boxes (full-image coords): the Ø in the wordmark, the ø on the octopus's head
const RED_WORD = { x0: 530, x1: 870 };
const RED_HEAD = { x0: 940, y0: 475, x1: 1055, y1: 620 };

async function luma(region) {
  const { data, info } = await sharp(SRC).extract(region).greyscale().raw().toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height };
}

function toPng(bits, w, h) {
  const out = Buffer.alloc(w * h);
  for (let i = 0; i < w * h; i++) out[i] = bits[i] ? 0 : 255;
  return sharp(out, { raw: { width: w, height: h, channels: 1 } }).png().toBuffer();
}

async function tracePaths(bits, w, h) {
  const svg = await trace(await toPng(bits, w, h), { threshold: 128, turdSize: 30, optTolerance: 0.3, alphaMax: 1 });
  return [...svg.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]).join(' ');
}

// Fills everything reachable from the border through light pixels: the outside of the drawing
function exterior(data, w, h) {
  const out = new Uint8Array(w * h);
  const stack = [];
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
  while (stack.length) {
    const i = stack.pop();
    if (out[i] || data[i] < 128) continue;
    out[i] = 1;
    const x = i % w, y = (i - x) / w;
    if (x > 0) stack.push(i - 1);
    if (x < w - 1) stack.push(i + 1);
    if (y > 0) stack.push(i - w);
    if (y < h - 1) stack.push(i + w);
  }
  return out;
}

async function build(region, isRed, withPaper) {
  const { data, w, h } = await luma(region);
  const ink = new Uint8Array(w * h), red = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    if (data[i] >= 128) continue;
    const x = (i % w) + region.left, y = Math.floor(i / w) + region.top;
    (isRed(x, y) ? red : ink)[i] = 1;
  }
  const result = {
    viewBox: `0 0 ${w} ${h}`,
    ink: await tracePaths(ink, w, h),
    red: await tracePaths(red, w, h),
  };
  if (withPaper) {
    const ext = exterior(data, w, h);
    const paper = new Uint8Array(w * h);
    for (let i = 0; i < w * h; i++) paper[i] = ext[i] ? 0 : 1;
    result.paper = await tracePaths(paper, w, h);
  }
  return result;
}

const out = {
  wordmark: await build(WORDMARK, (x) => x >= RED_WORD.x0 && x <= RED_WORD.x1, false),
  octopus: await build(
    OCTOPUS,
    (x, y) => x >= RED_HEAD.x0 && x <= RED_HEAD.x1 && y >= RED_HEAD.y0 && y <= RED_HEAD.y1,
    true,
  ),
};

await mkdir('src/brand', { recursive: true });
await writeFile(
  'src/brand/paths.ts',
  `// Traced from the bar's own logo (facebook.com/tonnebar). Regenerate with: node scripts/trace-logo.mjs\n` +
    `export const LOGO = ${JSON.stringify(out, null, 2)} as const;\n`,
);
for (const [k, v] of Object.entries(out)) console.log(k, v.viewBox, Object.fromEntries(Object.entries(v).map(([a, b]) => [a, b.length])));
