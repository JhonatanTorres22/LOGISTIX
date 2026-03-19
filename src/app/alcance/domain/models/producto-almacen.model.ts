export interface AgregarProductoAlmacen {
    idProducto: number,
    idAlmacen: number,
    cantidad: number
}

export interface DataProductoPorAlmacen {
    numeroPagina: number
    totalPaginas: number
    totalRegistros: number
    paginaPrevia: boolean
    paginaSiguiente: boolean
    data: ListarProductoPorAlmacen[],
    isSuccess: boolean
    message: string
    errors: any

}

export interface ListarProductoPorAlmacen {
    idProductoPorAlmacen: number,
    idProductoServicio: number,
    cantidad: number,
    stock: number,
    comprometido: number,
    pedido: number
}