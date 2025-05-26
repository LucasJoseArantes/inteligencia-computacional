const materias = {
  "01": "Matemática",
  "02": "Português",
  "03": "História",
  "04": "Geografia",
  "05": "Biologia",
  "06": "Física",
  "07": "Química",
  "08": "Filosofia",
  "09": "Sociologia",
  10: "Artes",
  11: "Ed. Física",
  12: "Redação",
  13: "Inglês",
  14: "Espanhol",
  15: "Literatura",
  16: "TI",
  17: "Banco de Dados",
  18: "Programação",
  19: "Algoritmos",
  20: "Web",
  21: "Projeto",
  22: "Estágio",
  23: "Empreendedorismo",
  24: "Ética",
  25: "Inovação",
};

const professores = {
  "01": "Prof. Ana",
  "02": "Prof. Bruno",
  "03": "Prof. Carla",
  "04": "Prof. Daniel",
  "05": "Prof. Elisa",
  "06": "Prof. Felipe",
  "07": "Prof. Gabriela",
  "08": "Prof. Henrique",
  "09": "Prof. Isabela",
  10: "Prof. João",
};

const periodos = [
  ["0101", "0202", "0303", "0404", "0505"],
  ["0606", "0707", "0808", "0909", "1010"],
  ["0111", "0212", "0313", "0414", "0515"],
  ["0616", "0717", "0818", "0919", "1020"],
  ["0121", "0222", "0323", "0424", "0525"],
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function avaliacao(individuo) {
  const horariosPorPeriodo = 20;
  const totalPeriodos = 5;
  const conflitos = new Map();

  for (let i = 0; i < horariosPorPeriodo; i++) {
    const professoresNoHorario = new Map();

    for (let p = 0; p < totalPeriodos; p++) {
      const index = p * horariosPorPeriodo + i;
      const cod = individuo[index];
      const codProf = cod.substring(2);

      if (!professoresNoHorario.has(codProf)) {
        professoresNoHorario.set(codProf, 1);
      } else {
        professoresNoHorario.set(
          codProf,
          professoresNoHorario.get(codProf) + 1
        );
      }
    }

    for (const [prof, count] of professoresNoHorario.entries()) {
      if (count > 1) {
        conflitos.set(`${i}-${prof}`, count - 1);
      }
    }
  }

  let totalConflitos = 0;
  for (const qtd of conflitos.values()) {
    totalConflitos += qtd;
  }

  return totalConflitos;
}

function selecao(populacao, notas) {
  const selecionados = [];
  const tam = populacao.length;
  const metade = Math.floor(tam / 2);

  // Selecionar o primeiro pai da metade melhor da população (seleção por roleta nessa metade)
  const notasMelhorMetade = notas.slice(0, metade);
  const somaNotasMelhor = notasMelhorMetade.reduce((a, b) => a + b, 0);
  let r = Math.random() * somaNotasMelhor;
  let acumulado = 0;
  for (let i = 0; i < metade; i++) {
    acumulado += notasMelhorMetade[i];
    if (acumulado >= r) {
      selecionados.push(populacao[i]);
      break;
    }
  }

  // Selecionar o segundo pai da população inteira (seleção por roleta)
  const somaNotasTotal = notas.reduce((a, b) => a + b, 0);
  r = Math.random() * somaNotasTotal;
  acumulado = 0;
  for (let i = 0; i < tam; i++) {
    acumulado += notas[i];
    if (acumulado >= r) {
      selecionados.push(populacao[i]);
      break;
    }
  }

  return selecionados;
}

function cruzamento(pai1, pai2, pc = 1) {
  const tamanho = pai1.length;
  if (Math.random() > pc) return [[...pai1], [...pai2]];

  const pontoCorte = Math.floor(Math.random() * (tamanho - 1)) + 1;

  const filho1 = [...pai1.slice(0, pontoCorte), ...pai2.slice(pontoCorte)];
  const filho2 = [...pai2.slice(0, pontoCorte), ...pai1.slice(pontoCorte)];

  return [filho1, filho2];
}

function mutacao(individuo, pm = 0.01) {
  const tamanho = individuo.length;
  const novoIndividuo = [...individuo];

  for (let i = 0; i < tamanho; i++) {
    if (Math.random() < pm) {
      const j = Math.floor(Math.random() * tamanho);
      [novoIndividuo[i], novoIndividuo[j]] = [
        novoIndividuo[j],
        novoIndividuo[i],
      ];
    }
  }

  return novoIndividuo;
}

function gerarPopulacaoComCodigos(periodos, tamPop = 10) {
  const populacao = [];

  for (let k = 0; k < tamPop; k++) {
    const individuo = [];

    for (const periodo of periodos) {
      const aux = [];

      for (const materia of periodo) {
        for (let i = 0; i < 4; i++) {
          const codProfessor = materia.substring(0, 2);
          const codMateria = materia.substring(2, 4);
          aux.push(codMateria + codProfessor);
        }
      }

      shuffle(aux);
      individuo.push(...aux);
    }

    populacao.push(individuo);
  }

  return populacao;
}

function renderTabela(populacao, idDiv, titulo) {
  const dias = ["Seg", "Ter", "Qua", "Qui", "Sex"];
  const horariosPorDia = 4;
  const periodosTotais = 5;

  let html = `<h2>${titulo}</h2>`;
  html += "<table border='1' cellpadding='4' cellspacing='0'><thead><tr>";
  html += '<th rowspan="2">Indivíduo</th>';
  html += '<th rowspan="2">Nota</th>';

  for (let p = 1; p <= periodosTotais; p++) {
    html += `<th colspan="${dias.length * horariosPorDia}">Período ${p}</th>`;
  }
  html += "</tr><tr>";

  for (let p = 0; p < periodosTotais; p++) {
    for (let d = 0; d < dias.length; d++) {
      for (let h = 0; h < horariosPorDia; h++) {
        html += `<th>${dias[d]} ${h + 1}º</th>`;
      }
    }
  }

  html += "</tr></thead><tbody>";

  populacao.forEach((ind, i) => {
    const nota = avaliacao(ind);
    html += `<tr><td><b>${i + 1}</b></td>`;
    html += `<td>${nota}</td>`;

    ind.forEach((cod) => {
      const codDisc = cod.substring(0, 2);
      const codProf = cod.substring(2);
      const nomeDisc = materias[codDisc] || "??";
      const nomeProf = professores[codProf] || "??";
      html += `<td>${nomeDisc}<br><small>${nomeProf}</small></td>`;
    });

    html += "</tr>";
  });

  html += "</tbody></table>";

  document.getElementById(idDiv).innerHTML = html;
}

// --- Fluxo principal ---

const populacao = gerarPopulacaoComCodigos(periodos, 10);
const notas = populacao.map(avaliacao);
const selecionados = selecao(populacao, notas);

// Ordenar para exibição: melhor nota primeiro (menos conflitos)
populacao.sort((a, b) => avaliacao(a) - avaliacao(b));
selecionados.sort((a, b) => avaliacao(a) - avaliacao(b));

// Cruzamento entre os dois selecionados
const [filho1, filho2] = cruzamento(selecionados[0], selecionados[1], 1);
const populacaoCruzada = [filho1, filho2];

// Mutação na população cruzada
const populacaoMutada = populacaoCruzada.map((ind) => mutacao(ind, 0.01));

// Renderização das tabelas
renderTabela(populacao, "tabela-populacao", "População Inicial");
renderTabela(selecionados, "tabela-selecionados", "Indivíduos Selecionados");
renderTabela(
  populacaoCruzada,
  "tabela-cruzamento",
  "População após Cruzamento"
);
renderTabela(populacaoMutada, "tabela-mutacao", "População após Mutação");
