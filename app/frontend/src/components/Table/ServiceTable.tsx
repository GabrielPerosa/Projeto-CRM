import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface Service {
    id: string;
    name: string;
    startDate: string;
    deadline: string;
    cost: number;
}

const ServiceTable: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        // Simulação de chamada de API para buscar serviços
        const fetchedServices = [
            { id: '1', name: 'Sistema Norte-Sul', startDate: '10/11/2024', deadline: '15/12/2024', cost: 1000.00 },
            // Adicione mais serviços conforme necessário
        ];
        setServices(fetchedServices);
    }, []);

    return (
        <div className="p-6 bg-gray-100">
            <div className="flex justify-around mb-4">
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mr-2">
                    <i className="pi pi-refresh mr-2"></i>Atualizar
                </button>
                
                <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
                    <i className="pi pi-trash mr-2"></i>Apagar
                </button>
            </div>
            <div className="bg-white shadow rounded overflow-hidden">
                <DataTable value={services} tableStyle={{ minWidth: '100%' }} className="w-full">
                    <Column field="id" header="ID" className="px-4 py-2 text-left" style={{ minWidth: '8rem' }} />
                    <Column field="name" header="Nome" className="px-4 py-2 text-left" style={{ minWidth: '12rem' }} />
                    <Column field="startDate" header="Data de Início" className="px-4 py-2 text-left" style={{ minWidth: '10rem' }} />
                    <Column field="deadline" header="Prazo de Entrega" className="px-4 py-2 text-left" style={{ minWidth: '10rem' }} />
                    <Column field="cost" header="Custo (R$)" className="px-4 py-2 text-left" style={{ minWidth: '8rem' }} body={(rowData) => rowData.cost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                </DataTable>
            </div>
        </div>
    );
};

export default ServiceTable;