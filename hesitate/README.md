# HESITATE

Dia lihat peluangnya. Dia mikir. Dia nggak klik.

```
hesitate/
├── index.html              website, satu file, tanpa build step
├── banner.png              1500×500 — header X
├── og.png                  1200×630 — kartu link
├── art/                    ← SUMBER KEBENARAN KARAKTERNYA
│   ├── idle.jpg            default. PFP, hero
│   ├── hover.jpg           nunjuk tombol, nggak nyentuh
│   ├── waiting.jpg         riset di depan monitor mati
│   ├── missed.jpg          telat, mulut kebuka
│   ├── cope.jpg            "gue tuh early kok"
│   └── shadow.jpg          bayangannya ngangkat kepalan, orangnya nggak
├── social/
│   ├── BIO.md              bio X, display name, kandidat handle
│   ├── POSTS.md            post 1 & 2 + antrian + apa yang nggak pernah diposting
│   ├── post1.mp4           video post pertama, 1080×1080, 15 dtk
│   ├── post2.png           meme dua panel, 1600×800
│   ├── pfp.png             1024×1024
│   ├── icon.png            180×180 favicon
│   ├── cards.html          sumber semua gambar sosial
│   └── video/frame.html    sumber tiap frame video
├── brand/
│   ├── BRAND.md            standar visual + checklist buat NOLAK gambar
│   ├── PROMPTS.md          prompt pack, khusus buat NAMBAH gambar tanpa ngerusak karakter
│   ├── tokens.css          token warna & tipografi
│   └── audit/              temuan di buy.png dan logo.png
└── tools/
    ├── render-cards.mjs       cards.html → banner / pfp / icon / og / post2
    ├── render-video.mjs       frame.html → post1.mp4
    └── build-standalone.mjs   semuanya   → satu file HTML mandiri
```

---

## Aturan paling penting

**`art/` itu kanon.** Enam gambar itu yang menentukan karakternya. Semua aset lain —
banner, PFP, OG, video, situs — dirakit dari situ, bukan digambar ulang. Kalau
`BRAND.md` bentrok sama gambarnya, gambarnya yang menang.

**Jangan pernah edit PNG atau MP4-nya langsung.** Semuanya hasil render:

```bash
npm i -D playwright ffmpeg-static     # sekali doang

node tools/render-cards.mjs           # banner, pfp, icon, og, post2
node tools/render-video.mjs           # post1.mp4
```

`render-video.mjs` butuh ffmpeg yang punya **libx264**. ffmpeg bawaan Playwright
cuma VP8/WebM, dan X nggak nerima WebM — jadi kasih path-nya:

```bash
FFMPEG=./node_modules/ffmpeg-static/ffmpeg node tools/render-video.mjs
```

Kalau mesinnya nggak bisa nembus fonts.googleapis.com, kedua script terima
`FONT_CSS=path/ke/fonts.css` berisi `@font-face` yang udah di-inline.

---

## Jalanin situsnya

Nggak ada build step, nggak ada dependency:

```bash
npx serve .        # atau buka index.html langsung
```

**Versi satu file** (gambar di-inline jadi data URI, jalan tanpa internet sama sekali):

```bash
node tools/build-standalone.mjs      # -> dist/hesitate.html, ~2,4 MB
```

Berguna buat preview, buat dikirim ke orang, atau buat host yang cuma nerima satu
file. `dist/` sengaja di-gitignore — dia hasil generate, bukan sumber.

---

## Yang harus diisi sebelum deploy

Satu blok `CONFIG` di paling bawah `index.html`. Cuma itu yang perlu disentuh:

```js
var CONFIG = {
  handle:   'hesitatehood',   // sudah diisi
  ca:       '',   // contract address setelah deploy
  swap:     '',   // link swap resmi
  explorer: '', chart: '',
  verifyTx: '', renounceTx: '', burnTx: ''
};
```

Halamannya buka-sendiri dari nilai di atas — isi `ca`, dan kotak "Contract: not
deployed yet" berubah jadi alamat + tombol copy + tombol swap. Isi `verifyTx` dkk,
baris Receipts berubah jadi link explorer. Nggak ada HTML yang perlu diedit.

> **Daftarin `@hesitatehood` sebelum situsnya live.** Situs dan semua caption
> sekarang nunjuk ke handle itu; kalau belum lu pegang, orang lain bisa daftar dan
> nerima traffic-nya. Cara ganti kalau ternyata keambil ada di `social/BIO.md`.

---

## Yang bikin situsnya jalan

Tombol BUY-nya kabur tiap kursor mendekat. Tujuh kali kabur, dia nyerah dan baru
bisa diklik — yang nampilin pesan jujur: emang belum ada apa-apa buat dibeli.
Ekspresi di hero ikut berubah seiring lu ngejar (`idle` → `hover` → `missed` → `cope`).

Sudah ditangani:
- **Touch** — tombolnya geser dari bawah jari sebelum tap-nya kena
- **Keyboard** — Enter/Space langsung ke payoff, nggak ikut main kejar-kejaran
- **`prefers-reduced-motion`** — nggak ada gerakan, payoff tetap kebuka
- **Counter global mati** — pill-nya nampilin `—`, nggak ada yang rusak

Counter global numpang layanan publik yang sama kayak situs BUYBUTTON
(`abacus.jasoncameron.dev`), key `hesitatehood/flinches`.

---

## Catatan riwayat

Commit `6f4c3c9` isinya maskot SVG bikinan gue — karakter beda (hidung panjang,
hoodie hijau) yang gue gambar sebelum art lu ada. Art lu ngalahin itu di semua hal
yang penting, jadi SVG-nya dibuang dari path aktif. Masih ada di git history kalau
sewaktu-waktu perlu dilihat lagi.

---

## Yang belum dikerjain

- Domain situsnya belum ada. `[URL situs]` di `social/POSTS.md` dan field
  **Website** di profil masih nunggu itu.
- Empat temuan teknis di `buybotton-site/index.html` — og.jpg nggak kepakai,
  rasio OG salah, hotlink raw.githubusercontent, `og:image:width` nggak ada.
  Detail di `brand/audit/AUDIT.md`. Di luar scope, jadi gue tinggalin.
- `brand/audit/buybutton-redraw.svg` cuma demo. Nyemplungin ke situs BUYBUTTON
  berarti ganti palet halaman sekalian dan nulis ulang efek panasnya — baca
  AUDIT.md dulu.
