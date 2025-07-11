"use client";
import React from "react";
import { Dropdown } from "primereact/dropdown";
import { FaTrash, FaEdit } from "react-icons/fa";

interface Estado {
  id: number;
  estado: string;
  valor: string;
  editing?: boolean;
}

const estadosBrasil = [
  { label: "Acre", value: "AC" },
  { label: "Alagoas", value: "AL" },
  { label: "Amapá", value: "AP" },
  { label: "Amazonas", value: "AM" },
  { label: "Bahia", value: "BA" },
  { label: "Ceará", value: "CE" },
  { label: "Distrito Federal", value: "DF" },
  { label: "Espírito Santo", value: "ES" },
  { label: "Goiás", value: "GO" },
  { label: "Maranhão", value: "MA" },
  { label: "Mato Grosso", value: "MT" },
  { label: "Mato Grosso do Sul", value: "MS" },
  { label: "Minas Gerais", value: "MG" },
  { label: "Pará", value: "PA" },
  { label: "Paraíba", value: "PB" },
  { label: "Paraná", value: "PR" },
  { label: "Pernambuco", value: "PE" },
  { label: "Piauí", value: "PI" },
  { label: "Rio de Janeiro", value: "RJ" },
  { label: "Rio Grande do Norte", value: "RN" },
  { label: "Rio Grande do Sul", value: "RS" },
  { label: "Rondônia", value: "RO" },
  { label: "Roraima", value: "RR" },
  { label: "Santa Catarina", value: "SC" },
  { label: "São Paulo", value: "SP" },
  { label: "Sergipe", value: "SE" },
  { label: "Tocantins", value: "TO" },
];

interface Props {
  estadosAdicionados: Estado[];
  setEstadosAdicionados: React.Dispatch<React.SetStateAction<Estado[]>>;
  className?: string; // ✅ Aqui você aceita o className opcional
}

const ListaEstadosPrestador: React.FC<Props> = ({
  estadosAdicionados,
  setEstadosAdicionados,
  className, // ✅ Pega o className
}) => {
  const [estado, setEstado] = React.useState("");
  const [valor, setValor] = React.useState("");
  const [mensagemAviso, setMensagemAviso] = React.useState<string | null>(null);

  const adicionarEstado = () => {
    if (!estado || !valor.trim()) {
      setMensagemAviso("Preencha estado e valor.");
      return;
    }

    if (estadosAdicionados.some((e) => e.estado === estado)) {
      setMensagemAviso("Estado já adicionado.");
      return;
    }

    const novoEstado: Estado = {
      id: Date.now(),
      estado,
      valor,
    };

    const atualizados = [...estadosAdicionados, novoEstado];
    setEstadosAdicionados(atualizados);
    setEstado("");
    setValor("");
  };

  const removerEstado = (id: number) => {
    const atualizados = estadosAdicionados.filter((e) => e.id !== id);
    setEstadosAdicionados(atualizados);
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const num = parseFloat(raw) / 100;
    const formatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(num);
    setValor(formatted);
  };

  const editarValorEstado = (id: number, novoValor: string) => {
    const atualizados = estadosAdicionados.map((item) =>
      item.id === id ? { ...item, valor: novoValor } : item
    );
    setEstadosAdicionados(atualizados);
  };

  const formatarValorInput = (valor: string) => {
    const raw = valor.replace(/\D/g, "");
    const num = parseFloat(raw) / 100;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(num);
  };

  const toggleEdicao = (id: number, editar: boolean) => {
    const atualizados = estadosAdicionados.map((item) =>
      item.id === id ? { ...item, editing: editar } : item
    );
    setEstadosAdicionados(atualizados);
  };

  React.useEffect(() => {
    if (mensagemAviso) {
      const timer = setTimeout(() => setMensagemAviso(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [mensagemAviso]);

  return (
    <div
      className={
        className ??
        "bg-white p-6 rounded-2xl shadow-md space-y-6"
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Dropdown
          value={estado}
          onChange={(e) => setEstado(e.value)}
          options={estadosBrasil}
          placeholder="Selecione o estado"
          className="w-full p-2 border rounded-lg"
        />

        <input
          type="text"
          value={valor}
          onChange={handleValorChange}
          placeholder="Valor médio"
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <button
        type="button"
        onClick={adicionarEstado}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
      >
        Adicionar Estado
      </button>

      {mensagemAviso && (
        <p className="text-red-500 text-sm font-medium text-center">
          {mensagemAviso}
        </p>
      )}

      {Array.isArray(estadosAdicionados) && estadosAdicionados.length > 0 && (
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
          {estadosAdicionados.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border p-3 rounded-lg bg-gray-50"
            >
              <div className="flex flex-col w-full">
                <p className="text-sm font-medium text-gray-800">
                  {item.estado}
                </p>

                {item.editing ? (
                  <input
                    type="text"
                    value={item.valor}
                    onChange={(e) =>
                      editarValorEstado(
                        item.id,
                        formatarValorInput(e.target.value)
                      )
                    }
                    onBlur={() => toggleEdicao(item.id, false)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        toggleEdicao(item.id, false);
                      }
                    }}
                    className="text-xs text-gray-600 mt-1 px-2 py-1 border rounded-md"
                    autoFocus
                  />
                ) : (
                  <p className="text-xs text-gray-600 mt-1">{item.valor}</p>
                )}
              </div>

              <div className="flex gap-3 ml-4">
                <button
                  type="button"
                  onClick={() => toggleEdicao(item.id, true)}
                  className="text-gray-500 hover:text-gray-700"
                  title="Editar"
                >
                  <FaEdit />
                </button>

                <button
                  type="button"
                  onClick={() => removerEstado(item.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Remover"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaEstadosPrestador;
