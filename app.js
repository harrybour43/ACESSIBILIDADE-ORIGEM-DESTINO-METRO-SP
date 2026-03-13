/**
 * ============================================================================
 * PROJETO: PORTA CERTA SP
 * ARQUIVO: app.js
 * DESCRIÇÃO: Motor Lógico Mobile-First (Simulador Desktop + Edição Não-Destrutiva)
 * VERSÃO: 6.2.1 (Correção de Linha de Carrossel)
 * ============================================================================
 */

const AppState = {
  idiomaAtual: "pt",
  modoFonteGrandeAtivo: false,
  temaClaroAtivo: false,
  dicionarioTextos: {},
  rota: { preferencia: null, linhaOrigem: null, estacaoOrigem: null, linhaDestino: null, estacaoDestino: null }
};

const GerenciadorFluxo = {
  
  verificarCalculoFinal: function() {
    if (AppState.rota.preferencia && AppState.rota.estacaoOrigem && AppState.rota.estacaoDestino) {
      document.querySelectorAll(".step-panel").forEach(p => p.classList.add("hidden"));
      document.getElementById("step-calcular-final").classList.remove("hidden");
      setTimeout(() => { document.querySelector('.main-content').scrollTop = 9999; }, 100);
    }
  },

  editarEtapa: function(etapa) {
    document.querySelectorAll(".step-panel").forEach(p => p.classList.add("hidden"));
    document.getElementById("resultado-box").classList.add("hidden");
    
    if (etapa === 'pref') document.getElementById("step-pref").classList.remove("hidden");
    if (etapa === 'linha-origem' || etapa === 'origem') {
      document.getElementById("step-linha-origem").classList.remove("hidden");
      if(!document.getElementById("carousel-linha-origem").innerHTML) GerenciadorUI.renderizarCarrosselLinhas('origem');
    }
    if (etapa === 'linha-destino' || etapa === 'destino') {
      document.getElementById("step-linha-destino").classList.remove("hidden");
      if(!document.getElementById("carousel-linha-destino").innerHTML) GerenciadorUI.renderizarCarrosselLinhas('destino');
    }
  },

  selecionarPreferencia: function(pref) {
    AppState.rota.preferencia = pref;
    const t = AppState.dicionarioTextos[AppState.idiomaAtual];
    let labelPref = pref === 'elevador' ? t.seletores.optElevador : (pref === 'rolante' ? t.seletores.optRolante : t.seletores.optFixa);
    
    document.getElementById("stack-val-pref").innerText = labelPref;
    document.getElementById("step-pref").classList.add("hidden");
    document.getElementById("stack-pref").classList.remove("hidden");

    if (!AppState.rota.linhaOrigem) {
      document.getElementById("step-linha-origem").classList.remove("hidden");
      GerenciadorUI.renderizarCarrosselLinhas('origem');
    } else {
      this.verificarCalculoFinal();
    }
  },

  selecionarLinhaOrigem: function(idLinha) {
    if (AppState.rota.linhaOrigem !== idLinha) {
      AppState.rota.estacaoOrigem = null;
      document.getElementById("stack-val-origem").innerText = "--";
    }
    AppState.rota.linhaOrigem = idLinha;
    const t = AppState.dicionarioTextos[AppState.idiomaAtual];
    
    document.getElementById("stack-origem").classList.remove("hidden");
    document.getElementById("stack-val-origem").innerText = t.linhas["l"+idLinha];
    document.getElementById("step-linha-origem").classList.add("hidden");
    
    document.getElementById("step-estacao-origem").classList.remove("hidden");
    GerenciadorUI.renderizarCarrosselEstacoes('origem', idLinha);
  },

  selecionarEstacaoOrigem: function(idEstacao) {
    AppState.rota.estacaoOrigem = idEstacao;
    const nomeEstacao = MetroData.catalogoEstacoes[idEstacao].nome;
    const t = AppState.dicionarioTextos[AppState.idiomaAtual];
    
    document.getElementById("stack-val-origem").innerText = `${t.linhas["l"+AppState.rota.linhaOrigem]} - ${nomeEstacao}`;
    document.getElementById("step-estacao-origem").classList.add("hidden");
    
    if (!AppState.rota.linhaDestino) {
      document.getElementById("step-linha-destino").classList.remove("hidden");
      GerenciadorUI.renderizarCarrosselLinhas('destino');
    } else {
      this.verificarCalculoFinal();
    }
  },

  selecionarLinhaDestino: function(idLinha) {
    if (AppState.rota.linhaDestino !== idLinha) {
      AppState.rota.estacaoDestino = null;
      document.getElementById("stack-val-destino").innerText = "--";
    }
    AppState.rota.linhaDestino = idLinha;
    const t = AppState.dicionarioTextos[AppState.idiomaAtual];
    
    document.getElementById("stack-destino").classList.remove("hidden");
    document.getElementById("stack-val-destino").innerText = t.linhas["l"+idLinha];
    document.getElementById("step-linha-destino").classList.add("hidden");
    
    document.getElementById("step-estacao-destino").classList.remove("hidden");
    GerenciadorUI.renderizarCarrosselEstacoes('destino', idLinha);
  },

  selecionarEstacaoDestino: function(idEstacao) {
    AppState.rota.estacaoDestino = idEstacao;
    const nomeEstacao = MetroData.catalogoEstacoes[idEstacao].nome;
    const t = AppState.dicionarioTextos[AppState.idiomaAtual];
    
    document.getElementById("stack-val-destino").innerText = `${t.linhas["l"+AppState.rota.linhaDestino]} - ${nomeEstacao}`;
    document.getElementById("step-estacao-destino").classList.add("hidden");
    
    this.verificarCalculoFinal();
  }
};

