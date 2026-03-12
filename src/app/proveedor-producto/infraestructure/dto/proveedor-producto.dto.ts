import { ListarMarca } from "@/marca/domain/models/marca.model"

export interface ProveedorProductoDTO {
    codigoProveedorProducto : number
    precioReferencial : number,
    vigencia : string
    proveedor : ProveedorPPDTO,
    productoServicio: ProductoPPDTO
}

export interface ProveedorPPDTO {
    tipoProveedor: string
    nombreRs: string
    ruc: string
    direccionFiscal: string,
    estadoEvaluacion : string
}

export interface ProductoPPDTO {
    codigo : number
    nombre: string
    modelo: string
    descripcion: string
    unidadDeMedida: string,
    url : string,
    marca : ListarMarca | null
}
export interface DataProveedorProductoDTO {
    data:ProveedorProductoDTO[],
    message : string;
    isSuccess: boolean;
    errors: null | string
}

export interface AgregarProveedorProductoDTO{
    codigoProveedor : number,
    codigoProducto : number,
    precioReferencial : number,
    vigencia : string
}

export interface EditarProveedorProductoDTO {
    codigoProveedorProducto : number,
    precioReferencial : number,
    vigencia : string
}

export type EliminarProveedorProductoDTO = Pick<ProveedorProductoDTO, 'codigoProveedorProducto'>;