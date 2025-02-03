'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Chart } from 'primereact/chart';
import { MultiSelect } from 'primereact/multiselect';

export default function Home() {
  const [anoSelecionado, setAnoSelecionado] = useState<number>(2024);
  const [mesesSelecionados, setMesesSelecionados] = useState<string[]>([]);
 

  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const dados: Record<number, number[]> = {
    2023: [20, 30, 50, 10, 80, 15, 55, 40, 30, 60, 20, 25],
    2024: [28, 48, 40, 19, 86, 28, 48, 40, 19, 86, 20, 22],
    2025: [25, 35, 45, 30, 70, 20, 60, 50, 35, 75, 25, 30],
  };

  const lucro: Record<number, number[]> = {
    2023: [15, 25, 35, 12, 65, 10, 45, 38, 28, 50, 18, 20],
    2024: [22, 38, 30, 14, 75, 18, 42, 34, 24, 78, 15, 19],
    2025: [18, 28, 38, 20, 60, 12, 50, 40, 32, 68, 22, 25],
  };

  const dadosFiltrados =
    mesesSelecionados.length > 0
      ? mesesSelecionados.map((mes) => dados[anoSelecionado][meses.indexOf(mes)] || 0)
      : dados[anoSelecionado];

  const lucroFiltrados =
    mesesSelecionados.length > 0
      ? mesesSelecionados.map((mes) => lucro[anoSelecionado][meses.indexOf(mes)] || 0)
      : lucro[anoSelecionado];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar fixa */}
      <div className="w-64 bg-gray-100 shadow-md">
        <Sidebar title="Irrigação Smart" username="Usuário" />
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 overflow-y-auto p-6 mt-20">
        {/* Filtros */}
        <div className="bg-white p-4 mb-6 rounded-lg shadow flex flex-wrap gap-4">
          {/* Filtro de Ano */}
          <select
            value={anoSelecionado}
            onChange={(e) => setAnoSelecionado(Number(e.target.value))}
            className="p-2 border rounded"
          >
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>

          {/* Filtro de Meses */}
          <MultiSelect
            value={mesesSelecionados}
            options={meses.map((mes) => ({ label: mes, value: mes }))}
            onChange={(e) => setMesesSelecionados(e.value)}
            placeholder="Selecione os meses"
            className="w-72"
          />
        </div>

        {/* Container dos gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gráfico de Serviços Realizados */}
          <div className="bg-white rounded-lg shadow p-4 h-96">
            <h2 className="text-lg font-medium mb-4 text-black">Serviços Realizados</h2>
            <Chart type="bar" data={{ labels: meses, datasets: [{ label: 'Serviços', data: dadosFiltrados, backgroundColor: '#36A2EB' }] }} style={{ height: '320px' }} />
          </div>

          {/* Gráfico de Lucro */}
          <div className="bg-white rounded-lg shadow p-4 h-96">
            <h2 className="text-lg font-medium mb-4 text-black">Faturamento</h2>
            <Chart type="bar" data={{ labels: meses, datasets: [{ label: 'Lucro', data: lucroFiltrados, backgroundColor: '#9CCC65' }] }} style={{ height: '320px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
