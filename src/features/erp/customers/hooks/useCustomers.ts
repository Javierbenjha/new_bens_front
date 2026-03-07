import { useState } from "react";
import { getCustomers, createCustomer } from "../services/customers.service";
import type { Customer, CreateCustomerDto } from "../types/customers.type";

export const useCustomers = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCustomers = async () => {
        setIsLoading(true);
        try {
            const data = await getCustomers();
            setCustomers(data);
        } catch (error) {
            console.error("Error fetching customers:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const addCustomer = async (dto: CreateCustomerDto) => {
        try {
            const newCustomer = await createCustomer(dto);
            setCustomers((prev) => [...prev, newCustomer]);
            return newCustomer;
        } catch (error) {
            console.error("Error creating customer:", error);
            return null;
        }
    };

    return { customers, isLoading, fetchCustomers, addCustomer };
};
