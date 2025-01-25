'use client'

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import '../globals.css';
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
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Propostas</h1>
        <div className="text-black">
          <ClientTable />
        </div>
      </div>
    </div>
  );
}
