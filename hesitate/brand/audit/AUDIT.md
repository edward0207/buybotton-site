# Audit aset lama

Diukur pakai checklist di `../BRAND.md`. Ini bukan soal selera — tiap temuan
di bawah nunjuk ke baris checklist yang spesifik.

---

## `buy.png` — maskot BUYBUTTON

**720×720, 357 KB.** Ini yang paling jauh dari standar barunya lu.

Dari 12 baris checklist tolak, aset ini kena **7**:

| Checklist | Kondisi |
|---|---|
| Gradient / gloss / specular | Kena. Seluruh badannya gradient, ada highlight specular di kubah atas, ada rim light |
| 3D render | Kena. Ini render 3D, bukan ilustrasi |
| Bayangan sinematik | Kena. Ada contact shadow lembut + ambient occlusion di bawah |
| Mata simetris | Kena. Dua matanya identik, dan pakai iris + gradient kelopak yang realistis |
| Garis sempurna | Kena. Nggak ada garis sama sekali — semua bentuk didefinisikan lewat shading |
| Kelihatan keren / menang | Kena. Alis miring + senyum miring = ekspresi "sly", bukan ekspresi bodoh |
| Palet > 6 warna | Kena telak. Ratusan warna karena gradient |

Yang bikin ironis: elemen naratifnya **bener semua** — retak, lakban, kabel putus.
Ceritanya bagus. Eksekusinya yang salah medium. Ini persis definisi
*"AI trying to make meme art"* yang lu tolak sendiri.

**Satu hal yang perlu lu tahu sebelum ganti:** `index.html` bikin efek panas pakai
`filter: hue-rotate(calc(var(--heat) * -128deg)) saturate(...)` di atas `buy.png`.
Trik itu cuma jalan karena aset-nya render 3D dengan rentang tonal lebar. Kalau
diganti jadi gambar flat 2 warna, hue-rotate bakal kelihatan rusak. Efek panasnya
perlu ditulis ulang — misalnya swap fill hijau ke merah lewat CSS variable di SVG,
yang justru lebih bersih.

---

## `logo.png` — maskot SLOWMO

**512×512, 336 KB.** Ini kasusnya beda, dan lebih menarik.

Dari sisi *rasa*, ini **udah dekat banget** sama standar barunya lu: buatan tangan,
nggak sempurna, hangat, hijau muted, palet sempit, ekspresinya ngantuk dan bodoh
dengan cara yang bikin sayang. Kalau lu ngasih gue satu aset dari repo lama dan
nanya mana yang boleh tetap, gue jawab yang ini.

Masalahnya bukan kualitas, tapi **medium**:

- Ini **foto objek kerajinan** (boneka wool felting), bukan gambar.
- Aset foto nggak bisa digambar ulang komunitas. Meme itu nyebar lewat orang yang
  nyontek jelek pakai pulpen — dan lu nggak bisa nyontek foto.
- Nggak bisa dikasih ekspresi baru tanpa bikin ulang bonekanya secara fisik.
- Nggak bisa di-recolor, di-crop ulang, atau di-scale tanpa kehilangan kualitas.

**Rekomendasi:** pertahankan sebagai *hero image* SLOWMO — dia mahal dan otentik.
Tapi bikin versi gambar-nya (SVG, gaya yang sama kayak HESITATE) buat PFP, favicon,
sticker, dan bahan meme. Foto buat halaman, gambar buat komunitas.

---

## Masalah yang lebih besar: tiga proyek, tiga bahasa visual

Ini temuan yang paling penting, dan nggak kelihatan kalau ngelihat aset satu-satu.

| | SLOWMO | BUYBUTTON | HESITATE (baru) |
|---|---|---|---|
| Medium | foto boneka wool | render 3D | ilustrasi tinta |
| Background | abu-abu studio | `#1e2129` gelap | cream `#F1E7D3` |
| Hijau | `#a3b89e` sage | `#4ade60` neon | `#5E9455` muted |
| Font | Fredoka + Nunito + Caveat | Archivo Black + IBM Plex Mono | Bricolage + Work Sans + Caveat |
| Rasa | hangat, handmade | gelap, arcade, sinis | hangat, handmade |

Tiga proyek ini nggak akan pernah kebaca sebagai satu keluarga. Padahal justru
"keluarga" itu yang bikin orang mikir *"oh, ini yang Robinhood Chain itu"* —
poin nomor 4 di recap lu sendiri.

BUYBUTTON yang paling jauh sendirian: dark mode + hijau neon `#4ade60` + font
mono itu bahasa visual yang beda total dari dua yang lain.

**Rekomendasi:** pilih satu medium buat seluruh keluarga. Berdasarkan recap lu,
mediumnya harusnya **ilustrasi tinta hand-drawn di atas cream**. SLOWMO tinggal
digambar-ulangkan; BUYBUTTON perlu ganti aset *dan* ganti palet halaman.

---

## Bukti kalau ini sistem, bukan gaya sekali pakai

`buybutton-redraw.svg` di folder ini adalah BUYBUTTON, digambar ulang pakai
**palet, wobble filter, dan bobot garis yang persis sama** dengan maskot HESITATE.
Nggak ada satupun path yang dipakai bareng — cuma sistemnya yang sama.

Ceritanya dipertahankan semua: retak, lakban, kabel yang dia cabut sendiri, dan
ekspresi yang sengaja dibikin **kebalikan** HESITATE — alis dua-duanya turun ke
dalam, bukan satu naik satu turun. Karakter yang satu nekan tombolnya, yang satu
nggak pernah.

Ini **demo, bukan pengganti langsung.** Gue sengaja nggak nyentuh
`buybotton-site/index.html`, karena ganti aset di situ berarti ganti palet halaman
sekalian dan nulis ulang efek panasnya — itu keputusan lu, bukan keputusan gue.

Kalau mau dicoba, satu baris:
```html
<img src="hesitate/brand/audit/buybutton-redraw.svg" alt="...">
```
tapi baca dulu catatan hue-rotate di atas.

---

## Temuan teknis (nggak ada hubungannya sama gaya, tapi sayang kalau kelewat)

**1. `buybotton-site/og.jpg` nggak kepakai.**
File-nya ada di repo, 900×900, tapi `index.html` nunjuk `og:image` ke
`raw.githubusercontent.com/.../buy.png`. Jadi og.jpg cuma numpang.

**2. OG image BUYBUTTON rasionya salah.**
`twitter:card` diset `summary_large_image`, yang mau rasio **1.91:1**.
Yang dikasih `buy.png` — 720×720, kotak. Di timeline bakal kepotong atas-bawah.
`slowmohood` udah bener (1200×630). HESITATE ikut yang bener.

**3. Hotlink ke `raw.githubusercontent.com`.**
Hero image dan favicon BUYBUTTON diambil dari raw.githubusercontent. Itu bukan CDN
produksi — kena rate limit, nggak ada cache header yang bener, dan langsung mati
kalau repo-nya di-rename atau dijadiin private. Padahal file-nya ada di repo yang
sama, jadi `src="buy.png"` cukup.

**4. Nggak ada `og:image:width` / `height` di BUYBUTTON.**
Bikin first render kartunya lebih lambat di beberapa client.

Empat-empatnya perbaikan kecil di `buybotton-site/index.html`. Gue nggak kerjain
karena di luar scope yang lu minta — bilang aja kalau mau.
