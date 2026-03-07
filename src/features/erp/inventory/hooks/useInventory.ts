import { useState } from "react";
import { getInventoryProducts } from "../services/inventory.service";
import type { Product } from "../../products/types/Products.type";

export const useInventory = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);

    const fetchInventoryProducts = async () => {
        setIsLoadingProducts(true);
        try {
            const data = await getInventoryProducts();
            setProducts(data);
        } catch (error) {
            console.error("Error al obtener productos para inventario:", error);
        } finally {
            setIsLoadingProducts(false);
        }
    };

    return { products, isLoadingProducts, fetchInventoryProducts };
};
