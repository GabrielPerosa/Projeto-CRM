import React from 'react';
import DropdownState from './DropdownState';
import InputText from './InputText';
import { FaTimes } from 'react-icons/fa';

interface ProviderStateProps {
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    statesAdded: any[]; 
    setStatesAdded: (value: any[]) => void;
    warningMessage: string | null;
    setWarningMessage: (value: string | null) => void;
    addState: () => void;
    removeState: (stateToRemove: string) => void;
}

const ProviderState: React.FC<ProviderStateProps> = ({
    state,
    setState,
    value,
    setValue,
    statesAdded,
    setStatesAdded,
    warningMessage,
    setWarningMessage,
    addState,
    removeState,
}) => {
    const MAX_VALUE = 10000000; // 100.000,00 em centavos (10000000 centavos = R$ 100.000,00)

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // Remove todos os caracteres não numéricos
        const numericValue = inputValue.replace(/[^0-9]/g, '');

        // Limita o valor máximo
        const limitedValue = Math.min(parseFloat(numericValue), MAX_VALUE);

        // Atualiza o estado com o valor numérico (em centavos)
        setValue(limitedValue.toString());
    };

    const formatCurrency = (value: string) => {
        const numberValue = parseFloat(value) / 100; // Converte para reais
        if (isNaN(numberValue)) {
            return ''; // Retorna uma string vazia se o valor for inválido
        }
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(numberValue);
    };

    const validateAndAddState = () => {
        if (!state || !value) {
            setWarningMessage('Por favor, selecione um estado e insira um valor.');
            return;
        }

        if (statesAdded.some(item => item.state === state)) {
            setWarningMessage('Este estado já foi adicionado.');
            return;
        }

        const numericValue = parseFloat(value); // Converte para centavos
        if (numericValue <= 0) {
            setWarningMessage('O valor deve ser maior que zero.');
            return;
        }

        if (numericValue > MAX_VALUE) {
            setWarningMessage(`O valor não pode ser maior que ${formatCurrency(MAX_VALUE.toString())}.`);
            return;
        }

        setWarningMessage(null);
        addState();
    };

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <DropdownState 
                    id="estado-dropdown"
                    value={state} 
                    onChange={(e) => setState(e.value)} 
                />
                <InputText
                    type='text'   
                    label="Valor (valor em média cobrado)"   
                    id="valor-estado"
                    name="valor-estado"
                    value={formatCurrency(value)} // Exibe o valor formatado
                    onChange={handleValueChange}
                    placeholder="Digite o valor"/>
            </div>

            <button
                type="button"
                onClick={validateAndAddState} 
                className="w-full p-2 rounded bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold mt-2"
            >
                Adicionar Estado
            </button>

            {warningMessage && ( 
                <p className="text-white text-sm text-center my-2 font-bold">
                    {warningMessage} 
                </p>
            )}

            {statesAdded.length > 0 && ( 
                <div className="mt-2 bg-white rounded-lg p-2 shadow max-h-20 overflow-y-auto border border-gray-300">
                    <ul className="divide-y divide-gray-300">
                        {statesAdded.map((item, index) => ( 
                            <li
                                key={index}
                                className="text-gray-700 text-sm flex items-center justify-between p-2"
                            >
                                {item.state} - {formatCurrency(item.value)}
                                <button
                                    type="button"
                                    onClick={() => removeState(item.state)} 
                                    className="text-black p-1"
                                >
                                    <FaTimes />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProviderState;