"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { addLocale, locale } from "primereact/api";
import { FilterMatchMode } from "primereact/api";
import "../style/globals.css";
import { FaUser, FaMapMarkerAlt } from "react-icons/fa";

// 📌 Configuração para português
addLocale("pt", {
  clear: "Remover",
  apply: "Aplicar",
});

locale("pt");

// 📌 Definição dos tipos
interface Cliente {
  dataEntrega: string | null;
  dataInicio: string | null;
  id: number;
  cliente: string;
  prestador: string;
  estado: string;
  data: string;
  status: string;
  valor: string;
}

interface prestador {
  nome: string;
  duracao: number;
  dataDisponivel: string;
  valor: string;
}

// 📌 Lista de prestadores (dados mockados)
const prestadoresMock: prestador[] = [
  {
    nome: "prestador A",
    duracao: 30,
    dataDisponivel: "01/01/2024",
    valor: "R$ 5.000",
  },
  {
    nome: "prestador B",
    duracao: 45,
    dataDisponivel: "01/01/2024",
    valor: "R$ 7.500",
  },
  {
    nome: "prestador C",
    duracao: 60,
    dataDisponivel: "01/01/2024",
    valor: "R$ 10.000",
  },
];

// 📌 Lista de clientes (dados mockados)
const clientesMock: Cliente[] = [
  {
    id: 1,
    cliente: "Carlos Silva",
    prestador: "",
    estado: "SP",
    data: "",
    valor: "R$ 5.000",
    status: "Aprovação de Crédito",
    dataInicio: null,
    dataEntrega: null,
  },
  {
    id: 2,
    cliente: "Ana Souza",
    prestador: "",
    estado: "MG",
    data: "",
    valor: "R$ 10.000",
    status: "Aguardando Orçamento",
    dataInicio: null,
    dataEntrega: null,
  },
  {
    id: 3,
    cliente: "João Pereira",
    prestador: "",
    estado: "BA",
    data: "",
    valor: "R$ 7.000",
    status: "Em Andamento",
    dataInicio: null,
    dataEntrega: null,
  },
  {
    id: 4,
    cliente: "Maria Oliveira",
    prestador: "",
    estado: "AL",
    data: "",
    valor: "R$ 15.000",
    status: "Concluído",
    dataInicio: null,
    dataEntrega: null,
  },
];

