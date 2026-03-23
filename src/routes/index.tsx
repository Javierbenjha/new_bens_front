import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { StoreLayout } from "../layouts/StoreLayout";
import { ERPLayout } from "../layouts/ERPLayout";
import { InventoryDashboard } from "@/features/erp/inventory/components/InventoryDashboard";
import { SalesDashboard } from "@/features/erp/sales/components/SalesDashboard";
import { UsersDashboard } from "@/features/erp/users/components/UsersDashboard";
import { ProductsDashboard } from "@/features/erp/products/components/ProductsDashboard";
import { OrdersDashboard } from "@/features/erp/orders/components/OrdersDashboard";
import { CustomersDashboard } from "@/features/erp/customers/components/CustomersDashboard";
import { SuppliersDashboard } from "@/features/erp/suppliers/components/SuppliersDashboard";
import { ItemsDashboard } from "@/features/erp/items/components/ItemsDashboard";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { HomePage } from "@/pages/ecommerce/HomePage";

// Tipos básicos para los modulos

const ERPDashboard = () => <div className="p-4 bg-white rounded-lg shadow"><h2 className="text-2xl font-bold mb-4">Dashboard General</h2><p>Resumen de métricas clave del sistema.</p></div>;

const router = createBrowserRouter([
    // Rutas Públicas - Ecommerce
    {
        path: "/",
        element: <StoreLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            // Aquí irían las rutas de carrito, checkout, producto individual, etc.
        ],
    },

    // Rutas Privadas - ERP (Sistema Interno)
    {
        path: "/admin",
        element: <ERPLayout />,
        children: [
            {
                index: true,
                element: <ERPDashboard />,
            },
            {
                path: "users",
                element: <UsersDashboard />,
            },
            {
                path: "products",
                element: <ProductsDashboard />,
            },
            {
                path: "inventory",
                element: <InventoryDashboard />,
            },
            {
                path: "orders",
                element: <OrdersDashboard />,
            },
            {
                path: "sales",
                element: <SalesDashboard />,
            },
            {
                path: "purchases",
                element: <div className="p-4 bg-white rounded-lg shadow"><h2 className="text-2xl font-bold mb-4">Módulo de Compras</h2><p>Aquí se gestionarán las compras a proveedores.</p></div>,
            },
            {
                path: "items",
                element: <ItemsDashboard />,
            },
            {
                path: "customers",
                element: <CustomersDashboard />,
            },
            {
                path: "suppliers",
                element: <SuppliersDashboard />,
            },
            {
                path: "settings",
                element: <div className="p-4 bg-white rounded-lg shadow"><h2 className="text-2xl font-bold mb-4">Configuración del Sistema</h2></div>,
            }
        ],
    },

    // Rutas Auth y 404
    {
        path: "/login",
        element: <LoginForm />,
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
]);

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};
