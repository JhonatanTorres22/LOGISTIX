import { ListarMarca } from "@/marca/domain/models/marca.model"

export class ProveedorProducto {
    constructor(
        public idProveedorProducto: number,
        public precio: number,
        public vigencia : string,
        public proveedor: ProveedorPP,
        public producto: ProductoPP,
        
    ) { }
}

export interface ProveedorPP {
    tipoProveedor: string
    nombreRs: string
    ruc: string
    direccionFiscal: string
    estadoEvaluacion : string
}

export interface ProductoPP {
    codigo : number
    nombre: string
    modelo: string
    descripcion: string
    unidadDeMedida: string,
    url: string,
    marca : ListarMarca | null
}

export interface SeleccionarProveedorProducto {
    idSolicitudPedidoDetalle: number,
    cantidad: number,
    unidad: string,
    descripcionDelBien: string,
    precioUnitario: string,
    precioTotal: string,
    idProducto: number,
    idProveedor: number
}

export interface AgregarProveedorProducto {
    idProveedor: number,
    idProducto: number,
    precio: number,
    vigencia : string
}

export interface EditarProveedorProducto {
    idProveedorProducto : number,
    precio : number,
    vigencia : string
}

export interface DataProveedorProducto {
    data: ProveedorProducto[];
    message: string;
    isSuccess: boolean;
    errors: null | string
}

export interface ResponseProveedorProducto {
    data: boolean;
    errors: any;
    isSuccess: boolean;
    message: string;
}

export type EliminarProveedorProducto = Pick<ProveedorProducto, 'idProveedorProducto'>;