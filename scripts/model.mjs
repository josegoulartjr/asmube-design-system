// Resolves the config into a flat, output-agnostic model used by every emitter.
import { buildRamp, buildNeutralRamp } from './palette.mjs';
import { contrastRatio, wcagLevel } from './color.mjs';
import * as config from './tokens.config.mjs';

const WHITE = '#FFFFFF';
const LINE_GRID = 4;

export function scaleSize(base, ratio, step) {
  return Math.round(base * ratio ** step);
}

function buildPrimitives() {
  const ramps = {};
  const anchors = {};
  for (const [name, hex] of Object.entries({ ...config.BRAND, ...config.SUPPORT })) {
    const { anchor, ramp } = buildRamp(hex);
    ramps[name] = { ...ramp, ...(config.RAMP_OVERRIDES[name] ?? {}) };
    anchors[name] = anchor;
  }
  ramps.neutro = buildNeutralRamp(config.BRAND.azul).ramp;
  return { ramps, anchors };
}

export function resolveRef(ref, ramps) {
  if (ref === 'branco') return WHITE;
  const [ramp, step] = ref.split('.');
  const value = ramps[ramp]?.[step];
  if (!value) throw new Error(`Unknown color reference "${ref}"`);
  return value;
}

function buildSemantic(ramps) {
  return Object.fromEntries(
    Object.entries(config.SEMANTIC_COLORS).map(([group, tokens]) => [
      group,
      Object.fromEntries(
        Object.entries(tokens).map(([name, ref]) => [name, { ref, hex: resolveRef(ref, ramps) }]),
      ),
    ]),
  );
}

function lookupSemantic(semantic, path) {
  const [group, name] = path.split('.');
  const token = semantic[group]?.[name];
  if (!token) throw new Error(`Unknown semantic color "${path}"`);
  return token.hex;
}

function buildContrast(semantic) {
  return config.CONTRAST_PAIRS.map(([fg, bg, flag]) => {
    const ratio = contrastRatio(lookupSemantic(semantic, fg), lookupSemantic(semantic, bg));
    return {
      fg,
      bg,
      ratio: Number(ratio.toFixed(2)),
      nivel: wcagLevel(ratio),
      proibido: flag === 'proibido',
    };
  });
}

function textStyle(style, size, lineHeightPx) {
  return {
    tamanho: size,
    alturaLinha: lineHeightPx,
    peso: config.FONT.pesos[style.peso],
    pesoNome: style.peso,
    espacamento: style.espacamento,
    caixa: style.caixa ?? 'none',
  };
}

function buildWebType() {
  const { base, ratio, styles } = config.WEB_SCALE;
  return Object.fromEntries(
    Object.entries(styles).map(([name, style]) => {
      const size = scaleSize(base, ratio, style.step);
      const lineHeight = Math.round((size * style.altura) / LINE_GRID) * LINE_GRID;
      return [name, textStyle(style, size, lineHeight)];
    }),
  );
}

function buildDisplayType() {
  const { ratio, formatos, styles } = config.DISPLAY_SCALE;
  return Object.fromEntries(
    Object.entries(formatos).map(([formato, { base, unidade, descricao }]) => [
      formato,
      {
        unidade,
        descricao,
        estilos: Object.fromEntries(
          Object.entries(styles).map(([name, style]) => {
            const size = scaleSize(base, ratio, style.step);
            return [name, textStyle(style, size, Math.round(size * style.altura))];
          }),
        ),
      },
    ]),
  );
}

export function buildModel() {
  const { ramps, anchors } = buildPrimitives();
  const semantic = buildSemantic(ramps);
  const icons = Object.fromEntries(
    Object.entries(config.ICON_COLORS).map(([mode, tokens]) => [
      mode,
      Object.fromEntries(
        Object.entries(tokens).map(([name, ref]) => [name, { ref, hex: resolveRef(ref, ramps) }]),
      ),
    ]),
  );
  return {
    icons,
    brand: config.BRAND,
    ramps,
    anchors,
    branco: WHITE,
    semantic,
    contrast: buildContrast(semantic),
    font: config.FONT,
    webScale: { base: config.WEB_SCALE.base, ratio: config.WEB_SCALE.ratio },
    webType: buildWebType(),
    displayRatio: config.DISPLAY_SCALE.ratio,
    displayType: buildDisplayType(),
    spacing: config.SPACING,
    radius: config.RADIUS,
    borderWidth: config.BORDER_WIDTH,
    shadows: config.SHADOWS,
    breakpoints: config.BREAKPOINTS,
    containerMax: config.CONTAINER_MAX,
    formats: config.FORMATS,
  };
}