export default function TabelaClientes() {
  // 📌 Estados da aplicação
  const [clientes, setClientes] = useState<Cliente[]>([]); // Armazena a lista de clientes
  const [showDialog, setShowDialog] = useState<boolean>(false); // Controla a visibilidade do popup de prestadores
  const [selectedRow, setSelectedRow] = useState<Cliente | null>(null); // Armazena a linha selecionada na tabela

  // 📌 Filtros da tabela
  const [filtros, setFiltros] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }, // Filtro global
    cliente: { value: null, matchMode: FilterMatchMode.CONTAINS }, // Filtro por cliente
    prestador: { value: null, matchMode: FilterMatchMode.CONTAINS }, // Filtro por prestador
    estado: { value: null, matchMode: FilterMatchMode.CONTAINS }, // Filtro por estado
    status: { value: null, matchMode: FilterMatchMode.EQUALS }, // Filtro por status
    data: { value: null, matchMode: FilterMatchMode.DATE_IS }, // Filtro por data
    dataInicio: { value: null, matchMode: FilterMatchMode.DATE_IS }, // Filtro por data de início
    dataEntrega: { value: null, matchMode: FilterMatchMode.DATE_IS }, // Filtro por data de entrega
  });

  // 📌 Efeito para carregar os dados mockados ao iniciar
  useEffect(() => {
    setClientes(clientesMock);
  }, []);

  // 📌 Função para selecionar um prestador e atualizar a lista de clientes
  const selecionarprestador = (prestador: prestador) => {
    if (!selectedRow) return;

    const novosClientes = clientes.map((cliente) =>
      cliente.id === selectedRow.id
        ? { ...cliente, prestador: prestador.nome } // Atualiza o prestador do cliente selecionado
        : cliente
    );
    setClientes(novosClientes); // Atualiza o estado dos clientes
    setShowDialog(false); // Fecha o popup
  };

  // 📌 Função para abrir o popup de seleção de prestador
  const abrirPopupprestador = (rowData: Cliente) => {
    setSelectedRow(rowData); // Define a linha selecionada
    setShowDialog(true); // Abre o popup
  };

  // 📌 Função para atualizar o status de um cliente
  const atualizarStatus = (novaOpcao: string, rowData: Cliente) => {
    const novosClientes = clientes.map(
      (cliente) =>
        cliente.id === rowData.id ? { ...cliente, status: novaOpcao } : cliente // Atualiza o status do cliente selecionado
    );
    setClientes(novosClientes); // Atualiza o estado dos clientes
  };

  // 📌 Função para limpar todos os filtros da tabela
  const limparFiltros = () => {
    setFiltros({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      cliente: { value: null, matchMode: FilterMatchMode.CONTAINS },
      prestador: { value: null, matchMode: FilterMatchMode.CONTAINS },
      estado: { value: null, matchMode: FilterMatchMode.CONTAINS },
      status: { value: null, matchMode: FilterMatchMode.EQUALS },
      data: { value: null, matchMode: FilterMatchMode.DATE_IS },
      dataInicio: { value: null, matchMode: FilterMatchMode.DATE_IS },
      dataEntrega: { value: null, matchMode: FilterMatchMode.DATE_IS },
    });
  };

  // 📌 Função para renderizar o cabeçalho da tabela com botão de limpar filtros
  const renderizarCabecalho = () => (
    <div className="flex justify-content-between">
      <Button
        icon="pi pi-filter-slash"
        label="Limpar Filtros"
        onClick={limparFiltros}
      />
    </div>
  );

  // 📌 Lista de opções de status para o dropdown
  const statusOptions = [
    { label: "Aprovação de Crédito", value: "Aprovação de Crédito" },
    { label: "Aguardando Orçamento", value: "Aguardando Orçamento" },
    { label: "Em Andamento", value: "Em Andamento" },
    { label: "Concluído", value: "Concluído" },
  ];

  // 📌 Template para a coluna de status com dropdown
  const statusTemplate = (rowData: Cliente) => {
    return (
      <Dropdown
        value={rowData.status}
        options={statusOptions}
        onChange={(e) => atualizarStatus(e.value, rowData)} // Atualiza o status ao selecionar uma opção
        placeholder="Selecione o status"
        className="w-full"
      />
    );
  };

  return (
    <div>
      {/* 📌 Tabela de clientes */}
      <DataTable
        value={clientes}
        paginator
        rows={5}
        filters={filtros}
        header={renderizarCabecalho()}
        emptyMessage="Nenhum dado encontrado."
      >
        {/* Coluna de Cliente */}
        <Column
          field="cliente"
          header="Cliente"
          filter
          showFilterMatchModes={false}
          showClearButton={true}
          filterElement={(options) => (
            <div style={{ position: "relative" }}>
              <FaUser
                style={{
                  position: "absolute",
                  left: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#6c757d",
                }}
              />
              <InputText
                value={options.value || ""}
                onChange={(e) => options.filterCallback(e.target.value)}
                placeholder="Digite o cliente"
                className="w-full"
                style={{ paddingLeft: "2.5rem" }}
              />
            </div>
          )}
        />

        {/* Coluna de prestador */}
        <Column
          field="prestador"
          header="prestador"
          body={(rowData: Cliente) => (
            <Button
              label={rowData.prestador || "Selecionar"}
              onClick={() => abrirPopupprestador(rowData)}
              className="p-button-outlined p-button-sm"
            />
          )}
        />

        {/* Coluna de Estado */}
        <Column
          field="estado"
          header="Estado"
          filter
          showFilterMatchModes={false}
          showClearButton={true}
          filterElement={(options) => (
            <div style={{ position: "relative" }}>
              <FaMapMarkerAlt
                style={{
                  position: "absolute",
                  left: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#6c757d",
                }}
              />
              <InputText
                value={options.value || ""}
                onChange={(e) => options.filterCallback(e.target.value)}
                placeholder="Digite o estado"
                className="w-full"
                style={{ paddingLeft: "2.5rem" }}
              />
            </div>
          )}
        />

        {/* Coluna de Data de Início */}
        <Column
          field="dataInicio"
          header="Data de Início"
          body={(rowData: Cliente) => (
            <Calendar
              value={rowData.dataInicio ? new Date(rowData.dataInicio) : null}
              onChange={(e) => {
                const novosClientes = clientes.map((cliente) =>
                  cliente.id === rowData.id
                    ? {
                        ...cliente,
                        dataInicio: e.value ? e.value.toISOString() : null,
                      }
                    : cliente
                );
                setClientes(novosClientes);
              }}
              dateFormat="dd/mm/yy"
              placeholder="Selecionar data"
            />
          )}
        />

        {/* Coluna de Data de Entrega */}
        <Column
          field="dataEntrega"
          header="Data de Entrega"
          body={(rowData: Cliente) => (
            <Calendar
              value={rowData.dataEntrega ? new Date(rowData.dataEntrega) : null}
              onChange={(e) => {
                const novosClientes = clientes.map((cliente) =>
                  cliente.id === rowData.id
                    ? {
                        ...cliente,
                        dataEntrega: e.value ? e.value.toISOString() : null,
                      }
                    : cliente
                );
                setClientes(novosClientes);
              }}
              dateFormat="dd/mm/yy"
              placeholder="Selecionar data"
            />
          )}
        />

        {/* Coluna de Valor */}
        <Column
          field="valor"
          header="Valor (R$)"
          body={(rowData: Cliente) => (
            <div style={{ whiteSpace: "nowrap" }}>{rowData.valor}</div>
          )}
        />

        {/* Coluna de Status */}
        <Column
          field="status"
          header="Status"
          body={statusTemplate} // Usa o template personalizado
        />
      </DataTable>

      {/* 📌 Popup de seleção de prestador */}
      <Dialog
        header="Selecionar prestador"
        visible={showDialog}
        onHide={() => setShowDialog(false)}
        style={{ width: "50vw" }}
      >
        <DataTable value={prestadoresMock}>
          <Column field="nome" header="Nome" />
          <Column field="duracao" header="Duração (dias)" />
          <Column field="dataDisponivel" header="Data Disponivel" />
          <Column field="valor" header="Valor Cobrado" />
          <Column
            header="Ação"
            body={(rowData: prestador) => (
              <Button
                label="Selecionar"
                onClick={() => selecionarprestador(rowData)}
                className="p-button-sm"
              />
            )}
          />
        </DataTable>
      </Dialog>
    </div>
  );
}
