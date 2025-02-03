'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Chart } from 'primereact/chart';
import '@/style/globals.css';

export default function Home() {
  // Estado para o ano selecionado
  const [selectedYear, setSelectedYear] = useState(2024);

  // Dados do gráfico, separados por ano
  const yearlyData = {
    2024: [15000, 5000, 8000, 10000, 4000, 12000, 2000, 14000, 7000, 9000, 15000, 6000], // Dados para 2024
    2025: [45, 50, 60, 70, 55, 80, 90, 100, 110, 120, 130, 140], // Dados para 2025 (exemplo)
  };

  // Função para lidar com a mudança do ano
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  // Definir os dados do gráfico com base no ano selecionado
  const barData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Agost', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Lucro',
        backgroundColor: 'blue', // Azul mais suave
        data: yearlyData[selectedYear], // Usar os dados do ano selecionado
      },
    ],
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar fixa */}
      <div className="w-64 bg-white shadow-md">
        <Sidebar title="Irrigação Smart" username="Usuário" />
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 overflow-y-auto p-6 flex justify-center items-center">

        {/* Container do gráfico */}
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl h-[500px] relative border border-gray-200">

          {/* Filtro de Ano dentro do gráfico */}
          <div className="absolute top-4 right-4 bg-white border border-gray-300 rounded-lg shadow-md px-4 py-2">
            <label htmlFor="year" className="text-sm font-medium text-gray-700 mr-2">
              Ano
            </label>
            <select
              id="year"
              value={selectedYear}
              onChange={handleYearChange}
              className="p-1 bg-white text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
            </select>
          </div>

          <h2 className="text-xl font-semibold mb-6 text-gray-800">Faturamento</h2>
          <Chart type="bar" data={barData} style={{ height: '100%' }} />
        </div>
      </div>
    </div>
  );
}
