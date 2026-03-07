import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, ShoppingCart, PackageSearch, Settings, Package, ShoppingBag, ClipboardList, Truck, UserCircle, PackagePlus } from "lucide-react";

export const menuItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/users", icon: Users, label: "Usuarios" },
    { path: "/admin/products", icon: Package, label: "Productos" },
    { path: "/admin/inventory", icon: PackageSearch, label: "Inventario" },
    { path: "/admin/orders", icon: ClipboardList, label: "Pedidos" },
    { path: "/admin/sales", icon: ShoppingCart, label: "Ventas" },
    { path: "/admin/purchases", icon: ShoppingBag, label: "Compras" },
    { path: "/admin/items", icon: PackagePlus, label: "Artículos" },
    { path: "/admin/customers", icon: UserCircle, label: "Clientes" },
    { path: "/admin/suppliers", icon: Truck, label: "Proveedores" },
    { path: "/admin/settings", icon: Settings, label: "Configuración" },
];

export const Sidebar = () => {
    const location = useLocation();

    return (
        <aside className="w-64 bg-white text-black flex flex-col">
            <div className="h-16 flex items-center justify-center">
                <h1 className="text-2xl font-bold tracking-wider">ERP System</h1>
            </div>

            <nav className="flex-1 py-4">
                <ul className="space-y-1 p-5 rounded-2xl">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== "/admin");

                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex rounded-xl items-center px-6 py-3 transition-colors ${isActive
                                        ? "bg-primary text-white border-gray-300 border-r-4"
                                        : " hover:bg-slate-200 hover:text-black"
                                        }`}
                                >
                                    <Icon className="w-5 h-5 mr-3" />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};
