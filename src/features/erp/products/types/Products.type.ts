export interface Product {
    id: string | number;
    nombre: string;
    precio: number;
    cantidad: number;
    categoriaId: number;
    marcaId: number;
    color: string[];
    tallas: string[];
}

export interface CreateProductDto {
    nombre: string;
    precio: number;
    cantidad: number;
    categoriaId: number;
    marcaId: number;
    color: string[];
    tallas: string[];
}