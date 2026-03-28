export interface AgregarProductoAlmacenDTO {
    codigoProductoServicio: number,
    codigoAlmacen: number,
    cantidad: number
}

export interface DataProductoPorAlmacenDTO {
    numeroDePagina: number
    totalDePaginas: number
    totalDeRegistros: number
    paginaPrevia: boolean
    paginaSiguiente: boolean
    data: ListarProductoPorAlmacenDTO[],
    isSuccess: boolean
    message: string
    errors: any

}

export interface ListarProductoPorAlmacenDTO {
    codigoProductoPorAlmacen: number
    codigoProductoServicio: number
    cantidad: number
    enStock: number
    comprometido: number
    pedido: number,
    nombre: string,
    url: string,
    modelo: string,
    marca: string
}

export type AumentarCantidadProductoAlmacenDTO = Pick<ListarProductoPorAlmacenDTO, 'codigoProductoPorAlmacen' | 'cantidad'>
export type DisminuirCantidadProductoAlmacenDTO = Pick<ListarProductoPorAlmacenDTO, 'codigoProductoPorAlmacen' | 'cantidad'>