const CalculadoraRota = {
  encontrarCaminho: function (idLinhaOrigem, idLinhaDestino) {
    if (idLinhaOrigem == idLinhaDestino) return [parseInt(idLinhaOrigem)];
    let filaBusca = [[parseInt(idLinhaOrigem)]];
    let linhasVisitadas = new Set([parseInt(idLinhaOrigem)]);
    while (filaBusca.length > 0) {
      let caminhoAtual = filaBusca.shift();
      let linhaAtual = caminhoAtual[caminhoAtual.length - 1];
      for (let vizinho in MetroData.conexoes[linhaAtual]) {
        let linhaVizinha = parseInt(vizinho);
        if (!linhasVisitadas.has(linhaVizinha)) {
          linhasVisitadas.add(linhaVizinha);
          let novoCaminho = [...caminhoAtual, linhaVizinha];
          if (linhaVizinha == idLinhaDestino) return novoCaminho;
          filaBusca.push(novoCaminho);
        }
      }
    }
    return null;
  },

  determinarSentidoViagem: function (idEstacaoOrigem, idEstacaoDestino) {
    return parseInt(idEstacaoOrigem) < parseInt(idEstacaoDestino) ? "SENTIDO_POSITIVO" : "SENTIDO_NEGATIVO";
  },

  obterPortaAlvo: function (dadosEstacaoDestino, sentidoViagem, preferenciaSaida) {
    const chaveSentido = sentidoViagem === "SENTIDO_POSITIVO" ? "sentidoPositivo" : "sentidoNegativo";
    if (!dadosEstacaoDestino.acessibilidade || !dadosEstacaoDestino.acessibilidade[chaveSentido]) return null;
    return dadosEstacaoDestino.acessibilidade[chaveSentido][preferenciaSaida];
  },

  extrairVagaoEPorta: function (dadoBruto, sentidoViagem) {
    if (!dadoBruto || dadoBruto === "Pendente" || dadoBruto === "Inexistente") return null;
    const layoutDirecional = MetroData.layoutVagoes[sentidoViagem] || {};
    let numeroPorta = null;
    let stringVagaoInfo = null;

    const matchNumero = dadoBruto.match(/\d{2}/);
    if (matchNumero && !dadoBruto.includes("Vagão")) numeroPorta = matchNumero[0];
    else if (dadoBruto.includes("Vagão")) stringVagaoInfo = dadoBruto;

    if (numeroPorta && !stringVagaoInfo) {
      const infoFisica = layoutDirecional[numeroPorta];
      if (infoFisica) return { v: infoFisica.vagao, p: infoFisica.porta };
      let digitoVagao = parseInt(numeroPorta.charAt(0));
      let digitoPorta = parseInt(numeroPorta.charAt(1));
      if (sentidoViagem === "SENTIDO_POSITIVO") return { v: digitoVagao, p: (digitoPorta >= 5 && digitoPorta <= 8) ? (9 - digitoPorta) : 0 };
      else return { v: (7 - digitoVagao), p: (digitoPorta >= 1 && digitoPorta <= 4) ? digitoPorta : 0 };
    } else if (stringVagaoInfo) {
      const matchPosicao = stringVagaoInfo.match(/Vagão (\d), Porta (\d)/);
      if (matchPosicao) return { v: parseInt(matchPosicao[1]), p: parseInt(matchPosicao[2]) };
    }
    return null;
  },
};

