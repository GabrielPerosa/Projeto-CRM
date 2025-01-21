'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Chart } from 'primereact/chart';
import '../globals.css';

export default function Home() {
  const pieData = {
    labels: ['Categoria A', 'Categoria B', 'Categoria C'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const barData = {
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
  };

  const lineData = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [
      {
        label: 'Temperatura',
        data: [22, 24, 19, 23],
        fill: false,
        borderColor: '#4BC0C0',
        tension: 0.4,
      },
    ],
  };

  const polarData = {
    labels: ['Setor 1', 'Setor 2', 'Setor 3', 'Setor 4'],
    datasets: [
      {
        data: [11, 16, 7, 14],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
      },
    ],
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar fixa */}
      <div className="w-64 bg-gray-100 shadow-md">
        <Sidebar title="Irrigação Smart" username="Usuário" />
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 overflow-y-auto p-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Dashboard</h1>

        {/* Container dos gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gráfico de Pizza */}
          <div className="bg-white rounded-lg shadow p-4 h-96">
            <h2 className="text-lg font-medium mb-4 text-black">Gráfico A</h2>
            <Chart type="pie" data={pieData} style={{ height: '320px' }} />
          </div>

          {/* Gráfico de Barras */}
          <div className="bg-white rounded-lg shadow p-4 h-96">
            <h2 className="text-lg font-medium mb-4 text-black">Gráfico B</h2>
            <Chart type="bar" data={barData} style={{ height: '320px' }} />
          </div>

          {/* Gráfico de Linhas */}
          <div className="bg-white rounded-lg shadow p-4 h-96">
            <h2 className="text-lg font-medium mb-4 text-black">Gráfico C</h2>
            <Chart type="line" data={lineData} style={{ height: '320px' }} />
          </div>

          {/* Gráfico Polar */}
          <div className="bg-white rounded-lg shadow p-4 h-96">
            <h2 className="text-lg font-medium mb-4 text-black">Gráfico D</h2>
            <Chart type="polarArea" data={polarData} style={{ height: '320px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
