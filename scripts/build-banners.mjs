// Parametric generator for UniverLab's brand banners.
//
// GitHub renders README SVGs as images and does NOT load custom fonts, so the
// wordmark and kicker are outlined to vector <path> here (Space Grotesk) — the
// served SVG needs no font at all. The mark is the frozen isometric cube from
// the landing (Mark.astro / logo.svg).
//
// Run: npm install && npm run build   (writes ../assets/banner-*.svg)

import opentype from 'opentype.js';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..', 'assets');

// ── Brand tokens (from the landing) ─────────────────────────────────────────
const BG = '#0a0b0e';
const INK = '#e8e6e1';
const INK_DIM = '#8b8a86';
const ACCENT = '#e6c84a';

// IBM Plex Mono is the UniverLab signature — the wordmark and kicker are set in
// it, uppercase and tracked, matching the landing. Space Grotesk carries the
// prose tagline.
const ibmMed = opentype.loadSync(join(HERE, 'fonts', 'IBMPlexMono-500.ttf'));
const fontMed = opentype.loadSync(join(HERE, 'fonts', 'SpaceGrotesk-500.ttf'));

// The frozen mark — three splayed cube faces, viewBox 0 0 500 500.
const MARK_FACES = [
  'M 251.99455,1.0024578 C 233.6105,1.0205149 215.23298,4.77841 201.15461,12.27261 L 62.446773,86.109209 C 34.29001,101.0976 34.314707,125.18721 62.505125,140.12071 l 138.631495,73.43557 c 9.29363,4.92317 20.4529,8.21882 32.24743,9.88749 -0.0475,-0.50849 -0.0716,-1.02097 -0.072,-1.5414 l 4e-5,-100.44132 c 0,-9.63459 8.33359,-17.38979 18.68679,-17.38978 10.35319,0 18.6868,7.75518 18.6868,17.38978 v 100.44133 c 1e-5,0.50806 -0.0232,1.00708 -0.0675,1.50379 11.79086,-1.69165 22.94235,-5.00882 32.22497,-9.95013 l 138.71228,-73.83661 c 28.1568,-14.9884 28.12759,-39.078 -0.0627,-54.011492 L 302.86591,12.172357 C 288.77066,4.7056021 270.37854,0.98455048 251.99455,1.0024578 Z',
  'm 486.78573,382.52546 c 9.07431,-14.87871 14.65054,-31.60228 14.61208,-46.69548 L 501.0191,187.12405 c -0.0769,-30.18638 -22.58948,-42.07793 -50.47699,-26.65974 l -137.13946,75.82292 c -9.19371,5.08296 -17.78983,12.47976 -25.18046,21.19488 0.4985,0.21302 0.98911,0.44681 1.47531,0.70396 l 93.81469,49.66496 c 8.999,4.76402 12.12181,15.33945 7.00249,23.71378 -5.11933,8.37436 -16.48356,11.28048 -25.48246,6.51648 l -93.81476,-49.66496 c -0.47454,-0.25121 -0.92927,-0.51657 -1.37129,-0.79807 -4.25016,10.37372 -6.66586,21.03404 -6.64053,30.98573 l 0.37656,148.70958 c 0.077,30.18636 22.59161,42.07428 50.47907,26.65617 l 137.13722,-75.81929 c 13.94376,-7.7091 26.51366,-20.74594 35.58724,-35.62499 z',
  'M 15.46545,382.52546 C 6.3911449,367.64675 0.81490318,350.92318 0.85336934,335.82998 L 1.2320814,187.12405 C 1.309014,156.93767 23.82154,145.04612 51.70906,160.46431 l 137.13943,75.82292 c 9.19373,5.08296 17.78984,12.47976 25.18046,21.19488 -0.49849,0.21302 -0.98908,0.44681 -1.47528,0.70396 l -93.81469,49.66496 c -8.99901,4.76402 -12.12182,15.33945 -7.0025,23.71378 5.11933,8.37436 16.48354,11.28048 25.48248,6.51648 l 93.81471,-49.66496 c 0.47454,-0.25121 0.9293,-0.51657 1.37133,-0.79807 4.25014,10.37372 6.66582,21.03404 6.64051,30.98573 l -0.37656,148.70958 c -0.077,30.18636 -22.59161,42.07428 -50.47907,26.65617 L 51.05267,418.15045 C 37.10892,410.44135 24.539015,397.40451 15.46545,382.52546 Z',
];

// ── Banner definitions (the parameters) ─────────────────────────────────────
const BANNERS = [
  { id: 'profile', kicker: 'SCI · CLI · BIO', tagline: 'An independent computational laboratory of open experiments.', accent: ACCENT },
  { id: 'security', kicker: 'SECURITY POLICY', tagline: 'Responsible disclosure and secure engineering.', accent: '#e06a4a' },
  { id: 'support', kicker: 'SUPPORT', tagline: 'How to get help across the lab’s experiments.', accent: '#5dd39e' },
  { id: 'contributing', kicker: 'CONTRIBUTING', tagline: 'Conventions, branches and the pull-request flow.', accent: '#6ec6e6' },
  { id: 'code-of-conduct', kicker: 'CODE OF CONDUCT', tagline: 'The standards we hold each other to.', accent: '#a78bfa' },
];