const FormatadorUI = {
  montarTextoPorta: function (dadoBrutoBanco, sentidoViagem) {
    if (!dadoBrutoBanco || dadoBrutoBanco === "Pendente" || dadoBrutoBanco === "Inexistente") return dadoBrutoBanco;
    const txt = AppState.dicionarioTextos[AppState.idiomaAtual].textos;
    const posicaoFisica = CalculadoraRota.extrairVagaoEPorta(dadoBrutoBanco, sentidoViagem);
    let resultadoFormatado = [];

    if (posicaoFisica) {
      let numeroVisivel = null;
      const matchNum = dadoBrutoBanco.match(/\d{2}/);
      if (matchNum) numeroVisivel = matchNum[0];
      if (!numeroVisivel) numeroVisivel = sentidoViagem === "SENTIDO_POSITIVO" ? `${posicaoFisica.v}${9 - posicaoFisica.p}` : `${7 - posicaoFisica.v}${posicaoFisica.p}`;
      const langsInvertidas = ["zh", "ja", "ko"];
      if (langsInvertidas.includes(AppState.idiomaAtual)) resultadoFormatado.push(`${numeroVisivel}${txt.porta}`);
      else resultadoFormatado.push(`${txt.porta} ${numeroVisivel}`);
      let textoVagao = `(${txt.vagao} ${posicaoFisica.v}, ${txt.porta} ${posicaoFisica.p})`;
      if (langsInvertidas.includes(AppState.idiomaAtual)) textoVagao = `(${posicaoFisica.v}${txt.vagao} ${posicaoFisica.p}${txt.porta})`;
      resultadoFormatado.push(textoVagao);
    } else if (dadoBrutoBanco.includes("Porta")) {
      resultadoFormatado.push(dadoBrutoBanco.replace("Porta", txt.porta));
    }
    return resultadoFormatado.length > 0 ? resultadoFormatado.join(" ") : dadoBrutoBanco;
  },
};

