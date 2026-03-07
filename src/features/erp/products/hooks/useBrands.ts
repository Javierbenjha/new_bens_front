import { useState, useEffect } from "react";
import { getBrands, createBrand } from "../services/brands.service";

export interface BrandOption {
    value: string;
    label: string;
}

export const useBrands = () => {
    const [brands, setBrands] = useState<BrandOption[]>([]);
    const [isLoadingBrands, setIsLoadingBrands] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                setIsLoadingBrands(true);
                setError(null);
                const data = await getBrands();

                const formatted = data.map((item) => ({
                    value: String(item.id),
                    label: item.name || item.nombre || item.title || "Sin nombre",
                }));

                setBrands(formatted);
            } catch (err: any) {
                console.error("Error al cargar marcas:", err);
                setError(err.message || "Error al conectar con la API");
            } finally {
                setIsLoadingBrands(false);
            }
        };

        fetchBrands();
    }, []);

    const addBrandToAPI = async (name: string): Promise<BrandOption | null> => {
        try {
            const newBrandData = await createBrand(name);
            const newOption = {
                value: String(newBrandData.id),
                label: newBrandData.name || newBrandData.nombre || newBrandData.title || name,
            };

            // Actualizamos el estado local para que aparezca en el Select
            setBrands((prev) => [...prev, newOption]);
            return newOption;
        } catch (err) {
            console.error("Error al crear marca:", err);
            return null; // El componente puede decidir cómo manejar el error
        }
    };

    return {
        brands,
        isLoadingBrands,
        error,
        addBrandToAPI,
    };
};
