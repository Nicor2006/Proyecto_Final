import { Producto } from "./producto";

export interface Emprendedor {
    nombre: string;
    imagen: string;
    cedula: number;
    nit: number;
    descripcion: string;
    calendario: string;
    whatsapp: string;
    QueOfrezco: 'productos' | 'servicios';
    MisProductos: Producto[]
}
