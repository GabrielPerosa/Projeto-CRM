"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const SolarLandingPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [option, setOption] = useState("bill"); // 'bill' or 'area'
    const [energyBill, setEnergyBill] = useState("");
    const [area, setArea] = useState("");
    const [quote, setQuote] = useState<string | null>(null);

    const stateRatePerBill = 1.5; // Fictitious rate per bill calculation
    const stateRatePerSquareMeter = 200; // Fictitious rate per square meter
  
    const calculateQuote = () => {
      let total = 0;
      if (option === "bill") {
        total = parseFloat(energyBill) * stateRatePerBill;
      } else if (option === "area") {
        total = parseFloat(area) * stateRatePerSquareMeter;
      }
      setQuote(total.toFixed(2));
    };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 text-gray-800 min-h-screen">
      {/* Header */}
      <header className="bg-blue-500 text-white py-4 sticky top-0 z-50 shadow-md">
        <nav className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Painéis Solares</h1>
          <ul className="flex space-x-6">
            <li>
              <a href="#home" className="hover:underline">
                HOME
              </a>
            </li>
            <li>
              <a href="#about" className="hover:underline">
                SOBRE NÓS
              </a>
            </li>
            <li>
              <button onClick={() => setShowModal(true)} className="hover:underline">
                ORÇAMENTO
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Home Section */}
      <motion.section
        id="home"
        className="h-screen flex items-center justify-center text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <h2 className="text-4xl font-extrabold text-blue-700 mb-4">
            Economize com Energia Solar!
          </h2>
          <p className="text-lg text-gray-600">
            Descubra como reduzir sua conta de energia com painéis solares de alta
            eficiência.
          </p>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="py-20 px-4 bg-white"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
            Sobre Nós
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed text-justify">
            Somos apaixonados por transformar energia em economia! Nossa missão é levar
            energia sustentável para todos os lares e empresas, proporcionando soluções
            eficientes e acessíveis. Com uma equipe dedicada e tecnologia de ponta,
            ajudamos nossos clientes a reduzir custos e contribuir para um planeta mais
            verde. Junte-se a nós nessa jornada rumo ao futuro da energia limpa!
          </p>
        </div>
      </motion.section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
            <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">
              Simulação de Orçamento
            </h3>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Selecione o tipo de orçamento:</label>
              <div className="flex gap-4">
                <Button
                  onClick={() => setOption("bill")}
                  className={`w-full ${option === "bill" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                  Reduzir Conta de Energia
                </Button>
                <Button
                  onClick={() => setOption("area")}
                  className={`w-full ${option === "area" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                  Calcular por m²
                </Button>
              </div>
            </div>

            {option === "bill" && (
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">Valor da Conta de Energia (R$)</label>
                <Input
                  type="number"
                  value={energyBill}
                  onChange={(e) => setEnergyBill(e.target.value)}
                  placeholder="Digite o valor da conta"
                  step="0.01"
                />
              </div>
            )}

            {option === "area" && (
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">Área disponível para instalação (m²)</label>
                <Input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Digite a área em m²"
                  step="0.01"
                />
              </div>
            )}

            <Button
              onClick={calculateQuote}
              className="w-full bg-blue-500 text-white mt-4"
            >
              Calcular
            </Button>
            {quote && (
              <div className="mt-4">
                <p className="text-lg font-semibold text-gray-700">
                  Valor estimado: <span className="text-blue-500">R$ {quote}</span>
                </p>
                <a href="/pages/register" className="text-sm text-gray-600 text-center">Clique aqui para se cadastrar!</a>
              </div>
            )}

            <Button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full bg-gray-300 text-gray-700"
            >
              Fechar
            </Button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-blue-500 text-white py-4 text-center">
        <p>© 2025 Painéis Solares. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default SolarLandingPage;
