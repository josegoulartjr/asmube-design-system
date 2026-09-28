// Color math: sRGB <-> OKLab/OKLCH, gamut mapping and WCAG contrast.
// References: https://bottosson.github.io/posts/oklab/ and WCAG 2.2 §1.4.3.

const clamp01 = (v) => Math.min(1, Math.max(0, v));

export function hexToRgb(hex) {
  const clean = hex.replace('#', '').trim();
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
    throw new Error(`Invalid hex color: "${hex}" (expected #RRGGBB)`);
  }
  return [0, 2, 4].map((i) => parseInt(clean.slice(i, i + 2), 16) / 255);
}

export function rgbToHex([r, g, b]) {
  return (
    '#' +
    [r, g, b]
      .map((v) => Math.round(clamp01(v) * 255).toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  );
}

const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGamma = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

export function rgbToOklch(rgb) {
  const [r, g, b] = rgb.map(toLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const C = Math.hypot(A, B);
  const H = ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360;
  return { l: L, c: C, h: H };
}

// Returns unclamped linear-to-gamma RGB so callers can detect out-of-gamut values.
function oklchToRgbRaw({ l, c, h }) {
  const hr = (h * Math.PI) / 180;
  const A = c * Math.cos(hr);
  const B = c * Math.sin(hr);
  const l_ = (l + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m_ = (l - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s_ = (l - 0.0894841775 * A - 1.291485548 * B) ** 3;
  return [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ].map((v) => (v < 0 ? -toGamma(-v) : toGamma(v)));
}

const EPS = 1e-4;
const inGamut = (rgb) => rgb.every((v) => v >= -EPS && v <= 1 + EPS);

// Reduces chroma (keeping lightness and hue) until the color fits in sRGB.
export function oklchToRgb(color) {
  let rgb = oklchToRgbRaw(color);
  if (inGamut(rgb)) return rgb.map(clamp01);
  let lo = 0;
  let hi = color.c;
  for (let i = 0; i < 24; i += 1) {
    const mid = (lo + hi) / 2;
    if (inGamut(oklchToRgbRaw({ ...color, c: mid }))) lo = mid;
    else hi = mid;
  }
  rgb = oklchToRgbRaw({ ...color, c: lo });
  return rgb.map(clamp01);
}

export const hexToOklch = (hex) => rgbToOklch(hexToRgb(hex));
export const oklchToHex = (color) => rgbToHex(oklchToRgb(color));

export function relativeLuminance(hex) {
  const [r, g, b] = hexToRgb(hex).map(toLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(hexA, hexB) {
  const a = relativeLuminance(hexA);
  const b = relativeLuminance(hexB);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

export function wcagLevel(ratio) {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA grande';
  return 'Reprovado';
}
