export interface Sale {
    id: string;
    orderId?: string;
    customer: string;
    date: string;
    totalAmount: number;
    paymentMethod: 'credit_card' | 'cash' | 'bank_transfer' | 'paypal';
    status: 'completed' | 'refunded';
}
