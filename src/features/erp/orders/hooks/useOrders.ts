import { useState } from "react";
import { getOrders, createOrder } from "../services/orders.service";
import type { Order, CreateOrderDto } from "../types/orders.type";

export const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const data = await getOrders();
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const addOrder = async (dto: CreateOrderDto) => {
        try {
            const newOrder = await createOrder(dto);
            setOrders((prev) => [...prev, newOrder]);
            return newOrder;
        } catch (error) {
            console.error("Error creating order:", error);
            return null;
        }
    };

    return { orders, isLoading, fetchOrders, addOrder };
};
