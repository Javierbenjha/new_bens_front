import axios from "axios";
import type { Brand } from "../types/Brand.type";

export const getBrands = async (): Promise<Brand[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/brand`);
    return response.data;
};

export const createBrand = async (name: string): Promise<Brand> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/brand`, { nombre: name });
    return response.data;
};
