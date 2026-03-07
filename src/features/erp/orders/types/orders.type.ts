export interface Order {
    id: string;
    customer: string;
    date: string;
    total: number;
    status: string;
}

export interface CreateOrderDto {
    customerId: string;
    items: { productId: string; quantity: number }[];
}
