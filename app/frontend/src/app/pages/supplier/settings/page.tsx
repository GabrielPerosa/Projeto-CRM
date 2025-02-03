"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Dropdown } from "primereact/dropdown";
import { FaTimes } from "react-icons/fa";

export default function Settings() {

  const [estado, setEstado] = useState("");
  const [estadosAdicionados, setEstadosAdicionados] = useState<Estado[]>([]);
  const [valor, setValor] = useState("");
  const [mensagemAviso, setMensagemAviso] = useState<string | null>(null);


  interface Estado {
    estado: string;
    valor: string;
  }

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

  const estadosBrasil = [
    { label: "Acre", value: "AC" },
    { label: "Alagoas", value: "AL" },
    { label: "Amapá", value: "AP" },
    { label: "Amazonas", value: "AM" },
    { label: "Bahia", value: "BA" },
    { label: "Ceará", value: "CE" },
    { label: "Distrito Federal", value: "DF" },
    { label: "Espírito Santo", value: "ES" },
    { label: "Goiás", value: "GO" },
    { label: "Maranhão", value: "MA" },
    { label: "Mato Grosso", value: "MT" },
    { label: "Mato Grosso do Sul", value: "MS" },
    { label: "Minas Gerais", value: "MG" },
    { label: "Pará", value: "PA" },
    { label: "Paraíba", value: "PB" },
    { label: "Paraná", value: "PR" },
    { label: "Pernambuco", value: "PE" },
    { label: "Piauí", value: "PI" },
    { label: "Rio de Janeiro", value: "RJ" },
    { label: "Rio Grande do Norte", value: "RN" },
    { label: "Rio Grande do Sul", value: "RS" },
    { label: "Rondônia", value: "RO" },
    { label: "Roraima", value: "RR" },
    { label: "Santa Catarina", value: "SC" },
    { label: "São Paulo", value: "SP" },
    { label: "Sergipe", value: "SE" },
    { label: "Tocantins", value: "TO" },
  ];

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

  const adicionarEstado = () => {
    if (!estado || !valor.trim()) {
      setMensagemAviso("Por favor, selecione um estado e informe um valor válido.");
      return;
    }

    // Verifica se o estado já foi adicionado
    if (estadosAdicionados.some((item) => item.estado === estado)) {
      setMensagemAviso("Este estado já foi adicionado!");
      return;
    }

    const novoEstado = { estado, valor };
    setEstadosAdicionados([...estadosAdicionados, novoEstado]);
    setEstado("");
    setValor("");
  };

  // Limpa a mensagem de aviso automaticamente após 3 segundos
  useEffect(() => {
    if (mensagemAviso) {
      const timer = setTimeout(() => setMensagemAviso(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensagemAviso]); // Apenas a variável de estado

  const removerEstado = (estadoToRemove: string) => {
    setEstadosAdicionados(
      estadosAdicionados.filter((item) => item.estado !== estadoToRemove)
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar fixa */}
      <div className="hidden md:block w-64 bg-gray-100 shadow-md">
        <Sidebar title="Configurações" username="Usuário" />
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col items-center justify-center overflow-auto p-4 custom-scrollbar">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Editar Perfil
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome e Sobrenome */}
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

            {/* Endereço */}
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
                  placeholder="Rua"
                  disabled
                  className="w-full px-3 py-2 border rounded-lg bg-gray-200"
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

            {/* E-mail e Telefone */}
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
                required
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Digite seu email"
              />
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              {/* Adicionar Estado */}
              <div>
                <label
                  htmlFor="estado"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Estado (Valor médio cobrado)
                </label>
                <Dropdown
                  id="estado"
                  value={estado}
                  onChange={(e) => setEstado(e.value)}
                  options={estadosBrasil}
                  placeholder="Selecione"
                  className="w-full border rounded-lg"
                  panelClassName="custom-dropdown-panel"
                />
              </div>

              {/* Valor */}
              <div>
                <label
                  htmlFor="valor"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Valor
                </label>
                <input
                  type="text"
                  id="valor"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  className="w-full px-2 py-3 border rounded-lg"
                  placeholder="Insira o valor"
                />
              </div>
            </div>

            {/* Botão de Adicionar o Estado */}
            <button
              type="button"
              onClick={adicionarEstado}
              className="w-full p-2 rounded bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold mt-2"
            >
              Adicionar Estado
            </button>
            
            {/* Exibir mensagem de aviso */}
            {mensagemAviso && (
              <p className="text-black text-sm text-center my-2 font-bold">
                {mensagemAviso}
              </p>
            )}

            {/* Removendo o estado */}
            <div className="mt-2 bg-white rounded-lg p-2 shadow max-h-20 overflow-y-auto border border-gray-300">
              <ul className="divide-y divide-gray-300">
                {estadosAdicionados.map((item, index) => (
                  <li
                    key={index}
                    className="text-gray-700 text-sm flex items-center justify-between p-2"
                  >
                    {item.estado} - R$ {item.valor}
                    <button
                      type="button"
                      onClick={() => removerEstado(item.estado)}
                      className="text-black p-1"
                    >
                      <FaTimes />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Senha */}
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
