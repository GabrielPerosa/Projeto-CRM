"use client";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";

import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import 'primeicons/primeicons.css';
import Image from "next/image";
import { Loading } from "@/components/Loading";


export default function Profile() {

  const [email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const session = useSession();
  
  
  if (session.status === "loading") {
    return (
      <Loading/>
    )
  }

  if (session.status === "authenticated") {
    redirect(`/pages/${session.data.user.role}/home`);
  }

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  
  const emailValue = e.currentTarget.email.value
  const passwordValue = e.currentTarget.password.value
  
  const result = await signIn("credentials", {
    email: emailValue,
    password: passwordValue,
    redirect: false
  });

  if (result?.error) {
    setErrorMessage("Credenciais inválidas. Por favor, tente novamente.");
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  }
  
  
  if(result?.ok && session.status === 'authenticated'){
    redirect(`/pages/${session.data.user.role}/home`);
  }
}

  return (
    <main className="flex justify-center items-center min-h-screen bg-slate-300 p-4">
      <div className="relative flex flex-col md:flex-row w-full max-w-4xl h-auto md:h-3/4 bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        {/* Imagem de Fundo (lado esquerdo) */}
        <div className="hidden lg:block w-1/2">
          <Image
            src="/images/register/painel.jpg"
            alt="Imagem de fundo"
            width={1000}
            height={1000}
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        {/* Seção do Formulário (lado direito) */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 bg-blue-600  flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 md:mb-6 text-white text-center">
            Bem-Vindo!
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="text-white">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setUserEmail(e.target.value)}
                required
                className="w-full p-3 mt-2 bg-blue-200 text-black rounded-md"
                placeholder="Digite seu email"
              />
            </div>

            {/* Campo Senha */}
            <div className="mb-4">
              <label htmlFor="password" className="text-white block mb-2">
                Senha
              </label>
              <div className="relative w-full">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 bg-blue-200 text-black rounded-md pr-10"
                  placeholder="Digite sua senha"
                />
                {/* Ícone para exibir ou ocultar a senha */}
                <span
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                >
                  <i
                    className={`pi ${passwordVisible ? "pi-eye-slash" : "pi-eye"}`}
                  />
                </span>
              </div>
            </div>

            <div className="text-right mt-4">
              <a
                href="http://localhost:3000/pages/forgotpassword"
                className="text-white hover:underline"
              >
                Esqueci minha senha
              </a>
            </div>

            <div className="text-center mt-8">
              <button
                type="submit"
                className="w-full p-3 rounded-md bg-gradient-to-r from-blue-300 to-blue-400 text-white font-semibold"
              >
                Entrar
              </button>
            </div>

            <div className="text-center mt-6">
              <a
                href="http://localhost:3000/pages/register"
                className="text-white hover:underline"
              >
                Ainda não tenho uma conta
              </a>
            </div>
          </form>
        </div>
      </div>
      <Dialog
        header=""
        visible={showPopup}
        style={{
          width: "25vw",
          textAlign: "center",
          position: "absolute",
          top: "2%",
          left: "89%",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(255, 99, 71, 0.8)",
          borderRadius: "8px",
        }}
        draggable={false}
        closable={false}
        onHide={() => setShowPopup(false)}
      >
        <div className="p-4 rounded-md flex items-center justify-center">
          <p className="text-sm text-white font-bold">
            E-mail ou Senha incorretos
          </p>
        </div>
      </Dialog>
    </main>
  );
}

