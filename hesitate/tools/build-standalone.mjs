// Bundles index.html + art/ into one self-contained HTML file.
//
//   node tools/build-standalone.mjs              -> dist/hesitate.html   (full document)
//   node tools/build-standalone.mjs --artifact   -> dist/artifact.html   (body only)
//
// Why: the site normally loads art/*.jpg over the network. A single file with the
// images inlined as data URIs opens straight from disk, survives being emailed,
// and can be published to hosts that only accept one file.
//
// The --artifact variant drops <!doctype>, <html>, <head> and <body> because the
// Artifact host supplies its own document skeleton.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const artifactMode = process.argv.includes('--artifact');

const MIME = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml' };

function dataUri(rel) {
  const file = join(ROOT, rel);
  const type = MIME[extname(rel).toLowerCase()];
  if (!type) throw new Error('no mime type for ' + rel);
  return `data:${type};base64,${readFileSync(file).toString('base64')}`;
}

let html = readFileSync(join(ROOT, 'index.html'), 'utf8');

// every local asset the page references, inlined
const assets = new Set();
html.replace(/(?:src|href|content)="((?:art|social)\/[^"]+)"/g, (_, p) => assets.add(p));
// the hero swaps these in from JS, so they never appear as a src attribute
['art/idle.jpg', 'art/hover.jpg', 'art/missed.jpg', 'art/cope.jpg'].forEach((p) => assets.add(p));

for (const rel of assets) {
  const uri = dataUri(rel);
  html = html.split(`"${rel}"`).join(`"${uri}"`);
  html = html.split(`'${rel}'`).join(`'${uri}'`);
  console.log('inlined', rel);
}

mkdirSync(join(ROOT, 'dist'), { recursive: true });

if (!artifactMode) {
  const out = join(ROOT, 'dist/hesitate.html');
  writeFileSync(out, html);
  console.log('wrote', out, (html.length / 1e6).toFixed(2) + ' MB');
} else {
  // keep only what the Artifact host does not already provide
  // gallery titles are names, not sentences: drop the tagline after the dash
  const title = html.match(/<title>([\s\S]*?)<\/title>/)[1].split('—')[0].trim();
  const fonts = html.match(/<link href="https:\/\/fonts\.googleapis\.com[^>]*>/)[0];
  const style = html.match(/<style>[\s\S]*?<\/style>/)[0];
  const body = html.match(/<body>([\s\S]*)<\/body>/)[1];

  const out = join(ROOT, 'dist/artifact.html');
  writeFileSync(out, `<title>${title}</title>\n${fonts}\n${style}\n${body}\n`);
  console.log('wrote', out, ((title.length + style.length + body.length) / 1e6).toFixed(2) + ' MB');
}
