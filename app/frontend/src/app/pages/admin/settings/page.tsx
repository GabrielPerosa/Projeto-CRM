"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "primereact/button";

const initialIrradiacaoData = [
  { regiao: 'SUL', kw: '7,99', kwhM2: '4,20' },
  { regiao: 'NORTE', kw: '7,99', kwhM2: '4,55' },
  { regiao: 'CENTRO OESTE', kw: '7,99', kwhM2: '5,25' },
  { regiao: 'SUDESTE', kw: '7,99', kwhM2: '4,55' },
  { regiao: 'NORDESTE', kw: '7,99', kwhM2: '5,60' },
];


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

  const [irradiacaoData, setIrradiacaoData] = useState(initialIrradiacaoData);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

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

  const handleIrradiacaoChange = (index: number, field: 'kw' | 'kwhM2', value: string) => {
    const updatedData = [...irradiacaoData]; 
    (updatedData[index] as any)[field] = value;
    setIrradiacaoData(updatedData);
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && !validateEmail(formData.email)) {
      setEmailError("Por favor, insira um e-mail válido.");
      return;
    }
    localStorage.setItem("configuracoes_admin", JSON.stringify({ formData }));
    localStorage.setItem("configuracoes_irradiacao", JSON.stringify(irradiacaoData));

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  useEffect(() => {
    const dadosSalvosForm = localStorage.getItem("configuracoes_admin");
    if (dadosSalvosForm) {
      const dados = JSON.parse(dadosSalvosForm);
      setFormData(dados.formData || {});
    }

    const dadosSalvosIrradiacao = localStorage.getItem("configuracoes_irradiacao");
    if (dadosSalvosIrradiacao) {
      setIrradiacaoData(JSON.parse(dadosSalvosIrradiacao));
    }
  }, []);

  return (
    <Layout screenTitle='Configurações'>
      <div className="relative min-h-screen bg-gray-100">
        {saveSuccess && (
          <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow-md z-50">
            Configurações salvas com sucesso!
          </div>
        )}
   
        <form id="settings-form" onSubmit={handleSaveAll}>
          <main className="w-full p-4 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
              {/* Coluna da Esquerda: Card de Editar Perfil */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">
                  Editar Perfil
                </h2>
                <div className="space-y-6">
                  {/* Seção do formulário de perfil  */}
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
                    <p className="text-red-500 text-sm -mt-3">{nameError}</p>
                  )}
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
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Digite seu email"
                    />
                    {emailError && (
                      <p className="text-red-500 text-sm mt-1">{emailError}</p>
                    )}
                  </div>
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
                        placeholder="Deixe em branco para não alterar"
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
                    <label htmlFor="valorPlaca" className="block text-gray-700 font-medium mb-2">
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
                </div>
              </div>

              {/* Coluna da Direita: Card de Configurações de Irradiação */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Configurações de Irradiação Solar
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">Região</th>
                        <th className="p-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">kW</th>
                        <th className="p-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">kWh/M2</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {irradiacaoData.map((dado, index) => (
                        <tr key={dado.regiao}>
                          <td className="p-3 whitespace-nowrap text-gray-700 align-middle">{dado.regiao}</td>
                          <td className="p-1 whitespace-nowrap text-gray-700">
                            <input
                              type="text"
                              value={dado.kw}
                              onChange={(e) => handleIrradiacaoChange(index, 'kw', e.target.value)}
                              className="w-full max-w-[100px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </td>
                          <td className="p-1 whitespace-nowrap text-gray-700">
                            <input
                              type="text"
                              value={dado.kwhM2}
                              onChange={(e) => handleIrradiacaoChange(index, 'kwhM2', e.target.value)}
                              className="w-full max-w-[100px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </form>
         <div className="col-span-1 lg:col-span-2 text-right mt-4">
          <Button
            label="Salvar Alterações"
            icon="pi pi-save"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
            type="submit"
            form="settings-form"
          />
        </div>
      </div>
    </Layout>
  );
}