// Renders every mascot SVG to PNG at 1024x1024 into mascot/png/.
//
//   node tools/render-mascots.mjs
//
// You need these because:
//   - X / Telegram / Discord will not take an SVG as a profile picture
//   - image models want a raster to use as a character reference
//
// CHROME_PATH=... to point at a specific Chromium build.

import { chromium } from 'playwright';
import { readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'mascot');
const OUT = join(SRC, 'png');
const SIZE = 1024;

mkdirSync(OUT, { recursive: true });
const files = readdirSync(SRC).filter((f) => f.endsWith('.svg'));

const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}
);
const page = await browser.newPage({ viewport: { width: SIZE, height: SIZE }, deviceScaleFactor: 1 });

for (const f of files) {
  // wrap in a page so the SVG scales to SIZE regardless of its own width/height
  const wrap = join(OUT, '_wrap.html');
  writeFileSync(
    wrap,
    `<style>html,body{margin:0}img{display:block;width:${SIZE}px;height:${SIZE}px}</style>` +
      `<img src="${pathToFileURL(join(SRC, f)).href}">`
  );
  await page.goto(pathToFileURL(wrap).href, { waitUntil: 'load' });
  await page.waitForTimeout(250);
  const out = join(OUT, f.replace(/\.svg$/, '.png'));
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: SIZE, height: SIZE } });
  console.log('wrote', out);
}

await browser.close();
