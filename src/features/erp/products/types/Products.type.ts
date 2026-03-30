export interface Product {
    id: string | number;
    nombre: string;
    precio: number;
    cantidad: number;
    color: string[];
    tallas: string[];
    imagenes?: string[];
    sku: string;
    descripcion: string;
    descuento: number;
    valorDescuento: number;
    categoria?: { id: number; nombre: string };
    marca?: { id: number; nombre: string };
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
    descripcion: string;
    descuento: number;
    valorDescuento: number;
}