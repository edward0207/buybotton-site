// HESITATE mascot generator.
//
// One source of truth for the character. Expressions and crops are variants of the
// same body, so a meme drawn next month is unmistakably the same guy as the PFP.
//
//   node build.mjs
//
// No dependencies. Writes every .svg in this folder.

import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = dirname(fileURLToPath(import.meta.url));

const PAL = {
  ink:    '#23201B',
  paper:  '#F1E7D3',
  skin:   '#EBD3B2',
  green:  '#5E9455',
  green2: '#6DA462',
  greenD: '#47713F',
};

/* ------------------------------------------------------------------ *
 * body: hood, face shape, hair, sleeve, hand. never changes.
 * ------------------------------------------------------------------ */

const HOOD_R = `M 556 130
    C 668 168, 764 250, 806 388
    C 838 506, 840 590, 824 656
    C 906 700, 960 792, 980 1006`;
const HOOD_L = `M 20 1006
    C 44 800, 100 704, 178 660
    C 160 592, 158 504, 190 386
    C 234 224, 338 132, 450 116
    C 496 108, 528 114, 556 130`;
const FACE = `M 496 244
    C 612 250, 674 328, 680 424
    C 686 514, 652 578, 592 610
    C 556 630, 466 636, 408 606
    C 354 578, 316 512, 322 420
    C 328 326, 384 240, 496 244 Z`;
const HOOD_RIM = `M 258 648
    C 236 552, 250 414, 296 322
    C 344 224, 424 178, 502 176
    C 584 174, 664 224, 710 326
    C 754 424, 762 562, 740 654`;
const LINING = `M 258 646
    C 236 552, 250 414, 296 322
    C 344 224, 424 178, 502 176
    C 584 174, 664 224, 710 326
    C 754 424, 762 560, 740 652
    C 726 588, 716 470, 676 386
    C 630 288, 566 250, 500 250
    C 432 250, 368 292, 324 388
    C 286 470, 274 586, 258 646 Z`;
const SLEEVE = `M 656 730
    C 670 706, 702 698, 740 704
    C 782 710, 812 730, 824 760
    C 842 804, 848 872, 844 1006`;
const FIST = `M 700 652
    C 690 620, 710 602, 740 600
    C 774 598, 800 620, 806 656
    C 814 692, 806 732, 792 752
    C 772 778, 712 780, 692 754
    C 678 736, 668 716, 670 700
    C 672 682, 686 662, 700 652 Z`;
const FINGER = `M 700 646
    C 688 596, 688 548, 700 524
    C 709 503, 732 506, 735 528
    C 740 562, 739 606, 737 650`;
// The hook. Too long, bent to one side, ends in a soft lump.
const NOSE = `M 466 340
    C 456 392, 466 438, 486 470
    C 502 496, 532 510, 554 498
    C 576 486, 574 460, 554 448
    C 528 432, 518 400, 516 350`;

const handFill = (hand) => hand === 'none' ? '' : `
  <path class="green2" d="${SLEEVE}
    L 606 1006
    C 600 894, 620 786, 656 730 Z"/>
  <path class="skin" d="${FIST}"/>
  <path class="skin" d="${FINGER} Z"/>`;

const handInk = (hand) => hand === 'none' ? '' : `
  <path class="ink" stroke-width="10" d="${SLEEVE}"/>
  <path class="ink" stroke-width="10" d="M 606 1006 C 600 894, 620 786, 656 730"/>
  <path class="ink" stroke-width="6" d="M 634 802 C 682 782, 762 786, 812 812"/>
  <path class="ink" stroke-width="9" d="${FIST}"/>
  <path class="ink" stroke-width="6" d="M 700 660 C 688 682, 688 714, 700 740"/>
  <path class="ink" stroke-width="5" d="M 744 690 C 766 682, 790 684, 803 694"/>
  <path class="ink" stroke-width="8" d="${FINGER}"/>
  <path class="ink" stroke-width="4.5" d="M 696 580 C 708 572, 724 572, 734 578"/>`;

/* ------------------------------------------------------------------ *
 * expressions. the only thing that changes between memes.
 * Rule: the two eyes must never match. That mismatch IS the character.
 * ------------------------------------------------------------------ */

