# HESITATE — standar visual

Dokumen ini bukan moodboard. Ini aturan yang bisa dipakai buat **nolak** gambar.
Kalau sebuah aset nggak lolos checklist di bawah, aset itu nggak dipakai — walaupun bagus.

> **Sumber kebenaran ada di `art/`, bukan di dokumen ini.**
> Enam gambar di folder itu yang menentukan karakternya. Kalau dokumen ini bentrok
> sama gambarnya, gambarnya yang menang dan dokumen ini yang diperbaiki.

---

## 1. Lima prinsip

**Satu hook, bukan lima aksesoris.**
Anteater kebaca dari moncongnya. Sloth dari mukanya. HESITATE kebaca dari
**dua matanya yang nggak sinkron** — satu melek lebar, satu setengah merem —
plus **rambut hijau jabrik**. Itu aja. Karakter yang butuh topi + kacamata + rantai
buat kelihatan menarik itu karakter yang hook-nya gagal.

**Imperfection itu fitur, bukan toleransi.**
Garis kuas yang tebal-tipis, kepala yang agak kegedean, alis yang nggak sejajar.
Itu yang bikin orang percaya ada manusia di balik gambarnya.

**Silhouette dulu, detail belakangan.**
Kalau dijadikan siluet ukuran 64px dan udah nggak kebaca, gambarnya salah.
Rambut jabrik hijau itu yang nolongin di ukuran kecil — bentuknya tajam dan
warnanya satu-satunya yang nyala.

**Hijau itu aksen, bukan tema.**
Cuma rambutnya yang hijau. Hoodie-nya abu-abu, kertasnya krem, garisnya hitam.
Justru karena semua yang lain netral, hijaunya jadi tanda. Kalau nanti ada hoodie
hijau, tombol hijau, dan background hijau di satu gambar — hijaunya berhenti berarti.

**Personality ngalahin polish.**
Target akhirnya bukan "ilustrasi maskot crypto yang indah". Targetnya:
*"siapa sih ini"* → lihat mukanya → *"...oh, dia lagi ragu."*

---

## 2. Character bible

| | |
|---|---|
| **Hook** | Mata kiri dan kanan **nggak pernah sama**. Satu bulat melek lebar, satu setengah merem dengan kelopak berat. Ini yang paling nggak boleh diubah. |
| **Rambut** | Hijau `#5DBC64`, jabrik, ujung-ujungnya runcing dan nggak beraturan. Nutupin dahi, keluar dari hoodie. |
| **Hoodie** | Abu-abu hangat `#9C9482`, kebesaran, hood-nya selalu kepakai. Ada dua tali. |
| **Muka** | Panjang, dagu sempit, hidung garis tipis. Nggak ada mulut lebar — mulutnya kecil dan datar. |
| **Alis** | Tipis, hijau (ikut rambut), sering nggak sejajar. |
| **Garis** | Hitam, kuas, tebal-tipis nggak rata. Bukan garis vector. |
| **Yang dilarang** | Ganteng, keren, berotot, kaya, futuristik, atau punya vibe menang. |

### Enam mood yang udah ada

| File | Kapan dipakai |
|---|---|
| `art/idle.jpg` | default. PFP, hero, apapun yang nggak punya konteks khusus |
| `art/hover.jpg` | "hampir". Jarinya nunjuk tombol tapi nggak nyentuh — ini gambar paling penting kedua setelah idle |
| `art/waiting.jpg` | "riset dulu". Duduk depan monitor yang mati |
| `art/missed.jpg` | "telat". Close-up, mulut kebuka |
| `art/cope.jpg` | "gue tuh early kok". Kesel, gigi keliatan |
| `art/shadow.jpg` | bayangannya ngangkat kepalan, orangnya nggak. Ini gambar paling lucu di set — simpen buat momen yang tepat, jangan diobral |

