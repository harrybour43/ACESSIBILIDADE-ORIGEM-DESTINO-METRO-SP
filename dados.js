/**
 * ============================================================================
 * PROJETO: PORTA CERTA SP
 * ARQUIVO: dados.js
 * DESCRIÇÃO: Banco de Dados estático do sistema (Linhas, Estações, Mapeamentos)
 * VERSÃO: 6.0.0 (Arquitetura MetroData)
 * ============================================================================
 */

const MetroData = {
  linhasAtivas: [1, 2, 3, 4, 5, 15, 7, 8, 9, 10, 11, 12, 13],

  conexoes: {
    1: { 2: "Paraíso", 3: "Sé", 4: "Luz", 5: "Santa Cruz", 10: "Luz", 11: "Luz" },
    2: { 1: "Paraíso", 4: "Consolação", 5: "Chácara Klabin", 10: "Tamanduateí", 15: "Vila Prudente" },
    3: { 1: "Sé", 4: "República", 7: "Barra Funda", 8: "Barra Funda", 10: "Brás", 11: "Brás", 12: "Brás" },
    4: { 1: "Luz", 2: "Paulista", 3: "República", 9: "Pinheiros", 10: "Luz", 11: "Luz" },
    5: { 1: "Santa Cruz", 2: "Chácara Klabin", 9: "Santo Amaro" },
    7: { 3: "Barra Funda", 8: "Barra Funda", 10: "Barra Funda" },
    8: { 3: "Barra Funda", 7: "Barra Funda", 9: "Osasco", 10: "Barra Funda" },
    9: { 4: "Pinheiros", 5: "Santo Amaro", 8: "Osasco" },
    10: { 1: "Luz", 2: "Tamanduateí", 3: "Brás", 4: "Luz", 7: "Barra Funda", 8: "Barra Funda", 11: "Brás", 12: "Brás" },
    11: { 1: "Luz", 3: "Brás", 4: "Luz", 10: "Brás", 12: "Brás" },
    12: { 3: "Brás", 10: "Brás", 11: "Brás", 13: "Engenheiro Goulart" },
    13: { 12: "Engenheiro Goulart" },
    15: { 2: "Vila Prudente" },
  },

  layoutVagoes: {
    SENTIDO_POSITIVO: {
      18: { vagao: 1, porta: 1 }, 17: { vagao: 1, porta: 2 }, 16: { vagao: 1, porta: 3 }, 15: { vagao: 1, porta: 4 },
      28: { vagao: 2, porta: 1 }, 27: { vagao: 2, porta: 2 }, 26: { vagao: 2, porta: 3 }, 25: { vagao: 2, porta: 4 },
      38: { vagao: 3, porta: 1 }, 37: { vagao: 3, porta: 2 }, 36: { vagao: 3, porta: 3 }, 35: { vagao: 3, porta: 4 },
      48: { vagao: 4, porta: 1 }, 47: { vagao: 4, porta: 2 }, 46: { vagao: 4, porta: 3 }, 45: { vagao: 4, porta: 4 },
      58: { vagao: 5, porta: 1 }, 57: { vagao: 5, porta: 2 }, 56: { vagao: 5, porta: 3 }, 55: { vagao: 5, porta: 4 },
      68: { vagao: 6, porta: 1 }, 67: { vagao: 6, porta: 2 }, 66: { vagao: 6, porta: 3 }, 65: { vagao: 6, porta: 4 },
    },
    SENTIDO_NEGATIVO: {
      11: { vagao: 6, porta: 4 }, 12: { vagao: 6, porta: 3 }, 13: { vagao: 6, porta: 2 }, 14: { vagao: 6, porta: 1 },
      21: { vagao: 5, porta: 4 }, 22: { vagao: 5, porta: 3 }, 23: { vagao: 5, porta: 2 }, 24: { vagao: 5, porta: 1 },
      31: { vagao: 4, porta: 4 }, 32: { vagao: 4, porta: 3 }, 33: { vagao: 4, porta: 2 }, 34: { vagao: 4, porta: 1 },
      41: { vagao: 3, porta: 4 }, 42: { vagao: 3, porta: 3 }, 43: { vagao: 3, porta: 2 }, 44: { vagao: 3, porta: 1 },
      51: { vagao: 2, porta: 4 }, 52: { vagao: 2, porta: 3 }, 53: { vagao: 2, porta: 2 }, 54: { vagao: 2, porta: 1 },
      61: { vagao: 1, porta: 4 }, 62: { vagao: 1, porta: 3 }, 63: { vagao: 1, porta: 2 }, 64: { vagao: 1, porta: 1 },
    },
  },

  catalogoEstacoes: {
    // LINHA 1
    101: { id: 101, linha: 1, nome: "Tucuruvi", coordenadas: { lat: -23.4804, lng: -46.6038 }, mapeada: false },
    102: { id: 102, linha: 1, nome: "Parada Inglesa", coordenadas: { lat: -23.4877, lng: -46.6080 }, mapeada: false },
    103: { id: 103, linha: 1, nome: "Jardim São Paulo", coordenadas: { lat: -23.4922, lng: -46.6166 }, mapeada: false },
    104: { id: 104, linha: 1, nome: "Santana", coordenadas: { lat: -23.5026, lng: -46.6250 }, mapeada: false },
    105: { id: 105, linha: 1, nome: "Carandiru", coordenadas: { lat: -23.5096, lng: -46.6249 }, mapeada: false },
    106: { id: 106, linha: 1, nome: "Portuguesa-Tietê", coordenadas: { lat: -23.5165, lng: -46.6251 }, mapeada: false },
    107: { id: 107, linha: 1, nome: "Armênia", coordenadas: { lat: -23.5254, lng: -46.6261 }, mapeada: false },
    108: { id: 108, linha: 1, nome: "Tiradentes", coordenadas: { lat: -23.5312, lng: -46.6315 }, mapeada: false },
    109: { id: 109, linha: 1, nome: "Luz", coordenadas: { lat: -23.5385, lng: -46.6360 }, mapeada: false },
    110: { id: 110, linha: 1, nome: "São Bento", coordenadas: { lat: -23.5434, lng: -46.6333 }, mapeada: false },
    111: { id: 111, linha: 1, nome: "Sé", coordenadas: { lat: -23.5492, lng: -46.6334 }, mapeada: false },
    112: { id: 112, linha: 1, nome: "Japão-Liberdade", coordenadas: { lat: -23.5555, lng: -46.6359 }, mapeada: false },
    113: { id: 113, linha: 1, nome: "São Joaquim", coordenadas: { lat: -23.5618, lng: -46.6388 }, mapeada: false },
    114: { id: 114, linha: 1, nome: "Vergueiro", coordenadas: { lat: -23.5689, lng: -46.6397 }, mapeada: false },
    115: { id: 115, linha: 1, nome: "Paraíso", coordenadas: { lat: -23.5759, lng: -46.6414 }, mapeada: false },
    116: { id: 116, linha: 1, nome: "Ana Rosa", coordenadas: { lat: -23.5813, lng: -46.6383 }, mapeada: false },
    117: { id: 117, linha: 1, nome: "Vila Mariana", coordenadas: { lat: -23.5894, lng: -46.6346 }, mapeada: false },
    118: { id: 118, linha: 1, nome: "Santa Cruz", coordenadas: { lat: -23.5989, lng: -46.6366 }, mapeada: false },
    119: { id: 119, linha: 1, nome: "Praça da Árvore", coordenadas: { lat: -23.6106, lng: -46.6378 }, mapeada: false },
    120: { id: 120, linha: 1, nome: "Saúde", coordenadas: { lat: -23.6172, lng: -46.6343 }, mapeada: false },
    121: { id: 121, linha: 1, nome: "São Judas", coordenadas: { lat: -23.6253, lng: -46.6394 }, mapeada: false },
    122: { id: 122, linha: 1, nome: "Conceição", coordenadas: { lat: -23.6362, lng: -46.6411 }, mapeada: false },
    123: { id: 123, linha: 1, nome: "Jabaquara", coordenadas: { lat: -23.6470, lng: -46.6395 }, mapeada: false },

    // LINHA 2
    201: { id: 201, linha: 2, nome: "Vila Madalena", coordenadas: { lat: -23.5445, lng: -46.6900 }, mapeada: false },
    202: { id: 202, linha: 2, nome: "Santuário Sumaré", coordenadas: { lat: -23.5513, lng: -46.6778 }, mapeada: false },
    203: { id: 203, linha: 2, nome: "Clínicas", coordenadas: { lat: -23.5553, lng: -46.6718 }, mapeada: false },
    204: { id: 204, linha: 2, nome: "Consolação", coordenadas: { lat: -23.5580, lng: -46.6601 }, mapeada: false },
    205: { id: 205, linha: 2, nome: "Trianon-Masp", coordenadas: { lat: -23.5630, lng: -46.6540 }, mapeada: false },
    206: { id: 206, linha: 2, nome: "Brigadeiro", coordenadas: { lat: -23.5687, lng: -46.6465 }, mapeada: false },
    207: { id: 207, linha: 2, nome: "Paraíso", coordenadas: { lat: -23.5759, lng: -46.6414 }, mapeada: false },
    208: { id: 208, linha: 2, nome: "Ana Rosa", coordenadas: { lat: -23.5813, lng: -46.6383 }, mapeada: false },
    209: { id: 209, linha: 2, nome: "Chácara Klabin", coordenadas: { lat: -23.5927, lng: -46.6293 }, mapeada: false },
    210: { id: 210, linha: 2, nome: "Santos-Imigrantes", coordenadas: { lat: -23.5955, lng: -46.6200 }, mapeada: false },
    211: { id: 211, linha: 2, nome: "Alto do Ipiranga", coordenadas: { lat: -23.6025, lng: -46.6125 }, mapeada: false },
    212: { id: 212, linha: 2, nome: "Sacomã", coordenadas: { lat: -23.6021, lng: -46.5927 }, mapeada: false },
    213: { id: 213, linha: 2, nome: "Tamanduateí", coordenadas: { lat: -23.5929, lng: -46.5895 }, mapeada: false },
    214: { id: 214, linha: 2, nome: "Vila Prudente", coordenadas: { lat: -23.5816, lng: -46.5817 }, mapeada: false },

    // LINHA 3 (MAPEADAS)
    301: {
      id: 301, linha: 3, nome: "Corinthians-Itaquera", coordenadas: { lat: -23.5424, lng: -46.4735 }, mapeada: true,
      acessibilidade: { sentidoPositivo: { elevador: "Porta 11", rolante: "Porta 21", fixa: "Porta 31" }, sentidoNegativo: { elevador: null, rolante: null, fixa: null } }
    },
    302: {
      id: 302, linha: 3, nome: "Artur Alvim", coordenadas: { lat: -23.5404, lng: -46.4845 }, mapeada: true,
      acessibilidade: { sentidoPositivo: { elevador: "Porta 65", rolante: "Porta 47", fixa: "Porta 25" }, sentidoNegativo: { elevador: "Porta 64", rolante: "Porta 43", fixa: "Porta 24" } }
    },
    303: {
      id: 303, linha: 3, nome: "Patriarca", coordenadas: { lat: -23.5311, lng: -46.5015 }, mapeada: true,
      acessibilidade: { sentidoPositivo: { elevador: "Porta 18", rolante: "Porta 35", fixa: "Porta 45" }, sentidoNegativo: { elevador: "Porta 11", rolante: "Porta 34", fixa: "Porta 44" } }
    },
    304: {
      id: 304, linha: 3, nome: "Guilhermina-Esperança", coordenadas: { lat: -23.5293, lng: -46.5168 }, mapeada: true,
      acessibilidade: { sentidoPositivo: { elevador: "Porta 17", rolante: "Porta 36", fixa: "Porta 58" }, sentidoNegativo: { elevador: "Porta 12", rolante: "Porta 33", fixa: "Porta 51" } }
    },
    305: {
      id: 305, linha: 3, nome: "Vila Matilde", coordenadas: { lat: -23.5317, lng: -46.5309 }, mapeada: true,
      acessibilidade: { sentidoPositivo: { elevador: "Porta 66", rolante: "Porta 47", fixa: "Porta 25" }, sentidoNegativo: { elevador: "Porta 64", rolante: "Porta 42", fixa: "Porta 24" } }
    },
    306: {
      id: 306, linha: 3, nome: "Penha", coordenadas: { lat: -23.5332, lng: -46.5398 }, mapeada: true,
      acessibilidade: { sentidoPositivo: { elevador: "Porta 18", rolante: "Porta 36", fixa: "Porta 47" }, sentidoNegativo: { elevador: "Porta 11", rolante: "Porta 33", fixa: "Porta 42" } }
    },
    307: {
      id: 307, linha: 3, nome: "Carrão", coordenadas: { lat: -23.5350, lng: -46.5641 }, mapeada: true,
      acessibilidade: { sentidoPositivo: { elevador: "Porta 18", rolante: "Porta 36", fixa: "Porta 58" }, sentidoNegativo: { elevador: "Porta 11", rolante: "Porta 33", fixa: "Porta 51" } }
    },
    308: {
      id: 308, linha: 3, nome: "Tatuapé", coordenadas: { lat: -23.5398, lng: -46.5768 }, mapeada: true,
      acessibilidade: { sentidoPositivo: { elevador: "Porta 66", rolante: "Porta 35", fixa: "Porta 45" }, sentidoNegativo: { elevador: "Porta 63", rolante: "Porta 34", fixa: "Porta 44" } }
    },
    309: {
      id: 309, linha: 3, nome: "Belém", coordenadas: { lat: -23.5431, lng: -46.5898 }, mapeada: true,
      acessibilidade: { sentidoPositivo: { elevador: "Porta 65", rolante: "Porta 47", fixa: "Porta 37" }, sentidoNegativo: { elevador: "Porta 63", rolante: "Porta 42", fixa: "Porta 32" } }
    },
    310: {
      id: 310, linha: 3, nome: "Bresser-Mooca", coordenadas: { lat: -23.5463, lng: -46.6067 }, mapeada: true,
      acessibilidade: { sentidoPositivo: { elevador: "Porta 65", rolante: "Porta 47", fixa: "Porta 37" }, sentidoNegativo: { elevador: "Porta 63", rolante: "Porta 42", fixa: "Porta 32" } }
    },
    311: {
      id: 311, linha: 3, nome: "Brás", coordenadas: { lat: -23.5471, lng: -46.6164 }, mapeada: true,
      acessibilidade: { sentidoPositivo: { elevador: "Vagão 5, Porta 3", rolante: "Vagão 6, Porta 3", fixa: "Vagão 4, Porta 1" }, sentidoNegativo: { elevador: "Vagão 2, Porta 2", rolante: "Vagão 1, Porta 2", fixa: "Vagão 3, Porta 4" } }
    },
    312: {
      id: 312, linha: 3, nome: "Pedro II", coordenadas: { lat: -23.5498, lng: -46.6258 }, mapeada: true,
      acessibilidade: { sentidoPositivo: { elevador: "Porta 32", rolante: "Porta 14", fixa: "Porta 61" }, sentidoNegativo: { elevador: "Pendente", rolante: "Pendente", fixa: "Pendente" } }
    },
    313: {
      id: 313, linha: 3, nome: "Sé", coordenadas: { lat: -23.5492, lng: -46.6334 }, mapeada: true,
      acessibilidade: { sentidoPositivo: { elevador: "Porta 25", rolante: "Porta 57", fixa: "Porta 57" }, sentidoNegativo: { elevador: "Porta 33", rolante: "Porta 52", fixa: "Porta 52" } }
    },
    314: {
      id: 314, linha: 3, nome: "Anhangabaú", coordenadas: { lat: -23.5478, lng: -46.6385 }, mapeada: true,
      acessibilidade: { sentidoPositivo: { elevador: "Vagão 6, Porta 4", rolante: "Vagão 1, Porta 1", fixa: "Vagão 1, Porta 1" }, sentidoNegativo: { elevador: "Vagão 1, Porta 1", rolante: "Vagão 6, Porta 4", fixa: "Vagão 6, Porta 4" } }
    },
    315: {
      id: 315, linha: 3, nome: "República", coordenadas: { lat: -23.5439, lng: -46.6425 }, mapeada: true,
      acessibilidade: { sentidoPositivo: { elevador: "Vagão 1, Porta 1", rolante: "Vagão 6, Porta 1", fixa: "Vagão 6, Porta 4" }, sentidoNegativo: { elevador: "Vagão 6, Porta 4", rolante: "Vagão 1, Porta 4", fixa: "Vagão 1, Porta 1" } }
    },
    316: {
      id: 316, linha: 3, nome: "Santa Cecília", coordenadas: { lat: -23.5384, lng: -46.6492 }, mapeada: true,
      acessibilidade: { sentidoPositivo: { elevador: "Porta 45", rolante: "Inexistente", fixa: "Porta 33" }, sentidoNegativo: { elevador: "Pendente", rolante: "Inexistente", fixa: "Pendente" } }
    },
    317: {
      id: 317, linha: 3, nome: "Marechal Deodoro", coordenadas: { lat: -23.5328, lng: -46.6558 }, mapeada: true,
      acessibilidade: { sentidoPositivo: { elevador: "Porta 37", rolante: "Porta 36", fixa: "Porta 36" }, sentidoNegativo: { elevador: "Porta 37", rolante: "Porta 36", fixa: "Porta 36" } }
    },
    318: {
      id: 318, linha: 3, nome: "Palmeiras-Barra Funda", coordenadas: { lat: -23.5256, lng: -46.6640 }, mapeada: true,
      acessibilidade: { sentidoPositivo: { elevador: null, rolante: null, fixa: null }, sentidoNegativo: { elevador: "Porta 44", rolante: "Porta 34", fixa: "Porta 61" } }
    },

    // OUTRAS LINHAS (SEM MAPEAMENTO AINDA)
    401: { id: 401, linha: 4, nome: "Luz", coordenadas: { lat: -23.5385, lng: -46.6360 }, mapeada: false },
    402: { id: 402, linha: 4, nome: "República", coordenadas: { lat: -23.5439, lng: -46.6425 }, mapeada: false },
    403: { id: 403, linha: 4, nome: "Higienópolis", coordenadas: { lat: -23.5486, lng: -46.6521 }, mapeada: false },
    404: { id: 404, linha: 4, nome: "Paulista", coordenadas: { lat: -23.5551, lng: -46.6613 }, mapeada: false },
    408: { id: 408, linha: 4, nome: "Pinheiros", coordenadas: { lat: -23.5665, lng: -46.7029 }, mapeada: false },
    
    505: { id: 505, linha: 5, nome: "Santo Amaro", coordenadas: { lat: -23.6525, lng: -46.7126 }, mapeada: false },
    516: { id: 516, linha: 5, nome: "Santa Cruz", coordenadas: { lat: -23.5989, lng: -46.6366 }, mapeada: false },
    517: { id: 517, linha: 5, nome: "Chácara Klabin", coordenadas: { lat: -23.5927, lng: -46.6293 }, mapeada: false },

    701: { id: 701, linha: 7, nome: "Luz", coordenadas: { lat: -23.5385, lng: -46.6360 }, mapeada: false },
    702: { id: 702, linha: 7, nome: "Barra Funda", coordenadas: { lat: -23.5256, lng: -46.6640 }, mapeada: false },

    802: { id: 802, linha: 8, nome: "Barra Funda", coordenadas: { lat: -23.5256, lng: -46.6640 }, mapeada: false },
    807: { id: 807, linha: 8, nome: "Osasco", coordenadas: { lat: -23.5264, lng: -46.7744 }, mapeada: false },

    901: { id: 901, linha: 9, nome: "Osasco", coordenadas: { lat: -23.5264, lng: -46.7744 }, mapeada: false },
    906: { id: 906, linha: 9, nome: "Pinheiros", coordenadas: { lat: -23.5665, lng: -46.7029 }, mapeada: false },
    914: { id: 914, linha: 9, nome: "Santo Amaro", coordenadas: { lat: -23.6525, lng: -46.7126 }, mapeada: false },

    1001: { id: 1001, linha: 10, nome: "Luz", coordenadas: { lat: -23.5385, lng: -46.6360 }, mapeada: false },
    1002: { id: 1002, linha: 10, nome: "Brás", coordenadas: { lat: -23.5471, lng: -46.6164 }, mapeada: false },
    1005: { id: 1005, linha: 10, nome: "Tamanduateí", coordenadas: { lat: -23.5929, lng: -46.5895 }, mapeada: false },

    1101: { id: 1101, linha: 11, nome: "Luz", coordenadas: { lat: -23.5385, lng: -46.6360 }, mapeada: false },
    1102: { id: 1102, linha: 11, nome: "Brás", coordenadas: { lat: -23.5471, lng: -46.6164 }, mapeada: false },
    
    1201: { id: 1201, linha: 12, nome: "Brás", coordenadas: { lat: -23.5471, lng: -46.6164 }, mapeada: false },
    1203: { id: 1203, linha: 12, nome: "Engenheiro Goulart", coordenadas: { lat: -23.5015, lng: -46.5204 }, mapeada: false },

    1301: { id: 1301, linha: 13, nome: "Engenheiro Goulart", coordenadas: { lat: -23.5015, lng: -46.5204 }, mapeada: false },

    1501: { id: 1501, linha: 15, nome: "Vila Prudente", coordenadas: { lat: -23.5816, lng: -46.5817 }, mapeada: false }
  }
};
