import React from "react";
import InputText from "./InputText";

interface AddressFormProps {
  address: {
    rua: string;
    numero: string;
    complemento: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fetchAddressByZip: (zip: string) => Promise<void>;
  handleCepChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  address,
  handleAddressChange,
  handleCepChange,
}) => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputText
          label="CEP"
          id="cep"
          name="cep"
          value={address.cep}
          onChange={handleCepChange}
          required
          placeholder="Digite seu CEP"
        />
        <InputText
          label="Rua"
          id="rua"
          name="rua"
          value={address.rua}
          placeholder="Rua"
          disabled
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputText
          label="Número"
          id="numero"
          name="numero"
          value={address.numero}
          onChange={handleAddressChange}
          placeholder="Número"
        />
        <InputText
          label="Cidade"
          id="cidade"
          name="cidade"
          value={address.cidade}
          disabled
        />
        <InputText
          label="Estado"
          id="estado"
          name="estado"
          value={address.estado}
          disabled
        />
      </div>
    </div>
  );
};

export default AddressForm;