const EXPR = {
  // "I'm about to click... but I'm not sure." The default. The whole token.
  hesitating: `
  <circle class="fillInk" cx="424" cy="388" r="12.5"/>
  <path class="ink" stroke-width="10" d="M 366 386 C 392 366, 436 364, 456 380"/>
  <path class="ink" stroke-width="6" d="M 368 388 C 392 410, 434 412, 456 382"/>
  <path class="ink" stroke-width="4.5" d="M 376 418 C 398 430, 428 430, 446 418"/>
  <circle class="fillInk" cx="606" cy="379" r="10"/>
  <path class="ink" stroke-width="9" d="M 564 374 C 584 358, 618 358, 634 372"/>
  <path class="ink" stroke-width="5.5" d="M 566 376 C 584 392, 616 394, 632 374"/>
  <path class="ink" stroke-width="4" d="M 570 400 C 588 410, 612 410, 626 400"/>
  <path class="ink" stroke-width="9" d="M 352 330 C 386 318, 424 316, 458 326"/>
  <path class="ink" stroke-width="8" d="M 552 292 C 578 268, 616 270, 644 292"/>
  <path class="ink" stroke-width="7" d="M 408 552 C 432 570, 462 570, 486 552"/>
  <path class="ink" stroke-width="5" d="M 408 552 C 402 558, 400 566, 403 572"/>`,

  // "wait. is that it going up?" Eyes open a little. Still no click.
  almost: `
  <circle class="fillInk" cx="426" cy="386" r="13"/>
  <path class="ink" stroke-width="10" d="M 364 380 C 390 352, 438 352, 458 376"/>
  <path class="ink" stroke-width="6" d="M 366 382 C 390 416, 436 418, 458 378"/>
  <path class="ink" stroke-width="4.5" d="M 376 424 C 398 436, 428 436, 446 424"/>
  <circle class="fillInk" cx="604" cy="378" r="11"/>
  <path class="ink" stroke-width="9" d="M 562 368 C 584 344, 620 344, 636 366"/>
  <path class="ink" stroke-width="5.5" d="M 564 370 C 584 398, 616 400, 634 368"/>
  <path class="ink" stroke-width="4" d="M 570 406 C 588 416, 612 416, 626 406"/>
  <path class="ink" stroke-width="9" d="M 352 312 C 386 296, 424 296, 458 308"/>
  <path class="ink" stroke-width="8" d="M 552 282 C 578 258, 616 260, 644 282"/>
  <ellipse class="fillInk" cx="452" cy="558" rx="21" ry="15"/>`,

  // "it left without me." One bead of sweat. That is the entire emotional range.
  missed: `
  <path class="ink" stroke-width="8" d="M 424 388 m -32 0 a 32 30 0 1 0 64 0 a 32 30 0 1 0 -64 0"/>
  <circle class="fillInk" cx="428" cy="392" r="11"/>
  <path class="ink" stroke-width="7" d="M 604 378 m -26 0 a 26 25 0 1 0 52 0 a 26 25 0 1 0 -52 0"/>
  <circle class="fillInk" cx="608" cy="382" r="9"/>
  <path class="ink" stroke-width="9" d="M 356 306 C 386 292, 422 292, 452 302"/>
  <path class="ink" stroke-width="8" d="M 556 278 C 580 260, 614 262, 640 280"/>
  <path class="ink" stroke-width="7" d="M 402 560 C 430 546, 466 548, 492 558"/>
  <path class="ink" stroke-width="6" d="M 634 434 C 622 452, 620 470, 632 478 C 644 485, 656 476, 654 462 C 652 450, 642 442, 634 434 Z"/>`,

  // "no." Eyes shut. He is not looking at the chart. The chart is still there.
  shut: `
  <path class="ink" stroke-width="9" d="M 366 376 C 392 404, 436 406, 458 378"/>
  <path class="ink" stroke-width="4.5" d="M 376 420 C 398 430, 428 430, 446 420"/>
  <path class="ink" stroke-width="8" d="M 564 368 C 584 392, 616 394, 634 370"/>
  <path class="ink" stroke-width="4" d="M 570 402 C 588 412, 612 412, 626 402"/>
  <path class="ink" stroke-width="9" d="M 352 328 C 386 316, 424 314, 458 324"/>
  <path class="ink" stroke-width="8" d="M 554 296 C 578 276, 614 278, 642 296"/>
  <path class="ink" stroke-width="7" d="M 412 556 C 436 562, 464 562, 486 554"/>`,
};

/* ------------------------------------------------------------------ */

