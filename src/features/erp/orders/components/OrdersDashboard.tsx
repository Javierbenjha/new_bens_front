import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus, Eye, MoreVertical } from "lucide-react";
import { GenericTable, type Column } from "@/components/shared/GenericTable";
import { GenericModal } from "@/components/shared/GenericModal";
import { useOrders } from "../hooks/useOrders";
import type { Order } from "../types/orders.type";

export const OrdersDashboard = () => {
    const { orders, isLoading, fetchOrders } = useOrders();
    const [isModalOpen, setIsModalOpen] = useState(false);  

    useEffect(() => {
        fetchOrders();
    }, []);

    const columns: Column<Order>[] = [
        {
            header: "Orden ID",
            render: (item) => <span className="font-medium text-slate-900">#{item.id}</span>
        },
        { header: "Cliente", key: "customer" },
        { header: "Fecha", key: "date" },
        {
            header: "Total",
            render: (item) => <span className="font-semibold">S/ {item.total?.toFixed(2) || "0.00"}</span>
        },
        {
            header: "Estado",
            render: (item) => (
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${item.status === 'Completado' ? 'bg-emerald-100 text-emerald-700' :
                    item.status === 'Pendiente' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-700'
                    }`}>
                    {item.status}
                </span>
            )
        },
        {
            header: "Acciones",
            render: () => (
                <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Gestión de Pedidos"
                description="Visualiza y administra los pedidos de tus clientes."
                action={
                    <GenericModal
                        title="Crear Nuevo Pedido"
                        description="Complete los datos detallados para registrar una nueva orden de venta."
                        isOpen={isModalOpen}
                        onOpenChange={setIsModalOpen}
                        trigger={
                            <Button className="shadow-sm" disabled={isLoading}>
                                <Plus className="w-4 h-4 mr-2" /> Nuevo Pedido
                            </Button>
                        }
                    >
                        <div className="py-6 flex flex-col items-center justify-center text-center space-y-2">
                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                                <Plus className="w-6 h-6 text-slate-400" />
                            </div>
                            <h3 className="font-medium text-slate-900">Formulario en desarrollo</h3>
                            <p className="text-sm text-slate-500 max-w-[250px]">
                                Pronto podrás configurar clientes, artículos y totales desde aquí.
                            </p>
                        </div>
                    </GenericModal>
                }
            />

            <Card className="border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-white border-b border-slate-100">
                    <CardTitle className="text-lg">Listado de Pedidos</CardTitle>
                    <CardDescription>Resumen de las transacciones recientes del sistema.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <GenericTable columns={columns} data={orders} />
                </CardContent>
            </Card>
        </div>
    );
};

export default OrdersDashboard;
