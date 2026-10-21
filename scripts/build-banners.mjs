// Parametric generator for UniverLab's brand banners.
//
// The look follows univerlab.org's night: chalk on a slate board, the engraved
// isometric mark, a double engraved rule. GitHub renders README SVGs as images
// and does NOT load custom fonts, so every word is outlined to vector <path>
// here: the wordmark and kicker in Sometype Mono (the lab's typewriter voice),
// the tagline in Old Standard TT italic (its engraving voice). The slate tile
// and the machine plates are embedded as data URIs, so the SVG is self-contained.
//
// Run: npm install && npm run build   (writes ../assets/banner-*.svg)

import opentype from 'opentype.js';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..', 'assets');
const ASSETS = join(HERE, 'assets');

// ── Brand tokens (univerlab.org, night) ─────────────────────────────────────
const SLATE = '#222928';
const CHALK = '#ecebe4';
const CHALK_DIM = '#b9bdb5';
const RULE = '#5b6560';

const mono = opentype.loadSync(join(HERE, 'fonts', 'SometypeMono-wght.ttf'));
const italic = opentype.loadSync(join(HERE, 'fonts', 'OldStandard-Italic.ttf'));

const dataUri = (file) => `data:image/webp;base64,${readFileSync(join(ASSETS, file)).toString('base64')}`;
const SLATE_TILE = dataUri('pizarra.webp');
// The night plates of the seven experiments, in bench order (increasing height on the profile banner).
const MACHINES = ['canopy', 'texforge', 'gitkit', 'ghscaff', 'astro-denoise', 'demostage', 'quorum'];
/** Width and height of a WebP file, read from its header (VP8X, VP8L or VP8). */
function webpSize(file) {
  const b = readFileSync(join(ASSETS, file));
  const chunk = b.toString('ascii', 12, 16);
  if (chunk === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
  if (chunk === 'VP8L') { const v = b.readUInt32LE(21); return [1 + (v & 0x3fff), 1 + ((v >> 14) & 0x3fff)]; }
  return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
}

// The frozen mark — three splayed cube faces, viewBox 0 0 500 500 (top, right, left).
const MARK_FACES = [
  'M 251.99455,1.0024578 C 233.6105,1.0205149 215.23298,4.77841 201.15461,12.27261 L 62.446773,86.109209 C 34.29001,101.0976 34.314707,125.18721 62.505125,140.12071 l 138.631495,73.43557 c 9.29363,4.92317 20.4529,8.21882 32.24743,9.88749 -0.0475,-0.50849 -0.0716,-1.02097 -0.072,-1.5414 l 4e-5,-100.44132 c 0,-9.63459 8.33359,-17.38979 18.68679,-17.38978 10.35319,0 18.6868,7.75518 18.6868,17.38978 v 100.44133 c 1e-5,0.50806 -0.0232,1.00708 -0.0675,1.50379 11.79086,-1.69165 22.94235,-5.00882 32.22497,-9.95013 l 138.71228,-73.83661 c 28.1568,-14.9884 28.12759,-39.078 -0.0627,-54.011492 L 302.86591,12.172357 C 288.77066,4.7056021 270.37854,0.98455048 251.99455,1.0024578 Z',
  'm 486.78573,382.52546 c 9.07431,-14.87871 14.65054,-31.60228 14.61208,-46.69548 L 501.0191,187.12405 c -0.0769,-30.18638 -22.58948,-42.07793 -50.47699,-26.65974 l -137.13946,75.82292 c -9.19371,5.08296 -17.78983,12.47976 -25.18046,21.19488 0.4985,0.21302 0.98911,0.44681 1.47531,0.70396 l 93.81469,49.66496 c 8.999,4.76402 12.12181,15.33945 7.00249,23.71378 -5.11933,8.37436 -16.48356,11.28048 -25.48246,6.51648 l -93.81476,-49.66496 c -0.47454,-0.25121 -0.92927,-0.51657 -1.37129,-0.79807 -4.25016,10.37372 -6.66586,21.03404 -6.64053,30.98573 l 0.37656,148.70958 c 0.077,30.18636 22.59161,42.07428 50.47907,26.65617 l 137.13722,-75.81929 c 13.94376,-7.7091 26.51366,-20.74594 35.58724,-35.62499 z',
  'M 15.46545,382.52546 C 6.3911449,367.64675 0.81490318,350.92318 0.85336934,335.82998 L 1.2320814,187.12405 C 1.309014,156.93767 23.82154,145.04612 51.70906,160.46431 l 137.13943,75.82292 c 9.19373,5.08296 17.78984,12.47976 25.18046,21.19488 -0.49849,0.21302 -0.98908,0.44681 -1.47528,0.70396 l -93.81469,49.66496 c -8.99901,4.76402 -12.12182,15.33945 -7.0025,23.71378 5.11933,8.37436 16.48354,11.28048 25.48248,6.51648 l 93.81471,-49.66496 c 0.47454,-0.25121 0.9293,-0.51657 1.37133,-0.79807 4.25014,10.37372 6.66582,21.03404 6.64051,30.98573 l -0.37656,148.70958 c -0.077,30.18636 -22.59161,42.07428 -50.47907,26.65617 L 51.05267,418.15045 C 37.10892,410.44135 24.539015,397.40451 15.46545,382.52546 Z',
];

// ── Banner definitions (the parameters) ─────────────────────────────────────
// Accents are the chalk-legible versions of each page's colour on the slate.
const BANNERS = [
  { id: 'profile', kicker: 'SCI · CLI · BIO', tagline: 'An independent computational laboratory of open experiments.', accent: '#e6c84a', bench: true },
  { id: 'security', kicker: 'SECURITY POLICY', tagline: 'Responsible disclosure and secure engineering.', accent: '#e07a6e' },
  { id: 'support', kicker: 'SUPPORT', tagline: 'How to get help across the lab’s experiments.', accent: '#7fd3a8' },
  { id: 'contributing', kicker: 'CONTRIBUTING', tagline: 'Conventions, branches and the pull-request flow.', accent: '#7cc6e6' },
  { id: 'code-of-conduct', kicker: 'CODE OF CONDUCT', tagline: 'The standards we hold each other to.', accent: '#b39cf5' },
];

// ── Layout constants ────────────────────────────────────────────────────────
const W = 1280;
const H_HEALTH = 340;   // health-file banners
const H_BENCH = 520;    // the profile banner: text above, the bench below
const PAD = 76;
const MARK = 150;              // rendered mark size
const WORDMARK_SIZE = 56;      // Sometype Mono "univerlab"
const WORDMARK_TRACK = 0.04;
const KICKER_SIZE = 19;
const KICKER_TRACK = 0.22;
const TAGLINE_SIZE = 25;

/** Outline text to an SVG path `d` string, left-anchored at (x, baselineY). */
function textPath(font, text, x, baselineY, fontSize) {
  return font.getPath(text, x, baselineY, fontSize, { kerning: true }).toPathData(2);
}

/** Like textPath but with letter-spacing (em), returning the path and its width. */
function spacedPath(font, text, x, baselineY, fontSize, trackEm) {
  const track = fontSize * trackEm;
  let cursor = x;
  const parts = [];
  for (const ch of text) {
    const g = font.charToGlyph(ch);
    parts.push(g.getPath(cursor, baselineY, fontSize).toPathData(2));
    cursor += (g.advanceWidth / font.unitsPerEm) * fontSize + track;
  }
  return { d: parts.join(' '), width: cursor - x - track };
}

/** The engraved mark in chalk: top face stippled, left hatched, right cross-hatched. */
function engravedMark(x, y, size) {
  const s = size / 500;
  return `<g transform="translate(${x} ${y}) scale(${s.toFixed(4)})" stroke="${CHALK}" stroke-linejoin="round">
    <path d="${MARK_FACES[0]}" fill="url(#dots)" stroke-width="12"/>
    <path d="${MARK_FACES[2]}" fill="url(#hatch)" stroke-width="12"/>
    <path d="${MARK_FACES[1]}" fill="url(#cross)" stroke-width="12"/>
  </g>`;
}

/** Double engraved rule with quarter-circle corner ornaments, as on the site's postcards. */
function frame(H) {
  const o1 = 14, o2 = 22, r1 = 18, r2 = 10, c = 8;
  const corners = [[o2, o2, 180], [W - o2, o2, 270], [W - o2, H - o2, 0], [o2, H - o2, 90]]
    .map(([cx, cy, a0]) => {
      const a = (d) => (d * Math.PI) / 180;
      const p0 = [cx + c * Math.cos(a(a0)), cy + c * Math.sin(a(a0))];
      const p1 = [cx + c * Math.cos(a(a0 + 90)), cy + c * Math.sin(a(a0 + 90))];
      return `<path d="M${p0[0].toFixed(1)} ${p0[1].toFixed(1)} A${c} ${c} 0 0 1 ${p1[0].toFixed(1)} ${p1[1].toFixed(1)}"/>`;
    })
    .join('');
  return `<g fill="none" stroke="${CHALK}">
    <rect x="${o1}" y="${o1}" width="${W - 2 * o1}" height="${H - 2 * o1}" rx="${r1}" stroke-width="2" stroke-opacity=".75"/>
    <rect x="${o2}" y="${o2}" width="${W - 2 * o2}" height="${H - 2 * o2}" rx="${r2}" stroke-width="1" stroke-opacity=".5"/>
    <g stroke-width="1.3" stroke-opacity=".6">${corners}</g>
  </g>`;
}

/** The bench: the seven night plates in a row of increasing height, centred along the bottom. */
function bench(h) {
  const gap = 18, base = h - 54;
  const heights = MACHINES.map((_, i) => 128 + i * 12);
  const widths = MACHINES.map((m, i) => { const [w, hh] = webpSize(`${m}-night.webp`); return (w * heights[i]) / hh; });
  let x = (W - widths.reduce((a, b) => a + b, 0) - gap * (MACHINES.length - 1)) / 2;
  return MACHINES.map((m, i) => {
    const img = `<image href="${dataUri(`${m}-night.webp`)}" x="${x.toFixed(1)}" y="${(base - heights[i]).toFixed(1)}" width="${widths[i].toFixed(1)}" height="${heights[i]}"/>`;
    x += widths[i] + gap;
    return img;
  }).join('\n  ');
}

function buildSvg({ kicker, tagline, accent, bench: withBench }) {
  const H = withBench ? H_BENCH : H_HEALTH;
  const top = withBench ? 40 : (H - MARK) / 2;   // the text block keeps its 340 px layout at the top
  const markX = PAD;
  const markY = top;
  const textX = markX + MARK + 38;

  const wordmarkBaseline = top + MARK / 2 + 1;
  const wm = spacedPath(mono, 'univerlab', textX, wordmarkBaseline, WORDMARK_SIZE, WORDMARK_TRACK);
  const kickerBaseline = wordmarkBaseline + 40;
  const kk = spacedPath(mono, kicker, textX, kickerBaseline, KICKER_SIZE, KICKER_TRACK);
  const taglineBaseline = kickerBaseline + 36;
  const taglinePath = textPath(italic, tagline, textX, taglineBaseline, TAGLINE_SIZE);
  // The wordmark sits in the kicker's colour band: a short chalk underline in the page accent.
  const rule = `<path d="M${textX} ${wordmarkBaseline + 15} h${wm.width.toFixed(1)}" stroke="${accent}" stroke-width="1.6" stroke-dasharray="1 5" stroke-linecap="round"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="univerlab — ${kicker}">
  <defs>
    <pattern id="slate" width="341" height="341" patternUnits="userSpaceOnUse"><image href="${SLATE_TILE}" width="341" height="341"/></pattern>
    <pattern id="hatch" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><path d="M0 8 H16" stroke="${CHALK}" stroke-width="3.4"/></pattern>
    <pattern id="cross" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)"><path d="M0 7 H14 M7 0 V14" stroke="${CHALK}" stroke-width="2.8"/></pattern>
    <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx="12" cy="12" r="2.2" fill="${CHALK}"/></pattern>
    <radialGradient id="glow" cx="20%" cy="45%" r="70%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.08"/>
      <stop offset="60%" stop-color="${SLATE}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" rx="22" fill="${SLATE}"/>
  <rect width="${W}" height="${H}" rx="22" fill="url(#slate)"/>
  <rect width="${W}" height="${H}" rx="22" fill="url(#glow)"/>
  ${frame(H)}
  ${withBench ? bench(H) : ''}

  ${engravedMark(markX, markY, MARK)}

  <path d="${wm.d}" fill="${CHALK}"/>
  ${rule}
  <path d="${kk.d}" fill="${accent}"/>
  <path d="${taglinePath}" fill="${CHALK_DIM}"/>
</svg>
`;
}

mkdirSync(OUT, { recursive: true });
for (const b of BANNERS) {
  const svg = buildSvg(b);
  writeFileSync(join(OUT, `banner-${b.id}.svg`), svg);
  console.log(`✓ banner-${b.id}.svg  ${(svg.length / 1024).toFixed(0)} KB`);
}
console.log(`\nWrote ${BANNERS.length} banners to ${OUT}`);
