'use client';
import { useState } from "react";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";

type Client = {
  id: number;
  name: string;
  cityState: string;
  quantity: number;
  startDate: string;
  value: number | null;
  status: "Pendente" | "Enviado";
};

const initialData: Client[] = [
  { id: 1, name: "João Silva", cityState: "São Paulo-SP", quantity: 10, startDate: "", value: null, status: "Pendente" },
  { id: 2, name: "Maria Oliveira", cityState: "Rio de Janeiro-RJ", quantity: 20, startDate: "", value: null, status: "Pendente" },
  { id: 3, name: "Carlos Souza", cityState: "Belo Horizonte-MG", quantity: 15, startDate: "", value: null, status: "Pendente" },
];

export default function ClientTable() {
  const [clients, setClients] = useState<Client[]>(initialData);
  const [search, setSearch] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleUpdate = (id: number, key: keyof Client, value: string | number | null) => {
    setClients((prev) =>
      prev.map((client) => {
        if (client.id === id) {
          return { ...client, [key]: value };
        }
        return client;
      })
    );
  };

  const handleSendProposal = (id: number) => {
    setClients((prev) =>
      prev.map((client) => {
        if (client.id === id) {
          return { ...client, status: "Enviado" };
        }
        return client;
      })
    );

    // Exibir pop-up
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // Ocultar após 3 segundos
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.cityState.toLowerCase().includes(search.toLowerCase()) ||
      client.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Propostas</h1>
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
            <th className="p-3 text-left">Valor (R$)</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
            <tr key={client.id} className="border-b">
              <td className="p-3">{client.name}</td>
              <td className="p-3">{client.cityState}</td>
              <td className="p-3">{client.quantity}</td>
              <td className="p-3">
                <input
                  type="date"
                  className="border border-gray-300 rounded p-1 w-full"
                  value={client.startDate}
                  onChange={(e) =>
                    handleUpdate(client.id, "startDate", e.target.value)
                  }
                />
              </td>
              <td className="p-3">
                <input
                  type="number"
                  className="border border-gray-300 rounded p-1 w-full"
                  value={client.value || ""}
                  onChange={(e) =>
                    handleUpdate(client.id, "value", parseFloat(e.target.value) || null)
                  }
                />
              </td>
              <td className="p-3 flex items-center space-x-2">
                {client.status === "Enviado" ? (
                  <>
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    <span className="text-green-500 font-medium">Enviado</span>
                  </>
                ) : (
                  <>
                    <ExclamationCircleIcon className="h-5 w-5 text-orange-500" />
                    <span className="text-orange-500 font-medium">Pendente</span>
                  </>
                )}
              </td>
              <td className="p-3">
                <button
                  className={`px-4 py-2 rounded text-white ${
                    client.startDate && client.value !== null
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  onClick={() => handleSendProposal(client.id)}
                  disabled={!client.startDate || client.value === null}
                >
                  Enviar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
