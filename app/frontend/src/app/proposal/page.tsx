'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import '../globals.css';
import AdvancedFilterDemo from '@/components/AdvancedFilterDemo';

export default function Proposal() {
  return (
    <div className="flex h-screen bg-gray-100 space-x-18">
      <div className="w-64 bg-gray-100 shadow-md">
        <Sidebar title="" username="" />
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">
        
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Propostas</h1>
        
        <div className="w-11/12">
          <AdvancedFilterDemo />
        </div>
      </div>
    </div>
  );
}
