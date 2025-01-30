"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
          alert("CEP não encontrado.");
        }
      } catch (error) {
        alert("Erro ao buscar o endereço. Tente novamente.");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Configurações salvas com sucesso!");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar fixa */}
      <div className="hidden md:block w-64 bg-gray-100 shadow-md">
        <Sidebar title="Configurações" username="Usuário" />
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col items-center justify-center overflow-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Editar Perfil</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome e Sobrenome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nome" className="block text-gray-700 font-medium mb-1">
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
                <label htmlFor="sobrenome" className="block text-gray-700 font-medium mb-1">
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

            {/* Endereço */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cep" className="block text-gray-700 font-medium mb-1">
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
              </div>
              <div>
                <label htmlFor="rua" className="block text-gray-700 font-medium mb-1">
                  Rua
                </label>
                <input
                  type="text"
                  id="rua"
                  name="rua"
                  value={address.rua}
                  placeholder="Rua"
                  disabled
                  className="w-full px-3 py-2 border rounded-lg bg-gray-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="numero" className="block text-gray-700 font-medium mb-1">
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
                <label htmlFor="cidade" className="block text-gray-700 font-medium mb-1">
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
                <label htmlFor="estado" className="block text-gray-700 font-medium mb-1">
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

            {/* E-mail e Telefone */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Digite seu email"
              />
            </div>
            <div>
              <label htmlFor="telefone" className="block text-gray-700 font-medium mb-1">
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

            {/* Senha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="senha" className="block text-gray-700 font-medium mb-1">
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
                <label htmlFor="confirmarSenha" className="block text-gray-700 font-medium mb-1">
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

            {/* Botão Salvar */}
            <div className="text-right">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
