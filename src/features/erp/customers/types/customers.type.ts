export interface Customer {
    id: number;
    documento: number;
    nombre: string;
    apellido: string;
    correo: string;
    telefono?: string;
    createdAt: string;
}

export interface CreateCustomerDto {
    documento: number;
    nombre: string;
    apellido: string;
    correo: string;
    telefono?: string;
}
