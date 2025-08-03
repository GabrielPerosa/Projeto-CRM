// components/Layout.tsx
"use client";

import { useState } from "react";
import Sidebar from "./Sidebar"; // Importe sua sidebar

interface LayoutProps {
  children: React.ReactNode;
  screenTitle: string;
}

export default function Layout({ children, screenTitle }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar com classes responsivas */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
        `}
      >
        <Sidebar/>
      </div>

      {/* Conteúdo principal e botão hambúrguer */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header com o botão */}
        <header className="sticky top-0 bg-white shadow-sm z-20 md:hidden">
          <div className="flex items-center p-4">
            <button
              className="text-gray-700"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <i className="pi pi-bars text-xl"></i>
            </button>
            <h1 className="text-lg font-semibold ml-4">{screenTitle}</h1>
          </div>
        </header>

        {/* Conteúdo da Página */}
        <main className="p-6 flex-1">
          {children}
        </main>
      </div>

      {/* Overlay para fechar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}