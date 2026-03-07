import { useState } from "react";
import { getSuppliers, createSupplier } from "../services/suppliers.service";
import type { Supplier, CreateSupplierDto } from "../types/suppliers.type";

export const useSuppliers = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchSuppliers = async () => {
        setIsLoading(true);
        try {
            const data = await getSuppliers();
            setSuppliers(data);
        } catch (error) {
            console.error("Error fetching suppliers:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const addSupplier = async (dto: CreateSupplierDto) => {
        try {
            const newSupplier = await createSupplier(dto);
            setSuppliers((prev) => [...prev, newSupplier]);
            return newSupplier;
        } catch (error) {
            console.error("Error creating supplier:", error);
            return null;
        }
    };

    return { suppliers, isLoading, fetchSuppliers, addSupplier };
};
