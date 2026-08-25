# HESITATE — standar visual

Dokumen ini bukan moodboard. Ini aturan yang bisa dipakai buat nolak gambar.
Kalau sebuah aset nggak lolos checklist di bawah, aset itu nggak dipakai — walaupun bagus.

---

## 1. Lima prinsip

**Satu hook, bukan lima aksesoris.**
Anteater kebaca dari moncongnya. Sloth dari mukanya. Hydrant dari bentuknya.
HESITATE kebaca dari **hidungnya** — panjang, bengkok, ujungnya nggemblok.
Sisanya boleh sederhana. Karakter yang butuh topi + kacamata + rantai + cangkir kopi
buat kelihatan menarik itu karakter yang hook-nya gagal.

**Imperfection itu fitur, bukan toleransi.**
Garis goyang, proporsi miring, dua mata yang nggak sama — itu yang bikin orang percaya
ada manusia di balik gambarnya. Vector yang presisi = "dibikin mesin". Kita bikin salah
dengan sengaja, konsisten, dan terkendali.

**Silhouette dulu, detail belakangan.**
Kalau dijadikan siluet hitam solid ukuran 64px dan udah nggak kebaca, gambarnya salah —
mau setajam apapun detailnya.

**Hijau itu aksen, bukan tema.**
Hoodie-nya hijau. Itu aja. Kalau seluruh halaman jadi hijau, hijaunya berhenti jadi tanda.
Yang bikin orang ngeh "oh, ini yang Robinhood Chain itu" adalah hijau yang **muncul di
tempat yang sama tiap kali**, bukan hijau yang banyak.

**Personality ngalahin polish.**
Target akhirnya bukan "ilustrasi maskot crypto yang indah". Targetnya:
*"siapa sih ini"* → lihat mukanya → *"...oh, dia lagi ragu."*

---

## 2. Character bible — HESITATE

| | |
|---|---|
| **Hook** | Hidung panjang, bengkok ke kanan, ujungnya bulat nggemblok. Ini satu-satunya hal yang nggak boleh diubah. |
| **Mata** | Dua-duanya beda. Kiri lebih besar dan lebih rendah, kanan lebih kecil dan lebih tinggi. Kelopak atas tebal, nutupin sedikit pupil. Ada kantong mata tipis. |
| **Alis** | Kiri turun dan datar (nyerah). Kanan naik dan melengkung (nanya). Asimetri ini = ekspresi ragu. |
| **Mulut** | Kecil, geser ke kiri, garisnya nggak lurus. Nggak pernah senyum lebar, nggak pernah teriak. |
| **Baju** | Hoodie kebesaran, hijau muted. Tali hoodie dua, panjangnya beda. |
| **Gesture** | Telunjuk setengah naik di samping pipi. Jempol nekuk di depan. Tiga jari sisanya lipat, nggak ikut campur. Artinya: "bentar dulu." |
| **Rambut** | Tiga jumput di dahi, arahnya beda-beda semua. |
| **Yang dilarang** | Ganteng, keren, berotot, kaya, futuristik, ngeselin, atau punya vibe menang. |

### Aturan turunan
- **Matanya nggak boleh sama.** Kalau dua matanya kembar, itu bukan dia lagi.
- **Ekspresinya understated.** Range emosinya cuma empat: *about to · almost · missed it · not looking*. Nggak ada marah, nggak ada teriak, nggak ada euforia.
- **Nggak ada teks di dalam karakter.** Tulisan hidup di luar gambar, bukan di dalamnya.

---

## 3. Palet

Enam warna. Kalau butuh yang ketujuh, desainnya yang salah.

| Token | Hex | Dipakai buat |
|---|---|---|
| `--paper` | `#F1E7D3` | background, selalu. **Jangan pernah putih.** |
| `--paper-2` | `#FAF3E4` | kartu, permukaan yang naik |
| `--paper-3` | `#E4D7BE` | track, divider, permukaan yang turun |
| `--ink` | `#23201B` | semua garis. **Bukan hitam murni** — hitam murni kelihatan dicetak mesin. |
| `--green` | `#5E9455` | tanda tangan kita. hoodie, tombol, aksen. |
| `--green-2` | `#6DA462` | satu tingkat lebih terang, buat bidang yang di depan |
| `--green-d` | `#47713F` | bayangan, border, state ditekan |
| `--green-x` | `#2F4F2A` | teks di atas hijau, link |
| `--skin` | `#EBD3B2` | kulit. satu-satunya warna lain di karakter. |

