import type { Sale } from '../types/sales.type';

export const MOCK_SALES: Sale[] = [
    {
        id: 'SAL-2026-001',
        orderId: 'ORD-2026-001',
        customer: 'Juan Pérez',
        date: '2026-03-20T10:35:00Z',
        totalAmount: 1250.50,
        paymentMethod: 'credit_card',
        status: 'completed'
    },
    {
        id: 'SAL-2026-002',
        customer: 'Cliente Mostrador 1',
        date: '2026-03-21T09:10:00Z',
        totalAmount: 150.00,
        paymentMethod: 'cash',
        status: 'completed'
    },
    {
        id: 'SAL-2026-003',
        orderId: 'ORD-2026-006',
        customer: 'Luis Fernández',
        date: '2026-03-23T15:35:00Z',
        totalAmount: 320.00,
        paymentMethod: 'bank_transfer',
        status: 'completed'
    },
    {
        id: 'SAL-2026-004',
        customer: 'Cliente Mostrador 2',
        date: '2026-03-23T17:00:00Z',
        totalAmount: 85.50,
        paymentMethod: 'cash',
        status: 'refunded'
    },
    {
        id: 'SAL-2026-005',
        customer: 'Comercial ABC',
        date: '2026-03-23T18:20:00Z',
        totalAmount: 5400.00,
        paymentMethod: 'paypal',
        status: 'completed'
    }
];
