'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../style/styles.css";
import "primeicons/primeicons.css";
import { getSession, signOut } from "next-auth/react";
import { Loading } from "./Loading";

interface SidebarProps {
  username?: string;
  title: string;
}

export default function Sidebar({ username }: SidebarProps) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<any>(null);

  // Busca a sessão do usuário
  const fetchSession = async () => {
    try {
      const sessionData = await getSession();
      if(sessionData){
        setSession(sessionData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Erro ao buscar sessão:", error);
    }
  };

  let menuItems: any[] = [];

if(!loading){
  session?.token?.role === "admin" && (menuItems = [
    { label: "Início", icon: "pi pi-home", path:`/pages/${session?.token?.role}/home`},
    { label: "Serviços", icon: "pi pi-briefcase", path: `/pages/${session?.token?.role}/services` },
    { label: "Configurações", icon: "pi pi-cog", path: `/pages/${session?.token?.role}/settings` },            
  ])

  session?.token?.role === "supplier" && (menuItems = [
    { label: "Início", icon: "pi pi-home", path: `/pages/${session?.token?.role}/home`},
    { label: "Meus Serviços", icon: "pi pi-briefcase", path: `/pages/${session?.token?.role}/services` },
    { label: "Propostas", icon: "pi pi-file", path: `/pages/${session?.token?.role}/proposal` },
    { label: "Configurações", icon: "pi pi-cog", path: `/pages/${session?.token?.role}/settings` },            
  ])

  session?.token?.role === "client" && (menuItems = [
    { label: "Início", icon: "pi pi-home", path:`/pages/${session?.token?.role}/home`},
    { label: "Configurações", icon: "pi pi-cog", path: `/pages/${session?.token?.role}/settings` },            
  ])
}
  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  if (loading) {
    fetchSession();
  }

  return (
    <div className={`flex ${isMobile ? "w-20" : "w-64"} h-full bg-gradient-to-b from-blue-900 to-blue-600 shadow-xl transition-all duration-300`}>
      {/* Sidebar */}
      <div className="flex flex-col items-center p-4 space-y-6 w-full">
        
        {/* Profile Section */}
        {username && (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-white/10 border border-blue-400/50 shadow-md overflow-hidden">
              <Image
                src="/images/profiles/user.jpg"
                width={56}
                height={56}
                alt="Perfil do usuário"
                className="rounded-full"
              />
            </div>
            {!isMobile && (
              <span className="text-white text-sm font-semibold">
                Bem-vindo, {userName || "Usuário"}
              </span>
            )}
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="w-full flex-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => router.push(item.path)}
              className="flex items-center w-full p-3 space-x-3 hover:bg-blue-500/30 text-white hover:text-blue-200 rounded-md transition-all duration-200"
            >
              <i className={`${item.icon} text-lg`}></i>
              {!isMobile && <span className="text-md font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-3 space-x-3 bg-blue-300/80 hover:bg-blue-500 text-white rounded-md transition-all duration-200"
        >
          <i className="pi pi-sign-out text-lg"></i>
          {!isMobile && <span className="text-md font-medium">Sair</span>}
        </button>
      </div>
    </div>
  );
}