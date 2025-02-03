'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Chart } from 'primereact/chart';
import { FaChartColumn } from "react-icons/fa6";
import { Dropdown } from 'primereact/dropdown';

export default function Home() {
  const [selectedChart, setSelectedChart] = useState<"graficoA" | "graficoB" | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const years = [2022, 2023, 2024];
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const chartData = {
    graficoA: {
      type: "pie",
      title: "Gráfico A",
      data: {
        labels: ['Categoria A', 'Categoria B', 'Categoria C'],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      },
    },
    graficoB: {
      type: "bar",
      title: "Gráfico B",
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
        datasets: [
          {
            label: 'Vendas',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: [65, 59, 80, 81, 56],
          },
          {
            label: 'Lucro',
            backgroundColor: '#9CCC65',
            borderColor: '#7CB342',
            data: [28, 48, 40, 19, 86],
          },
        ],
      },
    },
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="w-64 bg-gray-100 shadow-md">
        <Sidebar title="Bem-vindo" username="Usuário" />
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {/* Filtros Globais */}
        <div className="flex gap-4 mb-6 justify-center">
          <Dropdown value={selectedYear} options={years} onChange={(e) => setSelectedYear(e.value)} placeholder="Selecione o Ano" className="p-dropdown w-40" />
          <Dropdown value={selectedMonth} options={months} onChange={(e) => setSelectedMonth(e.value)} placeholder="Selecione o Mês" className="p-dropdown w-40" />
        </div>

        {/* Cards de Seleção */}
        <div className="flex flex-wrap gap-8 justify-center px-5">
          <div
            className="p-4 bg-blue-200 rounded-lg w-80 flex items-center justify-center text-black cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedChart("graficoA")}
          >
            <FaChartColumn className="text-3xl mr-2" />
            <div className="text-lg">GRAFICO A</div>
          </div>

          <div
            className="p-4 bg-blue-400 rounded-lg w-80 flex items-center justify-center text-black cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedChart("graficoB")}
          >
            <FaChartColumn className="text-3xl mr-2" />
            <div className="text-lg">GRAFICO B</div>
          </div>
        </div>

        {/* Exibição dos Gráficos */}
        <div className="mt-8 flex flex-wrap gap-8 justify-center">
          {/* Se nenhum gráfico foi selecionado, mostra os dois principais */}
          {!selectedChart ? (
            <>
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Gráfico A</h2>
                <Chart type="pie" data={chartData.graficoA.data} style={{ height: '320px' }} />
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Gráfico B</h2>
                <Chart type="bar" data={chartData.graficoB.data} style={{ height: '320px' }} />
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">{chartData[selectedChart].title}</h2>
              <Chart type={chartData[selectedChart].type} data={chartData[selectedChart].data} style={{ height: '320px' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