function build({ view = '0 0 1000 1000', expr = 'hesitating', hand = 'hover', rough = true, grain = true, label }) {
  const [, , vw] = view.split(' ').map(Number);
  const fx = rough ? ' filter="url(#wobbleFill)" transform="translate(-5,4)"' : '';
  const ix = rough ? ' filter="url(#wobbleInk)"' : '';

  const defs = rough ? `
  <!-- Two different wobbles: fills and ink never line up perfectly. That mismatch is the point. -->
  <filter id="wobbleFill" x="-12%" y="-12%" width="124%" height="124%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.019" numOctaves="3" seed="3" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="wobbleInk" x="-12%" y="-12%" width="124%" height="124%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.026" numOctaves="3" seed="17" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G"/>
  </filter>` : '';

  const grainDef = grain ? `
  <filter id="paperGrain" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="8"/>
    <feColorMatrix values="0 0 0 0 0.32  0 0 0 0 0.26  0 0 0 0 0.17  0 0 0 0.11 0"/>
  </filter>` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${view}" width="${vw}" height="${vw}" role="img" aria-label="${label}">
<title>HESITATE</title>
<!-- Generated by build.mjs. Edit that, not this. -->
<defs>${defs}${grainDef}
  <style>
    .ink   { fill:none; stroke:${PAL.ink}; stroke-linecap:round; stroke-linejoin:round; opacity:.94 }
    .paper { fill:${PAL.paper} }
    .skin  { fill:${PAL.skin} }
    .green { fill:${PAL.green} }
    .green2{ fill:${PAL.green2} }
    .greenD{ fill:${PAL.greenD} }
    .fillInk { fill:${PAL.ink}; opacity:.94 }
  </style>
</defs>

<!-- background sits outside the wobble so the canvas edge stays clean -->
<rect x="-200" y="-200" width="1400" height="1400" class="paper"/>

<g transform="translate(500 548) scale(1.06) translate(-500 -548)">

<!-- ============ FLAT COLOUR ============ -->
<!-- deliberately off-register: colour is printed a few px from where the line is -->
<g${fx}>
  <path class="green" d="${HOOD_R}
    L 20 1006
    C 44 800, 100 704, 178 660
    C 160 592, 158 504, 190 386
    C 234 224, 338 132, 450 116
    C 496 108, 528 114, 556 130 Z"/>
  <!-- inner hood lining: the one piece of shading in the whole drawing -->
  <path class="greenD" d="${LINING}"/>
  <path class="skin" d="${FACE}"/>${handFill(hand)}
  <path class="skin" d="${NOSE} Z"/>
</g>

<!-- ============ INK ============ -->
<g${ix}>
  <path class="ink" stroke-width="11" d="${HOOD_R}"/>
  <path class="ink" stroke-width="11" d="${HOOD_L}"/>
  <!-- collar: where the hood sits down on the shoulders -->
  <path class="ink" stroke-width="6" d="M 266 654 C 252 688, 236 714, 214 736"/>
  <path class="ink" stroke-width="6" d="M 736 660 C 752 692, 770 716, 792 736"/>
  <path class="ink" stroke-width="10" d="${HOOD_RIM}"/>
  <path class="ink" stroke-width="9" d="${FACE}"/>

  <!-- hair, three tufts, none of them agree with each other -->
  <path class="ink" stroke-width="7" d="M 398 262 C 412 234, 438 226, 452 238"/>
  <path class="ink" stroke-width="7" d="M 466 244 C 478 216, 508 212, 520 228"/>
  <path class="ink" stroke-width="6" d="M 544 252 C 554 230, 580 228, 590 244"/>
${EXPR[expr]}

  <!-- the nose -->
  <path class="ink" stroke-width="9" d="${NOSE}"/>
  <path class="ink" stroke-width="5" d="M 528 492 C 540 496, 550 492, 552 484"/>
${handInk(hand)}

  <!-- drawstrings, two different lengths because nobody measures these -->
  <path class="ink" stroke-width="7" d="M 322 666 C 314 726, 316 782, 330 828"/>
  <ellipse class="fillInk" cx="332" cy="840" rx="13" ry="16"/>
  <path class="ink" stroke-width="7" d="M 566 676 C 574 720, 572 754, 562 782"/>
  <ellipse class="fillInk" cx="560" cy="794" rx="12" ry="15"/>
</g>
</g>
${grain ? `<rect x="-200" y="-200" width="1400" height="1400" filter="url(#paperGrain)" style="mix-blend-mode:multiply" pointer-events="none"/>` : ''}
</svg>
`;
}

const FILES = {
  // the one. profile picture, website hero, everything.
  'hesitate.svg': { label: 'HESITATE, a hooded character with a long crooked nose and one finger half-raised' },
  // tighter crop for small circular avatars and app icons
  'hesitate-head.svg': { view: '110 55 780 780', label: 'HESITATE, head and raised finger' },
  // no filters, no grain: stickers, print, embroidery, anything that chokes on SVG filters
  'hesitate-flat.svg': { rough: false, grain: false, label: 'HESITATE, flat vector version' },
  // meme set
  'hesitate-almost.svg': { expr: 'almost', label: 'HESITATE, almost convinced' },
  'hesitate-missed.svg': { expr: 'missed', label: 'HESITATE, having missed it' },
  'hesitate-shut.svg':  { expr: 'shut',  label: 'HESITATE, refusing to look' },
};

for (const [name, opts] of Object.entries(FILES)) {
  writeFileSync(join(OUT, name), build(opts));
  console.log('wrote', name);
}
