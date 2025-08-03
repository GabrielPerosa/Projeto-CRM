'use client'

import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import '@/style/styles.css';
import ClientTable from '@/components/ClientTable';

export default function Proposal() {
  useEffect(() => {
    console.log('Proposal Page Loaded');
  }, []);

  return (
    <Layout screenTitle="Propostas">
    <div className="flex h-screen bg-gray-100">
      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">
        <div className="text-black">
          <ClientTable />
        </div>
      </div>
    </div>
    </Layout>
  );
}
