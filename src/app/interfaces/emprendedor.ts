import { Empresa } from "./empresa";
import { Plantillas } from "./plantillas";
import { Producto } from "./producto";

export interface Emprendedor {
    nombre: string;
    imagen: string;
    cedula: number;
    descripcion: string;
    calendario: string;
    whatsapp: string;
    QueOfrezco: 'productos' | 'servicios';
    MisProductos: Producto[]
    MiEmpresa: Empresa
    Plantillas: Plantillas
}
