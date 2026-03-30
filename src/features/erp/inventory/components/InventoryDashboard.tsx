import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, PackageOpen, Edit2 } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Link } from "react-router-dom";
import { useInventory } from "../hooks/useInventory";
import { GenericTable } from "@/components/shared/GenericTable";
import { GenericPagination } from "@/components/shared/GenericPagination";
import type { Column } from "@/components/shared/GenericTable";
import type { Product } from "../../products/types/Products.type";

export const InventoryDashboard = () => {
    const { products, isLoadingProducts, fetchInventoryProducts } = useInventory();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(products.length / 10) || 1; // Ejemplo de paginación local (10 por página)

    useEffect(() => {
        fetchInventoryProducts();
    }, []);

    const columns: Column<Product>[] = [
        { 
            header: "SKU", 
            headerClassName: "w-[100px] text-xs uppercase tracking-wider",
            render: (p) => <span className="font-mono text-slate-400 text-xs font-semibold leading-none">#{p.sku}</span> 
        },
        { 
            header: "Producto", 
            headerClassName: "min-w-[200px]",
            render: (p) => (
                <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-slate-800 text-sm leading-tight">{p.nombre}</span>
                    <span className="text-xs text-slate-500 line-clamp-1">{p.descripcion || "Sin descripción"}</span>
                </div>
            )
        },
        { 
            header: "Stock", 
            headerClassName: "text-center w-[90px]",
            className: "text-center",
            render: (p) => (
                <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
                    p.cantidad < 10 
                        ? "bg-rose-50 text-rose-600 border border-rose-100" 
                        : "bg-slate-50 text-slate-700 border border-slate-100"
                }`}>
                    {p.cantidad} <span className="text-xs font-medium opacity-70">und.</span>
                </span>
            )
        },
        {
            header: "Categoría",
            headerClassName: "hidden md:table-cell",
            className: "hidden md:table-cell text-slate-500 text-xs font-medium",
            render: (p) => p.categoria?.nombre || "-"
        },
        {
            header: "Marca",
            headerClassName: "hidden md:table-cell",
            className: "hidden md:table-cell text-slate-500 text-xs font-medium",
            render: (p) => p.marca?.nombre || "-"
        },
        { 
            header: "Precio", 
            headerClassName: "text-right w-[100px]",
            className: "text-right font-mono text-sm font-bold text-slate-700",
            render: (p) => `S/ ${Number(p.precio).toFixed(2)}`
        },
        {
            header: "Dcto.",
            headerClassName: "text-right w-[80px]",
            className: "text-right",
            render: (p) => (
                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    Number(p.valorDescuento) > 0 
                        ? "text-emerald-600 bg-emerald-50" 
                        : "text-rose-600 bg-rose-50"
                }`}>
                    {Number(p.valorDescuento).toFixed(1)}%
                </span>
            ) 
        },
        {
            header: "Estado",
            headerClassName: "text-center w-[110px]",
            className: "text-center",
            render: (p) => (
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-tighter border ${
                    p.cantidad > 20 
                        ? "bg-green-500/10 text-green-700 border-green-200" 
                        : p.cantidad > 0 
                            ? "bg-amber-500/10 text-amber-700 border-amber-200" 
                            : "bg-rose-500/10 text-rose-700 border-rose-200"
                }`}>
                    <span className={`mr-1 w-1 h-1 rounded-full ${
                        p.cantidad > 20 ? "bg-green-500" : p.cantidad > 0 ? "bg-amber-500" : "bg-rose-500"
                    }`} />
                    {p.cantidad > 0 ? "DISPONIBLE" : "AGOTADO"}
                </span>
            )
        },
        {
            header: "",
            headerClassName: "w-[60px]",
            render: () => (
                <div className="flex justify-end pr-2">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors">
                        <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Inventario"
                description="Gestiona tus productos y existencias."
                action={
                    <Button asChild>
                        <Link to="/admin/products">
                            <Plus className="w-4 h-4 mr-2" /> Agregar Producto
                        </Link>
                    </Button>
                }
            />

            <Card>
                <CardHeader>
                    <CardTitle>Listado de Productos</CardTitle>
                    <CardDescription>
                        <div className="flex max-w-sm items-center space-x-2 mt-2">
                            <Input type="text" placeholder="Buscar por nombre o ID..." />
                            <Button type="submit" variant="secondary">
                                <Search className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                    {isLoadingProducts ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-slate-50/30">
                            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
                            <p className="text-sm font-medium text-slate-500">Cargando inventario...</p>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                            <PackageOpen className="w-12 h-12 mb-3 opacity-20" />
                            <p className="text-sm font-medium">No hay productos registrados en el inventario.</p>
                            <Button variant="outline" size="sm" className="mt-4" asChild>
                                <Link to="/admin/products">Agregar primer producto</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <GenericTable columns={columns} data={products.slice((currentPage - 1) * 10, currentPage * 10)} />
                            <div className="p-4 border-t bg-slate-50/50">
                                <GenericPagination 
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
