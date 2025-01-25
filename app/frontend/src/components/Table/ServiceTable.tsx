'use client';
import { useState } from "react";
import { ArrowPathIcon, CheckCircleIcon, ClockIcon, DocumentCheckIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import  { NumericFormat }  from 'react-number-format';

type ServiceSupplier = {
  id: number;
  name: string;
  cityState: string;
  quantity: number;
  startDate: string;
  deadline: string;
  cost: number;
  status: "Em andamento" | "Finalizado";
};

type ServiceClient = {
  id: number;
  supplier: string;
  cityState: string;
  quantity: number;
  startDate: string;
  deadline: string;
  budget: number;
  status: "Aguardando prestador" | "Em aprovação" | "Em andamento" | "Finalizado";
}

// Dados Mocados apenas para exemplo
const initialDataSupplier: ServiceSupplier[] = [
  { id: 1, name: "João Silva", cityState: "São Paulo-SP", quantity: 10, startDate: "10/11/2020", deadline: "11/12/2020", cost: 1000, status: "Finalizado" },
  { id: 2, name: "Maria Oliveira", cityState: "Rio de Janeiro-RJ", quantity: 20, startDate: "10/11/2020", deadline: "11/12/2020", cost: 1000, status: "Em andamento" },
  { id: 3, name: "Carlos Souza", cityState: "Belo Horizonte-MG", quantity: 15, startDate: "10/11/2024", deadline: "11/12/2024", cost: 2500, status: "Finalizado" },
];

const initialDataClient: ServiceClient[] = [
  { id: 1, supplier: "Josmar", cityState: "São Paulo-SP", quantity: 10, startDate: "10/11/2020", deadline: "11/12/2020", budget: 1000, status: "Aguardando prestador"},
  { id: 2, supplier: "Perosa", cityState: "São Paulo-SP", quantity: 10, startDate: "10/11/2020", deadline: "11/12/2020", budget: 5000, status: "Em aprovação"}
];

export default function ServiceTable() {
  const hasKeyWord = (keyWord: string) => {
    if (typeof window === "undefined") return false; // Evita o erro no ambiente de servidor
    return window.location.pathname.includes(keyWord);
  };

const isSupplier = hasKeyWord("supplier"); // Retorna true se "supplier" estiver na URL

  // Inicializa o estado de forma condicional
  const [services, setServices] = useState(
    isSupplier ? initialDataSupplier : initialDataClient
  );
  const [search, setSearch] = useState("");

  // Filtragem dinâmica com base no tipo de usuário
  const filteredServices = services.filter((service) =>
    isSupplier
      ? // Filtragem para fornecedores
        (service as ServiceSupplier).name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (service as ServiceSupplier).cityState
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (service as ServiceSupplier).status
          .toLowerCase()
          .includes(search.toLowerCase())
      : // Filtragem para clientes
        (service as ServiceClient).supplier
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (service as ServiceClient).cityState
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (service as ServiceClient).status
          .toLowerCase()
          .includes(search.toLowerCase())
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
            {isSupplier ? (
              <>
                <th className="p-3 text-left">Nome</th>
                <th className="p-3 text-left">Cidade-Estado</th>
                <th className="p-3 text-left">Quantidade</th>
                <th className="p-3 text-left">Data de Início</th>
                <th className="p-3 text-left">Previsão de Entrega</th>
                <th className="p-3 text-left">Recebível (R$)</th>
                <th className="p-3 text-left">Status</th>
              </>
            ) : (
              <>
                <th className="p-3 text-left">Fornecedor</th>
                <th className="p-3 text-left">Cidade-Estado</th>
                <th className="p-3 text-left">Quantidade</th>
                <th className="p-3 text-left">Data de Início</th>
                <th className="p-3 text-left">Previsão de Entrega</th>
                <th className="p-3 text-left">Orçamento (R$)</th>
                <th className="p-3 text-left">Status</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredServices.map((service) => (
            <tr key={service.id} className="border-b">
              {isSupplier ? (
                <>
                  <td className="p-3">{(service as ServiceSupplier).name}</td>
                  <td className="p-3">{service.cityState}</td>
                  <td className="p-3">{service.quantity}</td>
                  <td className="p-3">{service.startDate}</td>
                  <td className="p-3">{service.deadline}</td>
                  <td className="p-3">
                    <NumericFormat
                      value={(service as ServiceSupplier).cost}
                      displayType="text"
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$ "
                    />
                  </td>
                  <td className="p-3">
                    {service.status === "Finalizado" ? (
                    <div className="flex">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-1" />
                      <span className="text-green-500 font-medium">{service.status}</span>
                    </div>
                    ) : (
                      <div className="flex">
                        <ArrowPathIcon className="h-5 w-5 text-blue-400 mr-1" />
                        <span className="text-blue-400 font-medium">{service.status}</span>

                      </div>
                    )}
                  </td>
                </>
              ) : (
                <>
                  <td className="p-3">{(service as ServiceClient).supplier}</td>
                  <td className="p-3">{service.cityState}</td>
                  <td className="p-3">{service.quantity}</td>
                  <td className="p-3">{service.startDate}</td>
                  <td className="p-3">{service.deadline}</td>
                  <td className="p-3">
                    <NumericFormat
                      value={(service as ServiceClient).budget}
                      displayType="text"
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$ "
                    />
                  </td>
                  <td className="p-3">
                  <>
                    {(() => {
                      switch (service.status) {
                        case "Finalizado":
                          return (
                            <div className="flex">
                              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-1" />
                              <span className="text-green-500 font-medium">{service.status}</span>
                            </div>
                          );
                        case "Em andamento":
                          return (
                            <div className="flex">
                              <ArrowPathIcon className="h-5 w-5 text-blue-400 mr-1" />
                              <span className="text-blue-400 font-medium">{service.status}</span>
                            </div>
                          );
                        case "Aguardando prestador":
                          return (
                            <div className="flex">
                              <ClockIcon className="h-5 w-5 text-yellow-500 mr-1" />
                              <span className="text-yellow-500 font-medium">{service.status}</span>
                            </div>
                          );
                        case "Em aprovação":
                          return (
                            <div className="flex">
                              <DocumentCheckIcon className="h-5 w-5 text-purple-500 mr-1" />
                              <span className="text-purple-500 font-medium">{service.status}</span>
                            </div>
                          );
                        default:
                          return (
                            <div>
                              <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400" />
                              <span className="text-gray-400 font-medium">Desconhecido</span>
                            </div>
                          );
                      }
                    })()}
                  </>

                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}