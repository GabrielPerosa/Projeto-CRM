'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "primereact/dialog";
import "primeicons/primeicons.css";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

function convertRoleToRoute (role: string) {
  switch (role) {
    case 'admin':
      return 'admin';
    case 'cliente':
      return 'client';
    case 'prestador':
      return 'supplier';
    default:
      return '';
  }
}

export default function Profile() {
  const [email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role) {
      const route = convertRoleToRoute(session.user.role);
      router.push(`/pages/${route}/home`);
    }
  }, [status, session, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    console.log("SignIn Result:", result); // Log the result for debugging

    if (result?.error) {
      console.error("Erro de autenticação:", result.error);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-slate-300 p-4">
      <div className="relative flex flex-col md:flex-row w-full max-w-4xl h-auto md:h-3/4 bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        <div className="hidden lg:block w-1/2">
          <Image
            src="/images/register/painel.jpg"
            alt="Imagem de fundo"
            width={1000}
            height={1000}
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 sm:p-8 bg-blue-600 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 md:mb-6 text-white text-center">
            Bem-Vindo!
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="text-white">Email</label>
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

            <div className="mb-4">
              <label htmlFor="password" className="text-white block mb-2">Senha</label>
              <div className="relative w-full">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 bg-blue-200 text-black rounded-md pr-10"
                  placeholder="Digite sua senha"
                />
                <span
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                >
                  <i className={`pi ${passwordVisible ? "pi-eye-slash" : "pi-eye"}`} />
                </span>
              </div>
            </div>

            <div className="text-right mt-4">
              <a href="http://localhost:3000/pages/forgotpassword" className="text-white hover:underline">Esqueci minha senha</a>
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
              <a href="http://localhost:3000/pages/register" className="text-white hover:underline">Ainda não tenho uma conta</a>
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
          <p className="text-sm text-white font-bold">E-mail ou Senha incorretos</p>
        </div>
      </Dialog>
    </main>
  );
}
