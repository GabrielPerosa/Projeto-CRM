import React from "react";
import { Checkbox } from "primereact/checkbox";

interface CheckboxUserProps {
  isClient: boolean;
  setIsClient: (value: boolean) => void;
  isProvider: boolean;
  setIsProvider: (value: boolean) => void;
}

const CheckboxUser: React.FC<CheckboxUserProps> = ({
  isClient,
  setIsClient,
  isProvider,
  setIsProvider,
}) => {
  return (
    <div className="flex gap-6 items-center">
      <div className="flex items-center gap-2">
        <Checkbox
          inputId="cliente"
          checked={isClient}
          onChange={(e) => {
            setIsClient(e.checked as boolean);
            setIsProvider(false);
          }}
        />
        <label htmlFor="cliente" className="text-white text-sm">
          Cliente
        </label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          inputId="prestador"
          checked={isProvider}
          onChange={(e) => {
            setIsProvider(e.checked as boolean);
            setIsClient(false);
          }}
        />
        <label htmlFor="prestador" className="text-white text-sm">
          Prestador
        </label>
      </div>
    </div>
  );
};

export default CheckboxUser;
