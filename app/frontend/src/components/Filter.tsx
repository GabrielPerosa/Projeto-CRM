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
import { FaUser, FaMapMarkerAlt, FaPencilAlt } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";


// Configuração para português
addLocale("pt", {
  clear: "Remover",
  apply: "Aplicar",
});
locale("pt");

// Definição dos tipos
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
  email?: string;
  telefone?: string;
  cep?: string;
  numeroComplemento?: string;
  cidade: string;
  rua: string;
}

interface Prestador {
  nome: string;
  duracao: number;
  dataDisponivel: string;
  valor: string;
}

const prestadoresMock: Prestador[] = [
  { nome: "Prestador A", duracao: 30, dataDisponivel: "01/01/2024", valor: "R$ 5.000" },
  { nome: "Prestador B", duracao: 45, dataDisponivel: "01/01/2024", valor: "R$ 7.500" },
  { nome: "Prestador C", duracao: 60, dataDisponivel: "01/01/2024", valor: "R$ 10.000" },
];

const clientesMock: Cliente[] = [
  { id: 1, cliente: "Carlos Silva", prestador: "", estado: "SP", data: "", valor: "R$ 5.000", status: "Aprovação de Crédito", dataInicio: null, dataEntrega: null, email: "carlos@email.com", telefone: "(11) 99999-9999", cep: "18072-000", numeroComplemento: "20", cidade: "Guarulhos", rua: "Alameda Amélia" },
  { id: 2, cliente: "Ana Souza", prestador: "", estado: "MG", data: "", valor: "R$ 10.000", status: "Aguardando Orçamento", dataInicio: null, dataEntrega: null, email: "ana@email.com", telefone: "(31) 98888-8888", cep: "18050-001", numeroComplemento: "20", cidade: "Abaeté", rua: "Antônio Jacinto Lasma" },
  { id: 3, cliente: "João Pereira", prestador: "", estado: "BA", data: "", valor: "R$ 7.000", status: "Em Andamento", dataInicio: null, dataEntrega: null, email: "joao@email.com", telefone: "(71) 97777-7777", cep: "18040-020", numeroComplemento: "20", cidade: "Candeias", rua: "Loteamento Cruz" },
  { id: 4, cliente: "Maria Oliveira", prestador: "", estado: "AL", data: "", valor: "R$ 15.000", status: "Concluído", dataInicio: null, dataEntrega: null, email: "maria@email.com", telefone: "(82) 96666-6666", cep: "18051-030", numeroComplemento: "20", cidade: "Anadia", rua: "Doutor Fernandes Lima" },
  { id: 5, cliente: "Pedro Costa", prestador: "", estado: "RJ", data: "", valor: "R$ 12.000", status: "Aguardando Orçamento", dataInicio: null, dataEntrega: null, email: "pedro@email.com", telefone: "(21) 95555-5555", cep: "20000-000", numeroComplemento: "100", cidade: "Rio de Janeiro", rua: "Avenida Principal" },
  { id: 6, cliente: "Juliana Santos", prestador: "", estado: "RS", data: "", valor: "R$ 8.500", status: "Em Andamento", dataInicio: null, dataEntrega: null, email: "juliana@email.com", telefone: "(51) 94444-4444", cep: "90000-000", numeroComplemento: "50B", cidade: "Porto Alegre", rua: "Rua dos Gaúchos" },
  { id: 7, cliente: "Lucas Martins", prestador: "", estado: "PE", data: "", valor: "R$ 20.000", status: "Concluído", dataInicio: null, dataEntrega: null, email: "lucas@email.com", telefone: "(81) 93333-3333", cep: "50000-000", numeroComplemento: "Ap 301", cidade: "Recife", rua: "Rua da Praia" },
];

