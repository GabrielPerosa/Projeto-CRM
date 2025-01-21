'use client';
import { useState } from "react";
import { ArrowPathIcon, CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { NumericFormat } from 'react-number-format';

type Service = {
  id: number;
  name: string;
  cityState: string;
  quantity: number;
  startDate: string;
  cost: number | null;
  status: "Em andamento" | "Finalizado";
};

const initialData: Service[] = [
  { id: 1, name: "João Silva", cityState: "São Paulo-SP", quantity: 10, startDate: "10/10/2021", cost: 1000.54, status: "Em andamento" },
  { id: 2, name: "Maria Oliveira", cityState: "Rio de Janeiro-RJ", quantity: 20, startDate: "01/12/2025", cost: 1055.00, status: "Finalizado" },
  { id: 3, name: "Carlos Souza", cityState: "Belo Horizonte-MG", quantity: 15, startDate: "19/11/2020", cost: 12000.00, status: "Em andamento" },
];

export default function ServiceTable() {
  const [Services, setServices] = useState<Service[]>(initialData);
  const [search, setSearch] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleUpdate = (id: number, key: keyof Service, cost: string | number | null) => {
    setServices((prev) =>
      prev.map((service) => {
        if (service.id === id) {
          return { ...service, [key]: cost };
        }
        return service;
      })
    );
  };

  const filteredServices = Services.filter(
    (service) =>
      service.name.toLowerCase().includes(search.toLowerCase()) ||
      service.cityState.toLowerCase().includes(search.toLowerCase()) ||
      service.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Buscar</h1>
      <input
        type="text"
        placeholder="Pesquisar..."
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {showPopup && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-md">
          Proposta enviada com sucesso!
        </div>
      )}
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Nome</th>
            <th className="p-3 text-left">Cidade-Estado</th>
            <th className="p-3 text-left">Quantidade de Placas</th>
            <th className="p-3 text-left">Data de Início</th>
            <th className="p-3 text-left">Recebível (R$)</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map((service) => (
            <tr key={service.id} className="border-b">
              <td className="p-3">{service.name}</td>
              <td className="p-3">{service.cityState}</td>
              <td className="p-3">{service.quantity}</td>
              <td className="p-3">
                {service.startDate}
              </td>
              <td className="p-3">
              <NumericFormat
                 value={service.cost}
                 displayType={'text'}
                 thousandSeparator="."
                 decimalSeparator=","
                 prefix={'R$ '}
                 decimalScale={2}
                 fixedDecimalScale={true}
              />
              </td>
              <td className="p-3 flex items-center space-x-2">
                {service.status === "Finalizado" ? (
                  <>
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    <span className="text-green-500 font-medium">Finalizado</span>
                  </>
                ) : (
                  <>
                    <ArrowPathIcon className="h-5 w-6 text-blue-400" />
                    <span className="text-blue-500 font-medium">Em andamento</span>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 
