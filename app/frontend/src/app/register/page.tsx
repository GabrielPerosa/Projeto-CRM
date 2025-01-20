"use client";
import React, { useState } from "react";
import { InputMask } from "primereact/inputmask";
import { Dropdown } from "primereact/dropdown";
import "primeicons/primeicons.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import Image from "next/image";

export default function StyledMaskDemo() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [endereco, setEndereco] = useState("");
  const [senhaVisible, setPasswordVisible] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [estado, setEstado] = useState("");
  const [estadosAdicionados, setEstadosAdicionados] = useState<Estado[]>([]);
  const [valor, setValor] = useState("");
  const router = useRouter();

  const formattedTelefone = telefone.replace(/\D/g, "");

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

  interface Estado {
    estado: string;
    valor: string;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const usuarioDto = {
      nome,
      sobrenome,
      endereco,
      email,
      telefone: formattedTelefone,
      senha,
      estadosAdicionados,
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
      router.push("http://localhost:3000/login");
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const adicionarEstado = () => {
    if (estado && valor) {
      const novoEstado = { estado, valor };
      setEstadosAdicionados([...estadosAdicionados, novoEstado]);
      setEstado("");
      setValor("");
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-slate-300 p-4">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Formulário */}
        <div className="w-full lg:w-1/2 p-6 lg:p-10 bg-gradient-to-br from-blue-600 to-blue-500">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            Crie sua Conta
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nome" className="text-white text-sm block mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className="w-full p-2 rounded bg-blue-200 text-black text-sm"
                  placeholder="Digite seu nome"
                />
              </div>

              <div>
                <label htmlFor="nome" className="text-white text-sm block mb-1">
                  Sobrenome
                </label>
                <input
                  type="text"
                  id="sobrenome"
                  value={nome}
                  onChange={(e) => setSobrenome(e.target.value)}
                  required
                  className="w-full p-2 rounded bg-blue-200 text-black text-sm"
                  placeholder="Digite seu sobrenome"
                />
              </div>

              <div>
                <label htmlFor="nome" className="text-white text-sm block mb-1">
                  Endereço
                </label>
                <input
                  type="text"
                  id="endereco"
                  value={nome}
                  onChange={(e) => setEndereco(e.target.value)}
                  required
                  className="w-full p-2 rounded bg-blue-200 text-black text-sm"
                  placeholder="Digite seu endereço"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-white text-sm block mb-1"
                >
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 rounded bg-blue-200 text-black text-sm"
                  placeholder="Digite seu email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="telefone"
                  className="text-white text-sm block mb-1"
                >
                  Telefone
                </label>
                <InputMask
                  id="telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.value as string)}
                  mask="(99) 99999-9999"
                  placeholder="(99) 99999-9999"
                  className="w-full p-2 rounded bg-blue-200 text-black text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="estado"
                  className="text-white text-sm block mb-1"
                >
                  Estado (valor médio cobrado)
                </label>
                <Dropdown
                  id="estado"
                  value={estado}
                  onChange={(e) => setEstado(e.value)}
                  options={estadosBrasil}
                  placeholder="Selecione"
                  className="w-full p-2 rounded bg-blue-200 text-black text-sm"
                  panelClassName="custom-dropdown-panel"
                />
              </div>
            </div>

            {estado && (
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
                  className="w-full p-2 rounded bg-blue-200 text-black text-sm"
                  placeholder="Insira o valor"
                />
              </div>
            )}

            <button
              type="button"
              onClick={adicionarEstado}
              className="w-full p-2 rounded bg-blue-700 text-white text-sm font-semibold mt-2"
            >
              Adicionar Estado
            </button>

            {estadosAdicionados.length > 0 && (
              <ul className="mt-2 bg-white rounded-lg p-2 shadow">
                {estadosAdicionados.map((item, index) => (
                  <li key={index} className="text-gray-700 text-sm">
                    {item.estado} - R$ {item.valor}
                  </li>
                ))}
              </ul>
            )}

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

            <button
              type="submit"
              className="w-full p-2 rounded bg-blue-700 text-white text-sm font-semibold mt-4"
            >
              Cadastrar
            </button>
          </form>
        </div>

        {/* Imagem */}
        <div className="hidden lg:block w-1/2">
          <Image
            src="/images/register/painel.jpg"
            alt="Imagem de fundo"
            width={1000}
            height={1000}
            objectFit="cover" // Para garantir que a imagem se comporte como `object-cover`
          />
        </div>
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
