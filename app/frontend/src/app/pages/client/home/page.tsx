'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
//import '../globals.css';
import ServiceTable from '@/components/ServiceTable';
import { useUserContext, UserData } from "@/components/context/UserContext";

export default function Home() {

const { user } = useUserContext();
console.log("USER", user);

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
