'use client';

import React, { useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
//import '../globals.css';
import ServiceTable from '@/components/ServiceTable';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Myservices() {
    
  // Obtém a sessão e o status de carregamento
    const { data: session, status } = useSession();
    const router = useRouter();
  
    useEffect(() => {
      // Se ainda estiver carregando, não faz nada
      if (status === 'loading') return;
  
      // Se não houver sessão ou o usuário não for admin, redireciona
      if (!session || session.user.role !== 'admin') {
        router.push('/unauthorized');
      }
    }, [session, status, router]);
  
    // Enquanto a sessão está carregando, exibe uma mensagem de carregamento
    if (status === 'loading') {
      return <p>Carregando...</p>;
    }

  return (
    <div className="flex h-screen bg-gray-100 space-x-18">
      <div className="w-64 bg-gray-100 shadow-md">
        <Sidebar title="Meus serviços" username="Usuário" />
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">
        
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Meus Serviços</h1>
        
        <div className="w-full">
          <ServiceTable />
        </div>
      </div>
    </div>
  );
}
