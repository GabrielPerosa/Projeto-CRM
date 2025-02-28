'use client'
//import { getServerSession } from 'next-auth';
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Chart } from 'primereact/chart';
//import { redirect } from 'next/navigation';
//import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { FaChartColumn } from "react-icons/fa6"; // Importa o ícone de gráfico de barras
import { MultiSelect } from "primereact/multiselect"; // Importa o componente MultiSelect para seleções múltiplas
import { getSession } from 'next-auth/react';
import { Loading } from '@/components/Loading';

export default function Home() {
  // const session = await getServerSession(authOptions);
  // Estado para armazenar os filtros e o gráfico selecionado
  const [selectedChart, setSelectedChart] = useState<string| null>(null);
  const [year, setYear] = useState(undefined);
  const [months, setMonths] = useState([]);
  const [states, setStates] = useState([]);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Busca a sessão do usuário
  const fetchSession = async () => {
    try {
      const sessionData = await getSession();
      if(sessionData){
        setSession(sessionData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Erro ao buscar sessão:", error);
    }
  };

  // Dados disponíveis para os filtros
  const years = [2022, 2023, 2024];
  const availableMouths = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",];
  const availableStates = ["SP", "RJ", "MG", "BA", "PR", "RS", "SC", "PE", "CE", "GO"];

  // Opções de configurações do gráfico
  const chartOptions = { responsive: true, maintainAspectRatio: false,};

  // Dados mockados para os gráficos
  const mockData = {
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
      labels: availableMouths,
      datasets: [
        {
          label: "Pedidos",
          backgroundColor: "#42A5F5",
          data: months.map(() => Math.floor(Math.random() * 7000)), // Gera valores aleatórios para as vendas
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
  const charts = {
    A: { type: "pie", title: "Faturamento" },
    B: { type: "bar", title: "Pedidos" },
    C: { type: "line", title: "Tempo de Conclusão" },
    D: { type: "doughnut", title: "Prestador" },
  }
  const chartsToShow = ['C', 'D'];
  
  if(loading) {
    fetchSession()
    return (
      <Loading />
    )
  }
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Componente Sidebar que exibe o menu lateral */}
      <Sidebar title="Bem-vindo" username="Usuário" />

      <div className="flex-1 p-6 flex flex-col">
        {/* Filtros de seleção (meses, estados e ano) */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <MultiSelect
            value={months}
            options={availableMouths}
            onChange={(e) => setMonths(e.value)} // Atualiza o estado de meses
            placeholder="Selecione os meses"
            display="chip"
          />
          <MultiSelect
            value={states}
            options={availableStates}
            onChange={(e) => setStates(e.value)} // Atualiza o estado de estados
            placeholder="Selecione os estados"
            display="chip"
          />
          <MultiSelect
            value={year}
            options={years}
            onChange={(e) => setYear(e.value)} // Atualiza o estado do year
            placeholder="Ano"
          />
        </div>

        {/* Exibe os botões para selecionar os gráficos */}
        <div className="flex flex-wrap gap-6 justify-center">
          {chartsToShow.map(key => {
            return(
            <div
              key={key}
              className="p-6 bg-white rounded-lg shadow-lg w-72 text-center cursor-pointer hover:shadow-xl"
              onClick={() => setSelectedChart(key)}
            >
              <FaChartColumn className="text-4xl mb-2 text-blue-500" />
              <div className="text-lg font-semibold">
                {charts[key as keyof typeof charts].title}
              </div>
            </div> 
            )
          })}
        </div>

        {/* Exibe o gráfico selecionado */}
        {selectedChart && (
          <div className="mt-8 flex flex-col items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center w-full max-w-4xl">
              <h2 className="text-xl font-semibold mb-4">
                {charts[selectedChart as keyof typeof charts].title}
              </h2>
              {/* Exibe o gráfico de acordo com o type e dados selecionados */}
              <Chart
                type={charts[selectedChart as keyof typeof charts].type}
                data={mockData[selectedChart as keyof typeof charts]}
                options={chartOptions}
                style={{ width: "100%", height: "300px" }}
              />
            </div>
            {/* Botão para voltar e desmarcar o gráfico selecionado */}
            <button
              className="bg-blue-500 text-white py-2 px-20 rounded hover:bg-blue-600 mt-4"
              onClick={() => setSelectedChart(null)} // Desmarca o gráfico
            >
              Voltar
            </button>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">{charts.A.title}</h2>
            <Chart
              type={charts.A.type}
              data={mockData.A}
              options={chartOptions}
            />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">{charts.B.title}</h2>
            <Chart
              type={charts.B.type}
              data={mockData.B}
              options={chartOptions}
              style={{ width: "100%", maxWidth: "550px", height: "300px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
