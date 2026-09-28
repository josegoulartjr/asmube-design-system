// Emits css/tokens.css: primitives, semantic aliases, type styles and utility classes.
const HEADER = '/* ASMUBE Design System — gerado por `npm run build`. Não edite à mão:\n   altere scripts/tokens.config.mjs e rode o build de novo. */\n';

const decl = (name, value) => `  --${name}: ${value};`;

function hexToRgbChannels(hex) {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

function colorVars(model) {
  const lines = [decl('cor-branco', model.branco)];
  for (const [ramp, steps] of Object.entries(model.ramps)) {
    for (const [step, hex] of Object.entries(steps)) lines.push(decl(`cor-${ramp}-${step}`, hex));
  }
  lines.push('');
  for (const [group, tokens] of Object.entries(model.semantic)) {
    for (const [name, { ref }] of Object.entries(tokens)) {
      const target = ref === 'branco' ? 'cor-branco' : `cor-${ref.replace('.', '-')}`;
      lines.push(decl(`cor-${group}-${name}`, `var(--${target})`));
    }
  }
  return lines;
}

function typeVars(prefix, styles, unit) {
  return Object.entries(styles).flatMap(([name, s]) => [
    decl(`${prefix}-${name}-tamanho`, `${s.tamanho}${unit}`),
    decl(`${prefix}-${name}-altura`, `${s.alturaLinha}${unit}`),
    decl(`${prefix}-${name}-peso`, `var(--fonte-peso-${s.pesoNome})`),
    decl(`${prefix}-${name}-espacamento`, `${s.espacamento}em`),
  ]);
}

function scaleVars(model) {
  const shadowColor = hexToRgbChannels(model.ramps.azul[950]);
  return [
    decl('fonte-familia', model.font.familia),
    ...Object.entries(model.font.pesos).map(([n, w]) => decl(`fonte-peso-${n}`, w)),
    '',
    ...typeVars('texto', model.webType, 'px'),
    '',
    ...Object.entries(model.spacing).map(([k, v]) => decl(`espaco-${k}`, `${v}px`)),
    '',
    ...Object.entries(model.radius).map(([k, v]) => decl(`raio-${k}`, `${v}px`)),
    ...Object.entries(model.borderWidth).map(([k, v]) => decl(`borda-${k}`, `${v}px`)),
    ...Object.entries(model.shadows).map(([k, layers]) =>
      decl(
        `sombra-${k}`,
        layers
          .map((l) => `${l.x}px ${l.y}px ${l.blur}px ${l.spread}px rgb(${shadowColor} / ${l.alpha})`)
          .join(', '),
      ),
    ),
    decl('container-max', `${model.containerMax}px`),
  ];
}

function displayBlocks(model) {
  return Object.entries(model.displayType).map(([formato, { unidade, estilos }], index) => {
    const selector = index === 0 ? `:root,\n[data-formato="${formato}"]` : `[data-formato="${formato}"]`;
    return `${selector} {\n${typeVars('peca', estilos, unidade).join('\n')}\n}`;
  });
}

const cssRef = (ref) => (ref === 'branco' ? 'var(--cor-branco)' : `var(--cor-${ref.replace('.', '-')})`);

// Icon colors: light mode on :root, inverted mode for containers on the brand blue.
function iconBlocks(model) {
  const [lightMode, darkMode] = Object.keys(model.icons);
  const block = (mode) =>
    Object.entries(model.icons[mode]).map(([name, { ref }]) => decl(`icone-${name}`, cssRef(ref)));
  return [
    `:root,\n[data-icones="${lightMode}"] {\n${block(lightMode).join('\n')}\n}`,
    `[data-icones="${darkMode}"],\n.secao--marca,\n.card--marca {\n${block(darkMode).join('\n')}\n}`,
  ];
}

function typeClasses(prefix, styles) {
  return Object.entries(styles)
    .map(([name, s]) => {
      const v = `${prefix}-${name}`;
      const upper = s.caixa === 'uppercase' ? '\n  text-transform: uppercase;' : '';
      return `.${v} {\n  font-family: var(--fonte-familia);\n  font-size: var(--${v}-tamanho);\n  line-height: var(--${v}-altura);\n  font-weight: var(--${v}-peso);\n  letter-spacing: var(--${v}-espacamento);${upper}\n}`;
    })
    .join('\n\n');
}

export function emitCss(model) {
  const firstFormat = Object.values(model.displayType)[0];
  return [
    HEADER,
    `:root {\n${[...colorVars(model), '', ...scaleVars(model)].join('\n')}\n}`,
    '/* Escala display das peças: o formato padrão é "social". Use data-formato="slide" ou "impresso" no container da peça. */',
    ...displayBlocks(model),
    '/* Cores de ícones (biblioteca Figma "ASMUBE · Ícones", Streamline CC BY 4.0). Sobre o azul, use data-icones="sobre-azul". */',
    ...iconBlocks(model),
    '/* Estilos de texto — web */',
    typeClasses('texto', model.webType),
    '/* Estilos de texto — peças */',
    typeClasses('peca', firstFormat.estilos),
    '',
  ].join('\n\n');
}
