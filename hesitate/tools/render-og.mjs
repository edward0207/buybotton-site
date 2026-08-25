// Renders og.html -> og.png (1200x630).
//
//   npm i -D playwright   (or have it installed globally)
//   node tools/render-og.mjs
//
// Optional: FONT_CSS=path/to/inlined-fonts.css to render on a machine that
// cannot reach fonts.googleapis.com — the file is injected before screenshotting.

import { chromium } from 'playwright';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const page_url = pathToFileURL(join(ROOT, 'og.html')).href;
const out = join(ROOT, 'og.png');

const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}
);
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(page_url, { waitUntil: 'load' });

if (process.env.FONT_CSS && existsSync(process.env.FONT_CSS)) {
  await page.addStyleTag({ content: readFileSync(process.env.FONT_CSS, 'utf8') });
}

// don't screenshot before the faces are actually ready
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400);

await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
console.log('wrote', out);
