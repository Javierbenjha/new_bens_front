import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export const SalesDashboard = () => {
    const dummySales = [
        { id: "V-001", date: "2026-03-02", customer: "Juan Perez", total: "$1,200.00", status: "Completada" },
        { id: "V-002", date: "2026-03-02", customer: "Maria Rodriguez", total: "$450.00", status: "Pendiente" },
        { id: "V-003", date: "2026-03-01", customer: "Empresa Global SA", total: "$5,300.00", status: "Completada" },
        { id: "V-004", date: "2026-03-01", customer: "Luis Gomez", total: "$85.00", status: "Cancelada" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Ventas</h2>
                    <p className="text-muted-foreground">Últimas transacciones y estado de facturación.</p>
                </div>
                <Button>
                    Nueva Venta
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ventas Totales (Hoy)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$1,650.00</div>
                        <p className="text-xs text-muted-foreground">+20% respecto a ayer</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Transacciones (Hoy)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+24</div>
                        <p className="text-xs text-muted-foreground">15 completadas</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Últimas Ventas</CardTitle>
                    <CardDescription>
                        Historial de transacciones recientes.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Factura</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dummySales.map((sale) => (
                                <TableRow key={sale.id}>
                                    <TableCell className="font-medium">{sale.id}</TableCell>
                                    <TableCell>{sale.date}</TableCell>
                                    <TableCell>{sale.customer}</TableCell>
                                    <TableCell>{sale.total}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${sale.status === "Completada" ? "bg-green-100 text-green-800" :
                                                sale.status === "Pendiente" ? "bg-yellow-100 text-yellow-800" :
                                                    "bg-red-100 text-red-800"
                                            }`}>
                                            {sale.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Ver Detalles</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};
