"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Button } from "primereact/button";
import Layout from "@/components/Layout";

export default function Settings() {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    telefone: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [address, setAddress] = useState({
    rua: "",
    numero: "",
    complemento: "",
    cidade: "",
    estado: "",
    cep: "",
  });

  const [emailError, setEmailError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [cepError, setCepError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
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

    if (name === "telefone") {
      const numericValue = value.replace(/\D/g, "");
      let formattedValue = numericValue;

      if (numericValue.length > 2) {
        formattedValue = `(${numericValue.slice(0, 2)}) ${numericValue.slice(
          2
        )}`;
      }
      if (numericValue.length > 7) {
        formattedValue = `(${numericValue.slice(0, 2)}) ${numericValue.slice(
          2,
          7
        )}-${numericValue.slice(7, 11)}`;
      }

      setFormData({ ...formData, [name]: formattedValue });
      return;
    }

    if (name === "email") {
      if (value && !validateEmail(value)) {
        setEmailError("Por favor, insira um e-mail válido.");
      } else {
        setEmailError(null);
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cep" && !/^\d*$/.test(value)) {
      setCepError("CEP deve conter apenas números.");
      return;
    } else {
      setCepError(null);
    }

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchAddressByZip = async (zip: string) => {
    if (zip.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${zip}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setAddress((prev) => ({
            ...prev,
            rua: data.logradouro,
            cidade: data.localidade,
            estado: data.uf,
          }));
        } else {
          setCepError("CEP não encontrado.");
        }
      } catch {
        setCepError("Erro ao buscar o endereço. Tente novamente.");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError("Por favor, insira um e-mail válido.");
      return;
    }

    // Se tudo estiver válido, salva
    localStorage.setItem(
      "configuracoes_cliente",
      JSON.stringify({ formData, address })
    );
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("configuracoes_cliente");
    if (dadosSalvos) {
      const dados = JSON.parse(dadosSalvos);
      setFormData(dados.formData || {});
      setAddress(dados.address || {});
    }
  }, []);

  return (
    <Layout screenTitle="Configurações">
      <div className="flex h-screen bg-gray-100">
        {saveSuccess && (
          <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow-md z-50">
            Configurações salvas com sucesso!
          </div>
        )}
        <div className="flex-1 flex flex-col items-center p-4 justify-start overflow-hidden">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Editar Perfil
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Digite seu nome"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label
                    htmlFor="sobrenome"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Sobrenome
                  </label>
                  <input
                    type="text"
                    id="sobrenome"
                    name="sobrenome"
                    value={formData.sobrenome}
                    onChange={handleChange}
                    placeholder="Digite seu sobrenome"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              {nameError && (
                <p className="text-red-500 text-sm">{nameError}</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="cep"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    CEP
                  </label>
                  <input
                    type="text"
                    id="cep"
                    name="cep"
                    value={address.cep}
                    onChange={handleAddressChange}
                    onBlur={(e) => fetchAddressByZip(e.target.value)}
                    placeholder="Digite seu CEP"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  {cepError && (
                    <p className="text-red-500 text-sm">{cepError}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="rua"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Rua
                  </label>
                  <input
                    type="text"
                    id="rua"
                    name="rua"
                    value={address.rua}
                    onChange={handleAddressChange}
                    placeholder="Rua"
                    className="w-full px-3 py-2 border rounded-lg"
                  />

                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="numero"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Número
                  </label>
                  <input
                    type="text"
                    id="numero"
                    name="numero"
                    value={address.numero}
                    onChange={handleAddressChange}
                    placeholder="Número"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cidade"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Cidade
                  </label>
                  <input
                    type="text"
                    id="cidade"
                    name="cidade"
                    value={address.cidade}
                    disabled
                    className="w-full px-3 py-2 border rounded-lg bg-gray-200"
                  />
                </div>
                <div>
                  <label
                    htmlFor="estado"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Estado
                  </label>
                  <input
                    type="text"
                    id="estado"
                    name="estado"
                    value={address.estado}
                    disabled
                    className="w-full px-3 py-2 border rounded-lg bg-gray-200"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-1"
                >
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
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Digite seu email"
                />
                {emailError && (
                  <p className="text-red-500 text-sm">{emailError}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="telefone"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(99) 99999-9999"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="senha"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    id="senha"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    placeholder="Digite sua nova senha"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmarSenha"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    id="confirmarSenha"
                    name="confirmarSenha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    placeholder="Confirme sua nova senha"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="text-right">
                <Button
                  label="Salvar Alterações"
                  icon="pi pi-save"
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
