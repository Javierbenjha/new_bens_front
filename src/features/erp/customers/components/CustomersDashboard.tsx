import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { UserPlus, Pencil, Trash2, Mail, Phone, CreditCard } from "lucide-react";
import { GenericTable, type Column } from "@/components/shared/GenericTable";
import { GenericModal } from "@/components/shared/GenericModal";
import { useCustomers } from "../hooks/useCustomers";
import type { Customer } from "../types/customers.type";
import { AddCustomerForm } from "./AddCustomerForm";

export const CustomersDashboard = () => {
    const { customers, fetchCustomers } = useCustomers();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const columns: Column<Customer>[] = [
        {
            header: "Documento",
            render: (item) => (
                <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-slate-700">{item.documento}</span>
                </div>
            )
        },
        {
            header: "Nombre Completo",
            render: (item) => (
                <div className="flex flex-col">
                    <span className="font-semibold text-slate-900">{item.nombre} {item.apellido}</span>
                    <span className="text-xs text-slate-500">{item.correo}</span>
                </div>
            )
        },
        {
            header: "Email",
            render: (item) => (
                <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{item.correo}</span>
                </div>
            )
        },
        {
            header: "Teléfono",
            render: (item) => (
                <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{item.telefono || "---"}</span>
                </div>
            )
        },
        {
            header: "Acciones",
            render: () => (
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600">
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Directorio de Clientes"
                description="Administra los perfiles y datos de contacto de tus clientes."
                action={
                    <GenericModal
                        title="Nuevo Cliente"
                        description="Ingrese la información del contacto o empresa para registrarlo en el sistema."
                        isOpen={isModalOpen}
                        onOpenChange={setIsModalOpen}
                        trigger={
                            <Button className="shadow-sm">
                                <UserPlus className="w-4 h-4 mr-2" /> Nuevo Cliente
                            </Button>
                        }
                    >
                        <AddCustomerForm
                            onSuccess={() => {
                                setIsModalOpen(false);
                                fetchCustomers();
                            }}
                            onCancel={() => setIsModalOpen(false)}
                        />
                    </GenericModal>
                }
            />

            <Card className="border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-white border-b border-slate-100">
                    <CardTitle className="text-lg">Base de Datos de Clientes</CardTitle>
                    <CardDescription>Gestiona la información y el historial de tus clientes registrados en el sistema.</CardDescription>
                </CardHeader>
                <CardContent className="p-2">
                    <GenericTable columns={columns} data={customers} />
                </CardContent>
            </Card>
        </div>
    );
};

export default CustomersDashboard;
