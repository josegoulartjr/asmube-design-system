// Single source of truth for the ASMUBE design system.
// Edit values here and run `npm run build` to regenerate every output.

export const BRAND = {
  azul: '#303787', // cor principal (amostra oficial)
  verde: '#6AA842', // cor de destaque (amostra oficial)
};

// Steps pinned to colors already in use in the brand files (win over the generated tone).
export const RAMP_OVERRIDES = {
  azul: { 950: '#181C41' }, // azul-marinho usado nas peças do Figma ASMUBE 2026
};

// Feedback colors are not brand colors; they only signal status (erro / alerta).
export const SUPPORT = {
  vermelho: '#D6353B',
  amarelo: '#E9A40F',
};

// Semantic colors: references to primitives as "ramp.step" (or "branco").
export const SEMANTIC_COLORS = {
  fundo: {
    padrao: 'branco',
    suave: 'neutro.50',
    sutil: 'neutro.100',
    marca: 'azul.800',
    'marca-profundo': 'azul.950',
    'marca-suave': 'azul.50',
    destaque: 'verde.500',
    'destaque-suave': 'verde.50',
    inverso: 'neutro.950',
  },
  texto: {
    padrao: 'neutro.900',
    secundario: 'neutro.600',
    desabilitado: 'neutro.400',
    marca: 'azul.800',
    destaque: 'verde.700',
    link: 'azul.700',
    'link-hover': 'azul.900',
    'sobre-marca': 'branco',
    'sobre-destaque': 'azul.950',
    inverso: 'branco',
  },
  borda: {
    padrao: 'neutro.200',
    forte: 'neutro.300',
    marca: 'azul.800',
    destaque: 'verde.500',
    foco: 'azul.600',
  },
  acao: {
    primaria: 'azul.800',
    'primaria-hover': 'azul.900',
    'primaria-ativo': 'azul.950',
    secundaria: 'verde.500',
    'secundaria-hover': 'verde.400',
    'secundaria-ativo': 'verde.300',
    'fantasma-hover': 'azul.50',
    desabilitada: 'neutro.100',
  },
  feedback: {
    'sucesso-fundo': 'verde.50',
    'sucesso-borda': 'verde.500',
    'sucesso-texto': 'verde.800',
    'erro-fundo': 'vermelho.50',
    'erro-borda': 'vermelho.500',
    'erro-texto': 'vermelho.800',
    'alerta-fundo': 'amarelo.50',
    'alerta-borda': 'amarelo.400',
    'alerta-texto': 'amarelo.800',
    'info-fundo': 'azul.50',
    'info-borda': 'azul.500',
    'info-texto': 'azul.800',
  },
};

// Icon colors (Figma library "ASMUBE · Ícones", collection "Ícones ASMUBE").
// Two modes: on light backgrounds and on the brand blue. Values are ramp refs.
export const ICON_COLORS = {
  'sobre-claro': {
    primario: 'azul.800', secundario: 'verde.500', profundo: 'azul.950', suave: 'verde.200',
    'suave-azul': 'azul.300', 'verde-medio': 'verde.400', 'azul-medio': 'azul.500', fundo: 'branco',
  },
  'sobre-azul': {
    primario: 'branco', secundario: 'verde.500', profundo: 'branco', suave: 'azul.700',
    'suave-azul': 'azul.600', 'verde-medio': 'verde.400', 'azul-medio': 'azul.400', fundo: 'azul.800',
  },
};

// Text/background pairs checked for WCAG contrast in the build report.
// A third item 'proibido' documents a combination that must never carry text.
export const CONTRAST_PAIRS = [
  ['texto.padrao', 'fundo.padrao'],
  ['texto.secundario', 'fundo.padrao'],
  ['texto.secundario', 'fundo.suave'],
  ['texto.marca', 'fundo.padrao'],
  ['texto.destaque', 'fundo.padrao'],
  ['texto.link', 'fundo.padrao'],
  ['texto.sobre-marca', 'fundo.marca'],
  ['texto.sobre-destaque', 'fundo.destaque'],
  ['texto.sobre-marca', 'fundo.destaque', 'proibido'],
  ['texto.sobre-marca', 'acao.primaria-hover'],
  ['texto.sobre-destaque', 'acao.secundaria-hover'],
  ['feedback.sucesso-texto', 'feedback.sucesso-fundo'],
  ['feedback.erro-texto', 'feedback.erro-fundo'],
  ['feedback.alerta-texto', 'feedback.alerta-fundo'],
  ['feedback.info-texto', 'feedback.info-fundo'],
  ['borda.foco', 'fundo.padrao'],
  ['fundo.destaque', 'fundo.marca'],
];