Robinhood green aslinya (`#00C805`) terlalu nyala dan terlalu mirip logo mereka.
`#5E9455` cukup jelas ngasih sinyal keluarga hijau, tapi kebaca sebagai cat, bukan neon.
**Jangan pernah pakai logo atau wordmark Robinhood.**

---

## 4. Linework

Nilainya di bawah ini dipakai di canvas 1000×1000. Skalain proporsional.

- Outline luar (siluet): **11**
- Bentuk besar (muka, kepalan): **9–10**
- Fitur (mata, hidung, mulut): **7–9**
- Detail kecil (kantong mata, lipatan): **4–6**
- `stroke-linecap` dan `stroke-linejoin` selalu `round`. Ujung siku = kelihatan vector.
- Ink pakai `opacity: .94`, biar tumpukan garis kebaca kayak tinta beneran.

### Tiga trik yang bikin ini nggak kelihatan hasil AI

1. **Dua wobble yang beda.** Fill dan ink dikasih `feTurbulence` + `feDisplacementMap`
   dengan seed dan scale yang berbeda. Hasilnya garis dan warna nggak pernah pas —
   persis kayak cetakan murah.
2. **Off-register.** Layer warna digeser `translate(-5, 4)` dari layer garis.
   Ini satu baris CSS yang efeknya lebih besar dari tekstur apapun.
3. **Sudut yang salah.** Border pakai radius yang beda di tiap sudut
   (`.wonky` di `tokens.css`). Kotak dengan empat sudut identik = dibikin komputer.

---

## 5. Komposisi

- **Format utama 1:1.** Semua aset utama harus lolos di crop lingkaran.
- Kepala dan dada kelihatan jelas. Karakter di tengah, sedikit lebih besar dari yang
  kelihatan nyaman — PFP selalu kelihatan lebih kecil dari yang lu kira.
- Background cream polos. Nggak ada environment, nggak ada properti, nggak ada UI.
- Nggak ada chart, nggak ada tombol BUY, nggak ada ticker, nggak ada simbol crypto
  **di dalam ilustrasi**. Itu semua tugasnya halaman, bukan tugasnya karakter.

---

## 6. Checklist tolak

Gambarnya gagal kalau ada salah satu dari ini:

- [ ] Ada gradient, gloss, specular, atau bayangan sinematik
- [ ] Kelihatan 3D render atau punya depth of field
- [ ] Kulit / bulu / rambut di-render realistis
- [ ] Dua matanya simetris
- [ ] Garisnya sempurna rata dari ujung ke ujung
- [ ] Background-nya putih
- [ ] Karakternya kelihatan ganteng, keren, atau menang
- [ ] Butuh lebih dari dua aksesoris buat kebaca
- [ ] Ada teks, ticker, atau logo di dalam ilustrasi
- [ ] Ada logo atau wordmark Robinhood
- [ ] Palet warnanya lebih dari enam
- [ ] Hilang bentuknya waktu dikecilin ke 64px

---

## 7. Tiga tes sebelum sebuah aset dipakai

**Tes 64px.** Kecilin ke 64px, crop lingkaran. Hidung, jari, dan siluet hoodie masih
kebaca? Kalau nggak, buang.

**Tes gambar ulang.** Kasih ke orang yang nggak bisa gambar, minta tiru pakai pulpen
dalam 30 detik. Kalau hasilnya masih kebaca sebagai dia, karakternya bener. Meme itu
menyebar lewat gambar ulang yang jelek, bukan lewat file aslinya.

**Tes orang asing.** Tunjukin ke orang yang belum pernah lihat. Kalau reaksinya
*"siapa sih ini"* terus *"oh, dia lagi ragu"* — berhasil. Kalau reaksinya
*"bagus banget nih gambar"* — gagal. Kita nggak lagi cari gambar bagus.
