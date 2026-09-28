import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hexToRgb, rgbToHex, hexToOklch, oklchToHex, contrastRatio, wcagLevel } from '../scripts/color.mjs';
import { buildRamp, buildNeutralRamp, STEPS } from '../scripts/palette.mjs';
import { buildModel, resolveRef, scaleSize } from '../scripts/model.mjs';
import { emitCss } from '../scripts/emit-css.mjs';
import { emitJson } from '../scripts/emit-json.mjs';

test('hex round-trips through OKLCH without drift', () => {
  for (const hex of ['#303787', '#6AA842', '#FFFFFF', '#000000']) {
    assert.equal(oklchToHex(hexToOklch(hex)), hex);
    assert.equal(rgbToHex(hexToRgb(hex)), hex);
  }
});

test('rejects malformed hex colors', () => {
  assert.throws(() => hexToRgb('#12'), /Invalid hex color/);
  assert.throws(() => hexToRgb('blue'), /Invalid hex color/);
});

test('contrast ratio matches WCAG reference values', () => {
  assert.equal(contrastRatio('#FFFFFF', '#000000').toFixed(1), '21.0');
  assert.equal(contrastRatio('#777777', '#FFFFFF').toFixed(2), '4.48');
  assert.equal(wcagLevel(4.5), 'AA');
  assert.equal(wcagLevel(3.2), 'AA grande');
  assert.equal(wcagLevel(2.9), 'Reprovado');
});

test('brand color is kept exactly at its anchor step', () => {
  const blue = buildRamp('#303787');
  assert.equal(blue.anchor, 800);
  assert.equal(blue.ramp[800], '#303787');
  const green = buildRamp('#6AA842');
  assert.equal(green.anchor, 500);
  assert.equal(green.ramp[500], '#6AA842');
});

test('ramps get monotonically darker from 50 to 950', () => {
  for (const { ramp } of [buildRamp('#303787'), buildRamp('#6AA842'), buildNeutralRamp('#303787')]) {
    const lightness = STEPS.map((s) => hexToOklch(ramp[s]).l);
    lightness.slice(1).forEach((l, i) => assert.ok(l < lightness[i], `step ${STEPS[i + 1]} not darker`));
  }
});

test('ramp keeps the brand hue', () => {
  const { ramp } = buildRamp('#303787');
  const baseHue = hexToOklch('#303787').h;
  for (const step of [200, 400, 600, 900]) {
    assert.ok(Math.abs(hexToOklch(ramp[step]).h - baseHue) < 6, `hue drift at ${step}`);
  }
});

test('type scale follows the modular ratio', () => {
  assert.equal(scaleSize(16, 1.25, 0), 16);
  assert.equal(scaleSize(16, 1.25, 1), 20);
  assert.equal(scaleSize(16, 1.25, 5), 49);
  assert.equal(scaleSize(32, 1.333, 4), 101);
});

test('model resolves semantic colors and snaps web line heights to 4px', () => {
  const model = buildModel();
  assert.equal(model.semantic.fundo.marca.hex, '#303787');
  assert.equal(model.semantic.fundo.destaque.hex, '#6AA842');
  assert.equal(model.ramps.azul[950], '#181C41', 'override from the brand Figma file');
  for (const style of Object.values(model.webType)) assert.equal(style.alturaLinha % 4, 0);
  assert.throws(() => resolveRef('roxo.500', model.ramps), /Unknown color reference/);
});

test('every text pair meets AA except those documented as forbidden', () => {
  const failures = buildModel().contrast.filter((c) => c.nivel === 'Reprovado' && !c.proibido);
  assert.deepEqual(failures, []);
});

test('outputs expose the expected tokens', () => {
  const model = buildModel();
  const css = emitCss(model);
  assert.match(css, /--cor-azul-800: #303787;/);
  assert.match(css, /--cor-acao-primaria: var\(--cor-azul-800\);/);
  assert.match(css, /\[data-formato="impresso"\]/);
  assert.match(css, /--icone-primario: var\(--cor-azul-800\);/);
  assert.match(css, /\[data-icones="sobre-azul"\][\s\S]*--icone-primario: var\(--cor-branco\);/);
  assert.equal(model.icons['sobre-azul'].fundo.hex, '#303787');
  const json = JSON.parse(emitJson(model));
  assert.equal(json.cor.verde['500'].$value, '#6AA842');
  assert.equal(json.semantico.fundo.marca.$value, '{cor.azul.800}');
  assert.equal(json.tipografia.web.h1.$type, 'typography');
});
