"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Counter from "@/components/Counter";
import Budget from "@/components/Budget";
import "@/style/styles.css";
import "@/style/globals.css";
// Importando os ícones para o menu hambúrguer
import { FaBars, FaTimes } from "react-icons/fa";

const SolarLandingPage = () => {
  // Controle para mostrar ou ocultar o modal de orçamento
  const [showModal, setShowModal] = useState(false);
  // Estado para controlar a visibilidade do menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 text-gray-800 min-h-screen">
      {/* Cabeçalho Modificado */}
      <header className="bg-blue-500 text-white py-4 sticky top-0 z-50 shadow-md">
        <nav className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Painéis Solares</h1>

          {/* Menu para Desktop (escondido em telas pequenas) */}
          <ul className="hidden md:flex space-x-6">
            <li><a href="#home" className="hover:underline">HOME</a></li>
            <li><a href="#about" className="hover:underline">SOBRE NÓS</a></li>
            <li><a href="#services" className="hover:underline">SERVIÇOS</a></li>
            <li><a href="/pages/login" className="hover:underline">ENTRAR</a></li>
          </ul>

          {/* Botão Hambúrguer (visível apenas em telas pequenas) */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </nav>

        {/* Menu Mobile (aparece quando o botão é clicado) */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-500">
            <ul className="flex flex-col items-center space-y-4 py-4">
              <li><a href="#home" onClick={() => setIsMenuOpen(false)} className="hover:underline">HOME</a></li>
              <li><a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:underline">SOBRE NÓS</a></li>
              <li><a href="#services" onClick={() => setIsMenuOpen(false)} className="hover:underline">SERVIÇOS</a></li>
              <li><a href="/pages/login" onClick={() => setIsMenuOpen(false)} className="hover:underline">ENTRAR</a></li>
            </ul>
          </div>
        )}
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
          {/* Tamanho da fonte ajustado para telas menores */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-6 leading-tight">
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
            <Counter target={100} label="Clientes Satisfeitos" />
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
      {showModal && <Budget setShowModal={setShowModal} isHomePage />}

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