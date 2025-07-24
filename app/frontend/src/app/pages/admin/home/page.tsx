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
  const [selectedChart, setSelectedChart] = useState<string| null>(null);
  const [year, setYear] = useState<any>();
  const [selectedMonths, setMonths] = useState([]);
  const [selectedStates, setStates] = useState([]);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Inicia como true
  const [dataTime, setDataTime] = useState<any>(null); // Inicia como null

  // Funções de busca de dados
  const fetchSession = async () => {
    try {
      const sessionData = await getSession();
      if(sessionData){
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
        "Janeiro":   { "SP": 1500, "RJ": 1300, "MG": 1100, "BA": 900, "PR": 1000, "RS": 950, "SC": 920, "PE": 800, "CE": 850, "GO": 870 },
        "Fevereiro": { "SP": 1550, "RJ": 1340, "MG": 1120, "BA": 970, "PR": 1080, "RS": 1030, "SC": 1010, "PE": 870, "CE": 900, "GO": 920 },
        "Março":     { "SP": 1600, "RJ": 1380, "MG": 1150, "BA": 990, "PR": 1100, "RS": 1050, "SC": 1030, "PE": 890, "CE": 920, "GO": 940 },
        "Abril":     { "SP": 1650, "RJ": 1420, "MG": 1180, "BA": 1010, "PR": 1130, "RS": 1080, "SC": 1060, "PE": 910, "CE": 940, "GO": 960 },
        "Maio":      { "SP": 1700, "RJ": 1460, "MG": 1210, "BA": 1030, "PR": 1160, "RS": 1110, "SC": 1090, "PE": 930, "CE": 960, "GO": 980 },
        "Junho":     { "SP": 1750, "RJ": 1500, "MG": 1240, "BA": 1050, "PR": 1190, "RS": 1140, "SC": 1120, "PE": 950, "CE": 980, "GO": 1000 },
        "Julho":     { "SP": 1800, "RJ": 1540, "MG": 1270, "BA": 1070, "PR": 1220, "RS": 1170, "SC": 1150, "PE": 970, "CE": 1000, "GO": 1020 },
        "Agosto":    { "SP": 1850, "RJ": 1580, "MG": 1300, "BA": 1090, "PR": 1250, "RS": 1200, "SC": 1180, "PE": 990, "CE": 1020, "GO": 1040 },
        "Setembro":  { "SP": 1900, "RJ": 1620, "MG": 1330, "BA": 1110, "PR": 1280, "RS": 1230, "SC": 1210, "PE": 1010, "CE": 1040, "GO": 1060 },
        "Outubro":   { "SP": 1950, "RJ": 1660, "MG": 1360, "BA": 1130, "PR": 1310, "RS": 1260, "SC": 1240, "PE": 1030, "CE": 1060, "GO": 1080 },
        "Novembro":  { "SP": 2000, "RJ": 1700, "MG": 1390, "BA": 1150, "PR": 1340, "RS": 1290, "SC": 1270, "PE": 1050, "CE": 1080, "GO": 1100 },
        "Dezembro":  { "SP": 2100, "RJ": 1800, "MG": 1450, "BA": 1200, "PR": 1400, "RS": 1350, "SC": 1330, "PE": 1100, "CE": 1130, "GO": 1150 }
      },
      2024: {
        "Janeiro":   { "SP": 1500, "RJ": 1890, "MG": 1520, "BA": 1270, "PR": 1480, "RS": 1430, "SC": 1410, "PE": 1170, "CE": 1200, "GO": 1220 },
        "Fevereiro": { "SP": 1550, "RJ": 1890, "MG": 1520, "BA": 1270, "PR": 1480, "RS": 1430, "SC": 1410, "PE": 1170, "CE": 1200, "GO": 1220 },
        "Março":     { "SP": 1600, "RJ": 1930, "MG": 1550, "BA": 1290, "PR": 1500, "RS": 1450, "SC": 1430, "PE": 1190, "CE": 1220, "GO": 1240 },
        "Abril":     { "SP": 1650, "RJ": 1970, "MG": 1580, "BA": 1310, "PR": 1530, "RS": 1480, "SC": 1460, "PE": 1210, "CE": 1240, "GO": 1260 },
        "Maio":      { "SP": 1700, "RJ": 2010, "MG": 1610, "BA": 1330, "PR": 1560, "RS": 1510, "SC": 1490, "PE": 1230, "CE": 1260, "GO": 1280 },
        "Junho":     { "SP": 1750, "RJ": 2050, "MG": 1640, "BA": 1350, "PR": 1590, "RS": 1540, "SC": 1520, "PE": 1250, "CE": 1280, "GO": 1300 },
        "Julho":     { "SP": 1800, "RJ": 2090, "MG": 1670, "BA": 1370, "PR": 1620, "RS": 1570, "SC": 1550, "PE": 1270, "CE": 1300, "GO": 1320 },
        "Agosto":    { "SP": 1850, "RJ": 2130, "MG": 1700, "BA": 1390, "PR": 1650, "RS": 1600, "SC": 1580, "PE": 1290, "CE": 1320, "GO": 1340 },
        "Setembro":  { "SP": 1900, "RJ": 2170, "MG": 1730, "BA": 1410, "PR": 1680, "RS": 1630, "SC": 1610, "PE": 1310, "CE": 1340, "GO": 1360 },
        "Outubro":   { "SP": 1950, "RJ": 2210, "MG": 1760, "BA": 1430, "PR": 1710, "RS": 1660, "SC": 1640, "PE": 1330, "CE": 1360, "GO": 1380 },
        "Novembro":  { "SP": 2000, "RJ": 2250, "MG": 1790, "BA": 1450, "PR": 1740, "RS": 1690, "SC": 1670, "PE": 1350, "CE": 1380, "GO": 1400 },
        "Dezembro":  { "SP": 2100, "RJ": 2350, "MG": 1850, "BA": 1500, "PR": 1800, "RS": 1750, "SC": 1730, "PE": 1400, "CE": 1430, "GO": 1450 }
      }
    };
    setDataTime(data);
    setYear(Math.max(...Object.keys(data).map(Number))); // Define o ano padrão
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

  function checkoutMonthsSelected (year: any) {
    const avaliableMonthsInYear = Object.keys(dataTime[year])
    selectedMonths.forEach((month) => {
      if (!avaliableMonthsInYear.includes(month)) {
        // Remove os meses não disponíveis no ano selecionado
        setMonths((prevMonths) => prevMonths.filter((m) => m !== month));
      }
    });
  }
  function returnValue() {
    const arr: number[] = []
    //if (sortedMonths.length == 0)
      
    sortedMonths.forEach((month) => {

      let result: number = 0
      if (selectedStates.length == 0) {
        availableStates.forEach((state) => {
          result += dataTime[year][month][state]
        })
      }
      else {
        selectedStates.forEach((state) => {
          result += dataTime[year][month][state]
        })
      }
        arr.push(result)
    })
    return arr
  }
  // CRIAR FUNÇÂO PARA SOMAR VALORES DOS MESES SELECIONADOS (todos os estados)
  // REFATORAR PARA SORTEDMONTHS SER APENAS SELECTEDMONTHS
  // CRIAR FUNÇÂO PARA SOMAR VALORES DOS ESTADOS SELECIONADOS (para os meses selecionados)  
  const years = Object.keys(dataTime);
  const availableStates = ["SP", "RJ", "MG", "BA", "PR", "RS", "SC", "PE", "CE", "GO"]; // ISSO VEM DA API TBM
  const availableMonths = Object.keys(dataTime[year]);
  const ordenMonths = {
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
  const sortedMonths = [...selectedMonths].sort((a, b) => ordenMonths[a] - ordenMonths[b]);

  // Opções de configurações do gráfico
  const chartOptions = { responsive: true, maintainAspectRatio: false,};

  // Dados mockados para os gráficos
  const mockData = {
    A: {
      // Gráfico de pizza
      labels: selectedStates.length == 0 ? availableStates : selectedStates,
      datasets: [
        {
          data: [400, 200, 100],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    },
    B: {
      // Gráfico de barras
      labels: selectedMonths.length == 0 ? availableMonths: sortedMonths,
      datasets: [
        {
          label: `Pedidos - ${year}`,
          backgroundColor: "#42A5F5",
          data: returnValue(),
          
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
      labels: ["Estado A", "Estado B", "Estado C"],
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
  
  // Verifica se a sessão está carregando

  
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Componente Sidebar que exibe o menu lateral */}
      <Sidebar title="Bem-vindo" username="Usuário" />

      <div className="flex-1 p-6 flex flex-col">
        {/* Filtros de seleção (meses, estados e ano) */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
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
          <Dropdown
            value={year}
            options={years}
            onChange={(e) => { checkoutMonthsSelected(e.value); setYear(e.value); }} // Atualiza o estado do year
            placeholder={year}
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
