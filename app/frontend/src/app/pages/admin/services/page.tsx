'use client'
import Sidebar from "@/components/Sidebar";
import Filter from '@/components/Filter';

export default function Services() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar ocupa 1/4 da largura da tela */}
      <div className="w-64 bg-white shadow-md">
        <Sidebar/>
      </div>

      {/* Conteúdo principal ocupa o restante do espaço */}
      <div className="flex-1 p-6 mt-5">
        <Filter />
      </div>
    </div>
  );
}
