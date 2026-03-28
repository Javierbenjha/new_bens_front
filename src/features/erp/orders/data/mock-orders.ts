import type { Order } from '../types/orders.type';

export const MOCK_ORDERS: Order[] = [
    {
        id: 'ORD-2026-001',
        customer: 'Juan Pérez',
        date: '2026-03-20T10:30:00Z',
        total: 1250.50,
        status: 'completed'
    },
    {
        id: 'ORD-2026-002',
        customer: 'María García',
        date: '2026-03-21T14:15:00Z',
        total: 3400.00,
        status: 'pending'
    },
    {
        id: 'ORD-2026-003',
        customer: 'Carlos López',
        date: '2026-03-22T09:45:00Z',
        total: 850.75,
        status: 'processing'
    },
    {
        id: 'ORD-2026-004',
        customer: 'Ana Martínez',
        date: '2026-03-22T16:20:00Z',
        total: 4500.00,
        status: 'cancelled'
    },
    {
        id: 'ORD-2026-005',
        customer: 'Empresa XYZ S.A.',
        date: '2026-03-23T11:00:00Z',
        total: 12500.00,
        status: 'pending'
    },
    {
        id: 'ORD-2026-006',
        customer: 'Luis Fernández',
        date: '2026-03-23T15:30:00Z',
        total: 320.00,
        status: 'completed'
    }
];
