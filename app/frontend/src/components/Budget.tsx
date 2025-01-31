'use client';
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import "@/style/styles.css";
import "@/style/globals.css";

interface BudgetProps {
  showBudget: boolean;
  setShowBudget: (show: boolean) => void;
}

const Budget: React.FC<BudgetProps> = ({ showBudget, setShowBudget }) => {
  const [option, setOption] = useState<"bill" | "area">("bill");
  const [energyBill, setEnergyBill] = useState<string>("");
  const [area, setArea] = useState<string>("");
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

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const calculateQuote = () => {
    if (option === "bill" && energyBill) {
      setQuote(parseFloat(energyBill) * 0.8); // Simulação de cálculo
    } else if (option === "area" && area) {
      setQuote(parseFloat(area) * 50); // Simulação de cálculo
    }
  };

  return (
    showBudget && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-3xl">
          <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">
            Simulação de Orçamento
          </h3>

          {/* Seleção de tipo de orçamento */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Selecione o tipo de orçamento:</label>
            <div className="flex gap-4">
              <Button onClick={() => setOption("bill")} className={`w-full ${option === "bill" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
                Reduzir Conta de Energia
              </Button>
              <Button onClick={() => setOption("area")} className={`w-full ${option === "area" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
                Calcular por m²
              </Button>
            </div>
          </div>

          {/* Formulário de orçamento */}
          {option === "bill" && (
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Valor da Conta de Energia (R$)</label>
              <Input type="number" value={energyBill} onChange={(e) => setEnergyBill(e.target.value)} placeholder="Digite o valor da conta" step="0.01" />
            </div>
          )}

          {option === "area" && (
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Área disponível para instalação (m²)</label>
              <Input type="number" value={area} onChange={(e) => setArea(e.target.value)} placeholder="Digite a área em m²" step="0.01" />
            </div>
          )}

          {/* Endereço */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Endereço:</label>
            <div className="grid grid-cols-2 gap-4">
              <Input type="text" name="cep" value={address.cep} onChange={handleAddressChange} placeholder="CEP" />
              <Input type="text" name="rua" value={address.rua} placeholder="Rua" disabled />
              <Input type="text" name="cidade" value={address.cidade} placeholder="Cidade" disabled />
              <Input type="text" name="estado" value={address.estado} placeholder="Estado" disabled />
              <Input type="text" name="numero" value={address.numero} onChange={handleAddressChange} placeholder="Número" />
              <Input type="text" name="complemento" value={address.complemento} onChange={handleAddressChange} placeholder="Complemento" />
            </div>
          </div>

          {/* Upload de Arquivo */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Faça o upload da sua conta de energia:</label>
            <Input type="file" accept="image/*,application/pdf" onChange={handleFileUpload} />
            {uploadedFile && <p className="text-sm text-gray-600 mt-2">Arquivo carregado: <strong>{uploadedFile.name}</strong></p>}
          </div>

          {/* Botão de Calcular */}
          <Button onClick={calculateQuote} className="w-full bg-blue-500 text-white mt-2">Calcular</Button>

          {/* Resultado */}
          {quote !== null && (
            <div className="mt-4">
              <p className="text-lg font-semibold text-gray-700">
                Valor estimado: <span className="text-blue-500">R$ {quote.toFixed(2)}</span>
              </p>
              <h1 className="text-sm text-gray-600 text-center">
                Gostou do orçamento? Faça seu cadastro{" "}
                <a href="/pages/register" className="text-blue-600 hover:underline">
                  aqui
                </a>{" "}
                para solicitar o serviço.
              </h1>
            </div>
          )}

          {/* Fechar Modal */}
          <Button onClick={() => setShowBudget(false)} className="mt-4 w-full bg-gray-300 text-gray-700">Fechar</Button>
        </div>
      </div>
    )
  );
};

export default Budget;
