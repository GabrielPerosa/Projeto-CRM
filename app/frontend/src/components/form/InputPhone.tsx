import React from 'react';
import InputText from './InputText';

interface InputPhoneProps {
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    placeholder?: string;
    label: string;
}

const InputPhone: React.FC<InputPhoneProps> = (props) => {
    return (
        <InputText
            type="tel"
            {...props}
        />
    );
};

export default InputPhone;