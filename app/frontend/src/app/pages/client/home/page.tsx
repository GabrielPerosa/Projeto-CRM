'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import Layout from '@/components/Layout';
//import '../globals.css';
import ServiceTable from '@/components/ServiceTable';

export default function Home() {
  return (
    <Layout screenTitle="Serviços">

      {/* Conteúdo Principal */}
      <div className="flex h-screen bg-gray-100 space-x-18">

        {/* MAIN */}
        <div className="flex-1 p-6">


          <div className="w-full">
            <ServiceTable />
          </div>
        </div>
      </div>
    </Layout>
  );
}
