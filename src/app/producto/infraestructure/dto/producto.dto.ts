import { ListarMarca } from "@/marca/domain/models/marca.model"
import { ListarMarcaDTO } from "@/marca/infraestructure/dto/marca.dto"

export interface ProductoCategoriaDTO {
    codigoCategoria: number,
    nombre : string,
    descripcion : string
    productosServicios : ProductoDTO[]
}
export interface ProductoDTO {
    codigoProducto: number,
    nombre: string,
    modelo: string,
    descripcion: string,
    tipo : string
    unidadDeMedida: string,
    precioReferencial: number,
    url: string,
    marca : ListarMarcaDTO |null
}

export type EditarProductoDTO = Omit<ProductoDTO,  | 'precioReferencial'| 'marca'> & { codigoCategoria: number; codigoMarca : number | undefined}
export type CrearProductoDTO = Omit<EditarProductoDTO, 'codigoProducto' | 'precioReferencial' |'marca'>

export interface EliminarProductoDTO {
    codigo: number
}

export interface DataProductoDTO {
    data : ProductoCategoriaDTO[]
    isSuccess: boolean,
    message: string,
    errors: null | string
}