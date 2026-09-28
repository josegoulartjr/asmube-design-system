// Renders the token sections of the documentation page from docs/tokens.js.
(function renderDocs() {
  const T = window.ASMUBE_TOKENS;
  if (!T) {
    document.getElementById('paletas').textContent =
      'Tokens não encontrados. Rode "npm run build" na pasta do projeto.';
    return;
  }

  const el = (tag, attrs = {}, children = []) => {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'style') node.style.cssText = v;
      else if (k === 'text') node.textContent = v;
      else node.setAttribute(k, v);
    });
    children.forEach((c) => node.append(c));
    return node;
  };

  const textOn = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    const lum = ((n >> 16) & 255) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114;
    return lum > 150 ? T.ramps.neutro[900] : '#FFFFFF';
  };

  const copy = (value, button) => {
    navigator.clipboard?.writeText(value).then(
      () => {
        const previous = button.title;
        button.title = 'Copiado!';
        setTimeout(() => (button.title = previous), 1200);
      },
      () => console.warn('Não foi possível copiar', value),
    );
  };

  // Paletas
  const paletas = document.getElementById('paletas');
  Object.entries(T.ramps).forEach(([name, steps]) => {
    const strip = el('div', { class: 'doc-rampa__faixa' });
    Object.entries(steps).forEach(([step, hex]) => {
      const isBrand = T.anchors[name] === Number(step);
      const btn = el('button', { type: 'button', title: `Copiar ${hex}`, style: `background:${hex};color:${textOn(hex)}` }, [
        el('strong', { text: `${isBrand ? '● ' : ''}${step}` }),
        el('span', { text: hex }),
      ]);
      btn.className = 'doc-cor';
      btn.addEventListener('click', () => copy(hex, btn));
      strip.append(btn);
    });
    const tag = T.anchors[name] ? `cor oficial no ${T.anchors[name]}` : 'tons neutros com leve tom azul';
    paletas.append(el('div', {}, [el('div', { class: 'doc-rampa__cab' }, [el('strong', { text: name }), el('span', { class: 'doc-sem__ref', text: tag })]), strip]));
  });

  // Semânticas
  const sem = document.getElementById('semanticas');
  Object.entries(T.semantic).forEach(([group, tokens]) => {
    sem.append(el('div', { class: 'doc-sem-grupo', text: group }));
    Object.entries(tokens).forEach(([name, { ref, hex }]) => {
      sem.append(el('div', { class: 'doc-sem' }, [
        el('span', { class: 'doc-sem__amostra', style: `background:${hex}` }),
        el('div', {}, [el('div', { class: 'doc-sem__nome', text: `cor-${group}-${name}` }), el('div', { class: 'doc-sem__ref', text: `${ref} · ${hex}` })]),
      ]));
    });
  });

  // Contraste
  const hexOf = (path) => {
    const [g, n] = path.split('.');
    return T.semantic[g][n].hex;
  };
  const table = document.getElementById('contraste');
  table.append(el('thead', {}, [el('tr', {}, ['Amostra', 'Texto', 'Fundo', 'Contraste', 'Nível'].map((h) => el('th', { text: h })))]));
  const tbody = el('tbody');
  T.contrast.forEach(({ fg, bg, ratio, nivel, proibido }) => {
    tbody.append(el('tr', {}, [
      el('td', {}, [el('span', { class: 'doc-tabela__prova', style: `background:${hexOf(bg)};color:${hexOf(fg)}`, text: 'Aa' })]),
      el('td', { text: fg }), el('td', { text: bg }), el('td', { text: `${ratio.toFixed(2)}:1` }),
      el('td', { text: proibido ? '✕ Não usar para texto' : nivel }),
    ]));
  });
  table.append(tbody);

  // Tipografia
  const renderScale = (container, styles, unit, sample) => {
    container.replaceChildren();
    Object.entries(styles).forEach(([name, s]) => {
      const factor = unit === 'pt' ? 96 / 72 : 1;
      const px = Math.min(s.tamanho * factor, 96);
      container.append(el('div', { class: 'doc-escala__item' }, [
        el('div', { class: 'doc-escala__meta' }, [el('strong', { text: name }), el('span', { text: `${s.tamanho}${unit} / ${s.alturaLinha}${unit} · ${s.peso}${s.espacamento ? ` · ${s.espacamento}em` : ''}` })]),
        el('div', { class: 'doc-escala__amostra', style: `font-size:${px}px;line-height:1.2;font-weight:${s.peso};letter-spacing:${s.espacamento}em;text-transform:${s.caixa}`, text: sample }),
      ]));
    });
  };
  renderScale(document.getElementById('escala-web'), T.webType, 'px', 'Associação forte, categoria unida');

  const abas = document.getElementById('abas-formato');
  const escalaPeca = document.getElementById('escala-peca');
  const selectFormat = (formato) => {
    abas.querySelectorAll('button').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.formato === formato)));
    const { unidade, estilos } = T.displayType[formato];
    renderScale(escalaPeca, estilos, unidade, 'Juntos somos mais fortes');
  };
  Object.entries(T.displayType).forEach(([formato, { descricao }]) => {
    const b = el('button', { type: 'button', role: 'tab', title: descricao, text: formato }, []);
    b.dataset.formato = formato;
    b.addEventListener('click', () => selectFormat(formato));
    abas.append(b);
  });
  selectFormat(Object.keys(T.displayType)[0]);

  // Espaços, raios e sombras
  const espacos = document.getElementById('espacamentos');
  Object.entries(T.spacing).forEach(([k, v]) => {
    espacos.append(el('div', { class: 'doc-espaco' }, [el('span', { text: `espaco-${k} · ${v}px` }), el('span', { class: 'doc-espaco__barra', style: `width:${v}px` })]));
  });
  const raios = document.getElementById('raios');
  Object.entries(T.radius).forEach(([k, v]) => raios.append(el('div', { class: 'doc-caixa', style: `border-radius:${Math.min(v, 60)}px`, text: `raio-${k} · ${v}px` })));
  const sombras = document.getElementById('sombras');
  Object.keys(T.shadows).forEach((k) => sombras.append(el('div', { class: 'doc-caixa', style: `border:0;border-radius:16px;box-shadow:var(--sombra-${k})`, text: `sombra-${k}` })));
})();
