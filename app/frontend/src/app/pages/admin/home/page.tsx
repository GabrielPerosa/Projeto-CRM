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
        "Janeiro": { "AC": { orders: 200, revenue: 400 }, "AL": { orders: 250, revenue: 500 }, "AP": { orders: 180, revenue: 360 }, "AM": { orders: 300, revenue: 600 }, "BA": { orders: 900, revenue: 1800 }, "CE": { orders: 850, revenue: 1700 }, "DF": { orders: 500, revenue: 1000 }, "ES": { orders: 600, revenue: 1200 }, "GO": { orders: 870, revenue: 1740 }, "MA": { orders: 400, revenue: 800 }, "MT": { orders: 420, revenue: 840 }, "MS": { orders: 410, revenue: 820 }, "MG": { orders: 1100, revenue: 2200 }, "PA": { orders: 450, revenue: 900 }, "PB": { orders: 300, revenue: 600 }, "PR": { orders: 1000, revenue: 2000 }, "PE": { orders: 800, revenue: 1600 }, "PI": { orders: 280, revenue: 560 }, "RJ": { orders: 1300, revenue: 2600 }, "RN": { orders: 260, revenue: 520 }, "RS": { orders: 950, revenue: 1900 }, "RO": { orders: 210, revenue: 420 }, "RR": { orders: 150, revenue: 300 }, "SC": { orders: 920, revenue: 1840 }, "SP": { orders: 1500, revenue: 3000 }, "SE": { orders: 230, revenue: 460 }, "TO": { orders: 190, revenue: 380 } },
        "Fevereiro": { "AC": { orders: 205, revenue: 410 }, "AL": { orders: 255, revenue: 510 }, "AP": { orders: 185, revenue: 370 }, "AM": { orders: 310, revenue: 620 }, "BA": { orders: 920, revenue: 1840 }, "CE": { orders: 860, revenue: 1720 }, "DF": { orders: 510, revenue: 1020 }, "ES": { orders: 610, revenue: 1220 }, "GO": { orders: 880, revenue: 1760 }, "MA": { orders: 405, revenue: 810 }, "MT": { orders: 425, revenue: 850 }, "MS": { orders: 415, revenue: 830 }, "MG": { orders: 1120, revenue: 2240 }, "PA": { orders: 455, revenue: 910 }, "PB": { orders: 305, revenue: 610 }, "PR": { orders: 1010, revenue: 2020 }, "PE": { orders: 810, revenue: 1620 }, "PI": { orders: 285, revenue: 570 }, "RJ": { orders: 1320, revenue: 2640 }, "RN": { orders: 265, revenue: 530 }, "RS": { orders: 960, revenue: 1920 }, "RO": { orders: 215, revenue: 430 }, "RR": { orders: 155, revenue: 310 }, "SC": { orders: 930, revenue: 1860 }, "SP": { orders: 1520, revenue: 3040 }, "SE": { orders: 235, revenue: 470 }, "TO": { orders: 195, revenue: 390 } },
        "Março": { "AC": { orders: 210, revenue: 420 }, "AL": { orders: 260, revenue: 520 }, "AP": { orders: 190, revenue: 380 }, "AM": { orders: 320, revenue: 640 }, "BA": { orders: 940, revenue: 1880 }, "CE": { orders: 870, revenue: 1740 }, "DF": { orders: 520, revenue: 1040 }, "ES": { orders: 620, revenue: 1240 }, "GO": { orders: 890, revenue: 1780 }, "MA": { orders: 410, revenue: 820 }, "MT": { orders: 430, revenue: 860 }, "MS": { orders: 420, revenue: 840 }, "MG": { orders: 1140, revenue: 2280 }, "PA": { orders: 460, revenue: 920 }, "PB": { orders: 310, revenue: 620 }, "PR": { orders: 1020, revenue: 2040 }, "PE": { orders: 820, revenue: 1640 }, "PI": { orders: 290, revenue: 580 }, "RJ": { orders: 1340, revenue: 2680 }, "RN": { orders: 270, revenue: 540 }, "RS": { orders: 970, revenue: 1940 }, "RO": { orders: 220, revenue: 440 }, "RR": { orders: 160, revenue: 320 }, "SC": { orders: 940, revenue: 1880 }, "SP": { orders: 1540, revenue: 3080 }, "SE": { orders: 240, revenue: 480 }, "TO": { orders: 200, revenue: 400 } },
        "Abril": { "AC": { orders: 215, revenue: 430 }, "AL": { orders: 265, revenue: 530 }, "AP": { orders: 195, revenue: 390 }, "AM": { orders: 330, revenue: 660 }, "BA": { orders: 960, revenue: 1920 }, "CE": { orders: 880, revenue: 1760 }, "DF": { orders: 530, revenue: 1060 }, "ES": { orders: 630, revenue: 1260 }, "GO": { orders: 900, revenue: 1800 }, "MA": { orders: 415, revenue: 830 }, "MT": { orders: 435, revenue: 870 }, "MS": { orders: 425, revenue: 850 }, "MG": { orders: 1160, revenue: 2320 }, "PA": { orders: 465, revenue: 930 }, "PB": { orders: 315, revenue: 630 }, "PR": { orders: 1030, revenue: 2060 }, "PE": { orders: 830, revenue: 1660 }, "PI": { orders: 295, revenue: 590 }, "RJ": { orders: 1360, revenue: 2720 }, "RN": { orders: 275, revenue: 550 }, "RS": { orders: 980, revenue: 1960 }, "RO": { orders: 225, revenue: 450 }, "RR": { orders: 165, revenue: 330 }, "SC": { orders: 950, revenue: 1900 }, "SP": { orders: 1560, revenue: 3120 }, "SE": { orders: 245, revenue: 490 }, "TO": { orders: 205, revenue: 410 } },
        "Maio": { "AC": { orders: 220, revenue: 440 }, "AL": { orders: 270, revenue: 540 }, "AP": { orders: 200, revenue: 400 }, "AM": { orders: 340, revenue: 680 }, "BA": { orders: 980, revenue: 1960 }, "CE": { orders: 890, revenue: 1780 }, "DF": { orders: 540, revenue: 1080 }, "ES": { orders: 640, revenue: 1280 }, "GO": { orders: 910, revenue: 1820 }, "MA": { orders: 420, revenue: 840 }, "MT": { orders: 440, revenue: 880 }, "MS": { orders: 430, revenue: 860 }, "MG": { orders: 1180, revenue: 2360 }, "PA": { orders: 470, revenue: 940 }, "PB": { orders: 320, revenue: 640 }, "PR": { orders: 1040, revenue: 2080 }, "PE": { orders: 840, revenue: 1680 }, "PI": { orders: 300, revenue: 600 }, "RJ": { orders: 1380, revenue: 2760 }, "RN": { orders: 280, revenue: 560 }, "RS": { orders: 990, revenue: 1980 }, "RO": { orders: 230, revenue: 460 }, "RR": { orders: 170, revenue: 340 }, "SC": { orders: 960, revenue: 1920 }, "SP": { orders: 1580, revenue: 3160 }, "SE": { orders: 250, revenue: 500 }, "TO": { orders: 210, revenue: 420 } },
        "Junho": { "AC": { orders: 225, revenue: 450 }, "AL": { orders: 275, revenue: 550 }, "AP": { orders: 205, revenue: 410 }, "AM": { orders: 350, revenue: 700 }, "BA": { orders: 1000, revenue: 2000 }, "CE": { orders: 900, revenue: 1800 }, "DF": { orders: 550, revenue: 1100 }, "ES": { orders: 650, revenue: 1300 }, "GO": { orders: 920, revenue: 1840 }, "MA": { orders: 425, revenue: 850 }, "MT": { orders: 445, revenue: 890 }, "MS": { orders: 435, revenue: 870 }, "MG": { orders: 1200, revenue: 2400 }, "PA": { orders: 475, revenue: 950 }, "PB": { orders: 325, revenue: 650 }, "PR": { orders: 1050, revenue: 2100 }, "PE": { orders: 850, revenue: 1700 }, "PI": { orders: 305, revenue: 610 }, "RJ": { orders: 1400, revenue: 2800 }, "RN": { orders: 285, revenue: 570 }, "RS": { orders: 1000, revenue: 2000 }, "RO": { orders: 235, revenue: 470 }, "RR": { orders: 175, revenue: 350 }, "SC": { orders: 970, revenue: 1940 }, "SP": { orders: 1600, revenue: 3200 }, "SE": { orders: 255, revenue: 510 }, "TO": { orders: 215, revenue: 430 } },
        "Julho": { "AC": { orders: 230, revenue: 460 }, "AL": { orders: 280, revenue: 560 }, "AP": { orders: 210, revenue: 420 }, "AM": { orders: 360, revenue: 720 }, "BA": { orders: 1020, revenue: 2040 }, "CE": { orders: 910, revenue: 1820 }, "DF": { orders: 560, revenue: 1120 }, "ES": { orders: 660, revenue: 1320 }, "GO": { orders: 930, revenue: 1860 }, "MA": { orders: 430, revenue: 860 }, "MT": { orders: 450, revenue: 900 }, "MS": { orders: 440, revenue: 880 }, "MG": { orders: 1220, revenue: 2440 }, "PA": { orders: 480, revenue: 960 }, "PB": { orders: 330, revenue: 660 }, "PR": { orders: 1060, revenue: 2120 }, "PE": { orders: 860, revenue: 1720 }, "PI": { orders: 310, revenue: 620 }, "RJ": { orders: 1420, revenue: 2840 }, "RN": { orders: 290, revenue: 580 }, "RS": { orders: 1010, revenue: 2020 }, "RO": { orders: 240, revenue: 480 }, "RR": { orders: 180, revenue: 360 }, "SC": { orders: 980, revenue: 1960 }, "SP": { orders: 1620, revenue: 3240 }, "SE": { orders: 260, revenue: 520 }, "TO": { orders: 220, revenue: 440 } },
        "Agosto": { "AC": { orders: 235, revenue: 470 }, "AL": { orders: 285, revenue: 570 }, "AP": { orders: 215, revenue: 430 }, "AM": { orders: 370, revenue: 740 }, "BA": { orders: 1040, revenue: 2080 }, "CE": { orders: 920, revenue: 1840 }, "DF": { orders: 570, revenue: 1140 }, "ES": { orders: 670, revenue: 1340 }, "GO": { orders: 940, revenue: 1880 }, "MA": { orders: 435, revenue: 870 }, "MT": { orders: 455, revenue: 910 }, "MS": { orders: 445, revenue: 890 }, "MG": { orders: 1240, revenue: 2480 }, "PA": { orders: 485, revenue: 970 }, "PB": { orders: 335, revenue: 670 }, "PR": { orders: 1070, revenue: 2140 }, "PE": { orders: 870, revenue: 1740 }, "PI": { orders: 315, revenue: 630 }, "RJ": { orders: 1440, revenue: 2880 }, "RN": { orders: 295, revenue: 590 }, "RS": { orders: 1020, revenue: 2040 }, "RO": { orders: 245, revenue: 490 }, "RR": { orders: 185, revenue: 370 }, "SC": { orders: 990, revenue: 1980 }, "SP": { orders: 1640, revenue: 3280 }, "SE": { orders: 265, revenue: 530 }, "TO": { orders: 225, revenue: 450 } },
        "Setembro": { "AC": { orders: 210, revenue: 420 }, "AL": { orders: 265, revenue: 530 }, "AP": { orders: 175, revenue: 350 }, "AM": { orders: 320, revenue: 640 }, "BA": { orders: 950, revenue: 1900 }, "CE": { orders: 870, revenue: 1740 }, "DF": { orders: 520, revenue: 1040 }, "ES": { orders: 630, revenue: 1260 }, "GO": { orders: 890, revenue: 1780 }, "MA": { orders: 415, revenue: 830 }, "MT": { orders: 435, revenue: 870 }, "MS": { orders: 430, revenue: 860 }, "MG": { orders: 1150, revenue: 2300 }, "PA": { orders: 470, revenue: 940 }, "PB": { orders: 310, revenue: 620 }, "PR": { orders: 1020, revenue: 2040 }, "PE": { orders: 830, revenue: 1660 }, "PI": { orders: 290, revenue: 580 }, "RJ": { orders: 1350, revenue: 2700 }, "RN": { orders: 275, revenue: 550 }, "RS": { orders: 980, revenue: 1960 }, "RO": { orders: 220, revenue: 440 }, "RR": { orders: 160, revenue: 320 }, "SC": { orders: 950, revenue: 1900 }, "SP": { orders: 1550, revenue: 3100 }, "SE": { orders: 245, revenue: 490 }, "TO": { orders: 200, revenue: 400 } },
        "Outubro": { "AC": { orders: 220, revenue: 440 }, "AL": { orders: 275, revenue: 550 }, "AP": { orders: 185, revenue: 370 }, "AM": { orders: 330, revenue: 660 }, "BA": { orders: 970, revenue: 1940 }, "CE": { orders: 890, revenue: 1780 }, "DF": { orders: 540, revenue: 1080 }, "ES": { orders: 640, revenue: 1280 }, "GO": { orders: 910, revenue: 1820 }, "MA": { orders: 420, revenue: 840 }, "MT": { orders: 440, revenue: 880 }, "MS": { orders: 435, revenue: 870 }, "MG": { orders: 1170, revenue: 2340 }, "PA": { orders: 480, revenue: 960 }, "PB": { orders: 320, revenue: 640 }, "PR": { orders: 1040, revenue: 2080 }, "PE": { orders: 850, revenue: 1700 }, "PI": { orders: 295, revenue: 590 }, "RJ": { orders: 1370, revenue: 2740 }, "RN": { orders: 280, revenue: 560 }, "RS": { orders: 1000, revenue: 2000 }, "RO": { orders: 225, revenue: 450 }, "RR": { orders: 165, revenue: 330 }, "SC": { orders: 970, revenue: 1940 }, "SP": { orders: 1580, revenue: 3160 }, "SE": { orders: 250, revenue: 500 }, "TO": { orders: 205, revenue: 410 } },
        "Novembro": { "AC": { orders: 230, revenue: 460 }, "AL": { orders: 280, revenue: 560 }, "AP": { orders: 190, revenue: 380 }, "AM": { orders: 340, revenue: 680 }, "BA": { orders: 990, revenue: 1980 }, "CE": { orders: 910, revenue: 1820 }, "DF": { orders: 550, revenue: 1100 }, "ES": { orders: 650, revenue: 1300 }, "GO": { orders: 930, revenue: 1860 }, "MA": { orders: 430, revenue: 860 }, "MT": { orders: 450, revenue: 900 }, "MS": { orders: 440, revenue: 880 }, "MG": { orders: 1200, revenue: 2400 }, "PA": { orders: 490, revenue: 980 }, "PB": { orders: 330, revenue: 660 }, "PR": { orders: 1060, revenue: 2120 }, "PE": { orders: 870, revenue: 1740 }, "PI": { orders: 300, revenue: 600 }, "RJ": { orders: 1400, revenue: 2800 }, "RN": { orders: 290, revenue: 580 }, "RS": { orders: 1020, revenue: 2040 }, "RO": { orders: 230, revenue: 460 }, "RR": { orders: 170, revenue: 340 }, "SC": { orders: 990, revenue: 1980 }, "SP": { orders: 1600, revenue: 3200 }, "SE": { orders: 260, revenue: 520 }, "TO": { orders: 210, revenue: 420 } },
        "Dezembro": { "AC": { orders: 240, revenue: 480 }, "AL": { orders: 290, revenue: 580 }, "AP": { orders: 200, revenue: 400 }, "AM": { orders: 350, revenue: 700 }, "BA": { orders: 1020, revenue: 2040 }, "CE": { orders: 930, revenue: 1860 }, "DF": { orders: 570, revenue: 1140 }, "ES": { orders: 670, revenue: 1340 }, "GO": { orders: 950, revenue: 1900 }, "MA": { orders: 440, revenue: 880 }, "MT": { orders: 460, revenue: 920 }, "MS": { orders: 450, revenue: 900 }, "MG": { orders: 1250, revenue: 2500 }, "PA": { orders: 500, revenue: 1000 }, "PB": { orders: 340, revenue: 680 }, "PR": { orders: 1100, revenue: 2200 }, "PE": { orders: 900, revenue: 1800 }, "PI": { orders: 310, revenue: 620 }, "RJ": { orders: 1450, revenue: 2900 }, "RN": { orders: 300, revenue: 600 }, "RS": { orders: 1050, revenue: 2100 }, "RO": { orders: 240, revenue: 480 }, "RR": { orders: 180, revenue: 360 }, "SC": { orders: 1020, revenue: 2040 }, "SP": { orders: 1650, revenue: 3300 }, "SE": { orders: 270, revenue: 540 }, "TO": { orders: 220, revenue: 440 } },


      },
      2024: {
        "Janeiro": { "AC": { orders: 400, revenue: 800 }, "AL": { orders: 500, revenue: 1000 }, "AP": { orders: 350, revenue: 700 }, "AM": { orders: 600, revenue: 1200 }, "BA": { orders: 1800, revenue: 3600 }, "CE": { orders: 1700, revenue: 3400 }, "DF": { orders: 1000, revenue: 2000 }, "ES": { orders: 1200, revenue: 2400 }, "GO": { orders: 1740, revenue: 3480 }, "MA": { orders: 800, revenue: 1600 }, "MT": { orders: 840, revenue: 1680 }, "MS": { orders: 820, revenue: 1640 }, "MG": { orders: 2200, revenue: 4400 }, "PA": { orders: 900, revenue: 1800 }, "PB": { orders: 600, revenue: 1200 }, "PR": { orders: 2000, revenue: 4000 }, "PE": { orders: 1600, revenue: 3200 }, "PI": { orders: 560, revenue: 1120 }, "RJ": { orders: 2600, revenue: 5200 }, "RN": { orders: 520, revenue: 1040 }, "RS": { orders: 1900, revenue: 3800 }, "RO": { orders: 420, revenue: 840 }, "RR": { orders: 300, revenue: 600 }, "SC": { orders: 1840, revenue: 3680 }, "SP": { orders: 3000, revenue: 6000 }, "SE": { orders: 460, revenue: 920 }, "TO": { orders: 380, revenue: 760 } },
        "Fevereiro": { "AC": { orders: 410, revenue: 820 }, "AL": { orders: 510, revenue: 1020 }, "AP": { orders: 360, revenue: 720 }, "AM": { orders: 620, revenue: 1240 }, "BA": { orders: 1820, revenue: 3640 }, "CE": { orders: 1720, revenue: 3440 }, "DF": { orders: 1020, revenue: 2040 }, "ES": { orders: 1220, revenue: 2440 }, "GO": { orders: 1760, revenue: 3520 }, "MA": { orders: 810, revenue: 1620 }, "MT": { orders: 850, revenue: 1700 }, "MS": { orders: 830, revenue: 1660 }, "MG": { orders: 2240, revenue: 4480 }, "PA": { orders: 910, revenue: 1820 }, "PB": { orders: 610, revenue: 1220 }, "PR": { orders: 2020, revenue: 4040 }, "PE": { orders: 1620, revenue: 3240 }, "PI": { orders: 570, revenue: 1140 }, "RJ": { orders: 2640, revenue: 5280 }, "RN": { orders: 530, revenue: 1060 }, "RS": { orders: 1920, revenue: 3840 }, "RO": { orders: 430, revenue: 860 }, "RR": { orders: 310, revenue: 620 }, "SC": { orders: 1860, revenue: 3720 }, "SP": { orders: 3040, revenue: 6080 }, "SE": { orders: 470, revenue: 940 }, "TO": { orders: 390, revenue: 780 } },
        "Março": { "AC": { orders: 420, revenue: 840 }, "AL": { orders: 520, revenue: 1040 }, "AP": { orders: 370, revenue: 740 }, "AM": { orders: 640, revenue: 1280 }, "BA": { orders: 1840, revenue: 3680 }, "CE": { orders: 1740, revenue: 3480 }, "DF": { orders: 1040, revenue: 2080 }, "ES": { orders: 1240, revenue: 2480 }, "GO": { orders: 1780, revenue: 3560 }, "MA": { orders: 820, revenue: 1640 }, "MT": { orders: 860, revenue: 1720 }, "MS": { orders: 840, revenue: 1680 }, "MG": { orders: 2280, revenue: 4560 }, "PA": { orders: 920, revenue: 1840 }, "PB": { orders: 620, revenue: 1240 }, "PR": { orders: 2040, revenue: 4080 }, "PE": { orders: 1640, revenue: 3280 }, "PI": { orders: 580, revenue: 1160 }, "RJ": { orders: 2680, revenue: 5360 }, "RN": { orders: 540, revenue: 1080 }, "RS": { orders: 1940, revenue: 3880 }, "RO": { orders: 440, revenue: 880 }, "RR": { orders: 320, revenue: 640 }, "SC": { orders: 1880, revenue: 3760 }, "SP": { orders: 3080, revenue: 6160 }, "SE": { orders: 480, revenue: 960 }, "TO": { orders: 400, revenue: 800 } },
        "Abril": { "AC": { orders: 430, revenue: 860 }, "AL": { orders: 530, revenue: 1060 }, "AP": { orders: 380, revenue: 760 }, "AM": { orders: 660, revenue: 1320 }, "BA": { orders: 1860, revenue: 3720 }, "CE": { orders: 1760, revenue: 3520 }, "DF": { orders: 1060, revenue: 2120 }, "ES": { orders: 1260, revenue: 2520 }, "GO": { orders: 1800, revenue: 3600 }, "MA": { orders: 830, revenue: 1660 }, "MT": { orders: 870, revenue: 1740 }, "MS": { orders: 850, revenue: 1700 }, "MG": { orders: 2320, revenue: 4640 }, "PA": { orders: 930, revenue: 1860 }, "PB": { orders: 630, revenue: 1260 }, "PR": { orders: 2060, revenue: 4120 }, "PE": { orders: 1660, revenue: 3320 }, "PI": { orders: 590, revenue: 1180 }, "RJ": { orders: 2720, revenue: 5440 }, "RN": { orders: 550, revenue: 1100 }, "RS": { orders: 1960, revenue: 3920 }, "RO": { orders: 450, revenue: 900 }, "RR": { orders: 330, revenue: 660 }, "SC": { orders: 1900, revenue: 3800 }, "SP": { orders: 3120, revenue: 6240 }, "SE": { orders: 490, revenue: 980 }, "TO": { orders: 410, revenue: 820 } },
        "Maio": { "AC": { orders: 440, revenue: 880 }, "AL": { orders: 540, revenue: 1080 }, "AP": { orders: 390, revenue: 780 }, "AM": { orders: 680, revenue: 1360 }, "BA": { orders: 1880, revenue: 3760 }, "CE": { orders: 1780, revenue: 3560 }, "DF": { orders: 1080, revenue: 2160 }, "ES": { orders: 1280, revenue: 2560 }, "GO": { orders: 1820, revenue: 3640 }, "MA": { orders: 840, revenue: 1680 }, "MT": { orders: 880, revenue: 1760 }, "MS": { orders: 860, revenue: 1720 }, "MG": { orders: 2360, revenue: 4720 }, "PA": { orders: 940, revenue: 1880 }, "PB": { orders: 640, revenue: 1280 }, "PR": { orders: 2080, revenue: 4160 }, "PE": { orders: 1680, revenue: 3360 }, "PI": { orders: 600, revenue: 1200 }, "RJ": { orders: 2760, revenue: 5520 }, "RN": { orders: 560, revenue: 1120 }, "RS": { orders: 1980, revenue: 3960 }, "RO": { orders: 460, revenue: 920 }, "RR": { orders: 340, revenue: 680 }, "SC": { orders: 1920, revenue: 3840 }, "SP": { orders: 3160, revenue: 6320 }, "SE": { orders: 500, revenue: 1000 }, "TO": { orders: 420, revenue: 840 } },
        "Junho": { "AC": { orders: 450, revenue: 900 }, "AL": { orders: 550, revenue: 1100 }, "AP": { orders: 400, revenue: 800 }, "AM": { orders: 700, revenue: 1400 }, "BA": { orders: 1900, revenue: 3800 }, "CE": { orders: 1800, revenue: 3600 }, "DF": { orders: 1100, revenue: 2200 }, "ES": { orders: 1300, revenue: 2600 }, "GO": { orders: 1840, revenue: 3680 }, "MA": { orders: 850, revenue: 1700 }, "MT": { orders: 890, revenue: 1780 }, "MS": { orders: 870, revenue: 1740 }, "MG": { orders: 2400, revenue: 4800 }, "PA": { orders: 950, revenue: 1900 }, "PB": { orders: 650, revenue: 1300 }, "PR": { orders: 2100, revenue: 4200 }, "PE": { orders: 1700, revenue: 3400 }, "PI": { orders: 610, revenue: 1220 }, "RJ": { orders: 2800, revenue: 5600 }, "RN": { orders: 570, revenue: 1140 }, "RS": { orders: 2000, revenue: 4000 }, "RO": { orders: 470, revenue: 940 }, "RR": { orders: 350, revenue: 700 }, "SC": { orders: 1940, revenue: 3880 }, "SP": { orders: 3200, revenue: 6400 }, "SE": { orders: 510, revenue: 1020 }, "TO": { orders: 430, revenue: 860 } },
        "Julho": { "AC": { orders: 460, revenue: 920 }, "AL": { orders: 560, revenue: 1120 }, "AP": { orders: 410, revenue: 820 }, "AM": { orders: 720, revenue: 1440 }, "BA": { orders: 1920, revenue: 3840 }, "CE": { orders: 1820, revenue: 3640 }, "DF": { orders: 1120, revenue: 2240 }, "ES": { orders: 1320, revenue: 2640 }, "GO": { orders: 1860, revenue: 3720 }, "MA": { orders: 860, revenue: 1720 }, "MT": { orders: 900, revenue: 1800 }, "MS": { orders: 880, revenue: 1760 }, "MG": { orders: 2440, revenue: 4880 }, "PA": { orders: 960, revenue: 1920 }, "PB": { orders: 660, revenue: 1320 }, "PR": { orders: 2120, revenue: 4240 }, "PE": { orders: 1720, revenue: 3440 }, "PI": { orders: 620, revenue: 1240 }, "RJ": { orders: 2840, revenue: 5680 }, "RN": { orders: 580, revenue: 1160 }, "RS": { orders: 2020, revenue: 4040 }, "RO": { orders: 480, revenue: 960 }, "RR": { orders: 360, revenue: 720 }, "SC": { orders: 1960, revenue: 3920 }, "SP": { orders: 3240, revenue: 6480 }, "SE": { orders: 520, revenue: 1040 }, "TO": { orders: 440, revenue: 880 } },
        "Agosto": { "AC": { orders: 470, revenue: 940 }, "AL": { orders: 570, revenue: 1140 }, "AP": { orders: 420, revenue: 840 }, "AM": { orders: 740, revenue: 1480 }, "BA": { orders: 1940, revenue: 3880 }, "CE": { orders: 1840, revenue: 3680 }, "DF": { orders: 1140, revenue: 2280 }, "ES": { orders: 1340, revenue: 2680 }, "GO": { orders: 1880, revenue: 3760 }, "MA": { orders: 870, revenue: 1740 }, "MT": { orders: 910, revenue: 1820 }, "MS": { orders: 890, revenue: 1780 }, "MG": { orders: 2480, revenue: 4960 }, "PA": { orders: 970, revenue: 1940 }, "PB": { orders: 670, revenue: 1340 }, "PR": { orders: 2140, revenue: 4280 }, "PE": { orders: 1740, revenue: 3480 }, "PI": { orders: 630, revenue: 1260 }, "RJ": { orders: 2880, revenue: 5760 }, "RN": { orders: 590, revenue: 1180 }, "RS": { orders: 2040, revenue: 4080 }, "RO": { orders: 490, revenue: 980 }, "RR": { orders: 370, revenue: 740 }, "SC": { orders: 1980, revenue: 3960 }, "SP": { orders: 3280, revenue: 6560 }, "SE": { orders: 530, revenue: 1060 }, "TO": { orders: 450, revenue: 900 } },
        "Setembro": { "AC": { orders: 480, revenue: 960 }, "AL": { orders: 580, revenue: 1160 }, "AP": { orders: 430, revenue: 860 }, "AM": { orders: 760, revenue: 1520 }, "BA": { orders: 1960, revenue: 3920 }, "CE": { orders: 1860, revenue: 3720 }, "DF": { orders: 1160, revenue: 2320 }, "ES": { orders: 1360, revenue: 2720 }, "GO": { orders: 1900, revenue: 3800 }, "MA": { orders: 880, revenue: 1760 }, "MT": { orders: 920, revenue: 1840 }, "MS": { orders: 900, revenue: 1800 }, "MG": { orders: 2520, revenue: 5040 }, "PA": { orders: 980, revenue: 1960 }, "PB": { orders: 680, revenue: 1360 }, "PR": { orders: 2160, revenue: 4320 }, "PE": { orders: 1760, revenue: 3520 }, "PI": { orders: 640, revenue: 1280 }, "RJ": { orders: 2920, revenue: 5840 }, "RN": { orders: 600, revenue: 1200 }, "RS": { orders: 2060, revenue: 4120 }, "RO": { orders: 500, revenue: 1000 }, "RR": { orders: 380, revenue: 760 }, "SC": { orders: 2000, revenue: 4000 }, "SP": { orders: 3320, revenue: 6640 }, "SE": { orders: 540, revenue: 1080 }, "TO": { orders: 460, revenue: 920 } },
        "Outubro": { "AC": { orders: 490, revenue: 980 }, "AL": { orders: 590, revenue: 1180 }, "AP": { orders: 440, revenue: 880 }, "AM": { orders: 780, revenue: 1560 }, "BA": { orders: 1980, revenue: 3960 }, "CE": { orders: 1880, revenue: 3760 }, "DF": { orders: 1180, revenue: 2360 }, "ES": { orders: 1380, revenue: 2760 }, "GO": { orders: 1920, revenue: 3840 }, "MA": { orders: 890, revenue: 1780 }, "MT": { orders: 930, revenue: 1860 }, "MS": { orders: 910, revenue: 1820 }, "MG": { orders: 2560, revenue: 5120 }, "PA": { orders: 990, revenue: 1980 }, "PB": { orders: 690, revenue: 1380 }, "PR": { orders: 2180, revenue: 4360 }, "PE": { orders: 1780, revenue: 3560 }, "PI": { orders: 650, revenue: 1300 }, "RJ": { orders: 2960, revenue: 5920 }, "RN": { orders: 610, revenue: 1220 }, "RS": { orders: 2080, revenue: 4160 }, "RO": { orders: 510, revenue: 1020 }, "RR": { orders: 390, revenue: 780 }, "SC": { orders: 2020, revenue: 4040 }, "SP": { orders: 3360, revenue: 6720 }, "SE": { orders: 550, revenue: 1100 }, "TO": { orders: 470, revenue: 940 } },
        "Novembro": { "AC": { orders: 500, revenue: 1000 }, "AL": { orders: 600, revenue: 1200 }, "AP": { orders: 450, revenue: 900 }, "AM": { orders: 800, revenue: 1600 }, "BA": { orders: 2000, revenue: 4000 }, "CE": { orders: 1900, revenue: 3800 }, "DF": { orders: 1200, revenue: 2400 }, "ES": { orders: 1400, revenue: 2800 }, "GO": { orders: 1940, revenue: 3880 }, "MA": { orders: 900, revenue: 1800 }, "MT": { orders: 940, revenue: 1880 }, "MS": { orders: 920, revenue: 1840 }, "MG": { orders: 2600, revenue: 5200 }, "PA": { orders: 1000, revenue: 2000 }, "PB": { orders: 700, revenue: 1400 }, "PR": { orders: 2200, revenue: 4400 }, "PE": { orders: 1800, revenue: 3600 }, "PI": { orders: 660, revenue: 1320 }, "RJ": { orders: 3000, revenue: 6000 }, "RN": { orders: 620, revenue: 1240 }, "RS": { orders: 2100, revenue: 4200 }, "RO": { orders: 520, revenue: 1040 }, "RR": { orders: 400, revenue: 800 }, "SC": { orders: 2040, revenue: 4080 }, "SP": { orders: 3400, revenue: 6800 }, "SE": { orders: 560, revenue: 1120 }, "TO": { orders: 480, revenue: 960 } },
        "Dezembro": { "AC": { orders: 510, revenue: 1020 }, "AL": { orders: 610, revenue: 1220 }, "AP": { orders: 460, revenue: 920 }, "AM": { orders: 820, revenue: 1640 }, "BA": { orders: 2020, revenue: 4040 }, "CE": { orders: 1920, revenue: 3840 }, "DF": { orders: 1220, revenue: 2440 }, "ES": { orders: 1420, revenue: 2840 }, "GO": { orders: 1960, revenue: 3920 }, "MA": { orders: 910, revenue: 1820 }, "MT": { orders: 950, revenue: 1900 }, "MS": { orders: 930, revenue: 1860 }, "MG": { orders: 2640, revenue: 5280 }, "PA": { orders: 1010, revenue: 2020 }, "PB": { orders: 710, revenue: 1420 }, "PR": { orders: 2220, revenue: 4440 }, "PE": { orders: 1820, revenue: 3640 }, "PI": { orders: 670, revenue: 1340 }, "RJ": { orders: 3040, revenue: 6080 }, "RN": { orders: 630, revenue: 1260 }, "RS": { orders: 2120, revenue: 4240 }, "RO": { orders: 530, revenue: 1060 }, "RR": { orders: 410, revenue: 820 }, "SC": { orders: 2060, revenue: 4120 }, "SP": { orders: 3440, revenue: 6880 }, "SE": { orders: 570, revenue: 1140 }, "TO": { orders: 490, revenue: 980 } },
      }
    };
    setDataTime(data);
    setSelectedYear(Math.max(...Object.keys(data).map(Number))); // Define o ano padrão
    const providers = { 2023: { "Gabriel Faria": 20, "Guilherme Kaneda": 17, "Giovani Rodrigues": 15 }, 2024: { "Guilherme Kaneda": 17, "Gabriel Faria": 20, "Giovani Rodrigues": 15, "Gabriel Alvim": 10 } }
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

  function getProvidersData() {
    providersData.forEach((provider: string) => {
      provider
    })
  }
  // CRIAR FUNÇÂO PARA SOMAR VALORES DOS MESES SELECIONADOS (todos os estados)
  // REFATORAR PARA SORTEDMONTHS SER APENAS SELECTEDMONTHS
  // CRIAR FUNÇÂO PARA SOMAR VALORES DOS ESTADOS SELECIONADOS (para os meses selecionados)  
  const years = Object.keys(dataTime); // histórico de anos
  const availableStates = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]; // ISSO VEM DA API TBM (Quais UFs estão presentes)
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
          backgroundColor: "#36A2EB",
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
                onChange={(e) => setMonths(e.value)}
                placeholder="Selecione os meses"
                className="w-72"
              />
              <MultiSelect
                value={selectedStates}
                options={availableStates}
                onChange={(e) => setStates(e.value)} // Atualiza o estado de estados
                placeholder="Selecione os estados"
                className='w-72'
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
