import axios from "axios";
import type { Product } from "../../products/types/Products.type";

export const getInventoryProducts = async (): Promise<Product[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
    return response.data;
};
