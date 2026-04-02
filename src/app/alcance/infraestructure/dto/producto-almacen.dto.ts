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
    marca: string,
    stockMinimo: number,
}

export type AumentarCantidadProductoAlmacenDTO = Pick<ListarProductoPorAlmacenDTO, 'codigoProductoPorAlmacen' | 'cantidad'>
export type DisminuirCantidadProductoAlmacenDTO = Pick<ListarProductoPorAlmacenDTO, 'codigoProductoPorAlmacen' | 'cantidad'>
export type ActualizarStockMinimoProductoAlmacenDTO = Pick<ListarProductoPorAlmacenDTO, 'codigoProductoPorAlmacen' | 'stockMinimo'>
export type InsertarFechaVencimientoProductoAlmacenDTO = Pick<ListarProductoPorAlmacenDTO, 'codigoProductoPorAlmacen' > & { fechaCaducidad: string }

export interface DataListarProductosConFechaVencimientoDTO {
    data: ListarProductosConFechaVencimientoDTO[],
    isSuccess: boolean,
    message: string,
    errors: any
}
export interface ListarProductosConFechaVencimientoDTO {
    codigoProductoPorAlmacen: number,
    nombre: string,
    marca : string,
    modelo: string,
    descripcion: string,
    unidadDeMedida: string,
    url: string,
    vencimientos: FechaVencimientoProductoAlmacenDTO[]
}

export interface FechaVencimientoProductoAlmacenDTO {
    codigoVencimiento : number,
    fechaCaducidad: string
}