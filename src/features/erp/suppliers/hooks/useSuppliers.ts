import { useState } from "react";
import type { Supplier, CreateSupplierDto } from "../types/suppliers.type";

const MOCK_SUPPLIERS: Supplier[] = [
    {
        id: "1",
        name: "Textiles del Norte S.A.",
        ruc: "20123456789",
        category: "Telas y Algodón",
        contact: "Juan Pérez (+51 987 654 321)"
    },
    {
        id: "2",
        name: "Avíos y Botones SAC",
        ruc: "20987654321",
        category: "Accesorios",
        contact: "María García (m.garcia@avios.com)"
    },
    {
        id: "3",
        name: "Logística Express",
        ruc: "20555444333",
        category: "Servicios",
        contact: "Carlos Ruiz (c.ruiz@logexpress.pe)"
    }
];

export const useSuppliers = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchSuppliers = async () => {
        setIsLoading(true);
        // Simulamos una pequeña demora de red para mantener el feeling de la app
        await new Promise((resolve) => setTimeout(resolve, 500));
        setSuppliers(MOCK_SUPPLIERS);
        setIsLoading(false);
    };

    const addSupplier = async (dto: CreateSupplierDto) => {
        // Por ahora simulamos la creación localmente
        const newSupplier: Supplier = {
            id: Math.random().toString(36).substr(2, 9),
            ...dto
        };
        setSuppliers((prev) => [...prev, newSupplier]);
        return newSupplier;
    };

    return { suppliers, isLoading, fetchSuppliers, addSupplier };
};

