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
    pedido: number,
    nombreProducto: string,
    urlImagen: string,
    modelo: string,
    marca : string
}

export type AumentarCantidadProductoAlmacen = Pick<ListarProductoPorAlmacen, 'idProductoPorAlmacen' | 'cantidad'>
export type DisminuirCantidadProductoAlmacen = Pick<ListarProductoPorAlmacen, 'idProductoPorAlmacen' | 'cantidad'>