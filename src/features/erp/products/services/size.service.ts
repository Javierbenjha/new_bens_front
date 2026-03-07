import axios from "axios";
import type { SizeResponse } from "../types/size.type";

export const getSizes = async (): Promise<SizeResponse[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/size`);
    return response.data;
};

export const createSize = async (nombre: string): Promise<SizeResponse> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/size`, { nombre });
    return response.data;
};
