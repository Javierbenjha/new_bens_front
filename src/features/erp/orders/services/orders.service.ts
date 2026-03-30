import axios from "axios";
import type { Order, CreateOrderDto, MedioPago, TipoDocumento } from "../types/orders.type";

const API_URL = import.meta.env.VITE_API_URL;

export const getOrders = async (): Promise<Order[]> => {
    // Para desarrollo usaremos los mocks por ahora si el backend no está listo
    try {
        const response = await axios.get(`${API_URL}/pedidos`);
        return response.data;
    } catch (error) {
        console.warn("Backend not ready, using mocks", error);
        const { MOCK_ORDERS } = await import("../data/mock-orders");
        return MOCK_ORDERS;
    }
};

export const createOrder = async (dto: CreateOrderDto): Promise<Order> => {
    const response = await axios.post(`${API_URL}/pedidos`, dto);
    return response.data;
};

export const getMediosPago = async (): Promise<MedioPago[]> => {
    try {
        const response = await axios.get(`${API_URL}/medio-pago`);
        return response.data;
    } catch (error) {
        console.warn("MedioPago endpoint not ready, using empty list", error);
        return [];
    }
};

export const getTiposDocumento = async (): Promise<TipoDocumento[]> => {
    try {
        const response = await axios.get(`${API_URL}/tipo-documento`);
        return response.data;
    } catch (error) {
        console.warn("TipoDocumento endpoint not ready, using empty list", error);
        return [];
    }
};
