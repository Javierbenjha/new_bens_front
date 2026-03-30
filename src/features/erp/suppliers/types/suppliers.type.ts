export interface Supplier {
  id?: number;
  documento: string;
  descripcion?: string | null;
  correo: string;
  telefono?: string | null;
  createdAt?: Date;
}

export interface CreateSupplierDto {
  documento: string;
  descripcion?: string | null;
  correo: string;
  telefono?: string | null;
}