// ── Layout constants ────────────────────────────────────────────────────────
const W = 1280;
const H = 340;
const PAD = 72;
const MARK = 164;              // rendered mark size
const WORDMARK_SIZE = 52;      // IBM Plex Mono "UNIVERLAB"
const WORDMARK_TRACK = 0.28;   // letter-spacing (em) — matches the landing
const KICKER_SIZE = 21;
const KICKER_TRACK = 0.20;
const TAGLINE_SIZE = 22;

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

/** A smooth sine wave as an SVG path `d`, from x=0 to xEnd at vertical yMid. */
function wavePath(yMid, amp, wavelength, xEnd) {
  const step = wavelength / 24;
  let d = `M 0 ${yMid.toFixed(1)}`;
  for (let x = step; x <= xEnd; x += step) {
    const y = yMid + amp * Math.sin((x / wavelength) * Math.PI * 2);
    d += ` L ${x.toFixed(1)} ${y.toFixed(2)}`;
  }
  return d;
}

/** Stacked waves that flow rightward (translate loop), faded off the text. */
function wavesLayer(accent) {
  const mid = H / 2;
  // amplitude, wavelength, stroke width, opacity, seconds-per-loop
  const specs = [
    { amp: 17, wl: 320, sw: 2.4, op: 0.5, dur: 9 },
    { amp: 11, wl: 210, sw: 1.8, op: 0.32, dur: 6.5 },
    { amp: 23, wl: 460, sw: 1.4, op: 0.22, dur: 13 },
  ];
  const paths = specs
    .map(({ amp, wl, sw, op, dur }) => {
      const d = wavePath(mid, amp, wl, W + wl);
      return `<g>
      <path d="${d}" fill="none" stroke="${accent}" stroke-width="${sw}" stroke-opacity="${op}" stroke-linecap="round"/>
      <animateTransform attributeName="transform" type="translate" from="0 0" to="${-wl} 0" dur="${dur}s" repeatCount="indefinite"/>
    </g>`;
    })
    .join('\n    ');
  return `<g mask="url(#waveFade)">\n    ${paths}\n  </g>`;
}

function buildSvg({ kicker, tagline, accent }) {
  const markScale = MARK / 500;
  const markX = PAD;
  const markY = (H - MARK) / 2;

  const textX = markX + MARK + 40;

  // Wordmark baseline: vertically centre the block (wordmark + kicker) on canvas.
  const wordmarkBaseline = H / 2 - 10;
  const wm = spacedPath(ibmMed, 'UNIVERLAB', textX, wordmarkBaseline, WORDMARK_SIZE, WORDMARK_TRACK);

  const kickerBaseline = wordmarkBaseline + 42;
  const kk = spacedPath(ibmMed, kicker, textX, kickerBaseline, KICKER_SIZE, KICKER_TRACK);

  const taglineBaseline = kickerBaseline + 34;
  const taglinePath = textPath(fontMed, tagline, textX, taglineBaseline, TAGLINE_SIZE);

  // Waves begin clear of the wordmark, wherever it ends.
  const waveStart = Math.min(0.62, (textX + wm.width + 72) / W).toFixed(3);
  const waveMid = Math.min(0.78, Number(waveStart) + 0.16).toFixed(3);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="UNIVERLAB — ${kicker}">
  <defs>
    <radialGradient id="glow" cx="18%" cy="28%" r="80%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.10"/>
      <stop offset="55%" stop-color="${BG}" stop-opacity="0"/>
    </radialGradient>
    <!-- keeps the waves in the right half, faded away from the wordmark -->
    <linearGradient id="waveFadeGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="${waveStart}" stop-color="#000"/>
      <stop offset="${waveMid}" stop-color="#fff"/>
      <stop offset="0.92" stop-color="#fff"/>
      <stop offset="1" stop-color="#000"/>
    </linearGradient>
    <mask id="waveFade">
      <rect width="${W}" height="${H}" fill="url(#waveFadeGrad)"/>
    </mask>
  </defs>

  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  ${wavesLayer(accent)}

  <!-- mark — static -->
  <g transform="translate(${markX} ${markY}) scale(${markScale})" fill="${INK}">
    ${MARK_FACES.map((d) => `<path d="${d}"/>`).join('\n    ')}
  </g>

  <!-- wordmark -->
  <path d="${wm.d}" fill="${INK}"/>
  <!-- accent seam under the wordmark -->
  <rect x="${textX}" y="${wordmarkBaseline + 16}" width="52" height="3" rx="1.5" fill="${accent}"/>
  <!-- kicker -->
  <path d="${kk.d}" fill="${accent}"/>
  <!-- tagline -->
  <path d="${taglinePath}" fill="${INK_DIM}"/>
</svg>
`;
}

mkdirSync(OUT, { recursive: true });
for (const b of BANNERS) {
  const svg = buildSvg(b);
  writeFileSync(join(OUT, `banner-${b.id}.svg`), svg);
  console.log(`✓ banner-${b.id}.svg`);
}
console.log(`\nWrote ${BANNERS.length} banners to ${OUT}`);
