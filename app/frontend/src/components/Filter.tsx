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

// 📌 Configuração para português
addLocale("pt", {
  clear: "Remover",
  apply: "Aplicar",
});

locale("pt");

// 📌 Definição dos tipos
interface Cliente {
  dataEntrega: string;
  dataInicio: string;
  id: number;
  cliente: string;
  fornecedor: string;
  estado: string;
  data: string;
  status: string;
}

interface Fornecedor {
  nome: string;
  duracao: number;
  dataDisponivel: string;
  valor: string;
}

// 📌 Lista de fornecedores
const fornecedoresMock: Fornecedor[] = [
  {
    nome: "Fornecedor A",
    duracao: 30,
    dataDisponivel: "01/01/2024",
    valor: "R$ 5.000",
  },
  {
    nome: "Fornecedor B",
    duracao: 45,
    dataDisponivel: "01/01/2024",
    valor: "R$ 7.500",
  },
  {
    nome: "Fornecedor C",
    duracao: 60,
    dataDisponivel: "01/01/2024",
    valor: "R$ 10.000",
  },
];

// 📌 Lista de clientes
const clientesMock: Cliente[] = [
  {
      id: 1,
      cliente: "Carlos Silva",
      fornecedor: "",
      estado: "SP",
      data: "",
      status: "Aprovação de Crédito",
      dataInicio: "",
      dataEntrega: ""
  },
  {
      id: 2,
      cliente: "Ana Souza",
      fornecedor: "",
      estado: "MG",
      data: "",
      status: "Aguardando Orçamento",
      dataInicio: "",
      dataEntrega: ""
  },
  {
      id: 3,
      cliente: "João Pereira",
      fornecedor: "",
      estado: "BA",
      data: "",
      status: "Em Andamento",
      dataInicio: "",
      dataEntrega: ""
  },
  {
      id: 4,
      cliente: "Maria Oliveira",
      fornecedor: "",
      estado: "AL",
      data: "",
      status: "Concluído",
      dataInicio: "",
      dataEntrega: ""
  },
];

