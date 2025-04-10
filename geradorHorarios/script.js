const materias = {
    "01": "Matemática", "02": "Português", "03": "História", "04": "Geografia", "05": "Biologia",
    "06": "Física", "07": "Química", "08": "Filosofia", "09": "Sociologia", "10": "Artes",
    "11": "Ed. Física", "12": "Redação", "13": "Inglês", "14": "Espanhol", "15": "Literatura",
    "16": "TI", "17": "Banco de Dados", "18": "Programação", "19": "Algoritmos", "20": "Web",
    "21": "Projeto", "22": "Estágio", "23": "Empreendedorismo", "24": "Ética", "25": "Inovação"
  };
  
  const professores = {
    "01": "Prof. Ana", "02": "Prof. Bruno", "03": "Prof. Carla", "04": "Prof. Daniel",
    "05": "Prof. Elisa", "06": "Prof. Felipe", "07": "Prof. Gabriela", "08": "Prof. Henrique",
    "09": "Prof. Isabela", "10": "Prof. João"
  };
  
  const periodos = [
    ["0101", "0202", "0303", "0404", "0505"],
    ["0606", "0707", "0808", "0909", "1010"],
    ["0111", "0212", "0313", "0414", "0515"],
    ["0616", "0717", "0818", "0919", "1020"],
    ["0121", "0222", "0323", "0424", "0525"]
  ];
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function gerarPopulacaoComCodigos(periodos, tamPop = 10) {
    const populacao = [];
  
    for (let k = 0; k < tamPop; k++) {
      const individuo = [];
  
      for (const periodo of periodos) {
        const aux = [];
  
        for (const materia of periodo) {
          for (let i = 0; i < 4; i++) {
            const codProfessor = materia.substring(0, 2)
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
  
  function renderTabela(populacao) {
    const dias = ["Seg", "Ter", "Qua", "Qui", "Sex"];
    const horariosPorDia = 4;
    const periodosTotais = 5;
  
    // Criar cabeçalho com agrupamento por período
    let html = '<table><thead><tr>';
    html += '<th rowspan="2">Indivíduo</th>';
  
    for (let p = 1; p <= periodosTotais; p++) {
      html += `<th colspan="${dias.length * horariosPorDia}">Período ${p}</th>`;
    }
    html += '</tr><tr>';
  
    // Cabeçalhos de dias e horários dentro de cada período
    for (let p = 0; p < periodosTotais; p++) {
      for (let d = 0; d < dias.length; d++) {
        for (let h = 0; h < horariosPorDia; h++) {
          html += `<th>${dias[d]} ${h + 1}º</th>`;
        }
      }
    }
  
    html += '</tr></thead><tbody>';
  
    populacao.forEach((ind, i) => {
      html += `<tr><td><b>${i + 1}</b></td>`;
      ind.forEach(cod => {
        const codDisc = cod.substring(0, 2);
        const codProf = cod.substring(2);
        const nomeDisc = materias[codDisc] || "??";
        const nomeProf = professores[codProf] || "??";
        html += `<td>${nomeDisc}<br><small>${nomeProf}</small></td>`;
      });
      html += '</tr>';
    });
  
    html += '</tbody></table>';
    document.getElementById("tabela").innerHTML = html;
  }
  
  
  const populacao = gerarPopulacaoComCodigos(periodos, 10);
  renderTabela(populacao);
  