export default function Filter() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Cliente | null>(null);
  const [dialogType, setDialogType] = useState<"prestador" | "cliente" | null>(null);
  const [editandoValorId, setEditandoValorId] = useState<number | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [filtros, setFiltros] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    cliente: { value: null, matchMode: FilterMatchMode.CONTAINS },
    prestador: { value: null, matchMode: FilterMatchMode.CONTAINS },
    estado: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.CONTAINS },
    data: { value: null, matchMode: FilterMatchMode.DATE_IS },
    dataInicio: { value: null, matchMode: FilterMatchMode.DATE_IS },
    dataEntrega: { value: null, matchMode: FilterMatchMode.DATE_IS },
  });

  useEffect(() => {
    const saved = localStorage.getItem("servicos_admin");
    if (saved) {
      const parsed = JSON.parse(saved);
      setClientes(parsed.length > 0 ? parsed : clientesMock);
    } else {
      setClientes(clientesMock);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("servicos_admin", JSON.stringify(clientes));
  }, [clientes]);

  const selecionarPrestador = (prestador: Prestador) => {
    if (!selectedRow) return;
    const novos = clientes.map((c) =>
      c.id === selectedRow.id ? { ...c, prestador: prestador.nome } : c
    );
    setClientes(novos);
    setShowDialog(false);
  };

  const abrirPopupPrestador = (row: Cliente) => {
    setSelectedRow(row);
    setDialogType("prestador");
    setShowDialog(true);
  };

  const abrirPopupCliente = (row: Cliente) => {
    setSelectedRow(row);
    setDialogType("cliente");
    setShowDialog(true);
  };

  const atualizarStatus = (nova: string, row: Cliente) => {
    const novos = clientes.map((c) => (c.id === row.id ? { ...c, status: nova } : c));
    setClientes(novos);
  };

  const atualizarValor = (valor: string, row: Cliente) => {
    const novos = clientes.map((c) => (c.id === row.id ? { ...c, valor: valor } : c));
    setClientes(novos);
  };

  const limparFiltros = () => {
    setFiltros({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      cliente: { value: null, matchMode: FilterMatchMode.CONTAINS },
      prestador: { value: null, matchMode: FilterMatchMode.CONTAINS },
      estado: { value: null, matchMode: FilterMatchMode.CONTAINS },
      status: { value: null, matchMode: FilterMatchMode.CONTAINS },
      data: { value: null, matchMode: FilterMatchMode.DATE_IS },
      dataInicio: { value: null, matchMode: FilterMatchMode.DATE_IS },
      dataEntrega: { value: null, matchMode: FilterMatchMode.DATE_IS },
    });
  };

  const renderizarCabecalho = () => (
    <div className="flex flex-wrap justify-between items-center gap-2">
      <Button
        icon="pi pi-filter-slash"
        label="Limpar Filtros"
        onClick={limparFiltros}
        className="p-button-outlined"
      />
    </div>
  );

  const statusOptions = [
    { label: "Aprovação de Crédito", value: "Aprovação de Crédito" },
    { label: "Aguardando Orçamento", value: "Aguardando Orçamento" },
    { label: "Em Andamento", value: "Em Andamento" },
    { label: "Concluído", value: "Concluído" },
  ];

  const statusTemplate = (row: Cliente) => (
    <Dropdown
      value={row.status}
      options={statusOptions}
      onChange={(e) => atualizarStatus(e.value, row)}
      className="w-full"
    />
  );

  const valorTemplate = (row: Cliente) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        width: "150px",
      }}
    >
      <InputText
        value={row.valor}
        onChange={(e) => atualizarValor(e.target.value, row)}
        disabled={editandoValorId !== row.id}
        className="p-inputtext-sm"
        style={{ width: "100%", paddingRight: "2rem" }}
      />
      <FaPencilAlt
        style={{
          position: "absolute",
          right: "0.5rem",
          cursor: "pointer",
          color: "#6c757d",
        }}
        onClick={() => setEditandoValorId(row.id === editandoValorId ? null : row.id)}
      />
    </div>
  );

  return (
    <div className="relative card bg-white p-2 sm:p-4 rounded-lg shadow-md">
      {saveSuccess && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow-md z-50">
          Configurações salvas com sucesso!
        </div>
      )}

      <DataTable
        value={clientes}
        paginator
        rows={4}
        filters={filtros}
        header={renderizarCabecalho()}
        emptyMessage="Nenhum dado encontrado."
        className="mb-4"
        scrollable
      >
        <Column
          field="cliente"
          header="Cliente"
          filter
          showFilterMatchModes={false}
          showClearButton
          style={{ minWidth: '200px' }}
          filterElement={(options) => (
            <div style={{ position: "relative" }}>
              <FaUser style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#6c757d" }} />
              <InputText value={options.value || ""} onChange={(e) => options.filterCallback(e.target.value)} placeholder="Digite o cliente" className="w-full" style={{ paddingLeft: "2.5rem" }} />
            </div>
          )}
          body={(row: Cliente) => (
            <Button label={row.cliente} onClick={() => abrirPopupCliente(row)} className="p-button-link text-left" />
          )}
        />
        <Column field="prestador" header="Prestador" style={{ minWidth: '150px' }} body={(row: Cliente) => (<Button label={row.prestador || "Selecionar"} onClick={() => abrirPopupPrestador(row)} className="p-button-outlined p-button-sm" />)} />
        <Column field="estado" header="Estado" filter showFilterMatchModes={false} showClearButton style={{ minWidth: '150px' }} filterElement={(options) => (
          <div style={{ position: "relative" }}>
            <FaMapMarkerAlt style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#6c757d" }} />
            <InputText value={options.value || ""} onChange={(e) => options.filterCallback(e.target.value)} placeholder="Digite o estado" className="w-full" style={{ paddingLeft: "2.5rem" }} />
          </div>
        )}
        />
        <Column field="dataInicio" header="Data de Início" style={{ minWidth: '200px' }} body={(row) => (<Calendar value={row.dataInicio ? new Date(row.dataInicio) : null} onChange={(e) => { const novos = clientes.map((c) => c.id === row.id ? { ...c, dataInicio: e.value ? e.value.toISOString() : null } : c); setClientes(novos); }} dateFormat="dd/mm/yy" placeholder="Selecionar data" />)} />
        <Column field="dataEntrega" header="Data de Entrega" style={{ minWidth: '200px' }} body={(row) => (<Calendar value={row.dataEntrega ? new Date(row.dataEntrega) : null} onChange={(e) => { const novos = clientes.map((c) => c.id === row.id ? { ...c, dataEntrega: e.value ? e.value.toISOString() : null } : c); setClientes(novos); }} dateFormat="dd/mm/yy" placeholder="Selecionar data" />)} />
        <Column field="valor" header="Valor (R$)" style={{ minWidth: '150px' }} body={valorTemplate} />
        <Column field="status" header="Status" body={statusTemplate} filter showFilterMatchModes={false} showClearButton style={{ minWidth: '200px' }} filterElement={(options) => (
          <div style={{ position: "relative" }}>
            <FaClockRotateLeft style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#6c757d" }} />
            <InputText value={options.value || ""} onChange={(e) => options.filterCallback(e.target.value)} placeholder="Digite o status" className="w-full" style={{ paddingLeft: "2.5rem" }} />
          </div>
        )}
        />
      </DataTable>

      <Dialog
        header={dialogType === "prestador" ? "Selecionar Prestador" : "Detalhes do Cliente"}
        visible={showDialog}
        onHide={() => setShowDialog(false)}
        className="w-[95vw] md:w-[70vw] lg:w-[50vw]"
        maximizable
      >

        {dialogType === "prestador" ? (
          <div className="p-1 md:p-2 space-y-4 bg-gray-50 rounded-lg">
            {prestadoresMock.map((prestador) => (
              <div key={prestador.nome} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                {/* Cabeçalho do Card */}
                <div className="bg-gray-100 p-4">
                  <h3 className="font-bold text-lg text-gray-800">{prestador.nome}</h3>
                </div>

                {/* Corpo do Card com os detalhes */}
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="text-sm text-gray-600">Duração (dias)</span>
                    <span className="text-sm font-medium text-gray-900">{prestador.duracao}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="text-sm text-gray-600">Data Disponível</span>
                    <span className="text-sm font-medium text-gray-900">{prestador.dataDisponivel}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Valor Cobrado</span>
                    <span className="text-sm font-bold text-blue-600">{prestador.valor}</span>
                  </div>
                </div>

                {/* Rodapé do Card com o botão de ação */}
                <div className="bg-gray-50 p-3 text-right">
                  <Button
                    label="Selecionar"
                    onClick={() => selecionarPrestador(prestador)}
                    className="p-button-sm p-button-info"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (

          selectedRow && (
            <div className="relative pb-20 overflow-x-auto">
              <table className="min-w-full text-left text-sm border border-gray-200 rounded-lg">
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-4 py-2 font-semibold text-gray-700">Nome</td><td className="px-4 py-2">{selectedRow.cliente}</td></tr>
                  <tr><td className="px-4 py-2 font-semibold text-gray-700">CEP</td><td className="px-4 py-2">{selectedRow.cep}</td></tr>
                  <tr><td className="px-4 py-2 font-semibold text-gray-700">Rua</td><td className="px-4 py-2">{selectedRow.rua}</td></tr>
                  <tr><td className="px-4 py-2 font-semibold text-gray-700">Número/Comp.</td><td className="px-4 py-2">{selectedRow.numeroComplemento}</td></tr>
                  <tr><td className="px-4 py-2 font-semibold text-gray-700">Cidade</td><td className="px-4 py-2">{selectedRow.cidade}</td></tr>
                  <tr><td className="px-4 py-2 font-semibold text-gray-700">Estado</td><td className="px-4 py-2">{selectedRow.estado}</td></tr>
                  <tr><td className="px-4 py-2 font-semibold text-gray-700">E-mail</td><td className="px-4 py-2">{selectedRow.email}</td></tr>
                  <tr><td className="px-4 py-2 font-semibold text-gray-700">Telefone</td><td className="px-4 py-2">{selectedRow.telefone}</td></tr>
                </tbody>
              </table>
              <Button label="Download Documento" icon="pi pi-download" className="absolute bottom-4 right-4 bg-blue-500 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => { const blob = new Blob([`Dados do cliente:\nNome: ${selectedRow.cliente}\nE-mail: ${selectedRow.email}\nTelefone: ${selectedRow.telefone}\nEstado: ${selectedRow.estado}`], { type: "application/pdf" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = `cliente_${selectedRow.cliente}.pdf`; document.body.appendChild(link); link.click(); document.body.removeChild(link); }} />
            </div>
          )
        )}
      </Dialog>

      <div className="flex justify-end mt-4">
        <Button
          label="Salvar Alterações"
          icon="pi pi-save"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => {
            localStorage.setItem("servicos_admin", JSON.stringify(clientes));
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
          }}
        />
      </div>
    </div>
  );
}