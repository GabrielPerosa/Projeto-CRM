"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Counter from "@/components/Counter";

import "@/style/styles.css";
import "@/style/globals.css";

const SolarLandingPage = () => {
  // Controle para mostrar ou ocultar o modal
  const [showModal, setShowModal] = useState(false);
  // Tipo de orçamento selecionado: "bill" (conta) ou "area" (área)

  const [option, setOption] = useState("bill");
  // Valor da conta de energia fornecido pelo usuário
  const [energyBill, setEnergyBill] = useState("");
  // Área disponível para instalação fornecida pelo usuário
  const [area, setArea] = useState("");
  // Resultado do orçamento calculado
  const [quote, setQuote] = useState<string | null>(null);

  // Dados do endereço do usuário
  const [address, setAddress] = useState({
    rua: "", // Rua
    numero: "", // Número
    complemento: "", // Complemento
    cidade: "", // Cidade
    estado: "", // Estado
    cep: "", // CEP
  });

  // Arquivo de conta de energia enviado pelo usuário
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Taxas fictícias para cálculo de orçamento
  const stateRatePerBill = 1.5; // Taxa por valor da conta de energia
  const stateRatePerSquareMeter = 200; // Taxa por metro quadrado

  // Função para calcular o orçamento com base na opção selecionada
  const calculateQuote = () => {
    let total = 0;
    if (option === "bill") {
      // Cálculo baseado no valor da conta de energia
      total = parseFloat(energyBill) * stateRatePerBill;
    } else if (option === "area") {
      // Cálculo baseado na área em metros quadrados
      total = parseFloat(area) * stateRatePerSquareMeter;
    }
    setQuote(total.toFixed(2)); // Armazena o resultado formatado
  };

  // Função para atualizar os campos de endereço
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função para lidar com o upload de arquivos
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
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
      } catch (error) {
        alert("Erro ao buscar o endereço. Tente novamente.");
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 text-gray-800 min-h-screen">
      {/* Cabeçalho */}
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
              <a href="#services" className="hover:underline">
                SERVIÇOS
              </a>
            </li>
            <li>
              <a
                href="http://localhost:3000/pages/login"
                className="hover:underline"
              >
                ENTRAR
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Seção Inicial */}
      <motion.section
        id="home"
        className="h-screen flex items-center justify-center text-center bg-gradient-to-br from-blue-100 to-blue-300 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-3xl">
          <h2 className="text-5xl font-extrabold text-blue-800 mb-6 leading-tight">
            Economize com Energia Solar. Invista em Sustentabilidade e Retorno
            Garantido.
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Já são mais de 200 sistemas solares instalados em todo o Brasil.
            Projetos personalizados, tecnologia de ponta e profissionais
            credenciados que garantem eficiência e segurança do início ao fim.
          </p>
          <Button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Solicitar Orçamento
          </Button>
        </div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">
            Energia que Transforma
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-5 text-lg text-gray-700 leading-relaxed">
              <p>
                Com mais de 10 anos de atuação no mercado, oferecemos soluções
                completas em energia solar, com foco em economia e
                sustentabilidade.
              </p>
              <p>
                Unimos tecnologia, engenharia e responsabilidade ambiental para
                entregar sistemas solares eficientes, duráveis e personalizados
                para cada cliente.
              </p>
              <p>
                Atuamos com responsabilidade técnica e compromisso com o meio
                ambiente, garantindo retorno financeiro e sustentabilidade.
              </p>
            </div>
            <motion.img
              src="/images/home/perfil.webp"
              alt="Equipe de energia solar"
              className="rounded-lg shadow-lg w-full"
              whileHover={{ scale: 1.03 }}
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-12">
            Confiança Construída com Resultados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <Counter target={200} label="Sistemas Instalados pelo Brasil" />
            <Counter target={10} label="Anos de Experiência" />
            <Counter target={95} label="Clientes Satisfeitos" />
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section
        id="services"
        className="py-20 bg-gradient-to-b from-blue-50 to-white text-gray-800"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-blue-700 text-center mb-14">
            Nossos Diferenciais
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Card */}
            {[
              {
                icon: "⚙️",
                title: "Consultoria Técnica",
                desc: "Acompanhamento profissional em projetos solares. Desde o planejamento até a homologação.",
              },
              {
                icon: "📝",
                title: "Assinatura de Documentos",
                desc: "Responsabilidade técnica, ART e laudos assinados por engenheiros certificados.",
              },
              {
                icon: "🔋",
                title: "Orçamento Inteligente",
                desc: "Calcule a economia baseada em sua conta de energia ou área disponível.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white border-t-4 border-blue-600 shadow-lg rounded-xl p-6 text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-3xl">
            <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">
              Simulação de Orçamento
            </h3>
            {/* Botões para seleção do tipo de orçamento */}
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
                  onClick={() => setOption("area")}
                  className={`w-full ${
                    option === "area"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  Calcular por m²
                </Button>
              </div>
            </div>

            {/* Formulário para cálculo de orçamento */}
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

            {option === "area" && (
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">
                  Área disponível para instalação (m²)
                </label>
                <Input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Digite a área em m²"
                  step="0.01"
                />
              </div>
            )}

            {/* Campos de endereço */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Endereço:</label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="zip"
                  value={address.cep}
                  onChange={(e) => handleAddressChange(e)}
                  onBlur={(e) => fetchAddressByZip(e.target.value)}
                  placeholder="CEP"
                />
                <Input
                  type="text"
                  name="street"
                  value={address.rua}
                  placeholder="Rua"
                  disabled
                />
                <Input
                  type="text"
                  name="city"
                  value={address.cidade}
                  placeholder="Cidade"
                  disabled
                />
                <Input
                  type="text"
                  name="state"
                  value={address.estado}
                  placeholder="Estado"
                  disabled
                />
                <Input
                  type="text"
                  name="number"
                  value={address.numero}
                  onChange={handleAddressChange}
                  placeholder="Número"
                />
                <Input
                  type="text"
                  name="complement"
                  value={address.complemento}
                  onChange={handleAddressChange}
                  placeholder="Complemento"
                />
              </div>
            </div>

            {/* Upload de arquivo */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">
                Faça o upload da sua conta de energia:
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

            {/* Botão para calcular orçamento */}
            <Button
              onClick={calculateQuote}
              className="w-full bg-blue-500 text-white mt-2"
            >
              Calcular
            </Button>
            {/* Resultado do orçamento */}
            {quote && (
              <div className="mt-4">
                <p className="text-lg font-semibold text-gray-700">
                  Valor estimado:{" "}
                  <span className="text-blue-500">R$ {quote}</span>
                </p>
                <h1 className="text-sm text-gray-600 text-center">
                  Gostou do orçamento? faça seu cadastro{" "}
                  <a
                    href="/pages/register"
                    className="text-blue-600 hover:underline"
                  >
                    {" "}
                    aqui
                  </a>{" "}
                  para solicitar o serviço.
                </h1>
              </div>
            )}

            {/* Botão para fechar o modal */}
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
      <footer className="bg-blue-500 text-white py-10 mt-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm">
            © 2025 Painéis Solares. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SolarLandingPage;
