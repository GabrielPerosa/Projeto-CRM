'use client';
import { useState } from "react";
import { ArrowPathIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import  { NumericFormat }  from 'react-number-format';

type Service = {
  id: number;
  name: string;
  cityState: string;
  quantity: number;
  startDate: string;
  deadline: string;
  cost: number;
  status: "Em andamento" | "Finalizado";
};

const initialData: Service[] = [
  { id: 1, name: "João Silva", cityState: "São Paulo-SP", quantity: 10, startDate: "10/11/2020", deadline: "11/12/2020", cost: 1000, status: "Finalizado" },
  { id: 2, name: "Maria Oliveira", cityState: "Rio de Janeiro-RJ", quantity: 20, startDate: "10/11/2020", deadline: "11/12/2020", cost: 1000, status: "Em andamento" },
  { id: 3, name: "Carlos Souza", cityState: "Belo Horizonte-MG", quantity: 15, startDate: "10/11/2024", deadline: "11/12/2024", cost: 2500, status: "Finalizado" },
];

export default function ServiceTable() {
  const [services, setServices] = useState<Service[]>(initialData);
  const [search, setSearch] = useState("");

  const filteredServices = services.filter(
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
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Nome</th>
            <th className="p-3 text-left">Cidade-Estado</th>
            <th className="p-3 text-left">Quantidade de Placas</th>
            <th className="p-3 text-left">Data de Início</th>
            <th className="p-3 text-left">Previsão de Entrega</th>
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
              <td className="p-3">{service.startDate}</td>
              <td className="p-3">{service.deadline}</td>
              <td className="p-3">
                <NumericFormat 
                    value={service.cost} 
                    displayType="text" 
                    thousandSeparator ="."
                    decimalSeparator="," 
                    prefix="R$ "
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
                    <ArrowPathIcon className="h-5 w-5 text-blue-400" />
                    <span className="text-blue-400 font-medium">Em andamento</span>
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
