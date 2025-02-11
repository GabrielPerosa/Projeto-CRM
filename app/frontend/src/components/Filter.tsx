'use client'
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { addLocale } from 'primereact/api';


const clientesMock = [
        { id: 1, cliente: 'Carlos Silva', pais: 'Brasil', empresa: 'Tech Corp', data: '2023-10-01', status: 'Ativo' },
        { id: 2, cliente: 'Ana Souza', pais: 'Portugal', empresa: 'SoftWareX', data: '2023-09-15', status: 'Inativo' },
        { id: 3, cliente: 'João Pereira', pais: 'Espanha', empresa: 'Innovatech', data: '2023-08-20', status: 'Ativo' },
        { id: 4, cliente: 'Maria Oliveira', pais: 'Canadá', empresa: 'Cloud Systems', data: '2023-07-10', status: 'Inativo' },
        { id: 5, cliente: 'Lucas Fernandes', pais: 'Alemanha', empresa: 'Data Solutions', data: '2023-06-05', status: 'Ativo' },
        { id: 6, cliente: 'Sofia Martins', pais: 'França', empresa: 'CyberTech', data: '2023-05-25', status: 'Inativo' },
        { id: 7, cliente: 'Bruno Costa', pais: 'Itália', empresa: 'AI Future', data: '2023-04-18', status: 'Ativo' },
        { id: 8, cliente: 'Fernanda Lima', pais: 'Reino Unido', empresa: 'BigData Inc', data: '2023-03-30', status: 'Inativo' },
        { id: 9, cliente: 'Rafael Duarte', pais: 'Estados Unidos', empresa: 'NextGen Tech', data: '2023-02-12', status: 'Ativo' },
        { id: 10, cliente: 'Camila Rocha', pais: 'Austrália', empresa: 'Quantum Innovations', data: '2023-01-07', status: 'Inativo' },
        { id: 11, cliente: 'Rosana Lima', pais: 'Reino Unido', empresa: 'BigData Inc', data: '2023-03-30', status: 'Inativo' },
        { id: 12, cliente: 'Paulo Duarte', pais: 'Estados Unidos', empresa: 'NextGen Tech', data: '2023-02-12', status: 'Ativo' },
        { id: 13, cliente: 'Carlos Rocha', pais: 'Austrália', empresa: 'Quantum Innovations', data: '2023-01-07', status: 'Inativo' }
];

export default function TabelaClientes() {
    const [clientes, setClientes] = useState([]);
    const [filtros, setFiltros] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        cliente: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        pais: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        data: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] }
    });
    const [pesquisaGlobal, setPesquisaGlobal] = useState('');

    useEffect(() => {
        setClientes(clientesMock);
    }, []);

    const limparFiltros = () => {
        setFiltros({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            cliente: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            pais: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            status: { value: null, matchMode: FilterMatchMode.EQUALS },
            data: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] }
        });
        setPesquisaGlobal('');
    };

    const renderizarCabecalho = () => (
        <div className="flex justify-content-between">
            <Button icon="pi pi-filter-slash" label="Limpar" onClick={limparFiltros} />
            <InputText value={pesquisaGlobal} onChange={(e) => setPesquisaGlobal(e.target.value)} placeholder="Pesquisar..." />
        </div>
    );

    return (
        <div>
            <DataTable value={clientes} paginator rows={5} header={renderizarCabecalho()} filters={filtros} globalFilterFields={['cliente', 'pais', 'empresa', 'status']}>
                <Column field="cliente" header="Cliente" filter filterPlaceholder="Filtrar por cliente" />
                <Column field="pais" header="País" filter filterPlaceholder="Filtrar por país" />
                <Column field="empresa" header="Empresa" />
                <Column field="data" header="Data" filter filterElement={(options) => <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value)} />} />
                <Column field="status" header="Status" filter filterElement={(options) => <Dropdown value={options.value} options={[{ label: 'Ativo', value: 'Ativo' }, { label: 'Inativo', value: 'Inativo' }]} onChange={(e) => options.filterCallback(e.value)}/>} />
            </DataTable>
        </div>
    );
}
