'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Chart } from 'primereact/chart';
import { MultiSelect } from 'primereact/multiselect';
import { getSession } from 'next-auth/react';
import { Loading } from '@/components/Loading';
import { Dropdown } from 'primereact/dropdown';

export default function Home() {
  const [selectedYear, setSelectedYear] = useState<any>();
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [providerData, setProviderData] = useState<any>()
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Inicia como true

  // Funções de busca de dados
  const fetchSession = async () => {
    try {
      const sessionData = await getSession();
      if (sessionData) {
        setSession(sessionData);
      }
    } catch (error) {
      console.error("Erro ao buscar sessão:", error);
    }
  };

  const fetchData = async () => {
    const data = {
      2023: {
        'Jan': { "done": 2, "revenue": 3000 },
        'Fev': { "done": 1, "revenue": 3000 },
        'Mar': { "done": 2, "revenue": 5200 },
        'Abr': { "done": 0, "revenue": 0 },
        'Mai': { "done": 1, "revenue": 6100 },
        'Jun': { "done": 1, "revenue": 4700 },
        'Jul': { "done": 4, "revenue": 5600 },
        'Ago': { "done": 1, "revenue": 5800 },
        'Set': { "done": 0, "revenue": 0 },
        'Out': { "done": 3, "revenue": 6200 },
        'Nov': { "done": 1, "revenue": 7100 },
        'Dez': { "done": 1, "revenue": 7400 }
      },
      2024: {
        'Fev': { "done": 1, "revenue": 4500 },
        'Mar': { "done": 1, "revenue": 5200 },
        'Abr': { "done": 0, "revenue": 0 },
        'Mai': { "done": 1, "revenue": 6100 },
        'Jun': { "done": 1, "revenue": 4700 },
        'Jul': { "done": 1, "revenue": 5600 },
        'Ago': { "done": 1, "revenue": 5800 },
        'Set': { "done": 0, "revenue": 0 },
        'Out': { "done": 1, "revenue": 6200 },
        'Nov': { "done": 1, "revenue": 7100 },
        'Dez': { "done": 1, "revenue": 7400 }
      }
    }
    setProviderData(data)
    setSelectedYear(Math.max(...Object.keys(data).map(Number)))
  };
    useEffect(() => {
    const initializeApp = async () => {
      try {
        await fetchSession();
        await fetchData();
      } catch (error) {
        console.error("Erro ao inicializar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);
  if (loading) {
    return <Loading />;
  }
  const availableMonths = Object.keys(providerData[selectedYear]); // meses disponiveis do ano selecionado'
  const availableYears = Object.keys(providerData); // meses disponiveis do ano selecionado'
  const sortMonths = { // ordenação dos meses apenas'
      'Jan': 1,
      'Fev': 2,
      'Mar': 3,
      'Abr': 4,
      'Mai': 5,
      'Jun': 6,
      'Jul': 7,
      'Ago': 8,
      'Set': 9,
      'Out': 10,
      'Nov': 11,
      'Dez': 12
  };  // Ordena os meses de acordo com a ordem definida
  const sortedMonths = [...selectedMonths].sort((a, b) => sortMonths[a] - sortMonths[b])
  
  function checkoutMonthsSelected(year: any) {
    const avaliableMonthsInYear = Object.keys(providerData[year])
    selectedMonths.forEach((month) => {
      if (!avaliableMonthsInYear.includes(month)) {
        // Remove os meses não disponíveis no ano selecionado
        setSelectedMonths((prevMonths) => prevMonths.filter((m) => m !== month));
      }
    });
  }
  function getRevenue(option: string) {
    let values: number[] = []
    let months: string[] = []

    if (sortedMonths.length == 0) {
      months = availableMonths
    }
    else {
      months = sortedMonths
    }  
    months.forEach((month) => {
      const value = providerData[selectedYear][month][option]
      values.push(value)
    })
    return values
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar fixa */}
      <div className="w-64 bg-gray-100 shadow-md">
        <Sidebar title="Olá Amigão" username="Usuário" />
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 overflow-y-auto p-6 mt-20">
        {/* Filtros */}
        <div className="bg-white p-4 mb-6 rounded-lg shadow flex flex-wrap gap-4">
          {/* Filtro de Ano */}
          <Dropdown
            value={selectedYear}
            options={availableYears}
            onChange={(e) => { checkoutMonthsSelected(e.value); setSelectedYear(e.value); }} // Atualiza o estado do year
            placeholder={selectedYear}
          />

          {/* Filtro de Meses */}
          <MultiSelect
            value={sortedMonths}
            options={availableMonths}
            onChange={(e) => setSelectedMonths(e.value)}
            placeholder="Selecione os meses"
            className="w-72"
          />
        </div>

        {/* Container dos gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gráfico de Serviços Realizados */}
          <div className="bg-white rounded-lg shadow p-4 h-96">
            <h2 className="text-lg font-medium mb-4 text-black">Serviços Realizados</h2>
            <Chart type="bar" data={{ labels: selectedMonths.length == 0 ? availableMonths : sortedMonths, datasets: [{ label: 'Serviços', data: getRevenue("done"), backgroundColor: '#36A2EB' }] }} style={{ height: '320px' }} />
          </div>

          {/* Gráfico de Lucro */}
          <div className="bg-white rounded-lg shadow p-4 h-96">
            <h2 className="text-lg font-medium mb-4 text-black">Faturamento</h2>
            <Chart type="bar" data={{ labels: selectedMonths.length == 0 ? availableMonths : sortedMonths, datasets: [{ label: 'Faturamento', data: getRevenue("revenue"), backgroundColor: '#9CCC65' }] }} style={{ height: '320px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
