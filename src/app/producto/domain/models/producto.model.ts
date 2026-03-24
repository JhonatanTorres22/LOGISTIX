import { ListarMarca } from "@/marca/domain/models/marca.model";

export interface ProductoCategoria {
    idCategoria: number,
    nombre : string,
    descripcion: string
    productos : Producto[]
}
export class Producto {
    constructor(
        public id: number,
        public nombreProducto: string,
        public modeloProducto: string,
        public descripcionProducto: string,
        public tipo : string,
        public unidad: string,
        public precioReferencial: number,
        public urlImagen: string,
        public marca : ListarMarca |null,
        public asignadoAlmacen? : boolean

    ) { }
}

export type EditarProducto = Omit<Producto, 'precioReferencial' |'marca'> & {idCategoria : number; idMarca :number |undefined}
export type CrearProducto = Omit<EditarProducto, 'id'>
export type EliminarProducto = Pick<Producto, 'id'>
export type TablaProductoCategoria =
  Producto & Omit<ProductoCategoria, 'productos'>;



export interface DataProducto {
    data: ProductoCategoria[]
    isSuccess: boolean,
    message: string,
    errors: null | string
}

export interface ResponseProducto{
     data: boolean;
    errors: any;
    isSuccess: boolean;
    message: string;
}


/* PRODUCTOS NO VÁLIDOS */
export interface DataProductosNoValidosDTO {
    data : ListarProductosNoValidosDTO[],
    isSuccess: boolean,
    message: string,
    errors: null | string
}

export interface ListarProductosNoValidosDTO {
    codigoProductoServicio : number,
    nombre : string,
    url : string,
    proveedores: ListarProveedoresProductosNoValidosDTO[]
}

export interface ListarProveedoresProductosNoValidosDTO {
    codigoProveedor: number,
    nombreLegal : string,
    precioReferencial : number,
    estadoEvaluacion : string
}