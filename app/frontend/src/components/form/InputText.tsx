import React from 'react';

interface InputTextProps {
    id: string;
    type?: string;
    name: string;
    value: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    placeholder?: string;
    label: string;
    disabled?: boolean;
}

const InputText: React.FC<InputTextProps> = ({
    id,
    type,
    name,
    value,
    onBlur,
    onChange,
    required = false,
    placeholder,
    label,
    disabled = false,
}) => {
    return (
        <div>
            <label htmlFor={id} className="text-white text-sm block mb-1">{label}</label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                disabled={disabled}
                className="w-full p-2 rounded bg-blue-200 text-black text-sm"
            />
        </div>
    );
};

export default InputText;