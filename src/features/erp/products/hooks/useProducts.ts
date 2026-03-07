import { useState } from "react";
import { createProduct, getProducts } from "../services/products.service";
import type { Product, CreateProductDto } from "../types/Products.type";

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [isSavingProduct, setIsSavingProduct] = useState(false);

    const fetchProducts = async () => {
        setIsLoadingProducts(true);
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        } finally {
            setIsLoadingProducts(false);
        }
    };

    const addProductToAPI = async (dto: CreateProductDto): Promise<Product | null> => {
        setIsSavingProduct(true);
        try {
            const newProduct = await createProduct(dto);
            setProducts((prev) => [...prev, newProduct]);
            return newProduct;
        } catch (error) {
            console.error("Error al crear producto:", error);
            return null;
        } finally {
            setIsSavingProduct(false);
        }
    };

    return { products, isLoadingProducts, isSavingProduct, fetchProducts, addProductToAPI };
};
