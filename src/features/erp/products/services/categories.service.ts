import axios from "axios";
import type { Category } from "../types/Categories.type";

export const getCategories = async (): Promise<Category[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
    return response.data;
};

export const createCategory = async (name: string): Promise<Category> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/categories`, { nombre: name });
    return response.data;
};
