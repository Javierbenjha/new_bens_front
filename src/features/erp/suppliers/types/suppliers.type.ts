export interface Supplier {
    id: string;
    name: string;
    ruc: string;
    category: string;
    contact: string;
}

export interface CreateSupplierDto {
    name: string;
    ruc: string;
    category: string;
    contact: string;
}
