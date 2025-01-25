'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../style/style.css";
import "primeicons/primeicons.css";


interface SidebarProps {
  username?: string;
  title: string;
}

export default function Sidebar({ username }: SidebarProps) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  //const [menuVisible, setMenuVisible] = useState(false);
  //const [isClient, setIsClient] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);
  
  const items = [
    { label: "Início", icon: "pi pi-home", command: () => router.push("/home") },
    { label: "Meus Serviços", icon: "pi pi-file-check", command: () => router.push("/myservices") },
    { label: "Propostas", icon: "pi pi-dollar", command: () => router.push("/proposal") },
    //{ label: "Dispositivos", icon: "pi pi-microchip", command: () => router.push("/devices") },
    //{ label: "Relatório", icon: "pi pi-clipboard", command: () => router.push("/reports") },
    {
      label: "Configurações",
      icon: "pi pi-cog",
      command: () => router.push("/settings")
    },
  ];

  const settingsItems = [
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => {
        localStorage.removeItem("nomeUsuario");
        router.push("/login");
      },
    },
  ];

  useEffect(() => {
    const storedNomeUsuario = localStorage.getItem("nomeUsuario");
    setNomeUsuario(storedNomeUsuario);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`flex ${isMobile ? "w-16" : "w-64"} h-full bg-white shadow-lg`}>
      {/* Sidebar */}
      <div className="flex flex-col items-center p-3 space-y-4 w-full">
        {/* Profile Section */}
        {username && (
          <div className="flex flex-col items-center space-y-2">
            <Image
              src="/images/profiles/user.jpg"
              width={68}
              height={68}
              alt="user profile"
              className="rounded-full w-16 h-16"
            />
            <span className="text-black text-sm text-center">
              Bem-Vindo, {nomeUsuario || "Usuário"}
            </span>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="w-full flex-1">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={item.command}
              className="flex items-center w-full p-3 space-x-2 hover:bg-blue-100 text-black hover:text-blue-700 rounded-md"
            >
              <i className={`${item.icon} text-lg`}></i>
              {!isMobile && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Settings Menu */}
        <div className="mt-auto w-full">
          {settingsItems.map((item, index) => (
            <button
              key={index}
              onClick={item.command}
              className="flex items-center w-full p-3 space-x-2 hover:bg-blue-100 text-black hover:text-blue-700 rounded-md"
            >
              <i className={`${item.icon} text-lg`}></i>
              {!isMobile && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
