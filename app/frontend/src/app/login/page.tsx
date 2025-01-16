'use client'
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { Dialog } from 'primereact/dialog';

export default function Profile() {
    const [email, setUserEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaVisible, setPasswordVisible] = useState(false);
    const [showPopup, setShowPopup] = useState(false); // Controla a exibição do popup
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const usuarioDto = {
            email,
            senha
        };

        try {
            const response = await axios.post('http://localhost/api/Usuario/login', usuarioDto);

            const { nomeUsuario } = response.data; // Extraindo o nome do usuário

            console.log(nomeUsuario);

            // Armazene o nome em localStorage ou em um estado global/contexto
            localStorage.setItem('nomeUsuario', nomeUsuario);


            console.log('Usuário logado:', response.data);
            router.push('http://localhost:3000/home');
        } catch (error) {
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 2000);
        }
    };

    return (
        <main className="flex justify-center items-center min-h-screen p-4">
            <div
                className="fixed inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('images/login/painel-solar.jpeg')" }}
            >
                {/* Camada de Gradiente para contraste */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                {/* Formulário Transparente */}
                <div className="relative z-10 h-screen flex items-center justify-center">
                    <div className="w-full max-w-md p-6 bg-white/50 backdrop-blur-md rounded-lg shadow-xl">
                        <h2 className="text-3xl font-bold text-center text-black mb-6">Bem-Vindo!</h2>

                        <form onSubmit={handleSubmit}>
                            {/* Campo Email */}
                            <div className="mb-4">
                                <label htmlFor="email" className="text-black block mb-2 text-sm font-medium">E-mail</label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    required
                                    className="w-full p-3 rounded-md bg-white/50 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Digite seu email"
                                />
                            </div>

                            {/* Campo Senha */}
                            <div className="mb-4">
                                <label htmlFor="password" className="text-black block mb-2 text-sm font-medium">Senha</label>
                                <div className="relative">
                                    <input
                                        type={senhaVisible ? "text" : "password"}
                                        id="password"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        className="w-full p-3 rounded-md bg-white/50 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                                        placeholder="Digite sua senha"
                                    />
                                    <span
                                        onClick={() => setPasswordVisible(!senhaVisible)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                                    >
                                        <i className={`pi ${senhaVisible ? 'pi-eye-slash' : 'pi-eye'}`} />
                                    </span>
                                </div>
                            </div>

                            {/* Links */}
                            <div className="text-right">
                                <a href="http://localhost:3000/forgotpassword" className="text-black text-sm hover:underline">Esqueci minha senha</a>
                            </div>

                            {/* Botão Entrar */}
                            <div className="text-center mt-8">
                                <button
                                    type="submit"
                                    className="w-full p-3 rounded-md bg-[#003366] text-white font-semibold">
                                    Entrar
                                </button>
                            </div>


                            {/* Link para Registro */}
                            <div className="text-center mt-4">
                                <a href="http://localhost:3000/register" className="text-black text-sm hover:underline">Ainda não tenho uma conta</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Dialog
                header=""
                visible={showPopup}
                style={{
                    width: '25vw',
                    textAlign: 'center',
                    position: 'absolute',
                    top: '2%',
                    left: '89%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(255, 99, 71, 0.8)',
                    borderRadius: '8px',
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
