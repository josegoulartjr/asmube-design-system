// Emits skill/asmube-design-system/references/tokens.md so the Claude skill never drifts from the code.
const row = (cells) => `| ${cells.join(' | ')} |`;

function colorTables(model) {
  const steps = Object.keys(model.ramps.azul);
  const lines = ['## Escalas (primitivos)', '', row(['Escala', ...steps]), row(['---', ...steps.map(() => '---')])];
  for (const [ramp, values] of Object.entries(model.ramps)) {
    const isBrand = ramp in model.brand;
    const cells = steps.map((s) => (isBrand && model.anchors[ramp] === Number(s) ? `**${values[s]}** ●` : values[s]));
    lines.push(row([ramp, ...cells]));
  }
  lines.push('', '● = cor oficial da marca. `branco` = #FFFFFF. Figma: `cor/<escala>/<passo>` · CSS: `--cor-<escala>-<passo>`.', '');
  lines.push('## Cores semânticas (use estas)', '', row(['Token (Figma)', 'CSS', 'Aponta para', 'Hex']), row(['---', '---', '---', '---']));
  for (const [group, tokens] of Object.entries(model.semantic)) {
    for (const [name, { ref, hex }] of Object.entries(tokens)) {
      lines.push(row([`${group}/${name}`, `--cor-${group}-${name}`, ref, hex]));
    }
  }
  lines.push('', '## Cores de ícones (coleção "Ícones ASMUBE")', '', row(['Token', 'Sobre claro', 'Sobre azul']), row(['---', '---', '---']));
  const [light, dark] = Object.keys(model.icons);
  for (const name of Object.keys(model.icons[light])) {
    lines.push(row([`icone/${name}`, model.icons[light][name].hex, model.icons[dark][name].hex]));
  }
  return lines;
}

function contrastTable(model) {
  return [
    '', '## Contraste verificado', '', row(['Texto', 'Fundo', 'Razão', 'Nível']), row(['---', '---', '---', '---']),
    ...model.contrast.map((c) => row([c.fg, c.bg, `${c.ratio}:1`, c.proibido ? `${c.nivel} — NÃO usar para texto` : c.nivel])),
  ];
}

function typeTables(model) {
  const lines = ['', '## Tipografia — Montserrat', '', `### Web (base ${model.webScale.base}px, razão ${model.webScale.ratio})`, '', row(['Estilo Figma', 'Classe CSS', 'Tamanho/entrelinha', 'Peso', 'Espaçamento']), row(['---', '---', '---', '---', '---'])];
  for (const [name, s] of Object.entries(model.webType)) {
    lines.push(row([`ASMUBE/Web/${name}`, `.texto-${name}`, `${s.tamanho}/${s.alturaLinha}px`, s.peso, `${s.espacamento}em${s.caixa === 'uppercase' ? ' · CAIXA ALTA' : ''}`]));
  }
  lines.push('', `### Peças (razão ${model.displayRatio}; muda com o modo da coleção "Tipografia Peças")`, '');
  const formats = Object.keys(model.displayType);
  lines.push(row(['Estilo', ...formats.map((f) => `${f} (${model.displayType[f].unidade})`)]), row(['---', ...formats.map(() => '---')]));
  for (const name of Object.keys(model.displayType[formats[0]].estilos)) {
    lines.push(row([`ASMUBE/Peça/${name}`, ...formats.map((f) => { const s = model.displayType[f].estilos[name]; return `${s.tamanho}/${s.alturaLinha}`; })]));
  }
  return lines;
}

function scaleTables(model) {
  return [
    '', '## Espaços, raios, sombras', '',
    `Espaço (grade 4px): ${Object.entries(model.spacing).map(([k, v]) => `espaco-${k}=${v}`).join(' · ')}`, '',
    `Raio: ${Object.entries(model.radius).map(([k, v]) => `raio-${k}=${v}`).join(' · ')}`, '',
    `Borda: ${Object.entries(model.borderWidth).map(([k, v]) => `${k}=${v}`).join(' · ')} · Sombras: ${Object.keys(model.shadows).join(', ')} (tom azul-marinho)`, '',
    `Formatos: ${Object.entries(model.formats).map(([k, f]) => `${k} ${f.largura}×${f.altura ?? 'auto'} (margem ${f.margem})`).join(' · ')}`, '',
  ];
}

export function emitSkillTokens(model) {
  return [
    '# Tokens ASMUBE (gerado por `npm run build` — não edite à mão)', '',
    ...colorTables(model), ...contrastTable(model), ...typeTables(model), ...scaleTables(model),
  ].join('\n');
}
