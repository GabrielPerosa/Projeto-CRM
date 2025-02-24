"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Importando os componentes
import InputText from "@/components/form/InputText";
import InputPhone from "@/components/form/InputPhone";
import InputPassword from "@/components/form/InputPassword";
import CheckboxUser from "@/components/form/CheckboxUser";
import PopupDialog from "@/components/form/PopupDialog";
import ProviderState from "@/components/form/ProviderState";
import AddressForm from "@/components/form/AddressForm";
import InputEmail from "@/components/form/InputEmail";

export default function Register() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [, setApiResponseData] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [selectedState, setSelectedState] = useState("");
    const [addedStates, setAddedStates] = useState<AddedState[]>([]);
    const [stateValue, setStateValue] = useState("");
    const [warningMessage, setWarningMessage] = useState<string | null>(null);
    const router = useRouter();
    const formattedPhone = phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");

    const [isClient, setIsClient] = useState(false);
    const [isProvider, setIsProvider] = useState(false);

    const [address, setAddress] = useState({
        rua: "",
        numero: "",
        complemento: "",
        cidade: "",
        estado: "",
        cep: "",
    });

    interface AddedState {
        state: string;
        value: string;
    }

    // Validação do nome (somente letras e espaços)
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^[A-Za-z\s]+$/.test(value) || value === "") {
            setName(value);
        }
    };

    // Validação do sobrenome (somente letras e espaços)
    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^[A-Za-z\s]+$/.test(value) || value === "") {
            setLastName(value);
        }
    };

    // Validação do telefone (somente números, máximo de 11 dígitos)
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 11) {
            setPhone(value);
        }
    };

    // Validação do e-mail (formato válido)
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
    };

    // Validação da senha (pelo menos uma letra e um número)
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
    };

    // Validação do CEP (somente números, exatamente 8 dígitos)
    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 8) {
            setAddress((prev) => ({
                ...prev,
                cep: value,
            }));

            // Busca automática do endereço ao completar 8 dígitos
            if (value.length === 8) {
                fetchAddressByZip(value);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validações antes de enviar o formulário
        if (!/^[A-Za-z\s]+$/.test(name)) {
            alert("Por favor, insira um nome válido (somente letras).");
            return;
        }

        if (!/^[A-Za-z\s]+$/.test(lastName)) {
            alert("Por favor, insira um sobrenome válido (somente letras).");
            return;
        }

        if (!/^\d{11}$/.test(formattedPhone)) {
            alert("Por favor, insira um telefone válido (11 dígitos, com DDD).");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }

        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
            alert("A senha deve conter pelo menos uma letra e um número, com no mínimo 8 caracteres.");
            return;
        }

        if (!/^\d{8}$/.test(address.cep)) {
            alert("Por favor, insira um CEP válido (8 dígitos).");
            return;
        }

        const userDto = {
            name,
            lastName,
            email,
            phone: formattedPhone,
            password,
            addedStates,
            type: isClient ? "Cliente" : isProvider ? "Fornecedor" : null,
        };

        try {
            const response = await axios.post(
                "http://localhost/api/usuario",
                userDto
            );
            setShowSuccessPopup(true);

            await new Promise((resolve) => setTimeout(resolve, 2000));

            setShowSuccessPopup(false);
            setApiResponseData(response.data);
            router.push("http://localhost:3000/pages/login");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const addState = () => {
        if (!selectedState || !stateValue.trim()) {
            setWarningMessage("Por favor, selecione um estado e informe um valor válido.");
            return;
        }

        // Verifica se o estado já foi adicionado
        if (addedStates.some((item) => item.state === selectedState)) {
            setWarningMessage("Este estado já foi adicionado!");
            return;
        }

        const newState = { state: selectedState, value: stateValue };
        setAddedStates([...addedStates, newState]);
        setSelectedState("");
        setStateValue("");
    };

    useEffect(() => {
        if (warningMessage) {
            const timer = setTimeout(() => setWarningMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [warningMessage]);

    const removeState = (stateToRemove: string) => {
        setAddedStates(
            addedStates.filter((item) => item.state !== stateToRemove)
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
                const apiResponse = await fetch(`https://viacep.com.br/ws/${zip}/json/`);
                const data = await apiResponse.json();
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
            } catch {
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
                    <CheckboxUser
                        isClient={isClient}
                        setIsClient={setIsClient}
                        isProvider={isProvider}
                        setIsProvider={setIsProvider}
                    />

                    {/* Campos comuns a todos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputText
                            label="Nome"
                            id="nome"
                            name="nome"
                            value={name}
                            onChange={handleNameChange}
                            required
                            placeholder="Digite seu nome"
                        />
                        <InputText
                            label="Sobrenome"
                            id="sobrenome"
                            name="sobrenome"
                            value={lastName}
                            onChange={handleLastNameChange}
                            required
                            placeholder="Digite seu sobrenome"
                        />
                    </div>

                    {/* Endereço */}
                    <AddressForm
                        address={address}
                        handleAddressChange={handleAddressChange}
                        fetchAddressByZip={fetchAddressByZip}
                        handleCepChange={handleCepChange}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* E-mail */}
                        <InputEmail
                            label="E-mail"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            placeholder="Digite seu email"
                        />

                        {/* Telefone */}
                        <InputPhone
                            label="Telefone"
                            id="telefone"
                            name="telefone"
                            value={formattedPhone} // 
                            onChange={handlePhoneChange}
                            required
                            placeholder="(99) 99999-9999"
                        />
                    </div>

                    {/* Seção: Senha */}
                    <InputPassword
                        label="Senha"
                        id="senha"
                        value={password}
                        onChange={handlePasswordChange}
                    />

                    {/* Campos específicos para Fornecedor */}
                    {isProvider && (
                        <ProviderState
                            state={selectedState}
                            setState={setSelectedState}
                            value={stateValue}
                            setValue={setStateValue}
                            statesAdded={addedStates}
                            setStatesAdded={setAddedStates}
                            warningMessage={warningMessage}
                            setWarningMessage={setWarningMessage}
                            addState={addState}
                            removeState={removeState}
                        />
                    )}

                    <button
                        type="submit"
                        className="w-full p-2 rounded bg-blue-700 text-white text-sm font-semibold mt-4"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>

            <PopupDialog
                visible={showSuccessPopup}
                onHide={() => setShowSuccessPopup(false)}
                message="Usuário cadastrado com sucesso!"
            />
        </main>
    );
}