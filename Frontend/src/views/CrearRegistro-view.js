import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Editor } from "primereact/editor";
import { InputText } from 'primereact/inputtext';
import { Toast } from "primereact/toast";
import { useNavigate, useParams } from 'react-router-dom';
import { createGovernment, getGovernment, updateGovernment } from '../service/GovernmentService';

import HeaderComponet from '../components/Header-component';

function CrearRegistroView() {
    const { id } = useParams();
    const [nameAction, setNameAction] = useState("Crear");
    const [colorBtn, setColorbtn] = useState("primary");
    const title = `${nameAction} Registro`;
    const toast = useRef(null);

    const defaultValues = { 
        name: '', 
        description: ''
    };

    const navigate = useNavigate();

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({ defaultValues });

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
    };

    const onSubmit = async (data) => {
        try {
            if (nameAction === "Crear") {
                await createGovernment(data);
                showToast('success', 'Registro creado', `El registro "${data.name}" se creó exitosamente.`);
            } else {
                await updateGovernment(data);
                showToast('success', 'Registro actualizado', `El registro "${data.name}" se actualizó exitosamente.`);
            }
            reset(defaultValues);
            setTimeout(() => navigate("/consulta"), 2000);
        } catch (error) {
            showToast('error', 'Error', 'No se pudo procesar el registro.');
            console.error("Error al procesar el registro:", error);
        }
    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? (
            <small className="p-error">{errors[name].message}</small>
        ) : (
            <small className="p-error">&nbsp;</small>
        );
    };

    useEffect(() => {
        const fetchGovernment = async () => {
            try {
                if (id) {
                    setNameAction("Editar");
                    setColorbtn("warning");
                    const data = await getGovernment(id);
                    if (data) {
                        reset({
                            id: data.id,
                            name: data.name,
                            description: data.description
                        });
                    }
                } else {
                    reset(defaultValues);
                }
            } catch (error) {
                showToast('error', 'Error', 'No se pudo cargar el registro.');
                console.error("Error al obtener el Government:", error);
            }
        };

        fetchGovernment();
    }, [id, reset]);

    return (
        <>
            <div>
                <HeaderComponet name={title} />
                <div className="page-content">
                    <div className="content">
                        <div className='row'>
                            <div className='col-12'>
                                <div className="card p-3">
                                    <form onSubmit={handleSubmit(onSubmit)} className="text-start">
                                        <Toast ref={toast} />
                                        <div className="grid">
                                            <div className="col-6">
                                                <div className="field">
                                                    <Controller
                                                        name="name"
                                                        control={control}
                                                        rules={{ required: 'El nombre es obligatorio.' }}
                                                        render={({ field, fieldState }) => (
                                                            <>
                                                                <label htmlFor={field.name}>Nombre</label>
                                                                <InputText
                                                                    id={field.name}
                                                                    name={field.name}
                                                                    value={field.value}
                                                                    onChange={(e) => field.onChange(e.target.value)}
                                                                    className={classNames('w-full', { 'p-invalid': fieldState.error })}
                                                                />
                                                                {getFormErrorMessage(field.name)}
                                                            </>
                                                        )}
                                                    />
                                                </div>
                                                <div className="field">
                                                    <Controller
                                                        name="description"
                                                        control={control}
                                                        rules={{ required: 'La descripción es obligatoria.' }}
                                                        render={({ field, fieldState }) => (
                                                            <>
                                                                <label htmlFor={field.name}>Descripción</label>
                                                                <Editor
                                                                    id={field.name}
                                                                    name={field.name}
                                                                    value={field.value}
                                                                    onTextChange={(e) => field.onChange(e.textValue)}
                                                                    style={{ height: '250px' }}
                                                                    className={classNames({ 'p-invalid': fieldState.error })}
                                                                />
                                                                {getFormErrorMessage(field.name)}
                                                            </>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                {}
                                            </div>
                                        </div>
                                        <div className="btn-float-content">
                                            <Button label="Guardar" type="submit" icon="pi pi-check" severity={colorBtn} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CrearRegistroView;
