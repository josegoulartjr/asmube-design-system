// Regenerates every token output from scripts/tokens.config.mjs.
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildModel } from './model.mjs';
import { emitCss } from './emit-css.mjs';
import { emitJson } from './emit-json.mjs';
import { emitSkillTokens } from './emit-skill.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

async function write(relativePath, content) {
  const target = join(ROOT, relativePath);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, content, 'utf8');
  console.log(`  ✓ ${relativePath}`);
}

function contrastReport(model) {
  const rows = model.contrast.map(
    ({ fg, bg, ratio, nivel, proibido }) =>
      `| ${fg} | ${bg} | ${ratio.toFixed(2)}:1 | ${proibido ? `${nivel} — **não usar para texto**` : nivel} |`,
  );
  return [
    '# Relatório de contraste (WCAG 2.2)',
    '',
    'Gerado por `npm run build`. AA exige 4,5:1 para texto normal e 3:1 para texto grande (≥ 24px, ou ≥ 19px em negrito) e elementos gráficos.',
    '',
    '| Texto / elemento | Fundo | Contraste | Nível |',
    '|---|---|---|---|',
    ...rows,
    '',
  ].join('\n');
}

// Email clients ignore CSS variables, so the email template gets literal token values.
function emailValues(model) {
  const values = { fonte: model.font.familia.replace(/'/g, ''), 'cor.branco': model.branco };
  for (const [ramp, steps] of Object.entries(model.ramps)) {
    for (const [step, hex] of Object.entries(steps)) values[`cor.${ramp}.${step}`] = hex;
  }
  for (const [name, s] of Object.entries(model.webType)) values[`texto.${name}`] = s.tamanho;
  for (const [name, v] of Object.entries(model.radius)) values[`raio.${name}`] = v;
  return values;
}

export function renderTemplate(template, values) {
  return template.replace(/\{\{([\w.-]+)\}\}/g, (match, key) => {
    if (!(key in values)) throw new Error(`Token desconhecido no modelo de e-mail: ${match}`);
    return String(values[key]);
  });
}

async function main() {
  const model = buildModel();
  console.log('ASMUBE Design System — build');
  await write('css/tokens.css', emitCss(model));
  await write('tokens/asmube.tokens.json', emitJson(model));
  await write('docs/tokens.js', `window.ASMUBE_TOKENS = ${JSON.stringify(model, null, 2)};\n`);
  await write('docs/contraste.md', contrastReport(model));
  const skillRefs = 'skill/asmube-design-system/references';
  await write(`${skillRefs}/tokens.md`, emitSkillTokens(model));
  await write(`${skillRefs}/layouts.md`, await readFile(join(ROOT, 'docs/padroes-de-layout.md'), 'utf8'));
  await write('site/src/tokens.json', `${JSON.stringify(model, null, 2)}\n`);
  await write('site/src/asmube-tokens.css', emitCss(model));
  await mkdir(join(ROOT, 'site/public/logo'), { recursive: true });
  for (const name of ['colorido', 'sobre-azul', 'branco']) {
    await copyFile(join(ROOT, `assets/logo/asmube-logo-${name}.svg`), join(ROOT, `site/public/logo/asmube-logo-${name}.svg`));
  }
  const emailTemplate = await readFile(join(ROOT, 'email/_modelo.html'), 'utf8');
  await write(
    'email/modelo-email.html',
    renderTemplate(emailTemplate.replace(/<!-- Modelo-fonte[\s\S]*?-->\r?\n/, ''), emailValues(model)),
  );

  const failures = model.contrast.filter((c) => c.nivel === 'Reprovado' && !c.proibido);
  if (failures.length > 0) {
    console.warn(`\n⚠ ${failures.length} par(es) reprovado(s) no contraste — veja docs/contraste.md`);
  }
}

main().catch((error) => {
  console.error(`Build falhou: ${error.message}`);
  process.exit(1);
});
