"use client";
import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import "primeicons/primeicons.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { FaTimes } from "react-icons/fa"; // Ícone para remover estado
import { Checkbox } from "primereact/checkbox"; // Importando Checkbox

export default function StyledMaskDemo() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisible, setPasswordVisible] = useState(false);
  const [, setResponseData] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [estado, setEstado] = useState("");
  const [estadosAdicionados, setEstadosAdicionados] = useState<Estado[]>([]);
  const [valor, setValor] = useState("");
  const [mensagemAviso, setMensagemAviso] = useState<string | null>(null);
  const router = useRouter();
  const formattedTelefone = telefone.replace(/\D/g, "");

  // estado para armazenar se é Cliente ou Fornecedor
  const [isCliente, setIsCliente] = useState(false);
  const [isFornecedor, setIsFornecedor] = useState(false);

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

  const [address, setAddress] = useState({
    rua: "",
    numero: "",
    complemento: "",
    cidade: "",
    estado: "",
    cep: "",
  });

  interface Estado {
    estado: string;
    valor: string;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const usuarioDto = {
      nome,
      sobrenome,
      email,
      telefone: formattedTelefone,
      senha,
      estadosAdicionados,
      tipo: isCliente ? "Cliente" : isFornecedor ? "Fornecedor" : null,
    };

    try {
      const response = await axios.post(
        "http://localhost/api/usuario",
        usuarioDto
      );
      setShowPopup(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setShowPopup(false);
      setResponseData(response.data);
      router.push("http://localhost:3000/pages/login");
    } catch (error) {
      console.error("Erro:", error);
    }
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

  return (
    <main className="flex justify-center items-center min-h-screen bg-slate-300 p-4">
      <div className="w-full lg:w-2/3 xl:w-1/2 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Crie sua Conta
        </h2>

        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* Seção: Cliente ou Fornecedor */}
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-2">
              <Checkbox
                inputId="cliente"
                checked={isCliente}
                onChange={(e) => {
                  setIsCliente(e.checked as boolean);
                  setIsFornecedor(false);
                }}
              />
              <label htmlFor="cliente" className="text-white text-sm">
                Cliente
              </label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                inputId="fornecedor"
                checked={isFornecedor}
                onChange={(e) => {
                  setIsFornecedor(e.checked as boolean);
                  setIsCliente(false);
                }}
              />
              <label htmlFor="fornecedor" className="text-white text-sm">
                Fornecedor
              </label>
            </div>
          </div>

          {/* Campos comuns a todos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nome" className="text-white text-sm block mb-1">
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                placeholder="Digite seu nome"
                className="w-full p-2 rounded bg-blue-200 text-black text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="sobrenome"
                className="text-white text-sm block mb-1"
              >
                Sobrenome
              </label>
              <input
                type="text"
                id="sobrenome"
                name="sobrenome"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
                required
                placeholder="Digite seu sobrenome"
                className="w-full p-2 rounded bg-blue-200 text-black text-sm"
              />
            </div>
          </div>
          {/* Endereço */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="cep" className="text-white text-sm block mb-1">
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
                className="w-full p-2 rounded bg-blue-200 text-black text-sm"
              />
            </div>
            <div>
              <label htmlFor="rua" className="text-white text-sm block mb-1">
                Rua
              </label>
              <input
                type="text"
                id="rua"
                name="rua"
                value={address.rua}
                placeholder="Rua"
                disabled
                className="w-full p-2 rounded bg-blue-200 text-black text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="numero" className="text-white text-sm block mb-1">
                Número
              </label>
              <input
                type="text"
                id="numero"
                name="numero"
                value={address.numero}
                onChange={handleAddressChange}
                placeholder="Número"
                className="w-full p-2 rounded bg-blue-200 text-black text-sm"
              />
            </div>
            <div>
              <label htmlFor="cidade" className="text-white text-sm block mb-1">
                Cidade
              </label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                value={address.cidade}
                disabled
                className="w-full p-2 rounded bg-blue-200 text-black text-sm"
              />
            </div>
            <div>
              <label htmlFor="estado" className="text-white text-sm block mb-1">
                Estado
              </label>
              <input
                type="text"
                id="estado"
                name="estado"
                value={address.estado}
                disabled
                className="w-full p-2 rounded bg-blue-200 text-black text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* E-mail */}
            <div>
              <label htmlFor="email" className="text-white text-sm block mb-1">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 rounded bg-blue-200 text-black text-sm"
                placeholder="Digite seu email"
              />
            </div>

            {/* Telefone */}
            <div>
              <label
                htmlFor="telefone"
                className="text-white text-sm block mb-1"
              >
                Telefone
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
                placeholder="(99) 99999-9999"
                className="w-full p-2 rounded bg-blue-200 text-black text-sm"
              />
            </div>
          </div>

          {/* Seção: Senha */}
          <div>
            <label htmlFor="senha" className="text-white text-sm block mb-1">
              Senha
            </label>
            <div className="relative">
              <input
                type={senhaVisible ? "text" : "password"}
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full p-2 rounded bg-blue-200 text-black text-sm"
                placeholder="Digite sua senha"
              />
              <span
                onClick={() => setPasswordVisible(!senhaVisible)}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white cursor-pointer"
              >
                <i
                  className={`pi ${senhaVisible ? "pi-eye-slash" : "pi-eye"}`}
                />
              </span>
            </div>
          </div>

          {/* Campos específicos para Fornecedor */}
          {isFornecedor && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="estado"
                  className="text-white text-sm block mb-1"
                >
                  Estado (Valor médio cobrado)
                </label>
                <Dropdown
                  id="estado"
                  value={estado}
                  onChange={(e) => setEstado(e.value)}
                  options={estadosBrasil}
                  placeholder="Selecione"
                  className="w-full rounded bg-blue-200 text-black text-sm h-10"
                  panelClassName="custom-dropdown-panel"
                />
              </div>

              {/* Valor - Sempre visível */}
              <div>
                <label
                  htmlFor="valor"
                  className="text-white text-sm block mb-1"
                >
                  Valor
                </label>
                <input
                  type="text"
                  id="valor"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  className="w-full p-2 rounded bg-blue-200 text-black text-sm h-10"
                  placeholder="Insira o valor"
                />
              </div>
            </div>
          )}

          {isFornecedor && (
            <button
              type="button"
              onClick={adicionarEstado}
              className="w-full p-2 rounded bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold mt-2"
            >
              Adicionar Estado
            </button>
          )}

          {/* Exibir mensagem de aviso */}
          {mensagemAviso && (
            <p className="text-white text-sm text-center my-2 font-bold">
              {mensagemAviso}
            </p>
          )}

          {isFornecedor && estadosAdicionados.length > 0 && (
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
          )}

          <button
            type="submit"
            className="w-full p-2 rounded bg-blue-700 text-white text-sm font-semibold mt-4"
          >
            Cadastrar
          </button>
        </form>
      </div>

      <Dialog
        visible={showPopup}
        onHide={() => setShowPopup(false)}
        className="bg-green-400 p-4 text-center rounded-lg shadow-lg"
      >
        <p className="text-white font-bold">Usuário cadastrado com sucesso!</p>
      </Dialog>
    </main>
  );
}
