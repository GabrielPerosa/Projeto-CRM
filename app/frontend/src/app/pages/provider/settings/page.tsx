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

  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [estadosAtendidos, setEstadosAtendidos] = useState<Estado[]>([]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("configuracoes_usuario");
    if (dadosSalvos) {
      const dados = JSON.parse(dadosSalvos);
      setFormData(dados.formData || {});
      setAddress(dados.address || {});
      setEstadosAtendidos(dados.estadosAtendidos || []);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "cep") {
      if (!/^\d*$/.test(value)) return;
    }
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, "");
    let formattedValue = numericValue;

    if (numericValue.length > 2) {
      formattedValue = `(${numericValue.slice(0, 2)}) ${numericValue.slice(2)}`;
    }
    if (numericValue.length > 7) {
      formattedValue = `(${numericValue.slice(0, 2)}) ${numericValue.slice(
        2,
        7
      )}-${numericValue.slice(7, 11)}`;
    }

    setFormData({ ...formData, telefone: formattedValue });
  };

  const validateEmail = (email: string) => {
    // Mais robusta: impede espaços, vários pontos seguidos, e domínios inválidos.
    if (/\s/.test(email) || /\.{2,}/.test(email)) return false;

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) return false;

    const domainPart = email.split("@")[1];
    if (!domainPart) return false;

    const domainSegments = domainPart.split(".");
    if (domainSegments.some((seg) => seg.length === 0)) return false;

    return true;
  };

  const fetchAddressByZip = async (zip: string) => {
    if (zip.length !== 8) {
      setErrors((prev) => ({
        ...prev,
        cep: "O CEP deve ter exatamente 8 dígitos.",
      }));
      return;
    }

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
        setErrors((prev) => ({ ...prev, cep: null }));
      } else {
        setErrors((prev) => ({
          ...prev,
          cep: "CEP não encontrado.",
        }));
      }
    } catch {
      setErrors((prev) => ({
        ...prev,
        cep: "Erro ao buscar o CEP.",
      }));
    }
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

    if (address.cep && address.cep.length !== 8) {
      newErrors.cep = "CEP deve ter exatamente 8 dígitos.";
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
      address,
      estadosAtendidos,
    };

    localStorage.setItem(
      "configuracoes_usuario",
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

      <div className="flex-1 overflow-auto p-6 custom-scrollbar">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Editar Perfil
            </h2>

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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.sobrenome}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray-700 mb-1">CEP</label>
                <input
                  type="text"
                  name="cep"
                  value={address.cep}
                  onChange={handleAddressChange}
                  onBlur={(e) => fetchAddressByZip(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {errors.cep && (
                  <p className="text-red-500 text-sm mt-1">{errors.cep}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Rua</label>
                <input
                  type="text"
                  name="rua"
                  value={address.rua}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-200"
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-gray-700 mb-1">
                  Número/Complemento
                </label>
                <input
                  type="text"
                  name="numero"
                  value={address.numero}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Cidade</label>
                <input
                  type="text"
                  name="cidade"
                  value={address.cidade}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-200"
                  disabled
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Estado</label>
                <input
                  type="text"
                  name="estado"
                  value={address.estado}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-200"
                  disabled
                />
              </div>
            </div>

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

            <div className="mt-4">
              <label className="block text-gray-700 mb-1">Telefone</label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleTelefoneChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

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
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Estados e Valores Médios
            </h2>
            <StatesForm
              estadosAdicionados={estadosAtendidos ?? []}
              setEstadosAdicionados={setEstadosAtendidos}
              className="bg-white p-4 rounded-md shadow-sm space-y-3"

            />
          </div>

          <div className="col-span-1 lg:col-span-2 text-right mt-4">
            <Button
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
