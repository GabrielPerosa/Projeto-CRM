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
    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        // Remove qualquer caractere não numérico usando regex
        const numericValue = inputValue.replace(/[^0-9]/g, '');
        setValue(numericValue); // Atualiza o estado com o valor numérico
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
                    label="Valor"   
                    id="valor-estado"
                    name="valor-estado"
                    value={value}
                    onChange={handleValueChange}
                    placeholder="Digite o valor"/>
            </div>

            <button
                type="button"
                onClick={addState} 
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
                                {item.state} - R$ {item.value}
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