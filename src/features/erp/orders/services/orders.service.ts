import axios from "axios";
import type { Order, CreateOrderDto } from "../types/orders.type";

import { MOCK_ORDERS } from "../data/mock-orders";

export const getOrders = async (): Promise<Order[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_ORDERS), 500);
    });
};

export const createOrder = async (dto: CreateOrderDto): Promise<Order> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/orders`, dto);
    return response.data;
};