const GerenciadorUI = {
  iniciar: function () {
    this.popularListaMapeadas();
    if (localStorage.getItem("pc_theme") === "light") {
      AppState.temaClaroAtivo = true;
      document.body.classList.add("light-mode");
    }
    if (sessionStorage.getItem("portaCertaModal") === "lido") {
      this.exibirTela("view-main");
      document.getElementById("global-nav").classList.remove("hidden");
    } else {
      this.exibirTela("view-splash");
    }
  },

  concluirIntroducao: function () {
    sessionStorage.setItem("portaCertaModal", "lido");
    this.exibirTela("view-main");
    document.getElementById("global-nav").classList.remove("hidden");
  },

  exibirTela: function (idTela) {
    document.querySelectorAll(".app-view").forEach((tela) => tela.classList.remove("active"));
    const telaAlvo = document.getElementById(idTela);
    if(telaAlvo) telaAlvo.classList.add("active");
  },

  navegarPara: function (tela) {
    document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
    if (tela === 'home') {
      this.exibirTela("view-main");
      document.getElementById("nav-home").classList.add("active");
    } else if (tela === 'mapped') {
      this.exibirTela("view-mapped");
      document.getElementById("nav-stations").classList.add("active");
    } else if (tela === 'settings') {
      this.exibirTela("view-settings");
      document.getElementById("nav-settings").classList.add("active");
    } else if (tela === 'tutorial') {
      this.exibirTela("view-tutorial");
      document.getElementById("nav-settings").classList.add("active");
    }
  },

  habilitarDragScroll: function(slider) {
    let isDown = false; let startX; let scrollLeft;
    slider.addEventListener('mousedown', (e) => {
      isDown = true; startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => { isDown = false; });
    slider.addEventListener('mouseup', () => { isDown = false; });
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return; e.preventDefault();
      const x = e.pageX - slider.offsetLeft; const walk = (x - startX) * 2; 
      slider.scrollLeft = scrollLeft - walk;
    });
  },

  renderizarCarrosselLinhas: function(tipo) {
    const container = document.getElementById(`carousel-linha-${tipo}`);
    if(!container) return;
    container.innerHTML = "";
    const t = AppState.dicionarioTextos[AppState.idiomaAtual];

    MetroData.linhasAtivas.forEach(linha => {
      const btn = document.createElement("button");
      btn.className = "t-car";
      btn.style.borderColor = `var(--l${linha})`;
      btn.style.minWidth = "80px"; btn.style.height = "40px";
      btn.style.margin = "10px 5px 25px 5px"; btn.style.borderRadius = "8px";

      const label = document.createElement("div");
      label.innerText = t.linhas["l"+linha] || `L${linha}`;
      label.style.position = "absolute"; label.style.bottom = "-25px";
      label.style.left = "50%"; label.style.transform = "translateX(-50%)";
      label.style.fontSize = "0.75rem"; label.style.fontWeight = "bold";
      label.style.whiteSpace = "nowrap"; label.style.color = "var(--text-main)";

      btn.innerHTML = `<div class="t-door"></div><div class="t-door"></div>`;
      btn.appendChild(label);

      btn.onclick = () => {
        if (tipo === 'origem') GerenciadorFluxo.selecionarLinhaOrigem(linha);
        else GerenciadorFluxo.selecionarLinhaDestino(linha);
      };
      container.appendChild(btn);
    });
    this.habilitarDragScroll(container);
  },

  renderizarCarrosselEstacoes: function(tipo, idLinha) {
    const container = document.getElementById(`carousel-estacao-${tipo}`);
    if(!container) return;
    container.innerHTML = "";
    
    const estacoes = Object.values(MetroData.catalogoEstacoes).filter(e => e.linha == idLinha);
    const varCor = `var(--l${idLinha})`;
    const t = AppState.dicionarioTextos[AppState.idiomaAtual];

    container.style.position = "relative";
    container.style.paddingTop = "20px";

    // Cálculo exato para a linha ligar o meio do primeiro e último ponto
    const larguraItem = 92; // 80px do minWidth + 12px do gap
    const totalLargura = (estacoes.length - 1) * larguraItem;

    const linhaFundo = document.createElement("div");
    linhaFundo.style.position = "absolute";
    linhaFundo.style.top = "28px";
    linhaFundo.style.left = "40px";
    linhaFundo.style.width = `${totalLargura}px`;
    linhaFundo.style.height = "4px";
    linhaFundo.style.backgroundColor = varCor;
    linhaFundo.style.zIndex = "0";
    container.appendChild(linhaFundo);

    estacoes.forEach(est => {
      const wrap = document.createElement("div");
      wrap.style.display = "flex"; wrap.style.flexDirection = "column"; wrap.style.alignItems = "center";
      wrap.style.gap = "12px"; wrap.style.minWidth = "80px";
      wrap.style.cursor = est.mapeada ? "pointer" : "not-allowed";
      wrap.style.opacity = est.mapeada ? "1" : "0.4";
      wrap.style.zIndex = "1"; wrap.style.transition = "transform 0.1s";

      if(est.mapeada) {
        wrap.addEventListener('mousedown', () => wrap.style.transform = "scale(0.9)");
        wrap.addEventListener('mouseup', () => wrap.style.transform = "scale(1)");
      }

      const dot = document.createElement("div");
      dot.style.width = "20px"; dot.style.height = "20px"; dot.style.borderRadius = "50%";
      dot.style.border = `4px solid ${varCor}`; dot.style.backgroundColor = "var(--bg-app)";
      
      const label = document.createElement("div");
      label.innerText = est.nome + (est.mapeada ? "" : `\n${t.textos.emBreve}`);
      label.style.fontSize = "0.75rem"; label.style.textAlign = "center"; label.style.fontWeight = "bold";
      label.style.color = "var(--text-main)"; label.style.whiteSpace = "pre-wrap";

      wrap.appendChild(dot); wrap.appendChild(label);

      if (est.mapeada) {
        wrap.onclick = () => {
          if (tipo === 'origem') GerenciadorFluxo.selecionarEstacaoOrigem(est.id);
          else GerenciadorFluxo.selecionarEstacaoDestino(est.id);
        };
      }
      container.appendChild(wrap);
    });
    this.habilitarDragScroll(container);
  },

  alternarTema: function () {
    AppState.temaClaroAtivo = !AppState.temaClaroAtivo;
    document.body.classList.toggle("light-mode", AppState.temaClaroAtivo);
    localStorage.setItem("pc_theme", AppState.temaClaroAtivo ? "light" : "dark");
  },

  mudarIdioma: function (codigoIdioma) {
    AppState.idiomaAtual = codigoIdioma;
    const t = AppState.dicionarioTextos[codigoIdioma];
    document.body.setAttribute("dir", codigoIdioma === "ar" ? "rtl" : "ltr");
    window.location.reload(); 
  },

  alternarTamanhoFonte: function () {
    AppState.modoFonteGrandeAtivo = !AppState.modoFonteGrandeAtivo;
    document.body.classList.toggle("large-font", AppState.modoFonteGrandeAtivo);
  },

  liberarAcessoModal: function () {
    const btn = document.getElementById("btn-modal");
    if(btn) btn.disabled = !document.getElementById("check-ciencia").checked;
  },

  abrirModalAcessibilidade: function () {
    const modal = document.getElementById("acessibilidade-modal");
    if(modal) modal.style.display = "flex";
  },

  fecharModalAcessibilidade: function () {
    const modal = document.getElementById("acessibilidade-modal");
    if(modal) modal.style.display = "none";
  },

  popularListaMapeadas: function () {
    const listaL1 = document.getElementById("ul-mapeadas-l1");
    const listaL3 = document.getElementById("ul-mapeadas-l3");
    if (listaL1) listaL1.innerHTML = "";
    if (listaL3) listaL3.innerHTML = "";

    Object.values(MetroData.catalogoEstacoes).forEach(estacao => {
      if (estacao.mapeada) {
        let item = document.createElement("li");
        item.innerText = estacao.nome;
        if (estacao.linha == 1 && listaL1) listaL1.appendChild(item);
        if (estacao.linha == 3 && listaL3) listaL3.appendChild(item);
      }
    });
  },

  renderizarTremTopDown: function (idLinha, vagaoAlvo, portaAlvo) {
    let varCorLinha = `var(--l${idLinha})`;
    let htmlTrem = `<div class="t-container"><div class="t-track"></div><div class="t-wrapper">`;
    for (let v = 1; v <= 6; v++) {
      htmlTrem += `<div class="t-car" data-label="C${v}" style="border-color: ${varCorLinha};">`;
      for (let p = 1; p <= 4; p++) {
        let ehPortaAlvo = (v == vagaoAlvo && p == portaAlvo);
        htmlTrem += `<div class="t-door ${ehPortaAlvo ? "target" : ""}"></div>`;
      }
      htmlTrem += `</div>`;
    }
    htmlTrem += `</div></div>`;
    return htmlTrem;
  },

  calcularEExibirRota: function () {
    const idOrigemSelecionada = AppState.rota.estacaoOrigem;
    const idDestinoSelecionado = AppState.rota.estacaoDestino;
    const preferenciaSaida = AppState.rota.preferencia;
    const box = document.getElementById("resultado-box");
    const t = AppState.dicionarioTextos[AppState.idiomaAtual];

    document.getElementById("step-calcular-final").classList.add("hidden");

    if (idOrigemSelecionada == idDestinoSelecionado) {
      box.innerHTML = `<div class="alert-info" style="text-align:center;">${t.alertas.mesmaEstacao}</div>
                       <button class="btn-action mt-30" onclick="GerenciadorFluxo.editarEtapa('destino')" style="background: var(--bg-app); color: var(--btn-color); border: 2px solid var(--btn-color); box-shadow: none;">🔄 Escolher outro destino</button>`;
      box.classList.remove("hidden");
      return;
    }

    const estacaoOrigem = MetroData.catalogoEstacoes[idOrigemSelecionada];
    const estacaoDestino = MetroData.catalogoEstacoes[idDestinoSelecionado];
    const trajetoLinhas = CalculadoraRota.encontrarCaminho(estacaoOrigem.linha, estacaoDestino.linha);
    
    let textoPreferencia = "";
    if(preferenciaSaida === "elevador") textoPreferencia = t.textos.tipoElevador;
    else if(preferenciaSaida === "rolante") textoPreferencia = t.textos.tipoRolante;
    else textoPreferencia = t.textos.tipoFixa;

    let htmlFinalOutput = "";
    let precisaAlertaAcessibilidade = false;

    if (trajetoLinhas.length > 1) {
      htmlFinalOutput += `<div class="alert-warning alert-info">ℹ️ <b>${t.textos.avisoRotaTitulo}</b><br>${t.textos.avisoRotaDescricao}</div>`;
    }

    for (let i = 0; i < trajetoLinhas.length; i++) {
      let idLinhaTrecho = trajetoLinhas[i];
      let isPrimeiraPerna = (i === 0);
      let isUltimaPerna = (i === trajetoLinhas.length - 1);

      let nomeEmbarqueTrecho = isPrimeiraPerna ? estacaoOrigem.nome : MetroData.conexoes[trajetoLinhas[i - 1]][idLinhaTrecho];
      let nomeDesembarqueTrecho = isUltimaPerna ? estacaoDestino.nome : MetroData.conexoes[idLinhaTrecho][trajetoLinhas[i + 1]];
      let varCorLinhaAtual = `var(--l${idLinhaTrecho})`;

      htmlFinalOutput += `<div class="route-step" style="border-color: ${varCorLinhaAtual}; --step-color: ${varCorLinhaAtual};">`;
      htmlFinalOutput += `<div class="step-title" style="color: ${varCorLinhaAtual};">📍 ${t.textos.trecho} ${i + 1}: ${t.linhas["l" + idLinhaTrecho]}</div>`;

      let portaAlvoBruta = null;
      let sentidoCalculado = "SENTIDO_POSITIVO";

      let idEmbarqueTrechoReal = Object.keys(MetroData.catalogoEstacoes).find(
        (id) => MetroData.catalogoEstacoes[id].nome === nomeEmbarqueTrecho && MetroData.catalogoEstacoes[id].linha == idLinhaTrecho
      );
      let idDesembarqueTrechoReal = Object.keys(MetroData.catalogoEstacoes).find(
        (id) => MetroData.catalogoEstacoes[id].nome === nomeDesembarqueTrecho && MetroData.catalogoEstacoes[id].linha == idLinhaTrecho
      );

      if (idEmbarqueTrechoReal && idDesembarqueTrechoReal) {
        sentidoCalculado = CalculadoraRota.determinarSentidoViagem(idEmbarqueTrechoReal, idDesembarqueTrechoReal);
        let infoEstacaoDestinoTrecho = MetroData.catalogoEstacoes[idDesembarqueTrechoReal];

        if (infoEstacaoDestinoTrecho && infoEstacaoDestinoTrecho.mapeada) {
          if (parseInt(idDesembarqueTrechoReal) === 313 && !isUltimaPerna && trajetoLinhas[i + 1] === 1) {
            let ehUltimaDaL1 = (i + 1 === trajetoLinhas.length - 1);
            let nomeFimL1 = ehUltimaDaL1 ? estacaoDestino.nome : MetroData.conexoes[1][trajetoLinhas[i + 2]];
            let idFimL1 = Object.keys(MetroData.catalogoEstacoes).find(id => MetroData.catalogoEstacoes[id].nome === nomeFimL1 && MetroData.catalogoEstacoes[id].linha == 1);
            let vaiParaTucuruvi = parseInt(idFimL1) < 111;
            portaAlvoBruta = vaiParaTucuruvi 
              ? (sentidoCalculado === "SENTIDO_POSITIVO" ? "Porta 57" : "Porta 52") 
              : (sentidoCalculado === "SENTIDO_POSITIVO" ? "Porta 15" : "Porta 13");
          } else {
            portaAlvoBruta = CalculadoraRota.obterPortaAlvo(infoEstacaoDestinoTrecho, sentidoCalculado, preferenciaSaida);
          }
        } else {
           portaAlvoBruta = "Pendente";
        }
      }

      if (portaAlvoBruta === "Inexistente" || (portaAlvoBruta === null && MetroData.catalogoEstacoes[idDesembarqueTrechoReal]?.mapeada)) {
        portaAlvoBruta = "Inexistente";
        precisaAlertaAcessibilidade = true;
      } else if (portaAlvoBruta === null) {
        portaAlvoBruta = "Pendente";
      }

      htmlFinalOutput += `<div class="info-text">${t.textos.embarqueTrecho.replace("{est}", `<b>${nomeEmbarqueTrecho}</b>`)}</div>`;

      if (portaAlvoBruta === "Inexistente") {
        htmlFinalOutput += `<div class="alert-warning">🚫 ${t.alertas.inexistente}</div>`;
      } else if (portaAlvoBruta !== "Pendente") {
        htmlFinalOutput += `<div class="result-door" style="color:${varCorLinhaAtual};">${FormatadorUI.montarTextoPorta(portaAlvoBruta, sentidoCalculado)}</div>`;
        let dadosVagao = CalculadoraRota.extrairVagaoEPorta(portaAlvoBruta, sentidoCalculado);
        if (dadosVagao) {
          htmlFinalOutput += this.renderizarTremTopDown(idLinhaTrecho, dadosVagao.v, dadosVagao.p);
        }
      } else {
        htmlFinalOutput += `<div class="alert-pendente" style="margin-top:8px;">⏳ ${t.alertas.pendente}</div>`;
      }

      if (!isUltimaPerna) {
        let proxLinhaNome = t.linhas["l" + trajetoLinhas[i + 1]] || `Linha ${trajetoLinhas[i + 1]}`;
        htmlFinalOutput += `<div class="info-text" style="margin-top:15px; border-top: 1px dashed var(--border-color); padding-top: 10px;">${t.textos.transferenciaTrecho.replace("{est}", `<b>${nomeDesembarqueTrecho}</b>`).replace("{linha}", `<b>${proxLinhaNome}</b>`)}</div>`;
      } else {
        htmlFinalOutput += `<div class="info-text" style="margin-top:15px; border-top: 1px dashed var(--border-color); padding-top: 10px;">${t.textos.saidaFinal.replace("{est}", `<b>${nomeDesembarqueTrecho}</b>`).replace("{tipo}", `<b>${textoPreferencia}</b>`)}</div>`;
      }

      htmlFinalOutput += `</div>`;
    }

    box.innerHTML = htmlFinalOutput;
    
    box.innerHTML += `<button class="btn-action mt-30" onclick="GerenciadorFluxo.editarEtapa('pref')" style="background: var(--bg-app); color: var(--btn-color); border: 2px solid var(--btn-color); box-shadow: none;">🔄 Buscar Nova Rota</button>`;
    
    box.classList.remove("hidden");

    if (precisaAlertaAcessibilidade) {
      setTimeout(() => { this.abrirModalAcessibilidade(); }, 300);
    }

    setTimeout(() => {
      document.querySelectorAll(".t-wrapper").forEach((wrapper) => {
        let portaAlvoDOM = wrapper.querySelector(".t-door.target");
        if (portaAlvoDOM) {
          let containerTremWidth = wrapper.parentElement.offsetWidth;
          let offsetPortaRelativo = portaAlvoDOM.getBoundingClientRect().left - wrapper.getBoundingClientRect().left;
          let larguraPorta = portaAlvoDOM.offsetWidth;
          let deslocamentoX = (containerTremWidth / 2) - offsetPortaRelativo - (larguraPorta / 2);
          wrapper.style.transform = `translateX(${deslocamentoX}px)`;
        }
      });
    }, 100); 
  }
};