export const FONT = {
  familia: "'Montserrat', 'Segoe UI', Arial, sans-serif",
  pesos: { regular: 400, medio: 500, semibold: 600, bold: 700, extrabold: 800 },
};

// Web scale — base 16px, Major Third (1.25). Line heights snap to a 4px grid.
export const WEB_SCALE = {
  base: 16,
  ratio: 1.25,
  styles: {
    display: { step: 6, peso: 'extrabold', altura: 1.1, espacamento: -0.02 },
    h1: { step: 5, peso: 'extrabold', altura: 1.15, espacamento: -0.02 },
    h2: { step: 4, peso: 'bold', altura: 1.2, espacamento: -0.015 },
    h3: { step: 3, peso: 'bold', altura: 1.25, espacamento: -0.01 },
    h4: { step: 2, peso: 'bold', altura: 1.3, espacamento: 0 },
    h5: { step: 1, peso: 'semibold', altura: 1.4, espacamento: 0 },
    'corpo-lg': { step: 1, peso: 'regular', altura: 1.6, espacamento: 0 },
    corpo: { step: 0, peso: 'regular', altura: 1.6, espacamento: 0 },
    legenda: { step: -1, peso: 'medio', altura: 1.5, espacamento: 0.01 },
    sobretitulo: { step: -1, peso: 'bold', altura: 1.4, espacamento: 0.08, caixa: 'uppercase' },
    botao: { step: 0, peso: 'semibold', altura: 1.5, espacamento: 0.01 },
  },
};

// Display scale for "peças" (posts, slides, impressos) — Perfect Fourth (1.333).
// Each format has its own base size; the ratio and styles are shared.
export const DISPLAY_SCALE = {
  ratio: 1.333,
  formatos: {
    social: { base: 32, unidade: 'px', descricao: 'Posts 1080px de largura (feed, story, carrossel)' },
    slide: { base: 36, unidade: 'px', descricao: 'Apresentações 1920×1080' },
    impresso: { base: 11, unidade: 'pt', descricao: 'A4 / A5 e impressos (em pontos)' },
  },
  styles: {
    hero: { step: 5, peso: 'extrabold', altura: 1.0, espacamento: -0.03 },
    titulo: { step: 4, peso: 'extrabold', altura: 1.05, espacamento: -0.02 },
    subtitulo: { step: 3, peso: 'bold', altura: 1.1, espacamento: -0.01 },
    destaque: { step: 2, peso: 'bold', altura: 1.2, espacamento: 0 },
    chamada: { step: 1, peso: 'semibold', altura: 1.3, espacamento: 0 },
    corpo: { step: 0, peso: 'regular', altura: 1.4, espacamento: 0 },
    legenda: { step: -1, peso: 'medio', altura: 1.4, espacamento: 0.01 },
    selo: { step: -1, peso: 'bold', altura: 1.2, espacamento: 0.08, caixa: 'uppercase' },
  },
};

// 4px base grid. Key = multiplier of 4 (Tailwind-like), value in px.
export const SPACING = {
  0: 0, '0-5': 2, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32,
  10: 40, 12: 48, 16: 64, 20: 80, 24: 96, 32: 128,
};

export const RADIUS = { nenhum: 0, sm: 4, md: 8, lg: 12, xl: 16, '2xl': 24, pilula: 999 };

export const BORDER_WIDTH = { fina: 1, media: 2, grossa: 4 };

// Shadows are tinted with the darkest brand blue instead of pure black.
export const SHADOWS = {
  sm: [{ x: 0, y: 1, blur: 2, spread: 0, alpha: 0.08 }],
  md: [{ x: 0, y: 4, blur: 12, spread: -2, alpha: 0.12 }],
  lg: [{ x: 0, y: 12, blur: 32, spread: -8, alpha: 0.18 }],
};

export const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280 };
export const CONTAINER_MAX = 1200;

// Canvas presets for Figma frames and HTML peças.
export const FORMATS = {
  'post-retrato': { largura: 1080, altura: 1350, margem: 80 },
  'post-quadrado': { largura: 1080, altura: 1080, margem: 80 },
  story: { largura: 1080, altura: 1920, margem: 96, 'margem-segura-topo': 250, 'margem-segura-base': 340 },
  slide: { largura: 1920, altura: 1080, margem: 120 },
  a4: { largura: 595, altura: 842, margem: 42, unidade: 'pt' },
  'email': { largura: 600, altura: null, margem: 32 },
};
