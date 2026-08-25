# Profil X

## Aset

| Field | File | Ukuran |
|---|---|---|
| Profile picture | `social/pfp.png` | 1024×1024 |
| Header / banner | `banner.png` | 1500×500 |
| Favicon situs | `social/icon.png` | 180×180 |

Banner-nya sengaja **bagian kiri 260px dikosongin** — di desktop X naruh avatar di
situ dan nutupin apapun yang ada di bawahnya. Karakternya ditaruh di kanan supaya
nggak ketiban.

---

## Display name

```
HESITATE
```

Jangan pakai emoji atau `$HESITATE` di display name. Ticker di nama itu penanda
akun spam, dan kita butuh post pertama kebaca sebagai orang, bukan sebagai iklan.
Ticker-nya udah ada di bio dan di banner.

---

## Bio

Pilihan utama — 127 karakter, di bawah batas 160:

```
He saw it. He thought about it. He did not click.

$HESITATE on Robinhood Chain. No presale, no team wallet.
CA drops here first.
```

Kenapa dibentuk kayak gini: baris pertama joke-nya, baris kedua faktanya, baris
ketiga pertahanan anti-scam. Orang yang mampir dari post pertama butuh ketiganya
dalam dua detik.

**Alternatif kalau mau lebih pendek** (89 karakter):

```
The guy who was early and did nothing about it.

$HESITATE · Robinhood Chain · CA drops here first.
```

**Alternatif kalau mau lebih dingin** (104 karakter):

```
A meme token about the exact moment you decide not to.

$HESITATE on Robinhood Chain. CA drops here first.
```

---

## Field lain

| Field | Isi | Kenapa |
|---|---|---|
| **Location** | `about to` | Field ini biasanya kosong atau diisi serius. Diisi begini, dia jadi joke kecil yang cuma ketangkep orang yang beneran baca profil. Gratis, dan sangat sesuai karakter. |
| **Website** | URL situsnya | |
| **Birth date** | jangan diisi | X nampilinnya sebagai umur akun ke sebagian orang, dan akun baru bikin curiga |

---

## Pinned post

Pin **post pertama** (video-nya), bukan post pengumuman. Video itu yang
menjelaskan karakternya tanpa perlu orang baca apapun — dan pengunjung baru
hampir selalu nonton pinned post sebelum baca bio.

Ganti pinned-nya cuma satu kali: pas CA-nya keluar.

---

## Handle

Gue **nggak** isi handle-nya di kode dan nggak nge-link ke akun manapun, karena
nge-link ke handle yang belum lu pegang itu resiko impersonation — orang lain bisa
daftar handle itu dan nerima traffic dari situs lu.

Kandidat buat lu cek ketersediaannya, urut dari paling bagus:

1. `hesitate` — kalau bebas, ambil. Nggak akan bebas.
2. `hesitatecoin` — pola yang sama kayak `buybuttoncoin`, konsisten sama keluarga
3. `hesitatehood` — pola yang sama kayak `slowmohood`, paling nyambung ke Robinhood Chain
4. `hesitateonrh`
5. `sohesitate`

**Rekomendasi gue: `hesitatehood`.** Dua alasan. Satu, `-hood` udah jadi pola di
keluarga token lu (`slowmohood`), jadi orang yang follow satu bakal ngenalin yang
lain. Dua, dia nyebut Robinhood tanpa ngaku-ngaku afiliasi — dan itu persis posisi
yang lu mau.

Begitu udah dapet, isi di dua tempat:

```js
// hesitate/index.html — blok CONFIG di paling bawah
handle: 'hesitatehood',
```

dan di `social/POSTS.md` buat referensi caption.
