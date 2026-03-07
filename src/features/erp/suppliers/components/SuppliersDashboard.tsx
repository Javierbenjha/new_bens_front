import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Truck, ExternalLink, Settings2 } from "lucide-react";
import { GenericTable, type Column } from "@/components/shared/GenericTable";
import { GenericModal } from "@/components/shared/GenericModal";
import { useSuppliers } from "../hooks/useSuppliers";
import type { Supplier } from "../types/suppliers.type";

export const SuppliersDashboard = () => {
    const { suppliers, isLoading, fetchSuppliers } = useSuppliers();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const columns: Column<Supplier>[] = [
        { header: "Proveedor", key: "name" },
        { header: "RUC / Tax ID", key: "ruc" },
        { header: "Categoría", key: "category" },
        { header: "Contacto Directo", key: "contact" },
        {
            header: "Acciones",
            render: () => (
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600">
                        <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                        <Settings2 className="h-4 w-4" />
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
                            <Button className="shadow-sm" disabled={isLoading}>
                                <Truck className="w-4 h-4 mr-2" /> Nuevo Proveedor
                            </Button>
                        }
                    >
                        <div className="py-6 flex flex-col items-center justify-center text-center space-y-2">
                            <Truck className="w-10 h-10 text-slate-300" />
                            <h3 className="font-medium text-slate-900">Próximamente</h3>
                            <p className="text-sm text-slate-500">Gestión completa de proveedores y RUCs.</p>
                        </div>
                    </GenericModal>
                }
            />

            <Card className="border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-white border-b border-slate-100">
                    <CardTitle className="text-lg">Listado de Proveedores</CardTitle>
                    <CardDescription>Controla tus canales de abastecimiento y compras directas.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <GenericTable columns={columns} data={suppliers} />
                </CardContent>
            </Card>
        </div>
    );
};

export default SuppliersDashboard;
