import axios from "axios";
import type { Order, CreateOrderDto } from "../types/orders.type";

export const getOrders = async (): Promise<Order[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders`);
    return response.data;
};

export const createOrder = async (dto: CreateOrderDto): Promise<Order> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/orders`, dto);
    return response.data;
};
