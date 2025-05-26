# Inteligência Computacional — Algoritmos Genéticos para Grade Horária

Este projeto implementa um algoritmo genético para gerar e otimizar grades horárias escolares, buscando minimizar conflitos de horários entre professores.

---

## Visão Geral

O sistema cria populações de possíveis soluções (indivíduos), onde cada indivíduo representa uma grade com a alocação de matérias e professores em diferentes períodos e horários.

A avaliação de cada indivíduo mede quantos conflitos de professor existem (quando um professor está atribuído a dois horários simultâneos). O algoritmo tenta minimizar esses conflitos.

Principais operações genéticas implementadas:

- **Cruzamento (crossover):** mistura genes de dois indivíduos para gerar novos.
- **Mutação:** pequenas alterações aleatórias nos indivíduos para aumentar a diversidade.

---

## Tecnologias

- JavaScript (ES6+)
- HTML para visualização das tabelas

---

## Estrutura do Código

- `materias` e `professores`: objetos que armazenam códigos e nomes para facilitar a leitura.
- `periodos`: matriz que representa os blocos de horários por período.
- Funções principais:
  - `gerarPopulacaoComCodigos()`: cria uma população inicial aleatória.
  - `avaliacao()`: calcula a nota (quantidade de conflitos) de um indivíduo.
  - `selecao()`: seleciona indivíduos para reprodução, usando roleta.
  - `cruzamento()`: realiza crossover entre dois indivíduos.
  - `mutacao()`: aplica mutações aleatórias para evitar convergência precoce.
  - `renderTabela()`: gera o HTML para exibir a população e suas notas.

---

## Como usar

1. Clone o repositório:

```bash
git clone https://github.com/LucasJoseArantes/inteligencia-computacional.git
```


2. Abra o arquivo index.html em um navegador para visualizar as tabelas.:
```bash
 cd .\geradorHorarios\
```


