import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { PackagePlus, Pencil, Trash2, Package, Hash, DollarSign, Tag } from "lucide-react";
import { GenericTable, type Column } from "@/components/shared/GenericTable";
import { GenericModal } from "@/components/shared/GenericModal";
import { useItems } from "../hooks/useItems";
import type { Item } from "../types/items.type";
import { AddItemForm } from "./AddItemForm";

export const ItemsDashboard = () => {
    const { items, fetchItems } = useItems();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchItems();
    }, []);

    const columns: Column<Item>[] = [
        {
            header: "Nombre",
            render: (item) => (
                <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-slate-700">{item.nombre}</span>
                </div>
            )
        },
        {
            header: "Descripción",
            render: (item) => (
                <div className="max-w-xs truncate text-sm text-slate-500">
                    {item.descripcion}
                </div>
            )
        },
        {
            header: "Cantidad",
            render: (item) => (
                <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{item.cantidad}</span>
                </div>
            )
        },
        {
            header: "Precio",
            render: (item) => (
                <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-semibold">${Number(item.precio).toFixed(2)}</span>
                </div>
            )
        },
        {
            header: "Unidad",
            render: (item) => (
                <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-600">{item.unidad}</span>
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
                title="Gestión de Artículos"
                description="Administra los artículos asociados a tus compras y stock."
                action={
                    <GenericModal
                        title="Nuevo Artículo"
                        description="Ingrese la información del nuevo artículo para registrarlo en el sistema."
                        isOpen={isModalOpen}
                        onOpenChange={setIsModalOpen}
                        trigger={
                            <Button className="shadow-sm">
                                <PackagePlus className="w-4 h-4 mr-2" /> Nuevo Artículo
                            </Button>
                        }
                    >
                        <AddItemForm
                            onSuccess={() => {
                                setIsModalOpen(false);
                                fetchItems();
                            }}
                            onCancel={() => setIsModalOpen(false)}
                        />
                    </GenericModal>
                }
            />

            <Card className="border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-white border-b border-slate-100">
                    <CardTitle className="text-lg">Catálogo de Artículos</CardTitle>
                    <CardDescription>Lista completa de artículos registrados y su vinculación con órdenes de compra.</CardDescription>
                </CardHeader>
                <CardContent className="p-2">
                    <GenericTable columns={columns} data={items} />
                </CardContent>
            </Card>
        </div>
    );
};

export default ItemsDashboard;
