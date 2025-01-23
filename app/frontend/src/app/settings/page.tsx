"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
//import '../globals.css';

export default function Settings() {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    telefone: "",
    endereco: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para salvar as configurações
    alert("Configurações salvas com sucesso!");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar fixa */}
      <div className="w-64 bg-gray-100 shadow-md">
        <Sidebar title="Configurações" username="Usuário" />
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Configurações
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Editar Perfil
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome e Sobrenome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="nome"
                  className="block text-gray-700 font-medium mb-2"
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
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="sobrenome"
                  className="block text-gray-700 font-medium mb-2"
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
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Endereço */}
            <div>
              <label
                htmlFor="endereco"
                className="block text-gray-700 font-medium mb-2"
              >
                Endereço
              </label>
              <input
                type="addres"
                id="endereco"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                placeholder="Rua, Número, Bairro, Cidade"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

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
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu email"
              />
            </div>

            {/* Telefone */}
            <div>
              <label
                htmlFor="telefone"
                className="block text-gray-700 font-medium mb-2"
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
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Senha e Confirmar Senha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="senha"
                  className="block text-gray-700 font-medium mb-2"
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
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmarSenha"
                  className="block text-gray-700 font-medium mb-2"
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
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Botão Salvar */}
            <div className="text-right">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
