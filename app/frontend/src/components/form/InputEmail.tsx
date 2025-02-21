import React from 'react';
import InputText from './InputText';

interface InputEmailProps {
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    placeholder?: string;
    label: string;
}

const InputEmail: React.FC<InputEmailProps> = (props) => {
    return (
        <InputText
            type="email"
            {...props}
        />
    );
};

export default InputEmail;