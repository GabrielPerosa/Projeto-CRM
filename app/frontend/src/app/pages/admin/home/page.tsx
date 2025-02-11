"use client";

import React, { useState } from "react"; // Importa o React e o hook useState para gerenciar o estado
import Sidebar from "@/components/Sidebar"; // Importa o componente Sidebar
import { Chart } from "primereact/chart"; // Importa o componente Chart da biblioteca PrimeReact para gráficos
import { FaChartColumn } from "react-icons/fa6"; // Importa o ícone de gráfico de barras
import { MultiSelect } from "primereact/multiselect"; // Importa o componente MultiSelect para seleções múltiplas

export default function Home() {
  // Estado para armazenar os filtros e o gráfico selecionado
  const [graficoSelecionado, setGraficoSelecionado] = useState(null);
  const [ano, setAno] = useState(null);
  const [meses, setMeses] = useState([]);
  const [estados, setEstados] = useState([]);

  // Dados disponíveis para os filtros
  const anos = [2022, 2023, 2024];
  const mesesDisponiveis = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",];
  const estadosDisponiveis = ["SP", "RJ", "MG", "BA", "PR", "RS", "SC", "PE", "CE", "GO"];

  // Opções de configurações do gráfico
  const opcoesGrafico = { responsive: true, maintainAspectRatio: false,};

  // Dados mockados para os gráficos
  const dadosMockados = {
    A: {
      // Gráfico de pizza
      labels: ["A", "B", "C"],
      datasets: [
        {
          data: [400, 200, 100],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    },
    B: {
      // Gráfico de barras
      labels: mesesDisponiveis,
      datasets: [
        {
          label: "Pedidos",
          backgroundColor: "#42A5F5",
          data: meses.map(() => Math.floor(Math.random() * 7000)), // Gera valores aleatórios para as vendas
        },
      ],
    },
    C: {
      // Gráfico de linha
      labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
      datasets: [
        {
          label: "A",
          borderColor: "#FF5733",
          data: [70, 85, 95, 100], // Dados de performance
        },
      ],
    },
    D: {
      // Gráfico de donut
      labels: ["Produto A", "Produto B", "Produto C"],
      datasets: [
        {
          data: [15000, 9000, 11000],
          backgroundColor: ["#FFD700", "#32CD32", "#FF4500"],
        },
      ],
    },
  };

  // Tipos e títulos dos gráficos
  const graficos = {
    A: { tipo: "pie", titulo: "Faturamento" },
    B: { tipo: "bar", titulo: "Pedidos" },
    C: { tipo: "line", titulo: "Tempo de Conclusão" },
    D: { tipo: "doughnut", titulo: "Prestador" },
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Componente Sidebar que exibe o menu lateral */}
      <Sidebar title="Bem-vindo" username="Usuário" />

      <div className="flex-1 p-6 flex flex-col">
        {/* Filtros de seleção (meses, estados e ano) */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <MultiSelect
            value={meses}
            options={mesesDisponiveis}
            onChange={(e) => setMeses(e.value)} // Atualiza o estado de meses
            placeholder="Selecione os meses"
            display="chip"
          />
          <MultiSelect
            value={estados}
            options={estadosDisponiveis}
            onChange={(e) => setEstados(e.value)} // Atualiza o estado de estados
            placeholder="Selecione os estados"
            display="chip"
          />
          <MultiSelect
            value={ano}
            options={anos}
            onChange={(e) => setAno(e.value)} // Atualiza o estado do ano
            placeholder="Ano"
          />
        </div>

        {/* Exibe os botões para selecionar os gráficos */}
        <div className="flex flex-wrap gap-6 justify-center">
          {Object.keys(graficos).map((chave) => (
            <div
              key={chave}
              className="p-6 bg-white rounded-lg shadow-lg w-72 text-center cursor-pointer hover:shadow-xl"
              onClick={() => setGraficoSelecionado(chave)} // Ao clicar, seleciona o gráfico
            >
              <FaChartColumn className="text-4xl mb-2 text-blue-500" />
              <div className="text-lg font-semibold">
                {graficos[chave].titulo}
              </div>
            </div>
          ))}
        </div>

        {/* Exibe o gráfico selecionado */}
        {graficoSelecionado && (
          <div className="mt-8 flex flex-col items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center w-full max-w-4xl">
              <h2 className="text-xl font-semibold mb-4">
                {graficos[graficoSelecionado].titulo}
              </h2>
              {/* Exibe o gráfico de acordo com o tipo e dados selecionados */}
              <Chart
                type={graficos[graficoSelecionado].tipo}
                data={dadosMockados[graficoSelecionado]}
                options={opcoesGrafico}
                style={{ width: "100%", height: "300px" }}
              />
            </div>
            {/* Botão para voltar e desmarcar o gráfico selecionado */}
            <button
              className="bg-blue-500 text-white py-2 px-20 rounded hover:bg-blue-600 mt-4"
              onClick={() => setGraficoSelecionado(null)} // Desmarca o gráfico
            >
              Voltar
            </button>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">{graficos.A.titulo}</h2>
            <Chart
              type={graficos.A.tipo}
              data={dadosMockados.A}
              options={opcoesGrafico}
            />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">{graficos.B.titulo}</h2>
            <Chart
              type={graficos.B.tipo}
              data={dadosMockados.B}
              options={opcoesGrafico}
              style={{ width: "100%", maxWidth: "550px", height: "300px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
