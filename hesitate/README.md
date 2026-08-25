# HESITATE

Dia lihat peluangnya. Dia mikir. Dia nggak klik.

Folder ini isinya proyek HESITATE lengkap — maskot, standar visual, dan website —
dan dibikin nggak nyentuh apapun punya BUYBUTTON di root repo.

```
hesitate/
├── index.html              website, satu file, tanpa build step
├── og.html                 sumber kartu OG. edit di sini, jangan edit PNG-nya
├── og.png                  1200×630, digenerate dari og.html
├── mascot/
│   ├── build.mjs           SATU-SATUNYA sumber kebenaran karakternya
│   ├── hesitate.svg        PFP utama
│   ├── hesitate-head.svg   crop rapat, buat favicon / avatar kecil
│   ├── hesitate-flat.svg   tanpa filter, buat sticker / print / sablon
│   ├── hesitate-almost.svg · -missed.svg · -shut.svg    set ekspresi meme
│   └── png/                versi raster 1024px (X nggak nerima SVG buat PFP)
├── brand/
│   ├── BRAND.md            standar visual. checklist buat NOLAK gambar.
│   ├── PROMPTS.md          prompt pack Gemini, plus kenapa prompt lama nggak konsisten
│   ├── tokens.css          token warna & tipografi
│   └── audit/
│       ├── AUDIT.md        temuan di buy.png dan logo.png
│       └── buybutton-redraw.svg   BUYBUTTON digambar ulang, gaya yang sama
└── tools/
    ├── render-og.mjs       og.html → og.png
    └── render-mascots.mjs  mascot/*.svg → mascot/png/*.png
```

---

## Cara pakai

**Ubah karakternya.** Edit `mascot/build.mjs`, terus:
```bash
cd mascot && node build.mjs
```
Jangan pernah edit file `.svg`-nya langsung — semuanya bakal ketimpa.
Bentuk badan dipisah dari ekspresi, jadi nambah ekspresi baru = nambah satu entry
di object `EXPR`, dan otomatis dapet badan + hoodie + tangan yang persis sama.

**Regenerate raster.** Butuh Playwright:
```bash
node tools/render-mascots.mjs   # PNG 1024px buat PFP dan referensi image model
node tools/render-og.mjs        # kartu OG
```

**Jalanin site-nya.** Nggak ada build step, nggak ada dependency:
```bash
npx serve .    # atau buka index.html langsung
```

---

## Yang harus diisi sebelum deploy

Ada satu blok `CONFIG` di paling bawah `index.html`. Itu satu-satunya yang perlu disentuh:

```js
var CONFIG = {
  handle:   '',   // handle X, tanpa @. kosong = halaman nulis "announced before launch"
  ca:       '',   // contract address setelah deploy
  swap:     '',   // link swap resmi
  explorer: '', chart: '',
  verifyTx: '', renounceTx: '', burnTx: ''
};
```

Halaman ini buka-sendiri berdasarkan nilai di atas — isi `ca`, dan kotak
"Contract: not deployed yet" berubah jadi alamat + tombol copy + tombol swap.
Isi `verifyTx` dkk, dan baris Receipts berubah jadi link explorer.
Nggak ada HTML yang perlu diedit.

> **`handle` masih kosong.** Gue sengaja nggak nebak akun X, karena nge-link ke
> handle yang belum lu punya itu resiko impersonation. Isi dulu sebelum live.

---

## Yang bikin site ini jalan

Tombol BUY-nya kabur tiap kali kursor mendekat. Tujuh kali kabur, dia nyerah, dan
baru bisa diklik — yang nampilin pesan jujur: emang belum ada apa-apa buat dibeli.
Ekspresi maskot di hero ikut berubah seiring lu ngejar (`about to` → `almost` →
`missed it` → `not looking`).

Sudah ditangani:
- **Touch** — tombolnya geser dari bawah jari sebelum tap-nya kena
- **Keyboard** — Enter/Space langsung ke payoff, nggak ikut main kejar-kejaran
- **`prefers-reduced-motion`** — nggak ada gerakan sama sekali, payoff tetap kebuka
- **Counter global mati** — pill-nya nampilin `—`, nggak ada yang rusak

Counter global numpang layanan publik yang sama kayak site BUYBUTTON
(`abacus.jasoncameron.dev`), key-nya `hesitatecoin/flinches`.

---

## Yang belum dikerjain

- `handle` di CONFIG masih kosong (lihat di atas)
- Empat temuan teknis di `buybotton-site/index.html` — og.jpg nggak kepakai,
  rasio OG salah, hotlink raw.githubusercontent, og:image:width nggak ada.
  Detail lengkapnya di `brand/audit/AUDIT.md`. Di luar scope, jadi gue tinggalin.
- `buybutton-redraw.svg` cuma demo. Nyemplungin ke site BUYBUTTON berarti ganti
  palet halaman sekalian dan nulis ulang efek panasnya — baca AUDIT.md dulu.
