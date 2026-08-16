// BUYBUTTON global press counter
// Jalanin: node server.js  (atau pm2 start server.js --name buycounter)
// Env opsional: PORT (default 8787), DATA (default ./count.json)
const http = require('http');
const fs = require('fs');

const PORT = process.env.PORT || 8787;
const DATA = process.env.DATA || __dirname + '/count.json';
const MAX_PER_REQ = 30;        // maksimal tap per request
const MAX_PER_SEC = 12;        // maksimal tap per detik per IP
const MAX_PER_DAY = 5000;      // maksimal tap per hari per IP

let total = 0;
try { total = JSON.parse(fs.readFileSync(DATA, 'utf8')).total || 0; } catch (e) {}
let dirty = false;
setInterval(() => { if (dirty) { fs.writeFile(DATA, JSON.stringify({ total }), () => {}); dirty = false; } }, 2000);

const perSec = new Map(), perDay = new Map();
setInterval(() => perSec.clear(), 1000);
setInterval(() => perDay.clear(), 24 * 3600 * 1000);

function ip(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || '?';
}
function send(res, code, obj) {
  res.writeHead(code, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(obj));
}

http.createServer((req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, {});
  if (req.url === '/count' && req.method === 'GET') return send(res, 200, { total });
  if (req.url === '/tap' && req.method === 'POST') {
    let body = '';
    req.on('data', c => { body += c; if (body.length > 200) req.destroy(); });
    req.on('end', () => {
      let n = 1;
      try { n = parseInt(JSON.parse(body || '{}').n, 10) || 1; } catch (e) {}
      n = Math.max(1, Math.min(MAX_PER_REQ, n));
      const who = ip(req);
      const s = perSec.get(who) || 0, d = perDay.get(who) || 0;
      const allowed = Math.max(0, Math.min(n, MAX_PER_SEC - s, MAX_PER_DAY - d));
      if (allowed > 0) {
        total += allowed; dirty = true;
        perSec.set(who, s + allowed); perDay.set(who, d + allowed);
      }
      return send(res, 200, { total, accepted: allowed });
    });
    return;
  }
  send(res, 404, { error: 'not found' });
}).listen(PORT, () => console.log('buycounter on :' + PORT, 'total', total));
