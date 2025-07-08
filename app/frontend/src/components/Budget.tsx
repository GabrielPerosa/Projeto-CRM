"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import "@/style/styles.css";
import "@/style/globals.css";

interface BudgetProps {
  setShowModal: (show: boolean) => void;
  isHomePage?: boolean; // nova prop opcional
}

const Budget: React.FC<BudgetProps> = ({ setShowModal, isHomePage }) => {
  const [option, setOption] = useState<"bill" | "kw">("bill");
  const [energyBill, setEnergyBill] = useState<string>("");
  const [kw, setKw] = useState<string>("");
  const [address, setAddress] = useState({
    cep: "",
    rua: "",
    cidade: "",
    estado: "",
    numero: "",
    complemento: "",
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [quote, setQuote] = useState<number | null>(null);

  // Função para atualizar os campos de endereço
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função para buscar o endereço com base no CEP
  const fetchAddressByZip = async (zip: string) => {
    if (zip.length === 8) {
      // Verifica se o CEP possui 8 dígitos
      try {
        // Faz a requisição para a API ViaCEP
        const response = await fetch(`https://viacep.com.br/ws/${zip}/json/`);
        const data = await response.json();
        if (!data.erro) {
          // Atualiza os campos de endereço com os dados da API
          setAddress((prev) => ({
            ...prev,
            rua: data.logradouro,
            cidade: data.localidade,
            estado: data.uf,
          }));
        } else {
          alert("CEP não encontrado.");
        }
      } catch {
        alert("Erro ao buscar o endereço. Tente novamente.");
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const calculateQuote = () => {
    if (option === "bill" && energyBill) {
      setQuote(parseFloat(energyBill) * 0.8); // Simulação de cálculo
    } else if (option === "kw" && kw) {
      setQuote(parseFloat(kw) * 50); // Simulação de cálculo
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-3xl">
        <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">
          Simulação de Orçamento
        </h3>

        {/* Opções */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">
            Selecione o tipo de orçamento:
          </label>
          <div className="flex gap-4">
            <Button
              onClick={() => setOption("bill")}
              className={`w-full ${
                option === "bill"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Reduzir Conta de Energia
            </Button>
            <Button
              onClick={() => setOption("kw")}
              className={`w-full ${
                option === "kw"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Calcular por Quilowatt
            </Button>
          </div>
        </div>

        {/* Inputs */}
        {option === "bill" && (
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">
              Valor da Conta de Energia (R$)
            </label>
            <Input
              type="number"
              value={energyBill}
              onChange={(e) => setEnergyBill(e.target.value)}
              placeholder="Digite o valor da conta"
              step="0.01"
            />
          </div>
        )}

        {option === "kw" && (
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">
              Valor gasto de Kw (quilowatt)
            </label>
            <Input
              type="number"
              value={kw}
              onChange={(e) => setKw(e.target.value)}
              placeholder="Digite o valor"
              step="0.01"
            />
          </div>
        )}

        {/* Endereço */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Endereço:</label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              name="cep"
              value={address.cep}
              onChange={handleAddressChange}
              onBlur={(e) => fetchAddressByZip(e.target.value)}
              placeholder="CEP"
            />
            <Input
              type="text"
              name="rua"
              value={address.rua}
              placeholder="Rua"
              disabled
            />
            <Input
              type="text"
              name="cidade"
              value={address.cidade}
              placeholder="Cidade"
              disabled
            />
            <Input
              type="text"
              name="estado"
              value={address.estado}
              placeholder="Estado"
              disabled
            />
            <Input
              type="text"
              name="numero"
              value={address.numero}
              onChange={handleAddressChange}
              placeholder="Número"
            />
            <Input
              type="text"
              name="complemento"
              value={address.complemento}
              onChange={handleAddressChange}
              placeholder="Complemento"
            />
          </div>
        </div>

        {/* Upload */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">
            Upload da sua conta de energia:
          </label>
          <Input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileUpload}
          />
          {uploadedFile && (
            <p className="text-sm text-gray-600 mt-2">
              Arquivo carregado: <strong>{uploadedFile.name}</strong>
            </p>
          )}
        </div>

        {/* Calcular */}
        <Button
          onClick={calculateQuote}
          className="w-full bg-blue-500 text-white mt-2"
        >
          Calcular
        </Button>

        {quote !== null && (
          <>
            <p className="text-md font-semibold text-left text-blue-600 mt-4">
              Valor simulado: R$ {quote.toFixed(2)}
            </p>

            {isHomePage && (
              <p className="text-sm text-center text-gray-600 mt-2">
                Gostou da simulação?{" "}
                <a
                  href="/pages/register"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Cadastre-se agora para continuar
                </a>
              </p>
            )}
          </>
        )}

        {/* Fechar */}
        <Button
          onClick={() => setShowModal(false)}
          className="mt-4 w-full bg-gray-300 text-gray-700"
        >
          Fechar
        </Button>
      </div>
    </div>
  );
};

export default Budget;
