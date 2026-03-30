import axios from "axios";
import type { Customer, CreateCustomerDto } from "../types/customers.type";

export const getCustomers = async (): Promise<Customer[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/clients`);
    return response.data;
};

export const createCustomer = async (dto: CreateCustomerDto): Promise<Customer> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/clients`, dto);
    return response.data;
};