### Aturan turunan
- **Matanya nggak boleh sama.** Kalau dua matanya kembar, itu bukan dia lagi.
- **Ekspresinya understated.** `cope.jpg` udah paling ekstrem. Jangan lebih dari itu.
- **Nggak ada teks di dalam ilustrasi.** Tulisan hidup di luar gambar. Caption meme boleh ditempel di atasnya, tapi bukan bagian dari gambarnya.

---

## 3. Palet

Diambil dari pixel gambarnya, bukan dikarang.

| Token | Hex | Dipakai buat |
|---|---|---|
| `--paper` | `#F8F0E0` | background, selalu. **Jangan pernah putih.** |
| `--paper-2` | `#FCF8ED` | kartu, permukaan yang naik |
| `--paper-3` | `#E9DFC9` | track, divider |
| `--ink` | `#14120F` | semua garis dan judul |
| `--grey` | `#9C9482` | hoodie, bayangan |
| `--green` | `#5DBC64` | **rambut. tanda tangan kita.** |
| `--green-d` | `#3F8E48` | hijau yang lebih gelap |
| `--green-x` | `#2C6B34` | teks hijau di atas krem |

Robinhood green aslinya (`#00C805`) terlalu nyala dan terlalu mirip logo mereka.
`#5DBC64` cukup jelas ngasih sinyal keluarga hijau tapi kebaca sebagai cat.
**Jangan pernah pakai logo atau wordmark Robinhood.**

> **Catatan koreksi:** versi pertama dokumen ini nulis "jangan pernah pakai hitam
> murni". Ternyata salah — garis di `art/` itu hitam beneran, dan tetap kebaca
> handmade karena kertasnya hangat dan kuasnya nggak rata. Yang bikin gambar
> kelihatan mesin itu garis yang **rata**, bukan garis yang hitam.

---

## 4. Tipografi

| Peran | Font | Kenapa |
|---|---|---|
| Judul | **Bricolage Grotesque** 800 | grotesque yang agak salah bentuknya. bukan font korporat. |
| Body | **Work Sans** 400/600 | netral, nggak ikut campur |
| Aksen | **Caveat** 600 | buat celetukan pendek doang. jangan buat paragraf. |

Judul selalu `letter-spacing` negatif (-.03 sampai -.05em) biar padat dan berat.

---

## 5. Checklist tolak

Gambarnya gagal kalau ada salah satu dari ini:

- [ ] Ada gradient, gloss, atau bayangan sinematik
- [ ] Kelihatan 3D render
- [ ] Kulit / rambut di-render realistis
- [ ] **Dua matanya sama**
- [ ] Rambutnya bukan hijau, atau hijaunya pindah ke tempat lain
- [ ] Hoodie-nya bukan abu-abu
- [ ] Garisnya rata sempurna dari ujung ke ujung
- [ ] Background-nya putih
- [ ] Karakternya kelihatan ganteng, keren, atau menang
- [ ] Ada teks, ticker, atau logo di dalam ilustrasi
- [ ] Ada logo atau wordmark Robinhood
- [ ] Hilang bentuknya waktu dikecilin ke 64px

---

## 6. Tiga tes sebelum sebuah aset dipakai

**Tes 64px.** Kecilin ke 64px. Rambut hijau jabrik dan siluet hoodie masih kebaca?
Kalau nggak, buang.

**Tes gambar ulang.** Kasih ke orang yang nggak bisa gambar, minta tiru pakai pulpen
dalam 30 detik. Kalau hasilnya masih kebaca sebagai dia, karakternya bener. Meme
menyebar lewat gambar ulang yang jelek, bukan lewat file aslinya.

**Tes orang asing.** Tunjukin ke orang yang belum pernah lihat. Kalau reaksinya
*"siapa sih ini"* terus *"oh, dia lagi ragu"* — berhasil. Kalau reaksinya
*"bagus banget nih gambar"* — gagal. Kita nggak lagi cari gambar bagus.