const ServicoGPS = {
  encontrarEstacaoMaisProxima: function () {
    if (!navigator.geolocation) return alert("Erro de GPS");
    navigator.geolocation.getCurrentPosition(
      (posicao) => {
        let latUsuario = posicao.coords.latitude;
        let lngUsuario = posicao.coords.longitude;
        let estacaoMaisProxima = null;
        let distanciaMinima = Infinity;
        for (let id in MetroData.catalogoEstacoes) {
          let estacao = MetroData.catalogoEstacoes[id];
          if (estacao.coordenadas && estacao.mapeada) {
            let dist = this.calcularDistanciaHaversine(latUsuario, lngUsuario, estacao.coordenadas.lat, estacao.coordenadas.lng);
            if (dist < distanciaMinima) { distanciaMinima = dist; estacaoMaisProxima = estacao; }
          }
        }
        if (estacaoMaisProxima && distanciaMinima <= 8) {
          GerenciadorFluxo.selecionarLinhaOrigem(estacaoMaisProxima.linha);
          GerenciadorFluxo.selecionarEstacaoOrigem(estacaoMaisProxima.id);
        } else {
          alert("Nenhuma estação mapeada encontrada num raio de 8km.");
        }
      },
      (error) => alert("Falha ao obter localização."),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  },
  calcularDistanciaHaversine: function (lat1, lon1, lat2, lon2) {
    const RAIO_TERRA = 6371;
    const difLat = ((lat2 - lat1) * Math.PI) / 180;
    const difLon = ((lon2 - lon1) * Math.PI) / 180;
    const formulaA = Math.sin(difLat / 2) * Math.sin(difLat / 2) + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(difLon / 2) * Math.sin(difLon / 2);
    return RAIO_TERRA * 2 * Math.atan2(Math.sqrt(formulaA), Math.sqrt(1 - formulaA));
  },
};

window.onload = async function () {
  try {
    const resposta = await fetch("dicionario.json");
    const dados = await resposta.json();
    AppState.dicionarioTextos = dados;
    GerenciadorUI.iniciar();
  } catch (erro) {
    console.error("Erro Crítico no Boot:", erro);
    document.body.innerHTML = "<h2 style='color:white; text-align:center; margin-top:50px;'>Erro de Sistema. O App precisa rodar através de um servidor local.</h2>";
  }
};