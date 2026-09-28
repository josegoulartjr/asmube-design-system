# Código — usando o design system

Repositório: `github.com/josegoulartjr/asmube-design-system`. Fonte única: `scripts/tokens.config.mjs`. Depois de editar: `npm run build && npm test`.

## HTML / CSS puro (sites simples, landing pages)

```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/components.css">

<section class="secao secao--marca">
  <div class="container pilha">
    <span class="sobretitulo">Benefícios</span>
    <h2>Seu título aqui</h2>
    <a class="botao botao--secundario" href="#">Saiba mais</a>
  </div>
</section>
```

Classes: `.botao` (+ `--secundario --contorno --fantasma --claro --pequeno --grande --bloco`), `.selo` (+ `--destaque --marca --sucesso --alerta --erro`), `.sobretitulo`, `.card` (+ `--interativo --marca --destaque`), `.numero`, `.citacao`, `.alerta` (+ `--sucesso --alerta --erro`), `.campo` / `.entrada` / `.opcao`, `.cabecalho`, `.rodape`, `.secao` (+ `--suave --marca`), `.container`, `.pilha`, tipografia `.texto-*` e `.peca-*`. Peças em HTML: `.peca .peca--post-retrato` com `data-formato="social|slide|impresso"`.

Variáveis: `--cor-*` (primitivas e semânticas), `--texto-<estilo>-tamanho|altura|peso|espacamento`, `--peca-*`, `--espaco-*`, `--raio-*`, `--borda-*`, `--sombra-*`, `--icone-*` (use `data-icones="sobre-azul"` sobre fundo azul).

## React + shadcn/ui

O site `site/` (Vite + React + Tailwind v4 + shadcn/ui) já tem o tema ASMUBE em `site/src/index.css`:

| shadcn | ASMUBE |
|---|---|
| `--primary` | azul `#303787` |
| `--accent` / `--secondary` | verde `#6AA842` / azul-50 |
| `--destructive` | vermelho-600 |
| `--ring` | azul-600 |
| `--radius` | 12px (pílula nos botões) |
| fonte | Montserrat |

Para um projeto novo: copie o bloco `:root` de `site/src/index.css` e use `npx shadcn@latest add <componente>`. O botão verde usa `variant="secondary"` com texto azul-marinho (nunca branco sobre verde).

## E-mail marketing

Edite `email/_modelo.html` usando `{{cor.azul.800}}`, `{{texto.h2}}`, `{{raio.pilula}}`, `{{fonte}}`; o build gera `email/modelo-email.html` com valores literais (clientes de e-mail não entendem variáveis CSS). Logos em PNG (`assets/logo/*.png`) hospedados em URL pública.
