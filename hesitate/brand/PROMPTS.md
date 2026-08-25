# Prompt pack — HESITATE

> **Karakternya udah jadi.** Enam gambar di `art/` itu kanon. Dokumen ini soal
> gimana cara nambah gambar baru **tanpa** karakternya berubah pelan-pelan tiap
> kali di-generate.

---

## 1. Kenapa prompt yang lama nggak akan pernah konsisten

Prompt lu yang dulu bagus sebagai **brief buat manusia**, tapi jelek sebagai
**instruksi buat model**. Ini masalah konkretnya:

**a. Hook-nya diserahin ke model.**
```
Give him ONE memorable physical characteristic.
For example:
- an unusually long or slightly crooked nose
- noticeably uneven sleepy eyes
- messy distinctive hair
- slightly oversized ears
...
Choose ONE strong characteristic
```
Model milih acak tiap generate. Satu dapet hidung, satu dapet telinga, satu dapet
rambut. **Karakternya nggak akan pernah jadi karakter yang sama.**

Yang lu bikin sendiri malah nyelesain ini: lu ambil **dua** dari daftar itu
(mata nggak sinkron + rambut khas) dan **konsisten** di enam gambar. Itu sebabnya
enam gambar itu kebaca sebagai satu orang. Sekarang tinggal dijaga.

**b. 24 baris negative bikin positive-nya encer.**
Model punya budget atensi; tiap larangan makan jatah dari deskripsi karakternya.
Sepuluh negative yang tajam lebih kuat dari 24 yang overlap — `NO Pixar`,
`NO Disney`, `NO anime`, `NO 3D render`, `NO photorealism` itu praktis melarang
hal yang sama.

**c. Ada instruksi yang saling tabrak.**
`NO gradients` + `minimal shading` ketemu `very subtle paper texture`.
Buat model, "tekstur halus" dan "nol gradient" itu tarik-tarikan.

**d. ~900 kata.** Makin panjang instruksinya, makin model ngambil rata-rata
daripada nurut. Bagian penting ketimbun di antara paragraf soal filosofi meme.

**e. Referensi ditempel tapi disuruh "jangan ditiru".** Model condong ke gambar
yang lu tempel. Nyuruh dia ambil "feeling"-nya doang itu lotre.

---

## 2. Cara kerja yang bener sekarang

| Dulu | Sekarang |
|---|---|
| "Bikinin gue karakter" | "Gambar **karakter ini** lagi ngapain" |
| Identitas diundi tiap generate | Identitas dikunci, cuma situasinya yang berubah |
| Text-to-image | **Image-to-image / character reference** |

**Selalu lampirin `art/idle.jpg`** sebagai referensi karakter, terus kasih
instruksi pendek soal situasinya. Jangan pernah lagi mendeskripsikan mukanya dari
nol — mukanya udah selesai.

Kalau posenya butuh tangan, lampirin **`art/hover.jpg` juga** — itu satu-satunya
gambar yang nunjukin gimana tangannya digambar.

---

## 3. Prompt turunan (ini yang dipakai sehari-hari)

**Ganti ekspresi**
```
Same character, same drawing style, same colours, same brush quality.
Change only the expression to: [___].
Keep everything else identical: the spiky green hair, the grey hoodie with the
hood up, the long face, and — most importantly — the two mismatched eyes, one
wide and round, one half-closed under a heavy lid. Never draw them the same.
Flat colour, black brush outlines with uneven weight, warm cream background,
square 1:1, no text.
```

**Ganti pose / situasi**
```
Same character, same drawing style, same colours, same brush quality.
New scene: [___].
Keep his face, hair and hoodie identical, including the mismatched eyes.
Simple flat background in one cream tone. Keep props to the minimum the joke
needs — one object, not a room. Black brush outlines, flat colour, no text.
```

**Meme panel**
```
Same character, same drawing style. Two panels side by side, equal size,
separated by a thick black line.
Left panel: [___].  Right panel: [___].
Flat colour, black brush outlines, cream background, no text — I add the text.
```

**Sticker / emote**
```
Same character, cropped to head and shoulders, filling the frame.
Expression: [___]. Thick black outline, flat colour, cream background,
square 1:1, must stay readable at 64 pixels.
```

> Teks selalu ditambahin belakangan, jangan minta model nulis. Model nggak bisa
> nulis, dan satu huruf yang salah bikin gambar bagus kelihatan hasil AI dalam
> sedetik. Caption meme ditempel pakai `social/cards.html`.

---

## 4. Prompt dari nol (kalau sewaktu-waktu perlu)

Hook-nya dikunci. 180 kata, bukan 900.

```
Draw an original character in a crude hand-drawn internet-comic style.

THE CHARACTER
A tired ordinary guy in an oversized warm-grey hoodie, hood always up.
Two things define him and must never change:
1. Spiky, jagged bright-green hair falling over his forehead and sticking out
   past the hood.
2. Two eyes that do not match — one wide, round and fully open, the other
   half-closed under a heavy droopy lid. Never symmetrical.
Long narrow face, small chin, thin line of a nose, small flat mouth, thin green
eyebrows that sit at different heights. He looks uncertain and mildly stupid in
a way you feel sorry for. Not handsome, not cool, not winning at anything.

THE DRAWING
Black brush outlines with clearly uneven thickness — thick in places, thin in
others, never a constant-width line. Flat colour fills, no shading beyond one
flat grey. Warm cream background, faint paper speckle. Four colours only: cream,
black, warm grey, bright green. Square 1:1, character centred, empty background.

Avoid: 3D, gloss, gradients, realistic rendering, symmetrical eyes, even line
weight, anime styling, detailed backgrounds, any text or lettering.
```

---

## 5. Negative list

Sepuluh, bukan dua puluh empat:

```
Avoid: 3D render, glossy or metallic surfaces, gradients, cinematic lighting,
photorealistic skin or hair, symmetrical eyes, even constant-width outlines,
anime or Pixar styling, detailed background, any text or lettering.
```

Yang **dibuang** dari list lama dan kenapa:
- `NO robot`, `NO holograms`, `NO neon cyberpunk`, `NO luxury fashion` — nggak
  pernah kejadian di prompt ini, cuma makan atensi.
- `NO corporate mascot`, `NO NFT-style`, `NO generic AI crypto mascot` — ini
  kategori yang cuma manusia yang ngerti. Model nggak punya konsepnya.
- `NO perfect geometric shapes` — udah ditangani sama "uneven line weight".

Dan satu yang **ditambah**, karena ini hook-nya: `symmetrical eyes`.

---

## 6. Catatan praktis

- **Generate 4, buang 3.** Yang lolos itu yang lolos tes 64px di `BRAND.md`.
- **Matanya patokan.** Kalau di hasil generate dua matanya jadi sama, buang —
  nggak usah dibenerin. Itu tanda model-nya udah balik ke wajah default-nya.
- **Rambutnya patokan kedua.** Kalau hijaunya pindah ke hoodie, buang.
- **Jangan minta background.** Background krem polos itu bagian dari identitas.
- **Aset resmi jangan hasil undian.** PFP, banner, favicon, OG — semuanya
  dirakit dari `art/` lewat `social/cards.html`, bukan digenerate ulang. Model
  buat nambah situasi baru; file yang udah ada buat produksi.
- **Setiap gambar baru yang lolos masuk ke `art/`** dengan nama mood-nya, dan
  ditambahin ke tabel di `BRAND.md`. Kalau nggak dicatat, enam bulan lagi
  nggak ada yang tahu mana yang kanon.
