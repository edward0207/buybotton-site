# Profil X

**Handle: `@hesitatehood`** — udah diisi di `index.html` (`CONFIG.handle`) dan di
semua caption di `POSTS.md`.

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

"here" di baris terakhir sengaja, bukan `@hesitatehood` — orang yang baca bio itu
udah berdiri di profilnya. Nyebut handle sendiri di bio sendiri kelihatan kayak
bot. Di **caption post** kebalikannya: di situ handle-nya ditulis lengkap, karena
post beredar sebagai screenshot yang kehilangan konteks.

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

## Handle — sudah dipilih

`@hesitatehood`.

Dua alasan. Satu, `-hood` udah jadi pola di keluarga token lu (`slowmohood`), jadi
orang yang follow satu bakal ngenalin yang lain. Dua, dia nyebut Robinhood tanpa
ngaku-ngaku afiliasi — dan itu persis posisi yang lu mau.

Kandidat lain yang dipertimbangkan: `hesitate` (hampir pasti nggak bebas),
`hesitatecoin`, `hesitateonrh`, `sohesitate`.

**Yang perlu lu lakuin sekarang:**

1. Daftarin `@hesitatehood` sebelum orang lain — semua caption dan situsnya
   sekarang nunjuk ke situ.
2. Kalau ternyata **udah keambil**, jangan diem-diem pakai yang lain: ganti di satu
   tempat aja, `CONFIG.handle` di `index.html`, terus cari-ganti `hesitatehood`
   di `social/POSTS.md`. Selain itu nggak ada yang perlu disentuh.

> Counter global di situs juga ikut pindah namespace ke `hesitatehood/flinches`
> biar semua identifier publik seragam. Angkanya masih nol, jadi nggak ada yang
> hilang.
