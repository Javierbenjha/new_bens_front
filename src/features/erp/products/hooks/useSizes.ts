import { useState, useEffect } from "react";
import { getSizes, createSize } from "../services/size.service";

export interface SizeOption {
    value: string;
    label: string;
}

export const useSizes = () => {
    const [sizes, setSizes] = useState<SizeOption[]>([]);
    const [isLoadingSizes, setIsLoadingSizes] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSizes = async () => {
            try {
                setIsLoadingSizes(true);
                setError(null);
                const data = await getSizes();

                const formatted = data.map((item) => ({
                    value: String(item.id),
                    label: item.nombre || "Sin nombre",
                }));

                setSizes(formatted);
            } catch (err: any) {
                console.error("Error al cargar tallas:", err);
                setError(err.message || "Error al conectar con la API");
            } finally {
                setIsLoadingSizes(false);
            }
        };

        fetchSizes();
    }, []);

    const addSizeToAPI = async (name: string): Promise<SizeOption | null> => {
        try {
            const newSizeData = await createSize(name);
            const newOption = {
                value: String(newSizeData.id),
                label: newSizeData.nombre || name,
            };

            setSizes((prev) => [...prev, newOption]);
            return newOption;
        } catch (err) {
            console.error("Error al crear talla:", err);
            return null;
        }
    };

    return {
        sizes,
        isLoadingSizes,
        error,
        addSizeToAPI,
    };
};
