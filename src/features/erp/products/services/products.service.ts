import axios from "axios";
import type { Product, CreateProductDto } from "../types/Products.type";

export const getProducts = async (): Promise<Product[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
    return response.data;
};

export const createProduct = async (dto: CreateProductDto): Promise<Product> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/products`, dto);
    return response.data;
};