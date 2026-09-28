# Figma — ASMUBE 2026

`fileKey: rD9NfstRMYqhZDeKthxet9` · URL: https://www.figma.com/design/rD9NfstRMYqhZDeKthxet9

IDs registrados em 2026-09-28. Se algum não existir mais, redescubra pelo nome (os nomes são estáveis) e avise a usuária.

## Páginas

| Página | ID | Uso |
|---|---|---|
| ASSETS | `0:1` | assets antigos da usuária (tem um componente "LOGO ASMUBE" `112:52`, vetor branco achatado) — não mexer |
| Design System | `307:2` | fundamentos, componentes, modelos, padrões de layout |
| Ícones | `496:3` | 9.000 ícones (8 seções por estilo) |
| 01 - JANEIRO … 09 - SETEMBRO, NEWSLETTER, ONBOARDING | — | produção — não alterar o que existe |

Na página Design System, os nós `307:8` (frame "Logo"), `480:8`, `480:10` são da usuária — não mexer.

## Seções na página Design System

| Seção | ID | Conteúdo |
|---|---|---|
| ASMUBE · Fundamentos | `486:465` | escalas de cor, semânticas, tipografia, espaços |
| ASMUBE · Componentes | `486:827` (board `486:667`) | componentes de UI + bloco Ícones |
| ASMUBE · Modelos | `490:425` | post retrato `490:149`, quadrado `490:204`, story `490:258`, slide `490:313`, A4 `490:368` |
| ASMUBE · Padrões de layout | `500:132` (board `500:133`) | elementos de peças |

## Componentes

| Componente | ID | Propriedades |
|---|---|---|
| Logo | `486:678` | Versão = Colorido · Sobre azul · Branco |
| Botão | `486:891` | Estilo (Primário, Secundário, Contorno, Fantasma, Claro) × Tamanho (P, M, G) × Estado (Padrão, Desabilitado); Rótulo; Mostrar ícone; Ícone (swap) |
| Selo | `487:161` | Tipo (Padrão, Destaque, Marca, Sucesso, Atenção, Erro); Texto |
| Sobretítulo | `487:162` | Texto |
| Alerta | `487:184` | Tipo (Info, Sucesso, Atenção, Erro); Título; Mensagem; Mostrar ícone |
| Card | `489:167` | Tipo (Padrão, Destaque, Marca); Título; Texto; Link; Mostrar selo; Mostrar link; Mostrar ícone; Ícone |
| Campo | `489:191` | Estado (Padrão, Foco, Erro, Desabilitado); Rótulo; Valor; Ajuda; Mostrar ajuda |
| Número | `489:196` | Valor; Rótulo (web) |
| Citação | `489:199` | Frase; Autor |
| Forma orgânica | `500:151` | Forma (Gota, Onda, Bolha) — recolorir via variável |
| Chip de ícone | `500:170` | Estilo (Verde, Azul, Branco); Ícone |
| CTA peça | `500:189` | Estilo (Verde, Azul, Branco); Texto; Mostrar seta |
| Número peça | `500:200` | Tema (Claro, Escuro); Prefixo; Valor; Sufixo; Mostrar prefixo |
| Rodapé contato | `500:221` | Tema (Claro, Escuro); Rótulo; Telefone; Endereço; Mostrar endereço |
| Espaço para imagem | `501:183` | Forma (Retângulo, Quadrado, Círculo); Descrição |

## Variáveis

| Coleção | ID | Modos |
|---|---|---|
| Primitivos | `VariableCollectionId:485:3` | Valor — `cor/<escala>/<passo>`, `cor/branco` (ocultas no seletor) |
| Cores | `VariableCollectionId:485:60` | Claro — `fundo/*`, `texto/*`, `borda/*`, `acao/*`, `feedback/*` |
| Espaços | `VariableCollectionId:485:105` | Valor — `espaco/*`, `raio/*`, `borda/*` |
| Tipografia Peças | `VariableCollectionId:485:131` | Social `485:3` · Slide `485:4` · Impresso `485:5` |
| Ícones ASMUBE | `VariableCollectionId:496:4` | Sobre claro `496:0` · Sobre azul `496:1` |
| TEXT | — | da usuária (strings) — não mexer |

Estilos: texto `ASMUBE/Web/*` (11) e `ASMUBE/Peça/*` (8, ligados a Tipografia Peças); sombras `ASMUBE/Sombra/SM|MD|LG`. Os estilos antigos em Gotham ("titulo", "subtitulo", "texto corrido") e paint styles antigos são da usuária — não alterar.

## Ícones úteis (Line)

stethoscope `497:10927` · whatsapp `497:8917` · arrow-up-1 `497:4046` (gire −90° para "direita") · information-circle `497:4704` · check `497:4169` · warning-triangle `497:5539` · calendar-star `497:4188` · heart `497:4572` · home-3 `497:4636` · location-pin-3 `497:6630` · mail-send-envelope `497:7436` · dollar-coin `497:9329` · graduation-cap `497:10295` · justice-scale-1 `497:9394` · business-handshake `497:9124` · gift `497:9335` · shield-check `497:5206` · user-multiple-group `497:5461` · discount-percent-circle `497:9241` · pictures-folder-memories `497:5074`.

Outro estilo: mesmo nome trocando o prefixo (`Duo/Health/stethoscope`). Busque com `page.findAllWithCriteria({types:['COMPONENT']})` filtrando por nome.

## Receitas Plugin API

```js
// variáveis por nome
const vars = await figma.variables.getLocalVariablesAsync();
const sem = n => vars.find(v => v.name === n && v.variableCollectionId === 'VariableCollectionId:485:60');
const paint = v => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', v);

// estilo de texto
const styles = await figma.getLocalTextStylesAsync();
await text.setTextStyleIdAsync(styles.find(s => s.name === 'ASMUBE/Peça/Título').id);

// modo de tipografia do frame (post)
const tp = await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:485:131');
frame.setExplicitVariableModeForCollection(tp, '485:3'); // Social

// ícones brancos sobre azul
const ic = await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:496:4');
frame.setExplicitVariableModeForCollection(ic, '496:1');

// instância de componente (de qualquer página)
const logo = (await figma.getNodeByIdAsync('486:678')).children.find(c => c.name === 'Versão=Sobre azul');
const inst = logo.createInstance(); inst.rescale(360 / inst.width);
```

Carregue a Montserrat antes de editar texto (`Regular`, `Medium`, `SemiBold`, `Bold`, `ExtraBold`). Faça uma chamada `use_figma` por vez (nada em paralelo) e confira com screenshot.
