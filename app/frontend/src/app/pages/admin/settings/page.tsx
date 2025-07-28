"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Button } from "primereact/button";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Settings() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    valorAssinatura: "",
    valorMaterial: "",
    valorPlaca: ""
  });

  // Validação de e-mail
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Formata o número para moeda
  const formatCurrencyLive = (value: string) => {
    const onlyDigits = value.replace(/\D/g, "");
    if (!onlyDigits) return "";
    const numericValue = parseFloat(onlyDigits) / 100;
    if (isNaN(numericValue)) return "";
    return numericValue.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Handle de mudança dos campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "nome" || name === "sobrenome") {
      if (/\d/.test(value)) {
        setNameError("Nome e sobrenome não podem conter números.");
        return;
      } else {
        setNameError(null);
      }
    }

    if (name === "email") {
      if (value && !validateEmail(value)) {
        setEmailError("Por favor, insira um e-mail válido.");
      } else {
        setEmailError(null);
      }
    }

    if (name === "valorAssinatura" || name === "valorMaterial" || name === "valorPlaca") {
      const formatted = formatCurrencyLive(value);
      setFormData({ ...formData, [name]: formatted });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setEmailError("Por favor, insira um e-mail válido.");
      return;
    }
    localStorage.setItem("configuracoes_admin", JSON.stringify({ formData }));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("configuracoes_admin");
    if (dadosSalvos) {
      const dados = JSON.parse(dadosSalvos);
      setFormData(dados.formData || {});
    }
  }, []);

  return (
    // MUDANÇA 1: O container principal agora tem o layout flexível.
    <div className="flex h-screen bg-gray-100">
      {saveSuccess && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow-md z-50">
          Configurações salvas com sucesso!
        </div>
      )}

      {/* --- Lógica do Menu Responsivo --- */}
      <button
        aria-label="Abrir menu"
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-30 p-2 text-gray-600 bg-white/70 backdrop-blur-sm rounded-full shadow-md"
      >
        <FaBars size={20} />
      </button>

      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-10"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* MUDANÇA 2: Container da Sidebar com classes responsivas */}
      <div
        className={`
          bg-white shadow-lg
          fixed top-0 left-0 h-full w-64 z-20 
          transform transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0 lg:shrink-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <button
          aria-label="Fechar menu"
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>
        <Sidebar title="Configurações" username="Usuário" />
      </div>
      
      {/* MUDANÇA 3: Conteúdo principal dentro de um <main> responsivo */}
      <main className="w-full lg:w-auto flex-1 p-4 lg:p-8 overflow-y-auto">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Editar Perfil
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome e Sobrenome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nome" className="block text-gray-700 font-medium mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Digite seu nome"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="sobrenome" className="block text-gray-700 font-medium mb-2">
                  Sobrenome
                </label>
                <input
                  type="text"
                  id="sobrenome"
                  name="sobrenome"
                  value={formData.sobrenome}
                  onChange={handleChange}
                  placeholder="Digite seu sobrenome"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            {nameError && (
              <p className="text-red-500 text-sm mt-1">{nameError}</p>
            )}

            {/* E-mail */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu email"
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            {/* Senha e Confirmar Senha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="senha" className="block text-gray-700 font-medium mb-2">
                  Nova Senha
                </label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder="Digite sua nova senha"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="confirmarSenha" className="block text-gray-700 font-medium mb-2">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  placeholder="Confirme sua nova senha"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Valor Assinatura e Valor Material */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="valorAssinatura" className="block text-gray-700 font-medium mb-2">
                  Valor da Assinatura (R$)
                </label>
                <input
                  type="text"
                  id="valorAssinatura"
                  name="valorAssinatura"
                  value={formData.valorAssinatura}
                  onChange={handleChange}
                  placeholder="Ex: 29,90"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="valorMaterial" className="block text-gray-700 font-medium mb-2">
                  Valor do Material (R$)
                </label>
                <input
                  type="text"
                  id="valorMaterial"
                  name="valorMaterial"
                  value={formData.valorMaterial}
                  onChange={handleChange}
                  placeholder="Ex: 29,90"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

             <div>
                <label htmlFor="valorMaterial" className="block text-gray-700 font-medium mb-2">
                  Valor Unitário da Placa (R$)
                </label>
                <input
                  type="text"
                  id="valorPlaca"
                  name="valorPlaca"
                  value={formData.valorPlaca}
                  onChange={handleChange}
                  placeholder="Ex: 29,90"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            {/* Botão Salvar */}
            <div className="text-right pt-4">
              <Button
                label="Salvar Alterações"
                icon="pi pi-save"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="submit"
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
