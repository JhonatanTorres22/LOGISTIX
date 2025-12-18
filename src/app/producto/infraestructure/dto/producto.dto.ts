export interface ProductoDTO {
    codigo: number,
    nombre: string,
    modelo: string,
    descripcion: string,
    unidadDeMedida: string,
    precioReferencial: number
}

export type CrearProductoDTO = Omit<ProductoDTO, 'codigo'>
export type EditarProductoDTO = ProductoDTO
export type EliminarProductoDTO = Pick<ProductoDTO, 'codigo'>

export interface DataProductoDTO<T> {
    data : T
    isSuccess: boolean,
    message: string,
    errors: null | string
}