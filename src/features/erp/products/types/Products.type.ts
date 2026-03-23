export interface Product {
    id: string | number;
    nombre: string;
    precio: number;
    cantidad: number;
    categoriaId: number;
    marcaId: number;
    color: string[];
    tallas: string[];
    imagenes?: string[];
    sku: string;
    hasDiscount: boolean;
    discountValue: number;
}

export interface CreateProductDto {
    nombre: string;
    precio: number;
    cantidad: number;
    categoriaId: number;
    marcaId: number;
    color: string[];
    tallas: string[];
    imagenes?: string[];
    sku: string;
    hasDiscount: boolean;
    discountValue: number;
}