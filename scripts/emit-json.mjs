// Emits tokens/asmube.tokens.json in the W3C Design Tokens (DTCG) format,
// readable by Tokens Studio, Style Dictionary and most Figma token plugins.
const token = (type, value, description) => ({
  $type: type,
  $value: value,
  ...(description ? { $description: description } : {}),
});

const mapValues = (obj, fn) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v, k)]));

function colors(model) {
  const primitives = mapValues(model.ramps, (steps, ramp) =>
    mapValues(steps, (hex, step) =>
      token('color', hex, model.anchors[ramp] === Number(step) ? 'Cor oficial da marca' : undefined),
    ),
  );
  return { branco: token('color', model.branco), ...primitives };
}

function semantic(model) {
  return mapValues(model.semantic, (tokens) =>
    mapValues(tokens, ({ ref }) => token('color', ref === 'branco' ? '{cor.branco}' : `{cor.${ref}}`)),
  );
}

function typography(styles, unit) {
  return mapValues(styles, (s) =>
    token('typography', {
      fontFamily: '{fonte.familia}',
      fontSize: `${s.tamanho}${unit}`,
      fontWeight: `{fonte.peso.${s.pesoNome}}`,
      lineHeight: Number((s.alturaLinha / s.tamanho).toFixed(3)),
      letterSpacing: `${s.espacamento}em`,
      ...(s.caixa !== 'none' ? { textCase: s.caixa } : {}),
    }),
  );
}

export function emitJson(model) {
  const shadowColor = model.ramps.azul[950];
  const alphaHex = (a) => Math.round(a * 255).toString(16).padStart(2, '0').toUpperCase();
  const tree = {
    cor: colors(model),
    semantico: semantic(model),
    fonte: {
      familia: token('fontFamily', model.font.familia.split(',').map((f) => f.trim().replace(/'/g, ''))),
      peso: mapValues(model.font.pesos, (w) => token('fontWeight', w)),
    },
    tipografia: {
      web: typography(model.webType, 'px'),
      peca: mapValues(model.displayType, ({ unidade, estilos }) => typography(estilos, unidade)),
    },
    espaco: mapValues(model.spacing, (v) => token('dimension', `${v}px`)),
    raio: mapValues(model.radius, (v) => token('dimension', `${v}px`)),
    borda: mapValues(model.borderWidth, (v) => token('dimension', `${v}px`)),
    sombra: mapValues(model.shadows, (layers) =>
      token(
        'shadow',
        layers.map((l) => ({
          color: `${shadowColor}${alphaHex(l.alpha)}`,
          offsetX: `${l.x}px`,
          offsetY: `${l.y}px`,
          blur: `${l.blur}px`,
          spread: `${l.spread}px`,
        })),
      ),
    ),
    breakpoint: mapValues(model.breakpoints, (v) => token('dimension', `${v}px`)),
  };
  return `${JSON.stringify(tree, null, 2)}\n`;
}
