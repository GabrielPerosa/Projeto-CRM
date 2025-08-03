'use client'
import Layout from '@/components/Layout';
import Filter from '@/components/Filter';
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Services() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Layout screenTitle='Serviços'>
    <div className="flex h-screen bg-gray-100">
      {/* Conteúdo Principal */}
      <main className="w-full lg:w-auto flex-1 p-4 overflow-x-auto">
        <Filter />
      </main>
    </div>
    </Layout>
  );
}
