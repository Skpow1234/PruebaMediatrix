import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useRef, useState } from 'react';
import { getGovernments, removeGovernment } from '../service/GovernmentService';

import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

import { Link } from 'react-router-dom';
import HeaderComponet from '../components/Header-component';

function ConsultaView() {
    const [customers, setCustomers] = useState([]);
    const toast = useRef(null);
    const title = "Consulta";
    const columns = [
        { field: 'id', header: 'ID' },
        { field: 'name', header: 'Nombre' },
        { field: 'description', header: 'Descripción' },
        { field: 'options', header: 'Opciones' },
    ];
    const fetchGovernments = async () => {
        try {
            const data = await getGovernments();
            setCustomers(data);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo cargar la información.',
                life: 3000,
            });
            console.error("Error al obtener los Governments:", error);
        }
    };
    useEffect(() => {
        fetchGovernments();
    }, []);
    const handleDelete = async (id) => {
        try {
            await removeGovernment(id);
            toast.current?.show({
                severity: 'info',
                summary: 'Registro eliminado',
                detail: 'El registro se eliminó exitosamente.',
                life: 3000,
            });
            await fetchGovernments();
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar el registro.',
                life: 3000,
            });
            console.error("Error al eliminar el Government:", error);
        }
    };
    const confirmDelete = (id) => {
        confirmDialog({
            message: '¿Quieres eliminar este registro?',
            header: 'Eliminar confirmación',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            accept: () => handleDelete(id),
            reject: () => {
                toast.current?.show({
                    severity: 'warn',
                    summary: 'Cancelado',
                    detail: 'La eliminación fue cancelada.',
                    life: 3000,
                });
            },
        });
    };
    const btnOptions = (id) => {
        return (
            <div className="d-flex align-items-center">
                <Link to={`/editar/${id}`} className="p-button p-button-primary p-mr-2">
                    <i className="pi pi-pencil"></i>
                </Link>
                <button
                    onClick={() => confirmDelete(id)}
                    className="p-button p-button-danger"
                >
                    <i className="pi pi-trash"></i>
                </button>
            </div>
        );
    };
    return (
        <>
            <div>
                <HeaderComponet name={title} />
                <div className="page-content">
                    <div className="content">
                        <ConfirmDialog />
                        <div className="card">
                            <Toast ref={toast} />
                            <DataTable
                                value={customers}
                                paginator
                                rows={5}
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                tableStyle={{ minWidth: '50rem' }}
                            >
                                {columns.map(({ field, header }) => (
                                    <Column
                                        key={field}
                                        field={field}
                                        header={header}
                                        body={field === 'options' ? (data) => btnOptions(data.id) : null}
                                    />
                                ))}
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConsultaView;
