import { useState } from "react";
import { getItems, createItem } from "../services/items.service";
import type { Item, CreateItemDto } from "../types/items.type";

export const useItems = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchItems = async () => {
        setIsLoading(true);
        try {
            const data = await getItems();
            setItems(data);
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const addItem = async (dto: CreateItemDto) => {
        try {
            const newItem = await createItem(dto);
            setItems((prev) => [...prev, newItem]);
            return newItem;
        } catch (error) {
            console.error("Error creating item:", error);
            return null;
        }
    };

    return { items, isLoading, fetchItems, addItem };
};
