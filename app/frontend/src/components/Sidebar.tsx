'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../style/styles.css";
import "primeicons/primeicons.css";
import { menu } from "framer-motion/client";
import { signOut, useSession } from "next-auth/react";

  interface SidebarProps {
  username?: string;
  title: string;
}
function convertRoleToRoute (role: string) {
  switch (role) {
    case 'admin':
      return 'admin';
    case 'cliente':
      return 'client';
    case 'prestador':
      return 'supplier';
    default:
      return '';
  }
}

export default function Sidebar({ username }: SidebarProps) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const { data: session, status } = useSession();
  let menuItems: any[] = [];

  if (status === "authenticated" && session?.user?.role) {
    const route = convertRoleToRoute(session.user.role);

    menuItems = 
    route === "admin" || route === "supplier"
    ? [ 
        { label: "Início", icon: "pi pi-home", path: `/pages/${route}/home` },
        { label: "Meus Serviços", icon: "pi pi-briefcase", path: `/pages/${route}/myservices` },
        { label: "Propostas", icon: "pi pi-file", path: `/pages/${route}/proposal` },
        { label: "Configurações", icon: "pi pi-cog", path: `/pages/${route}/settings` },
      ]
    : [
        { label: "Início", icon: "pi pi-home", path: `/pages/${route}/home` },
        { label: "Configurações", icon: "pi pi-cog", path: `/pages/${route}/settings` },
      ];
    
    } else
      router.push("../login");


  const handleLogout = () => {
    router.push("/pages/login");
    signOut();
  };

  useEffect(() => {
    setUserName(localStorage.getItem("nomeUsuario"));

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          {!isMobile && <span className="text-md font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}