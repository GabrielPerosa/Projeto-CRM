'use client'

import React, { useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import '@/style/styles.css';
import ClientTable from '@/components/ClientTable';

export default function Proposal() {
  useEffect(() => {
    console.log('Proposal Page Loaded');
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gray-100 shadow-md">
        <Sidebar title="Meus serviços" username="Usuário" />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">
        <div className="text-black">
          <ClientTable />
        </div>
      </div>
    </div>
  );
}
