'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
//import '../globals.css';
import ServiceTable from '@/components/ServiceTable';
import Layout from '@/components/Layout';

export default function Myservices() {
  return (
    <Layout screenTitle='Meus serviços'>

      {/* MAIN */}
      <div className="flex-1 p-6">
        <div className="w-full">
          <ServiceTable />
        </div>
      </div>
    </Layout>
  );
}
