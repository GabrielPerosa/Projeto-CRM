'use client'
//import { getServerSession } from 'next-auth';
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { Chart } from 'primereact/chart';
//import { redirect } from 'next/navigation';
//import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { FaChartColumn } from "react-icons/fa6"; // Importa o ícone de gráfico de barras
import { MultiSelect } from "primereact/multiselect"; // Importa o componente MultiSelect para seleções múltiplas
import { getSession } from 'next-auth/react';
import { Loading } from '@/components/Loading';
import { Dropdown } from 'primereact/dropdown';

export default function Home() {
  // const session = await getServerSession(authOptions);
  const [selectedChart, setSelectedChart] = useState<string | null>('A');
  const [selectedYear, setSelectedYear] = useState<any>();
  const [selectedMonths, setMonths] = useState([]);
  const [selectedStates, setStates] = useState([]);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Inicia como true
  const [dataTime, setDataTime] = useState<any>(null); // Inicia como null
  const [providersData, setProvidersData] = useState<any>(null); 

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
    // Simula uma chamada de API
    const data = {
      2023: {
        "Janeiro": { "SP": { orders: 1500, revenue: 3000 }, "RJ": { orders: 1300, revenue: 2600 }, "MG": { orders: 1100, revenue: 2200 }, "BA": { orders: 900, revenue: 1800 }, "PR": { orders: 1000, revenue: 2000 }, "RS": { orders: 950, revenue: 1900 }, "SC": { orders: 920, revenue: 1840 }, "PE": { orders: 800, revenue: 1600 }, "CE": { orders: 850, revenue: 1700 }, "GO": { orders: 870, revenue: 1740 } },
        "Fevereiro": { "SP": { orders: 1550, revenue: 3100 }, "RJ": { orders: 1340, revenue: 2680 }, "MG": { orders: 1120, revenue: 2240 }, "BA": { orders: 970, revenue: 1940 }, "PR": { orders: 1080, revenue: 2160 }, "RS": { orders: 1030, revenue: 2060 }, "SC": { orders: 1010, revenue: 2020 }, "PE": { orders: 870, revenue: 1740 }, "CE": { orders: 900, revenue: 1800 }, "GO": { orders: 920, revenue: 1840 } },
        "Março": { "SP": { orders: 1600, revenue: 3200 }, "RJ": { orders: 1380, revenue: 2760 }, "MG": { orders: 1150, revenue: 2300 }, "BA": { orders: 990, revenue: 1980 }, "PR": { orders: 1100, revenue: 2200 }, "RS": { orders: 1050, revenue: 2100 }, "SC": { orders: 1030, revenue: 2060 }, "PE": { orders: 890, revenue: 1780 }, "CE": { orders: 920, revenue: 1840 }, "GO": { orders: 940, revenue: 1880 } },
        "Abril": { "SP": { orders: 1650, revenue: 3300 }, "RJ": { orders: 1420, revenue: 2840 }, "MG": { orders: 1180, revenue: 2360 }, "BA": { orders: 1010, revenue: 2020 }, "PR": { orders: 1130, revenue: 2260 }, "RS": { orders: 1080, revenue: 2160 }, "SC": { orders: 1060, revenue: 2120 }, "PE": { orders: 910, revenue: 1820 }, "CE": { orders: 940, revenue: 1880 }, "GO": { orders: 960, revenue: 1920 } },
        "Maio": { "SP": { orders: 1700, revenue: 3400 }, "RJ": { orders: 1460, revenue: 2920 }, "MG": { orders: 1210, revenue: 2420 }, "BA": { orders: 1030, revenue: 2060 }, "PR": { orders: 1160, revenue: 2320 }, "RS": { orders: 1110, revenue: 2220 }, "SC": { orders: 1090, revenue: 2180 }, "PE": { orders: 930, revenue: 1860 }, "CE": { orders: 960, revenue: 1920 }, "GO": { orders: 980, revenue: 1960 } },
        "Junho": { "SP": { orders: 1750, revenue: 3500 }, "RJ": { orders: 1500, revenue: 3000 }, "MG": { orders: 1240, revenue: 2480 }, "BA": { orders: 1050, revenue: 2100 }, "PR": { orders: 1190, revenue: 2380 }, "RS": { orders: 1140, revenue: 2280 }, "SC": { orders: 1120, revenue: 2240 }, "PE": { orders: 950, revenue: 1900 }, "CE": { orders: 980, revenue: 1960 }, "GO": { orders: 1000, revenue: 2000 } },
        "Julho": { "SP": { orders: 1800, revenue: 3600 }, "RJ": { orders: 1540, revenue: 3080 }, "MG": { orders: 1270, revenue: 2540 }, "BA": { orders: 1070, revenue: 2140 }, "PR": { orders: 1220, revenue: 2440 }, "RS": { orders: 1170, revenue: 2340 }, "SC": { orders: 1150, revenue: 2300 }, "PE": { orders: 970, revenue: 1940 }, "CE": { orders: 1000, revenue: 2000 }, "GO": { orders: 1020, revenue: 2040 } },
        "Agosto": { "SP": { orders: 1850, revenue: 3700 }, "RJ": { orders: 1580, revenue: 3160 }, "MG": { orders: 1300, revenue: 2600 }, "BA": { orders: 1090, revenue: 2180 }, "PR": { orders: 1250, revenue: 2500 }, "RS": { orders: 1200, revenue: 2400 }, "SC": { orders: 1180, revenue: 2360 }, "PE": { orders: 990, revenue: 1980 }, "CE": { orders: 1020, revenue: 2040 }, "GO": { orders: 1040, revenue: 2080 } },
        "Setembro": { "SP": { orders: 1900, revenue: 3800 }, "RJ": { orders: 1620, revenue: 3240 }, "MG": { orders: 1330, revenue: 2660 }, "BA": { orders: 1110, revenue: 2220 }, "PR": { orders: 1280, revenue: 2560 }, "RS": { orders: 1230, revenue: 2460 }, "SC": { orders: 1210, revenue: 2420 }, "PE": { orders: 1010, revenue: 2020 }, "CE": { orders: 1040, revenue: 2080 }, "GO": { orders: 1060, revenue: 2120 } },
        "Outubro": { "SP": { orders: 1950, revenue: 3900 }, "RJ": { orders: 1660, revenue: 3320 }, "MG": { orders: 1360, revenue: 2720 }, "BA": { orders: 1130, revenue: 2260 }, "PR": { orders: 1310, revenue: 2620 }, "RS": { orders: 1260, revenue: 2520 }, "SC": { orders: 1240, revenue: 2480 }, "PE": { orders: 1030, revenue: 2060 }, "CE": { orders: 1060, revenue: 2120 }, "GO": { orders: 1080, revenue: 2160 } },
        "Novembro": { "SP": { orders: 2000, revenue: 4000 }, "RJ": { orders: 1700, revenue: 3400 }, "MG": { orders: 1390, revenue: 2780 }, "BA": { orders: 1150, revenue: 2300 }, "PR": { orders: 1340, revenue: 2680 }, "RS": { orders: 1290, revenue: 2580 }, "SC": { orders: 1270, revenue: 2540 }, "PE": { orders: 1050, revenue: 2100 }, "CE": { orders: 1080, revenue: 2160 }, "GO": { orders: 1100, revenue: 2200 } },
        "Dezembro": { "SP": { orders: 2100, revenue: 4200 }, "RJ": { orders: 1800, revenue: 3600 }, "MG": { orders: 1450, revenue: 2900 }, "BA": { orders: 1200, revenue: 2400 }, "PR": { orders: 1400, revenue: 2800 }, "RS": { orders: 1350, revenue: 2700 }, "SC": { orders: 1330, revenue: 2660 }, "PE": { orders: 1100, revenue: 2200 }, "CE": { orders: 1130, revenue: 2260 }, "GO": { orders: 1150, revenue: 2300 } }
      },
      2024: {
        "Janeiro": { "SP": { orders: 1500, revenue: 3000 }, "RJ": { orders: 1890, revenue: 3780 }, "MG": { orders: 1520, revenue: 3040 }, "BA": { orders: 1270, revenue: 2540 }, "PR": { orders: 1480, revenue: 2960 }, "RS": { orders: 1430, revenue: 2860 }, "SC": { orders: 1410, revenue: 2820 }, "PE": { orders: 1170, revenue: 2340 }, "CE": { orders: 1200, revenue: 2400 }, "GO": { orders: 1220, revenue: 2440 } },
        "Fevereiro": { "SP": { orders: 1550, revenue: 3100 }, "RJ": { orders: 1890, revenue: 3780 }, "MG": { orders: 1520, revenue: 3040 }, "BA": { orders: 1270, revenue: 2540 }, "PR": { orders: 1480, revenue: 2960 }, "RS": { orders: 1430, revenue: 2860 }, "SC": { orders: 1410, revenue: 2820 }, "PE": { orders: 1170, revenue: 2340 }, "CE": { orders: 1200, revenue: 2400 }, "GO": { orders: 1220, revenue: 2440 } },
        "Março": { "SP": { orders: 1600, revenue: 3200 }, "RJ": { orders: 1930, revenue: 3860 }, "MG": { orders: 1550, revenue: 3100 }, "BA": { orders: 1290, revenue: 2580 }, "PR": { orders: 1500, revenue: 3000 }, "RS": { orders: 1450, revenue: 2900 }, "SC": { orders: 1430, revenue: 2860 }, "PE": { orders: 1190, revenue: 2380 }, "CE": { orders: 1220, revenue: 2440 }, "GO": { orders: 1240, revenue: 2480 } },
        "Abril": { "SP": { orders: 1650, revenue: 3300 }, "RJ": { orders: 1970, revenue: 3940 }, "MG": { orders: 1580, revenue: 3160 }, "BA": { orders: 1310, revenue: 2620 }, "PR": { orders: 1530, revenue: 3060 }, "RS": { orders: 1480, revenue: 2960 }, "SC": { orders: 1460, revenue: 2920 }, "PE": { orders: 1210, revenue: 2420 }, "CE": { orders: 1240, revenue: 2480 }, "GO": { orders: 1260, revenue: 2520 } },
        "Maio": { "SP": { orders: 1700, revenue: 3400 }, "RJ": { orders: 2010, revenue: 4020 }, "MG": { orders: 1610, revenue: 3220 }, "BA": { orders: 1330, revenue: 2660 }, "PR": { orders: 1560, revenue: 3120 }, "RS": { orders: 1510, revenue: 3020 }, "SC": { orders: 1490, revenue: 2980 }, "PE": { orders: 1230, revenue: 2460 }, "CE": { orders: 1260, revenue: 2520 }, "GO": { orders: 1280, revenue: 2560 } },
        "Junho": { "SP": { orders: 1750, revenue: 3500 }, "RJ": { orders: 2050, revenue: 4100 }, "MG": { orders: 1640, revenue: 3280 }, "BA": { orders: 1350, revenue: 2700 }, "PR": { orders: 1590, revenue: 3180 }, "RS": { orders: 1540, revenue: 3080 }, "SC": { orders: 1520, revenue: 3040 }, "PE": { orders: 1250, revenue: 2500 }, "CE": { orders: 1280, revenue: 2560 }, "GO": { orders: 1300, revenue: 2600 } },
        "Julho": { "SP": { orders: 1800, revenue: 3600 }, "RJ": { orders: 2090, revenue: 4180 }, "MG": { orders: 1670, revenue: 3340 }, "BA": { orders: 1370, revenue: 2740 }, "PR": { orders: 1620, revenue: 3240 }, "RS": { orders: 1570, revenue: 3140 }, "SC": { orders: 1550, revenue: 3100 }, "PE": { orders: 1270, revenue: 2540 }, "CE": { orders: 1300, revenue: 2600 }, "GO": { orders: 1320, revenue: 2640 } },
        "Agosto": { "SP": { orders: 1850, revenue: 3700 }, "RJ": { orders: 2130, revenue: 4260 }, "MG": { orders: 1700, revenue: 3400 }, "BA": { orders: 1390, revenue: 2780 }, "PR": { orders: 1650, revenue: 3300 }, "RS": { orders: 1600, revenue: 3200 }, "SC": { orders: 1580, revenue: 3160 }, "PE": { orders: 1290, revenue: 2580 }, "CE": { orders: 1320, revenue: 2640 }, "GO": { orders: 1340, revenue: 2680 } },
        "Setembro": { "SP": { orders: 1900, revenue: 3800 }, "RJ": { orders: 2170, revenue: 4340 }, "MG": { orders: 1730, revenue: 3460 }, "BA": { orders: 1410, revenue: 2820 }, "PR": { orders: 1680, revenue: 3360 }, "RS": { orders: 1630, revenue: 3260 }, "SC": { orders: 1610, revenue: 3220 }, "PE": { orders: 1310, revenue: 2620 }, "CE": { orders: 1340, revenue: 2680 }, "GO": { orders: 1360, revenue: 2720 } },
        "Outubro": { "SP": { orders: 1950, revenue: 3900 }, "RJ": { orders: 2210, revenue: 4420 }, "MG": { orders: 1760, revenue: 3520 }, "BA": { orders: 1430, revenue: 2860 }, "PR": { orders: 1710, revenue: 3420 }, "RS": { orders: 1660, revenue: 3320 }, "SC": { orders: 1640, revenue: 3280 }, "PE": { orders: 1330, revenue: 2660 }, "CE": { orders: 1360, revenue: 2720 }, "GO": { orders: 1380, revenue: 2760 } },
        "Novembro": { "SP": { orders: 2000, revenue: 4000 }, "RJ": { orders: 2250, revenue: 4500 }, "MG": { orders: 1790, revenue: 3580 }, "BA": { orders: 1450, revenue: 2900 }, "PR": { orders: 1740, revenue: 3480 }, "RS": { orders: 1690, revenue: 3380 }, "SC": { orders: 1670, revenue: 3340 }, "PE": { orders: 1350, revenue: 2700 }, "CE": { orders: 1380, revenue: 2760 }, "GO": { orders: 1400, revenue: 2800 } },
        "Dezembro": { "SP": { orders: 2100, revenue: 4200 }, "RJ": { orders: 2350, revenue: 4700 }, "MG": { orders: 1850, revenue: 3700 }, "BA": { orders: 1500, revenue: 3000 }, "PR": { orders: 1800, revenue: 3600 }, "RS": { orders: 1750, revenue: 3500 }, "SC": { orders: 1730, revenue: 3460 }, "PE": { orders: 1400, revenue: 2800 }, "CE": { orders: 1430, revenue: 2860 }, "GO": { orders: 1450, revenue: 2900 } }
      }
    };
    setDataTime(data);
    setSelectedYear(Math.max(...Object.keys(data).map(Number))); // Define o ano padrão
    const providers = { 2023: {"Gabriel Faria": 20, "Guilherme Kaneda": 17, "Giovani Rodrigues": 15}, 2024: {"Guilherme Kaneda": 17, "Gabriel Faria": 20, "Giovani Rodrigues": 15, "Gabriel Alvim": 10} }
    setProvidersData(providers)
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

  function checkoutMonthsSelected(year: any) {
    const avaliableMonthsInYear = Object.keys(dataTime[year])
    selectedMonths.forEach((month) => {
      if (!avaliableMonthsInYear.includes(month)) {
        // Remove os meses não disponíveis no ano selecionado
        setMonths((prevMonths) => prevMonths.filter((m) => m !== month));
      }
    });
  }

  function getOrdersValue() {
    const arr: number[] = []
    let months: string[] = []

    // Determina qual coleção de meses usar
    if (sortedMonths.length == 0) {
      months = availableMonths
    }
    else {
      months = sortedMonths
    }

    months.forEach((month) => {
      let result: number = 0
      if (selectedStates.length == 0) {
        availableStates.forEach((state) => {
          result += dataTime[selectedYear][month][state]["orders"]
        })
      }
      else {
        selectedStates.forEach((state) => {
          result += dataTime[selectedYear][month][state]["orders"]
        })
      }
      arr.push(result)
    })
    return arr
  }

  function getRevenue() {
    const arr: number[] = []
    let states: string[] = []

    // Determina qual coleção de meses usar
    if (selectedStates.length == 0) {
      states = availableStates
    }
    else {
      states = selectedStates
    }

    states.forEach((state) => {
      let result: number = 0
      if (selectedMonths.length == 0) {
        availableMonths.forEach((month) => {
          result += dataTime[selectedYear][month][state]["revenue"]
        })
      }
      else {
        selectedMonths.forEach((month) => {
          result += dataTime[selectedYear][month][state]["revenue"]
        })
      }
      arr.push(result)
    })
    return arr
  }

  function getProvidersData () {
    providersData.forEach((provider: string) => {
      provider
    })
  }
  // CRIAR FUNÇÂO PARA SOMAR VALORES DOS MESES SELECIONADOS (todos os estados)
  // REFATORAR PARA SORTEDMONTHS SER APENAS SELECTEDMONTHS
  // CRIAR FUNÇÂO PARA SOMAR VALORES DOS ESTADOS SELECIONADOS (para os meses selecionados)  
  const years = Object.keys(dataTime); // histórico de anos
  const availableStates = ["SP", "RJ", "MG", "BA", "PR", "RS", "SC", "PE", "CE", "GO"]; // ISSO VEM DA API TBM (Quais UFs estão presentes)
  const availableMonths = Object.keys(dataTime[selectedYear]); // meses disponiveis do ano selecionado
  const sortMonths = { // ordenação dos meses apenas
    'Janeiro': 1,
    'Fevereiro': 2,
    'Março': 3,
    'Abril': 4,
    'Maio': 5,
    'Junho': 6,
    'Julho': 7,
    'Agosto': 8,
    'Setembro': 9,
    'Outubro': 10,
    'Novembro': 11,
    'Dezembro': 12
  };

  // Ordena os meses de acordo com a ordem definida
  const sortedMonths = [...selectedMonths].sort((a, b) => sortMonths[a] - sortMonths[b]);

  // Opções de configurações do gráfico
  const chartOptions = { responsive: true, maintainAspectRatio: false, };

  // cores para o dashboard
  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#238080", "#0000CD", "#008080", "#32CD32", "#D2691E", "#7B68EE", "#DC143C"]
  // Dados mockados para os gráficos
  const mockData = {
    A: {
      // Gráfico de pizza
      labels: selectedStates.length == 0 ? availableStates : selectedStates,
      datasets: [
        {
          data: getRevenue(),
          backgroundColor: colors,
        },
      ],
    },
    B: {
      // Gráfico de barras
      labels: selectedMonths.length == 0 ? availableMonths : sortedMonths,
      datasets: [
        {
          label: `Pedidos - ${selectedYear}`,
          backgroundColor: colors.slice(0, 3),
          data: getOrdersValue(),

        },
      ],
    },
    C: {
      // Gráfico de donut
      labels: Object.keys(providersData[selectedYear]),
      datasets: [
        { 
          label: "Projetos Realizados",
          data: Object.values(providersData[selectedYear]),
          backgroundColor: colors,
        },
      ],
    },
  };

  // Tipos e títulos dos gráficos
  const charts = {
    A: { type: "pie", title: "Faturamento" },
    B: { type: "bar", title: "Pedidos" },
    C: { type: "doughnut", title: "Prestador" },
  }
  const chartsToShow = ['A', 'B', 'C'];

  // Verifica se a sessão está carregando

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Componente Sidebar que exibe o menu lateral */}
      <Sidebar title="Bem-vindo" username="Usuário" />

      <div className="flex-1 p-6 flex flex-col">
        {/* Filtros de seleção (meses, estados e ano) */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          {selectedChart != "C" && (
            <>
              <MultiSelect
                value={sortedMonths}
                options={availableMonths}
                onChange={(e) => setMonths(e.value)} // Atualiza o estado de meses
                placeholder="Selecione os meses"
                display="chip"
              />
              <MultiSelect
                value={selectedStates}
                options={availableStates}
                onChange={(e) => setStates(e.value)} // Atualiza o estado de estados
                placeholder="Selecione os estados"
                display="chip"
              />
            </>
          )}
          <Dropdown
            value={selectedYear}
            options={years}
            onChange={(e) => { checkoutMonthsSelected(e.value); setSelectedYear(e.value); }} // Atualiza o estado do year
            placeholder={selectedYear}
          />
        </div>

        {/* Exibe os botões para selecionar os gráficos */}
        <div className="flex flex-wrap gap-6 justify-center">
          {chartsToShow.map(key => {
            return (
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
          </div>
      </div>
    </div>
  );
}