export default function TabelaClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Cliente | null>(null);

  const [filtros, setFiltros] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    cliente: { value: null, matchMode: FilterMatchMode.CONTAINS },
    fornecedor: { value: null, matchMode: FilterMatchMode.CONTAINS },
    estado: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    data: { value: null, matchMode: FilterMatchMode.DATE_IS },
  });

  useEffect(() => {
    setClientes(clientesMock);
  }, []);

  const selecionarFornecedor = (fornecedor: Fornecedor) => {
    if (!selectedRow) return;

    const novosClientes = clientes.map((cliente) =>
      cliente.id === selectedRow.id
        ? { ...cliente, fornecedor: fornecedor.nome }
        : cliente
    );
    setClientes(novosClientes);
    setShowDialog(false);
  };

  const abrirPopupFornecedor = (rowData: Cliente) => {
    setSelectedRow(rowData);
    setShowDialog(true);
  };

  const atualizarStatus = (novaOpcao: string, rowData: Cliente) => {
    const novosClientes = clientes.map((cliente) =>
      cliente.id === rowData.id ? { ...cliente, status: novaOpcao } : cliente
    );
    setClientes(novosClientes);
  };

  const limparFiltros = () => {
    setFiltros({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      cliente: { value: null, matchMode: FilterMatchMode.CONTAINS },
      fornecedor: { value: null, matchMode: FilterMatchMode.CONTAINS },
      estado: { value: null, matchMode: FilterMatchMode.CONTAINS },
      status: { value: null, matchMode: FilterMatchMode.EQUALS },
      dataInicio: { value: null, matchMode: FilterMatchMode.DATE_IS },
      dataEntrega: { value: null, matchMode: FilterMatchMode.DATE_IS },
    });
  };

  const renderizarCabecalho = () => (
    <div className="flex justify-content-between">
      <Button
        icon="pi pi-filter-slash"
        label="Limpar Filtros"
        onClick={limparFiltros}
      />
    </div>
  );

  // 📌 Ícones e cores para os status
  const statusMap: { [key: string]: { icon: string; color: string } } = {
    "Aprovação de Crédito": { icon: "pi pi-hourglass", color: "orange" },
    "Aguardando Orçamento": { icon: "pi pi-clock", color: "blue" },
    "Em Andamento": { icon: "pi pi-spin pi-spinner", color: "green" },
    Concluído: { icon: "pi pi-check", color: "purple" },
  };

  // 📌 Opções do dropdown de status
  const statusOptions = Object.keys(statusMap).map((status) => ({
    label: status,
    value: status,
  }));

  // 📌 Template do status (Dropdown dentro da célula)
  const statusTemplate = (rowData: Cliente) => {
    const statusInfo = statusMap[rowData.status] || {
      icon: "pi pi-info-circle",
      color: "gray",
    };

    return (
      <div className="flex align-items-center">
        <i
          className={`pi ${statusInfo.icon}`}
          style={{ color: statusInfo.color, marginRight: "8px" }}
        ></i>
        <Dropdown
          value={rowData.status}
          options={statusOptions}
          onChange={(e) => atualizarStatus(e.value, rowData)}
          className="w-full"
        />
      </div>
    );
  };

  return (
    <div>
      <DataTable
        value={clientes}
        paginator
        rows={5}
        filters={filtros}
        header={renderizarCabecalho()}
        emptyMessage="Nenhum dado encontrado."
      >
        <Column
          field="cliente"
          header="Cliente"
          filter
          showFilterMatchModes={false} // 📌 Remove os modos de filtro ("Starts with", "Contains", etc.)
          showClearButton={true} // 📌 Exibe o botão "Remover"
          filterElement={(options) => (
            <InputText
              value={options.value || ""}
              onChange={(e) => options.filterCallback(e.target.value)}
              placeholder="Digite o cliente"
              className="w-full"
            />
          )}
        />

        <Column
          field="fornecedor"
          header="Fornecedor"
          body={(rowData: Cliente) => (
            <Button
              label={rowData.fornecedor || "Selecionar"}
              onClick={() => abrirPopupFornecedor(rowData)}
              className="p-button-outlined p-button-sm"
            />
          )}
        />

        <Column
          field="estado"
          header="Estado"
          filter
          showFilterMatchModes={false} // 📌 Remove os modos de filtro
          showClearButton={true} // 📌 Exibe o botão "Remover"
          filterElement={(options) => (
            <InputText
              value={options.value || ""}
              onChange={(e) => options.filterCallback(e.target.value)}
              placeholder="Digite o estado"
              className="w-full"
            />
          )}
        />

<Column
  field="dataInicio"
  header="Data de Início"
  body={(rowData: Cliente) => (
    <Calendar
      value={rowData.dataInicio ? new Date(rowData.dataInicio) : null}
      onChange={(e) => {
        const novosClientes = clientes.map((cliente) =>
          cliente.id === rowData.id
            ? { ...cliente, dataInicio: e.value }
            : cliente
        );
        setClientes(novosClientes);
      }}
      dateFormat="dd/mm/yy"
      placeholder="Selecionar data"
    />
  )}
/>

<Column
  field="dataEntrega"
  header="Data de Entrega"
  body={(rowData: Cliente) => (
    <Calendar
      value={rowData.dataEntrega ? new Date(rowData.dataEntrega) : null}
      onChange={(e) => {
        const novosClientes = clientes.map((cliente) =>
          cliente.id === rowData.id
            ? { ...cliente, dataEntrega: e.value }
            : cliente
        );
        setClientes(novosClientes);
      }}
      dateFormat="dd/mm/yy"
      placeholder="Selecionar data"
    />
  )}
/>


        <Column field="status" header="Status" body={statusTemplate} />
      </DataTable>

      {/* POP-UP FORNECEDOR */}
      <Dialog
        header="Selecionar Fornecedor"
        visible={showDialog}
        onHide={() => setShowDialog(false)}
        style={{ width: "50vw" }}
      >
        <DataTable value={fornecedoresMock}>
          <Column field="nome" header="Nome" />
          <Column field="duracao" header="Duração (dias)" />
          <Column field="dataDisponivel" header="Data Disponivel" />
          <Column field="valor" header="Valor Cobrado" />
          <Column
            header="Ação"
            body={(rowData: Fornecedor) => (
              <Button
                label="Selecionar"
                onClick={() => selecionarFornecedor(rowData)}
                className="p-button-sm"
              />
            )}
          />
        </DataTable>
      </Dialog>
    </div>
  );
}
