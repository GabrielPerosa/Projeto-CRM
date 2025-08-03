"use client";
import { useState, useEffect } from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import { Calendar } from "primereact/calendar";
import { NumericFormat } from "react-number-format";

type Client = {
  id: number;
  name: string;
  cityState: string;
  quantity: number;
  startDate: Date | null;
  deliveryDate: Date | null;
  value: number | null;
  status: "Pendente" | "Enviado";
};

type StoredClient = Omit<Client, "startDate" | "deliveryDate"> & {
  startDate: string | null;
  deliveryDate: string | null;
};

const initialData: Client[] = [
  // ... (seus dados iniciais aqui) ...
];

export default function ClientTable() {
  const [search, setSearch] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [clients, setClients] = useState<Client[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("proposta_prestador");
      if (stored) {
        const parsed = (JSON.parse(stored) as StoredClient[]).map((c) => ({
          ...c,
          startDate: c.startDate ? new Date(c.startDate) : null,
          deliveryDate: c.deliveryDate ? new Date(c.deliveryDate) : null,
        }));
        return parsed;
      }
    }
    return initialData;
  });

  useEffect(() => {
    localStorage.setItem("proposta_prestador", JSON.stringify(clients));
  }, [clients]);

  const handleUpdate = (
    id: number,
    key: keyof Client,
    value: Client[keyof Client]
  ) => {
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
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.cityState.toLowerCase().includes(search.toLowerCase()) ||
      client.status.toLowerCase().includes(search.toLowerCase())
  );

  const isButtonDisabled = (client: Client) => {
    return (
      client.status === "Enviado" ||
      !client.startDate ||
      !client.deliveryDate ||
      client.value === null
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 mt-5">Propostas</h1>

      <input
        type="text"
        placeholder="Pesquisar..."
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {showPopup && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          Proposta enviada com sucesso!
        </div>
      )}

      {/* Tabela para DESKTOP (md e acima) */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded hidden md:table">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Cliente</th>
              <th className="p-3 text-left">Cidade-Estado</th>
              <th className="p-3 text-left">Placas</th>
              <th className="p-3 text-left">Data de Início</th>
              <th className="p-3 text-left">Data de Entrega</th>
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
                  <Calendar
                    value={client.startDate}
                    onChange={(e) => handleUpdate(client.id, "startDate", e.value ?? null)}
                    dateFormat="dd/mm/yy"
                    placeholder="Selecionar"
                    className="border border-gray-300 rounded p-1 w-full"
                  />
                </td>
                <td className="p-3">
                  <Calendar
                    value={client.deliveryDate}
                    onChange={(e) => handleUpdate(client.id, "deliveryDate", e.value ?? null)}
                    dateFormat="dd/mm/yy"
                    placeholder="Selecionar"
                    className="border border-gray-300 rounded p-1 w-full"
                  />
                </td>
                <td className="p-3">
                  <NumericFormat
                    value={client.value ?? ""}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="R$ "
                    decimalScale={2}
                    fixedDecimalScale
                    className="border border-gray-300 rounded p-2 w-full"
                    onValueChange={(values) => handleUpdate(client.id, "value", values.floatValue ?? null)}
                  />
                </td>
                <td className="p-3">
                  {client.status === "Enviado" ? (
                    <div className="flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-1" />
                      <span className="text-green-500 font-medium">Enviado</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <ExclamationCircleIcon className="h-5 w-5 text-orange-500 mr-1" />
                      <span className="text-orange-500 font-medium">Pendente</span>
                    </div>
                  )}
                </td>
                <td className="p-3">
                  <button
                    type="button"
                    className={`px-4 py-2 rounded text-white font-semibold transition-colors ${
                      isButtonDisabled(client)
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    onClick={() => handleSendProposal(client.id)}
                    disabled={isButtonDisabled(client)}
                  >
                    Enviar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Layout de Cards para MOBILE (abaixo de md) */}
      <div className="md:hidden space-y-4">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 space-y-4">
            {/* Informações do Cliente */}
            <div>
              <h3 className="font-bold text-lg">{client.name}</h3>
              <p className="text-sm text-gray-600">{client.cityState}</p>
              <p className="text-sm text-gray-600">Placas: {client.quantity}</p>
            </div>

            {/* Campos de Formulário */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
                <Calendar
                  value={client.startDate}
                  onChange={(e) => handleUpdate(client.id, "startDate", e.value ?? null)}
                  dateFormat="dd/mm/yy"
                  placeholder="Selecionar data"
                  className="w-full"
                  inputClassName="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Entrega</label>
                <Calendar
                  value={client.deliveryDate}
                  onChange={(e) => handleUpdate(client.id, "deliveryDate", e.value ?? null)}
                  dateFormat="dd/mm/yy"
                  placeholder="Selecionar data"
                  className="w-full"
                  inputClassName="border border-gray-300 rounded p-2 w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
              <NumericFormat
                value={client.value ?? ""}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                fixedDecimalScale
                className="border border-gray-300 rounded p-2 w-full"
                onValueChange={(values) => handleUpdate(client.id, "value", values.floatValue ?? null)}
              />
            </div>
            
            {/* Status e Ação */}
            <div className="pt-2 border-t flex items-center justify-between">
              {client.status === "Enviado" ? (
                <div className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">Enviado</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <ExclamationCircleIcon className="h-5 w-5 text-orange-500 mr-1" />
                  <span className="text-orange-500 font-medium">Pendente</span>
                </div>
              )}

              <button
                type="button"
                className={`px-4 py-2 rounded text-white font-semibold transition-colors ${
                  isButtonDisabled(client)
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                onClick={() => handleSendProposal(client.id)}
                disabled={isButtonDisabled(client)}
              >
                Enviar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}