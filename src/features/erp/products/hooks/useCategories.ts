import { useState, useEffect } from "react";
import { getCategories, createCategory } from "../services/categories.service";

export interface CategoryOption {
    value: string;
    label: string;
}

export const useCategories = () => {
    const [categories, setCategories] = useState<CategoryOption[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setIsLoadingCategories(true);
                setError(null);
                const data = await getCategories();

                const formatted = data.map((item) => ({
                    value: String(item.id),
                    label: item.name || item.nombre || item.title || "Sin nombre",
                }));

                setCategories(formatted);
            } catch (err: any) {
                console.error("Error al cargar categorías:", err);
                setError(err.message || "Error al conectar con la API");
            } finally {
                setIsLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

    const addCategoryToAPI = async (name: string): Promise<CategoryOption | null> => {
        try {
            const newCategoryData = await createCategory(name);
            const newOption = {
                value: String(newCategoryData.id),
                label: newCategoryData.name || newCategoryData.nombre || newCategoryData.title || name,
            };

            // Actualizamos el estado local para que aparezca en el Select
            setCategories((prev) => [...prev, newOption]);
            return newOption;
        } catch (err) {
            console.error("Error al crear categoría:", err);
            return null;
        }
    };

    return {
        categories,
        isLoadingCategories,
        error,
        addCategoryToAPI,
    };
};
