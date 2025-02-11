'use client'
import Sidebar from "@/components/Sidebar";
import Filter from '@/components/Filter';

export default function ClientesPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar ocupa 1/4 da largura da tela */}
      <div className="w-64 bg-white shadow-md">
        <Sidebar title="Configurações" username="Usuário" />
      </div>

      {/* Conteúdo principal ocupa o restante do espaço */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Lista de Clientes</h1>
        <Filter />
      </div>
    </div>
  );
}
