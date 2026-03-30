import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Truck, Pencil, Trash2, Mail, Phone, CreditCard } from "lucide-react";
import { GenericTable, type Column } from "@/components/shared/GenericTable";
import { GenericModal } from "@/components/shared/GenericModal";
import { GenericPagination } from "@/components/shared/GenericPagination";
import { useSuppliers } from "../hooks/useSuppliers";
import type { Supplier } from "../types/suppliers.type";
import { AddSupplierForm } from "./AddSupplierForm";

export const SuppliersDashboard = () => {
    const { suppliers, fetchSuppliers } = useSuppliers();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Estados de paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchSuppliers();
    }, []);

    // Lógica de paginación (cliente por ahora)
    const totalPages = Math.ceil(suppliers.length / itemsPerPage);
    
    const paginatedSuppliers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return suppliers.slice(startIndex, startIndex + itemsPerPage);
    }, [suppliers, currentPage, itemsPerPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const columns: Column<Supplier>[] = [
        {
            header: "RUC / Documento",
            render: (item) => (
                <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-slate-700">{item.documento}</span>
                </div>
            )
        },
        {
            header: "Descripción / Razón Social",
            render: (item) => (
                <div className="flex flex-col">
                    <span className="font-semibold text-slate-900">{item.descripcion}</span>
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
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600">
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
                title="Panel de Proveedores"
                description="Gestiona tus alianzas comerciales y proveedores de artículos."
                action={
                    <GenericModal
                        title="Nuevo Proveedor"
                        description="Registre un nuevo socio comercial en su base de datos."
                        isOpen={isModalOpen}
                        onOpenChange={setIsModalOpen}
                        trigger={
                            <Button className="shadow-sm">
                                <Truck className="w-4 h-4 mr-2" /> Nuevo Proveedor
                            </Button>
                        }
                    >
                        <AddSupplierForm
                            onSuccess={() => {
                                setIsModalOpen(false);
                                fetchSuppliers();
                            }}
                            onCancel={() => setIsModalOpen(false)}
                        />
                    </GenericModal>
                }
            />

            <Card className="border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-white border-b border-slate-100 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg">Listado de Proveedores</CardTitle>
                            <CardDescription>Controla tus canales de abastecimiento y compras directas.</CardDescription>
                        </div>
                        <div className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-full">
                            Total: {suppliers.length}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pl-6 pr-6">
                    <GenericTable columns={columns} data={paginatedSuppliers} />
                    <div className="border-t border-slate-100 bg-slate-50/50">
                        <GenericPagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SuppliersDashboard;