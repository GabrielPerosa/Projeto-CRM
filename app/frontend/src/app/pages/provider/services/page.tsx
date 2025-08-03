'use client';

import React from 'react';
import Layout from '@/components/Layout';
//import '../globals.css';
import ServiceTable from '@/components/ServiceTable';

export default function Myservices() {
  return (
    <Layout screenTitle="Meus Serviços">
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
