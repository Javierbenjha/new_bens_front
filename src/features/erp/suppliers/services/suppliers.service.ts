import axios from "axios";
import type { Supplier, CreateSupplierDto } from "../types/suppliers.type";

export const getSuppliers = async (): Promise<Supplier[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/suppliers`);
    return response.data;
};

export const createSupplier = async (dto: CreateSupplierDto): Promise<Supplier> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/suppliers`, dto);
    return response.data;
};
