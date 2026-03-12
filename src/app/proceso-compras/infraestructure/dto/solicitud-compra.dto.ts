export interface DataSolicitudCompraDTO {
  data: SolicitudCompraDTO[]
  isSuccess: boolean
  message: string
  errors: any
}

export interface SolicitudCompraDTO {
  codigoSolicitudCompra: number
  tipoGasto: string
  codigoSubTarea: number
  alcance : string
  areaResponsable: string
  codigoPlanDeTrabajo: string,
  datosDeActividad : string
  presupuestoProgramado: number
  total: number
  detalle: DetalleSolicitudCompraDTO[]
}

export interface DetalleSolicitudCompraDTO {
  codigoSolicitudCompraDetalle: number
  codigoProveedorProducto: number
  cantidad: number
  unidadMedida: string
  descripcionDelBien: string
  precioUnitario: number
  precioTotal: number,
  enOrdenDeCompra: boolean,
  nombreRs : string,
  ruc: string,
  direccionFiscal: string,
}

export type AgregarSolicitudDTO =
  Omit<SolicitudCompraDTO,
    'codigoSolicitudCompra' | 'detalle'> &

  Omit<DetalleSolicitudCompraDTO,
    'codigoSolicitudCompraDetalle' | 'direccionFiscal' | 'ruc' | 'nombreRs' | 'enOrdenDeCompra'>
  & {
    datosDeActividad: string
  }

  export interface GenerarOrdenDeCompraDTO {
    codigoSolicitudCompraDetalle : number
  }
    export type EditarSolicitudCompraDetalleDTO = Omit<DetalleSolicitudCompraDTO, 'enOrdenDeCompra' |'nombreRs' | 'ruc' | 'direccionFiscal'>
    export type EliminarSolicitudCompraDetalleDTO = Pick<DetalleSolicitudCompraDTO, 'codigoSolicitudCompraDetalle'>