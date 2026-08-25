// Renders every artboard in social/cards.html to a PNG.
//
//   node tools/render-cards.mjs
//
// FONT_CSS=path/to/inlined-fonts.css   if this machine cannot reach Google Fonts
// CHROME_PATH=...                      to pin a Chromium build

import { chromium } from 'playwright';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// id in cards.html  ->  output path, relative to hesitate/
const BOARDS = {
  banner: 'banner.png',
  pfp:    'social/pfp.png',
  icon:   'social/icon.png',
  og:     'og.png',
  post2:  'social/post2.png',
};

const browser = await chromium.launch({
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
  args: ['--allow-file-access-from-files'],
});
const page = await browser.newPage({ viewport: { width: 1700, height: 1000 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(join(ROOT, 'social/cards.html')).href, { waitUntil: 'load' });

if (process.env.FONT_CSS && existsSync(process.env.FONT_CSS)) {
  await page.addStyleTag({ content: readFileSync(process.env.FONT_CSS, 'utf8') });
}
await page.evaluate(() => document.fonts.ready);
// the artwork is <img>; make sure every one has actually decoded before we shoot
await page.evaluate(() => Promise.all([...document.images].map((i) => (i.complete ? 0 : i.decode()))));
await page.waitForTimeout(400);

for (const [id, out] of Object.entries(BOARDS)) {
  await page.locator('#' + id).screenshot({ path: join(ROOT, out) });
  console.log('wrote', out);
}

await browser.close();
