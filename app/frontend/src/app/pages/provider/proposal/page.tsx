'use client'

import React, { useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import '@/style/styles.css';
import ClientTable from '@/components/ClientTable';
import Layout from '@/components/Layout';
import { title } from 'process';

export default function Proposal() {
  useEffect(() => {
    console.log('Proposal Page Loaded');
  }, []);

  return (
    <Layout screenTitle='Propostas'>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">
        <div className="text-black">
          <ClientTable />
        </div>
      </div>
    </Layout>
  );
}
