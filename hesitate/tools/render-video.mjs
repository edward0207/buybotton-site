// Renders social/video/frame.html frame by frame and encodes social/post1.mp4.
//
//   node tools/render-video.mjs
//
// FFMPEG=/path/to/ffmpeg   an ffmpeg with libx264 (npm i ffmpeg-static gives you one).
//                          Playwright's bundled ffmpeg is VP8/WebM only, and X will
//                          not accept a WebM upload, so it cannot be used here.
// FONT_CSS=...             inlined @font-face css, if Google Fonts is unreachable
// CHROME_PATH=...          pin a Chromium build

import { chromium } from 'playwright';
import { readFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FRAMES = join(ROOT, 'social/video/frames');
const OUT = join(ROOT, 'social/post1.mp4');
const FFMPEG = process.env.FFMPEG || 'ffmpeg';

rmSync(FRAMES, { recursive: true, force: true });
mkdirSync(FRAMES, { recursive: true });

const browser = await chromium.launch({
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
  args: ['--allow-file-access-from-files', '--force-device-scale-factor=1'],
});
const page = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(join(ROOT, 'social/video/frame.html')).href, { waitUntil: 'load' });

if (process.env.FONT_CSS && existsSync(process.env.FONT_CSS)) {
  await page.addStyleTag({ content: readFileSync(process.env.FONT_CSS, 'utf8') });
}
await page.evaluate(() => document.fonts.ready);

// decode every shot up front, or the first frame of each beat renders empty
await page.evaluate(async () => {
  await Promise.all(
    window.__SOURCES.map(
      (s) => new Promise((res, rej) => { const i = new Image(); i.onload = res; i.onerror = rej; i.src = s; })
    )
  );
});

const FPS = await page.evaluate(() => window.__FPS);
const DURATION = await page.evaluate(() => window.__DURATION);
const total = Math.round(FPS * DURATION);
console.log(`rendering ${total} frames @ ${FPS}fps (${DURATION}s)`);

for (let f = 0; f < total; f++) {
  await page.evaluate((t) => window.setT(t), f / FPS);
  await page.screenshot({
    path: join(FRAMES, String(f).padStart(4, '0') + '.png'),
    clip: { x: 0, y: 0, width: 1080, height: 1080 },
  });
  if (f % 60 === 0) console.log('  frame', f);
}
await browser.close();

const args = [
  '-y', '-framerate', String(FPS),
  '-i', join(FRAMES, '%04d.png'),
  '-c:v', 'libx264',
  '-profile:v', 'high', '-level', '4.0',
  '-pix_fmt', 'yuv420p',       // required or X/Safari will refuse to play it
  '-crf', '19',
  '-preset', 'slow',
  '-movflags', '+faststart',
  OUT,
];
const r = spawnSync(FFMPEG, args, { stdio: ['ignore', 'ignore', 'pipe'] });
if (r.status !== 0) {
  console.error(String(r.stderr).split('\n').slice(-25).join('\n'));
  process.exit(1);
}
rmSync(FRAMES, { recursive: true, force: true });
console.log('wrote', OUT);
