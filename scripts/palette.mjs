// Builds a 50–950 tonal ramp from a single brand color, in OKLCH.
// The brand color is kept exactly (anchored at the step closest to its lightness);
// the other steps are spread towards white/black keeping the same hue.
import { hexToOklch, oklchToHex } from './color.mjs';

export const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

// Reference lightness per step (OKLCH L), tuned for even perceptual spacing.
const TARGET_L = {
  50: 0.975, 100: 0.945, 200: 0.895, 300: 0.82, 400: 0.72, 500: 0.63,
  600: 0.54, 700: 0.46, 800: 0.385, 900: 0.31, 950: 0.24,
};

// How much chroma is lost at the lightest / darkest end of the ramp.
const LIGHT_CHROMA_DROP = 0.85;
const DARK_CHROMA_DROP = 0.35;

export function closestStep(lightness) {
  return STEPS.reduce((best, step) =>
    Math.abs(TARGET_L[step] - lightness) < Math.abs(TARGET_L[best] - lightness) ? step : best,
  );
}

function stepColor(step, anchor, base) {
  if (step === anchor) return base;
  const lightest = TARGET_L[50];
  const darkest = TARGET_L[950];
  const anchorL = TARGET_L[anchor];

  if (step < anchor) {
    const t = (TARGET_L[step] - anchorL) / (lightest - anchorL);
    return {
      l: base.l + t * (lightest - base.l),
      c: base.c * (1 - t ** 1.5 * LIGHT_CHROMA_DROP),
      h: base.h,
    };
  }
  const t = (anchorL - TARGET_L[step]) / (anchorL - darkest);
  return {
    l: base.l - t * (base.l - darkest),
    c: base.c * (1 - t * DARK_CHROMA_DROP),
    h: base.h,
  };
}

/**
 * @param {string} baseHex brand color, e.g. "#303787"
 * @param {{ anchor?: number }} [options] force the step where the base color sits
 * @returns {{ anchor: number, ramp: Record<number, string> }}
 */
export function buildRamp(baseHex, options = {}) {
  const base = hexToOklch(baseHex);
  const anchor = options.anchor ?? closestStep(base.l);
  if (!STEPS.includes(anchor)) throw new Error(`Invalid anchor step: ${anchor}`);

  const ramp = Object.fromEntries(
    STEPS.map((step) => [
      step,
      step === anchor ? baseHex.toUpperCase() : oklchToHex(stepColor(step, anchor, base)),
    ]),
  );
  return { anchor, ramp };
}

// Neutrals need finer steps at the light end (backgrounds, borders) and deeper darks (text).
const NEUTRAL_L = {
  50: 0.985, 100: 0.965, 200: 0.925, 300: 0.87, 400: 0.72, 500: 0.6,
  600: 0.5, 700: 0.41, 800: 0.32, 900: 0.24, 950: 0.17,
};

// Neutral ramp: fixed lightness targets with a faint tint of the given hue.
export function buildNeutralRamp(tintHex, chroma = 0.012) {
  const { h } = hexToOklch(tintHex);
  const ramp = Object.fromEntries(
    STEPS.map((step) => [
      step,
      oklchToHex({ l: NEUTRAL_L[step], c: step >= 700 ? chroma * 1.6 : chroma, h }),
    ]),
  );
  return { anchor: null, ramp };
}
