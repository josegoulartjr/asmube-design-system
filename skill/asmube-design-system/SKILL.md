---
name: asmube-design-system
description: Design system da ASMUBE (Associação dos Servidores Municipais de Betim) — cores, tipografia Montserrat, componentes, ícones, 6 padrões de layout de redes sociais e o arquivo Figma "ASMUBE 2026". Use SEMPRE que o pedido envolver a ASMUBE ou suas peças: posts, stories, carrosséis, slides, impressos, e-mail marketing, landing pages, banners, artes para eventos/benefícios/convênios, ou qualquer criação/edição no Figma da ASMUBE — mesmo que o usuário diga só "cria um post sobre X", "monta uma arte", "faz o layout do evento" sem citar o design system.
---

# ASMUBE Design System

Tudo o que você cria para a ASMUBE deve parecer da mesma família: mesmas cores, mesma fonte, mesmos componentes. Este guia existe para que cada peça nova já nasça consistente, sem o usuário precisar explicar a marca de novo.

## Fontes da verdade

| O quê | Onde |
|---|---|
| Figma (produção + design system) | arquivo **ASMUBE 2026** — `fileKey: rD9NfstRMYqhZDeKthxet9` — página **Design System** (`307:2`) e página **Ícones** (`496:3`) |
| Código / tokens | repositório `asmube-design-system` → `scripts/tokens.config.mjs` (fonte única; `npm run build` gera o resto) |
| Site de documentação | GitHub Pages do repositório (React + shadcn/ui) |

Crie peças SEMPRE dentro do arquivo ASMUBE 2026 (nunca crie arquivos Figma novos para a ASMUBE — a usuária organiza tudo nele). As páginas dos meses ("01 - JANEIRO"…) são produção: não altere nada existente nelas; crie a peça nova ao lado, em área livre.

## Regras da marca (as que mais erram)

1. **Cores oficiais:** azul `#303787` (principal) e verde `#6AA842` (destaque). Azul-marinho `#181C41` para fundos profundos. Vermelho/amarelo só para feedback (erro/alerta), nunca como cor de marca.
2. **Nunca texto branco sobre o verde** (contraste 2,88:1). Sobre verde, texto azul-marinho `#181C41`.
3. **Fonte:** Montserrat. Web: estilos `ASMUBE/Web/*`. Peças: estilos `ASMUBE/Peça/*` — o tamanho muda com o modo da coleção **Tipografia Peças** aplicado ao frame (Social 1080px · Slide 1920 · Impresso A4).
4. **Logo:** use o componente **Logo** (`486:678`, variantes Colorido / Sobre azul / Branco). Nunca redesenhe, recolora ou distorça o logo; não importe SVG solto e redimensione — se precisar importar, achate os vetores por cor antes (a usuária já viu o logo "zuado" por isso).
5. **Imagens:** nunca escolha, gere ou busque imagens. Use o componente **Espaço para imagem** (`501:183`) com a propriedade *Descrição* dizendo o que vai ali ("Foto: associada sorrindo com celular"). A usuária coloca as imagens à mão ou indica uma pasta — se indicar, aplique as imagens da pasta como preenchimento dos espaços.
6. **Cores sempre por variável** (coleções *Cores*, *Primitivos*, *Ícones ASMUBE*), nunca hex solto no Figma.
7. **Ícones:** página Ícones, 9.000 componentes `Estilo/Categoria/nome` (Line, Solid, Remix, Duo, Flat, Neon, Pop, Gradient — nomes em inglês). Um estilo por projeto. Sobre azul, aplique no frame o modo **Sobre azul** da coleção *Ícones ASMUBE*. Crédito obrigatório nos materiais publicados: "Ícones: Streamline (streamlinehq.com), CC BY 4.0".

## Como criar uma peça no Figma

1. Carregue as skills `figma-use` (e `figma-generate-design` para layouts) antes de chamar `use_figma`.
2. Escolha um dos **6 padrões de layout** em `references/layouts.md` conforme o objetivo (benefício/convênio → 1; campanha com várias infos → 2; institucional/depoimento → 3; carrossel educativo/dados → 4; impacto/lançamento → 5; evento/homenagem com foto → 6). Diga à usuária qual padrão escolheu e por quê, em uma linha.
3. Monte com os componentes existentes (IDs em `references/figma.md`): Forma orgânica, Chip de ícone, CTA peça, Número peça, Rodapé contato, Espaço para imagem, Logo, Selo, Botão, Card.
4. Crie o frame no tamanho do formato (post 1080×1350, quadrado 1080×1080, story 1080×1920, slide 1920×1080, A4 595×842) e aplique o modo certo de *Tipografia Peças*.
5. Texto: título curto com UMA palavra de destaque (verde no fundo escuro; azul/negrito no claro), no máximo 1 linha de apoio + CTA. Textos, datas e contatos que você não recebeu ficam como marcadores claros ("[data]", "(31) 0000-0000") — não invente informação real.
6. Valide com screenshot e ajuste sobreposições/cortes antes de entregar. Entregue o link do frame.

## Código (site, landing, e-mail)

Detalhes em `references/code.md`. Resumo: HTML/CSS usa `css/tokens.css` + `css/components.css` (classes `.botao`, `.card`, `.selo`…); React usa o site `site/` com shadcn/ui já tematizado (`--primary` = azul, `--accent` = verde); e-mail usa `email/_modelo.html` (build troca tokens por valores).

## Referências

- `references/tokens.md` — todas as cores (escalas 50–950), semânticas, tipografia, espaços, raios.
- `references/layouts.md` — os 6 padrões de layout com estrutura, medidas e quando usar.
- `references/figma.md` — IDs de páginas, coleções, variáveis, estilos e componentes; receitas de código Plugin API.
- `references/code.md` — como usar os tokens e componentes em HTML, React/shadcn e e-mail.
