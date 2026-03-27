export interface DataOrdenCompraDTO {
  data: ListarOrdenCompraDTO[]
  isSuccess: boolean
  message: string
  errors: any
}

export interface ListarOrdenCompraDTO {
  codigoSolicitudCompra: number
  tipoGasto: string
  codigoSubTarea: number
  areaResponsable: string
  codigoPlanDeTrabajo: string
  datosDeActividad: any
  presupuestoProgramado: number
  total: number,
  codigoProveedor : number,
  codigoAnexoPorFaseCronograma : number
  anexosPorFases: AnexosPorFaseOrdenCompraDTO[]
}

export interface AnexosPorFaseOrdenCompraDTO {
  codigoAnexosPorFase: number
  archivo: string
  ordenCompra: OrdenCompraDetalleDTO[]
}

export interface OrdenCompraDetalleDTO {
  codigoOrdenCompra: number
  cantidad: number
  unidadMedida: string
  descripcionDelBien: string
  precioUnitario: number
  precioTotal: number
  nombreLegal: string
  ruc: string,
  codigoProveedor : number,
  codigoAnexoPorFaseCronograma : number
  direccionFiscal: string,
  codigoProductoPorAlmacen : number
}


export interface AgregarOrdenCompraDetalleDTO{
    codigoSolicitudCompra : number,
    codigoProveedorProducto : number,
    codigoAnexosPorFase : number,
    cantidad:number,
    unidadMedida : string,
    descripcionDelBien : string,
    precioUnitario : number,
    precioTotal : number
}

export interface EditarOrdenCompraDetalleDTO {
    codigoOrdenCompra : number,
    cantidad : number,
    precioTotal : number
}

export type EliminarOrdenCompraDetalleDTO = Pick<EditarOrdenCompraDetalleDTO, 'codigoOrdenCompra'>


export interface DataOrdenCompraPorFirmarDTO{
  data: OrdenCompraPorFirmarDTO[]
  isSuccess: boolean
  message: string
  errors: any
}
export interface OrdenCompraPorFirmarDTO {
  codigoSubTarea : number
  datosActividad : string
  codigoSolicitudCompra : number
  fechaOrdenCompra : string
  codigoCarpeta : number
  prefijoArea : string
  numeracion : string
}

export interface ValidarProductoAlmacenDTO {
  codigoProductoServicio : number,
  codigoAlmacen : number
}
