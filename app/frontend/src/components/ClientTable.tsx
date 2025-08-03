"use client";
import { useState, useEffect } from "react";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
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
  {
    id: 1,
    name: "João Silva",
    cityState: "São Paulo-SP",
    quantity: 10,
    startDate: null,
    deliveryDate: null,
    value: null,
    status: "Pendente",
  },
  {
    id: 2,
    name: "Maria Oliveira",
    cityState: "Rio de Janeiro-RJ",
    quantity: 20,
    startDate: null,
    deliveryDate: null,
    value: null,
    status: "Pendente",
  },
  {
    id: 3,
    name: "Carlos Souza",
    cityState: "Belo Horizonte-MG",
    quantity: 15,
    startDate: null,
    deliveryDate: null,
    value: null,
    status: "Pendente",
  },
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
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-md">
          Proposta enviada com sucesso!
        </div>
      )}

      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded ">
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

              {/*  data de início */}
              <td className="p-3">
                <Calendar
                  value={client.startDate}
                  onChange={(e) =>
                    handleUpdate(client.id, "startDate", e.value ?? null)
                  }
                  dateFormat="dd/mm/yy"
                  placeholder="Selecionar data"
                  className="border border-gray-300 rounded p-1 w-full"
                />
              </td>

              {/* data de entrega */}
              <td className="p-3">
                <Calendar
                  value={client.deliveryDate}
                  onChange={(e) =>
                    handleUpdate(client.id, "deliveryDate", e.value ?? null)
                  }
                  dateFormat="dd/mm/yy"
                  placeholder="Selecionar data"
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
                  allowNegative={false}
                  className="border border-gray-300 rounded p-1 w-full"
                  onValueChange={(values) =>
                    handleUpdate(client.id, "value", values.floatValue ?? null)
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
                    <span className="text-orange-500 font-medium">
                      Pendente
                    </span>
                  </>
                )}
              </td>

              <td className="p-3">
                <button
                  type="button"
                  className={`px-4 py-2 rounded text-white ${
                    client.status === "Enviado" ||
                    !client.startDate ||
                    !client.deliveryDate ||
                    client.value === null
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  onClick={() => handleSendProposal(client.id)}
                  disabled={
                    client.status === "Enviado" ||
                    !client.startDate ||
                    !client.deliveryDate ||
                    client.value === null
                  }
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