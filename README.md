# ASMUBE Design System

Tokens, componentes e modelos da ASMUBE — Associação dos Servidores Municipais de Betim.

- **Site (documentação interativa):** https://josegoulartjr.github.io/asmube-design-system/ — React + shadcn/ui com o tema ASMUBE.
- **Figma:** arquivo *ASMUBE 2026* → páginas **Design System** (Fundamentos, Componentes, Modelos, Padrões de layout) e **Ícones**.
- **Skill para o Claude:** `skill/asmube-design-system/` (ver abaixo).
- **Código:** a fonte única de verdade é `scripts/tokens.config.mjs`.

## Skill para o Claude

A skill ensina o Claude a criar qualquer material da ASMUBE já dentro da marca: cores e regras (ex.: nunca texto branco sobre o verde), tipografia, IDs do Figma, os 6 padrões de layout e a regra de imagens (sempre espaço reservado — a equipe define as imagens).

- **Claude Code:** copie `skill/asmube-design-system/` para `~/.claude/skills/`. Depois é só pedir ("cria um post da ASMUBE sobre o evento X") ou digitar `/asmube-design-system`.
- **claude.ai:** *Configurações → Recursos → Skills → Enviar skill* e escolha `skill/asmube-design-system.zip`.
- Ao mudar tokens, `npm run build` regenera `references/tokens.md` e `references/layouts.md`; recompacte o `.zip` e copie a pasta de novo.

## Site com shadcn/ui

```bash
npm run site:dev     # gera tokens e abre o site local
npm run site:build   # gera tokens e compila para site/dist
```

O tema shadcn aponta para as variáveis ASMUBE em `site/src/index.css` (`--primary` = azul, `--secondary` = verde com texto azul-marinho). A cada `git push` na `main`, o GitHub Actions (`.github/workflows/pages.yml`) gera os tokens, roda os testes, compila e publica no GitHub Pages.

## Uso rápido

```bash
npm run build   # regenera tokens.css, tokens.json, docs e e-mail
npm test        # confere paletas, escalas, contraste e saídas
```

Abra `docs/index.html` no navegador para ver o guia completo.

Em qualquer página HTML:

```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/components.css">
```

## Estrutura

| Pasta / arquivo | O que é |
|---|---|
| `scripts/tokens.config.mjs` | **Edite aqui.** Cores da marca, cores semânticas, escalas, espaços |
| `css/tokens.css` | Variáveis CSS geradas (`--cor-*`, `--texto-*`, `--peca-*`, `--espaco-*`, `--raio-*`) |
| `css/base.css`, `css/components.css` | Base e componentes (botão, selo, card, campo, alerta, cabeçalho, rodapé, peça) |
| `tokens/asmube.tokens.json` | Tokens no formato W3C (Tokens Studio / Style Dictionary) |
| `email/modelo-email.html` | Modelo de e-mail marketing pronto (gerado de `email/_modelo.html`) |
| `docs/` | Guia visual + `contraste.md` (relatório WCAG) |
| `assets/logo/` | Logos em SVG e PNG: colorido, sobre azul, branco |

## Decisões

**Cores.** Duas cores oficiais: azul `#303787` (escala `azul`, passo 800) e verde `#6AA842` (escala `verde`, passo 500). Os demais tons são gerados em OKLCH, mantendo o matiz. O `azul-950` é o `#181C41` já usado nas peças do Figma. Vermelho e amarelo existem apenas para feedback (erro/alerta).

**Regra do verde.** Texto branco sobre o verde tem contraste 2,88:1 — reprovado. Sobre o verde, o texto é sempre azul-marinho (`texto/sobre-destaque`, 5,69:1).

**Tipografia — Montserrat em duas escalas.**
- *Web* (site, landing, e-mail): base 16px, razão 1,25 (Terça Maior), entrelinha na grade de 4px.
- *Peças* (posts, slides, impressos): razão 1,333 (Quarta Justa), base por formato — Social 32px · Slide 36px · Impresso 11pt. No Figma, é a coleção **Tipografia Peças**; troque o modo do frame e os estilos `ASMUBE/Peça/*` se ajustam.

**Espaços.** Grade de 4px; o nome é o multiplicador (`espaco-4` = 16px).

## Ícones

No Figma *ASMUBE 2026*, página **Ícones**: 1.125 ícones × 8 estilos (9.000 componentes) — Line, Solid, Remix, Duo, Flat, Neon, Pop, Gradient — recoloridos com a paleta. Nomes: `Estilo/Categoria/nome` (ex.: `Duo/Health/stethoscope`); palavras-chave na descrição. Botão, Card e Alerta têm espaço de ícone (propriedade "Mostrar ícone").

- Cores ligadas à coleção **Ícones ASMUBE** (`icone/primario`, `icone/suave`, …) com dois modos: *Sobre claro* e *Sobre azul* (inverte para uso sobre o azul da marca).
- No código: variáveis `--icone-*`; use `data-icones="sobre-azul"` no container (já automático em `.secao--marca` e `.card--marca`).
- **Crédito obrigatório (CC BY 4.0):** "Ícones: Streamline (streamlinehq.com), CC BY 4.0" — no rodapé do site ou na página de créditos.

## Para mudar uma cor ou tamanho

1. Edite `scripts/tokens.config.mjs`.
2. `npm run build && npm test`.
3. No Figma, atualize a variável correspondente (mesmo nome, com `/` no lugar de `-`: `--cor-fundo-marca` → `fundo/marca`).

## Pendências

- O e-mail aponta para `https://SEU-DOMINIO/...` (logos) e `https://SEU-LINK`: troque pelos endereços reais antes de enviar.
- Números, datas e textos dos exemplos são ilustrativos.
- O SVG do logo usa `#32307D` / `#6DA42E`, levemente diferentes das cores oficiais (`#303787` / `#6AA842`). Vale alinhar o arquivo do logo.
