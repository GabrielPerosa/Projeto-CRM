"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import StatesForm from "@/components/form/StatesForm";
import { Button } from "primereact/button";

interface Estado {
  id: number;
  estado: string;
  valor: string;
}

export default function Settings() {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    valorAssinatura: "",
    valorMaterial: "",
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [estadosAtendidos, setEstadosAtendidos] = useState<Estado[]>([]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("configuracoes_prestador");
    if (dadosSalvos) {
      const dados = JSON.parse(dadosSalvos);
      setFormData(dados.formData || {});
      setEstadosAtendidos(dados.estadosAtendidos || []);
    }
  }, []);

  // 👉 Formata número para moeda BRL
  const formatCurrencyLive = (value: string) => {
    const onlyDigits = value.replace(/\D/g, "");
    const numericValue = parseFloat(onlyDigits) / 100;

    if (isNaN(numericValue)) return "";

    return numericValue.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 👉 Campos monetários
    if (name === "valorAssinatura" || name === "valorMaterial") {
      const formatted = formatCurrencyLive(value);
      setFormData({ ...formData, [name]: formatted });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email: string) => {
    if (/\s/.test(email) || /\.{2,}/.test(email)) return false;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validateForm = () => {
    const newErrors: Record<string, string | null> = {};
    if (formData.nome && /\d/.test(formData.nome)) {
      newErrors.nome = "Nome não pode conter números.";
    }
    if (formData.sobrenome && /\d/.test(formData.sobrenome)) {
      newErrors.sobrenome = "Sobrenome não pode conter números.";
    }
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "Por favor, insira um e-mail válido.";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.values(newErrors).some((error) => error !== null)) {
      setErrors(newErrors);
      setSaveSuccess(false);
      return;
    }

    const dadosParaSalvar = {
      formData,
      estadosAtendidos,
    };

    localStorage.setItem(
      "configuracoes_prestador",
      JSON.stringify(dadosParaSalvar)
    );

    setErrors({});
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {saveSuccess && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow-md z-50">
          Configurações salvas com sucesso!
        </div>
      )}

      <div className="hidden md:block w-64 bg-gray-100 shadow-md">
        <Sidebar title="Configurações" username="Usuário" />
      </div>

      <div className="flex-1 overflow-auto p-6 custom-scrollbar mt-10">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* COLUNA ESQUERDA */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Editar Perfil
            </h2>

            {/* Nome e Sobrenome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {errors.nome && (
                  <p className="text-red-500 text-sm mt-1">{errors.nome}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Sobrenome</label>
                <input
                  type="text"
                  name="sobrenome"
                  value={formData.sobrenome}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {errors.sobrenome && (
                  <p className="text-red-500 text-sm mt-1">{errors.sobrenome}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="mt-4">
              <label className="block text-gray-700 mb-1">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Senha e Confirmar Senha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray-700 mb-1">Nova Senha</label>
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>

            {/* Valores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray-700 mb-1">
                  Valor da Assinatura
                </label>
                <input
                  type="text"
                  name="valorAssinatura"
                  value={formData.valorAssinatura}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Ex: 90,00"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">
                  Valor do Material
                </label>
                <input
                  type="text"
                  name="valorMaterial"
                  value={formData.valorMaterial}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Ex: 100,50"
                />
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Estados e Valor das Placas Solares
            </h2>
            <StatesForm
              estadosAdicionados={estadosAtendidos ?? []}
              setEstadosAdicionados={setEstadosAtendidos}
              className="bg-white p-4 rounded-md shadow-sm space-y-3"
            />
          </div>

          {/* BOTÃO ÚNICO */}
          <div className="col-span-1 lg:col-span-2 text-right mt-4">
            <Button
              type="submit"
              label="Salvar Alterações"
              icon="pi pi-save"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
