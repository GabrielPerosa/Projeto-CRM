"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "primeicons/primeicons.css";
import { getSession, signOut } from "next-auth/react";
import { Session } from "next-auth"; 
import { Loading } from "./Loading";

type MenuItem = {
  label: string;
  icon: string;
  path: string;
};

// Mapeamento de menus por role
const menuConfig: Record<string, MenuItem[]> = {
  admin: [
    { label: "Início", icon: "pi pi-home", path: "/pages/admin/home" },
    { label: "Serviços", icon: "pi pi-briefcase", path: "/pages/admin/services" },
    { label: "Configurações", icon: "pi pi-cog", path: "/pages/admin/settings" },
  ],
  provider: [
    { label: "Início", icon: "pi pi-home", path: "/pages/provider/home" },
    { label: "Meus Serviços", icon: "pi pi-briefcase", path: "/pages/provider/services" },
    { label: "Propostas", icon: "pi pi-file", path: "/pages/provider/proposal" },
    { label: "Configurações", icon: "pi pi-cog", path: "/pages/provider/settings" },
  ],
  client: [
    { label: "Meus Serviços", icon: "pi pi-home", path: "/pages/client/home" },
    { label: "Configurações", icon: "pi pi-cog", path: "/pages/client/settings" },
  ],
};

export default function Sidebar() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await getSession();
        setSession(sessionData);
      } catch (error) {
        console.error("Erro ao buscar sessão:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  // `useMemo` para calcular os itens de menu apenas quando a sessão mudar
  const menuItems = useMemo(() => {
    const role = session?.token?.role as string;
    return menuConfig[role] || [];
  }, [session]);

  if (loading) {
    return (
      <div className="w-64 h-full flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-600">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex w-64 h-full bg-gradient-to-b from-blue-900 to-blue-600 shadow-xl">
      <div className="flex flex-col items-center p-4 space-y-6 w-full">
        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-white/10 border border-blue-400/50 shadow-md overflow-hidden">
            <Image
              src={session?.user?.image || "/images/profiles/user.jpg"}
              width={56}
              height={56}
              alt="Perfil do usuário"
              className="rounded-full"
            />
          </div>
          <span className="text-white text-sm font-semibold text-center">
            Bem-vindo, {session?.user?.name || "Usuário"}
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="w-full flex-1">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className="flex items-center w-full p-3 space-x-3 hover:bg-blue-500/30 text-white hover:text-blue-200 rounded-md transition-all duration-200"
            >
              <i className={`${item.icon} text-lg`}></i>
              <span className="text-md font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={() => signOut()}
          className="flex items-center w-full p-3 space-x-3 bg-blue-300/80 hover:bg-blue-500 text-white rounded-md transition-all duration-200"
        >
          <i className="pi pi-sign-out text-lg"></i>
          <span className="text-md font-medium">Sair</span>
        </button>
      </div>
    </div>
  );
}