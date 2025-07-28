'use client'
import Sidebar from "@/components/Sidebar";
import Filter from '@/components/Filter';
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Services() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Botão para abrir o menu, visível apenas em ecrãs pequenos (lg:hidden) */}
      <button
        aria-label="Abrir menu"
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-30 p-2 text-gray-600 bg-white/70 backdrop-blur-sm rounded-full shadow-md"
      >
        <FaBars size={20} />
      </button>

      {/* Overlay que cobre o conteúdo quando a sidebar está aberta em mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-10"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Container da Sidebar */}
      <div
        className={`
          bg-white shadow-lg
          fixed top-0 left-0 h-full w-64 z-20 
          transform transition-transform duration-300 ease-in-out
          
          // Em ecrãs grandes, a sidebar torna-se estática e parte do layout
          lg:static lg:translate-x-0 lg:shrink-0
          
          // Controla a visibilidade em ecrãs pequenos
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Botão para fechar, visível apenas no menu aberto em mobile */}
        <button
          aria-label="Fechar menu"
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>
        <Sidebar title="Configurações" username="Usuário" />
      </div>

      {/* Conteúdo Principal */}
      {/* MUDANÇA: Adicionado 'w-full' para garantir que o conteúdo principal ocupe sempre
          toda a largura disponível, e 'lg:w-auto' para reverter ao comportamento
          padrão em ecrãs grandes onde o flexbox assume o controlo. */}
      <main className="w-full lg:w-auto flex-1 p-4 overflow-x-auto">
        <Filter />
      </main>
    </div>
  );
}
