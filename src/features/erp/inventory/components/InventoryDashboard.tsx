import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Link } from "react-router-dom";
import { useInventory } from "../hooks/useInventory";

export const InventoryDashboard = () => {
    const { products, isLoadingProducts, fetchInventoryProducts } = useInventory();

    useEffect(() => {
        fetchInventoryProducts();
    }, []);

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
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Precio</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoadingProducts ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                                        Cargando productos...
                                    </TableCell>
                                </TableRow>
                            ) : products.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                                        No hay productos registrados.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell className="font-medium">#{product.id}</TableCell>
                                        <TableCell>{product.nombre}</TableCell>
                                        <TableCell>{product.cantidad}</TableCell>
                                        <TableCell>S/ {Number(product.precio).toFixed(2)}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.cantidad > 20 ? "bg-green-100 text-green-800" :
                                                product.cantidad > 0 ? "bg-yellow-100 text-yellow-800" :
                                                    "bg-red-100 text-red-800"
                                                }`}>
                                                {product.cantidad > 0 ? "En Stock" : "Agotado"}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">Editar</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};
