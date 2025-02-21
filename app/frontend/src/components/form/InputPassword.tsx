import React, { useState } from 'react';

interface InputPasswordProps {
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
}

const InputPassword: React.FC<InputPasswordProps> = ({ id, value, onChange, label }) => {
    const [senhaVisible, setSenhaVisible] = useState(false);

    return (
        <div>
            <label htmlFor={id} className="text-white text-sm block mb-1">{label}</label>
            <div className="relative">
                <input
                    type={senhaVisible ? "text" : "password"}
                    id={id}
                    value={value}
                    onChange={onChange}
                    className="w-full p-2 rounded bg-blue-200 text-black text-sm"
                    placeholder="Digite sua senha"
                />
                <span
                    onClick={() => setSenhaVisible(!senhaVisible)}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white cursor-pointer"
                >
                    <i className={`pi ${senhaVisible ? "pi-eye-slash" : "pi-eye"}`} />
                </span>
            </div>
        </div>
    );
};

export default InputPassword;