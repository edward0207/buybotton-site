# Prompt pack — HESITATE

---

## 1. Kenapa prompt yang lama nggak akan pernah konsisten

Prompt lu yang sekarang bagus sebagai **brief buat manusia**, tapi jelek sebagai
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
Model milih acak tiap generate. Generate #1 dapat hidung, #2 dapat telinga, #3 dapat
rambut. **Karakternya nggak akan pernah jadi karakter yang sama.** Ini cacat paling
fatal di prompt lama — bukan soal gaya, tapi soal identitas.

Fix: hook-nya dikunci di prompt, bukan ditawarin. Sekarang udah dikunci: **hidung panjang bengkok.**

**b. 24 baris negative bikin positive-nya encer.**
`NO 3D` … `NO NFT-style` — dua puluh empat larangan. Model punya budget atensi;
tiap larangan makan jatah dari deskripsi karakternya. Sepuluh negative yang tajam
lebih kuat dari dua puluh empat yang overlap (`NO Pixar`, `NO Disney`, `NO anime`,
`NO 3D render`, `NO photorealism` itu praktis melarang hal yang sama).

**c. Ada instruksi yang saling tabrak.**
`NO gradients` + `NO dramatic shadows` + `minimal shading` ketemu
`very subtle paper texture` + `subtle print/ink imperfections`. Buat model,
"tekstur halus" dan "nol gradient" itu tarik-tarikan. Hasilnya di tengah:
flat tapi agak kotor, atau bertekstur tapi mulai kelihatan render.

**d. ~900 kata.**
Makin panjang instruksinya, makin model ngambil rata-rata daripada nurut.
Bagian paling penting (hidung, mata nggak simetris, hoodie hijau) ketimbun
di antara paragraf tentang filosofi meme.

**e. Referensi gambar ditempel tapi disuruh "jangan ditiru".**
Model condong ke gambar yang lu tempel. Nyuruh dia ambil "feeling"-nya doang itu
lotre. Referensi gaya itu kerjaan brief, bukan kerjaan prompt.

---

## 2. Perubahan cara kerja yang paling penting

**Karakternya sekarang udah ada.** Dia ada di `mascot/hesitate.svg` — vector, bisa
diedit, bisa dikecilin, konsisten selamanya.

Artinya tugas image model berubah total:

| Dulu | Sekarang |
|---|---|
| "Bikinin gue karakter" | "Gambar **karakter ini** lagi ngapain" |
| Identitas diundi tiap generate | Identitas dikunci, cuma situasinya yang berubah |
| Text-to-image | **Image-to-image / character reference** |

Selalu **lampirin `mascot/png/hesitate.png`** sebagai referensi karakter, terus
kasih instruksi pendek soal situasinya. Jangan pernah lagi mendeskripsikan mukanya
dari nol — muka itu udah selesai.

PNG referensinya digenerate dari SVG:
```bash
node tools/render-mascots.mjs
```

---

## 3. Prompt utama (kalau tetap perlu generate dari nol)

Ini versi yang udah dikunci hook-nya. 190 kata, bukan 900.

```
Draw an original character in a crude hand-drawn internet-meme style.

THE CHARACTER
A tired, ordinary-looking guy in an oversized muted-green hoodie.
His defining feature, and the only thing that matters: an unusually LONG nose that
bends to one side and ends in a soft rounded lump. It is far too long for his face.
His two eyes deliberately do not match — the left one larger and lower, the right one
smaller and higher, both half-closed under heavy lids, with faint bags underneath.
Left eyebrow flat and low; right eyebrow raised and arched. Small off-centre mouth.
One hand near his cheek with the index finger half-raised, thumb tucked, the other
fingers folded — the gesture of someone about to say "wait" and then not saying it.
He looks uncertain, slightly stupid, and completely harmless.

THE DRAWING
Rough black ink outlines with visibly shaky, uneven line weight. Flat colour only.
Warm cream background. Five colours total: cream, dark charcoal ink, muted sage green,
one darker green, warm skin. Faint paper grain. Colour blocks sit slightly offset from
the outlines, like cheap misregistered printing. Front-facing bust, square 1:1,
centred, strong silhouette, empty background.

Avoid: 3D, gloss, gradients, realistic rendering, symmetry, anime, text, logos.
```

---

## 4. Prompt turunan (pakai referensi — ini yang dipakai sehari-hari)

Selalu lampirin `mascot/png/hesitate.png`, terus salah satu dari ini:

**Ganti ekspresi**
```
Same character, same drawing style, same colours, same line quality.
Change only the expression to: [eyes wide open, small round mouth, one bead of sweat
on the cheek]. Keep the long bent nose, the mismatched eyes, and the green hoodie
exactly as they are. Flat colour, rough ink lines, cream background, square 1:1.
```

**Ganti pose / situasi**
```
Same character, same drawing style, same colours, same line quality.
New scene: [he is sitting on the edge of a bed at 3am, holding a phone,
lit by nothing in particular]. Keep his face, nose, and hoodie identical.
Simple flat background in one cream or muted tone. No detailed environment,
no furniture beyond what the joke needs. Rough ink lines, flat colour.
```

**Meme panel**
```
Same character, same drawing style. Two panels side by side, same size.
Left panel: [he reaches toward something off-frame].
Right panel: [same pose, hand withdrawn, eyes shut].
Flat colour, rough ink outlines, cream background, no text — I will add text myself.
```

**Sticker / emote**
```
Same character, cropped to head and shoulders only, filling the frame.
Expression: [___]. Flat colour, thick rough ink outline, cream background,
square 1:1, must stay readable at 64 pixels.
```

> Teks selalu ditambahin belakangan, jangan minta model nulis. Model nggak bisa nulis,
> dan huruf yang salah bikin gambar bagus jadi kelihatan hasil AI dalam sedetik.

---

## 5. Negative list

Sepuluh, bukan dua puluh empat. Tempel apa adanya:

```
Avoid: 3D render, glossy or metallic surfaces, gradients, cinematic lighting,
photorealistic skin or hair, symmetrical face, polished vector or logo look,
anime or Pixar styling, detailed background, any text or lettering.
```

Yang **dibuang** dari list lama dan kenapa:
- `NO robot`, `NO holograms`, `NO neon cyberpunk`, `NO luxury fashion` — nggak pernah
  kejadian di prompt ini, cuma makan atensi.
- `NO corporate mascot`, `NO startup illustration`, `NO NFT-style`, `NO generic AI
  crypto mascot` — ini kategori yang cuma manusia yang ngerti. Model nggak punya
  konsepnya, jadi nggak ngefek.
- `NO perfect geometric shapes` — udah ditangani sama "visibly shaky, uneven line weight".

---

## 6. Catatan praktis

- **Generate 4, buang 3.** Yang lolos itu yang lolos tes 64px di `BRAND.md`, bukan yang paling detail.
- **Hidungnya patokan.** Kalau di hasil generate hidungnya jadi normal, buang — nggak usah dibenerin.
- **Jangan minta background.** Background cream polos itu bagian dari identitas. Scene yang rame bikin karakternya hilang.
- **Kalau butuh konsistensi mutlak** (PFP, favicon, header, OG) — jangan pakai model sama sekali. Pakai SVG-nya. SVG itu deterministik; model nggak.
- **Model buat eksplorasi, SVG buat produksi.** Kalau ada hasil generate yang bagus banget, gambar ulang jadi SVG di `build.mjs`, jangan dipakai langsung sebagai aset resmi.
