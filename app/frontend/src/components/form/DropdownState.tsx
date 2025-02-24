// components/DropdownState.tsx
import React from 'react';
import { Dropdown } from 'primereact/dropdown';

interface DropdownStateProps {
    id: string;
    value: string;
    onChange: (e: { value: string }) => void;
    placeholder?: string;
}

const brazilStatesOptions = [
    { label: "Acre", value: "AC" },
    { label: "Alagoas", value: "AL" },
    { label: "Amapá", value: "AP" },
    { label: "Amazonas", value: "AM" },
    { label: "Bahia", value: "BA" },
    { label: "Ceará", value: "CE" },
    { label: "Distrito Federal", value: "DF" },
    { label: "Espírito Santo", value: "ES" },
    { label: "Goiás", value: "GO" },
    { label: "Maranhão", value: "MA" },
    { label: "Mato Grosso", value: "MT" },
    { label: "Mato Grosso do Sul", value: "MS" },
    { label: "Minas Gerais", value: "MG" },
    { label: "Pará", value: "PA" },
    { label: "Paraíba", value: "PB" },
    { label: "Paraná", value: "PR" },
    { label: "Pernambuco", value: "PE" },
    { label: "Piauí", value: "PI" },
    { label: "Rio de Janeiro", value: "RJ" },
    { label: "Rio Grande do Norte", value: "RN" },
    { label: "Rio Grande do Sul", value: "RS" },
    { label: "Rondônia", value: "RO" },
    { label: "Roraima", value: "RR" },
    { label: "Santa Catarina", value: "SC" },
    { label: "São Paulo", value: "SP" },
    { label: "Sergipe", value: "SE" },
    { label: "Tocantins", value: "TO" },
];


const DropdownState: React.FC<DropdownStateProps> = ({ 
    id,
    value,
    onChange,
    placeholder = "Selecionar Estado"
}) => {
    return (
        <div>
            <label htmlFor={id} className="text-white text-sm block mb-1">
                Estados
            </label>
            <Dropdown
                id={id}
                value={value}
                onChange={(e) => onChange({value: e.value})}
                options={brazilStatesOptions}
                placeholder={placeholder}
                className="w-full rounded bg-blue-200 text-black text-sm h-10"
                panelClassName="custom-dropdown-panel"
            />
        </div>
    );
};

export default DropdownState;