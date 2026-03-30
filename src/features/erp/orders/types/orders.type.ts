export const EstadoPedido = {
    PENDIENTE:  'PENDIENTE',
    PROCESANDO: 'PROCESANDO',
    PAGADO:     'PAGADO',
    ENTREGADO:  'ENTREGADO',
    CANCELADO:  'CANCELADO',
} as const;
export type EstadoPedido = typeof EstadoPedido[keyof typeof EstadoPedido];

// ─── Modelos de catálogo (son tablas, no enums) ──────────────────────────────

export interface MedioPago {
    id:        number;
    nombre:    string;
    createdAt: string;
    updatedAt: string;
}

export interface TipoDocumento {
    id:          number;
    nombre:      string;
    abreviatura: string;
    createdAt:   string;
    updatedAt:   string;
}

// ─── Detalle del pedido (refleja Detalle_Pedido de Prisma) ───────────────────

export interface OrderDetail {
    id?:           number;
    pedidoId?:     number;
    productoId:    number;
    // Campo auxiliar solo para la UI (no existe en BD)
    productoNombre?: string;
    cantidad:      number;
    precioUnitario: number;
    descuento:     number;
    subtotal:      number;
}

// ─── Pedido completo ─────────────────────────────────────────────────────────

export interface Order {
    id:             number;
    clienteId:      number;
    cliente?: {
        nombre:   string;
        apellido: string;
    };
    usuarioId?:      number;
    cuponId?:        number;
    subtotal:        number;
    impuesto:        number;
    descuento:       number;
    descuentoCupon:  number;
    total:           number;
    estado:          EstadoPedido;
    medioPagoId?:    number;
    medioPago?:      MedioPago;
    tipoDocumentoId?: number;
    tipoDocumento?:  TipoDocumento;
    direccionEnvio?: string;
    fechaEntrega?:   string;
    observaciones?:  string;
    detalles:        OrderDetail[];
    createdAt:       string;
    updatedAt:       string;
}

// ─── DTO para crear un pedido ─────────────────────────────────────────────────

export interface CreateOrderDto {
    clienteId:       number;
    usuarioId?:      number;
    cuponId?:        number;
    subtotal:        number;
    impuesto:        number;
    descuento:       number;
    descuentoCupon:  number;
    total:           number;
    estado?:         EstadoPedido;
    medioPagoId?:    number;
    tipoDocumentoId?: number;
    direccionEnvio?: string;
    fechaEntrega?:   string;
    observaciones?:  string;
    detalles: Omit<OrderDetail, 'id' | 'pedidoId' | 'productoNombre'>[];
}
