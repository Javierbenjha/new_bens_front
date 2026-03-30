import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, PackageOpen, MoreVertical, Edit2 } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Link } from "react-router-dom";
import { useInventory } from "../hooks/useInventory";
import { GenericTable } from "@/components/shared/GenericTable";
import type { Column } from "@/components/shared/GenericTable";
import type { Product } from "../../products/types/Products.type";

export const InventoryDashboard = () => {
    const { products, isLoadingProducts, fetchInventoryProducts } = useInventory();

    useEffect(() => {
        fetchInventoryProducts();
    }, []);

    const columns: Column<Product>[] = [
        { 
            header: "sku", 
            render: (p) => <span className="font-mono text-slate-500 text-xs">#{p.sku}</span> 
        },
        { 
            header: "Nombre del Producto", 
            render: (p) => (
                <div className="flex flex-col">
                    <span className="font-semibold text-slate-900">{p.nombre}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{p.descripcion}</span>
                </div>
            )
        },
        { 
            header: "Stock", 
            render: (p) => (
                <span className={`font-bold ${p.cantidad < 10 ? "text-red-500" : "text-slate-700"}`}>
                    {p.cantidad} und.
                </span>
            )
        },
        {
            header: "Categoria",
            render: (p) => (
                <span className="font-medium text-slate-600">
                    {p.categoria?.nombre || "Sin Categoría"}
                </span>
            )
        },
        {
            header: "Marca",
            render: (p) => (
                <span className="font-medium text-slate-600">
                    {p.marca?.nombre || "Sin Marca"}
                </span>
            )
        },
        { 
            header: "Precio", 
            render: (p) => (
                <span className="font-medium text-slate-600">
                    S/ {Number(p.precio).toFixed(2)}
                </span>
            ) 
        },
        {
            header: "Descuento",
            render: (p) => (
                <span className="font-medium text-slate-600">
                    {Number(p.valorDescuento).toFixed(2)}%
                </span>
            ) 
        },
        {
            header: "Estado",
            render: (p) => (
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    p.cantidad > 20 ? "bg-emerald-100 text-emerald-800" :
                    p.cantidad > 0 ? "bg-amber-100 text-amber-800" :
                    "bg-rose-100 text-rose-800"
                }`}>
                    {p.cantidad > 0 ? "En Stock" : "Agotado"}
                </span>
            )
        },
        {
            header: "Acciones",
            render: () => (
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
                        <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                        <MoreVertical className="w-4 h-4" />
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
                <CardContent className="p-0">
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
                        <GenericTable columns={columns} data={products} />
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
