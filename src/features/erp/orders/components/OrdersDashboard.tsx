import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus, Eye, MoreVertical } from "lucide-react";
import { GenericTable, type Column } from "@/components/shared/GenericTable";
import { GenericPagination } from "@/components/shared/GenericPagination";
import { GenericModal } from "@/components/shared/GenericModal";
import { useOrders } from "../hooks/useOrders";
import { OrderForm } from "./OrderForm";
import { EstadoPedido, type Order, type CreateOrderDto } from "../types/orders.type";

const estadoBadge = (estado: EstadoPedido) => {
    const map: Record<EstadoPedido, { bg: string; text: string; label: string }> = {
        [EstadoPedido.PENDIENTE]:  { bg: "bg-amber-100",   text: "text-amber-700",   label: "Pendiente"   },
        [EstadoPedido.PROCESANDO]: { bg: "bg-blue-100",    text: "text-blue-700",    label: "Procesando"  },
        [EstadoPedido.PAGADO]:      { bg: "bg-emerald-100", text: "text-emerald-700", label: "Pagado"      },
        [EstadoPedido.ENTREGADO]:  { bg: "bg-indigo-100",  text: "text-indigo-700",  label: "Entregado"   },
        [EstadoPedido.CANCELADO]:   { bg: "bg-rose-100",    text: "text-rose-700",    label: "Cancelado"   },
    };
    const s = map[estado] ?? { bg: "bg-slate-100", text: "text-slate-700", label: estado };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
            {s.label}
        </span>
    );
};

export const OrdersDashboard = () => {
    const { orders, isLoading, fetchOrders, addOrder } = useOrders();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleCreateOrder = async (dto: CreateOrderDto) => {
        const result = await addOrder(dto);
        if (result) {
            setIsModalOpen(false);
            fetchOrders(); // Refresh list
        }
    };

    const columns: Column<Order>[] = [
        {
            header: "Orden ID",
            render: (item) => <span className="font-medium text-slate-900">#{item.id}</span>
        },
        {
            header: "Cliente",
            render: (item) => (
                <span className="text-slate-700">
                    {item.cliente ? `${item.cliente.nombre} ${item.cliente.apellido}` : `Cliente #${item.clienteId}`}
                </span>
            )
        },
        {
            header: "Comprobante",
            render: (item) => (
                <span className="text-slate-500 text-xs uppercase">
                    {item.tipoDocumento?.abreviatura || "N/A"}
                </span>
            )
        },
        {
            header: "Pago",
            render: (item) => (
                <span className="text-slate-500 text-xs">
                    {item.medioPago?.nombre || "N/A"}
                </span>
            )
        },
        {
            header: "Total",
            render: (item) => (
                <span className="font-semibold text-indigo-700">S/ {Number(item.total).toFixed(2)}</span>
            )
        },
        {
            header: "Estado",
            render: (item) => estadoBadge(item.estado)
        },
        {
            header: "Fecha",
            render: (item) => (
                <span className="text-slate-400 text-xs">
                    {new Date(item.createdAt).toLocaleDateString("es-PE")}
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

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(orders.length / itemsPerPage);
    
    const paginatedOrders = orders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="space-y-6">
            <PageHeader
                title="Gestión de Pedidos"
                description="Visualiza y administra los pedidos de tus clientes."
                action={
                    <GenericModal
                        title="Crear Nuevo Pedido"
                        description="Completa los datos del cliente, productos e información de entrega."
                        isOpen={isModalOpen}
                        onOpenChange={setIsModalOpen}
                        size="lg"
                        trigger={
                            <Button className="shadow-sm" disabled={isLoading}>
                                <Plus className="w-4 h-4 mr-2" /> Nuevo Pedido
                            </Button>
                        }
                    >
                        <OrderForm
                            onSuccess={handleCreateOrder}
                            onCancel={() => setIsModalOpen(false)}
                        />
                    </GenericModal>
                }
            />

            <Card className="border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-white border-b border-slate-100">
                    <CardTitle className="text-lg">Listado de Pedidos</CardTitle>
                    <CardDescription>Resumen de las transacciones recientes del sistema.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="pl-6 pr-6">
                        <GenericTable columns={columns} data={paginatedOrders} />
                        
                        <div className="mt-6 border-t border-slate-100 pt-2">
                            <GenericPagination 
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default OrdersDashboard;
