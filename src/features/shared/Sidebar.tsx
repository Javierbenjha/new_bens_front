import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, ShoppingCart, PackageSearch, Settings, Package, ShoppingBag, ClipboardList, Truck, UserCircle, PackagePlus } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";

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
    const { isCollapsed } = useSidebar();

    return (
        <aside className={`${isCollapsed ? "w-20" : "w-64"} bg-white text-black flex flex-col transition-all duration-300 ease-in-out border-r border-slate-200`}>
            <div className="h-16 flex items-center justify-center overflow-hidden whitespace-nowrap px-4">
                <h1 className={`text-xl font-bold tracking-wider transition-opacity duration-300 ${isCollapsed ? "opacity-0" : "opacity-100"}`}>
                    {isCollapsed ? "ERP" : "ERP System"}
                </h1>
                {isCollapsed && (
                    <>
                        <div className="h-8 w-px bg-slate-200 mx-2"></div>
                        <div className="font-bold text-indigo-600">ERP</div>
                    </>
                )}
            </div>

            <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
                <ul className={`space-y-1 ${isCollapsed ? "px-2" : "px-4"}`}>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== "/admin");

                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    title={isCollapsed ? item.label : ""}
                                    className={`flex rounded-xl items-center transition-all duration-200 ${isCollapsed ? "justify-center px-0 py-3" : "px-4 py-3"} ${isActive
                                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 shrink-0 ${isCollapsed ? "" : "mr-3"}`} />
                                    <span className={`transition-all duration-300 origin-left ${isCollapsed ? "w-0 scale-0 opacity-0" : "w-auto scale-100 opacity-100"}`}>
                                        {item.label}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

