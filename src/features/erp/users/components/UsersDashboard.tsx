import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { GenericTable, type Column } from "@/components/shared/GenericTable";
import { GenericModal } from "@/components/shared/GenericModal";
import { PageHeader } from "@/components/shared/PageHeader";

export const UsersDashboard = () => {
    // Mock data para usuarios
    const users = [
        { id: "1", name: "Admin Principal", email: "admin@empresa.com", role: "Super Admin", status: "Activo" },
        { id: "2", name: "Juan Pérez", email: "juan@empresa.com", role: "Vendedor", status: "Activo" },
        { id: "3", name: "María Gómez", email: "maria@empresa.com", role: "Inventario", status: "Inactivo" },
    ];

    const columns: Column<typeof users[0]>[] = [
        { header: "Nombre", key: "name" },
        { header: "Correo Electrónico", key: "email" },
        { header: "Rol", key: "role" },
        {
            header: "Estado",
            render: (user) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.status}
                </span>
            )
        },
    ];



    return (
        <div className="space-y-6">
            <PageHeader
                title="Usuarios"
                description="Gestiona los accesos y roles del sistema."
                action={
                    <GenericModal
                        title="Añadir Usuario"
                        description="Crea un nuevo usuario y asígnale un rol."
                        trigger={<Button>+ Nuevo Usuario</Button>}
                    >
                        <div className="py-4 text-sm text-slate-500">
                            Formulario de creación de usuario (Próximamente)
                        </div>
                    </GenericModal>
                }
            />

            <Card>
                <CardHeader>
                    <CardTitle>Listado de Usuarios</CardTitle>
                    <CardDescription>
                        <div className="flex max-w-sm items-center space-x-2 mt-2">
                            <Input type="text" placeholder="Buscar por nombre o correo..." />
                            <Button type="submit" variant="secondary">
                                <Search className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <GenericTable columns={columns} data={users} />
                </CardContent>
            </Card>
        </div>
    );
};
