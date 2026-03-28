export interface DataOrdenCompra {
  data: ListarOrdenCompra[]
  isSuccess: boolean
  message: string
  errors: any
}

export interface ListarOrdenCompra{
  idSolicitudCompra: number
  tipoGasto: string
  idSubTarea: number
  areaResponsable: string
  codigoPlanDeTrabajo: string
  datosDeActividad: any
  presupuestoProgramado: number
  total: number
  anexosPorFases: AnexosPorFaseOrdenCompra[]
}

export interface AnexosPorFaseOrdenCompra{
  idAnexosPorFase: number
  archivo: string
  ordenCompra: OrdenCompraDetalle[]
}

export interface OrdenCompraDetalle {
  idOrdenCompra: number
  cantidad: number
  unidadMedida: string
  descripcionDelBien: string
  precioUnitario: number
  precioTotal: number,
  idProveedor : number,
  nombreProveedor: string
  ruc: string
  direccion: string,
  idAnexoPorFaseCronograma : number,
  idProductoPorAlmacen : number
  estadoAtencion : boolean
}


export interface AgregarOrdenCompraDetalle{
    idSolicitudCompra : number,
    idProveedorProducto : number,
    idAnexoPorFase : number,
    cantidad:number,
    unidadMedida : string,
    nombreProducto : string,
    precioUnitario : number,
    precioTotal : number
}

export interface EditarOrdenCompraDetalle {
    idOrdenCompra : number,
    cantidad : number,
    precioTotal : number
}

export type EliminarOrdenCompraDetalle = Pick<EditarOrdenCompraDetalle, 'idOrdenCompra'>

export interface DataOrdenCompraPorFirmar{
  data: OrdenCompraPorFirmar[]
  isSuccess: boolean
  message: string
  errors: any
}
export interface OrdenCompraPorFirmar {
  idSubTarea : number
  datosActividad : string
  idSolicitudCompra : number
  fechaOrdenCompra : string
  idCarpeta : number
  prefijoCarpeta : string
  numeracionCarpeta : string
}

export interface ValidarProductoAlmacen {
  idProductoServicio : number,
  idAlmacen : number
}

export type ActualizarEstadoAtencionOrden = Pick<OrdenCompraDetalle,'idOrdenCompra'>